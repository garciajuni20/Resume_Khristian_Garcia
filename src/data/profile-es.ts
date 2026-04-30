import { files } from "./files"

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
  resumePdfPath: files.resumeES,

  badges: ["Snowflake", "Experto SQL", "Power BI", "React · TypeScript", "Modelado de Datos", "Bilingüe EN/ES"],

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
      verified: true
    },
    {
      id: "power-bi-analytics",
      title: "Power BI Data Analytics",
      issuer: "Microsoft",
      date: "2024-03",
      skills: ["Power BI", "DAX", "Power Query", "Modelado de Datos", "Diseño de Dashboards"],
      verified: true
    },
    {
      id: "docker-cloud-native",
      title: "Taller Docker & Contenedores Cloud-Native",
      issuer: "Comunidad Cloud-Native + GT",
      date: "2025-08",
      skills: ["Docker", "Contenedores", "Kubernetes", "Microservicios", "DevOps"],
      verified: true
    },
    {
      id: "usac-compilers",
      title: "Compiladores 2 — Parsers PEG y Diseño de Lenguajes",
      issuer: "USAC — Escuela de Ciencias y Sistemas",
      date: "2024-12",
      skills: ["Parsers PEG", "JavaScript", "Svelte", "Teoría de Compiladores", "Gramáticas Formales"],
      verified: true
    }
  ],

  projects: [
    {
      id: "vale-combustible",
      title: "Continental Motores — Sistema de Vales de Combustible",
      description: "Aplicación web full-stack para gestión de vales de combustible de flota — autenticación, flujos de aprobación, reportes de uso",
      impact: "Eliminó el proceso manual en papel; las aprobaciones ahora toman minutos en lugar de días",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
      role: "Desarrollador Full-Stack",
      duration: "En curso",
      teamSize: "Individual"
    },
    {
      id: "flowber",
      title: "Flowber — Plataforma Digital de Barbería",
      description: "Plataforma de reservas en línea y gestión de negocio para una barbería",
      impact: "Digitalizó la agenda — redujo inasistencias y eliminó las reservas telefónicas",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
      role: "Desarrollador Full-Stack & Diseñador",
      duration: "En curso",
      teamSize: "Individual"
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
    projectsCompleted: 20,
    technologies: 18,
    certifications: 4,
    clientsServed: 8,
    dataProcessed: "100+ TB"
  }
} as const
