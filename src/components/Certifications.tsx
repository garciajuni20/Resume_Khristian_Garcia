import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import type { CertificationItem, ProfileData } from '../types';

export default function Certifications() {
  const { lang } = useLang();
  const profile: ProfileData = lang === 'en' ? profileEN : profileES;
  const certifications: CertificationItem[] = profile.certifications ?? [];

  const professional = certifications.filter(c => c.type === 'professional');
  const training = certifications.filter(c => c.type === 'training');
  const academic = certifications.filter(c => c.type === 'academic');

  const t = lang === 'en' ? {
    professional: 'Professional Certifications',
    training: 'Workshops & Training',
    academic: 'Academic Achievements',
    viewCredential: 'View Credential',
    viewProject: 'View Project',
    profDesc: 'Vendor-issued certifications validating hands-on tool proficiency',
    trainDesc: 'Community workshops and technical training programs',
    acadDesc: 'Advanced coursework at USAC with public deliverables'
  } : {
    professional: 'Certificaciones Profesionales',
    training: 'Talleres y Capacitaciones',
    academic: 'Logros Académicos',
    viewCredential: 'Ver Credencial',
    viewProject: 'Ver Proyecto',
    profDesc: 'Certificaciones emitidas por proveedores que validan competencia técnica práctica',
    trainDesc: 'Talleres comunitarios y programas de capacitación técnica',
    acadDesc: 'Cursos avanzados en la USAC con entregables públicos'
  };

  const getTypeIcon = (type: CertificationItem['type']) => {
    if (type === 'academic') return <GraduationCap className="h-5 w-5" aria-hidden="true" />;
    if (type === 'training') return <Briefcase className="h-5 w-5" aria-hidden="true" />;
    return <Award className="h-5 w-5" aria-hidden="true" />;
  };

  const getTypeColor = (type: CertificationItem['type']) => {
    if (type === 'academic') return 'n-tag-purple';
    if (type === 'training') return 'n-tag-orange';
    return 'n-tag-blue';
  };

  const renderGroup = (
    items: CertificationItem[],
    title: string,
    description: string,
    badgeClass: string
  ) => (
    <div className="mb-10">
      <div className="mb-4">
        <h4 className="text-lg font-semibold n-text">{title}</h4>
        <p className="mt-1 text-sm n-muted">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="n-border rounded-2xl border bg-[var(--n-bg)] p-5"
          >
            <div className="flex items-start gap-4">
              <div className={`n-tag ${getTypeColor(cert.type)} shrink-0 rounded-lg p-2.5`}>
                {getTypeIcon(cert.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold n-text leading-snug">
                    {cert.title}
                  </h5>
                  <span className={`n-tag ${badgeClass} shrink-0`}>
                    {cert.type === 'professional' ? (lang === 'en' ? 'Certified' : 'Certificado') :
                     cert.type === 'training' ? (lang === 'en' ? 'Workshop' : 'Taller') :
                     (lang === 'en' ? 'Academic' : 'Académico')}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-3 text-sm">
                  <span className="font-medium n-text">{cert.issuer}</span>
                  <div className="flex items-center gap-1 n-muted">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span className="text-xs">{cert.date}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="n-tag n-tag-gray"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="n-text mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-[var(--n-border)] underline-offset-4 transition-colors duration-300 hover:decoration-current"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    {cert.type === 'professional' ? t.viewCredential : t.viewProject}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {renderGroup(
        professional,
        t.professional,
        t.profDesc,
        'n-tag-blue'
      )}

      {renderGroup(
        training,
        t.training,
        t.trainDesc,
        'n-tag-orange'
      )}

      {renderGroup(
        academic,
        t.academic,
        t.acadDesc,
        'n-tag-purple'
      )}

      <div className="n-callout rounded-2xl p-5">
        <p className="text-sm font-medium n-text">
          {lang === 'en' ? 'Continuous Learning' : 'Aprendizaje Continuo'}
        </p>
        <p className="mt-1 text-sm n-muted">
          {lang === 'en'
            ? 'Systems Engineering at USAC completed in 2026 (pensum closed, private exam passed) while working full-time in data; now a Data Engineer. Next: a master\'s degree starting February 2027.'
            : 'Ingeniería en Sistemas en la USAC completada en 2026 (pensum cerrado, examen privado aprobado) mientras trabajaba a tiempo completo en datos; hoy Ingeniero de Datos. Siguiente paso: maestría a partir de febrero de 2027.'}
        </p>
      </div>
    </div>
  );
}
