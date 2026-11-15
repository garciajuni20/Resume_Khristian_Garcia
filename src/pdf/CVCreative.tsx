import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
} from '@react-pdf/renderer';
import type { ExperienceItem, ProfileData, SkillItem } from '../types';
import { CV_UPDATED, PHOTO } from '../data/media';
import { PDF_BASE, pdfImage } from './assets';

/**
 * Designed two-page resume, styled like the portfolio (Geist, flat Notion
 * surfaces, one blue accent).
 *
 * Layout rule that matters: no flex row is ever allowed to span a page break.
 * Each page owns a self-contained layout, and every block that must stay
 * together carries `wrap={false}`. Page budgets are verified with
 * scripts/inspect-pdf.py; Spanish copy runs ~10% longer than English.
 */

const BASE = PDF_BASE;

Font.register({
  family: 'Geist',
  fonts: [
    { src: `${BASE}fonts/Geist-Regular.ttf`, fontWeight: 400 },
    { src: `${BASE}fonts/Geist-Medium.ttf`, fontWeight: 500 },
    { src: `${BASE}fonts/Geist-SemiBold.ttf`, fontWeight: 600 },
    { src: `${BASE}fonts/Geist-Bold.ttf`, fontWeight: 700 },
  ],
});
// Long tokens (URLs, "SECURITY INVOKER") must not be split with hyphens
Font.registerHyphenationCallback(word => [word]);

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** "2023-11" -> "Nov 2023". Deterministic (no Intl) so CI and local renders match. */
function ym(value: string, isEN: boolean): string {
  if (!value) return '';
  const low = value.toLowerCase();
  if (low === 'present' || low === 'actual') return isEN ? 'Present' : 'Actual';
  const [y, m] = value.split('-');
  const idx = parseInt(m, 10) - 1;
  const months = isEN ? MONTHS_EN : MONTHS_ES;
  if (!y || Number.isNaN(idx) || !months[idx]) return value;
  return `${months[idx]} ${y}`;
}

const year = (value: string, isEN: boolean) =>
  value === 'present' ? (isEN ? 'today' : 'hoy') : value.slice(0, 4);

/** Bullets per role on page 2; data is ordered most-relevant-first. */
const BULLET_CAPS: Record<string, number> = {
  'alleviate-de': 1,
  'virtrify-ai': 0,
  'alleviate-mid': 0,
  'flowber-freelance': 1,
  'idt-gnoc': 0,
};
const DEFAULT_BULLET_CAP = 1;

/** Short employer names for the industries panel */
const COMPANY_SHORT: Record<string, string> = {
  'alleviate-de': 'Alleviate Financial Solutions',
  'virtrify-ai': 'Virtrify',
  'alleviate-mid': 'Alleviate Financial Solutions',
  'icon-it': 'Alleviate Financial Solutions',
  'flowber-freelance': 'Flowber',
  'usac-teaching': 'USAC',
  'idt-gnoc': 'IDT · Red Chapina',
};

const SKILLS_SHOWN = 10;
const ACHIEVEMENTS_SHOWN = 4;

