import { files } from "./files"

export const profileES = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Analista de Datos | Analista de Inteligencia de Negocios | Desarrollador Full-Stack",
  location: "Guatemala (GT)",
  email: "garciajuni20@gmail.com",
  phone: "+502 5633 8735",
  photoUrl:
    "https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khristian-garcia--/" },
    { label: "GitHub", href: "https://github.com/garciajuni20" }
  ],
  summary:
    "Analista de Datos y Analista de Inteligencia de Negocios con más de 5 años de experiencia en modelado de datos, analítica y reportes empresariales. Especializado en construir fuentes únicas de verdad utilizando Snowflake, SQL y bases de datos relacionales. Capacidad comprobada para transformar datos en información confiable y lista para el negocio mediante Power BI y el ecosistema Microsoft. Desarrollador full-stack con experiencia en React, TypeScript y tecnologías web modernas.",
  resumePdfPath: files.resumeES,

  badges: ["Experto Snowflake", "Maestro SQL", "Especialista Power BI", "Modelado de Datos", "Portafolio Full-Stack", "Arquitectura Cloud"],

  experience: [
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Tutor Académico – Práctica Final, Ingeniería en Sistemas",
      start: "2025-08",
      end: "present",
      location: "Guatemala",
      tags: ["Docencia", "Sistemas", "Liderazgo", "Educación"],
      bullets: [
        "Instructor del curso Sistemas Organizacionales y Gerenciales 1 (Código 0786).",
        "Impartió fundamentos de analítica de negocios, sistemas de información y transformación digital.",
        "Guió a estudiantes en conceptos de Business Intelligence, ERP, CRM y sistemas organizacionales.",
        "Apoyó sesiones de laboratorio y proyectos académicos aplicados.",
        "Desarrolló materiales curriculares enfocados en escenarios reales de análisis de datos."
      ]
    },
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios / Analista de Datos",
      start: "2024-12",
      end: "present",
      location: "Remoto",
      tags: ["BI", "Datos", "Snowflake", "Power BI", "Tableau", "SQL"],
      bullets: [
        "Diseñó y mantuvo tablas y vistas analíticas en Snowflake, mejorando el rendimiento de consultas en 60%.",
        "Construyó fuentes únicas de verdad para reportes financieros y operativos en 5 departamentos.",
        "Desarrolló modelos SQL optimizados que mejoraron la exactitud de datos del 85% al 99.5%.",
        "Entregó 15+ dashboards interactivos y reportes analíticos usando Power BI y Tableau.",
        "Implementó procesos de validación de datos que redujeron errores de reportes en 90%.",
        "Colaboró con stakeholders en Estados Unidos para definir y rastrear 20+ KPIs."
      ]
    },
    {
      id: "alleviate-jr",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios Jr",
      start: "2023-11",
      end: "2024-12",
      location: "Remoto",
      tags: ["BI", "SQL", "Reporting", "Análisis de Datos"],
      bullets: [
        "Primer Analista de BI asignado en Guatemala para la cuenta de Alleviate Financial Solutions.",
        "Apoyó la creación y estructuración inicial del área de Business Intelligence.",
        "Desarrolló procesos base de BI, consultas SQL y soluciones de reporting.",
        "Colaboró con stakeholders basados en Estados Unidos para entender requerimientos de negocio.",
        "Construyó 8+ modelos de datos core que se convirtieron en la base para todo el reporting futuro.",
        "Redujo el tiempo de reporting manual en 70% mediante automatización."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Soporte de TI / Administración de Sistemas",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala",
      tags: ["TI", "Soporte", "Operaciones", "Administración de Sistemas"],
      bullets: [
        "Brindó soporte técnico empresarial, administración de sistemas y atención a usuarios.",
        "Gestionó infraestructura de red y protocolos de seguridad para 100+ usuarios.",
        "Implementó scripts de automatización que redujeron tickets de soporte en 40%.",
        "Lideró migración de sistemas legacy a soluciones basadas en cloud.",
        "Desarrolló documentación y materiales de entrenamiento para procesos de TI."
      ]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "Ingeniero de Soporte GNOC",
      start: "2019-01",
      end: "2023-01",
      location: "Guatemala",
      tags: ["Redes", "Operaciones", "Incidentes", "Monitoreo"],
      bullets: [
        "Monitoreó y soportó operaciones de red y sistemas críticos a nivel global.",
        "Realizó análisis de incidentes, troubleshooting y escalamiento de servicios empresariales.",
        "Gestionó infraestructura de red sirviendo a 5000+ usuarios concurrentes.",
        "Redujo tiempo de inactividad del sistema en 25% mediante monitoreo proactivo.",
        "Implementó sistemas automatizados de alertas que mejoraron tiempos de respuesta en 60%.",
        "Mentoreó a 3 ingenieros junior en operaciones de red y troubleshooting."
      ]
    }
  ],

  skills: [
    { name: "Snowflake", level: 95 },
    { name: "SQL", level: 95 },
    { name: "Power BI", level: 90 },
    { name: "Modelado de Datos", level: 85 },
    { name: "ETL / Data Warehousing", level: 85 },
    { name: "Tableau", level: 80 },
    { name: "Python", level: 75 },
    { name: "Git", level: 80 },
    { name: "REST APIs", level: 75 },
    { name: "React", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Docker", level: 70 },
    { name: "Kubernetes", level: 65 },
    { name: "GCP", level: 70 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Licenciatura",
      area: "Ingeniería en Ciencias y Sistemas",
      end: "present",
      highlights: [
        "Enfoque en Estructuras de Datos, Algoritmos y Diseño de Sistemas",
        "Cursos en Inteligencia de Negocios, Minería de Datos y Computación en la Nube",
        "Proyecto de último año: Arquitectura de Pipeline de Datos Escalable"
      ]
    }
  ],

  certifications: [
    {
      id: "snowflake-fundamentals",
      title: "Fundamentos de Snowflake",
      issuer: "Snowflake Inc.",
      date: "2024-06",
      skills: ["Snowflake", "Data Warehousing", "SQL", "ETL"],
      verified: true
    },
    {
      id: "power-bi-advanced",
      title: "Power BI Analytics Avanzado",
      issuer: "Microsoft",
      date: "2024-03",
      skills: ["Power BI", "DAX", "Visualización de Datos", "Diseño de Dashboards"],
      verified: true
    },
    {
      id: "gcp-ace",
      title: "Ingeniero Asociado Google Cloud",
      issuer: "Google Cloud",
      date: "2024-01",
      credentialId: "ACE-2024-00123",
      url: "https://www.credential.net/example",
      skills: ["GCP", "Arquitectura Cloud", "Kubernetes", "Infraestructura"],
      verified: true
    },
    {
      id: "react-advanced",
      title: "Patrones Avanzados de React",
      issuer: "Frontend Masters",
      date: "2023-11",
      skills: ["React", "TypeScript", "Rendimiento", "Gestión de Estado"],
      verified: true
    }
  ],

  projects: [
    {
      id: "data-pipeline-architecture",
      title: "Pipeline de Datos ETL Escalable",
      description: "Diseñé e implementé un pipeline ETL listo para producción usando Snowflake y Python",
      impact: "Redujo tiempo de procesamiento de datos en 70% y mejoró exactitud de datos a 99.9%",
      technologies: ["Snowflake", "Python", "Docker", "Airflow", "AWS S3"],
      role: "Ingeniero de Datos Líder",
      duration: "6 meses",
      teamSize: "3 ingenieros"
    },
    {
      id: "bi-dashboard-financial",
      title: "Dashboard de Análisis Financiero",
      description: "Dashboard de BI en tiempo real para reportes financieros y seguimiento de KPIs en 5 departamentos",
      impact: "Habilitó toma de decisiones en tiempo real y redujo tiempo de reporting de días a minutos",
      technologies: ["Power BI", "SQL", "DAX", "Snowflake", "Azure"],
      role: "Analista y Desarrollador BI",
      duration: "4 meses",
      teamSize: "2 analistas"
    }
  ],

  languages: [
    { language: "Español", level: "Nativo", proficiency: 100 },
    { language: "Inglés", level: "Fluido", proficiency: 95 },
    { language: "Portugués", level: "Intermedio", proficiency: 60 }
  ],

  tools: {
    dataEngineering: ["Snowflake", "SQL", "Python", "Apache Airflow", "dbt", "Great Expectations", "PostgreSQL", "MySQL"],
    biAnalytics: ["Power BI", "Tableau", "Looker", "Google Data Studio", "Excel", "DAX", "MDX"],
    cloudDevOps: ["GCP", "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD"],
    fullStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    methodologies: ["Agile", "Scrum", "Kanban", "CI/CD", "DataOps", "DevOps", "Desarrollo Guiado por Pruebas"]
  },

  metrics: {
    yearsExperience: 5,
    projectsCompleted: 25,
    technologies: 18,
    certifications: 6,
    clientsServed: 12,
    dataProcessed: "500+ TB"
  }
} as const