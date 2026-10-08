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
import type { ProfileData, SkillItem } from '../types';

/**
 * Designed two-page resume.
 *
 * Layout rule that matters: no flex row is ever allowed to span a page break.
 * The previous version wrapped the whole body in one `flexDirection: 'row'`
 * that overflowed onto page 2, which is what made the columns drift out of
 * alignment. Here each page owns a self-contained layout, and every block that
 * must stay together carries `wrap={false}`.
 */

// Font base: Vite's BASE_URL in the browser; PDF_ASSET_BASE (local path) when
// rendered from Node (scripts/generate-pdfs.tsx)
const nodeBase = (globalThis as { process?: { env?: Record<string, string | undefined> } })
  .process?.env?.PDF_ASSET_BASE;
const BASE = nodeBase ?? import.meta.env?.BASE_URL ?? '/'; // e.g. /Resume_Khristian_Garcia/

Font.register({
  family: 'Inter',
  fonts: [
    { src: `${BASE}fonts/inter-regular.ttf`, fontWeight: 400 },
    { src: `${BASE}fonts/inter-semibold.ttf`, fontWeight: 600 },
    { src: `${BASE}fonts/inter-bold.ttf`, fontWeight: 700 },
  ],
});

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

/** Bullets per role for page 2; data is ordered most-relevant-first. */
const BULLET_CAPS: Record<string, number> = {
  'alleviate-mid': 3,
  'flowber-freelance': 3,
};
const DEFAULT_BULLET_CAP = 2;

// Page budgets, verified with scripts/inspect-pdf.py. Spanish copy runs ~10%
// longer than English, so these leave headroom for the longer of the two.
const SKILLS_SHOWN = 14;
const ACHIEVEMENTS_SHOWN = 3;

