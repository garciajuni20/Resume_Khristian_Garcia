import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ProfileData } from '../types';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 36,
    lineHeight: 1.4,
  },
  name: { fontSize: 16, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  title: { fontSize: 10, marginBottom: 6 },
  contactLine: { fontSize: 9, marginBottom: 12, color: '#333333' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#000000', borderBottomStyle: 'solid', marginVertical: 8 },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 14,
  },
  summary: { fontSize: 9.5, lineHeight: 1.6, marginBottom: 4 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  expTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.5 },
  expDate: { fontSize: 9, color: '#333333' },
  expCompany: { fontSize: 9, color: '#333333', marginBottom: 3 },
  bullet: { flexDirection: 'row', gap: 4, marginBottom: 2 },
  bulletChar: { fontSize: 9, flexShrink: 0 },
  bulletText: { fontSize: 9, flex: 1, lineHeight: 1.5 },
  expBlock: { marginBottom: 10 },
  skillLine: { fontSize: 9, marginBottom: 2 },
  certLine: { fontSize: 9, marginBottom: 3 },
  note: { fontSize: 8, color: '#555555', marginTop: 2 },
});

interface Props {
  data: ProfileData;
  lang: 'en' | 'es';
}

export function CVATS({ data, lang }: Props) {
  const isEN = lang === 'en';

  return (
    <Document
      title={`${data.name} — ${isEN ? 'Resume' : 'CV'} (ATS)`}
      author={data.name}
      subject={`${data.name} — ATS-optimized ${isEN ? 'resume' : 'CV'}`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.headline}</Text>
        <Text style={styles.contactLine}>
          {data.email} | {data.phone} | {data.location}
          {data.links.map(l => ` | ${l.label}: ${l.href}`).join('')}
        </Text>

        {/* Summary */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>{isEN ? 'Professional Summary' : 'Resumen Profesional'}</Text>
        <Text style={styles.summary}>{data.summary}</Text>

        {/* Key Achievements */}
        <Text style={styles.sectionTitle}>{isEN ? 'Key Achievements' : 'Logros Clave'}</Text>
        {data.keyAchievements.map((achievement, i) => (
          <View key={i} style={styles.bullet}>
            <Text style={styles.bulletChar}>•</Text>
            <Text style={styles.bulletText}>{achievement}</Text>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>{isEN ? 'Professional Experience' : 'Experiencia Profesional'}</Text>
        {data.experience.map(exp => (
          <View key={exp.id} style={styles.expBlock}>
            <View style={styles.expHeader}>
              <Text style={styles.expTitle}>{exp.role}</Text>
              <Text style={styles.expDate}>
                {exp.start} — {exp.end === 'present' ? (isEN ? 'Present' : 'Actual') : exp.end}
              </Text>
            </View>
            <Text style={styles.expCompany}>{exp.company} | {exp.location}</Text>
            {(exp.bullets ?? []).map((bullet, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletChar}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>{isEN ? 'Technical Skills' : 'Habilidades Técnicas'}</Text>
        {data.tools && (
          <>
            <Text style={styles.skillLine}>{isEN ? 'Data Engineering:' : 'Ingeniería de Datos:'} {data.tools.dataEngineering.join(', ')}</Text>
            <Text style={styles.skillLine}>{isEN ? 'BI & Analytics:' : 'BI & Analítica:'} {data.tools.biAnalytics.join(', ')}</Text>
            <Text style={styles.skillLine}>{isEN ? 'Full-Stack Development:' : 'Desarrollo Full-Stack:'} {data.tools.fullStack.join(', ')}</Text>
            <Text style={styles.skillLine}>{isEN ? 'Cloud & DevOps:' : 'Cloud & DevOps:'} {data.tools.cloudDevOps.join(', ')}</Text>
            <Text style={styles.skillLine}>{isEN ? 'Methodologies:' : 'Metodologías:'} {data.tools.methodologies.join(', ')}</Text>
          </>
        )}

        {/* Education */}
        <Text style={styles.sectionTitle}>{isEN ? 'Education' : 'Educación'}</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.expHeader}>
              <Text style={styles.expTitle}>{edu.degree} — {edu.area}</Text>
              <Text style={styles.expDate}>{edu.end === 'present' ? (isEN ? 'In progress' : 'En curso') : edu.end}</Text>
            </View>
            <Text style={styles.expCompany}>{edu.institution}</Text>
            {(edu.highlights ?? []).slice(0, 2).map((h, hi) => (
              <View key={hi} style={styles.bullet}>
                <Text style={styles.bulletChar}>•</Text>
                <Text style={styles.bulletText}>{h}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Certifications */}
        {data.certifications && (
          <>
            <Text style={styles.sectionTitle}>{isEN ? 'Certifications' : 'Certificaciones'}</Text>
            {data.certifications.map(cert => (
              <Text key={cert.id} style={styles.certLine}>
                {cert.title} — {cert.issuer} ({cert.date})
              </Text>
            ))}
          </>
        )}

        {/* Languages */}
        {data.languages && (
          <>
            <Text style={styles.sectionTitle}>{isEN ? 'Languages' : 'Idiomas'}</Text>
            {data.languages.map(l => (
              <Text key={l.language} style={styles.certLine}>{l.language}: {l.level}</Text>
            ))}
          </>
        )}

        <Text style={styles.note}>
          {isEN
            ? 'ATS-optimized resume. References available upon request.'
            : 'CV optimizado para sistemas ATS. Referencias disponibles a solicitud.'}
        </Text>
      </Page>
    </Document>
  );
}
