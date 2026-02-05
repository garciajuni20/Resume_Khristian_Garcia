import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, CheckCircle, Shield } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
  verified?: boolean;
}

export default function Certifications() {
  const { lang } = useLang();

  const certifications: Certification[] = [
    {
      id: 'snowflake-fundamentals',
      title: 'Snowflake Fundamentals',
      issuer: 'Snowflake Inc.',
      date: '2024-06',
      skills: ['Snowflake', 'Data Warehousing', 'SQL', 'ETL'],
      verified: true
    },
    {
      id: 'power-bi-advanced',
      title: 'Power BI Advanced Analytics',
      issuer: 'Microsoft',
      date: '2024-03',
      skills: ['Power BI', 'DAX', 'Data Visualization', 'Dashboard Design'],
      verified: true
    },
    {
      id: 'gcp-ace',
      title: 'Google Cloud Associate Engineer',
      issuer: 'Google Cloud',
      date: '2024-01',
      credentialId: 'ACE-2024-00123',
      url: 'https://www.credential.net/example',
      skills: ['GCP', 'Cloud Architecture', 'Kubernetes', 'Infrastructure'],
      verified: true
    },
    {
      id: 'react-advanced',
      title: 'Advanced React Patterns',
      issuer: 'Frontend Masters',
      date: '2023-11',
      skills: ['React', 'TypeScript', 'Performance', 'State Management'],
      verified: true
    },
    {
      id: 'python-data-science',
      title: 'Python for Data Science & Machine Learning',
      issuer: 'Coursera',
      date: '2023-09',
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Data Analysis'],
      verified: true
    },
    {
      id: 'docker-kubernetes',
      title: 'Docker & Kubernetes Certified',
      issuer: 'Linux Foundation',
      date: '2023-07',
      skills: ['Docker', 'Kubernetes', 'Containerization', 'CI/CD'],
      verified: true
    }
  ];

  const t = lang === 'en' ? {
    title: 'Certifications & Achievements',
    subtitle: 'Professional certifications validating technical expertise across multiple domains',
    viewCredential: 'View Credential',
    issued: 'Issued',
    skills: 'Validated Skills',
    verified: 'Verified',
    allCertifications: 'All Certifications'
  } : {
    title: 'Certificaciones & Logros',
    subtitle: 'Certificaciones profesionales que validan experiencia técnica en múltiples dominios',
    viewCredential: 'Ver Credencial',
    issued: 'Emitido',
    skills: 'Habilidades Validadas',
    verified: 'Verificado',
    allCertifications: 'Todas las Certificaciones'
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h3>
        </div>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {cert.title}
                      </h4>
                      
                      {cert.verified && (
                        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <CheckCircle className="h-3 w-3" />
                          <span>{t.verified}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                        <Shield className="h-3 w-3" />
                        <span className="font-medium">{cert.issuer}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-500">
                        <Calendar className="h-3 w-3" />
                        <span>{cert.date}</span>
                      </div>
                      
                      {cert.credentialId && (
                        <div className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                          ID: {cert.credentialId}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t.skills}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {cert.url && (
                <div className="lg:self-center">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t.viewCredential}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              {lang === 'en' ? 'Continuous Learning' : 'Aprendizaje Continuo'}
            </h4>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {lang === 'en' 
                ? 'Currently studying for Advanced Data Engineering and Cloud Architecture certifications'
                : 'Actualmente estudiando para certificaciones avanzadas de Ingeniería de Datos y Arquitectura Cloud'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-neutral-800 dark:text-blue-300">
              AWS Certified
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-neutral-800 dark:text-blue-300">
              Azure Data
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-neutral-800 dark:text-blue-300">
              Data Engineering
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}