const BLUE = '#2563EB';
const BLUE_LIGHT = '#EFF6FF';
const DARK = '#111827';
const MUTED = '#6B7280';
const BODY = '#374151';
const BORDER = '#E5E7EB';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: DARK,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingBottom: 28,
    paddingHorizontal: 0,
  },
  content: { paddingHorizontal: 32 },

  // ── Header (page 1)
  headerAccent: { backgroundColor: BLUE, height: 4 },
  header: {
    backgroundColor: DARK,
    paddingHorizontal: 32,
    paddingTop: 26,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerPhoto: {
    width: 62,
    height: 62,
    borderRadius: 31,
    objectFit: 'cover',
    borderWidth: 2,
    borderColor: BLUE,
    borderStyle: 'solid',
    marginRight: 18,
  },
  headerText: { flex: 1 },
  headerName: { fontWeight: 700, fontSize: 21, color: '#FFFFFF', letterSpacing: 0.4 },
  headerTitle: { fontWeight: 400, fontSize: 10.5, color: '#93C5FD', marginTop: 4 },
  headerContact: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  contactItem: { fontSize: 7.8, color: '#D1D5DB', marginRight: 14 },
  contactLink: { fontSize: 7.8, color: '#93C5FD', textDecoration: 'none', marginRight: 14 },

  // ── Slim header (page 2)
  slimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingTop: 18,
    paddingBottom: 9,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    borderBottomStyle: 'solid',
  },
  slimName: { fontWeight: 700, fontSize: 11, color: DARK },
  slimMeta: { fontSize: 7.5, color: MUTED },

  // ── Sections
  section: { marginTop: 12 },
  sectionTitle: {
    fontWeight: 700,
    fontSize: 8,
    color: BLUE,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 7,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BLUE,
    borderBottomStyle: 'solid',
  },
  paragraph: { fontSize: 8.5, color: BODY, lineHeight: 1.6 },

  // ── Metrics
  metricsRow: { flexDirection: 'row', marginTop: 16 },
  metricBox: {
    flex: 1,
    backgroundColor: BLUE_LIGHT,
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginRight: 8,
  },
  metricBoxLast: { marginRight: 0 },
  metricValue: { fontWeight: 700, fontSize: 14, color: BLUE },
  metricLabel: { fontSize: 6.4, color: MUTED, textAlign: 'center', marginTop: 3 },

  // ── Two-column row (page 1 only; never crosses a page break)
  row: { flexDirection: 'row', marginTop: 14 },
  colMain: { flex: 3, marginRight: 20 },
  colSide: { flex: 2 },

  // ── Bullets
  bulletRow: { flexDirection: 'row', marginBottom: 3 },
  bulletDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: BLUE,
    marginTop: 4,
    marginRight: 6,
    flexShrink: 0,
  },
  bulletText: { fontSize: 8, color: BODY, lineHeight: 1.5, flex: 1 },

  // ── Skills: fixed name column wide enough for the longest label, so the
  //    bars and the year figures line up on a single baseline.
  skillsGrid: { flexDirection: 'row' },
  skillsCol: { flex: 1 },
  skillsColFirst: { marginRight: 18 },
  skillRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5.5 },
  skillName: { fontSize: 7.4, color: DARK, width: 108, flexShrink: 0, marginRight: 6 },
  skillTrack: { flex: 1, height: 4, backgroundColor: BORDER, borderRadius: 2, marginRight: 6 },
  skillFill: { height: 4, backgroundColor: BLUE, borderRadius: 2 },
  skillYears: { fontSize: 6.8, color: MUTED, width: 30, textAlign: 'right', flexShrink: 0 },

  // ── Experience
  expBlock: { marginBottom: 8 },
  expTitle: { fontWeight: 700, fontSize: 9.5, color: DARK },
  expCompany: { fontWeight: 600, fontSize: 8.5, color: BLUE, marginTop: 1.5 },
  expMeta: { fontSize: 7.5, color: MUTED, marginTop: 2, marginBottom: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4 },
  tag: {
    backgroundColor: BLUE_LIGHT,
    color: BLUE,
    fontSize: 6.8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 3,
  },

  // ── Education / languages
  cardTitle: { fontWeight: 700, fontSize: 8.5, color: DARK },
  cardSub: { fontSize: 7.5, color: MUTED, marginTop: 1.5 },
  cardStatus: { fontSize: 7.5, fontWeight: 600, color: BODY, marginTop: 2 },
  langRow: { marginBottom: 7 },
  langHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2.5 },
  langName: { fontSize: 8, color: DARK },
  langLevel: { fontSize: 7, color: MUTED },
  langTrack: { width: '100%', height: 4, backgroundColor: BORDER, borderRadius: 2 },
  langFill: { height: 4, backgroundColor: BLUE, borderRadius: 2 },

});

interface Props {
  data: ProfileData;
  lang: 'en' | 'es';
}

function SkillRow({ skill, isEN }: { skill: SkillItem; isEN: boolean }) {
  const pct = Math.max(0, Math.min(100, skill.level));
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillName}>{skill.name}</Text>
      <View style={styles.skillTrack}>
        <View style={{ ...styles.skillFill, width: `${pct}%` }} />
      </View>
      <Text style={styles.skillYears}>
        {skill.years ? `${skill.years}+ ${isEN ? 'yr' : 'añ'}` : ''}
      </Text>
    </View>
  );
}

