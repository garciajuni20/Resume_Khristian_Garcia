import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from '@react-pdf/renderer';
import type { ProfileData } from '../types';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const BLUE = '#2563EB';
const BLUE_LIGHT = '#EFF6FF';
const DARK = '#111827';
const MUTED = '#6B7280';
const BORDER = '#E5E7EB';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: DARK,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingBottom: 24,
    paddingHorizontal: 0,
  },
  // Header
  header: {
    backgroundColor: DARK,
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 24,
  },
  headerAccent: {
    backgroundColor: BLUE,
    height: 4,
  },
  headerName: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 11,
    color: '#93C5FD',
    marginTop: 4,
  },
  headerContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
  },
  contactItem: {
    fontSize: 8,
    color: '#D1D5DB',
  },
  // Body
  body: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingTop: 20,
    gap: 20,
  },
  leftCol: { flex: 3 },
  rightCol: { flex: 2 },
  // Section
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 8,
    color: BLUE,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BLUE,
    borderBottomStyle: 'solid',
  },
  section: { marginBottom: 16 },
  // Experience
  expTitle: { fontFamily: 'Inter', fontWeight: 700, fontSize: 9.5, color: DARK },
  expCompany: { fontFamily: 'Inter', fontWeight: 600, fontSize: 8.5, color: BLUE, marginTop: 1 },
  expMeta: { fontSize: 7.5, color: MUTED, marginTop: 2 },
  expBullet: { flexDirection: 'row', marginTop: 3, gap: 4 },
  bulletDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: BLUE, marginTop: 3.5, flexShrink: 0 },
  bulletText: { fontSize: 8, color: '#374151', lineHeight: 1.5, flex: 1 },
  expDivider: { marginVertical: 10, borderBottomWidth: 1, borderBottomColor: BORDER, borderBottomStyle: 'solid' },
  // Skills
  skillRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 },
  skillName: { fontSize: 8, color: DARK, width: 80, flexShrink: 0 },
  skillBar: { flex: 1, height: 5, backgroundColor: '#E5E7EB', borderRadius: 3 },
  skillFill: { height: 5, backgroundColor: BLUE, borderRadius: 3 },
  skillPct: { fontSize: 7, color: MUTED, width: 24, textAlign: 'right' },
  // Tags
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  tag: { backgroundColor: BLUE_LIGHT, color: BLUE, fontSize: 7, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3 },
  // Education / Cert
  cardTitle: { fontFamily: 'Inter', fontWeight: 700, fontSize: 9, color: DARK },
  cardSub: { fontSize: 7.5, color: MUTED, marginTop: 1 },
  cardTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginTop: 4 },
  // Language
  langRow: { marginBottom: 6 },
  langName: { fontSize: 8, color: DARK, marginBottom: 2 },
  langBar: { width: '100%', height: 4, backgroundColor: '#E5E7EB', borderRadius: 2 },
  langFill: { height: 4, backgroundColor: BLUE, borderRadius: 2 },
  langLevel: { fontSize: 7, color: MUTED, marginTop: 2 },
  // Metrics row
  metricsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  metricBox: { flex: 1, backgroundColor: BLUE_LIGHT, borderRadius: 6, padding: 8, alignItems: 'center' },
  metricValue: { fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: BLUE },
  metricLabel: { fontSize: 6.5, color: MUTED, textAlign: 'center', marginTop: 2 },
});

interface Props {
  data: ProfileData;
  lang: 'en' | 'es';
}

