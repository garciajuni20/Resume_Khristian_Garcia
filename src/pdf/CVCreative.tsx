import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
  Svg,
  Path,
} from '@react-pdf/renderer';
import type { ExperienceItem, ProfileData } from '../types';
import { CV_UPDATED } from '../data/media';
import { PDF_BASE, pdfImage } from './assets';
import { guillocheRing, guillocheRule } from '../utils/guilloche';
import { FLOWBER_CASE_URL, INK_ROUTE, INK_VIGNETTE, figureRuns, inkAchievements, inkFigures, inkMonth, inkNotes, INK_HEX, INK_TONE, INK_TONES } from '../data/ink';

/**
 * Designed two-page resume, set like a banknote: one navy ink on a cool paper,
 * an engraved scene of Antigua Guatemala, the portrait in a guilloché oval, and
 * figures in Bodoni whose footnotes say where each number comes from.
 * Engravings come from scripts/ink-assets.py (Flux 2 Klein, local).
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
  ],
});
Font.register({
  family: 'Bodoni',
  fonts: [
    { src: `${BASE}fonts/BodoniModa-400.ttf`, fontWeight: 400 },
    { src: `${BASE}fonts/BodoniModa-500.ttf`, fontWeight: 500 },
  ],
});
// Long tokens (URLs, "SECURITY INVOKER") must not be split with hyphens
Font.registerHyphenationCallback(word => [word]);

/** Extra bullets per role on page 2; roles with a story are told by it alone. */
const BULLET_CAPS: Record<string, number> = {
  'alleviate-de': 0,
  'virtrify-ai': 0,
  'alleviate-mid': 0,
  'flowber-freelance': 0,
  'idt-gnoc': 0,
};
const DEFAULT_BULLET_CAP = 1;

const PAPER = '#F5F6F8';
const INK = '#16213E';
const INK_2 = '#4A5677';
const RULE = '#D3D7E0';
/** Gold marks what is happening today; each industry prints in its own ink (INK_HEX) */
const GOLD = INK_HEX.gold;
const tone = (id: string) => INK_HEX[INK_TONE[id] ?? 'blue'];