export function CVCreative({ data, lang }: Props) {
  const isEN = lang === 'en';
  const t = {
    summary: isEN ? 'Professional Summary' : 'Resumen Profesional',
    achievements: isEN ? 'Selected Achievements' : 'Logros Destacados',
    skills: isEN ? 'Core Skills' : 'Habilidades Principales',
    experience: isEN ? 'Professional Experience' : 'Experiencia Profesional',
    education: isEN ? 'Education' : 'Educación',
    languages: isEN ? 'Languages' : 'Idiomas',
    yearsTech: isEN ? 'Years in Tech' : 'Años en Tech',
    dashboards: isEN ? 'Dashboards' : 'Dashboards',
    accuracy: isEN ? 'Data Accuracy' : 'Precisión Datos',
    reportTime: isEN ? 'Report Time' : 'Tiempo Reportes',
    page: isEN ? 'Page 2 of 2' : 'Página 2 de 2',
  };

  const shown = data.skills.slice(0, SKILLS_SHOWN);
  const half = Math.ceil(shown.length / 2);
  const skillsLeft = shown.slice(0, half);
  const skillsRight = shown.slice(half);

  const metrics = [
    { value: `${data.metrics.yearsExperience}+`, label: t.yearsTech },
    { value: `${data.metrics.dashboardsDelivered}+`, label: t.dashboards },
    { value: '99.5%', label: t.accuracy },
    { value: '-70%', label: t.reportTime },
  ];

  return (
    <Document
      title={`${data.name} — ${isEN ? 'Resume' : 'CV'}`}
      author={data.name}
      subject={data.headline}
      keywords={(data.seo?.keywords ?? []).join(', ')}
    >
      {/* ══════════════ PAGE 1 — profile, impact, skills, stack ══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerAccent} />

        <View style={styles.header}>
          <Image src={data.photoUrl} style={styles.headerPhoto} />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{data.name}</Text>
            <Text style={styles.headerTitle}>{data.headline}</Text>
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
          {/* Metrics */}
          <View style={styles.metricsRow}>
            {metrics.map((m, i) => (
              <View
                key={m.label}
                style={i === metrics.length - 1 ? { ...styles.metricBox, ...styles.metricBoxLast } : styles.metricBox}
              >
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            ))}
          </View>

          {/* Summary — full width reads better than a narrow column */}
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.summary}</Text>
            <Text style={styles.paragraph}>{data.summaryShort ?? data.summary}</Text>
          </View>

          {/* Achievements + Education/Languages, side by side and page-safe */}
          <View style={styles.row} wrap={false}>
            <View style={styles.colMain}>
              <Text style={styles.sectionTitle}>{t.achievements}</Text>
              {data.keyAchievements.slice(0, ACHIEVEMENTS_SHOWN).map((a, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{a}</Text>
                </View>
              ))}
            </View>

            <View style={styles.colSide}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
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

              <Text style={{ ...styles.sectionTitle, marginTop: 8 }}>{t.education}</Text>
              {data.education.map((edu, i) => (
                <View key={i}>
                  <Text style={styles.cardTitle}>{edu.area}</Text>
                  <Text style={styles.cardSub}>{edu.institution}</Text>
                  <Text style={styles.cardStatus}>
                    {edu.status ?? (edu.end === 'present' ? (isEN ? 'In progress' : 'En curso') : ym(edu.end, isEN))}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Skills — two columns of aligned rows, full width */}
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.skills}</Text>
            <View style={styles.skillsGrid}>
              <View style={{ ...styles.skillsCol, ...styles.skillsColFirst }}>
                {skillsLeft.map(s => (
                  <SkillRow key={s.name} skill={s} isEN={isEN} />
                ))}
              </View>
              <View style={styles.skillsCol}>
                {skillsRight.map(s => (
                  <SkillRow key={s.name} skill={s} isEN={isEN} />
                ))}
              </View>
            </View>
          </View>

        </View>
      </Page>

      {/* ══════════════ PAGE 2 — experience, full width ══════════════ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerAccent} />

        <View style={styles.slimHeader}>
          <View>
            <Text style={styles.slimName}>{data.name}</Text>
            <Text style={styles.slimMeta}>{data.headline}</Text>
          </View>
          <Text style={styles.slimMeta}>{t.page}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.experience}</Text>
            {data.experience.map((exp, idx) => (
              <View key={exp.id} style={styles.expBlock} wrap={false}>
                <Text style={styles.expTitle}>{exp.role}</Text>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expMeta}>
                  {exp.location} · {ym(exp.start, isEN)} – {ym(exp.end, isEN)}
                </Text>
                {/* Tags only on the two current roles — on older ones they cost
                    a line each without adding much for a reader. */}
                {idx < 2 && exp.tags && exp.tags.length > 0 && (
                  <View style={styles.tagRow}>
                    {exp.tags.slice(0, 5).map(tag => (
                      <Text key={tag} style={styles.tag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
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
      </Page>
    </Document>
  );
}
