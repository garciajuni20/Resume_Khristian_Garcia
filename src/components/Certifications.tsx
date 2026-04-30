import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
  type: 'professional' | 'academic' | 'training';
}

export default function Certifications() {
  const { lang } = useLang();

  const certifications: Certification[] = [
    {
      id: 'snowflake-fundamentals',
      title: lang === 'en' ? 'Snowflake Fundamentals' : 'Fundamentos de Snowflake',
      issuer: 'Snowflake Inc.',
      date: '2024-06',
      skills: ['Snowflake', 'Data Warehousing', 'SQL', 'Virtual Warehouses'],
      type: 'professional'
    },
    {
      id: 'power-bi-analytics',
      title: 'Power BI Data Analytics',
      issuer: 'Microsoft',
      date: '2024-03',
      skills: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
      type: 'professional'
    },
    {
      id: 'docker-cloud-native',
      title: lang === 'en' ? 'Docker & Cloud-Native Containers Workshop' : 'Taller Docker & Contenedores Cloud-Native',
      issuer: lang === 'en' ? 'Cloud-Native + GT Community' : 'Comunidad Cloud-Native + GT',
      date: '2025-08',
      url: 'https://github.com/garciajuni20/taller-docker',
      skills: ['Docker', 'Containers', 'Microservices', 'DevOps'],
      type: 'training'
    },
    {
      id: 'usac-compilers',
      title: lang === 'en' ? 'Compilers 2 — PEG Parsers & Language Design' : 'Compiladores 2 — Parsers PEG y Diseño de Lenguajes',
      issuer: lang === 'en' ? 'USAC — Systems Engineering' : 'USAC — Ingeniería en Sistemas',
      date: '2024-12',
      url: 'https://garciajuni20.github.io/G8_Fase2_FortranPEG/',
      skills: ['PEG Parsers', 'JavaScript', 'Svelte', 'Compiler Theory'],
      type: 'academic'
    },
    {
      id: 'usac-bd2',
      title: lang === 'en' ? 'Advanced Databases — BD2 Sufficiency' : 'Bases de Datos Avanzadas — Suficiencia BD2',
      issuer: lang === 'en' ? 'USAC — Systems Engineering' : 'USAC — Ingeniería en Sistemas',
      date: '2026-01',
      url: 'https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202',
      skills: ['Advanced Databases', 'Python', 'Database Design', 'Query Optimization'],
      type: 'academic'
    }
  ];

  const professional = certifications.filter(c => c.type === 'professional');
  const training = certifications.filter(c => c.type === 'training');
  const academic = certifications.filter(c => c.type === 'academic');

  const t = lang === 'en' ? {
    professional: 'Professional Certifications',
    training: 'Workshops & Training',
    academic: 'Academic Achievements',
    viewCredential: 'View Credential',
    viewProject: 'View Project',
    issued: 'Issued',
    skills: 'Skills',
    ongoing: 'In progress at USAC',
    profDesc: 'Vendor-issued certifications validating hands-on tool proficiency',
    trainDesc: 'Community workshops and technical training programs',
    acadDesc: 'Advanced coursework at USAC with public deliverables'
  } : {
    professional: 'Certificaciones Profesionales',
    training: 'Talleres y Capacitaciones',
    academic: 'Logros Académicos',
    viewCredential: 'Ver Credencial',
    viewProject: 'Ver Proyecto',
    issued: 'Emitido',
    skills: 'Habilidades',
    ongoing: 'En curso en la USAC',
    profDesc: 'Certificaciones emitidas por proveedores que validan competencia técnica práctica',
    trainDesc: 'Talleres comunitarios y programas de capacitación técnica',
    acadDesc: 'Cursos avanzados en la USAC con entregables públicos'
  };

  const getTypeIcon = (type: string) => {
    if (type === 'academic') return <GraduationCap className="h-5 w-5 text-white" />;
    if (type === 'training') return <Briefcase className="h-5 w-5 text-white" />;
    return <Award className="h-5 w-5 text-white" />;
  };

  const getTypeColor = (type: string) => {
    if (type === 'academic') return 'from-purple-500 to-purple-600';
    if (type === 'training') return 'from-orange-500 to-orange-600';
    return 'from-blue-500 to-blue-600';
  };

  const renderGroup = (
    items: Certification[],
    title: string,
    description: string,
    badgeClass: string
  ) => (
    <div className="mb-10">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h4>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-start gap-4">
              <div className={`shrink-0 rounded-xl bg-gradient-to-br ${getTypeColor(cert.type)} p-2.5`}>
                {getTypeIcon(cert.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-neutral-900 dark:text-white leading-snug">
                    {cert.title}
                  </h5>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>
                    {cert.type === 'professional' ? (lang === 'en' ? 'Certified' : 'Certificado') :
                     cert.type === 'training' ? (lang === 'en' ? 'Workshop' : 'Taller') :
                     (lang === 'en' ? 'Academic' : 'Académico')}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-3 text-sm">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{cert.issuer}</span>
                  <div className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">{cert.date}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
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
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
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
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      )}

      {renderGroup(
        training,
        t.training,
        t.trainDesc,
        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
      )}

      {renderGroup(
        academic,
        t.academic,
        t.acadDesc,
        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
      )}

      <div className="rounded-xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {lang === 'en' ? 'Continuous Learning' : 'Aprendizaje Continuo'}
        </p>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {lang === 'en'
            ? 'Currently completing Systems Engineering at USAC while working full-time as a BI Analyst. Next target: AWS Data Analytics Specialty.'
            : 'Actualmente completando Ingeniería en Sistemas en la USAC mientras trabaja a tiempo completo como Analista BI. Próximo objetivo: AWS Data Analytics Specialty.'}
        </p>
      </div>
    </div>
  );
}
