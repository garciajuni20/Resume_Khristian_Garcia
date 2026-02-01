import { motion } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  BarChart3, 
  Cpu, 
  Code2, 
  Server,
  Container,
  GitBranch,
  Workflow
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
  level: 'advanced' | 'intermediate' | 'beginner';
}

export default function SkillsDashboard() {
  const { lang } = useLang();

  const categories: SkillCategory[] = [
    {
      id: 'data',
      title: lang === 'en' ? 'Data Engineering' : 'Ingeniería de Datos',
      icon: <Database className="h-5 w-5" />,
      skills: ['Snowflake', 'SQL', 'PostgreSQL', 'MySQL', 'Data Modeling', 'ETL'],
      level: 'advanced'
    },
    {
      id: 'bi',
      title: lang === 'en' ? 'Business Intelligence' : 'Inteligencia de Negocios',
      icon: <BarChart3 className="h-5 w-5" />,
      skills: ['Power BI', 'Tableau', 'Data Analytics', 'Dashboard Design', 'KPI Metrics'],
      level: 'advanced'
    },
    {
      id: 'cloud',
      title: lang === 'en' ? 'Cloud & DevOps' : 'Cloud & DevOps',
      icon: <Cloud className="h-5 w-5" />,
      skills: ['GCP', 'Kubernetes', 'Docker', 'CI/CD', 'Infrastructure as Code'],
      level: 'intermediate'
    },
    {
      id: 'dev',
      title: lang === 'en' ? 'Full-Stack Development' : 'Desarrollo Full-Stack',
      icon: <Code2 className="h-5 w-5" />,
      skills: ['React', 'TypeScript', 'Python', 'REST APIs', 'Tailwind CSS'],
      level: 'intermediate'
    },
    {
      id: 'systems',
      title: lang === 'en' ? 'Systems Architecture' : 'Arquitectura de Sistemas',
      icon: <Server className="h-5 w-5" />,
      skills: ['System Design', 'Microservices', 'API Design', 'Scalability', 'Performance'],
      level: 'advanced'
    },
    {
      id: 'tools',
      title: lang === 'en' ? 'Development Tools' : 'Herramientas de Desarrollo',
      icon: <Workflow className="h-5 w-5" />,
      skills: ['Git', 'Docker Compose', 'K8s Manifests', 'Power Automate', 'Power Apps'],
      level: 'intermediate'
    }
  ];

  const getLevelColor = (level: SkillCategory['level']) => {
    switch (level) {
      case 'advanced': return 'bg-green-500 dark:bg-green-600';
      case 'intermediate': return 'bg-blue-500 dark:bg-blue-600';
      case 'beginner': return 'bg-yellow-500 dark:bg-yellow-600';
      default: return 'bg-gray-500';
    }
  };

  const getLevelText = (level: SkillCategory['level']) => {
    if (lang === 'en') {
      switch (level) {
        case 'advanced': return 'Advanced';
        case 'intermediate': return 'Intermediate';
        case 'beginner': return 'Beginner';
      }
    } else {
      switch (level) {
        case 'advanced': return 'Avanzado';
        case 'intermediate': return 'Intermedio';
        case 'beginner': return 'Principiante';
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {lang === 'en' ? 'Technical Skills Dashboard' : 'Panel de Habilidades Técnicas'}
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {lang === 'en' 
            ? 'Comprehensive overview of my technical expertise across different domains'
            : 'Visión completa de mi experiencia técnica en diferentes dominios'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-2 dark:bg-blue-900/30">
                  {category.icon}
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white">
                  {category.title}
                </h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getLevelColor(category.level)}`}>
                {getLevelText(category.level)}
              </span>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{skill}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-6 rounded-full ${
                          i <= (category.level === 'advanced' ? 3 : category.level === 'intermediate' ? 2 : 1)
                            ? 'bg-blue-500 dark:bg-blue-400'
                            : 'bg-neutral-200 dark:bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {lang === 'en' ? 'Experience' : 'Experiencia'}:{' '}
                <span className="font-semibold">
                  {category.level === 'advanced' 
                    ? (lang === 'en' ? '3+ years' : '3+ años')
                    : category.level === 'intermediate'
                    ? (lang === 'en' ? '1-3 years' : '1-3 años')
                    : (lang === 'en' ? '<1 year' : '<1 año')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="flex items-center gap-3">
          <Container className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-semibold text-neutral-900 dark:text-white">
            {lang === 'en' ? 'Containerization Expertise' : 'Expertise en Contenedores'}
          </h4>
        </div>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {lang === 'en'
            ? 'Proficient in Docker containerization and Kubernetes orchestration for scalable, production-ready applications.'
            : 'Competente en contenedores Docker y orquestación Kubernetes para aplicaciones escalables y listas para producción.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Docker', 'Kubernetes', 'Docker Compose', 'Container Security', 'Pod Design'].map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-neutral-800 dark:text-blue-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}