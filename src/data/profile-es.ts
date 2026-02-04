import { resumePdfEs } from "./files";

export type ProfileData = {
  name: string;
  role: string;
  location: string;
  email: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  highlights: string[];
  resumePdf: string;
  experience: Array<{
    company: string;
    title: string;
    start: string; // ISO date
    end?: string; // ISO date
    location?: string;
    bullets: string[];
    tech?: string[];
  }>;
  education: Array<{
    school: string;
    program: string;
    start?: string;
    end?: string;
    notes?: string[];
  }>;
  skills: Array<{
    group: string;
    items: Array<{
      name: string;
      level?: number; // 1-5
    }>;
  }>;
  certifications?: Array<{
    name: string;
    issuer?: string;
    year?: string;
  }>;
};

export const profileEs: ProfileData = {
  name: "Khristian Manolo Junior Garcia Pineda",
  role: "Analista de Datos / Analista de Inteligencia de Negocios",
  location: "Guatemala · Híbrido",
  email: "khristiangarciajr@gmail.com",
  website: "https://garciajuni20.github.io/Resume_Khristian_Garcia/",
  linkedin: "https://www.linkedin.com/in/khristian-garcia/",
  github: "https://github.com/GarciaJuni20",
  resumePdf: resumePdfEs,
  summary:
    "Analista de Datos y Analista de Inteligencia de Negocios con sólida experiencia en modelado de datos, analítica y reportes empresariales. Me especializo en construir fuentes de verdad confiables y escalables usando Snowflake, SQL y bases de datos relacionales, transformando datos en información lista para la toma de decisiones. Entrego dashboards y reportes en Power BI y Tableau, con enfoque en calidad, rendimiento y disponibilidad de datos para apoyar decisiones estratégicas y operativas.",
  highlights: [
    "Modelado en Snowflake + SQL para fuentes de verdad escalables",
    "Reporting empresarial con Power BI & Tableau (operaciones + finanzas)",
    "ETL/ELT, calidad de datos y optimización de rendimiento",
    "Colaboración cross-funcional y comunicación con stakeholders",
    "Portafolio React/TypeScript e integraciones API (Express/Django)",
  ],
  experience: [
    {
      company: "Alleviate",
      title: "Business Intelligence Analyst",
      start: "2023-01-01",
      end: undefined,
      location: "Guatemala · Híbrido",
      bullets: [
        "Diseño y mantenimiento de modelos analíticos y datasets curados en Snowflake y bases de datos relacionales para habilitar reporting confiable.",
        "Desarrollo y optimización de transformaciones SQL para mejorar calidad, rendimiento y escalabilidad en capas de reporting empresarial.",
        "Creación de dashboards en Power BI y Tableau para visibilidad operativa y financiera, habilitando decisiones basadas en datos.",
        "Trabajo con stakeholders para definir KPIs, traducir requerimientos y documentar soluciones de forma clara.",
      ],
      tech: ["Snowflake", "SQL", "Power BI", "Tableau", "Modelado", "ETL"],
    },
    {
      company: "Icon Solutions Group, S. A.",
      title: "Business Intelligence Analyst",
      start: "2024-12-21",
      end: "2025-12-01",
      location: "Guatemala · Híbrido",
      bullets: [
        "Ascendido el 21 de dic 2024 de BI Analyst Jr. a BI Analyst.",
        "Responsable de soluciones de reporting end-to-end: data sourcing, modelado, validación y publicación de dashboards a usuarios de negocio.",
        "Mejora de confiabilidad y performance al estandarizar definiciones y refinar lógica SQL entre equipos.",
      ],
      tech: ["Power BI", "SQL", "Data Warehousing", "Stakeholders"],
    },
    {
      company: "Icon Solutions Group, S. A.",
      title: "Business Intelligence Analyst Jr.",
      start: "2023-10-06",
      end: "2024-12-20",
      location: "Guatemala · Híbrido",
      bullets: [
        "Construcción de tablas analíticas base y optimización de queries SQL para reporting escalable.",
        "Creación de dashboards en Power BI y mantenimiento de procesos de refresh para reporting consistente.",
        "Soporte en levantamiento de requerimientos e iteración de mejoras basadas en feedback del negocio.",
      ],
      tech: ["SQL", "Power BI", "Modelado de Datos", "Excel"],
    },
    {
      company: "Icon Solutions Group, S. A.",
      title: "Especialista en TI",
      start: "2023-01-01",
      end: "2023-10-01",
      location: "Guatemala · Presencial",
      bullets: [
        "Soporte TI y resolución de incidentes en herramientas y plataformas internas.",
        "Apoyo en documentación de procesos y automatizaciones básicas para tareas operativas.",
      ],
      tech: ["Soporte TI", "Office 365", "Documentación"],
    },
    {
      company: "IDT Corporation",
      title: "GNOC Support Engineer",
      start: "2019-05-01",
      end: "2023-03-01",
      location: "Guatemala",
      bullets: [
        "Monitoreo y soporte de operaciones de red, troubleshooting de incidentes y coordinación de escalaciones.",
        "Mantenimiento de documentación operativa y mejora continua de procesos de soporte.",
      ],
      tech: ["Networking", "Operaciones", "Gestión de Incidentes", "Office 365"],
    },
    {
      company: "IDT Corporation",
      title: "Technician Representative",
      start: "2017-11-01",
      end: "2019-05-01",
      location: "Guatemala",
      bullets: [
        "Soporte al cliente y técnico, triage y resolución siguiendo guías de servicio.",
        "Mejoras de proceso y actualización de base de conocimiento para problemas recurrentes.",
      ],
      tech: ["Servicio al Cliente", "Troubleshooting", "Documentación"],
    },
    {
      company: "Universidad de San Carlos de Guatemala",
      title: "Profesor de clases particulares / Tutor Académico (Contrato)",
      start: "2025-07-01",
      end: undefined,
      location: "Guatemala · Híbrido",
      bullets: [
        "Tutor académico del curso 0786 — Sistemas Organizacionales y Gerenciales 1.",
        "Acompañamiento a estudiantes con explicaciones estructuradas, ejercicios y retroalimentación alineada a los objetivos del curso.",
      ],
      tech: ["Docencia", "Comunicación", "Mentoría"],
    },
  ],
  education: [
    {
      school: "Universidad de San Carlos de Guatemala",
      program: "Sistemas de Información / Ingeniería en Sistemas (Formación académica)",
      notes: [
        "Experiencia universitaria en ingeniería en sistemas, analítica de negocios y sistemas organizacionales.",
      ],
    },
  ],
  skills: [
    {
      group: "Datos & BI",
      items: [
        { name: "SQL (Avanzado)", level: 5 },
        { name: "Snowflake", level: 4 },
        { name: "Modelado de Datos", level: 4 },
        { name: "ETL / ELT", level: 4 },
        { name: "Data Warehousing", level: 4 },
        { name: "Calidad de Datos", level: 4 },
      ],
    },
    {
      group: "Analítica & Reporting",
      items: [
        { name: "Power BI", level: 5 },
        { name: "Tableau", level: 4 },
        { name: "DAX / Medidas", level: 4 },
        { name: "Definición de KPIs", level: 4 },
        { name: "Trabajo con Stakeholders", level: 5 },
      ],
    },
    {
      group: "Ingeniería",
      items: [
        { name: "Python", level: 4 },
        { name: "APIs (REST)", level: 4 },
        { name: "Express (Node.js)", level: 4 },
        { name: "Django", level: 3 },
        { name: "PostgreSQL", level: 4 },
        { name: "React + TypeScript", level: 4 },
      ],
    },
    {
      group: "Cloud & DevOps",
      items: [
        { name: "Docker", level: 3 },
        { name: "Kubernetes", level: 3 },
        { name: "Fundamentos de GCP", level: 3 },
        { name: "CI/CD (GitHub Actions)", level: 3 },
      ],
    },
    {
      group: "Profesional",
      items: [
        { name: "Comunicación", level: 5 },
        { name: "Presentaciones", level: 4 },
        { name: "Servicio al Cliente", level: 4 },
        { name: "Documentación", level: 4 },
      ],
    },
  ],
};
