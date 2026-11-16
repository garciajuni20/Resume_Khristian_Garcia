import type { ProfileData } from "../types"

export const profileEN = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Data Engineer · Snowflake, dbt, Azure Data Factory",
  location: "Guatemala City, Guatemala",
  email: "garciajuni20@gmail.com",
  phone: "+502 5633 8735",
  photoUrl:
    "https://resume-khristian-garcia.pages.dev/me/khristian-portrait.jpg",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khristian-garcia--/" },
    { label: "GitHub", href: "https://github.com/garciajuni20" },
    { label: "Portfolio", href: "https://resume-khristian-garcia.pages.dev/" }
  ],
  summary:
    "Data Engineer with 7+ years in technology: 3 building data platforms on Snowflake, dbt, Azure Data Factory and Databricks, and 4 before that on 24/7 operations for IDT's international remittance network. At Alleviate Financial Solutions (via Icon Solutions Group) I have held three roles in four years: IT support, then the account's first BI hire, then Data Engineer from November 2026. I built its analytics platform from scratch and now own it: dimensional models and access design in Snowflake, dbt, SQL and Python pipelines orchestrated in Azure Data Factory and Databricks, Salesforce and API integrations, GitLab CI. Data accuracy went from 85% to 99.5% and the financial reporting cycle from 2+ days to under 30 minutes. Since January 2024 I have also built and run Flowber, a barbershop platform in production: React and TypeScript on PostgreSQL/Supabase with row-level security, an AI agent with 20 tools and RAG on pgvector, and a dbt + DuckDB warehouse with predictive models. From November 23, 2026 I add a part-time AI implementation contract through Virtrify. I work directly with US stakeholders in English and Spanish. Computer Science & Systems Engineering at USAC, all degree requirements completed in 2026; master's degree starting February 2027.",

  summaryShort:
    "Data Engineer who owns the Snowflake platform 5 departments of a US fintech run on. I joined Alleviate Financial Solutions in IT support, became the account's first BI hire and built its data platform from scratch: accuracy from 85% to 99.5%, reporting from 2+ days to under 30 minutes, then the promotion to Data Engineer. Before that, 4 years on 24/7 operations for IDT's international remittance network. On my own I built and run Flowber, a platform in production with an AI agent, RAG on pgvector and a dbt warehouse.",

  badges: ["Snowflake", "dbt · Databricks", "Azure Data Factory · GCP", "Python · SQL", "AI · RAG · pgvector", "Bilingual EN/ES"],

  keyAchievements: [
    "Turned 5 departments' spreadsheet reporting into a single source of truth in Snowflake: data accuracy went from 85% to 99.5%.",
    "Joined as the first BI hire on the Alleviate Financial Solutions account and am now its Data Engineer (November 2026), owning the platform I built from scratch.",
    "Cut the financial reporting cycle from 2+ days to under 30 minutes with SQL/dbt pipelines and Power BI dashboards: 70% less manual work every cycle.",
    "Designed, built and run Flowber solo, the platform of a real barbershop: 160+ appointments and 90+ customers in production, an AI agent with 20 tools, RAG at 100% hit@1 and $0 infrastructure.",
    "A data-health mart in Flowber's warehouse (24 dbt models, 50 tests) found Q4,245 of revenue that never reached BI.",
    "Eliminated 90% of recurring reporting errors with validation, alerting, and documented Standard Operating Procedures."
  ],

  experience: [
    {
      id: "alleviate-de",
      story: {
        lead: "Promoted to own the platform I built as an analyst: the Snowflake source of truth 5 departments run on.",
        wins: [
          "I run Snowflake end to end: roles and access, dimensional models, data sharing and query tuning.",
          "I build dbt, SQL and Python pipelines orchestrated in Azure Data Factory and Databricks, on Azure and GCP.",
          "I integrate Salesforce and outside sources through APIs; every change ships through GitLab CI and an SOP."
        ],
      },
      industry: "Fintech · Debt consolidation (US)",
      company: "Alleviate Financial Solutions (via Icon Solutions Group)",
      role: "Data Engineer",
      start: "2026-11",
      end: "present",
      location: "Remote (Guatemala / US)",
      tags: ["Data Engineering", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "Azure", "GCP", "Python", "SQL", "Salesforce", "REST APIs", "Docker", "GitLab", "Data Modeling"],
      bullets: [
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
      story: {
        lead: "From 23 November 2026: bring order to a wellness retreat brand that runs on spreadsheets and email.",
        wins: [
          "First, map every lead from ad to payment and automate what costs the founder the most hours.",
          "Then, a lightweight CRM wired to Stripe, calendars and ads through n8n or Make.",
          "Three-month goal: key workflows in production and a playbook the founder can run without me."
        ],
      },
      industry: "Wellness · Retreats & community (US)",
      company: "Virtrify — placed with a US wellness & retreat brand",
      role: "AI Implementation Engineer (Part-time, Remote)",
      start: "2026-11",
      end: "present",
      startsOn: "2026-11-23",
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
      id: "usac-teaching",
      story: {
        lead: "Selected to teach the final practicum of Systems Engineering while working as a BI analyst.",
        wins: [
          "Taught BI, information systems, ERP/CRM and digital transformation through real BI projects."
        ],
      },
      industry: "Higher education",
      company: "Universidad de San Carlos de Guatemala",
      role: "Academic Instructor — Organizational Systems (Final Practicum)",
      start: "2025-08",
      end: "2026-08",
      location: "Guatemala City",
      tags: ["Teaching", "BI", "Systems", "Leadership"],
      bullets: [
        "Selected to teach Sistemas Organizacionales y Gerenciales 1 (Course 0786) as the final practicum of Systems Engineering; brought real BI projects into the classroom.",
        "Taught Business Analytics fundamentals, Information Systems, ERP/CRM concepts, and Digital Transformation.",
        "Guided students through real-world Business Intelligence projects and data analysis case studies.",
        "Developed lab materials and exercises that translate academic theory into practical data skills.",
        "Acted as a bridge between university curriculum and industry — bringing field experience from Alleviate into the classroom."
      ]
    },
    {
      id: "flowber-freelance",
      story: {
        lead: "Danover's barbershop ran on a paper schedule with clashing bookings; I built, alone, the system it runs on today.",
        wins: [
          "160+ appointments and 90+ customers in production, $0 infrastructure, double bookings blocked by the database.",
          "An AI agent with 20 tools and RAG on pgvector that answers from each role's own data: 100% hit@1.",
          "A dbt + DuckDB warehouse with 24 models and 50 tests, with cancellation and demand models in the same DAG."
        ],
      },
      industry: "Service retail · Barbershop",
      company: "Flowber — Barbershop Digital Transformation (Independent Venture)",
      role: "Sole Engineer: Full-Stack, Data & AI",
      start: "2024-01",
      end: "present",
      location: "Remote (Guatemala)",
      tags: ["Full-Stack", "Architecture", "Digital Transformation", "AI / LLM", "RAG", "pgvector", "ETL", "dbt", "DuckDB", "PostgreSQL", "Supabase", "Cloudflare"],
      bullets: [
        "Architected a serverless system with no custom backend (React + TypeScript on Cloudflare Pages, PostgreSQL/Supabase, 13 Deno Edge Functions) where security lives in the database: role-based Row-Level Security (customer/barber/admin) on every table and a GiST EXCLUDE constraint that makes double booking impossible. Infrastructure cost: $0 on free tiers.",
        "Led the digital transformation of Danover's barbershop from idea (January 2024) to production: process discovery with the owner, product, architecture, and operations as the sole engineer. The platform now manages 160+ appointments and 90+ registered customers.",
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
      story: {
        lead: "First BI hire on the account: five departments reported from spreadsheets at 85% accuracy.",
        wins: [
          "Modeled in Snowflake the single source of truth all 5 departments now query: accuracy rose to 99.5%.",
          "Swapped manual Excel for 15+ dashboards and 20+ KPIs in Power BI and Tableau: reporting from 2+ days to under 30 min.",
          "Validation and alerting in dbt and ADF eliminated 90% of recurring errors. Promoted to Data Engineer."
        ],
      },
      industry: "Fintech · Debt consolidation (US)",
      company: "Alleviate Financial Solutions (via Icon Solutions Group)",
      role: "Business Intelligence Analyst / Data Analyst (Data & Analytics Engineering)",
      start: "2023-11",
      end: "2026-10",
      location: "Remote (Guatemala / US)",
      tags: ["Data Engineering", "Snowflake", "dbt", "Databricks", "Azure Data Factory", "Python", "SQL", "Salesforce", "Power BI", "Tableau", "Data Modeling", "BI"],
      bullets: [
        "Architected the analytical layer in Snowflake and PostgreSQL: dimensional data models, 8+ core models, views, and stored procedures queried across all 5 business departments — the company's single source of truth, which raised data accuracy from 85% to 99.5%.",
        "Delivered 15+ interactive Power BI and Tableau dashboards and defined 20+ KPIs with US stakeholders, replacing manual Excel processes and cutting the financial reporting cycle from 2+ days to under 30 minutes.",
        "Laid the groundwork for the Data Engineer role: dbt and SQL ELT pipelines on Snowflake, Azure Data Factory orchestration, Databricks, and Salesforce-to-Snowflake integrations, plus validation and alerting workflows that eliminated 90% of recurring reporting errors.",
        "Led data projects from inception to completion — identifying the proper source systems, ensuring they were imported and joined accurately, and communicating directly with US-based finance, operations, and strategy stakeholders to plan and deliver each initiative.",
        "Designed new processes from analysis findings, authored Standard Operating Procedures and data documentation, and consulted internal teams on data and predictive analysis.",
        "First BI hire in Guatemala for the Alleviate Financial Solutions account — built the function from zero into the company's full analytical stack; backlog and work items tracked in Azure DevOps. Promoted to Data Engineer in November 2026."
      ]
    },
    {
      id: "icon-it",
      story: {
        lead: "Hired into IT support; the reporting gaps I kept finding became the business case for a BI role.",
        wins: [
          "Supported 100+ users on Windows and Linux; my scripts cut helpdesk tickets by 40%."
        ],
      },
      industry: "Fintech · Debt consolidation (US)",
      company: "Alleviate Financial Solutions (via Icon Solutions Group)",
      role: "IT Support Engineer / Systems Administrator",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala City",
      tags: ["IT Support", "Helpdesk", "Sysadmin", "Windows / Linux", "Networking", "Cloud Migration"],
      bullets: [
        "IT support and systems administration for 100+ internal users; scripts cut ticket volume by 40%.",
        "Administered Windows and Linux workstations and servers, endpoint management, access control, and network security protocols.",
        "Led the migration of on-premise systems to cloud infrastructure, reducing hardware costs.",
        "Automated repetitive support workflows with scripts, cutting helpdesk ticket volume by 40%.",
        "Transitioned into the BI role organically — the reporting gaps I kept finding while in IT support became the business case for the analytics function."
      ]
    },
    {
      id: "idt-gnoc",
      story: {
        lead: "Four years on 24/7 watch in IDT's NOC, over remittance infrastructure for 5,000+ concurrent users across regions.",
        wins: [
          "Cut mean time to recovery by 25% with proactive monitoring in Zabbix, Grafana, New Relic and Splunk.",
          "The automated alerts I configured made incident response 60% faster.",
          "Wrote the team's SOPs for recurring alerts and mentored 3 junior engineers."
        ],
      },
      industry: "Financial services · International remittances",
      company: "Red Chapina S.A. (IDT Guatemala)",
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

  arc: {
    title: "How I got to data",
    intro: "Three stages, one thread: systems people depend on, first kept running, then measured, now built.",
    acts: [
      { period: "2019 – 2023", title: "Keep it running", text: "Four years on IDT's 24/7 NOC, over the infrastructure behind international remittances. I learned to read systems through their signals and to write down what fixes them.", proof: "Recovery time down 25%, incident response 60% faster" },
      { period: "2023 – 2026", title: "Measure it", text: "At Alleviate I started in IT support. The same reporting gaps kept reaching my desk, so they became the case for a BI role, and I was its first hire.", proof: "Data accuracy from 85% to 99.5% across 5 departments" },
      { period: "2026 –", title: "Build it", text: "Promoted to Data Engineer, I now own the platform I built. In parallel, Flowber taught me to run a whole product alone, from the database to the AI agent.", proof: "Snowflake, dbt, Azure Data Factory, Databricks; Flowber live since 2024" }
    ]
  },

  skills: [
    { name: "SQL", level: 95, years: 7 },
    { name: "Snowflake", level: 93, years: 3 },
    { name: "Python", level: 80, years: 3 },
    { name: "Data Modeling / Dimensional", level: 90, years: 3 },
    { name: "ETL / ELT Pipelines", level: 88, years: 3 },
    { name: "dbt", level: 80, years: 3 },
    { name: "PostgreSQL", level: 85, years: 3 },
    { name: "Power BI", level: 90, years: 3 },
    { name: "LLM / RAG Integration", level: 78, years: 2 },
    { name: "React", level: 82, years: 3 },
    { name: "TypeScript", level: 80, years: 3 },
    { name: "Azure Data Factory", level: 75, years: 2 },
    { name: "Databricks", level: 80, years: 2 },
    { name: "REST API Design", level: 80, years: 3 },
    { name: "Data Governance", level: 78, years: 3 },
    { name: "Data Mapping / Lineage", level: 78, years: 3 },
    { name: "n8n / Orchestration", level: 80, years: 2 },
    { name: "Tableau", level: 78, years: 3 },
    { name: "Microsoft Azure", level: 70, years: 2 },
    { name: "Google Cloud (GCP)", level: 70, years: 2 },
    { name: "Docker", level: 72, years: 2 },
    { name: "Selenium", level: 72, years: 3 },
    { name: "Salesforce", level: 70, years: 3 },
    { name: "Agile / Scrum", level: 80, years: 4 },
    { name: "UAT / Acceptance Testing", level: 80, years: 3 },
    { name: "Git", level: 85, years: 5 },
    { name: "Azure DevOps", level: 60, years: 2 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Bachelor of Science",
      area: "Computer Science & Systems Engineering",
      end: "2026-05",
      status: "All degree requirements completed in 2026 (coursework and comprehensive private exam)",
      highlights: [
        "All coursework completed on May 31, 2026, and the comprehensive private exam passed in 2026",
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
      { title: "Document and hand over", text: "SOPs, plain-language manuals and dashboards people actually open, so the system runs without me." }
    ],
  },

  projects: [
    {
      id: "alleviate-platform",
      title: "Alleviate — Analytics Platform on Snowflake",
      description: "The data platform of a US debt consolidation fintech, built from scratch as the account's first BI hire and run today as its Data Engineer. Salesforce and operational sources land through Azure Data Factory in Snowflake, dbt and SQL shape them into a star schema with views and stored procedures, and 15+ Power BI and Tableau dashboards serve 5 departments. Role-based access, validation and alerting, GitLab CI and written SOPs keep it governed.",
      impact: "Data accuracy from 85% to 99.5% · reporting from 2+ days to under 30 minutes · 90% fewer recurring errors",
      technologies: ["Snowflake", "dbt", "Azure Data Factory", "Databricks", "SQL", "Python", "Salesforce", "Power BI", "Tableau", "GitLab"],
      role: "BI Analyst → Data Engineer",
      duration: "Since Nov 2023",
      teamSize: "Cross-department, with US stakeholders",
      category: "data",
      year: "2023",
      featured: true,
      caseStudyPath: "/alleviate"
    },
    {
      id: "flowber-barberia",
      title: "Flowber — Barbershop Digital Transformation",
      description: "End-to-end digital transformation of Danover's barbershop, from idea (January 2024) to production. React + TypeScript on PostgreSQL/Supabase with role-based RLS, realtime booking with no double bookings, Telegram and email notifications, and built-in BI. An AI agent (Llama 4 Scout on Workers AI) with 20 tools and RAG on pgvector answers and acts on live data. Underneath, a medallion warehouse with dbt + DuckDB, 50 tests, and ML models for cancellations and demand.",
      impact: "160+ appointments and 90+ customers on the platform · RAG at 100% hit@1 · mobile LCP from 4.8 s to 2.5 s",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Edge Functions", "Workers AI", "RAG · pgvector", "dbt", "DuckDB", "Python", "Cloudflare"],
      role: "Sole Engineer: Full-Stack, Data & AI",
      duration: "Since Jan 2024",
      teamSize: "Solo project",
      category: "architecture",
      year: "2024",
      links: { live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      caseStudyPath: "/flowber"
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
      year: "2026",
      featured: true
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
    },
    {
      id: "portfolio",
      title: "This Portfolio — Interactive Resume",
      description: "Bilingual (EN/ES) React + TypeScript portfolio set like a banknote: engraved art, Bodoni figures and one ink per industry. ATS and designed CVs are generated in the browser with react-pdf from the same data file, the career film is coded in Remotion, and the soundtrack and clips were generated locally (no paid APIs). Auto-deployed to GitHub Pages via GitHub Actions.",
      impact: "One data file feeds the site and both PDF CVs, so content never drifts; honors reduced motion",
      technologies: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GitHub Actions", "Vite", "@react-pdf/renderer"],
      role: "Full-Stack Developer & Designer",
      duration: "3 weeks",
      teamSize: "Solo project",
      category: "web",
      links: { github: "https://github.com/garciajuni20/Resume_Khristian_Garcia", live: "https://resume-khristian-garcia.pages.dev/" },
      featured: false
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
      year: "2024",
      links: { github: "https://github.com/garciajuni20/G8_Fase2_FortranPEG", live: "https://garciajuni20.github.io/G8_Fase2_FortranPEG/" },
      featured: false,
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
      year: "2026",
      links: { github: "https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202" },
      featured: false,
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
      year: "2024",
      links: { github: "https://github.com/garciajuni20/Compi2_Grupo8" },
      featured: false
    }
  ],

  languages: [
    { language: "Spanish", level: "Native", proficiency: 100 },
    { language: "English", level: "Professional / Fluent", proficiency: 92 },
    { language: "Italian", level: "Basic", proficiency: 35 }
  ],

  tools: {
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "Databricks", "Azure Data Factory", "ETL / ELT", "Data Pipelines", "PostgreSQL", "DuckDB", "MySQL", "MongoDB", "Stored Procedures", "Dimensional Modeling", "Selenium", "SSMS", "Postman"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Salesforce", "KPI Design", "Excel / VBA", "Confluence"],
    cloudDevOps: ["Microsoft Azure", "Google Cloud (GCP)", "AWS", "Azure DevOps", "Docker", "GitLab", "Cloudflare Pages & Workers", "GitHub Actions", "CI/CD", "n8n", "Splunk", "New Relic", "Grafana", "Zabbix"],
    fullStack: ["React", "TypeScript", "Node.js", "REST API Design", "Supabase", "Tailwind CSS", "Vite", "Cloudflare Workers AI", "LLM / RAG Integration", "pgvector", "Deno Edge Functions"],
    methodologies: [
      "Data Pipeline Design", "Dimensional Modeling", "Data Governance", "Data Mapping / Lineage", "DataOps",
      "Requirements Gathering", "User Stories / Acceptance Criteria", "Stakeholder Management",
      "Standard Operating Procedures (SOPs)", "UAT / Acceptance Testing", "Change Management",
      "Agile", "Scrum", "Sprint Planning", "Jira", "Post-Mortem Documentation",
      "Predictive & Data Analysis Consulting"
    ]
  },

  testimonials: [
    {
      id: "diego-zea",
      name: "Diego Zea",
      role: "Business Intelligence Manager",
      company: "Alleviate Financial Solutions",
      text: "Khristian's ability to turn complex, messy data into clean, actionable insights has been remarkable. His Snowflake implementations raised our reporting accuracy from 85% to 99.5% while cutting query times in half. He didn't just do the work — he built the foundation the entire team now relies on.",
      relationship: "Direct Manager at Alleviate Financial Solutions"
    },
    {
      id: "amit-bansod",
      name: "Amit Bansod",
      role: "Director of Analytics",
      company: "Alleviate Financial Solutions",
      text: "Khristian's Power BI dashboards transformed the way our executive team makes decisions. The clarity and depth he brings to financial reporting has saved us countless hours of manual analysis. He operates like a senior analyst despite his tenure — driven, autonomous, and always quality-focused.",
      relationship: "Director of Analytics at Alleviate Financial Solutions"
    }
  ],

  skillCategories: [
    { id: "data", title: "Data Engineering", skills: ["SQL", "Snowflake", "dbt", "Databricks", "ETL / ELT Pipelines", "Dimensional Modeling", "Stored Procedures", "Query Optimization", "PostgreSQL", "Data Governance", "Data Lineage"], level: "advanced" },
    { id: "integration", title: "Cloud, Pipelines & Integration", skills: ["Azure Data Factory", "Microsoft Azure", "Google Cloud (GCP)", "Docker", "Resource Scaling", "REST API Design", "Salesforce / CRM Integration", "n8n Orchestration", "Python & Selenium Automation"], level: "advanced" },
    { id: "bi", title: "BI & Reporting", skills: ["Power BI", "DAX", "Power Query", "Tableau", "KPI Definition", "Predictive & Data Analysis"], level: "advanced" },
    { id: "ai", title: "AI / LLM Systems", skills: ["LLM Agents with Function Calling", "RAG (pgvector + bge-m3 embeddings)", "Retrieval Evaluation (hit@k, MRR)", "Cloudflare Workers AI", "Groq", "Prompt & Context Design", "Anti-Hallucination Guardrails", "Provider Fallback Design"], level: "intermediate" },
    { id: "ba", title: "Delivery & Business Analysis", skills: ["Project Leadership (inception to completion)", "Requirements Gathering", "User Stories", "Stakeholder Management", "Business Process Mapping", "UAT", "Agile / Scrum"], level: "advanced" },
    { id: "tech", title: "Programming & Full-Stack", skills: ["Python", "TypeScript", "React", "Node.js", "Supabase", "Git", "Windows / Linux"], level: "intermediate" },
    { id: "docs", title: "Documentation & SOPs", skills: ["Standard Operating Procedures", "Post-Mortem Reports", "Confluence", "Data Dictionaries"], level: "advanced" }
  ],

  seo: {
    title: "Khristian Garcia — Data Engineer (Snowflake, dbt, Azure)",
    description: "Data Engineer with 3 years building data platforms on Snowflake, dbt and Azure Data Factory for a US fintech, plus an AI and data platform in production. Bilingual, remote from Guatemala.",
    keywords: ["Data Engineer", "Analytics Engineer", "Snowflake", "dbt", "Azure Data Factory", "Databricks", "SQL", "Python", "Power BI", "Data Modeling", "RAG", "Fintech", "Remote", "Guatemala"]
  }
} satisfies ProfileData