export function CVCreative({ data, lang }: Props) {
  const isEN = lang === 'en';

  return (
    <Document
      title={`${data.name} — ${isEN ? 'Resume' : 'CV'} (Creative)`}
      author={data.name}
      subject={data.headline}
    >
      <Page size="A4" style={styles.page}>
        {/* Blue top accent */}
        <View style={styles.headerAccent} />

        {/* Dark header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.name}</Text>
          <Text style={styles.headerTitle}>{data.headline}</Text>
          <View style={styles.headerContact}>
            <Text style={styles.contactItem}>{data.email}</Text>
            <Text style={styles.contactItem}>{data.phone}</Text>
            <Text style={styles.contactItem}>{data.location}</Text>
            {data.links.map(l => (
              <Link key={l.href} src={l.href} style={{ ...styles.contactItem, color: '#93C5FD', textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.leftCol}>
            {/* Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{isEN ? 'Professional Summary' : 'Resumen Profesional'}</Text>
              <Text style={{ fontSize: 8.5, color: '#374151', lineHeight: 1.6 }}>{data.summary}</Text>
            </View>

            {/* Key metrics */}
            <View style={styles.metricsRow}>
              <View style={styles.metricBox}>
                <Text style={styles.metricValue}>6+</Text>
                <Text style={styles.metricLabel}>{isEN ? 'Years in Tech' : 'Años en Tech'}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricValue}>15+</Text>
                <Text style={styles.metricLabel}>{isEN ? 'Dashboards' : 'Dashboards'}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricValue}>99.5%</Text>
                <Text style={styles.metricLabel}>{isEN ? 'Data Accuracy' : 'Precisión Datos'}</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricValue}>-70%</Text>
                <Text style={styles.metricLabel}>{isEN ? 'Report Time' : 'Tiempo Reportes'}</Text>
              </View>
            </View>

            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{isEN ? 'Professional Experience' : 'Experiencia Profesional'}</Text>
              {data.experience.map((exp, i) => (
                <View key={exp.id}>
                  {i > 0 && <View style={styles.expDivider} />}
                  <Text style={styles.expTitle}>{exp.role}</Text>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expMeta}>
                    {exp.location} · {exp.start} — {exp.end === 'present' ? (isEN ? 'Present' : 'Actual') : exp.end}
                  </Text>
                  {exp.tags && (
                    <View style={{ ...styles.tagRow, marginTop: 4 }}>
                      {exp.tags.slice(0, 4).map(t => (
                        <View key={t} style={styles.tag}><Text>{t}</Text></View>
                      ))}
                    </View>
                  )}
                  {(exp.bullets ?? []).slice(0, 3).map((bullet, bi) => (
                    <View key={bi} style={styles.expBullet}>
                      <View style={styles.bulletDot} />
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Right column */}
          <View style={styles.rightCol}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{isEN ? 'Technical Skills' : 'Habilidades Técnicas'}</Text>
              {data.skills.map(skill => (
                <View key={skill.name} style={styles.skillRow}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.skillBar}>
                    <View style={{ ...styles.skillFill, width: `${skill.level}%` }} />
                  </View>
                  <Text style={styles.skillPct}>{skill.level}%</Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{isEN ? 'Education' : 'Educación'}</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: i < data.education.length - 1 ? 8 : 0 }}>
                  <Text style={styles.cardTitle}>{edu.degree}</Text>
                  <Text style={styles.cardSub}>{edu.area}</Text>
                  <Text style={styles.cardSub}>{edu.institution}</Text>
                  <Text style={{ ...styles.cardSub, marginTop: 2 }}>
                    {isEN ? 'Expected:' : 'Fin estimado:'} {edu.end === 'present' ? (isEN ? 'In progress' : 'En curso') : edu.end}
                  </Text>
                </View>
              ))}
            </View>

            {/* Languages */}
            {data.languages && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{isEN ? 'Languages' : 'Idiomas'}</Text>
                {data.languages.map(l => (
                  <View key={l.language} style={styles.langRow}>
                    <Text style={styles.langName}>{l.language}</Text>
                    <View style={styles.langBar}>
                      <View style={{ ...styles.langFill, width: `${l.proficiency}%` }} />
                    </View>
                    <Text style={styles.langLevel}>{l.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {data.certifications && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{isEN ? 'Certifications' : 'Certificaciones'}</Text>
                {data.certifications.slice(0, 3).map(cert => (
                  <View key={cert.id} style={{ marginBottom: 7 }}>
                    <Text style={styles.cardTitle}>{cert.title}</Text>
                    <Text style={styles.cardSub}>{cert.issuer} · {cert.date}</Text>
                    <View style={styles.cardTags}>
                      {cert.skills.slice(0, 3).map(s => (
                        <View key={s} style={styles.tag}><Text>{s}</Text></View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Tools */}
            {data.tools && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{isEN ? 'Tools' : 'Herramientas'}</Text>
                <Text style={{ fontSize: 7.5, color: '#374151', lineHeight: 1.6 }}>
                  {[...data.tools.dataEngineering.slice(0, 4), ...data.tools.biAnalytics.slice(0, 3), ...data.tools.fullStack.slice(0, 3)].join(' · ')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