const X = 36;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Geist',
    fontSize: 8.6,
    color: INK,
    backgroundColor: PAPER,
    paddingBottom: 22,
  },
  content: { paddingHorizontal: X },

  // ── Hero (page 1): portrait and name on the left, the engraving on the right
  hero: { height: 198, position: 'relative' },
  // The engraving keeps its own proportions (1.82:1); its faded left side runs under the name
  heroArt: { position: 'absolute', top: 12, right: X, width: 340, height: 187 },
  heroLeft: { position: 'absolute', top: 20, left: X, width: 270, flexDirection: 'row' },
  oval: { width: 92, height: 115, position: 'relative', marginRight: 16 },
  ovalImage: { position: 'absolute', top: 7, left: 7, width: 78, height: 101 },
  nameBlock: { flex: 1, paddingTop: 4 },
  name: { fontFamily: 'Bodoni', fontSize: 31, lineHeight: 1, color: INK },
  headline: { fontSize: 9, color: INK_2, lineHeight: 1.45, marginTop: 8 },
  contact: { position: 'absolute', left: X, top: 141, width: 270 },
  contactLine: { fontSize: 7.6, color: INK_2, lineHeight: 1.6 },
  contactLinks: { flexDirection: 'row', marginTop: 1 },
  contactLink: { fontSize: 7.6, color: INK, textDecoration: 'none', marginRight: 12 },

  // ── Figures: the proof, set large, each with a footnote mark
  band: { marginTop: 2 },
  figures: { flexDirection: 'row', borderBottomWidth: 0.75, borderBottomColor: RULE },
  // The main column's two figures, a rule in the gutter, then the one over the route
  figMain: { flex: 1, flexDirection: 'row', marginRight: 13, paddingRight: 13, borderRightWidth: 0.75, borderRightColor: RULE },
  figure: { flex: 1, paddingVertical: 9, paddingRight: 13 },
  figureDivided: { borderLeftWidth: 0.75, borderLeftColor: RULE, paddingLeft: 13, paddingRight: 0 },
  figSide: { width: 178, paddingVertical: 9 },
  figureValue: { fontFamily: 'Bodoni', fontSize: 19, color: INK },
  /** Bodoni's subset has no arrow; Geist draws it, a little lighter than the figures */
  arrow: { fontFamily: 'Geist', fontSize: 12, color: INK_2 },
  mark: { fontFamily: 'Geist', fontSize: 7.5, verticalAlign: 'super' },
  figureLabel: { fontSize: 7.8, color: INK, marginTop: 4 },
  figureNote: { fontSize: 7, color: INK_2, marginTop: 1.5 },

  // ── Body columns (page 1)
  row: { flexDirection: 'row', marginTop: 12 },
  colMain: { flex: 1, marginRight: 26 },
  colSide: { width: 178 },
  h2: { fontFamily: 'Bodoni', fontSize: 14, color: INK, marginBottom: 6 },
  paragraph: { fontSize: 8.5, color: INK, lineHeight: 1.52 },
  achievement: { flexDirection: 'row', paddingVertical: 4, borderTopWidth: 0.5, borderTopColor: RULE },
    achievementText: { flex: 1, fontSize: 8, lineHeight: 1.5, color: INK },

  // ── Route: the career in order, with the industry vignettes
  stop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5.5 },
  // Pulled up so the year shares its baseline with the first line of the role
  stopYear: { fontFamily: 'Bodoni', fontSize: 10.5, color: INK, width: 30, marginTop: -4.6 },
  stopText: { flex: 1 },
  stopRole: { fontSize: 7.8, color: INK, lineHeight: 1.3 },
  stopAt: { fontSize: 7, color: INK_2, marginTop: 0.5 },
  stopArt: { width: 26, height: 26, marginLeft: 6 },
  stopArtSlot: { width: 26, marginLeft: 6 },
  sideBlock: { marginTop: 10 },
  sideLine: { fontSize: 7.8, color: INK, lineHeight: 1.55 },
  sideMuted: { fontSize: 7.2, color: INK_2, lineHeight: 1.5 },

  // ── Tools as words, grouped: no meters
  tools: { flexDirection: 'row', marginTop: 12, borderTopWidth: 0.75, borderTopColor: RULE, paddingTop: 9 },
  toolsMain: { flex: 1, flexDirection: 'row', marginRight: 26 },
  toolCol: { flex: 1, paddingRight: 10 },
  toolSide: { width: 178 },
  toolHead: { fontFamily: 'Bodoni', fontSize: 10.5, color: INK, marginBottom: 3 },
  toolList: { fontSize: 7.4, color: INK_2, lineHeight: 1.55 },

  // ── Footnotes and footer
  notes: { marginTop: 10 },
  note: { fontSize: 6.8, color: INK_2, lineHeight: 1.5 },
  noteMark: { fontSize: 6.8 },
  noteLink: { fontSize: 6.8, color: INK, textDecoration: 'none' },
  footer: { position: 'absolute', left: X, right: X, bottom: 9, fontSize: 6.6, color: INK_2, flexDirection: 'row', justifyContent: 'space-between' },

  // ── Page 2: ledger of roles
  slim: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: X, paddingTop: 16, paddingBottom: 4 },
  slimOval: { width: 30, height: 36, marginRight: 10, position: 'relative' },
  slimName: { fontFamily: 'Bodoni', fontSize: 14, color: INK },
  slimMeta: { fontSize: 7.4, color: INK_2, marginTop: 1 },
  slimRight: { marginLeft: 'auto', fontSize: 7.4, color: INK_2 },
  pageTitle: { fontFamily: 'Bodoni', fontSize: 18, color: INK, marginTop: 2, marginBottom: 5 },
  entry: { flexDirection: 'row', borderTopWidth: 0.75, borderTopColor: RULE, paddingTop: 6, paddingBottom: 5 },
  entryWhen: { width: 70 },
  // Set like a drop cap: the year's baseline sits on the company line, beside the title
  entryYear: { fontFamily: 'Bodoni', fontSize: 15, color: INK, lineHeight: 1, marginTop: 3.1 },
  entrySpan: { fontSize: 6.8, color: INK_2, marginTop: 3 },
  // Fixed height, so the dates sit at the same depth whether or not a vignette is stamped
  entryHead: { height: 21, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: 4 },
  entryArt: { width: 20, height: 20, marginTop: -2 },
  entryBody: { flex: 1 },
  role: { fontWeight: 600, fontSize: 9, color: INK },
  company: { fontSize: 8, color: INK, marginTop: 1.5 },
  meta: { fontSize: 7, color: INK_2, marginTop: 1.5, marginBottom: 4 },
  lead: { fontSize: 7.9, color: INK_2, lineHeight: 1.48, marginBottom: 2.5 },
  bullet: { flexDirection: 'row', marginTop: 1.5 },
  bulletDash: { width: 10, fontSize: 7.9, color: INK_2, lineHeight: 1.48 },
  bulletText: { flex: 1, fontSize: 7.9, color: INK, lineHeight: 1.48 },
});

