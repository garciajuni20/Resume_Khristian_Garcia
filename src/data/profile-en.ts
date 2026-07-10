import type { ProfileData } from "../types"

export const profileEN = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Data Analyst · Business Intelligence · Full-Stack Developer",
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
    "Technology professional with 6+ years of experience spanning network operations, IT infrastructure, and business intelligence. I built the BI function from scratch for Alleviate Financial Solutions in Guatemala — designing Snowflake data models, Power BI dashboards, and SQL pipelines that now drive financial decisions across 5 departments. Concurrently completing a Systems Engineering degree at USAC (Guatemala's national university) and teaching Business Intelligence as an academic instructor. I also build production web applications using React and TypeScript, deployed on Cloudflare and GitHub Pages.",

  badges: ["Snowflake", "SQL Expert", "Power BI", "React · TypeScript", "Data Modeling", "Bilingual EN/ES"],

  keyAchievements: [
    "Improved data accuracy from 85% to 99.5% by architecting Snowflake data models for financial reporting across 5 departments.",
    "Reduced financial reporting cycle from 2+ days to under 30 minutes through automated SQL pipelines and Power BI dashboards.",
    "Eliminated 90% of recurring reporting errors by implementing data validation and alerting workflows in Snowflake.",
    "Built and deployed 3 production web applications on Cloudflare Pages using React, TypeScript, and Tailwind CSS."
  ],

  experience: [
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Academic Instructor — Organizational Systems (Final Practicum)",
      start: "2025-08",
      end: "present",
      location: "Guatemala City",
      tags: ["Teaching", "BI", "Systems", "Leadership"],
      bullets: [
        "Selected to teach Sistemas Organizacionales y Gerenciales 1 (Course 0786) as part of the Systems Engineering final practicum.",
        "Courses taught: Business Analytics fundamentals, Information Systems, ERP/CRM concepts, and Digital Transformation.",
        "Guided students in real-world Business Intelligence projects and data analysis case studies.",
        "Developed lab materials and exercises that translate academic theory into practical data skills.",
        "Bridge between university curriculum and industry — bringing field experience from Alleviate into the classroom."
      ]
    },
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst / Data Analyst",
      start: "2024-12",
      end: "present",
      location: "Remote (Guatemala / US)",
      tags: ["BI", "Snowflake", "Power BI", "SQL", "Tableau", "Data Modeling"],
      bullets: [
        "Architect and maintain analytical layers in Snowflake — tables, views, and data models queried across all 5 business departments.",
        "Built the company's unified source of truth for financial and operational reporting, improving data accuracy from 85% to 99.5%.",
        "Developed 15+ interactive Power BI and Tableau dashboards that replaced manual Excel reporting processes.",
        "Reduced financial reporting cycle from 2+ days to under 30 minutes through automated SQL pipelines.",
        "Define and track 20+ KPIs in collaboration with US-based stakeholders across finance, operations, and strategy.",
        "Implemented data validation and alerting workflows that eliminated 90% of recurring reporting errors."
      ]
    },
    {
      id: "alleviate-jr",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst Jr",
      start: "2023-11",
      end: "2024-12",
      location: "Remote (Guatemala / US)",
      tags: ["BI", "SQL", "Reporting", "Data Analysis"],
      bullets: [
        "First BI hire in Guatemala for the Alleviate Financial Solutions account — built the function from zero.",
        "Designed 8+ core Snowflake data models that became the permanent foundation for all future reporting.",
        "Translated business requirements from US stakeholders into SQL models, reports, and dashboards.",
        "Cut manual reporting time by 70% by automating recurring data extraction and transformation tasks.",
        "Established data documentation standards and query libraries still used by the team today."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "IT Support Engineer / Systems Administrator",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala City",
      tags: ["IT", "Sysadmin", "Networking", "Cloud Migration"],
      bullets: [
        "Provided enterprise IT support and systems administration for 100+ internal users.",
        "Led migration of on-premise systems to cloud-based infrastructure, reducing hardware costs.",
        "Automated repetitive support workflows with scripts, cutting helpdesk ticket volume by 40%.",
        "Managed network security protocols, access control, and endpoint management.",
        "Transitioned into the BI role organically — identifying reporting gaps while in IT support."
      ]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "GNOC Support Engineer",
      start: "2019-01",
      end: "2023-01",
      location: "Guatemala City",
      tags: ["Networking", "NOC", "Incident Response", "Monitoring", "Operations"],
      bullets: [
        "Global Network Operations Center engineer — monitored and maintained mission-critical network infrastructure 24/7.",
        "Handled incident analysis, root cause investigation, and escalation for enterprise-grade services.",
        "Managed infrastructure serving 5,000+ concurrent users across multiple geographic regions.",
        "Reduced mean time to recovery (MTTR) by 25% through proactive monitoring and alerting systems.",
        "Implemented automated alerting that improved incident response times by 60%.",
        "Mentored 3 junior engineers — the teaching habit that eventually led to my USAC instructor role."
      ]
    }
  ],

  skills: [
    { name: "SQL", level: 95 },
    { name: "Snowflake", level: 93 },
    { name: "Power BI", level: 90 },
    { name: "Data Modeling", level: 88 },
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
      degree: "Bachelor of Science",
      area: "Computer Science & Systems Engineering",
      end: "present",
      highlights: [
        "Advanced coursework: Compilers (PEG parsers, Fortran grammar), Advanced Databases (BD2), Data Structures & Algorithms",
        "Built a Fortran PEG parser in JavaScript as part of the Compilers 2 course (live on GitHub Pages)",
        "BD2 Sufficiency exam project: advanced database design in Python",
        "Currently serving as Academic Instructor while completing the degree"
      ]
    }
  ],

  certifications: [
    {
      id: "snowflake-fundamentals",
      title: "Snowflake Fundamentals",
      issuer: "Snowflake Inc.",
      date: "2024-06",
      skills: ["Snowflake", "Data Warehousing", "SQL", "Virtual Warehouses", "Clustering"],
      verified: true,
      type: "professional"
    },
    {
      id: "power-bi-analytics",
      title: "Power BI Data Analytics",
      issuer: "Microsoft",
      date: "2024-03",
      skills: ["Power BI", "DAX", "Power Query", "Data Modeling", "Dashboard Design"],
      verified: true,
      type: "professional"
    },
    {
      id: "docker-cloud-native",
      title: "Docker & Cloud-Native Containers Workshop",
      issuer: "Cloud-Native + GT Community",
      date: "2025-08",
      url: "https://github.com/garciajuni20/taller-docker",
      skills: ["Docker", "Containers", "Kubernetes", "Microservices", "DevOps"],
      verified: true,
      type: "training"
    },
    {
      id: "usac-compilers",
      title: "Compilers 2 — PEG Parsers & Language Design",
      issuer: "USAC — School of Systems Engineering",
      date: "2024-12",
      url: "https://garciajuni20.github.io/G8_Fase2_FortranPEG/",
      skills: ["PEG Parsers", "JavaScript", "Svelte", "Compiler Theory", "Formal Grammars"],
      verified: true,
      type: "academic"
    },
    {
      id: "usac-bd2",
      title: "Advanced Databases — BD2 Sufficiency",
      issuer: "USAC — School of Systems Engineering",
      date: "2026-01",
      url: "https://github.com/garciajuni20/BD2_SUFICIENCIA_201404202",
      skills: ["Advanced Databases", "Python", "Database Design", "Query Optimization"],
      verified: true,
      type: "academic"
    }
  ],

  projects: [
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
      id: "flowber-barberia",
      title: "Flowber — Digital Barbershop Platform",
      description: "Serverless booking and business management platform: 3-role access control (customer/barber/admin) enforced with Postgres RLS, real-time appointment updates, multichannel notifications (WhatsApp, Telegram, Email), a role-aware chat assistant, e-commerce, and a BI layer with SQL revenue views.",
      impact: "Digitized scheduling end-to-end — eliminated phone-based bookings",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions", "Cloudflare Pages"],
      role: "Full-Stack Developer & Designer",
      duration: "Ongoing",
      teamSize: "Solo project",
      category: "web",
      links: { github: "https://github.com/garciajuni20/flowber-barberia", live: "https://flowber-barberia.pages.dev/" },
      featured: true,
      gradient: "from-violet-500 to-indigo-600",
      caseStudyPath: "/projects/flowber"
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
      featured: true,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "snowflake-data-layer",
      title: "Snowflake Analytics Data Layer",
      description: "Designed and built the complete Snowflake data architecture for Alleviate Financial Solutions — star schema models, analytical views, and optimized SQL transformations feeding Power BI and Tableau dashboards across 5 departments.",
      impact: "Raised data accuracy from 85% to 99.5% — became the company's source of truth",
      technologies: ["Snowflake", "SQL", "Star Schema", "Data Modeling", "ETL", "dbt", "Data Validation"],
      role: "Lead Data Engineer / BI Analyst",
      duration: "14+ months",
      teamSize: "Solo (cross-dept collaboration)",
      category: "data",
      featured: true,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: "bi-dashboard-suite",
      title: "Financial Analytics Dashboard Suite",
      description: "Comprehensive Power BI and Tableau dashboard suite for financial and operational reporting at Alleviate Financial Solutions. Real-time data visualization, KPI tracking, trend analysis, and automated PDF reporting.",
      impact: "Reduced reporting cycle from 2+ days to under 30 minutes — 15+ dashboards in production",
      technologies: ["Power BI", "Tableau", "DAX", "Power Query", "Snowflake", "SQL"],
      role: "BI Developer",
      duration: "14+ months",
      teamSize: "2 analysts + US stakeholders",
      category: "data",
      featured: false,
      gradient: "from-emerald-500 to-teal-600"
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
      featured: true,
      gradient: "from-purple-500 to-pink-500"
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
    dataEngineering: ["Snowflake", "SQL", "Python", "dbt", "PostgreSQL", "MySQL", "Apache Airflow", "Great Expectations"],
    biAnalytics: ["Power BI", "Tableau", "DAX", "Power Query", "Excel", "Google Data Studio"],
    cloudDevOps: ["GCP", "Cloudflare Pages", "Docker", "GitHub Actions", "CI/CD", "Kubernetes"],
    fullStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "REST APIs", "Framer Motion"],
    methodologies: ["Agile", "Scrum", "DataOps", "Data Modeling", "Dimensional Modeling"]
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
    { id: "data", title: "Data Engineering", skills: ["Snowflake", "SQL", "PostgreSQL", "MySQL", "Data Modeling", "ETL"], level: "advanced" },
    { id: "bi", title: "Business Intelligence", skills: ["Power BI", "Tableau", "Data Analytics", "Dashboard Design", "KPI Metrics"], level: "advanced" },
    { id: "cloud", title: "Cloud & DevOps", skills: ["GCP", "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code"], level: "intermediate" },
    { id: "dev", title: "Full-Stack Development", skills: ["React", "TypeScript", "Python", "REST APIs", "Tailwind CSS"], level: "intermediate" },
    { id: "systems", title: "Systems Architecture", skills: ["System Design", "Microservices", "API Design", "Scalability", "Performance"], level: "advanced" },
    { id: "tools", title: "Development Tools", skills: ["Git", "Docker Compose", "K8s Manifests", "Power Automate", "Power Apps"], level: "intermediate" }
  ]
} satisfies ProfileData