const INK = '#16213E';
const TEXT = '#15213B';
const MUTED = '#787774';
const BORDER = '#E9E9E7';
const SURFACE = '#F7F6F3';
const ACCENT = '#0F3460';
const ACCENT_SOFT = '#DCE6F6';
const ACCENT_ON_DARK = '#9CC2F5';
const CORAL = '#E94560';
/** Coral for small text: the brand coral is 3.8:1 on white, this one clears AA */
const CORAL_TEXT = '#C42B47';
const INDUSTRY_DOTS = ['#0F3460', '#533483', '#E94560', '#C9A800', '#448361'];

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Geist',
    fontSize: 8.6,
    color: TEXT,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  content: { paddingHorizontal: 34 },

  // ── Header (page 1)
  header: {
    backgroundColor: INK,
    paddingHorizontal: 34,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerPhoto: {
    width: 84,
    height: 104,
    borderRadius: 8,
    objectFit: 'cover',
    marginRight: 20,
  },
  headerText: { flex: 1 },
  headerName: { fontWeight: 700, fontSize: 19.5, color: '#FFFFFF', letterSpacing: 0.2 },
  headerTitle: { fontWeight: 500, fontSize: 10.5, color: ACCENT_ON_DARK, marginTop: 4 },
  headerTagline: { fontSize: 8, color: '#BDBDBA', marginTop: 5 },
  headerContact: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  contactItem: { fontSize: 7.6, color: '#E3E2E0', marginRight: 12, marginBottom: 2 },
  contactLink: { fontSize: 7.6, color: ACCENT_ON_DARK, textDecoration: 'none', marginRight: 12, marginBottom: 2 },

  // ── Slim header (page 2)
  slimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingTop: 16,
    paddingBottom: 9,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    borderBottomStyle: 'solid',
  },
  slimPhoto: { width: 26, height: 26, borderRadius: 13, objectFit: 'cover', marginRight: 9 },
  slimName: { fontWeight: 700, fontSize: 10.5, color: INK },
  slimMeta: { fontSize: 7.4, color: MUTED, marginTop: 1 },
  slimPage: { fontSize: 7.4, color: MUTED, marginLeft: 'auto' },

  // ── Sections
  section: { marginTop: 9 },
  sectionTitle: {
    fontWeight: 600,
    fontSize: 7.6,
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    marginBottom: 6,
  },
  paragraph: { fontSize: 8.6, color: TEXT, lineHeight: 1.6 },

  // ── Metrics
  metricsRow: { flexDirection: 'row', marginTop: 10 },
  metricBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER,
    borderStyle: 'solid',
    borderRadius: 6,
    paddingVertical: 6.5,
    paddingHorizontal: 9,
    marginRight: 8,
  },
  metricBoxLast: { marginRight: 0 },
  metricValue: { fontWeight: 700, fontSize: 15, color: CORAL },
  metricLabel: { fontSize: 7, fontWeight: 500, color: TEXT, marginTop: 2 },
  metricNote: { fontSize: 6.4, color: MUTED, marginTop: 1 },

  // ── Two-column row (page 1 only; never crosses a page break)
  row: { flexDirection: 'row', marginTop: 11 },
  colMain: { flex: 3, marginRight: 22 },
  colSide: { flex: 2 },

  // ── Bullets
  bulletRow: { flexDirection: 'row', marginBottom: 3.2 },
  approachRow: { flexDirection: 'row', marginBottom: 1.6 },
  approachLabel: { width: 56, fontSize: 7.2, fontWeight: 600, color: CORAL_TEXT, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 0.6 },
  approachText: { fontSize: 8.1, color: TEXT, lineHeight: 1.5, flex: 1 },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: ACCENT,
    marginTop: 4.2,
    marginRight: 6,
    flexShrink: 0,
  },
  bulletText: { fontSize: 8.1, color: TEXT, lineHeight: 1.5, flex: 1 },

  // ── Industries
  industryRow: { flexDirection: 'row', marginBottom: 5.5 },
  industryDot: { width: 6, height: 6, borderRadius: 3, marginTop: 2.5, marginRight: 7, flexShrink: 0 },
  industryName: { fontSize: 8, fontWeight: 600, color: INK },
  industryMeta: { fontSize: 7, color: MUTED, marginTop: 1 },

  // ── Languages / education
  langRow: { marginBottom: 4.5 },
  langHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2.5 },
  langName: { fontSize: 7.8, color: INK, fontWeight: 500 },
  langLevel: { fontSize: 7, color: MUTED },
  langTrack: { width: '100%', height: 3.5, backgroundColor: BORDER, borderRadius: 2 },
  langFill: { height: 3.5, backgroundColor: ACCENT, borderRadius: 2 },
  cardTitle: { fontWeight: 600, fontSize: 8, color: INK },
  cardSub: { fontSize: 7.2, color: MUTED, marginTop: 1.5 },
  cardStatus: { fontSize: 7.2, fontWeight: 500, color: TEXT, marginTop: 2 },

  // ── Featured project
  featured: {
    marginTop: 8,
    backgroundColor: ACCENT_SOFT,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  featuredEyebrow: { fontSize: 6.8, fontWeight: 600, color: ACCENT, textTransform: 'uppercase', letterSpacing: 1.1 },
  featuredTitle: { fontSize: 10.5, fontWeight: 700, color: INK, marginTop: 3 },
  featuredBody: { fontSize: 7.9, color: TEXT, lineHeight: 1.55, marginTop: 3 },
  featuredStats: { flexDirection: 'row', marginTop: 8 },
  featuredStat: { flex: 1, marginRight: 8 },
  featuredStatValue: { fontSize: 11, fontWeight: 700, color: INK },
  featuredStatLabel: { fontSize: 6.6, color: MUTED, marginTop: 1 },
  featuredLink: { fontSize: 7.2, color: ACCENT, textDecoration: 'none', marginTop: 7 },

  // ── Skills
  skillsGrid: { flexDirection: 'row' },
  skillsCol: { flex: 1 },
  skillsColFirst: { marginRight: 20 },
  skillRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3.6 },
  skillName: { fontSize: 7.4, color: INK, width: 118, flexShrink: 0, marginRight: 6 },
  skillTrack: { flex: 1, height: 3.5, backgroundColor: BORDER, borderRadius: 2, marginRight: 6 },
  skillFill: { height: 3.5, backgroundColor: INK, borderRadius: 2 },
  skillYears: { fontSize: 6.8, color: MUTED, width: 34, textAlign: 'right', flexShrink: 0 },

  // ── Experience
  expBlock: { marginBottom: 5 },
  expHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  expTitle: { fontWeight: 700, fontSize: 9.2, color: INK, flex: 1, marginRight: 10 },
  expDates: { fontSize: 7.4, color: MUTED, fontWeight: 500, marginTop: 1 },
  expCompany: { fontWeight: 600, fontSize: 8.2, color: ACCENT, marginTop: 1.5 },
  expMeta: { fontSize: 7.2, color: MUTED, marginTop: 1.5, marginBottom: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 },
  tag: {
    backgroundColor: SURFACE,
    color: TEXT,
    fontSize: 6.6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 3,
  },

  footer: { position: 'absolute', left: 34, right: 34, bottom: 8, fontSize: 6.6, color: MUTED, textAlign: 'center' },
});

