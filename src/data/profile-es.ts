import type { ProfileData } from "../types"

export const profileES = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Ingeniero de Datos · Full-Stack & IA · Arquitecto de Soluciones",
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
    "Ingeniero de Datos y Analista de BI con más de 7 años en plataformas de datos en la nube, analítica y operaciones de producción. He trabajado en servicios financieros de EE. UU. (consolidación de deudas en Alleviate y remesas internacionales en IDT), retail de servicios con Flowber y educación universitaria, en inglés y en español. Construí desde cero la plataforma analítica de Alleviate Financial Solutions (fintech de EE. UU.) — modelado en Snowflake, perfilamiento de roles y optimización de queries y stored procedures, pipelines ETL/ELT con dbt, orquestación en Azure Data Factory sobre Azure y GCP, Databricks e integraciones de CRM/Salesforce hacia Snowflake — elevando la precisión de datos del 85% al 99.5% y reduciendo el ciclo de reportes financieros de más de 2 días a menos de 30 minutos. Lidero proyectos de datos de principio a fin con stakeholders de finanzas y operaciones en EE. UU., automatizo procesos con Python, SQL y Selenium, y diseño, despliego y escalo APIs REST y aplicaciones dockerizadas. Desde enero de 2024 lidero la transformación digital de Flowber (la barbería de Danover) de la idea a producción como full-stack engineer y arquitecto: React/TypeScript sobre PostgreSQL/Supabase con RLS por rol, un agente de IA con 20 herramientas y RAG sobre pgvector, y un data warehouse con dbt + DuckDB que incluye modelos predictivos. Ingeniería en Sistemas en la USAC — pensum cerrado en mayo de 2026.",

  summaryShort:
    "Ingeniero de Datos y Analista de BI con más de 7 años construyendo plataformas de datos en la nube. Construí desde cero la plataforma analítica de Alleviate Financial Solutions (fintech de EE. UU.) — modelado en Snowflake, perfilamiento de roles y optimización de queries, pipelines ETL/ELT con dbt, orquestación en Azure Data Factory sobre Azure y GCP, Databricks e integraciones Salesforce-Snowflake — elevando la precisión de datos del 85% al 99.5% y reduciendo el ciclo de reportes financieros de más de 2 días a menos de 30 minutos. Lidero proyectos de datos de principio a fin con stakeholders en EE. UU., automatizo procesos con Python, SQL y Selenium, y diseño y escalo APIs REST y aplicaciones dockerizadas.",

  badges: ["Snowflake", "dbt · Databricks", "Azure Data Factory · GCP", "Python · SQL", "IA · RAG · pgvector", "Bilingüe EN/ES"],

  keyAchievements: [
    "Mejoré la precisión de datos del 85% al 99.5% diseñando la capa analítica en Snowflake detrás del reporting financiero de 5 departamentos.",
    "Reduje el ciclo de reportes financieros de más de 2 días a menos de 30 minutos con pipelines automatizados en SQL/dbt y dashboards en Power BI — 70% menos tiempo de reporting manual.",
    "Automaticé procesos internos de la empresa con Python, SQL y Selenium — incluyendo automatizaciones que impulsaron la generación de leads de forma medible.",
    "Eliminé el 90% de errores recurrentes en reportes mediante validación de datos, alertas y Procedimientos Operativos Estándar documentados.",
    "Llevé Flowber de la idea a producción (ene 2024 → hoy): 160+ citas y 90+ clientes registrados en la plataforma, un agente de IA con RAG (100% hit@1 en su evaluación) y un warehouse dbt con 50 tests y modelos de ML."
  ],

  experience: [
    {
      id: "alleviate-mid",
      industry: "Fintech · Consolidación de deudas (EE. UU.)",
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
      industry: "Retail de servicios · Barbería",
      company: "Flowber — Transformación Digital de Barbería (Proyecto Independiente)",
      role: "Full-Stack Engineer · Arquitecto de Soluciones · Data & AI Engineer",
      start: "2024-01",
      end: "present",
      location: "Remoto (Guatemala)",
      tags: ["Full-Stack", "Arquitectura", "Transformación Digital", "IA / LLM", "RAG", "pgvector", "ETL", "dbt", "DuckDB", "PostgreSQL", "Supabase", "Cloudflare"],
      bullets: [
        "Lideré la transformación digital de la barbería de Danover desde la idea (enero de 2024) hasta producción: levantamiento de procesos con el dueño, producto, arquitectura y operación como único ingeniero. Hoy la plataforma gestiona 160+ citas y 90+ clientes registrados.",
        "Arquitecté un sistema serverless sin servidor propio (React + TypeScript en Cloudflare Pages, PostgreSQL/Supabase y 13 Edge Functions en Deno) donde la seguridad vive en la base de datos: Row-Level Security por rol (cliente/barbero/admin) en todas las tablas y una restricción EXCLUDE con GiST que hace imposible la doble reserva. Costo de infraestructura: $0 en planes gratuitos.",
        "Construí un agente de IA sobre Cloudflare Workers AI (Llama 4 Scout) con function calling multi-turno: 20 herramientas filtradas por rol, 5 de ellas escriben datos (reservar, cancelar, reagendar, confirmar, completar) con confirmación explícita y re-verificación en servidor; proveedores intercambiables (Workers AI, Groq, n8n/Gemini) con respaldo determinista basado en reglas.",
        "Implementé RAG con pgvector (HNSW) y embeddings multilingües bge-m3: búsqueda SECURITY INVOKER que respeta el RLS de cada rol, ingesta incremental por hash SHA-256 y un golden set de evaluación (hit@k, MRR) que llegó a 100% hit@1; filtros anti-alucinación rechazan cifras sin resultado de herramienta.",
        "Construí el data warehouse medallion (Postgres → Parquet bronze → dbt + DuckDB silver/gold): esquema estrella con 4 dimensiones y 3 hechos, 24 modelos y 50 tests, sin PII (llaves md5) y con corrida nocturna en GitHub Actions usando un rol de solo lectura.",
        "Agregué modelos predictivos dentro del DAG de dbt (riesgo de cancelación con regresión logística y validación temporal contra baseline; pronóstico de demanda EWMA con backtest), segmentación RFM y riesgo de abandono; un mart de salud de datos encontró Q4,245 de ingresos que no llegaban al BI.",
        "Unifiqué las métricas del negocio en una sola función SQL (business_summary) que consumen el panel, el asistente, el resumen semanal y Telegram; automaticé recordatorios, cierre diario y campañas de lealtad con pg_cron + Vault, un bot de Telegram por rol con acciones en lote y correo transaccional con Brevo.",
        "Ejecuté toda la entrega en solitario: CI/CD a Cloudflare Pages, auditorías documentadas de seguridad, roles y negocio, y rendimiento medido con Lighthouse (LCP móvil de 4.8 s a 2.5 s)."
      ]
    },
    {
      id: "usac-teaching",
      industry: "Educación superior",
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
      industry: "Fintech · Consolidación de deudas (EE. UU.)",
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
      industry: "Servicios financieros · Remesas internacionales",
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
      title: "Flowber — Transformación Digital de una Barbería",
      description: "Transformación digital de punta a punta de la barbería de Danover, de la idea (enero de 2024) a producción. React + TypeScript sobre PostgreSQL/Supabase con RLS por rol, reservas en tiempo real sin dobles citas, notificaciones por Telegram y correo, y BI integrado. Un agente de IA (Llama 4 Scout en Workers AI) con 20 herramientas y RAG sobre pgvector responde y actúa con datos reales. Debajo, un warehouse medallion con dbt + DuckDB, 50 tests y modelos de ML de cancelación y demanda.",
      impact: "160+ citas y 90+ clientes en la plataforma · RAG con 100% hit@1 · LCP móvil de 4.8 s a 2.5 s",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Edge Functions", "Workers AI", "RAG · pgvector", "dbt", "DuckDB", "Python", "Cloudflare"],
      role: "Full-Stack · Arquitecto · Data & AI Engineer",
      duration: "Desde ene 2024",
      teamSize: "Proyecto individual",
      category: "architecture",
      links: { live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      gradient: "from-violet-500 to-indigo-600",
      caseStudyPath: "/flowber"
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
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "Databricks", "Azure Data Factory", "ETL / ELT", "Pipelines de Datos", "PostgreSQL", "DuckDB", "BigQuery", "MySQL", "MongoDB", "Stored Procedures", "Modelado Dimensional", "Selenium", "SSMS", "Postman"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Salesforce", "Diseño de KPIs", "Excel / VBA", "Google Data Studio", "Confluence", "Lucidchart", "Visio", "Draw.io", "Notion"],
    cloudDevOps: ["Microsoft Azure", "Google Cloud (GCP)", "AWS", "Azure DevOps", "Docker", "Cloudflare Pages & Workers", "GitHub Actions", "CI/CD", "Kubernetes", "n8n", "Splunk", "New Relic", "Grafana", "Zabbix"],
    fullStack: ["React", "TypeScript", "Node.js", "Diseño de APIs REST", "Supabase", "Tailwind CSS", "Vite", "Cloudflare Workers AI", "Integración LLM / RAG", "pgvector", "Deno Edge Functions"],
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
    { id: "ai", title: "Sistemas de IA / LLM", skills: ["Agentes LLM con Function Calling", "RAG (pgvector + embeddings bge-m3)", "Evaluación de Recuperación (hit@k, MRR)", "Cloudflare Workers AI", "Groq", "Diseño de Prompts y Contexto", "Guardrails Anti-Alucinación", "Respaldo entre Proveedores"], level: "intermediate" },
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
