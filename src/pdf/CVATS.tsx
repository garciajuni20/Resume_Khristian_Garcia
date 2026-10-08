import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ProfileData } from '../types';

/**
 * ATS-first resume: strictly single-column, standard fonts, no images and no
 * side-by-side cells. Everything a parser needs sits on its own line, which is
 * also what removes the alignment problems the old two-column header had.
 */

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

function range(start: string, end: string, isEN: boolean): string {
  return `${ym(start, isEN)} – ${ym(end, isEN)}`;
}

/** Bullets per role, most-relevant-first in the data. Keeps the resume to 2 pages. */
const BULLET_CAPS: Record<string, number> = {
  'alleviate-mid': 5,
  'flowber-freelance': 4,
};
const DEFAULT_BULLET_CAP = 3;

/** Long tool lists read as keyword walls; cap each group. */
const TOOLS_CAP = 9;

/** Keeps the document to two pages, verified by scripts/inspect-pdf.py */
const ACHIEVEMENTS_SHOWN = 3;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 44,
    paddingVertical: 38,
    lineHeight: 1.45,
  },

  name: { fontSize: 17, fontFamily: 'Helvetica-Bold', letterSpacing: 0.3 },
  headline: { fontSize: 10, marginTop: 3, color: '#1F2937' },
  contactLine: { fontSize: 8.5, marginTop: 5, color: '#333333' },

  rule: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    marginTop: 10,
  },

  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 13,
    marginBottom: 5,
  },

  paragraph: { fontSize: 9, lineHeight: 1.55 },

  // Experience — each line is its own block, nothing competes for horizontal space
  roleBlock: { marginBottom: 9 },
  roleTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5 },
  roleMeta: { fontSize: 8.5, color: '#333333', marginTop: 1.5, marginBottom: 3 },

  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletChar: { fontSize: 9, width: 10, flexShrink: 0 },
  bulletText: { fontSize: 9, flex: 1, lineHeight: 1.5 },

  skillLine: { fontSize: 8.8, marginBottom: 2.5, lineHeight: 1.5 },
  skillLabel: { fontFamily: 'Helvetica-Bold' },

  eduTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5 },
  eduMeta: { fontSize: 8.5, color: '#333333', marginTop: 1.5 },
  eduStatus: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', marginTop: 1.5, marginBottom: 3 },
});

interface Props {
  data: ProfileData;
  lang: 'en' | 'es';
}

export function CVATS({ data, lang }: Props) {
  const isEN = lang === 'en';
  const t = {
    summary: isEN ? 'Professional Summary' : 'Resumen Profesional',
    achievements: isEN ? 'Selected Achievements' : 'Logros Destacados',
    competencies: isEN ? 'Core Competencies' : 'Competencias Principales',
    experience: isEN ? 'Professional Experience' : 'Experiencia Profesional',
    education: isEN ? 'Education' : 'Educación',
    languages: isEN ? 'Languages' : 'Idiomas',
    dataEng: isEN ? 'Data Engineering' : 'Ingeniería de Datos',
    bi: isEN ? 'BI & Analytics' : 'BI y Analítica',
    cloud: isEN ? 'Cloud & DevOps' : 'Cloud y DevOps',
    full: isEN ? 'Full-Stack & AI' : 'Full-Stack e IA',
    methods: isEN ? 'Methodologies' : 'Metodologías',
  };

  const toolGroups = [
    { label: t.dataEng, items: data.tools.dataEngineering },
    { label: t.bi, items: data.tools.biAnalytics },
    { label: t.cloud, items: data.tools.cloudDevOps },
    { label: t.full, items: data.tools.fullStack },
    { label: t.methods, items: data.tools.methodologies },
  ];

  return (
    <Document
      title={`${data.name} — ${isEN ? 'Resume' : 'CV'}`}
      author={data.name}
      subject={`${data.name} — ${data.headline}`}
      keywords={(data.seo?.keywords ?? []).join(', ')}
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header: one fact per line, the most parser-friendly shape ── */}
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.headline}>{data.headline}</Text>
        <Text style={styles.contactLine}>
          {data.email} | {data.phone} | {data.location}
        </Text>
        <Text style={styles.contactLine}>
          {data.links.map(l => `${l.label}: ${l.href}`).join('  |  ')}
        </Text>
        <View style={styles.rule} />

        {/* ── Summary ── */}
        <Text style={styles.sectionTitle}>{t.summary}</Text>
        <Text style={styles.paragraph}>{data.summaryShort ?? data.summary}</Text>

        {/* ── Achievements ── */}
        <Text style={styles.sectionTitle}>{t.achievements}</Text>
        {data.keyAchievements.slice(0, ACHIEVEMENTS_SHOWN).map((achievement, i) => (
          <View key={i} style={styles.bullet}>
            <Text style={styles.bulletChar}>{'•'}</Text>
            <Text style={styles.bulletText}>{achievement}</Text>
          </View>
        ))}

        {/* ── Competencies ── */}
        <Text style={styles.sectionTitle}>{t.competencies}</Text>
        {toolGroups.map(group => (
          <Text key={group.label} style={styles.skillLine}>
            <Text style={styles.skillLabel}>{group.label}: </Text>
            {group.items.slice(0, TOOLS_CAP).join(', ')}
          </Text>
        ))}

        {/* ── Experience ── */}
        <Text style={styles.sectionTitle}>{t.experience}</Text>
        {data.experience.map(exp => (
          <View key={exp.id} style={styles.roleBlock} wrap={false}>
            <Text style={styles.roleTitle}>{exp.role}</Text>
            <Text style={styles.roleMeta}>
              {exp.company} | {exp.location} | {range(exp.start, exp.end, isEN)}
            </Text>
            {(exp.bullets ?? [])
              .slice(0, BULLET_CAPS[exp.id] ?? DEFAULT_BULLET_CAP)
              .map((bullet, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletChar}>{'•'}</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
          </View>
        ))}

        {/* ── Education: status gets its own line instead of a cramped cell ── */}
        <Text style={styles.sectionTitle}>{t.education}</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 5 }} wrap={false}>
            <Text style={styles.eduTitle}>
              {edu.degree} {'—'} {edu.area}
            </Text>
            <Text style={styles.eduMeta}>{edu.institution}</Text>
            <Text style={styles.eduStatus}>
              {edu.status ?? (edu.end === 'present' ? (isEN ? 'In progress' : 'En curso') : ym(edu.end, isEN))}
            </Text>
            {(edu.highlights ?? []).slice(1, 2).map((h, hi) => (
              <View key={hi} style={styles.bullet}>
                <Text style={styles.bulletChar}>{'•'}</Text>
                <Text style={styles.bulletText}>{h}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* ── Languages: one line, no grid ── */}
        <Text style={styles.sectionTitle}>{t.languages}</Text>
        <Text style={styles.paragraph}>
          {data.languages.map(l => `${l.language}: ${l.level}`).join('  |  ')}
        </Text>
      </Page>
    </Document>
  );
}