interface Props {
  data: ProfileData;
  lang: 'en' | 'es';
}

function SkillRow({ skill, isEN }: { skill: SkillItem; isEN: boolean }) {
  const pct = Math.max(0, Math.min(100, skill.level));
  const unit = isEN ? (skill.years === 1 ? 'yr' : 'yrs') : skill.years === 1 ? 'año' : 'años';
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillName}>{skill.name}</Text>
      <View style={styles.skillTrack}>
        <View style={{ ...styles.skillFill, width: `${pct}%` }} />
      </View>
      <Text style={styles.skillYears}>{skill.years ? `${skill.years} ${unit}` : ''}</Text>
    </View>
  );
}

/** One row per industry, with the span of years worked in it. */
function industries(experience: ExperienceItem[], isEN: boolean) {
  const map = new Map<string, { companies: Set<string>; start: string; end: string }>();
  for (const e of experience) {
    if (!e.industry) continue;
    const cur = map.get(e.industry) ?? { companies: new Set<string>(), start: e.start, end: e.end };
    cur.companies.add(COMPANY_SHORT[e.id] ?? e.company);
    if (e.start < cur.start) cur.start = e.start;
    if (e.end === 'present' || (cur.end !== 'present' && e.end > cur.end)) cur.end = e.end;
    map.set(e.industry, cur);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[1].start.localeCompare(b[1].start))
    .map(([name, v]) => ({
      name,
      meta: `${Array.from(v.companies).join(', ')} · ${year(v.start, isEN)}–${year(v.end, isEN)}`,
    }));
}

