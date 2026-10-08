import type { ProfileData } from "../types"

export const profileEN = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Data Engineer · Analytics Engineering · Cloud Data Platforms",
  location: "Guatemala City, Guatemala",
  email: "garciajuni20@gmail.com",
  phone: "+502 5633 8735",
  photoUrl:
    "https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khristian-garcia--/" },
    { label: "GitHub", href: "https://github.com/garciajuni20" }
  ],
  summary:
    "Data Engineer and BI Analyst with 7+ years across cloud data platforms, analytics, and production operations. I built the analytics platform from scratch for Alleviate Financial Solutions (US fintech) — Snowflake modeling, role profiling and query/stored-procedure optimization, dbt and ETL/ELT pipelines, Azure Data Factory orchestration across Azure and GCP, Databricks, and Salesforce/CRM-to-Snowflake integrations — raising data accuracy from 85% to 99.5% and cutting the financial reporting cycle from 2+ days to under 30 minutes. I lead data projects from inception to completion with US-based finance and operations stakeholders, automate processes with Python, SQL, and Selenium, and design, deploy, and scale REST APIs and dockerized apps. Since January 2024 I have also architected and built Flowber end-to-end as full-stack engineer: a production platform on PostgreSQL/Supabase with an LLM assistant grounded in live business data (RAG through RLS-scoped tool calls) and 18 automated workflows. Systems Engineering at USAC — all coursework completed May 2026.",

  summaryShort:
    "Data Engineer and BI Analyst with 7+ years building cloud data platforms. I built the analytics platform from scratch for Alleviate Financial Solutions (US fintech) — Snowflake modeling, role profiling and query optimization, dbt and ETL/ELT pipelines, Azure Data Factory orchestration across Azure and GCP, Databricks, and Salesforce-to-Snowflake integrations — raising data accuracy from 85% to 99.5% and cutting the financial reporting cycle from 2+ days to under 30 minutes. I lead data projects from inception to completion with US-based stakeholders, automate processes with Python, SQL, and Selenium, and design and scale REST APIs and dockerized apps.",

  badges: ["Snowflake", "dbt · Databricks", "Azure Data Factory · GCP", "Python · SQL", "LLM / RAG", "Bilingual EN/ES"],

  keyAchievements: [
    "Improved data accuracy from 85% to 99.5% by architecting the Snowflake analytical layer behind financial reporting for 5 departments.",
    "Reduced the financial reporting cycle from 2+ days to under 30 minutes with automated SQL/dbt pipelines and Power BI dashboards — 70% less manual reporting time.",
    "Automated internal company processes with Python, SQL, and Selenium — including automations that measurably boosted lead generation.",
    "Eliminated 90% of recurring reporting errors through data validation, alerting, and documented Standard Operating Procedures.",
    "Architected and shipped Flowber end-to-end: a production platform with an LLM assistant grounded in live PostgreSQL data and 18 automated workflows."
  ],

  experience: [
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst / Data Analyst (Data & Analytics Engineering)",
      start: "2023-11",
      end: "present",
      location: "Remote (Guatemala / US)",
      tags: ["Data Engineering", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "Azure", "GCP", "Python", "SQL", "Salesforce", "Power BI", "Tableau", "REST APIs", "Data Modeling", "BI"],
      bullets: [
        "Lead data projects from inception to completion — identifying the proper source systems, ensuring they are imported and joined accurately, and communicating directly with US-based finance, operations, and strategy stakeholders to plan and deliver each initiative.",
        "Architect and maintain the analytical layer in Snowflake and PostgreSQL: dimensional data models, 8+ core models, views, and stored procedures queried across all 5 business departments — the company's single source of truth, which raised data accuracy from 85% to 99.5%.",
        "Snowflake platform work beyond modeling: role profiling and access design, database/query and stored-procedure optimization, and native data sharing to distribute datasets across consumers without copying them.",
        "Build data flows and ETL/ELT pipelines with dbt and SQL on Snowflake, plus Databricks implementation and management for advanced analytics and cross-platform transformations.",
        "Set up and manage Azure and Google Cloud resources — pipeline creation and orchestration in Azure Data Factory, dockerized applications, and resource scaling matched to workload demand.",
        "Integrate outside data sources and CRMs (Salesforce) into Snowflake and local databases to unify revenue and operations reporting; consume POST APIs and design, develop, deploy, and scale REST APIs.",
        "Automate internal company processes with Python, SQL, and Selenium — including automations that boosted lead generation — and implemented validation and alerting workflows that eliminated 90% of recurring reporting errors.",
        "Delivered 15+ interactive Power BI and Tableau dashboards and defined 20+ KPIs with US stakeholders, replacing manual Excel processes and cutting the financial reporting cycle from 2+ days to under 30 minutes.",
        "Design new processes and procedures from analysis findings, author Standard Operating Procedures and data documentation, and consult internal teams on data and predictive analysis.",
        "First BI hire in Guatemala for the Alleviate Financial Solutions account — built the function from zero into the company's full analytical stack; backlog and work items tracked in Azure DevOps."
      ]
    },
    {
      id: "flowber-freelance",
      company: "Flowber — Barbershop Digital Transformation (Independent Venture)",
      role: "Full-Stack Engineer & Solutions Architect",
      start: "2024-01",
      end: "present",
      location: "Remote (Guatemala)",
      tags: ["Full-Stack", "Architecture", "LLM / RAG", "PostgreSQL", "Supabase", "n8n", "Cloudflare", "ETL", "DevOps"],
      bullets: [
        "Led the end-to-end digital transformation of a physical barbershop since January 2024 — sole engineer and architect, owning the data model, the full-stack build, and production deployment.",
        "Designed the PostgreSQL/Supabase data model and the SQL analytics layer (daily and net revenue, customer loyalty views) the business now uses for revenue and operations reporting.",
        "Built an LLM assistant on Cloudflare Workers AI (Llama 4 Scout, native function calling) behind a dedicated Worker: it answers from live business data — services, appointments, customer history — retrieved at query time through RLS-scoped tool calls, so the model is grounded in the real database (RAG) and never holds credentials itself.",
        "Added a provider-router fallback chain (Workers AI → Gemini 2.5 Flash via n8n → rule-based) so the assistant degrades gracefully instead of failing, and normalized tool-calling wire formats across providers.",
        "Automated the business with 18 self-hosted n8n workflows: 24h/2h appointment reminders, no-show and post-service follow-ups, re-engagement and loyalty tier-ups, daily revenue and weekly admin reports, Google Calendar sync, and health-check/failure alerting.",
        "Engineered multichannel notifications — a self-hosted WhatsApp gateway (NestJS, Docker, Traefik), a role-aware Telegram bot, and transactional email with one-click confirm/reject links.",
        "Enforced 3-role access control (customer/barber/admin) entirely with PostgreSQL Row-Level Security, backed by an append-only audit log of application events.",
        "Ran the full delivery pipeline solo: Agile backlog, structured UAT before each release, and CI/CD to Cloudflare Pages with zero-downtime deploys."
      ]
    },
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Academic Instructor — Organizational Systems (Final Practicum)",
      start: "2025-08",
      end: "2026-08",
      location: "Guatemala City",
      tags: ["Teaching", "BI", "Systems", "Leadership"],
      bullets: [
        "Selected to teach Sistemas Organizacionales y Gerenciales 1 (Course 0786) as the required final practicum of the Systems Engineering program.",
        "Taught Business Analytics fundamentals, Information Systems, ERP/CRM concepts, and Digital Transformation.",
        "Guided students through real-world Business Intelligence projects and data analysis case studies.",
        "Developed lab materials and exercises that translate academic theory into practical data skills.",
        "Acted as a bridge between university curriculum and industry — bringing field experience from Alleviate into the classroom."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "IT Support Engineer / Systems Administrator",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala City",
      tags: ["IT Support", "Helpdesk", "Sysadmin", "Windows / Linux", "Networking", "Cloud Migration"],
      bullets: [
        "Provided enterprise IT and helpdesk support plus systems administration for 100+ internal users, tracking every request through a ticketing system to resolution.",
        "Administered Windows and Linux workstations and servers, endpoint management, access control, and network security protocols.",
        "Led the migration of on-premise systems to cloud infrastructure, reducing hardware costs.",
        "Automated repetitive support workflows with scripts, cutting helpdesk ticket volume by 40%.",
        "Transitioned into the BI role organically — the reporting gaps I kept finding while in IT support became the business case for the analytics function."
      ]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "NOC Analyst / Support Engineer — GNOC (Global Network Operations Center)",
      start: "2019-01",
      end: "2023-01",
      location: "Guatemala City",
      tags: ["NOC", "Monitoring", "Splunk", "New Relic", "Grafana", "Zabbix", "Jira", "Windows / Linux", "AWS"],
      bullets: [
        "Proactively monitored all production networks, applications, and services 24/7 using Splunk, New Relic, Grafana, and Zabbix.",
        "Responded to and resolved alerts/alarms according to standard operating procedures, tracked every issue in Jira, and escalated to the appropriate support teams via Slack, working with them through to timely resolution.",
        "Participated in high-priority incident bridge calls and authored the post-mortem reports, translating complex technical failures into clear explanations for non-technical stakeholders.",
        "Administered Windows and Linux servers, networks, and SQL/MongoDB databases — configuring integrations and alerting rules across the monitored estate, with working exposure to AWS infrastructure.",
        "Reduced mean time to recovery (MTTR) by 25% through proactive monitoring and alerting; automated alerting improved incident response times by 60%.",
        "Managed infrastructure serving 5,000+ concurrent users across multiple geographic regions, and wrote the SOPs the team used for recurring alert classes.",
        "Mentored 3 junior engineers — the teaching habit that eventually led to my USAC instructor role."
      ]
    }
  ],

  skills: [
    { name: "SQL", level: 95, years: 8 },
    { name: "Snowflake", level: 93, years: 4 },
    { name: "Data Modeling / Dimensional", level: 90, years: 5 },
    { name: "ETL / ELT Pipelines", level: 88, years: 4 },
    { name: "PostgreSQL", level: 85, years: 6 },
    { name: "Python", level: 80, years: 5 },
    { name: "dbt", level: 80, years: 4 },
    { name: "Databricks", level: 80, years: 4 },
    { name: "REST API Design", level: 80, years: 5 },
    { name: "Azure Data Factory", level: 75, years: 2 },
    { name: "Data Governance", level: 78, years: 4 },
    { name: "Data Mapping / Lineage", level: 78, years: 4 },
    { name: "n8n / Orchestration", level: 80, years: 2 },
    { name: "LLM / RAG Integration", level: 78, years: 2 },
    { name: "Power BI", level: 90, years: 4 },
    { name: "Tableau", level: 78, years: 4 },
    { name: "BigQuery", level: 72, years: 3 },
    { name: "Microsoft Azure", level: 70, years: 2 },
    { name: "Google Cloud (GCP)", level: 70, years: 2 },
    { name: "Docker", level: 72, years: 3 },
    { name: "Selenium", level: 72, years: 3 },
    { name: "Salesforce", level: 70, years: 3 },
    { name: "Agile / Scrum", level: 92, years: 8 },
    { name: "UAT / Acceptance Testing", level: 90, years: 8 },
    { name: "Git", level: 85, years: 6 },
    { name: "React", level: 82, years: 4 },
    { name: "TypeScript", level: 80, years: 4 },
    { name: "Azure DevOps", level: 60, years: 2 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Bachelor of Science",
      area: "Computer Science & Systems Engineering",
      end: "2026-05",
      status: "All coursework completed (pensum closed) — May 31, 2026",
      highlights: [
        "Pensum closed: all coursework completed as of May 31, 2026",
        "Completed the required final practicum as Academic Instructor (Aug 2025 – Aug 2026)",
        "Advanced coursework: Compilers (PEG parsers, Fortran grammar), Advanced Databases (BD2), Data Structures & Algorithms",
        "Built a Fortran PEG parser in JavaScript (Compilers 2, live on GitHub Pages); BD2 sufficiency project: advanced database design in Python"
      ]
    }
  ],


  projects: [
    {
      id: "cloud-data-pipelines",
      title: "Cloud Data Pipelines & CRM Integration",
      description: "Production data-engineering work at Alleviate Financial Solutions: ingestion pipelines created and orchestrated in Azure Data Factory across Azure and GCP resources, Salesforce/CRM integration into Snowflake, dbt and SQL transformations, Databricks workloads, and Python/Selenium process automation. Includes Snowflake role profiling, stored-procedure and query optimization, and native data sharing so consumers read datasets without copies.",
      impact: "Unified revenue and operations reporting on one governed platform — plus automations that boosted lead generation",
      technologies: ["Azure Data Factory", "Snowflake", "dbt", "Databricks", "Salesforce", "Python", "Selenium", "SQL", "Docker", "GCP", "REST APIs"],
      role: "Data Engineer / BI Analyst",
      duration: "Ongoing",
      teamSize: "Solo (cross-dept collaboration)",
      category: "data",
      featured: true,
      gradient: "from-sky-600 to-indigo-600"
    },
    {
      id: "flowber-barberia",
      title: "Flowber — Digital Barbershop Platform",
      description: "End-to-end digital transformation of a physical barbershop, architected and built solo since January 2024. Serverless booking and business management on PostgreSQL/Supabase: 3-role access control enforced with Postgres RLS, realtime appointments, multichannel notifications (WhatsApp, Telegram, email), e-commerce, and a SQL BI layer with revenue and loyalty views. The chat assistant runs on Cloudflare Workers AI (Llama 4 Scout) with function calling — grounded in live business data retrieved through RLS-scoped tool calls (RAG), with a Gemini-via-n8n fallback. 18 self-hosted n8n workflows automate reminders, follow-ups, loyalty, reporting, and health checks.",
      impact: "Digitized the whole business — bookings, notifications, reporting, and an assistant that answers from live data",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Postgres RLS", "Edge Functions", "Cloudflare Workers AI", "LLM / RAG", "n8n", "NestJS", "Docker", "Cloudflare Pages"],
      role: "Full-Stack Engineer & Solutions Architect",
      duration: "Since Jan 2024",
      teamSize: "Solo project",
      category: "architecture",
      links: { github: "https://github.com/garciajuni20/flowber-barberia", live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      gradient: "from-violet-500 to-indigo-600",
      caseStudyPath: "/projects/flowber"
    },
    {
      id: "snowflake-data-layer",
      title: "Snowflake Analytics Data Layer",
      description: "Designed and built the complete Snowflake data architecture for Alleviate Financial Solutions — star schema models, analytical views, stored procedures, and optimized SQL transformations feeding Power BI and Tableau dashboards across 5 departments, with role profiling and data validation built in.",
      impact: "Raised data accuracy from 85% to 99.5% — became the company's source of truth",
      technologies: ["Snowflake", "SQL", "Star Schema", "Data Modeling", "ETL", "dbt", "Stored Procedures", "Data Validation"],
      role: "Data Engineer / BI Analyst",
      duration: "2+ years",
      teamSize: "Solo (cross-dept collaboration)",
      category: "data",
      featured: true,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: "vale-combustible",
      title: "Continental Motores — Fuel Voucher System",
      description: "Full-stack fuel voucher management system for a vehicle fleet company. Features authentication, voucher generation, multi-step approval workflows, and usage reporting. Deployed on Cloudflare Pages with zero-downtime CI/CD.",
      impact: "Eliminated paper-based voucher process — approvals dropped from days to minutes",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "Vite", "Authentication"],
      role: "Full-Stack Developer",
      duration: "Ongoing",
      teamSize: "Solo project",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Continental-Motores-Vales-Combustible", live: "https://continental-motores-vales-combustible.pages.dev/login" },
      featured: true,
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "bi-dashboard-suite",
      title: "Financial Analytics Dashboard Suite",
      description: "Comprehensive Power BI and Tableau dashboard suite for financial and operational reporting at Alleviate Financial Solutions. Real-time data visualization, KPI tracking, trend analysis, and automated PDF reporting.",
      impact: "Reduced reporting cycle from 2+ days to under 30 minutes — 15+ dashboards in production",
      technologies: ["Power BI", "Tableau", "DAX", "Power Query", "Snowflake", "SQL"],
      role: "BI Developer",
      duration: "2+ years",
      teamSize: "2 analysts + US stakeholders",
      category: "data",
      featured: false,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "portfolio",
      title: "This Portfolio — Interactive Resume",
      description: "React + TypeScript portfolio with bilingual support (EN/ES), dark/light mode, animated skill meters, tag-based filters, dynamic PDF generation, and auto-deployment to GitHub Pages via GitHub Actions.",
      impact: "Demonstrates full-stack product thinking — this site IS the portfolio artifact",
      technologies: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GitHub Actions", "Vite", "@react-pdf/renderer"],
      role: "Full-Stack Developer & Designer",
      duration: "3 weeks",
      teamSize: "Solo project",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Resume_Khristian_Garcia", live: "https://garciajuni20.github.io/Resume_Khristian_Garcia/" },
      featured: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "fortran-peg-parser",
      title: "FortranPEG — Fortran Parser Generator",
      description: "A parser generator for the Fortran programming language using PEG (Parsing Expression Grammar) and recursive descent parsing. Includes a web-based IDE for grammar testing. Live on GitHub Pages.",
      impact: "Full Fortran grammar implementation with a live, interactive testing environment",
      technologies: ["JavaScript", "PEG Parsers", "Svelte", "Compiler Theory", "Recursive Descent"],
      role: "Developer — Group 8, Compilers 2",
      duration: "1 month",
      teamSize: "3 students",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/G8_Fase2_FortranPEG", live: "https://garciajuni20.github.io/G8_Fase2_FortranPEG/" },
      featured: false,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "bd2-suficiencia",
      title: "Advanced Databases — BD2 Sufficiency",
      description: "Python-based advanced database project for the BD2 sufficiency exam at USAC. Covers query optimization, indexing strategies, and complex schema design.",
      impact: "Applied advanced database theory to a real, graded deliverable",
      technologies: ["Python", "Advanced SQL", "Database Design", "Query Optimization", "Indexing"],
      role: "Student — Systems Engineering, USAC",
      duration: "2 weeks",
      teamSize: "Solo",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202" },
      featured: false,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: "compilers-phase1",
      title: "Compilers 2 — Phase 1 (Svelte App)",
      description: "Phase 1 of the Compilers 2 course project — web-based compiler front-end with lexical analysis, tokenization, and early parsing stages.",
      impact: "Foundation in compiler front-end theory applied to a working implementation",
      technologies: ["JavaScript", "Svelte", "Lexical Analysis", "Tokenization"],
      role: "Developer — Group 8",
      duration: "3 weeks",
      teamSize: "3 students",
      category: "academic",
      links: { github: "https://github.com/garciajuni20/Compi2_Grupo8" },
      featured: false,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      id: "docker-workshop",
      title: "Docker & Cloud-Native Infrastructure",
      description: "Containerization, Docker Compose, Kubernetes basics, and CI/CD pipeline design for cloud-native applications — completed in the Cloud-Native + GT community workshop.",
      impact: "Hands-on containerization skills applied to real DevOps workflows",
      technologies: ["Docker", "Docker Compose", "Kubernetes", "CI/CD", "Microservices", "GitHub Actions"],
      role: "Participant / Developer",
      duration: "1 week",
      teamSize: "Community workshop",
      category: "cloud",
      links: { github: "https://github.com/garciajuni20/taller-docker" },
      featured: false,
      gradient: "from-sky-500 to-blue-600"
    }
  ],

  languages: [
    { language: "Spanish", level: "Native", proficiency: 100 },
    { language: "English", level: "Professional / Fluent", proficiency: 92 },
    { language: "Italian", level: "Basic", proficiency: 35 }
  ],

  tools: {
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "Databricks", "Azure Data Factory", "ETL / ELT", "Data Pipelines", "PostgreSQL", "BigQuery", "MySQL", "MongoDB", "Stored Procedures", "Dimensional Modeling", "Selenium", "SSMS", "Postman"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Salesforce", "KPI Design", "Excel / VBA", "Google Data Studio", "Confluence", "Lucidchart", "Visio", "Draw.io", "Notion"],
    cloudDevOps: ["Microsoft Azure", "Google Cloud (GCP)", "AWS", "Azure DevOps", "Docker", "Cloudflare Pages & Workers", "GitHub Actions", "CI/CD", "Kubernetes", "n8n", "Splunk", "New Relic", "Grafana", "Zabbix"],
    fullStack: ["React", "TypeScript", "Node.js", "REST API Design", "Supabase", "Tailwind CSS", "Vite", "Cloudflare Workers AI", "LLM / RAG Integration"],
    methodologies: [
      "Data Pipeline Design", "Dimensional Modeling", "Data Governance", "Data Mapping / Lineage", "DataOps",
      "Requirements Gathering", "User Stories / Acceptance Criteria", "Stakeholder Management",
      "Standard Operating Procedures (SOPs)", "UAT / Acceptance Testing", "Change Management",
      "Agile", "Scrum", "Sprint Planning", "Jira", "Post-Mortem Documentation",
      "Predictive & Data Analysis Consulting"
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
      role: "Business Intelligence Manager",
      company: "Alleviate Financial Solutions",
      text: "Khristian's ability to turn complex, messy data into clean, actionable insights has been remarkable. His Snowflake implementations raised our reporting accuracy from 85% to 99.5% while cutting query times in half. He didn't just do the work — he built the foundation the entire team now relies on.",
      relationship: "Direct Manager at Alleviate Financial Solutions",
      rating: 5
    },
    {
      id: "amit-bansod",
      name: "Amit Bansod",
      role: "Director of Analytics",
      company: "Alleviate Financial Solutions",
      text: "Khristian's Power BI dashboards transformed the way our executive team makes decisions. The clarity and depth he brings to financial reporting has saved us countless hours of manual analysis. He operates like a senior analyst despite his tenure — driven, autonomous, and always quality-focused.",
      relationship: "Director of Analytics at Alleviate Financial Solutions",
      rating: 5
    }
  ],

  skillCategories: [
    { id: "data", title: "Data Engineering", skills: ["SQL", "Snowflake", "dbt", "Databricks", "ETL / ELT Pipelines", "Dimensional Modeling", "Stored Procedures", "Query Optimization", "PostgreSQL", "Data Governance", "Data Lineage"], level: "advanced" },
    { id: "integration", title: "Cloud, Pipelines & Integration", skills: ["Azure Data Factory", "Microsoft Azure", "Google Cloud (GCP)", "Docker", "Resource Scaling", "REST API Design", "Salesforce / CRM Integration", "BigQuery", "n8n Orchestration", "Python & Selenium Automation"], level: "advanced" },
    { id: "bi", title: "BI & Reporting", skills: ["Power BI", "DAX", "Power Query", "Tableau", "KPI Definition", "Predictive & Data Analysis"], level: "advanced" },
    { id: "ai", title: "AI / LLM Systems", skills: ["LLM Integration", "RAG (tool-call grounded)", "Function Calling", "Cloudflare Workers AI", "Prompt & Context Design", "Provider Fallback Design"], level: "intermediate" },
    { id: "ba", title: "Delivery & Business Analysis", skills: ["Project Leadership (inception to completion)", "Requirements Gathering", "User Stories", "Stakeholder Management", "Business Process Mapping", "UAT", "Agile / Scrum"], level: "advanced" },
    { id: "tech", title: "Programming & Full-Stack", skills: ["Python", "TypeScript", "React", "Node.js", "Supabase", "Git", "Kubernetes", "Windows / Linux"], level: "intermediate" },
    { id: "docs", title: "Documentation & SOPs", skills: ["Standard Operating Procedures", "Post-Mortem Reports", "Confluence", "Lucidchart", "Visio", "Data Dictionaries"], level: "advanced" }
  ],

  seo: {
    title: "Khristian Garcia — Data Engineer | Snowflake, dbt, Azure Data Factory",
    description: "Data Engineer and BI Analyst with 7+ years building cloud data platforms: Snowflake, dbt, Databricks, Azure Data Factory, Python. Remote from Guatemala.",
    keywords: ["Data Engineer", "Analytics Engineer", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "ETL", "Python", "SQL", "Power BI", "Tableau", "Business Intelligence", "Remote Guatemala"]
  }
} satisfies ProfileData
