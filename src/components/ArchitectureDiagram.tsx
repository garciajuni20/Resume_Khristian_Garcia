import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Layers, Database, Cpu, Cloud, Zap } from 'lucide-react';

export default function ArchitectureDiagram() {
  const { lang } = useLang();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = [
    {
      id: 'presentation',
      name: lang === 'en' ? 'Presentation Layer' : 'Capa de Presentación',
      icon: <Layers className="h-5 w-5" />,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      description: lang === 'en' 
        ? 'Modern UI/UX with responsive design and smooth animations'
        : 'UI/UX moderna con diseño responsivo y animaciones fluidas'
    },
    {
      id: 'application',
      name: lang === 'en' ? 'Application Layer' : 'Capa de Aplicación',
      icon: <Cpu className="h-5 w-5" />,
      technologies: ['Node.js', 'Python', 'REST APIs', 'Microservices'],
      description: lang === 'en'
        ? 'Business logic and API services'
        : 'Lógica de negocio y servicios API'
    },
    {
      id: 'data',
      name: lang === 'en' ? 'Data Layer' : 'Capa de Datos',
      icon: <Database className="h-5 w-5" />,
      technologies: ['Snowflake', 'PostgreSQL', 'MySQL', 'Redis'],
      description: lang === 'en'
        ? 'Data storage, processing, and analytics'
        : 'Almacenamiento, procesamiento y análisis de datos'
    },
    {
      id: 'infrastructure',
      name: lang === 'en' ? 'Infrastructure Layer' : 'Capa de Infraestructura',
      icon: <Cloud className="h-5 w-5" />,
      technologies: ['GCP', 'Kubernetes', 'Docker', 'CI/CD'],
      description: lang === 'en'
        ? 'Cloud infrastructure and deployment'
        : 'Infraestructura cloud y despliegue'
    },
    {
      id: 'monitoring',
      name: lang === 'en' ? 'Monitoring & Observability' : 'Monitoreo & Observabilidad',
      icon: <Zap className="h-5 w-5" />,
      technologies: ['Prometheus', 'Grafana', 'Logging', 'Alerting'],
      description: lang === 'en'
        ? 'Performance monitoring and system observability'
        : 'Monitoreo de rendimiento y observabilidad del sistema'
    }
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {lang === 'en' ? 'Systems Architecture Expertise' : 'Expertise en Arquitectura de Sistemas'}
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {lang === 'en'
            ? 'Experience designing and implementing scalable, maintainable system architectures'
            : 'Experiencia diseñando e implementando arquitecturas de sistemas escalables y mantenibles'}
        </p>
      </div>

      <div className="relative">
        {/* Línea de conexión */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 -translate-x-1/2 hidden lg:block" />

        <div className="space-y-8 lg:space-y-12">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Contenido del lado izquierdo/derecho */}
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                <div className="inline-block">
                  <button
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    className={`group rounded-2xl border p-6 text-left transition-all ${
                      activeLayer === layer.id
                        ? 'border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
                        : 'border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-xl bg-blue-100 p-2 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                        {layer.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {layer.name}
                      </h4>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-neutral-800 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              </div>

              {/* Nodo central */}
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-white dark:bg-neutral-900">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
                <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-blue-400/20" />
              </div>

              {/* Lado opuesto (vacío para balance) */}
              <div className="lg:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {activeLayer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-6 dark:border-blue-800 dark:bg-blue-900/10"
        >
          <h4 className="mb-3 font-semibold text-blue-700 dark:text-blue-300">
            {lang === 'en' ? 'Architecture Pattern' : 'Patrón de Arquitectura'}
          </h4>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {lang === 'en'
              ? 'Experience implementing layered architecture patterns for separation of concerns, scalability, and maintainability. Proficient in microservices design, API gateways, and distributed systems.'
              : 'Experiencia implementando patrones de arquitectura por capas para separación de responsabilidades, escalabilidad y mantenibilidad. Competente en diseño de microservicios, API gateways y sistemas distribuidos.'}
          </p>
        </motion.div>
      )}
    </div>
  );
}