export function CVCreative({ data, lang }: Props) {
  const isEN = lang === 'en';
  const t = {
    summary: isEN ? 'Profile' : 'Perfil',
    achievements: isEN ? 'Selected achievements' : 'Logros destacados',
    industries: isEN ? 'Industries' : 'Industrias',
    skills: isEN ? 'Core skills' : 'Habilidades principales',
    experience: isEN ? 'Professional experience' : 'Experiencia profesional',
    context: isEN ? 'Context' : 'Contexto',
    how: isEN ? 'How' : 'Cómo',
    result: isEN ? 'Result' : 'Resultado',
    goal: isEN ? 'Goal' : 'Meta',
    education: isEN ? 'Education' : 'Educación',
    languages: isEN ? 'Languages' : 'Idiomas',
    tagline: isEN
      ? 'Bilingual English / Spanish · Remote from Guatemala · Open to Data & AI roles'
      : 'Bilingüe inglés / español · Remoto desde Guatemala · Abierto a roles de Datos e IA',
    updated: isEN ? `Updated ${CV_UPDATED.en}` : `Actualizado en ${CV_UPDATED.es}`,
    featuredEyebrow: isEN ? 'Featured project · Jan 2024 → today' : 'Proyecto destacado · ene 2024 → hoy',
    featuredTitle: isEN ? 'Flowber: a barbershop from paper to AI and data' : 'Flowber: una barbería del papel a la IA y los datos',
    featuredBody: isEN
      ? 'Idea to production for Danover\'s barbershop as sole engineer: online booking, role-based security in Postgres, an AI agent that queries and books with live data, and a warehouse that predicts cancellations and demand.'
      : 'De la idea a producción para la barbería de Danover como único ingeniero: reservas en línea, seguridad por rol en Postgres, un agente de IA que consulta y reserva con datos reales y un warehouse que predice cancelaciones y demanda.',
    featuredLink: isEN ? 'Case study: garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber' : 'Caso de estudio: garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber',
  };

  const industryRows = industries(data.experience, isEN);
  const metrics = [
    { value: `${data.metrics.yearsExperience}+`, label: isEN ? 'years in tech' : 'años en tecnología', note: isEN ? 'since 2019' : 'desde 2019' },
    { value: '99.5%', label: isEN ? 'data accuracy' : 'precisión de datos', note: isEN ? 'from 85% at Alleviate' : 'desde 85% en Alleviate' },
    { value: '160+', label: isEN ? 'appointments' : 'citas gestionadas', note: isEN ? 'Flowber in production' : 'Flowber en producción' },
    { value: String(industryRows.length), label: isEN ? 'industries' : 'industrias', note: isEN ? 'fintech to wellness' : 'de fintech a bienestar' },
  ];

  const featuredStats = [
    { value: '20', label: isEN ? 'AI agent tools' : 'herramientas del agente IA' },
    { value: '100%', label: isEN ? 'RAG hit@1' : 'hit@1 en RAG' },
    { value: '24', label: isEN ? 'dbt models · 50 tests' : 'modelos dbt · 50 tests' },
    { value: '2.5 s', label: isEN ? 'mobile LCP (was 4.8 s)' : 'LCP móvil (antes 4.8 s)' },
  ];

  const shown = data.skills.slice(0, SKILLS_SHOWN);
  const half = Math.ceil(shown.length / 2);
  const photo = pdfImage(PHOTO.portraitJpg);
  const avatar = pdfImage(PHOTO.squareJpg);


  return (
    <Document
      title={`${data.name} — ${isEN ? 'Resume' : 'CV'}`}
      author={data.name}
      subject={data.headline}
      keywords={(data.seo?.keywords ?? []).join(', ')}
    >
      {/* ══════════════ PAGE 1 — profile, impact, industries, skills ══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={photo} style={styles.headerPhoto} />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{data.name}</Text>
            <Text style={styles.headerTitle}>{data.headline}</Text>
            <Text style={styles.headerTagline}>{t.tagline}</Text>
            <View style={styles.headerContact}>
              <Text style={styles.contactItem}>{data.email}</Text>
              <Text style={styles.contactItem}>{data.phone}</Text>
              <Text style={styles.contactItem}>{data.location}</Text>
              {data.links.map(l => (
                <Link key={l.href} src={l.href} style={styles.contactLink}>
                  {l.label}
                </Link>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metricsRow}>
            {metrics.map((m, i) => (
              <View key={m.label} style={i === metrics.length - 1 ? { ...styles.metricBox, ...styles.metricBoxLast } : styles.metricBox}>
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
                <Text style={styles.metricNote}>{m.note}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.summary}</Text>
            <Text style={styles.paragraph}>{data.summaryShort ?? data.summary}</Text>
          </View>

          <View style={styles.row} wrap={false}>
            <View style={styles.colMain}>
              <Text style={styles.sectionTitle}>{t.achievements}</Text>
              {data.keyAchievements.slice(0, ACHIEVEMENTS_SHOWN).map((a, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{a}</Text>
                </View>
              ))}

              {/* Education sits under the achievements: the side column is the taller one */}
              <Text style={{ ...styles.sectionTitle, marginTop: 8 }}>{t.education}</Text>
              {data.education.map((edu, i) => (
                <View key={i}>
                  <Text style={styles.cardTitle}>{edu.degree} · {edu.area}</Text>
                  <Text style={styles.cardSub}>{edu.institution}</Text>
                  <Text style={styles.cardStatus}>
                    {edu.status ?? (edu.end === 'present' ? (isEN ? 'In progress' : 'En curso') : ym(edu.end, isEN))}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.colSide}>
              <Text style={styles.sectionTitle}>{t.industries}</Text>
              {industryRows.map((ind, i) => (
                <View key={ind.name} style={styles.industryRow}>
                  <View style={{ ...styles.industryDot, backgroundColor: INDUSTRY_DOTS[i % INDUSTRY_DOTS.length] }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.industryName}>{ind.name}</Text>
                    <Text style={styles.industryMeta}>{ind.meta}</Text>
                  </View>
                </View>
              ))}

              <Text style={{ ...styles.sectionTitle, marginTop: 8 }}>{t.languages}</Text>
              {data.languages.map(l => (
                <View key={l.language} style={styles.langRow}>
                  <View style={styles.langHead}>
                    <Text style={styles.langName}>{l.language}</Text>
                    <Text style={styles.langLevel}>{l.level}</Text>
                  </View>
                  <View style={styles.langTrack}>
                    <View style={{ ...styles.langFill, width: `${l.proficiency}%` }} />
                  </View>
                </View>
              ))}

            </View>
          </View>

          {/* Featured project */}
          <View style={styles.featured} wrap={false}>
            <Text style={styles.featuredEyebrow}>{t.featuredEyebrow}</Text>
            <Text style={styles.featuredTitle}>{t.featuredTitle}</Text>
            <Text style={styles.featuredBody}>{t.featuredBody}</Text>
            <View style={styles.featuredStats}>
              {featuredStats.map(s => (
                <View key={s.label} style={styles.featuredStat}>
                  <Text style={styles.featuredStatValue}>{s.value}</Text>
                  <Text style={styles.featuredStatLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
            <Link src="https://garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber" style={styles.featuredLink}>
              {t.featuredLink}
            </Link>
          </View>

          <View style={{ ...styles.row, marginTop: 10 }} wrap={false}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsGrid}>
                <View style={{ ...styles.skillsCol, ...styles.skillsColFirst }}>
                  {shown.slice(0, half).map(s => <SkillRow key={s.name} skill={s} isEN={isEN} />)}
                </View>
                <View style={styles.skillsCol}>
                  {shown.slice(half).map(s => <SkillRow key={s.name} skill={s} isEN={isEN} />)}
                </View>
              </View>
            </View>
          </View>

        </View>
        <Text style={styles.footer} fixed>
          {t.updated} · garciajuni20.github.io/Resume_Khristian_Garcia · {data.email}
        </Text>
      </Page>

      {/* ══════════════ PAGE 2 — experience, full width ══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.slimHeader}>
          <Image src={avatar} style={styles.slimPhoto} />
          <View>
            <Text style={styles.slimName}>{data.name}</Text>
            <Text style={styles.slimMeta}>{data.headline}</Text>
          </View>
          <Text style={styles.slimPage} render={({ pageNumber, totalPages }) => (isEN ? `Page ${pageNumber} of ${totalPages}` : `Página ${pageNumber} de ${totalPages}`)} />
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.experience}</Text>
            {data.experience.map((exp, idx) => (
              <View key={exp.id} style={styles.expBlock} wrap={false}>
                <View style={styles.expHead}>
                  <Text style={styles.expTitle}>{exp.role}</Text>
                  <Text style={styles.expDates}>
                    {ym(exp.start, isEN)} – {ym(exp.end, isEN)}
                  </Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expMeta}>
                  {exp.industry ? `${exp.industry} · ` : ''}
                  {exp.location}
                </Text>
                {/* Tags only on the two current roles; on older ones they cost a line each */}
                {idx < 1 && exp.tags && exp.tags.length > 0 && (
                  <View style={styles.tagRow}>
                    {exp.tags.slice(0, 7).map(tag => (
                      <Text key={tag} style={styles.tag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                )}
                {/* Context → how → result: the method, before the supporting bullets */}
                {exp.approach && (
                  <>
                    {([['context', t.context], ['how', t.how], ['result', exp.approach.planned ? t.goal : t.result]] as const).map(([key, label]) => (
                      <View key={key} style={styles.approachRow}>
                        <Text style={styles.approachLabel}>{label}</Text>
                        <Text style={styles.approachText}>{exp.approach?.[key]}</Text>
                      </View>
                    ))}
                  </>
                )}
                {(exp.bullets ?? [])
                  .slice(0, BULLET_CAPS[exp.id] ?? DEFAULT_BULLET_CAP)
                  .map((bullet, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <View style={styles.bulletDot} />
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>

        </View>
        <Text style={styles.footer} fixed>
          {t.updated} · garciajuni20.github.io/Resume_Khristian_Garcia · {data.email}
        </Text>
      </Page>
    </Document>
  );
}
