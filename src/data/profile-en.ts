import type { ProfileData } from "../types"

export const profileEN = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Data Engineer · AI Implementation Engineer",
  location: "Guatemala City, Guatemala",
  email: "garciajuni20@gmail.com",
  phone: "+502 5633 8735",
  photoUrl:
    "https://garciajuni20.github.io/Resume_Khristian_Garcia/me/khristian-portrait.jpg",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khristian-garcia--/" },
    { label: "GitHub", href: "https://github.com/garciajuni20" },
    { label: "Portfolio", href: "https://garciajuni20.github.io/Resume_Khristian_Garcia/" }
  ],
  summary:
    "Data Engineer, full-stack developer, and AI engineer with 7+ years across US financial services (debt consolidation at Alleviate and international remittances at IDT), wellness, service retail, and university education, working in both English and Spanish. At Alleviate Financial Solutions I built the analytics platform from scratch as the account's first BI hire and was promoted to Data Engineer in November 2026: Snowflake modeling, role profiling and optimization, dbt and ETL/ELT pipelines, Azure Data Factory orchestration across Azure and GCP, Databricks, and Salesforce-to-Snowflake integrations, raising data accuracy from 85% to 99.5% and cutting the financial reporting cycle from 2+ days to under 30 minutes. Since November 2026 I also work part-time as AI Implementation Engineer through Virtrify, building the CRM, n8n automation, and content backbone of a US wellness and retreat brand. Since January 2024 I have led the digital transformation of Flowber, Danover's barbershop, from idea to production as full-stack engineer and architect: React/TypeScript on PostgreSQL/Supabase with role-based RLS, an AI agent with 20 tools and RAG on pgvector, and a dbt + DuckDB data warehouse with predictive models. I lead projects end to end with US stakeholders, automate processes with Python, SQL, and Selenium, and design, deploy, and scale REST APIs and dockerized apps. Systems Engineering at USAC completed (pensum closed and private exam passed, 2026); master's degree starting February 2027.",

  summaryShort:
    "Data Engineer, full-stack and AI engineer with 7+ years across US financial services (debt consolidation and remittances), wellness, service retail, and education, bilingual in English and Spanish. At Alleviate Financial Solutions I built the analytics platform from scratch with Snowflake, dbt, Azure Data Factory, and Databricks (data accuracy from 85% to 99.5%, financial reporting from 2+ days to under 30 minutes) and was promoted to Data Engineer in November 2026; since then also a part-time AI Implementation Engineer via Virtrify. Since 2024 I have taken Flowber from idea to production as architect and sole engineer: React + Supabase with role-based security in the database, an AI agent with RAG on pgvector, and a dbt + DuckDB warehouse with machine learning models.",

  badges: ["Snowflake", "dbt · Databricks", "Azure Data Factory · GCP", "Python · SQL", "AI · RAG · pgvector", "Bilingual EN/ES"],

  keyAchievements: [
    "Improved data accuracy from 85% to 99.5% by architecting the Snowflake analytical layer behind financial reporting for 5 departments.",
    "Promoted to Data Engineer at Alleviate Financial Solutions (November 2026) after building the analytics platform from zero as the account's first BI hire.",
    "Took Flowber from idea to production (Jan 2024 → today): 160+ appointments and 90+ registered customers on the platform, an AI agent with RAG (100% hit@1 on its eval set), and a dbt warehouse with 50 tests and ML models.",
    "Reduced the financial reporting cycle from 2+ days to under 30 minutes with automated SQL/dbt pipelines and Power BI dashboards — 70% less manual reporting time.",
    "Automated internal company processes with Python, SQL, and Selenium — including automations that measurably boosted lead generation.",
    "Eliminated 90% of recurring reporting errors through data validation, alerting, and documented Standard Operating Procedures."
  ],

  experience: [
    {
      id: "alleviate-de",
      approach: {
        context: "Promoted in Nov 2026 to own the platform I had built as the account's first BI hire; the business now runs on it.",
        how: "Cloud resources on Azure and GCP, ADF orchestration, Snowflake modeling and access design, dbt and Python pipelines, Salesforce integrations, SOPs and GitLab CI.",
        result: "One governed platform the whole company queries, with documented procedures and version control.",
      },
      industry: "Fintech · Debt consolidation (US)",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Data Engineer",
      start: "2026-11",
      end: "present",
      location: "Remote (Guatemala / US)",
      tags: ["Data Engineering", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "Azure", "GCP", "Python", "SQL", "Salesforce", "REST APIs", "Docker", "GitLab", "Data Modeling"],
      bullets: [
        "Promoted to Data Engineer in November 2026 after three years building the account's analytics platform from zero as its first BI hire; now own the data platform end to end, from cloud resources to the models the business queries.",
        "Set up and manage Azure and Google Cloud resources: pipeline creation and orchestration in Azure Data Factory, dockerized applications, and resource scaling matched to workload demand.",
        "Own the Snowflake platform: role profiling and access design, database, stored-procedure and query optimization, native data sharing, and dimensional database modeling.",
        "Implement and manage Databricks, and build the data flows and ETL/ELT pipelines (dbt, SQL, Python) that move data between source systems, local and cloud databases, and the warehouse.",
        "Integrate CRMs (Salesforce) and outside data sources into Snowflake; consume POST APIs and design, develop, deploy, and scale REST APIs.",
        "Automate internal company processes with Python, SQL, and Selenium, including automations that boosted lead generation, and consult internal teams on predictive and data analysis.",
        "Author Standard Operating Procedures and deliver through a GitLab-based environment for version control and CI."
      ]
    },
    {
      id: "virtrify-ai",
      approach: {
        context: "A solo founder running a growth-stage retreat business on spreadsheets, inboxes and ad platforms that do not talk to each other.",
        how: "Audit the lead-to-sale flow first; then a lean CRM, n8n or Make automations wired to Stripe and calendars, and a plain-language operating manual.",
        result: "Build phase: core workflows live within three months, documented so the founder runs them without me.",
      },
      industry: "Wellness · Retreats & community (US)",
      company: "Virtrify — placed with a US wellness & retreat brand",
      role: "AI Implementation Engineer (Part-time, Remote)",
      start: "2026-11",
      end: "present",
      location: "Remote (Guatemala / US) · ~20 h/week",
      tags: ["AI Implementation", "CRM", "n8n", "Workflow Automation", "LLM", "Stripe", "Integrations", "Documentation"],
      bullets: [
        "Part-time engagement starting November 23, 2026 (about 20 hours per week) alongside the Data Engineer role: design and deploy the AI-augmented operating system of a growth-stage wellness and retreat business run by a single founder — CRM, automated workflows, and centralized systems for leads, retreat bookings, and content.",
        "Audit how leads move from paid ads, organic inquiries, phone, and email into a sale; map the retreat sales cycle (inquiry, enrollment, payment, pre- and post-retreat communication) and prioritize the highest-leverage automations within a limited budget.",
        "Select and configure a lean, low-cost CRM (GoHighLevel, HubSpot, or equivalent); build lead capture and nurture workflows, the retreat enrollment pipeline (inquiry, deposit, payment, pre-retreat sequence), post-retreat follow-up and review collection, and scheduling for retreats, calls, and the monthly community meetup.",
        "Build the automations on n8n, Make, or Zapier, integrating the CRM with ad platforms, a payment processor (Stripe), and scheduling tools; write light custom scripts only where no-code tools hit a real limit.",
        "Centralize podcast, YouTube, and social media assets into one organized system with a lightweight content calendar, connected to the CRM for lead tracking.",
        "Test each workflow against real lead and booking scenarios, document everything in plain language, and hand the founder an operating manual so the system runs without the contractor; async progress reports against KPIs (core workflows live, admin hours reduced, reliability after handoff)."
      ]
    },
    {
      id: "flowber-freelance",
      approach: {
        context: "A barbershop with a paper schedule, double bookings and no data; the owner is a friend who wanted to grow.",
        how: "Discovery with the owner, then a serverless React + Supabase platform with security in the database, an AI agent with 20 tools and RAG, and a dbt + DuckDB warehouse with ML.",
        result: "160+ appointments and 90+ customers in production, RAG at 100% hit@1, mobile LCP from 4.8 s to 2.5 s.",
      },
      industry: "Service retail · Barbershop",
      company: "Flowber — Barbershop Digital Transformation (Independent Venture)",
      role: "Full-Stack Engineer · Solutions Architect · Data & AI Engineer",
      start: "2024-01",
      end: "present",
      location: "Remote (Guatemala)",
      tags: ["Full-Stack", "Architecture", "Digital Transformation", "AI / LLM", "RAG", "pgvector", "ETL", "dbt", "DuckDB", "PostgreSQL", "Supabase", "Cloudflare"],
      bullets: [
        "Led the digital transformation of Danover's barbershop from idea (January 2024) to production: process discovery with the owner, product, architecture, and operations as the sole engineer. The platform now manages 160+ appointments and 90+ registered customers.",
        "Architected a serverless system with no custom backend (React + TypeScript on Cloudflare Pages, PostgreSQL/Supabase, 13 Deno Edge Functions) where security lives in the database: role-based Row-Level Security (customer/barber/admin) on every table and a GiST EXCLUDE constraint that makes double booking impossible. Infrastructure cost: $0 on free tiers.",
        "Built an AI agent on Cloudflare Workers AI (Llama 4 Scout) with multi-turn function calling: 20 role-filtered tools, 5 of which write data (book, cancel, reschedule, confirm, complete) behind explicit confirmation and server-side re-verification; swappable providers (Workers AI, Groq, n8n/Gemini) with a deterministic rule-based fallback.",
        "Implemented RAG with pgvector (HNSW) and multilingual bge-m3 embeddings: SECURITY INVOKER retrieval that honors each role's RLS, incremental ingestion keyed by SHA-256 hash, and a golden evaluation set (hit@k, MRR) that reached 100% hit@1; anti-hallucination filters reject figures with no tool result behind them.",
        "Built the medallion data warehouse (Postgres → bronze Parquet → dbt + DuckDB silver/gold): a star schema with 4 dimensions and 3 facts, 24 models and 50 tests, PII-free (md5 keys), running nightly on GitHub Actions under a read-only role.",
        "Added predictive models inside the dbt DAG (cancellation risk via logistic regression with temporal validation against a baseline; EWMA demand forecast with backtest), RFM segmentation, and churn risk; a data-health mart surfaced Q4,245 in revenue that never reached BI.",
        "Unified business metrics into a single SQL function (business_summary) consumed by the dashboard, the assistant, the weekly summary, and Telegram; automated reminders, a daily close, and loyalty campaigns with pg_cron + Vault, a role-aware Telegram bot with bulk actions, and transactional email via Brevo.",
        "Ran the entire delivery solo: CI/CD to Cloudflare Pages, documented security, role, and business audits, and Lighthouse-measured performance work (mobile LCP from 4.8 s to 2.5 s)."
      ]
    },
    {
      id: "alleviate-mid",
      approach: {
        context: "First BI hire at a US debt-consolidation fintech: five departments reporting from spreadsheets at 85% data accuracy.",
        how: "Modeled a Snowflake star schema, validated every source, built dbt and ADF pipelines and 15+ Power BI and Tableau dashboards with the US stakeholders.",
        result: "Data accuracy 99.5%, reporting cycle from 2+ days to under 30 minutes, and the promotion to Data Engineer.",
      },
      industry: "Fintech · Debt consolidation (US)",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst / Data Analyst (Data & Analytics Engineering)",
      start: "2023-11",
      end: "2026-10",
      location: "Remote (Guatemala / US)",
      tags: ["Data Engineering", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "Python", "SQL", "Salesforce", "Power BI", "Tableau", "Data Modeling", "BI"],
      bullets: [
        "Led data projects from inception to completion — identifying the proper source systems, ensuring they were imported and joined accurately, and communicating directly with US-based finance, operations, and strategy stakeholders to plan and deliver each initiative.",
        "Architected the analytical layer in Snowflake and PostgreSQL: dimensional data models, 8+ core models, views, and stored procedures queried across all 5 business departments — the company's single source of truth, which raised data accuracy from 85% to 99.5%.",
        "Delivered 15+ interactive Power BI and Tableau dashboards and defined 20+ KPIs with US stakeholders, replacing manual Excel processes and cutting the financial reporting cycle from 2+ days to under 30 minutes.",
        "Laid the groundwork for the Data Engineer role: dbt and SQL ELT pipelines on Snowflake, Azure Data Factory orchestration, Databricks, and Salesforce-to-Snowflake integrations, plus validation and alerting workflows that eliminated 90% of recurring reporting errors.",
        "Designed new processes from analysis findings, authored Standard Operating Procedures and data documentation, and consulted internal teams on data and predictive analysis.",
        "First BI hire in Guatemala for the Alleviate Financial Solutions account — built the function from zero into the company's full analytical stack; backlog and work items tracked in Azure DevOps. Promoted to Data Engineer in November 2026."
      ]
    },
    {
      id: "usac-teaching",
      industry: "Higher education",
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
      industry: "Fintech · Debt consolidation (US)",
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
      approach: {
        context: "24/7 NOC for international remittance infrastructure serving 5,000+ concurrent users.",
        how: "Monitoring with Zabbix, Grafana, New Relic and Splunk; incident triage, escalation and runbooks on Windows and Linux.",
        result: "Mean time to recovery 25% lower.",
      },
      industry: "Financial services · International remittances",
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
    { name: "Python", level: 80, years: 5 },
    { name: "Data Modeling / Dimensional", level: 90, years: 5 },
    { name: "ETL / ELT Pipelines", level: 88, years: 4 },
    { name: "dbt", level: 80, years: 4 },
    { name: "PostgreSQL", level: 85, years: 6 },
    { name: "Power BI", level: 90, years: 4 },
    { name: "LLM / RAG Integration", level: 78, years: 2 },
    { name: "React", level: 82, years: 4 },
    { name: "TypeScript", level: 80, years: 4 },
    { name: "Azure Data Factory", level: 75, years: 2 },
    { name: "Databricks", level: 80, years: 4 },
    { name: "REST API Design", level: 80, years: 5 },
    { name: "Data Governance", level: 78, years: 4 },
    { name: "Data Mapping / Lineage", level: 78, years: 4 },
    { name: "n8n / Orchestration", level: 80, years: 2 },
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
    { name: "Azure DevOps", level: 60, years: 2 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Bachelor of Science",
      area: "Computer Science & Systems Engineering",
      end: "2026-05",
      status: "Completed — pensum closed May 31, 2026 · private exam passed (2026)",
      highlights: [
        "Pensum closed (all coursework completed) on May 31, 2026, and private comprehensive exam passed in 2026",
        "Completed the required final practicum as Academic Instructor (Aug 2025 – Aug 2026)",
        "Next step: master's degree starting February 2027",
        "Advanced coursework: Compilers (PEG parsers, Fortran grammar), Advanced Databases (BD2), Data Structures & Algorithms",
        "Built a Fortran PEG parser in JavaScript (Compilers 2, live on GitHub Pages); BD2 sufficiency project: advanced database design in Python"
      ]
    }
  ],


  workflow: {
    title: "How I work",
    intro: "The same four moves in every industry, from a fintech to a barbershop.",
    steps: [
      { title: "Learn the business first", text: "I sit with the people who do the work (owner, agents, analysts) and map the real flow before touching a tool." },
      { title: "Model the data and the rules", text: "Star schemas in Snowflake, security in the database (RLS), a contract for every integration, tests on the transformations." },
      { title: "Automate and ship small", text: "ADF and dbt pipelines, n8n workflows, AI agents that confirm before they write; each step live before the next one starts." },
      { title: "Document and hand over", text: "SOPs, plain-language manuals and dashboards people actually open, so the system runs without me." },
    ],
  },

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
      gradient: "from-sky-600 to-indigo-600",
      cover: { image: "ai/cover-cloud-data-pipelines.webp", alt: "AI-generated render of glowing data streams flowing from clouds into a crystal vault" },
    },
    {
      id: "flowber-barberia",
      title: "Flowber — Barbershop Digital Transformation",
      description: "End-to-end digital transformation of Danover's barbershop, from idea (January 2024) to production. React + TypeScript on PostgreSQL/Supabase with role-based RLS, realtime booking with no double bookings, Telegram and email notifications, and built-in BI. An AI agent (Llama 4 Scout on Workers AI) with 20 tools and RAG on pgvector answers and acts on live data. Underneath, a medallion warehouse with dbt + DuckDB, 50 tests, and ML models for cancellations and demand.",
      impact: "160+ appointments and 90+ customers on the platform · RAG at 100% hit@1 · mobile LCP from 4.8 s to 2.5 s",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Edge Functions", "Workers AI", "RAG · pgvector", "dbt", "DuckDB", "Python", "Cloudflare"],
      role: "Full-Stack · Architect · Data & AI Engineer",
      duration: "Since Jan 2024",
      teamSize: "Solo project",
      category: "architecture",
      links: { live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      gradient: "from-violet-500 to-indigo-600",
      caseStudyPath: "/flowber",
      cover: { image: "ai/flowber-cover.webp", video: "ai/flowber-cover.mp4", alt: "AI-generated clip of an empty neon barbershop" }
    },
    {
      id: "virtrify-ai-ops",
      title: "AI Operating System for a US Wellness & Retreat Brand",
      description: "Part-time engagement through Virtrify (from November 23, 2026): the operational backbone of a growth-stage retreat and community business run by a single founder. Scope: a lean CRM with lead capture and nurture, the retreat enrollment pipeline (inquiry, deposit, payment, pre- and post-retreat sequences), scheduling, a centralized podcast/YouTube/social content system, automations on n8n, Make, or Zapier wired to ad platforms, Stripe, and calendars, and a plain-language operating manual so the founder runs it alone.",
      impact: "Build phase: core workflows planned to be live within the first three months, documented for handoff",
      technologies: ["CRM (GoHighLevel / HubSpot)", "n8n", "Make · Zapier", "Stripe", "LLM tooling", "Workflow design", "Documentation"],
      role: "AI Implementation Engineer (part-time)",
      duration: "Since Nov 2026",
      teamSize: "Solo contractor + founder",
      category: "architecture",
      featured: true,
      gradient: "from-teal-600 to-emerald-600",
      cover: { image: "ai/ind-ai-ops.webp", alt: "AI-generated render of an automation workflow converging into one card" }
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
      gradient: "from-blue-600 to-blue-700",
      cover: { image: "ai/cover-snowflake-data-layer.webp", alt: "AI-generated render of stacked glass plates with a crystalline core, like a star schema" },
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
      links: { live: "https://continental-motores-vales-combustible.pages.dev/login" },
      featured: true,
      gradient: "from-orange-500 to-red-500",
      cover: { image: "ai/cover-vale-combustible.webp", alt: "AI-generated render of a frosted glass card with a fuel-drop symbol beside a model pickup truck" },
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
      gradient: "from-emerald-500 to-teal-600",
      cover: { image: "ai/cover-bi-dashboard-suite.webp", alt: "AI-generated render of a floating dashboard made of frosted glass bars and one rising line" },
    },
    {
      id: "portfolio",
      title: "This Portfolio — Interactive Resume",
      description: "Notion-style React + TypeScript portfolio, bilingual (EN/ES) with dark/light mode. ATS and designed CVs generated in the browser with react-pdf, a 57-second career film coded in Remotion, and ambient clips generated with a local video model (Wan 2.2 on an RTX 3060, no paid APIs). Auto-deployed to GitHub Pages via GitHub Actions.",
      impact: "One data file feeds the site and both PDF CVs, so content never drifts; honors reduced motion",
      technologies: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GitHub Actions", "Vite", "@react-pdf/renderer"],
      role: "Full-Stack Developer & Designer",
      duration: "3 weeks",
      teamSize: "Solo project",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Resume_Khristian_Garcia", live: "https://garciajuni20.github.io/Resume_Khristian_Garcia/" },
      featured: false,
      gradient: "from-blue-500 to-cyan-500",
      cover: { image: "og-image.jpg", alt: "Portfolio social card with Khristian Garcia's photo" }
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
      gradient: "from-purple-500 to-pink-500",
      cover: { image: "ai/cover-fortran-peg-parser.webp", alt: "AI-generated render of a syntax tree of glowing glass spheres over a punch-card texture" },
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
      gradient: "from-amber-500 to-orange-500",
      cover: { image: "ai/cover-bd2-suficiencia.webp", alt: "AI-generated render of three glass database cylinders crossed by a glowing index lattice" },
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
      gradient: "from-rose-500 to-pink-500",
      cover: { image: "ai/cover-compilers-phase1.webp", alt: "AI-generated render of colored glass tokens flowing along a track into a branching tree" }
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
      gradient: "from-sky-500 to-blue-600",
      cover: { image: "ai/cover-docker-workshop.webp", alt: "AI-generated render of an isometric stack of frosted glass shipping containers with glowing edges" }
    }
  ],

  languages: [
    { language: "Spanish", level: "Native", proficiency: 100 },
    { language: "English", level: "Professional / Fluent", proficiency: 92 },
    { language: "Italian", level: "Basic", proficiency: 35 }
  ],

  tools: {
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "Databricks", "Azure Data Factory", "ETL / ELT", "Data Pipelines", "PostgreSQL", "DuckDB", "BigQuery", "MySQL", "MongoDB", "Stored Procedures", "Dimensional Modeling", "Selenium", "SSMS", "Postman"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Salesforce", "KPI Design", "Excel / VBA", "Google Data Studio", "Confluence", "Lucidchart", "Visio", "Draw.io", "Notion"],
    cloudDevOps: ["Microsoft Azure", "Google Cloud (GCP)", "AWS", "Azure DevOps", "Docker", "GitLab", "Cloudflare Pages & Workers", "GitHub Actions", "CI/CD", "Kubernetes", "n8n", "Splunk", "New Relic", "Grafana", "Zabbix"],
    fullStack: ["React", "TypeScript", "Node.js", "REST API Design", "Supabase", "Tailwind CSS", "Vite", "Cloudflare Workers AI", "LLM / RAG Integration", "pgvector", "Deno Edge Functions"],
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
    { id: "ai", title: "AI / LLM Systems", skills: ["LLM Agents with Function Calling", "RAG (pgvector + bge-m3 embeddings)", "Retrieval Evaluation (hit@k, MRR)", "Cloudflare Workers AI", "Groq", "Prompt & Context Design", "Anti-Hallucination Guardrails", "Provider Fallback Design"], level: "intermediate" },
    { id: "ba", title: "Delivery & Business Analysis", skills: ["Project Leadership (inception to completion)", "Requirements Gathering", "User Stories", "Stakeholder Management", "Business Process Mapping", "UAT", "Agile / Scrum"], level: "advanced" },
    { id: "tech", title: "Programming & Full-Stack", skills: ["Python", "TypeScript", "React", "Node.js", "Supabase", "Git", "Kubernetes", "Windows / Linux"], level: "intermediate" },
    { id: "docs", title: "Documentation & SOPs", skills: ["Standard Operating Procedures", "Post-Mortem Reports", "Confluence", "Lucidchart", "Visio", "Data Dictionaries"], level: "advanced" }
  ],

  seo: {
    title: "Khristian Garcia — Data Engineer, Full-Stack & AI",
    description: "Data Engineer, full-stack and AI engineer with 7+ years across US fintech, remittances, retail, and education: Snowflake, dbt, Azure Data Factory, React, Supabase, and RAG. Bilingual, remote from Guatemala.",
    keywords: ["Data Engineer", "Analytics Engineer", "AI Implementation Engineer", "Full-Stack Developer", "AI Engineer", "RAG", "Solutions Architect", "Snowflake", "dbt", "Azure Data Factory", "n8n", "Python", "SQL", "React", "Fintech", "Remote Guatemala"]
  }
} satisfies ProfileData
