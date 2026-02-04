import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Database, LineChart, Code, Cloud, Server } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  descriptionEs: string;
  technologies: string[];
  category: 'data' | 'web' | 'cloud' | 'architecture';
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured: boolean;
}

export default function Projects() {
  const { lang } = useLang();

  const projects: Project[] = [
    {
      id: 'portfolio',
      title: 'Interactive Portfolio',
      description: 'React + TypeScript + Tailwind portfolio with language + theme toggles, filters, and structured resume content. Demonstrates full-stack capabilities with CI/CD deployment.',
      descriptionEs: 'Portafolio en React + TypeScript + Tailwind con toggle de idioma + tema, filtros y CV estructurado. Demuestra capacidades full-stack con despliegue CI/CD.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions', 'CI/CD'],
      category: 'web',
      links: {
        github: 'https://github.com/garciajuni20/Resume_Khristian_Garcia',
        live: 'https://garciajuni20.github.io/Resume_Khristian_Garcia/'
      },
      featured: true
    },
    {
      id: 'data-pipeline',
      title: 'Data Pipeline Architecture',
      description: 'Designed and implemented a scalable ETL pipeline using Snowflake, Python, and Docker. Includes data modeling, transformation, and visualization components.',
      descriptionEs: 'Diseñé e implementé un pipeline ETL escalable usando Snowflake, Python y Docker. Incluye componentes de modelado, transformación y visualización de datos.',
      technologies: ['Snowflake', 'Python', 'Docker', 'ETL', 'Data Modeling', 'Airflow'],
      category: 'data',
      featured: true
    },
    {
      id: 'bi-dashboard',
      title: 'Business Intelligence Dashboard',
      description: 'Comprehensive BI dashboard for financial analytics using Power BI and Tableau. Features real-time data visualization, KPI tracking, and predictive analytics.',
      descriptionEs: 'Dashboard integral de BI para análisis financiero usando Power BI y Tableau. Incluye visualización de datos en tiempo real, seguimiento de KPIs y analytics predictivo.',
      technologies: ['Power BI', 'Tableau', 'SQL', 'DAX', 'Data Visualization'],
      category: 'data',
      featured: true
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Infrastructure Design',
      description: 'GCP-based infrastructure design with Kubernetes orchestration, containerized applications, and automated CI/CD pipelines for scalable deployments.',
      descriptionEs: 'Diseño de infraestructura basada en GCP con orquestación Kubernetes, aplicaciones contenerizadas y pipelines CI/CD automatizados para despliegues escalables.',
      technologies: ['GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Helm'],
      category: 'cloud',
      featured: false
    },
    {
      id: 'system-architecture',
      title: 'Microservices Architecture',
      description: 'Designed and documented a microservices-based system architecture with API gateways, service discovery, and distributed data management.',
      descriptionEs: 'Diseñé y documenté una arquitectura de sistema basada en microservicios con API gateways, discovery de servicios y gestión distribuida de datos.',
      technologies: ['Microservices', 'REST APIs', 'System Design', 'Architecture Patterns', 'Documentation'],
      category: 'architecture',
      featured: false
    }
  ];

  const categories = [
    { id: 'data', labelEn: 'Data & BI', labelEs: 'Datos & BI', icon: <Database className="h-4 w-4" /> },
    { id: 'web', labelEn: 'Web Development', labelEs: 'Desarrollo Web', icon: <Code className="h-4 w-4" /> },
    { id: 'cloud', labelEn: 'Cloud & DevOps', labelEs: 'Cloud & DevOps', icon: <Cloud className="h-4 w-4" /> },
    { id: 'architecture', labelEn: 'Architecture', labelEs: 'Arquitectura', icon: <Server className="h-4 w-4" /> }
  ];

  const t = lang === 'en' ? {
    title: 'Projects',
    subtitle: 'A showcase of my work across data engineering, full-stack development, and systems architecture.',
    viewAll: 'View All Projects',
    viewGithub: 'View on GitHub',
    viewLive: 'View Live',
    technologies: 'Technologies',
    category: 'Category',
    featured: 'Featured Projects',
    allProjects: 'All Projects'
  } : {
    title: 'Proyectos',
    subtitle: 'Una muestra de mi trabajo en ingeniería de datos, desarrollo full-stack y arquitectura de sistemas.',
    viewAll: 'Ver Todos los Proyectos',
    viewGithub: 'Ver en GitHub',
    viewLive: 'Ver en Vivo',
    technologies: 'Tecnologías',
    category: 'Categoría',
    featured: 'Proyectos Destacados',
    allProjects: 'Todos los Proyectos'
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['projects', 'portfolio', 'data engineering', 'cloud architecture', 'BI dashboards']
  });

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.icon;
  };

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return lang === 'en' ? category?.labelEn : category?.labelEs;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-50">
      <Container>
        <motion.div
          className="py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Categorías */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                {category.icon}
                {lang === 'en' ? category.labelEn : category.labelEs}
              </button>
            ))}
          </div>

          {/* Proyectos Destacados */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">{t.featured}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.filter(p => p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-100 p-2 dark:bg-blue-900/30">
                        {getCategoryIcon(project.category)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <div className="mt-1 flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            {getCategoryLabel(project.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                    {lang === 'en' ? project.description : project.descriptionEs}
                  </p>

                  <div className="mb-6">
                    <div className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {t.technologies}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                      >
                        <Github className="h-4 w-4" />
                        {t.viewGithub}
                      </a>
                    )}
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t.viewLive}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Todos los Proyectos */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">{t.allProjects}</h2>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-1.5 dark:bg-blue-900/30">
                          {getCategoryIcon(project.category)}
                        </div>
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        {project.featured && (
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      
                      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                        {lang === 'en' ? project.description : project.descriptionEs}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                          title="GitHub"
                        >
                          <Github className="h-3 w-3" />
                        </a>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
            <h3 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
              {lang === 'en' ? 'Have a project in mind?' : '¿Tienes un proyecto en mente?'}
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">
              {lang === 'en'
                ? 'I\'m available for freelance projects, consulting, and full-time opportunities in data engineering, BI, and systems architecture.'
                : 'Estoy disponible para proyectos freelance, consultoría y oportunidades de tiempo completo en ingeniería de datos, BI y arquitectura de sistemas.'}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {lang === 'en' ? 'Let\'s Talk' : 'Hablemos'}
            </a>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}