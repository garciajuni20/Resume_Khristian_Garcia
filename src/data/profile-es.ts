import { files } from "./files"

export const profileES = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Analista de Datos | Analista de Inteligencia de Negocios",
  location: "Guatemala (GT)",
  email: "garciajuni20@gmail.com",
  phone: "+502 5633 8735",
  photoUrl:
    "https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khristiangarcia" },
    { label: "GitHub", href: "https://github.com/garciajuni20" }
  ],
  summary:
    "Analista de Datos y Analista de Inteligencia de Negocios con sólida experiencia en modelado de datos, analítica y reportes empresariales. Especializado en construir fuentes únicas de verdad utilizando Snowflake, SQL y bases de datos relacionales. Capacidad comprobada para transformar datos en información confiable y lista para el negocio mediante Power BI y el ecosistema Microsoft.",
  resumePdfPath: files.resumeES,

  experience: [
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Tutor Académico – Práctica Final, Ingeniería en Sistemas",
      start: "2025-08",
      end: "present",
      location: "Guatemala",
      tags: ["Docencia", "Sistemas", "Liderazgo"],
      bullets: [
        "Instructor del curso Sistemas Organizacionales y Gerenciales 1 (Código 0786).",
        "Impartió fundamentos de analítica de negocios, sistemas de información y transformación digital.",
        "Guió a estudiantes en conceptos de Business Intelligence, ERP, CRM y sistemas organizacionales.",
        "Apoyó sesiones de laboratorio y proyectos académicos aplicados."
      ]
    },
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios / Analista de Datos",
      start: "2024-12",
      end: "present",
      location: "Remoto",
      tags: ["BI", "Datos", "Snowflake", "Power BI"],
      bullets: [
        "Diseñó y mantuvo tablas y vistas analíticas en Snowflake.",
        "Construyó fuentes únicas de verdad para reportes financieros y operativos.",
        "Desarrolló modelos SQL optimizados para mejorar exactitud y rendimiento.",
        "Entregó dashboards y reportes analíticos con Power BI y Tableau."
      ]
    },
    {
      id: "alleviate-jr",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios Jr",
      start: "2023-11",
      end: "2024-12",
      location: "Remoto",
      tags: ["BI", "SQL", "Reporting"],
      bullets: [
        "Primer Analista de BI asignado en Guatemala para la cuenta de Alleviate Financial Solutions.",
        "Apoyó la creación y estructuración inicial del área de Business Intelligence.",
        "Desarrolló procesos base de BI, consultas SQL y soluciones de reporting.",
        "Colaboró con stakeholders basados en Estados Unidos."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Soporte de TI / Administración de Sistemas",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala",
      tags: ["TI", "Soporte", "Operaciones"],
      bullets: ["Brindó soporte técnico empresarial, administración de sistemas y atención a usuarios."]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "Ingeniero de Soporte GNOC",
      start: "2019-01",
      end: "2023-01",
      location: "Guatemala",
      tags: ["Redes", "Operaciones", "Incidentes"],
      bullets: [
        "Monitoreó y soportó operaciones de red y sistemas críticos a nivel global.",
        "Realizó análisis de incidentes, troubleshooting y escalamiento de servicios empresariales."
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
    { name: "Python", level: 70 },
    { name: "Git", level: 70 },
    { name: "REST APIs", level: 70 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Licenciatura",
      area: "Ingeniería en Ciencias y Sistemas",
      end: "present"
    }
  ]
} as const
