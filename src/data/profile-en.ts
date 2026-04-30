import { files } from "./files"

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
  resumePdfPath: files.resumeEN,

  badges: ["Snowflake", "SQL Expert", "Power BI", "React · TypeScript", "Data Modeling", "Bilingual EN/ES"],

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
      location: "Remote (Guatemala → US)",
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
      location: "Remote (Guatemala → US)",
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
      verified: true
    },
    {
      id: "power-bi-analytics",
      title: "Power BI Data Analytics",
      issuer: "Microsoft",
      date: "2024-03",
      skills: ["Power BI", "DAX", "Power Query", "Data Modeling", "Dashboard Design"],
      verified: true
    },
    {
      id: "docker-cloud-native",
      title: "Docker & Cloud-Native Containers Workshop",
      issuer: "Cloud-Native + GT Community",
      date: "2025-08",
      skills: ["Docker", "Containers", "Kubernetes", "Microservices", "DevOps"],
      verified: true
    },
    {
      id: "usac-compilers",
      title: "Compilers 2 — PEG Parsers & Language Design",
      issuer: "USAC — School of Systems Engineering",
      date: "2024-12",
      skills: ["PEG Parsers", "JavaScript", "Svelte", "Compiler Theory", "Formal Grammars"],
      verified: true
    }
  ],

  projects: [
    {
      id: "vale-combustible",
      title: "Continental Motores — Fuel Voucher System",
      description: "Full-stack web app for managing fleet fuel vouchers — authentication, approval workflows, usage reporting",
      impact: "Eliminated paper-based voucher process; approvals now take minutes instead of days",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
      role: "Full-Stack Developer",
      duration: "Ongoing",
      teamSize: "Solo"
    },
    {
      id: "flowber",
      title: "Flowber — Digital Barbershop Platform",
      description: "Online appointment booking and business management platform for a barbershop",
      impact: "Digitized scheduling — reduced no-shows and eliminated phone-based booking",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
      role: "Full-Stack Developer & Designer",
      duration: "Ongoing",
      teamSize: "Solo"
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
    projectsCompleted: 20,
    technologies: 18,
    certifications: 4,
    clientsServed: 8,
    dataProcessed: "100+ TB"
  }
} as const