/** Bodoni's "+" is a hairline at this size; set it in Geist like the arrow */
function figure(text: string) {
  return figureRuns(text).map((r, i) => (
    <Text key={i} style={r.sans ? { fontFamily: 'Geist', fontSize: 14 } : {}}>{r.text}</Text>
  ));
}

interface Props {
  data: ProfileData;
  lang: 'en' | 'es';
}

/** Portrait inside a guilloché oval, like the portrait window of a banknote */
function Portrait({ w, h, src, band = 5 }: { w: number; h: number; src: ReturnType<typeof pdfImage>; band?: number }) {
  const inset = band + 2;
  const ring = guillocheRing({ cx: w / 2, cy: h / 2, rx: w / 2 - inset, ry: h / 2 - inset, width: band, strands: 5, lobes: 30 });
  return (
    <View style={{ width: w, height: h, position: 'relative' }}>
      <Image src={src} style={{ position: 'absolute', top: inset, left: inset, width: w - inset * 2, height: h - inset * 2 }} />
      <Svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0 }}>
        {ring.strands.map((d, i) => (
          <Path key={i} d={d} stroke={INK_HEX[INK_TONES[i % INK_TONES.length]]} strokeWidth={0.4} fill="none" />
        ))}
        <Path d={ring.inner} stroke={INK} strokeWidth={0.6} fill="none" />
        <Path d={ring.outer} stroke={INK} strokeWidth={0.6} fill="none" />
      </Svg>
    </View>
  );
}

