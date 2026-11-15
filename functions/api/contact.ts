/**
 * POST /api/contact (Cloudflare Pages Function): the portfolio's contact form.
 *
 * Validates the message, rejects bots (honeypot field, optional Turnstile) and
 * delivers it. Delivery upgrades with the variables set in the Pages project:
 *   TURNSTILE_SECRET        Turnstile secret key; when set, a valid token is required
 *   RESEND_API_KEY + CONTACT_TO   send through Resend to CONTACT_TO
 *   FORMSPREE_ID            otherwise forward to this Formspree form (default below)
 *   AUTO_REPLY_FROM         a sender on a domain verified in Resend, e.g.
 *                           "Khristian Garcia <hello@yourdomain>"; with Resend and
 *                           Turnstile also set, the sender gets a short fixed
 *                           confirmation with links to the resume and case studies.
 *                           Off without Turnstile, so the form is never a way to
 *                           mail strangers. The text never echoes what was typed.
 * The browser never sees the delivery provider or its keys.
 */

interface Env {
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  FORMSPREE_ID?: string;
  AUTO_REPLY_FROM?: string;
}

type Ctx = { request: Request; env: Env };

const LIMITS = { name: 100, email: 200, subject: 200, message: 5000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const SITE = 'https://resume-khristian-garcia.pages.dev';

/** The confirmation the sender gets; fixed text, nothing from the form */
function autoReply(lang: 'en' | 'es') {
  if (lang === 'es') {
    return {
      subject: 'Recibí tu mensaje',
      text: [
        'Hola,',
        '',
        'Recibí tu mensaje desde mi portafolio y te respondo personalmente en menos de 24 horas.',
        '',
        'Mientras tanto:',
        `CV interactivo y en PDF: ${SITE}/resume`,
        `Caso Alleviate (Snowflake, dbt, Azure Data Factory): ${SITE}/alleviate`,
        `Caso Flowber (agente de IA, RAG, dbt + DuckDB): ${SITE}/flowber`,
        '',
        'Khristian Garcia',
        'Ingeniero de Datos',
      ].join('\n'),
    };
  }
  return {
    subject: 'I got your message',
    text: [
      'Hi,',
      '',
      'Your message from my portfolio reached me, and I will answer it myself within 24 hours.',
      '',
      'In the meantime:',
      `Resume, interactive and in PDF: ${SITE}/resume`,
      `Alleviate case study (Snowflake, dbt, Azure Data Factory): ${SITE}/alleviate`,
      `Flowber case study (AI agent, RAG, dbt + DuckDB): ${SITE}/flowber`,
      '',
      'Khristian Garcia',
      'Data Engineer',
    ].join('\n'),
  };
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const out = (await res.json()) as { success?: boolean };
  return out.success === true;
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  // Same-origin only: the form on this site, not a script elsewhere
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json(403, { error: 'origin' });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { error: 'json' });
  }

  const field = (k: string) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '');
  const msg = { name: field('name'), email: field('email'), subject: field('subject'), message: field('message') };

  // Honeypot: people never see this field, bots fill it. Pretend success.
  if (field('company')) return json(200, { ok: true });

  for (const [k, max] of Object.entries(LIMITS)) {
    const v = msg[k as keyof typeof msg];
    if (!v || v.length > max) return json(422, { error: 'invalid', field: k });
  }
  if (!EMAIL.test(msg.email)) return json(422, { error: 'invalid', field: 'email' });

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, field('turnstile'), request.headers.get('cf-connecting-ip'));
    if (!ok) return json(403, { error: 'turnstile' });
  }

  const text = `${msg.message}\n\n— ${msg.name} <${msg.email}>\nSent from the portfolio contact form`;

  let res: Response;
  if (env.RESEND_API_KEY && env.CONTACT_TO) {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [env.CONTACT_TO],
        reply_to: msg.email,
        subject: `[Portfolio] ${msg.subject}`,
        text,
      }),
    });
  } else {
    res = await fetch(`https://formspree.io/f/${env.FORMSPREE_ID ?? 'meezgvoq'}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ ...msg, _replyto: msg.email, _subject: `[Portfolio] ${msg.subject}` }),
    });
  }

  if (!res.ok) return json(502, { error: 'delivery' });

  // Best effort: the message is already delivered, a failed confirmation is not an error
  if (env.AUTO_REPLY_FROM && env.RESEND_API_KEY && env.TURNSTILE_SECRET) {
    const reply = autoReply(field('lang') === 'es' ? 'es' : 'en');
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.AUTO_REPLY_FROM, to: [msg.email], subject: reply.subject, text: reply.text }),
    }).catch(() => undefined);
  }

  return json(200, { ok: true });
}

export async function onRequest(): Promise<Response> {
  return json(405, { error: 'method' });
}
