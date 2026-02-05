import Container from '../components/Container';
import { useLang } from '../context/LanguageContext';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Database, LineChart, Code, Cloud, Server, Zap, Layers } from 'lucide-react';
import BlogSection from '../components/BlogSection';

interface Project {
  id: string;
  title: string;
  description: string;
  descriptionEs: string;
  technologies: string[];
  category: 'data' | 'web' | 'cloud' | 'architecture';
  impact?: string;
  impactEs?: string;
  role: string;
  roleEs: string;
  duration: string;
  teamSize: string;
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
      title: 'Interactive Portfolio Website',
      description: 'React + TypeScript + Tailwind portfolio with language + theme toggles, filters, and structured resume content. Demonstrates full-stack capabilities with CI/CD deployment to GitHub Pages.',
      descriptionEs: 'Portafolio en React + TypeScript + Tailwind con toggle de idioma + tema, filtros y CV estructurado. Demuestra capacidades full-stack con despliegue CI/CD en GitHub Pages.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions', 'CI/CD', 'Vite'],
      category: 'web',
      impact: 'Showcases technical skills with 100% performance score on Lighthouse',
      impactEs: 'Muestra habilidades técnicas con puntuación de rendimiento 100% en Lighthouse',
      role: 'Full-Stack Developer & Designer',
      roleEs: 'Desarrollador Full-Stack & Diseñador',
      duration: '3 weeks',
      teamSize: 'Solo project',
      links: {
        github: 'https://github.com/garciajuni20/Resume_Khristian_Garcia',
        live: 'https://garciajuni20.github.io/Resume_Khristian_Garcia/'
      },
      featured: true
    },
    {
      id: 'data-pipeline',
      title: 'Scalable ETL Data Pipeline',
      description: 'Designed and implemented a production-ready ETL pipeline using Snowflake, Python, and Docker. Includes data modeling, transformation, validation, and orchestration components.',
      descriptionEs: 'Diseñé e implementé un pipeline ETL listo para producción usando Snowflake, Python y Docker. Incluye componentes de modelado, transformación, validación y orquestación de datos.',
      technologies: ['Snowflake', 'Python', 'Docker', 'ETL', 'Data Modeling', 'Apache Airflow', 'Great Expectations'],
      category: 'data',
      impact: 'Reduced data processing time by 70% and improved data accuracy to 99.9%',
      impactEs: 'Redujo tiempo de procesamiento de datos en 70% y mejoró exactitud de datos a 99.9%',
      role: 'Lead Data Engineer',
      roleEs: 'Ingeniero de Datos Líder',
      duration: '6 months',
      teamSize: '3 engineers',
      featured: true
    },
    {
      id: 'bi-dashboard',
      title: 'Enterprise BI Dashboard Suite',
      description: 'Comprehensive BI dashboard suite for financial analytics using Power BI and Tableau. Features real-time data visualization, KPI tracking, predictive analytics, and automated reporting.',
      descriptionEs: 'Suite integral de dashboards BI para análisis financiero usando Power BI y Tableau. Incluye visualización de datos en tiempo real, seguimiento de KPIs, analytics predictivo y reporting automatizado.',
      technologies: ['Power BI', 'Tableau', 'SQL', 'DAX', 'Data Visualization', 'Snowflake', 'Azure'],
      category: 'data',
      impact: 'Enabled real-time decision making and reduced reporting time from days to minutes',
      impactEs: 'Habilitó toma de decisiones en tiempo real y redujo tiempo de reporting de días a minutos',
      role: 'BI Analyst & Dashboard Developer',
      roleEs: 'Analista BI & Desarrollador de Dashboards',
      duration: '4 months',
      teamSize: '2 analysts + 1 stakeholder',
      featured: true
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Infrastructure Design',
      description: 'GCP-based infrastructure design with Kubernetes orchestration, containerized applications, and automated CI/CD pipelines for scalable deployments. Includes monitoring and cost optimization.',
      descriptionEs: 'Diseño de infraestructura basada en GCP con orquestación Kubernetes, aplicaciones contenerizadas y pipelines CI/CD automatizados para despliegues escalables. Incluye monitoreo y optimización de costos.',
      technologies: ['GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Helm', 'Prometheus', 'Grafana'],
      category: 'cloud',
      impact: 'Reduced deployment time by 80% and improved system reliability to 99.95% uptime',
      impactEs: 'Redujo tiempo de despliegue en 80% y mejoró confiabilidad del sistema a 99.95% uptime',
      role: 'Cloud Architect & DevOps Engineer',
      roleEs: 'Arquitecto Cloud & Ingeniero DevOps',
      duration: '5 months',
      teamSize: '4 engineers',
      featured: false
    },
    {
      id: 'system-architecture',
      title: 'Microservices Architecture Design',
      description: 'Designed and documented a microservices-based system architecture with API gateways, service discovery, distributed data management, and event-driven communication patterns.',
      descriptionEs: 'Diseñé y documenté una arquitectura de sistema basada en microservicios con API gateways, discovery de servicios, gestión distribuida de datos y patrones de comunicación event-driven.',
      technologies: ['Microservices', 'REST APIs', 'System Design', 'Architecture Patterns', 'Event Sourcing', 'CQRS'],
      category: 'architecture',
      impact: 'Improved system scalability from 10k to 100k concurrent users',
      impactEs: 'Mejoró escalabilidad del sistema de 10k a 100k usuarios concurrentes',
      role: 'Systems Architect',
      roleEs: 'Arquitecto de Sistemas',
      duration: '2 months',
      teamSize: 'Lead architect + 2 engineers',
      featured: false
    },
    {
      id: 'data-warehouse',
      title: 'Modern Data Warehouse Implementation',
      description: 'Implemented a modern data warehouse solution using Snowflake, dbt, and data orchestration tools. Included data modeling, ETL processes, and data quality monitoring.',
      descriptionEs: 'Implementé una solución moderna de data warehouse usando Snowflake, dbt y herramientas de orquestación de datos. Incluyó modelado de datos, procesos ETL y monitoreo de calidad de datos.',
      technologies: ['Snowflake', 'dbt', 'SQL', 'Python', 'Data Modeling', 'Data Quality', 'Data Governance'],
      category: 'data',
      impact: 'Unified data from 15+ sources and improved query performance by 5x',
      impactEs: 'Unificó datos de 15+ fuentes y mejoró rendimiento de consultas 5 veces',
      role: 'Data Warehouse Engineer',
      roleEs: 'Ingeniero de Data Warehouse',
      duration: '8 months',
      teamSize: '3 engineers + 2 data analysts',
      featured: false
    }
  ];

  const categories = [
    { id: 'data', labelEn: 'Data & BI', labelEs: 'Datos & BI', icon: <Database className="h-4 w-4" />, count: 3 },
    { id: 'web', labelEn: 'Web Development', labelEs: 'Desarrollo Web', icon: <Code className="h-4 w-4" />, count: 1 },
    { id: 'cloud', labelEn: 'Cloud & DevOps', labelEs: 'Cloud & DevOps', icon: <Cloud className="h-4 w-4" />, count: 1 },
    { id: 'architecture', labelEn: 'Architecture', labelEs: 'Arquitectura', icon: <Server className="h-4 w-4" />, count: 1 }
  ];

  const t = lang === 'en' ? {
    title: 'Projects',
    subtitle: 'A showcase of my work across data engineering, full-stack development, cloud architecture, and systems design.',
    viewAll: 'View All Projects',
    viewGithub: 'View on GitHub',
    viewLive: 'View Live',
    technologies: 'Technologies',
    category: 'Category',
    featured: 'Featured Projects',
    allProjects: 'All Projects',
    impact: 'Impact',
    role: 'Role',
    duration: 'Duration',
    team: 'Team Size'
  } : {
    title: 'Proyectos',
    subtitle: 'Una muestra de mi trabajo en ingeniería de datos, desarrollo full-stack, arquitectura cloud y diseño de sistemas.',
    viewAll: 'Ver Todos los Proyectos',
    viewGithub: 'Ver en GitHub',
    viewLive: 'Ver en Vivo',
    technologies: 'Tecnologías',
    category: 'Categoría',
    featured: 'Proyectos Destacados',
    allProjects: 'Todos los Proyectos',
    impact: 'Impacto',
    role: 'Rol',
    duration: 'Duración',
    team: 'Tamaño de Equipo'
  };

  useSEO({
    title: t.title,
    description: t.subtitle,
    lang,
    keywords: ['projects', 'portfolio', 'data engineering', 'cloud architecture', 'BI dashboards', 'React projects']
  });

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.icon || <Code className="h-4 w-4" />;
  };

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return lang === 'en' ? category?.labelEn : category?.labelEs;
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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
                <span className="ml-1 rounded-full bg-neutral-100 px-2 py-0.5 text-xs dark:bg-neutral-700">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Proyectos Destacados */}
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t.featured}</h2>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {featuredProjects.length} {lang === 'en' ? 'projects' : 'proyectos'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="absolute right-4 top-4">
                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                      {getCategoryIcon(project.category)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {project.title}
                  </h3>

                  <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                    {lang === 'en' ? project.description : project.descriptionEs}
                  </p>

                  {project.impact && (
                    <div className="mb-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-3 w-3 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                          {t.impact}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {lang === 'en' ? project.impact : project.impactEs}
                      </p>
                    </div>
                  )}

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">{t.role}</span>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {lang === 'en' ? project.role : project.roleEs}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">{t.duration}</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400">{t.team}</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{project.teamSize}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {t.technologies}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                          +{project.technologies.length - 5}
                        </span>
                      )}
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
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{t.allProjects}</h2>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {otherProjects.length} {lang === 'en' ? 'projects' : 'proyectos'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-blue-100 p-1.5 dark:bg-blue-900/30">
                            {getCategoryIcon(project.category)}
                          </div>
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {getCategoryLabel(project.category)}
                        </span>
                      </div>
                      
                      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                        {lang === 'en' ? project.description : project.descriptionEs}
                      </p>
                      
                      {project.impact && (
                        <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
                          <Zap className="h-3 w-3 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">
                            {lang === 'en' ? project.impact : project.impactEs}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">{t.role}</span>
                          <div className="font-medium text-neutral-900 dark:text-white">
                            {lang === 'en' ? project.role : project.roleEs}
                          </div>
                        </div>
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">{t.duration}</span>
                          <div className="font-medium text-neutral-900 dark:text-white">{project.duration}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">{t.team}</span>
                          <div className="font-medium text-neutral-900 dark:text-white">{project.teamSize}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 8).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 lg:flex-col">
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

          {/* Blog Section */}
          <div className="mb-12">
            <BlogSection />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
            <h3 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
              {lang === 'en' ? 'Have a project in mind?' : '¿Tienes un proyecto en mente?'}
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-300">
              {lang === 'en'
                ? 'I\'m available for freelance projects, consulting, and full-time opportunities in data engineering, BI, cloud architecture, and full-stack development.'
                : 'Estoy disponible para proyectos freelance, consultoría y oportunidades de tiempo completo en ingeniería de datos, BI, arquitectura cloud y desarrollo full-stack.'}
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