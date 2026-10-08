import type { ProfileData } from "../types"

export const profileES = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Ingeniero de Datos · Analytics Engineering · Plataformas de Datos en la Nube",
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
    "Ingeniero de Datos y Analista de BI con más de 7 años en plataformas de datos en la nube, analítica y operaciones de producción. Construí desde cero la plataforma analítica de Alleviate Financial Solutions (fintech de EE. UU.) — modelado en Snowflake, perfilamiento de roles y optimización de queries y stored procedures, pipelines ETL/ELT con dbt, orquestación en Azure Data Factory sobre Azure y GCP, Databricks e integraciones de CRM/Salesforce hacia Snowflake — elevando la precisión de datos del 85% al 99.5% y reduciendo el ciclo de reportes financieros de más de 2 días a menos de 30 minutos. Lidero proyectos de datos de principio a fin con stakeholders de finanzas y operaciones en EE. UU., automatizo procesos con Python, SQL y Selenium, y diseño, despliego y escalo APIs REST y aplicaciones dockerizadas. Desde enero de 2024 también arquitecté y construí Flowber de punta a punta como full-stack engineer: una plataforma en producción sobre PostgreSQL/Supabase con un asistente LLM anclado en datos reales del negocio (RAG mediante tool calls con alcance RLS) y 18 flujos automatizados. Ingeniería en Sistemas en la USAC — pensum cerrado en mayo de 2026.",

  badges: ["Snowflake", "dbt · Databricks", "Azure Data Factory · GCP", "Python · SQL", "LLM / RAG", "Bilingüe EN/ES"],

  keyAchievements: [
    "Mejoré la precisión de datos del 85% al 99.5% diseñando la capa analítica en Snowflake detrás del reporting financiero de 5 departamentos.",
    "Reduje el ciclo de reportes financieros de más de 2 días a menos de 30 minutos con pipelines automatizados en SQL/dbt y dashboards en Power BI — 70% menos tiempo de reporting manual.",
    "Automaticé procesos internos de la empresa con Python, SQL y Selenium — incluyendo automatizaciones que impulsaron la generación de leads de forma medible.",
    "Eliminé el 90% de errores recurrentes en reportes mediante validación de datos, alertas y Procedimientos Operativos Estándar documentados.",
    "Arquitecté y entregué Flowber de punta a punta: una plataforma en producción con un asistente LLM anclado en datos reales de PostgreSQL y 18 flujos automatizados."
  ],

  experience: [
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Analista de Inteligencia de Negocios / Analista de Datos (Ingeniería de Datos y Analítica)",
      start: "2023-11",
      end: "present",
      location: "Remoto (Guatemala / EE. UU.)",
      tags: ["Ingeniería de Datos", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "Azure", "GCP", "Python", "SQL", "Salesforce", "Power BI", "Tableau", "APIs REST", "Modelado de Datos", "BI"],
      bullets: [
        "Lidero proyectos de datos de principio a fin — identificando las fuentes de datos adecuadas, asegurando que se importen y se unan correctamente, y comunicándome directamente con stakeholders de finanzas, operaciones y estrategia en EE. UU. para planificar y entregar cada iniciativa.",
        "Diseño y mantengo la capa analítica en Snowflake y PostgreSQL: modelos dimensionales, 8+ modelos core, vistas y stored procedures consultados por los 5 departamentos del negocio — la fuente única de verdad de la empresa, que elevó la precisión de datos del 85% al 99.5%.",
        "Trabajo de plataforma en Snowflake más allá del modelado: perfilamiento de roles y diseño de accesos, optimización de bases de datos, queries y stored procedures, e implementación de data sharing nativo para distribuir datasets entre consumidores sin copiarlos.",
        "Construyo flujos de datos y pipelines ETL/ELT con dbt y SQL sobre Snowflake, además de la implementación y administración de Databricks para analítica avanzada y transformaciones entre plataformas.",
        "Configuro y administro recursos en Azure y Google Cloud — creación y orquestación de pipelines en Azure Data Factory, aplicaciones dockerizadas y escalamiento de recursos según la demanda de carga.",
        "Integro fuentes de datos externas y CRMs (Salesforce) hacia Snowflake y bases de datos locales para unificar el reporting de ingresos y operaciones; consumo APIs POST y diseño, desarrollo, despliego y escalo APIs REST.",
        "Automatizo procesos internos de la empresa con Python, SQL y Selenium — incluyendo automatizaciones que impulsaron la generación de leads — e implementé flujos de validación y alertas que eliminaron el 90% de errores recurrentes en reportes.",
        "Entregué 15+ dashboards interactivos en Power BI y Tableau y definí 20+ KPIs con stakeholders de EE. UU., reemplazando procesos manuales en Excel y reduciendo el ciclo de reportes financieros de más de 2 días a menos de 30 minutos.",
        "Diseño nuevos procesos y procedimientos a partir de los hallazgos del análisis, elaboro Procedimientos Operativos Estándar y documentación de datos, y asesoro a equipos internos en análisis de datos y análisis predictivo.",
        "Primera contratación de BI en Guatemala para la cuenta de Alleviate Financial Solutions — construí la función desde cero hasta convertirla en el stack analítico completo de la empresa; backlog y work items gestionados en Azure DevOps."
      ]
    },
    {
      id: "flowber-freelance",
      company: "Flowber — Transformación Digital de Barbería (Proyecto Independiente)",
      role: "Full-Stack Engineer & Arquitecto de Soluciones",
      start: "2024-01",
      end: "present",
      location: "Remoto (Guatemala)",
      tags: ["Full-Stack", "Arquitectura", "LLM / RAG", "PostgreSQL", "Supabase", "n8n", "Cloudflare", "ETL", "DevOps"],
      bullets: [
        "Lideré la transformación digital de punta a punta de una barbería física desde enero de 2024 — único ingeniero y arquitecto, responsable del modelo de datos, el desarrollo full-stack y el despliegue en producción.",
        "Diseñé el modelo de datos en PostgreSQL/Supabase y la capa analítica SQL (vistas de ingresos diarios y netos, lealtad de clientes) que el negocio usa hoy para el reporting de ingresos y operaciones.",
        "Construí un asistente LLM sobre Cloudflare Workers AI (Llama 4 Scout, con function calling nativo) detrás de un Worker dedicado: responde a partir de datos reales del negocio — servicios, citas, historial del cliente — recuperados en tiempo de consulta mediante tool calls con alcance RLS, de modo que el modelo queda anclado en la base de datos real (RAG) y nunca maneja credenciales.",
        "Agregué una cadena de respaldo con router de proveedores (Workers AI → Gemini 2.5 Flash vía n8n → motor basado en reglas) para que el asistente degrade con gracia en lugar de fallar, normalizando los formatos de tool calling entre proveedores.",
        "Automaticé el negocio con 18 flujos de n8n autoalojados: recordatorios de citas a 24h/2h, seguimientos por no-show y post-servicio, reactivación de clientes y ascensos de nivel de lealtad, reportes diarios de ingresos y resúmenes semanales para administración, sincronización con Google Calendar y alertas de health-check y fallos.",
        "Desarrollé notificaciones multicanal — un gateway de WhatsApp autoalojado (NestJS, Docker, Traefik), un bot de Telegram según rol y correo transaccional con enlaces de confirmación/rechazo en un clic.",
        "Implementé control de acceso de 3 roles (cliente/barbero/admin) enteramente con Row-Level Security de PostgreSQL, respaldado por un log de auditoría de eventos de la aplicación de solo inserción.",
        "Ejecuté todo el pipeline de entrega en solitario: backlog Agile, ciclos estructurados de UAT antes de cada release y CI/CD hacia Cloudflare Pages con despliegues sin tiempo de inactividad."
      ]
    },
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Instructor Académico — Sistemas Organizacionales (Práctica Final)",
      start: "2025-08",
      end: "2026-08",
      location: "Ciudad de Guatemala",
      tags: ["Docencia", "BI", "Sistemas", "Liderazgo"],
      bullets: [
        "Seleccionado para impartir Sistemas Organizacionales y Gerenciales 1 (Código 0786) como práctica final obligatoria de la carrera de Ingeniería en Sistemas.",
        "Impartí fundamentos de Analítica de Negocios, Sistemas de Información, conceptos ERP/CRM y Transformación Digital.",
        "Guié a estudiantes en proyectos reales de Business Intelligence y casos de análisis de datos.",
        "Desarrollé materiales y ejercicios de laboratorio que traducen la teoría académica en habilidades de datos aplicadas.",
        "Serví de puente entre el currículo universitario y la industria — llevando experiencia de campo de Alleviate al aula."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Ingeniero de Soporte TI / Administrador de Sistemas",
      start: "2023-01",
      end: "2023-11",
      location: "Ciudad de Guatemala",
      tags: ["Soporte TI", "Helpdesk", "Sysadmin", "Windows / Linux", "Redes", "Migración Cloud"],
      bullets: [
        "Brindé soporte TI empresarial y de helpdesk, además de administración de sistemas, para 100+ usuarios internos, dando seguimiento a cada solicitud en un sistema de tickets hasta su resolución.",
        "Administré estaciones de trabajo y servidores Windows y Linux, gestión de endpoints, control de acceso y protocolos de seguridad de red.",
        "Lideré la migración de sistemas on-premise a infraestructura cloud, reduciendo costos de hardware.",
        "Automaticé flujos de soporte repetitivos con scripts, reduciendo el volumen de tickets en 40%.",
        "Transicioné al rol de BI de forma orgánica — las brechas de reporting que encontraba en soporte TI se convirtieron en el caso de negocio para crear la función analítica."
      ]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "Analista NOC / Ingeniero de Soporte — GNOC (Global Network Operations Center)",
      start: "2019-01",
      end: "2023-01",
      location: "Ciudad de Guatemala",
      tags: ["NOC", "Monitoreo", "Splunk", "New Relic", "Grafana", "Zabbix", "Jira", "Windows / Linux", "AWS"],
      bullets: [
        "Monitoreo proactivo de todas las redes, aplicaciones y servicios de producción 24/7 con Splunk, New Relic, Grafana y Zabbix.",
        "Respondí y resolví alertas/alarmas según procedimientos operativos estándar, registré cada incidencia en Jira y escalé a los equipos de soporte correspondientes vía Slack, trabajando con ellos hasta la resolución oportuna.",
        "Participé en llamadas puente de incidentes de alta prioridad y elaboré los reportes post-mortem, traduciendo fallos técnicos complejos en explicaciones claras para stakeholders no técnicos.",
        "Administré servidores Windows y Linux, redes y bases de datos SQL/MongoDB — configurando integraciones y reglas de alertas en toda la infraestructura monitoreada, con exposición práctica a infraestructura AWS.",
        "Reduje el tiempo medio de recuperación (MTTR) en 25% mediante monitoreo y alertas proactivas; las alertas automatizadas mejoraron los tiempos de respuesta a incidentes en 60%.",
        "Administré infraestructura que servía a 5,000+ usuarios concurrentes en múltiples regiones geográficas, y redacté los SOPs que el equipo usaba para clases de alertas recurrentes.",
        "Mentoreé a 3 ingenieros junior — el hábito de enseñar que eventualmente me llevó al rol de instructor en la USAC."
      ]
    }
  ],

  skills: [
    { name: "SQL", level: 95, years: 8 },
    { name: "Snowflake", level: 93, years: 4 },
    { name: "Modelado de Datos / Dimensional", level: 90, years: 5 },
    { name: "Pipelines ETL / ELT", level: 88, years: 4 },
    { name: "PostgreSQL", level: 85, years: 6 },
    { name: "Python", level: 80, years: 5 },
    { name: "dbt", level: 80, years: 4 },
    { name: "Databricks", level: 80, years: 4 },
    { name: "Diseño de APIs REST", level: 80, years: 5 },
    { name: "Azure Data Factory", level: 75, years: 2 },
    { name: "Gobernanza de Datos", level: 78, years: 4 },
    { name: "Data Mapping / Lineage", level: 78, years: 4 },
    { name: "n8n / Orquestación", level: 80, years: 2 },
    { name: "Integración LLM / RAG", level: 78, years: 2 },
    { name: "Power BI", level: 90, years: 4 },
    { name: "Tableau", level: 78, years: 4 },
    { name: "BigQuery", level: 72, years: 3 },
    { name: "Microsoft Azure", level: 70, years: 2 },
    { name: "Google Cloud (GCP)", level: 70, years: 2 },
    { name: "Docker", level: 72, years: 3 },
    { name: "Selenium", level: 72, years: 3 },
    { name: "Salesforce", level: 70, years: 3 },
    { name: "Agile / Scrum", level: 92, years: 8 },
    { name: "UAT / Pruebas de Aceptación", level: 90, years: 8 },
    { name: "Git", level: 85, years: 6 },
    { name: "React", level: 82, years: 4 },
    { name: "TypeScript", level: 80, years: 4 },
    { name: "Azure DevOps", level: 60, years: 2 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Licenciatura",
      area: "Ingeniería en Ciencias y Sistemas",
      end: "2026-05",
      status: "Pensum cerrado (todos los cursos completados) — 31 de mayo de 2026",
      highlights: [
        "Pensum cerrado: todos los cursos completados al 31 de mayo de 2026",
        "Completé la práctica final obligatoria como Instructor Académico (ago 2025 – ago 2026)",
        "Cursos avanzados: Compiladores (parsers PEG, gramática Fortran), Bases de Datos 2 (BD2), Estructuras de Datos y Algoritmos",
        "Construí un parser PEG para Fortran en JavaScript (Compiladores 2, disponible en GitHub Pages); proyecto de suficiencia BD2: diseño avanzado de bases de datos en Python"
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
      skills: ["Bases de Datos Avanzadas", "Python", "Diseño de Bases de Datos", "Optimización de Queries"],
      verified: true,
      type: "academic"
    }
  ],

  projects: [
    {
      id: "cloud-data-pipelines",
      title: "Pipelines de Datos en la Nube e Integración de CRM",
      description: "Trabajo de ingeniería de datos en producción en Alleviate Financial Solutions: pipelines de ingesta creados y orquestados en Azure Data Factory sobre recursos de Azure y GCP, integración de Salesforce/CRM hacia Snowflake, transformaciones con dbt y SQL, cargas de trabajo en Databricks y automatización de procesos con Python/Selenium. Incluye perfilamiento de roles en Snowflake, optimización de stored procedures y queries, y data sharing nativo para que los consumidores lean datasets sin copias.",
      impact: "Unificó el reporting de ingresos y operaciones en una sola plataforma gobernada — más automatizaciones que impulsaron la generación de leads",
      technologies: ["Azure Data Factory", "Snowflake", "dbt", "Databricks", "Salesforce", "Python", "Selenium", "SQL", "Docker", "GCP", "APIs REST"],
      role: "Ingeniero de Datos / Analista BI",
      duration: "En curso",
      teamSize: "Individual (colaboración entre departamentos)",
      category: "data",
      featured: true,
      gradient: "from-sky-600 to-indigo-600"
    },
    {
      id: "flowber-barberia",
      title: "Flowber — Plataforma Digital para Barberías",
      description: "Transformación digital de punta a punta de una barbería física, arquitectada y construida en solitario desde enero de 2024. Reservas y gestión de negocio serverless sobre PostgreSQL/Supabase: control de acceso de 3 roles con RLS de Postgres, citas en tiempo real, notificaciones multicanal (WhatsApp, Telegram, correo), e-commerce y una capa de BI en SQL con vistas de ingresos y lealtad. El asistente de chat corre sobre Cloudflare Workers AI (Llama 4 Scout) con function calling — anclado en datos reales del negocio recuperados mediante tool calls con alcance RLS (RAG), con respaldo en Gemini vía n8n. 18 flujos de n8n autoalojados automatizan recordatorios, seguimientos, lealtad, reportes y health checks.",
      impact: "Digitalizó el negocio completo — reservas, notificaciones, reporting y un asistente que responde con datos reales",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS de Postgres", "Edge Functions", "Cloudflare Workers AI", "LLM / RAG", "n8n", "NestJS", "Docker", "Cloudflare Pages"],
      role: "Full-Stack Engineer & Arquitecto de Soluciones",
      duration: "Desde ene 2024",
      teamSize: "Proyecto individual",
      category: "architecture",
      links: { github: "https://github.com/garciajuni20/flowber-barberia", live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      gradient: "from-violet-500 to-indigo-600",
      caseStudyPath: "/projects/flowber"
    },
    {
      id: "snowflake-data-layer",
      title: "Capa Analítica de Datos en Snowflake",
      description: "Diseñé y construí la arquitectura completa de datos en Snowflake para Alleviate Financial Solutions — modelos en esquema estrella, vistas analíticas, stored procedures y transformaciones SQL optimizadas que alimentan dashboards de Power BI y Tableau en 5 departamentos, con perfilamiento de roles y validación de datos integrados.",
      impact: "Elevó la precisión de datos del 85% al 99.5% — se convirtió en la fuente de verdad de la empresa",
      technologies: ["Snowflake", "SQL", "Esquema Estrella", "Modelado de Datos", "ETL", "dbt", "Stored Procedures", "Validación de Datos"],
      role: "Ingeniero de Datos / Analista BI",
      duration: "2+ años",
      teamSize: "Individual (colaboración entre departamentos)",
      category: "data",
      featured: true,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: "vale-combustible",
      title: "Continental Motores — Sistema de Vales de Combustible",
      description: "Sistema full-stack de gestión de vales de combustible para una empresa de flotas vehiculares. Incluye autenticación, generación de vales, flujos de aprobación multinivel y reportes de uso. Desplegado en Cloudflare Pages con CI/CD sin tiempo de inactividad.",
      impact: "Eliminó el proceso de vales en papel — las aprobaciones pasaron de días a minutos",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "Vite", "Autenticación"],
      role: "Desarrollador Full-Stack",
      duration: "En curso",
      teamSize: "Proyecto individual",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Continental-Motores-Vales-Combustible", live: "https://continental-motores-vales-combustible.pages.dev/login" },
      featured: true,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "bi-dashboard-suite",
      title: "Suite de Dashboards de Analítica Financiera",
      description: "Suite completa de dashboards en Power BI y Tableau para reporting financiero y operativo en Alleviate Financial Solutions. Visualización de datos en tiempo real, seguimiento de KPIs, análisis de tendencias y generación automatizada de reportes en PDF.",
      impact: "Redujo el ciclo de reportes de más de 2 días a menos de 30 minutos — 15+ dashboards en producción",
      technologies: ["Power BI", "Tableau", "DAX", "Power Query", "Snowflake", "SQL"],
      role: "Desarrollador BI",
      duration: "2+ años",
      teamSize: "2 analistas + stakeholders de EE. UU.",
      category: "data",
      featured: false,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "portfolio",
      title: "Este Portafolio — CV Interactivo",
      description: "Portafolio en React + TypeScript con soporte bilingüe (EN/ES), modo oscuro/claro, medidores de habilidades animados, filtros por etiquetas, generación dinámica de PDF y despliegue automático a GitHub Pages vía GitHub Actions.",
      impact: "Demuestra pensamiento de producto full-stack — este sitio ES el artefacto del portafolio",
      technologies: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GitHub Actions", "Vite", "@react-pdf/renderer"],
      role: "Desarrollador Full-Stack & Diseñador",
      duration: "3 semanas",
      teamSize: "Proyecto individual",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Resume_Khristian_Garcia", live: "https://garciajuni20.github.io/Resume_Khristian_Garcia/" },
      featured: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "fortran-peg-parser",
      title: "FortranPEG — Generador de Parsers para Fortran",
      description: "Un generador de parsers para el lenguaje Fortran usando PEG (Parsing Expression Grammar) y análisis descendente recursivo. Incluye un IDE web para probar gramáticas. Disponible en GitHub Pages.",
      impact: "Implementación completa de la gramática de Fortran con un entorno de pruebas interactivo en vivo",
      technologies: ["JavaScript", "Parsers PEG", "Svelte", "Teoría de Compiladores", "Descenso Recursivo"],
      role: "Desarrollador — Grupo 8, Compiladores 2",
      duration: "1 mes",
      teamSize: "3 estudiantes",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/G8_Fase2_FortranPEG", live: "https://garciajuni20.github.io/G8_Fase2_FortranPEG/" },
      featured: false,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "bd2-suficiencia",
      title: "Bases de Datos Avanzadas — Suficiencia BD2",
      description: "Proyecto avanzado de bases de datos en Python para el examen de suficiencia BD2 en la USAC. Cubre optimización de queries, estrategias de indexación y diseño de esquemas complejos.",
      impact: "Aplicó teoría avanzada de bases de datos a un entregable real y calificado",
      technologies: ["Python", "SQL Avanzado", "Diseño de Bases de Datos", "Optimización de Queries", "Indexación"],
      role: "Estudiante — Ingeniería en Sistemas, USAC",
      duration: "2 semanas",
      teamSize: "Individual",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202" },
      featured: false,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: "compilers-phase1",
      title: "Compiladores 2 — Fase 1 (App en Svelte)",
      description: "Fase 1 del proyecto del curso de Compiladores 2 — front-end de compilador basado en web con análisis léxico, tokenización y etapas iniciales de parsing.",
      impact: "Fundamentos de front-end de compiladores aplicados a una implementación funcional",
      technologies: ["JavaScript", "Svelte", "Análisis Léxico", "Tokenización"],
      role: "Desarrollador — Grupo 8",
      duration: "3 semanas",
      teamSize: "3 estudiantes",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/Compi2_Grupo8" },
      featured: false,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      id: "docker-workshop",
      title: "Docker & Infraestructura Cloud-Native",
      description: "Contenedorización, Docker Compose, fundamentos de Kubernetes y diseño de pipelines CI/CD para aplicaciones cloud-native — completado en el taller de la comunidad Cloud-Native + GT.",
      impact: "Habilidades prácticas de contenedorización aplicadas a flujos DevOps reales",
      technologies: ["Docker", "Docker Compose", "Kubernetes", "CI/CD", "Microservicios", "GitHub Actions"],
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
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "Databricks", "Azure Data Factory", "ETL / ELT", "Pipelines de Datos", "PostgreSQL", "BigQuery", "MySQL", "MongoDB", "Stored Procedures", "Modelado Dimensional", "Selenium", "SSMS", "Postman"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Salesforce", "Diseño de KPIs", "Excel / VBA", "Google Data Studio", "Confluence", "Lucidchart", "Visio", "Draw.io", "Notion"],
    cloudDevOps: ["Microsoft Azure", "Google Cloud (GCP)", "AWS", "Azure DevOps", "Docker", "Cloudflare Pages & Workers", "GitHub Actions", "CI/CD", "Kubernetes", "n8n", "Splunk", "New Relic", "Grafana", "Zabbix"],
    fullStack: ["React", "TypeScript", "Node.js", "Diseño de APIs REST", "Supabase", "Tailwind CSS", "Vite", "Cloudflare Workers AI", "Integración LLM / RAG"],
    methodologies: [
      "Diseño de Pipelines de Datos", "Modelado Dimensional", "Gobernanza de Datos", "Data Mapping / Lineage", "DataOps",
      "Levantamiento de Requerimientos", "User Stories / Criterios de Aceptación", "Gestión de Stakeholders",
      "Procedimientos Operativos Estándar (SOPs)", "UAT / Pruebas de Aceptación", "Gestión del Cambio",
      "Agile", "Scrum", "Sprint Planning", "Jira", "Documentación Post-Mortem",
      "Consultoría en Análisis Predictivo y de Datos"
    ]
  },

  metrics: {
    yearsExperience: 7,
    yearsBI: 3,
    dashboardsDelivered: 15,
    sqlModels: 20,
    kpisTracked: 20,
    liveApps: 3,
    projectsCompleted: 20,
    technologies: 20,
    certifications: 5,
    clientsServed: 8,
    dataProcessed: "100+ TB"
  },

  testimonials: [
    {
      id: "diego-zea",
      name: "Diego Zea",
      role: "Gerente de Inteligencia de Negocios",
      company: "Alleviate Financial Solutions",
      text: "La capacidad de Khristian para convertir datos complejos y desordenados en información limpia y accionable ha sido notable. Sus implementaciones en Snowflake elevaron la precisión de nuestros reportes del 85% al 99.5% y redujeron a la mitad los tiempos de consulta. No solo hizo el trabajo — construyó la base en la que hoy se apoya todo el equipo.",
      relationship: "Jefe directo en Alleviate Financial Solutions",
      rating: 5
    },
    {
      id: "amit-bansod",
      name: "Amit Bansod",
      role: "Director de Analítica",
      company: "Alleviate Financial Solutions",
      text: "Los dashboards de Power BI de Khristian transformaron la forma en que nuestro equipo ejecutivo toma decisiones. La claridad y profundidad que aporta al reporting financiero nos ha ahorrado innumerables horas de análisis manual. Opera como un analista senior a pesar de su antigüedad — proactivo, autónomo y siempre enfocado en la calidad.",
      relationship: "Director de Analítica en Alleviate Financial Solutions",
      rating: 5
    }
  ],

  skillCategories: [
    { id: "data", title: "Ingeniería de Datos", skills: ["SQL", "Snowflake", "dbt", "Databricks", "Pipelines ETL / ELT", "Modelado Dimensional", "Stored Procedures", "Optimización de Queries", "PostgreSQL", "Gobernanza de Datos", "Data Lineage"], level: "advanced" },
    { id: "integration", title: "Cloud, Pipelines e Integración", skills: ["Azure Data Factory", "Microsoft Azure", "Google Cloud (GCP)", "Docker", "Escalamiento de Recursos", "Diseño de APIs REST", "Integración Salesforce / CRM", "BigQuery", "Orquestación con n8n", "Automatización con Python y Selenium"], level: "advanced" },
    { id: "bi", title: "BI & Reporting", skills: ["Power BI", "DAX", "Power Query", "Tableau", "Definición de KPIs", "Análisis Predictivo y de Datos"], level: "advanced" },
    { id: "ai", title: "Sistemas de IA / LLM", skills: ["Integración de LLM", "RAG (anclado en tool calls)", "Function Calling", "Cloudflare Workers AI", "Diseño de Prompts y Contexto", "Diseño de Respaldo entre Proveedores"], level: "intermediate" },
    { id: "ba", title: "Entrega y Análisis de Negocio", skills: ["Liderazgo de Proyectos (de inicio a fin)", "Levantamiento de Requerimientos", "User Stories", "Gestión de Stakeholders", "Mapeo de Procesos de Negocio", "UAT", "Agile / Scrum"], level: "advanced" },
    { id: "tech", title: "Programación & Full-Stack", skills: ["Python", "TypeScript", "React", "Node.js", "Supabase", "Git", "Kubernetes", "Windows / Linux"], level: "intermediate" },
    { id: "docs", title: "Documentación & SOPs", skills: ["Procedimientos Operativos Estándar", "Reportes Post-Mortem", "Confluence", "Lucidchart", "Visio", "Diccionarios de Datos"], level: "advanced" }
  ],

  seo: {
    title: "Khristian Garcia — Ingeniero de Datos | Snowflake, dbt, Azure Data Factory",
    description: "Ingeniero de Datos y Analista de BI con más de 7 años construyendo plataformas de datos en la nube: Snowflake, dbt, Databricks, Azure Data Factory, Python. Remoto desde Guatemala.",
    keywords: ["Ingeniero de Datos", "Data Engineer", "Analytics Engineer", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "ETL", "Python", "SQL", "Power BI", "Tableau", "Inteligencia de Negocios", "Remoto Guatemala"]
  }
} satisfies ProfileData
