import type { ProfileData } from "../types"

export const profileES = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Analista de Datos · Inteligencia de Negocios · Desarrollo Full-Stack",
  location: "Ciudad de Guatemala, Guatemala",
  email: "garciajuni20@gmail.com",
  phone: "+502 5633 8735",
  photoUrl:
    "https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khristian-garcia--/" },
    { label: "GitHub", href: "https://github.com/garciajuni20" }
  ],
  summary:
    "Profesional tecnológico con más de 6 años de experiencia en operaciones de red, infraestructura TI e inteligencia de negocios. Construí desde cero la función de BI para Alleviate Financial Solutions en Guatemala — diseñando modelos de datos en Snowflake, dashboards en Power BI y pipelines SQL que hoy impulsan decisiones financieras en 5 departamentos. Simultáneamente, finalizando la carrera de Ingeniería en Sistemas en la USAC y ejerciendo como instructor académico de Inteligencia de Negocios. También desarrollo aplicaciones web en producción con React y TypeScript, desplegadas en Cloudflare y GitHub Pages.",

  badges: ["Snowflake", "Experto SQL", "Power BI", "React · TypeScript", "Modelado de Datos", "Bilingüe EN/ES"],

  keyAchievements: [
    "Mejoré la precisión de datos del 85% al 99.5% diseñando modelos de datos en Snowflake para reportes financieros en 5 departamentos.",
    "Reduje el ciclo de reportes financieros de 2+ días a menos de 30 minutos mediante pipelines SQL automatizados y dashboards en Power BI.",
    "Eliminé el 90% de errores recurrentes en reportes implementando validaciones de datos y flujos de alertas en Snowflake.",
    "Desarrollé y desplegué 3 aplicaciones web en producción en Cloudflare Pages con React, TypeScript y Tailwind CSS."
  ],

  experience: [
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Instructor Académico — Sistemas Organizacionales (Práctica Final)",
      start: "2025-08",
      end: "present",
      location: "Ciudad de Guatemala",
      tags: ["Docencia", "BI", "Sistemas", "Liderazgo"],
      bullets: [
        "Seleccionado para impartir Sistemas Organizacionales y Gerenciales 1 (Código 0786) como práctica final de Ingeniería en Sistemas.",
        "Cursos impartidos: fundamentos de Analítica de Negocios, Sistemas de Información, conceptos ERP/CRM y Transformación Digital.",
        "Guié a estudiantes en proyectos reales de Business Intelligence y casos de análisis de datos.",
        "Desarrollé materiales y ejercicios de laboratorio que traducen teoría académica en habilidades de datos aplicadas.",
        "Puente entre el currículo universitario y la industria — llevando experiencia de campo de Alleviate al aula."
      ]
    },
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios / Analista de Datos",
      start: "2024-12",
      end: "present",
      location: "Remoto (Guatemala → EE. UU.)",
      tags: ["BI", "Snowflake", "Power BI", "SQL", "Tableau", "Modelado de Datos"],
      bullets: [
        "Diseño y mantengo las capas analíticas en Snowflake — tablas, vistas y modelos de datos consultados en los 5 departamentos de la empresa.",
        "Construí la fuente única de verdad para reportes financieros y operativos, mejorando la precisión de datos del 85% al 99.5%.",
        "Desarrollé 15+ dashboards interactivos en Power BI y Tableau que reemplazaron procesos manuales en Excel.",
        "Reduje el ciclo de reportes financieros de más de 2 días a menos de 30 minutos mediante pipelines SQL automatizados.",
        "Defino y rastro 20+ KPIs en colaboración con stakeholders de EE. UU. en finanzas, operaciones y estrategia.",
        "Implementé flujos de validación de datos y alertas que eliminaron el 90% de errores recurrentes en reportes."
      ]
    },
    {
      id: "alleviate-jr",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios Jr",
      start: "2023-11",
      end: "2024-12",
      location: "Remoto (Guatemala → EE. UU.)",
      tags: ["BI", "SQL", "Reporting", "Análisis de Datos"],
      bullets: [
        "Primera contratación de BI en Guatemala para la cuenta de Alleviate Financial Solutions — construí la función desde cero.",
        "Diseñé 8+ modelos de datos core en Snowflake que se convirtieron en la base permanente de todo el reporting posterior.",
        "Traduje requerimientos de negocio de stakeholders en EE. UU. en modelos SQL, reportes y dashboards.",
        "Reduje el tiempo de reporting manual en 70% automatizando tareas recurrentes de extracción y transformación.",
        "Establecí estándares de documentación de datos y librerías de consultas que el equipo utiliza actualmente."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Ingeniero de Soporte TI / Administrador de Sistemas",
      start: "2023-01",
      end: "2023-11",
      location: "Ciudad de Guatemala",
      tags: ["TI", "Sysadmin", "Redes", "Migración Cloud"],
      bullets: [
        "Brindé soporte técnico empresarial y administración de sistemas para 100+ usuarios internos.",
        "Lideré la migración de sistemas locales a infraestructura cloud, reduciendo costos de hardware.",
        "Automaticé flujos de trabajo repetitivos con scripts, reduciendo el volumen de tickets en 40%.",
        "Gestioné protocolos de seguridad de red, control de acceso y administración de endpoints.",
        "Transicioné orgánicamente al rol de BI al identificar brechas de reportes durante el soporte en TI."
      ]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "Ingeniero de Soporte GNOC",
      start: "2019-01",
      end: "2023-01",
      location: "Ciudad de Guatemala",
      tags: ["Redes", "NOC", "Respuesta a Incidentes", "Monitoreo", "Operaciones"],
      bullets: [
        "Ingeniero de Centro de Operaciones de Red Global — monitoreo y mantenimiento de infraestructura crítica 24/7.",
        "Análisis de incidentes, investigación de causa raíz y escalamiento para servicios empresariales.",
        "Administré infraestructura que sirve a 5,000+ usuarios concurrentes en múltiples regiones geográficas.",
        "Reduje el tiempo medio de recuperación (MTTR) en 25% mediante monitoreo proactivo y sistemas de alerta.",
        "Implementé alertas automatizadas que mejoraron los tiempos de respuesta a incidentes en 60%.",
        "Mentoreé a 3 ingenieros junior — el hábito de enseñar que eventualmente me llevó al rol de instructor en la USAC."
      ]
    }
  ],

  skills: [
    { name: "SQL", level: 95 },
    { name: "Snowflake", level: 93 },
    { name: "Power BI", level: 90 },
    { name: "Modelado de Datos", level: 88 },
    { name: "ETL / Data Warehousing", level: 85 },
    { name: "Tableau", level: 78 },
    { name: "React", level: 82 },
    { name: "TypeScript", level: 80 },
    { name: "Python", level: 72 },
    { name: "Git", level: 85 },
    { name: "REST APIs", level: 75 },
    { name: "Docker", level: 68 },
    { name: "GCP", level: 65 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Licenciatura",
      area: "Ingeniería en Ciencias y Sistemas",
      end: "present",
      highlights: [
        "Cursos avanzados: Compiladores (parsers PEG, gramática Fortran), Bases de Datos 2 (BD2), Estructuras de Datos y Algoritmos",
        "Construí un parser PEG para Fortran en JavaScript como parte del curso de Compiladores 2 (disponible en GitHub Pages)",
        "Proyecto de suficiencia BD2: diseño avanzado de bases de datos en Python",
        "Actualmente ejerciendo como Instructor Académico mientras completo la carrera"
      ]
    }
  ],

  certifications: [
    {
      id: "snowflake-fundamentals",
      title: "Fundamentos de Snowflake",
      issuer: "Snowflake Inc.",
      date: "2024-06",
      skills: ["Snowflake", "Data Warehousing", "SQL", "Almacenes Virtuales", "Clustering"],
      verified: true,
      type: "professional"
    },
    {
      id: "power-bi-analytics",
      title: "Power BI Data Analytics",
      issuer: "Microsoft",
      date: "2024-03",
      skills: ["Power BI", "DAX", "Power Query", "Modelado de Datos", "Diseño de Dashboards"],
      verified: true,
      type: "professional"
    },
    {
      id: "docker-cloud-native",
      title: "Taller Docker & Contenedores Cloud-Native",
      issuer: "Comunidad Cloud-Native + GT",
      date: "2025-08",
      url: "https://github.com/garciajuni20/taller-docker",
      skills: ["Docker", "Contenedores", "Kubernetes", "Microservicios", "DevOps"],
      verified: true,
      type: "training"
    },
    {
      id: "usac-compilers",
      title: "Compiladores 2 — Parsers PEG y Diseño de Lenguajes",
      issuer: "USAC — Escuela de Ciencias y Sistemas",
      date: "2024-12",
      url: "https://garciajuni20.github.io/G8_Fase2_FortranPEG/",
      skills: ["Parsers PEG", "JavaScript", "Svelte", "Teoría de Compiladores", "Gramáticas Formales"],
      verified: true,
      type: "academic"
    },
    {
      id: "usac-bd2",
      title: "Bases de Datos Avanzadas — Suficiencia BD2",
      issuer: "USAC — Escuela de Ciencias y Sistemas",
      date: "2026-01",
      url: "https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202",
      skills: ["Bases de Datos Avanzadas", "Python", "Diseño de Bases de Datos", "Optimización de Consultas"],
      verified: true,
      type: "academic"
    }
  ],

  projects: [
    {
      id: "vale-combustible",
      title: "Continental Motores — Vales de Combustible",
      description: "Sistema full-stack de gestión de vales de combustible para empresa de flota vehicular. Incluye autenticación, generación de vales, flujos de aprobación multinivel y reportes de uso. Desplegado en Cloudflare Pages con CI/CD sin tiempo de inactividad.",
      impact: "Eliminó el proceso de vales en papel — las aprobaciones bajaron de días a minutos",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "Vite", "Authentication"],
      role: "Desarrollador Full-Stack",
      duration: "En curso",
      teamSize: "Individual",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Continental-Motores-Vales-Combustible", live: "https://continental-motores-vales-combustible.pages.dev/login" },
      featured: true,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "flowber-barberia",
      title: "Flowber — Plataforma Digital de Barbería",
      description: "Plataforma serverless de reservas y gestión de negocio: control de acceso de 3 roles (cliente/barbero/admin) con RLS de Postgres, citas en tiempo real, notificaciones multicanal (WhatsApp, Telegram, Email), asistente de chat según rol, e-commerce y capa de BI con vistas SQL de ingresos.",
      impact: "Digitalizó la agenda de punta a punta — eliminó las reservas telefónicas",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "Cloudflare Pages"],
      role: "Desarrollador Full-Stack & Diseñador",
      duration: "En curso",
      teamSize: "Individual",
      category: "web",
      links: { github: "https://github.com/garciajuni20/flowber-barberia", live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      gradient: "from-violet-500 to-indigo-600",
      caseStudyPath: "/projects/flowber"
    },
    {
      id: "portfolio",
      title: "Este Portafolio — CV Interactivo",
      description: "Portafolio en React + TypeScript con soporte bilingüe (EN/ES), modo oscuro/claro, medidores animados, filtros por etiqueta, generación dinámica de PDFs y auto-despliegue a GitHub Pages vía GitHub Actions.",
      impact: "Demuestra pensamiento de producto full-stack — este sitio ES el propio artefacto del portafolio",
      technologies: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GitHub Actions", "Vite", "@react-pdf/renderer"],
      role: "Desarrollador Full-Stack & Diseñador",
      duration: "3 semanas",
      teamSize: "Individual",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Resume_Khristian_Garcia", live: "https://garciajuni20.github.io/Resume_Khristian_Garcia/" },
      featured: true,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "snowflake-data-layer",
      title: "Capa de Datos Analítica en Snowflake",
      description: "Diseñé y construí la arquitectura completa de datos en Snowflake para Alleviate Financial Solutions — modelos en esquema estrella, vistas analíticas y transformaciones SQL optimizadas que alimentan dashboards de Power BI y Tableau en 5 departamentos.",
      impact: "Elevó la precisión de datos del 85% al 99.5% — se convirtió en la fuente de verdad de la empresa",
      technologies: ["Snowflake", "SQL", "Star Schema", "Data Modeling", "ETL", "dbt", "Data Validation"],
      role: "Ingeniero de Datos Líder / Analista BI",
      duration: "14+ meses",
      teamSize: "Individual (colaboración entre departamentos)",
      category: "data",
      featured: true,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: "bi-dashboard-suite",
      title: "Suite de Dashboards Financieros",
      description: "Suite integral de dashboards en Power BI y Tableau para reportes financieros y operativos en Alleviate Financial Solutions. Visualización en tiempo real, seguimiento de KPIs, análisis de tendencias y reportes PDF automatizados.",
      impact: "Redujo el ciclo de reportes de 2+ días a menos de 30 minutos — 15+ dashboards en producción",
      technologies: ["Power BI", "Tableau", "DAX", "Power Query", "Snowflake", "SQL"],
      role: "Desarrollador BI",
      duration: "14+ meses",
      teamSize: "2 analistas + stakeholders de EE. UU.",
      category: "data",
      featured: false,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "fortran-peg-parser",
      title: "FortranPEG — Generador de Parsers",
      description: "Generador de parsers para Fortran usando PEG (Parsing Expression Grammar) y análisis descendente recursivo. Incluye un IDE web para pruebas de gramática. Disponible en GitHub Pages.",
      impact: "Implementación completa de gramática Fortran con entorno interactivo de pruebas en vivo",
      technologies: ["JavaScript", "PEG Parsers", "Svelte", "Compiler Theory", "Recursive Descent"],
      role: "Desarrollador — Grupo 8, Compiladores 2",
      duration: "1 mes",
      teamSize: "3 estudiantes",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/G8_Fase2_FortranPEG", live: "https://garciajuni20.github.io/G8_Fase2_FortranPEG/" },
      featured: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "compilers-phase1",
      title: "Compiladores 2 — Fase 1 (App Svelte)",
      description: "Fase 1 del proyecto de Compiladores 2 — interfaz web de compilador con análisis léxico, tokenización y etapas tempranas de parsing.",
      impact: "Base sólida en teoría de front-end de compiladores aplicada a una implementación funcional",
      technologies: ["JavaScript", "Svelte", "Lexical Analysis", "Tokenization"],
      role: "Desarrollador — Grupo 8",
      duration: "3 semanas",
      teamSize: "3 estudiantes",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/Compi2_Grupo8" },
      featured: false,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      id: "bd2-suficiencia",
      title: "Bases de Datos Avanzadas — Suficiencia BD2",
      description: "Proyecto avanzado de bases de datos en Python para el examen de suficiencia BD2 en la USAC. Cubre optimización de consultas, estrategias de indexación y diseño complejo de esquemas.",
      impact: "Aplicó teoría avanzada de bases de datos a un entregable real y calificado",
      technologies: ["Python", "Advanced SQL", "Database Design", "Query Optimization", "Indexing"],
      role: "Estudiante — Ingeniería en Sistemas, USAC",
      duration: "2 semanas",
      teamSize: "Individual",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202" },
      featured: false,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: "docker-workshop",
      title: "Docker & Infraestructura Cloud-Native",
      description: "Contenedorización, Docker Compose, fundamentos de Kubernetes y diseño de pipelines CI/CD — completado en el taller de la comunidad Cloud-Native + GT.",
      impact: "Habilidades prácticas de contenedorización aplicadas a flujos de trabajo DevOps reales",
      technologies: ["Docker", "Docker Compose", "Kubernetes", "CI/CD", "Microservices", "GitHub Actions"],
      role: "Participante / Desarrollador",
      duration: "1 semana",
      teamSize: "Taller comunitario",
      category: "cloud",
      links: { github: "https://github.com/garciajuni20/taller-docker" },
      featured: false,
      gradient: "from-sky-500 to-blue-600"
    }
  ],

  languages: [
    { language: "Español", level: "Nativo", proficiency: 100 },
    { language: "Inglés", level: "Profesional / Fluido", proficiency: 92 },
    { language: "Italiano", level: "Básico", proficiency: 35 }
  ],

  tools: {
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "PostgreSQL", "MySQL", "Apache Airflow", "Great Expectations"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Excel", "Google Data Studio"],
    cloudDevOps: ["GCP", "Cloudflare Pages", "Docker", "GitHub Actions", "CI/CD", "Kubernetes"],
    fullStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "REST APIs", "Framer Motion"],
    methodologies: ["Agile", "Scrum", "DataOps", "Modelado Dimensional", "Modelado de Datos"]
  },

  metrics: {
    yearsExperience: 6,
    yearsBI: 2,
    dashboardsDelivered: 15,
    sqlModels: 20,
    kpisTracked: 20,
    liveApps: 3,
    projectsCompleted: 20,
    technologies: 18,
    certifications: 5,
    clientsServed: 8,
    dataProcessed: "100+ TB"
  },

  testimonials: [
    {
      id: "diego-zea",
      name: "Diego Zea",
      role: "Business Intelligence Manager",
      company: "Alleviate Financial Solutions",
      text: "La capacidad de Khristian para transformar datos complejos y desordenados en insights claros y accionables ha sido notable. Sus implementaciones en Snowflake elevaron la precisión de nuestros reportes del 85% al 99.5% mientras reducían los tiempos de consulta a la mitad. No solo hizo el trabajo — construyó la base en la que todo el equipo ahora se apoya.",
      relationship: "Gerente directo en Alleviate Financial Solutions",
      rating: 5
    },
    {
      id: "amit-bansod",
      name: "Amit Bansod",
      role: "Director of Analytics",
      company: "Alleviate Financial Solutions",
      text: "Los dashboards de Power BI de Khristian transformaron cómo nuestro equipo ejecutivo toma decisiones. La claridad y profundidad que aporta a los reportes financieros nos ha ahorrado incontables horas de análisis manual. Opera como un analista senior a pesar de su experiencia — motivado, autónomo y siempre enfocado en la calidad.",
      relationship: "Director de Analytics en Alleviate Financial Solutions",
      rating: 5
    }
  ],

  skillCategories: [
    { id: "data", title: "Ingeniería de Datos", skills: ["Snowflake", "SQL", "PostgreSQL", "MySQL", "Data Modeling", "ETL"], level: "advanced" },
    { id: "bi", title: "Inteligencia de Negocios", skills: ["Power BI", "Tableau", "Data Analytics", "Dashboard Design", "KPI Metrics"], level: "advanced" },
    { id: "cloud", title: "Cloud & DevOps", skills: ["GCP", "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code"], level: "intermediate" },
    { id: "dev", title: "Desarrollo Full-Stack", skills: ["React", "TypeScript", "Python", "REST APIs", "Tailwind CSS"], level: "intermediate" },
    { id: "systems", title: "Arquitectura de Sistemas", skills: ["System Design", "Microservices", "API Design", "Scalability", "Performance"], level: "advanced" },
    { id: "tools", title: "Herramientas de Desarrollo", skills: ["Git", "Docker Compose", "K8s Manifests", "Power Automate", "Power Apps"], level: "intermediate" }
  ]
} satisfies ProfileData