export function CVCreative({ data, lang }: Props) {
  const isEN = lang === 'en';
  const t = {
    profile: isEN ? 'Profile' : 'Perfil',
    achievements: isEN ? 'What changed because of my work' : 'Lo que cambió con mi trabajo',
    route: isEN ? 'Route' : 'Ruta',
    languages: isEN ? 'Languages' : 'Idiomas',
    education: isEN ? 'Education' : 'Educación',
    experience: isEN ? 'Experience' : 'Experiencia',
    now: isEN ? 'today' : 'hoy',
    open: isEN ? 'Open to remote data and AI roles' : 'Abierto a roles remotos de datos e IA',
    updated: isEN ? `Updated ${CV_UPDATED.en}` : `Actualizado en ${CV_UPDATED.es}`,
    page: (n: number, total: number) => (isEN ? `Page ${n} of ${total}` : `Página ${n} de ${total}`),
  };
  const tools: Array<[string, string[]]> = isEN
    ? [['Data', data.tools.dataEngineering], ['Cloud and delivery', data.tools.cloudDevOps], ['BI', data.tools.biAnalytics], ['Product and AI', data.tools.fullStack]]
    : [['Datos', data.tools.dataEngineering], ['Nube y entrega', data.tools.cloudDevOps], ['BI', data.tools.biAnalytics], ['Producto e IA', data.tools.fullStack]];

  const figures = inkFigures(lang);
  const achievements = inkAchievements(data.keyAchievements);
  const notes = inkNotes(lang);
  // A figure in the ink of the industry it comes from; its footnote mark matches
  const figureBody = (f: (typeof figures)[number]) => (
    <>
      <Text style={{ ...styles.figureValue, color: INK_HEX[f.tone] }}>
        {figure(f.value[0])}
        {f.value[1] && <Text style={styles.arrow}>{' → '}</Text>}
        {f.value[1] && figure(f.value[1])}
        <Text style={{ ...styles.mark, color: INK_HEX[f.tone] }}> {f.n}</Text>
      </Text>
      <Text style={styles.figureLabel}>{f.label}</Text>
      <Text style={styles.figureNote}>{f.note}</Text>
    </>
  );

  const route = [...data.experience].sort((a, b) => a.start.localeCompare(b.start));
  const seenArt = new Set<string>();
  const firstArt = (e: ExperienceItem, list: Set<string>) => {
    const art = INK_VIGNETTE[e.id];
    if (!art || list.has(art)) return null;
    list.add(art);
    return art;
  };
  const ledgerSeen = new Set<string>();

  const portrait = pdfImage('ink/pdf/portrait-oval.jpg');
  const footer = (
    <View style={styles.footer} fixed>
      <Text>{t.updated}</Text>
      <Text>garciajuni20.github.io/Resume_Khristian_Garcia</Text>
      <Text render={({ pageNumber, totalPages }) => t.page(pageNumber, totalPages)} />
    </View>
  );

  return (
    <Document
      title={`${data.name} — ${isEN ? 'Resume' : 'CV'}`}
      author={data.name}
      subject={data.headline}
      keywords={(data.seo?.keywords ?? []).join(', ')}
    >
      {/* ══════════════ PAGE 1 — portrait, proof, profile, route ══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.hero}>
          <Image src={pdfImage('ink/pdf/ink-hero.jpg')} style={styles.heroArt} />
          <View style={styles.heroLeft}>
            <View style={styles.oval}>
              <Portrait w={92} h={115} src={portrait} />
            </View>
            <View style={styles.nameBlock}>
              <Text style={styles.name}>Khristian</Text>
              <Text style={styles.name}>Garcia</Text>
              <Text style={styles.headline}>{data.headline}</Text>
            </View>
          </View>
          <View style={styles.contact}>
            <Text style={styles.contactLine}>{data.name}</Text>
            <Text style={styles.contactLine}>{data.email}   {data.phone}</Text>
            <Text style={styles.contactLine}>{data.location}. {t.open}</Text>
            <View style={styles.contactLinks}>
              {data.links.map(l => (
                <Link key={l.href} src={l.href} style={styles.contactLink}>{l.label}</Link>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Svg width={595.28 - X * 2} height={7} style={styles.band}>
            {guillocheRule(595.28 - X * 2, 7, INK_TONES.length, 16).map((d, i) => (
              <Path key={i} d={d} stroke={INK_HEX[INK_TONES[i]]} strokeWidth={0.45} fill="none" />
            ))}
          </Svg>
          <View style={styles.figures} wrap={false}>
            <View style={styles.figMain}>
              {figures.slice(0, 2).map((f, i) => (
                <View key={f.n} style={i === 0 ? styles.figure : { ...styles.figure, ...styles.figureDivided }}>
                  {figureBody(f)}
                </View>
              ))}
            </View>
            {figures.slice(2).map(f => (
              <View key={f.n} style={styles.figSide}>
                {figureBody(f)}
              </View>
            ))}
          </View>

          <View style={styles.row} wrap={false}>
            <View style={styles.colMain}>
              <Text style={styles.h2}>{t.profile}</Text>
              <Text style={styles.paragraph}>{data.summaryShort ?? data.summary}</Text>

              <Text style={{ ...styles.h2, marginTop: 10 }}>{t.achievements}</Text>
              {achievements.map((a, i) => (
                <View key={i} style={styles.achievement}>
                  <Text style={styles.achievementText}>{a}</Text>
                </View>
              ))}
            </View>

            <View style={styles.colSide}>
              <Text style={styles.h2}>{t.route}</Text>
              {route.map(e => {
                const art = firstArt(e, seenArt);
                const r = INK_ROUTE[e.id];
                const now = e.end === 'present';
                return (
                  <View key={e.id} style={styles.stop}>
                    <Text style={{ ...styles.stopYear, color: tone(e.id) }}>{e.start.slice(0, 4)}</Text>
                    <View style={styles.stopText}>
                      <Text style={styles.stopRole}>{r ? (isEN ? r.en : r.es) : e.role}</Text>
                      <Text style={styles.stopAt}>
                        {r?.at ?? e.company}
                        {now ? <Text style={{ color: GOLD }}>{`, ${t.now}`}</Text> : null}
                      </Text>
                    </View>
                    {art ? <Image src={pdfImage(`ink/pdf/${art}.jpg`)} style={styles.stopArt} /> : <View style={styles.stopArtSlot} />}
                  </View>
                );
              })}

              <View style={styles.sideBlock}>
                <Text style={{ ...styles.h2, fontSize: 12, marginBottom: 3 }}>{t.languages}</Text>
                {data.languages.map(l => (
                  <Text key={l.language} style={styles.sideLine}>
                    {l.language} <Text style={styles.sideMuted}>{l.level.toLowerCase()}</Text>
                  </Text>
                ))}
              </View>

              <View style={styles.sideBlock}>
                <Text style={{ ...styles.h2, fontSize: 12, marginBottom: 3 }}>{t.education}</Text>
                {data.education.map((edu, i) => (
                  <View key={i}>
                    <Text style={styles.sideLine}>{edu.area}</Text>
                    <Text style={styles.sideMuted}>{edu.institution}</Text>
                    <Text style={styles.sideMuted}>{edu.status}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.tools} wrap={false}>
            <View style={styles.toolsMain}>
              {tools.slice(0, 3).map(([head, list]) => (
                <View key={head} style={styles.toolCol}>
                  <Text style={styles.toolHead}>{head}</Text>
                  <Text style={styles.toolList}>{list.slice(0, 7).join(', ')}</Text>
                </View>
              ))}
            </View>
            {tools.slice(3).map(([head, list]) => (
              <View key={head} style={styles.toolSide}>
                <Text style={styles.toolHead}>{head}</Text>
                <Text style={styles.toolList}>{list.slice(0, 7).join(', ')}</Text>
              </View>
            ))}
          </View>

          <View style={styles.notes} wrap={false}>
            {notes.map((n, i) => (
              <Text key={i} style={styles.note}>
                <Text style={{ ...styles.noteMark, color: INK_HEX[figures[i]?.tone ?? 'blue'] }}>{i + 1}  </Text>
                {n}
                {i === 2 && <Link src={FLOWBER_CASE_URL} style={styles.noteLink}>garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber</Link>}
              </Text>
            ))}
          </View>
        </View>
        {footer}
      </Page>

      {/* ══════════════ PAGE 2 — the roles, set as a ledger ══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.slim}>
          <View style={styles.slimOval}>
            <Portrait w={30} h={36} src={portrait} band={2} />
          </View>
          <View>
            <Text style={styles.slimName}>Khristian Garcia</Text>
            <Text style={styles.slimMeta}>{data.headline}</Text>
          </View>
          <Svg width={120} height={6} style={{ marginLeft: 'auto' }}>
            {guillocheRule(120, 6, INK_TONES.length, 16).map((d, i) => (
              <Path key={i} d={d} stroke={INK_HEX[INK_TONES[i]]} strokeWidth={0.45} fill="none" />
            ))}
          </Svg>
        </View>

        <View style={styles.content}>
          <Text style={styles.pageTitle}>{t.experience}</Text>
          {data.experience.map(exp => {
            const art = firstArt(exp, ledgerSeen);
            const now = exp.end === 'present';
            return (
              <View key={exp.id} style={styles.entry} wrap={false}>
                <View style={styles.entryWhen}>
                  <View style={styles.entryHead}>
                    <Text style={{ ...styles.entryYear, color: tone(exp.id) }}>{exp.start.slice(0, 4)}</Text>
                    {art && <Image src={pdfImage(`ink/pdf/${art}.jpg`)} style={styles.entryArt} />}
                  </View>
                  <Text style={styles.entrySpan}>{inkMonth(exp.start, lang)} –</Text>
                  <Text style={{ ...styles.entrySpan, marginTop: 0.5 }}>{inkMonth(exp.end, lang)}</Text>
                </View>
                <View style={styles.entryBody}>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.meta}>
                    {exp.industry ? `${exp.industry}. ` : ''}
                    {exp.location}
                    {now ? <Text style={{ color: GOLD }}>{`. ${isEN ? 'Current' : 'Actual'}`}</Text> : null}
                  </Text>
                  {exp.story && <Text style={styles.lead}>{exp.story.lead}</Text>}
                  {[...(exp.story?.wins ?? []), ...(exp.bullets ?? []).slice(0, BULLET_CAPS[exp.id] ?? DEFAULT_BULLET_CAP)].map((b, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={{ ...styles.bulletDash, color: tone(exp.id) }}>–</Text>
                      <Text style={styles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
        {footer}
      </Page>
    </Document>
  );
}
