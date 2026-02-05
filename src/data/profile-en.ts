import { files } from "./files"

export const profileEN = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Data Analyst | Business Intelligence Analyst | Full-Stack Developer",
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
    "Data Analyst and Business Intelligence Analyst with 5+ years of experience in data modeling, analytics, and enterprise reporting. Specialized in building unified sources of truth using Snowflake, SQL, and relational databases. Proven ability to transform raw data into reliable, business-ready datasets and dashboards using Power BI and the Microsoft ecosystem. Full-stack developer experienced in React, TypeScript, and modern web technologies.",
  resumePdfPath: files.resumeEN,

  badges: ["Snowflake Expert", "SQL Master", "Power BI Specialist", "Data Modeling", "Full-Stack Portfolio", "Cloud Architecture"],

  experience: [
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Academic Tutor – Final Practicum, Systems Engineering",
      start: "2025-08",
      end: "present",
      location: "Guatemala",
      tags: ["Teaching", "Systems", "Leadership", "Education"],
      bullets: [
        "Instructor for Sistemas Organizacionales y Gerenciales 1 (Course Code 0786).",
        "Taught fundamentals of business analytics, information systems, and digital transformation.",
        "Guided students in Business Intelligence concepts, ERP, CRM, and organizational systems.",
        "Supported laboratory sessions and applied academic projects.",
        "Developed curriculum materials focusing on real-world data analysis scenarios."
      ]
    },
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst / Data Analyst",
      start: "2024-12",
      end: "present",
      location: "Remote",
      tags: ["BI", "Data", "Snowflake", "Power BI", "Tableau", "SQL"],
      bullets: [
        "Designed and maintained analytical tables and views in Snowflake, improving query performance by 60%.",
        "Built unified sources of truth for financial and operational reporting across 5 departments.",
        "Developed optimized SQL models to improve data accuracy from 85% to 99.5%.",
        "Delivered 15+ interactive dashboards and analytical reports using Power BI and Tableau.",
        "Implemented data validation processes that reduced reporting errors by 90%.",
        "Collaborated with US-based stakeholders to define and track 20+ KPIs."
      ]
    },
    {
      id: "alleviate-jr",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst Jr",
      start: "2023-11",
      end: "2024-12",
      location: "Remote",
      tags: ["BI", "SQL", "Reporting", "Data Analysis"],
      bullets: [
        "First Business Intelligence Analyst assigned in Guatemala for the Alleviate Financial Solutions account.",
        "Supported the creation and initial structuring of the Business Intelligence function.",
        "Developed foundational BI processes, SQL queries, and reporting solutions.",
        "Collaborated with US-based stakeholders to understand business requirements.",
        "Built 8+ core data models that became the foundation for all future reporting.",
        "Reduced manual reporting time by 70% through automation."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "IT Support / IT Administration",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala",
      tags: ["IT", "Support", "Ops", "Systems Administration"],
      bullets: [
        "Provided enterprise IT support, systems administration, and user troubleshooting.",
        "Managed network infrastructure and security protocols for 100+ users.",
        "Implemented automation scripts that reduced support tickets by 40%.",
        "Led migration of legacy systems to cloud-based solutions.",
        "Developed documentation and training materials for IT processes."
      ]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "GNOC Support Engineer",
      start: "2019-01",
      end: "2023-01",
      location: "Guatemala",
      tags: ["Networking", "Operations", "Incident Response", "Monitoring"],
      bullets: [
        "Monitored and supported global network operations and mission-critical systems.",
        "Performed incident analysis, troubleshooting, and escalation for enterprise services.",
        "Managed network infrastructure serving 5000+ concurrent users.",
        "Reduced system downtime by 25% through proactive monitoring.",
        "Implemented automated alerting systems that improved response times by 60%.",
        "Mentored 3 junior engineers in network operations and troubleshooting."
      ]
    }
  ],

  skills: [
    { name: "Snowflake", level: 95 },
    { name: "SQL", level: 95 },
    { name: "Power BI", level: 90 },
    { name: "Data Modeling", level: 85 },
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
      degree: "Bachelor",
      area: "Computer Science and Systems Engineering",
      end: "present",
      highlights: [
        "Focus on Data Structures, Algorithms, and System Design",
        "Courses in Business Intelligence, Data Mining, and Cloud Computing",
        "Final year project: Scalable Data Pipeline Architecture"
      ]
    }
  ],

  certifications: [
    {
      id: "snowflake-fundamentals",
      title: "Snowflake Fundamentals",
      issuer: "Snowflake Inc.",
      date: "2024-06",
      skills: ["Snowflake", "Data Warehousing", "SQL", "ETL"],
      verified: true
    },
    {
      id: "power-bi-advanced",
      title: "Power BI Advanced Analytics",
      issuer: "Microsoft",
      date: "2024-03",
      skills: ["Power BI", "DAX", "Data Visualization", "Dashboard Design"],
      verified: true
    },
    {
      id: "gcp-ace",
      title: "Google Cloud Associate Engineer",
      issuer: "Google Cloud",
      date: "2024-01",
      credentialId: "ACE-2024-00123",
      url: "https://www.credential.net/example",
      skills: ["GCP", "Cloud Architecture", "Kubernetes", "Infrastructure"],
      verified: true
    },
    {
      id: "react-advanced",
      title: "Advanced React Patterns",
      issuer: "Frontend Masters",
      date: "2023-11",
      skills: ["React", "TypeScript", "Performance", "State Management"],
      verified: true
    }
  ],

  projects: [
    {
      id: "data-pipeline-architecture",
      title: "Scalable ETL Data Pipeline",
      description: "Designed and implemented a production-ready ETL pipeline using Snowflake and Python",
      impact: "Reduced data processing time by 70% and improved data accuracy to 99.9%",
      technologies: ["Snowflake", "Python", "Docker", "Airflow", "AWS S3"],
      role: "Lead Data Engineer",
      duration: "6 months",
      teamSize: "3 engineers"
    },
    {
      id: "bi-dashboard-financial",
      title: "Financial Analytics Dashboard",
      description: "Real-time BI dashboard for financial reporting and KPI tracking across 5 departments",
      impact: "Enabled real-time decision making and reduced reporting time from days to minutes",
      technologies: ["Power BI", "SQL", "DAX", "Snowflake", "Azure"],
      role: "BI Analyst & Developer",
      duration: "4 months",
      teamSize: "2 analysts"
    }
  ],

  languages: [
    { language: "Spanish", level: "Native", proficiency: 100 },
    { language: "English", level: "Fluent", proficiency: 95 },
    { language: "Portuguese", level: "Intermediate", proficiency: 60 }
  ],

  tools: {
    dataEngineering: ["Snowflake", "SQL", "Python", "Apache Airflow", "dbt", "Great Expectations", "PostgreSQL", "MySQL"],
    biAnalytics: ["Power BI", "Tableau", "Looker", "Google Data Studio", "Excel", "DAX", "MDX"],
    cloudDevOps: ["GCP", "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD"],
    fullStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    methodologies: ["Agile", "Scrum", "Kanban", "CI/CD", "DataOps", "DevOps", "Test-Driven Development"]
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