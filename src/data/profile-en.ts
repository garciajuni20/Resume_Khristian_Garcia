import { resumePdfEn } from "./files";

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

export const profileEn: ProfileData = {
  name: "Khristian Manolo Junior Garcia Pineda",
  role: "Data Analyst / Business Intelligence Analyst",
  location: "Guatemala · Hybrid",
  email: "khristiangarciajr@gmail.com",
  website: "https://garciajuni20.github.io/Resume_Khristian_Garcia/",
  linkedin: "https://www.linkedin.com/in/khristian-garcia/",
  github: "https://github.com/GarciaJuni20",
  resumePdf: resumePdfEn,
  summary:
    "Data Analyst and Business Intelligence Analyst with strong experience in data modeling, analytics, and enterprise reporting. I specialize in building reliable and scalable sources of truth using Snowflake, SQL, and relational databases, transforming raw data into business-ready insights. I deliver dashboards and reports in Power BI and Tableau, focusing on data accuracy, performance, and accessibility to support strategic and operational decision-making.",
  highlights: [
    "Snowflake + SQL modeling for scalable analytics sources of truth",
    "Enterprise reporting with Power BI & Tableau (operations + finance)",
    "ETL, data quality and performance optimization",
    "Cross-functional collaboration and stakeholder communication",
    "React/TypeScript portfolio and API integrations (Express/Django)",
  ],
  experience: [
    {
      company: "Alleviate",
      title: "Business Intelligence Analyst",
      start: "2023-01-01",
      end: undefined,
      location: "Guatemala · Hybrid",
      bullets: [
        "Design and maintain analytical models and curated datasets in Snowflake and relational databases to enable reliable reporting.",
        "Develop and optimize SQL transformations for data accuracy, performance, and scalability across enterprise reporting layers.",
        "Deliver Power BI and Tableau dashboards for operational and financial visibility, enabling data-driven decision-making.",
        "Partner with stakeholders to define KPIs, translate requirements, and iterate on reporting solutions with clear documentation.",
      ],
      tech: ["Snowflake", "SQL", "Power BI", "Tableau", "Data Modeling", "ETL"],
    },
    {
      company: "Icon Solutions Group, S. A.",
      title: "Business Intelligence Analyst",
      start: "2024-12-21",
      end: "2025-12-01",
      location: "Guatemala · Hybrid",
      bullets: [
        "Promoted on Dec 21, 2024 from BI Analyst Jr. to BI Analyst.",
        "Owned end-to-end reporting solutions: data sourcing, modeling, validation, and publishing dashboards to business users.",
        "Improved dataset reliability and performance by refining SQL logic and standardizing definitions across teams.",
      ],
      tech: ["Power BI", "SQL", "Data Warehousing", "Stakeholder Management"],
    },
    {
      company: "Icon Solutions Group, S. A.",
      title: "Business Intelligence Analyst Jr.",
      start: "2023-10-06",
      end: "2024-12-20",
      location: "Guatemala · Hybrid",
      bullets: [
        "Built foundational analytical tables and optimized SQL queries to support scalable reporting.",
        "Created Power BI dashboards and maintained data refresh processes to ensure consistent reporting cadence.",
        "Supported requirements gathering and delivered iterative improvements based on business feedback.",
      ],
      tech: ["SQL", "Power BI", "Data Modeling", "Excel"],
    },
    {
      company: "Icon Solutions Group, S. A.",
      title: "IT Specialist",
      start: "2023-01-01",
      end: "2023-10-01",
      location: "Guatemala · On-site",
      bullets: [
        "Provided IT support and incident resolution across tools and internal platforms.",
        "Assisted with process documentation and basic automation for operational tasks.",
      ],
      tech: ["IT Support", "Office 365", "Documentation"],
    },
    {
      company: "IDT Corporation",
      title: "GNOC Support Engineer",
      start: "2019-05-01",
      end: "2023-03-01",
      location: "Guatemala",
      bullets: [
        "Monitored and supported network operations, troubleshooting incidents and coordinating escalations.",
        "Maintained operational documentation and contributed to continuous improvement of support processes.",
      ],
      tech: ["Networking", "Operations", "Incident Management", "Office 365"],
    },
    {
      company: "IDT Corporation",
      title: "Technician Representative",
      start: "2017-11-01",
      end: "2019-05-01",
      location: "Guatemala",
      bullets: [
        "Customer and technical support, issue triage, and resolution following service-level guidelines.",
        "Supported process improvements and knowledge base updates for recurring issues.",
      ],
      tech: ["Customer Support", "Troubleshooting", "Documentation"],
    },
    {
      company: "Universidad de San Carlos de Guatemala",
      title: "Private Tutor / Academic Tutor (Contract)",
      start: "2025-07-01",
      end: undefined,
      location: "Guatemala · Hybrid",
      bullets: [
        "Academic tutor for course 0786 — Organizational Systems & Management I.",
        "Support students with structured explanations, exercises, and feedback aligned to course outcomes.",
      ],
      tech: ["Teaching", "Communication", "Coaching"],
    },
  ],
  education: [
    {
      school: "Universidad de San Carlos de Guatemala",
      program: "Information Systems / Systems Engineering (Academic Background)",
      notes: [
        "University-level exposure to systems engineering, business analytics, and organizational systems.",
      ],
    },
  ],
  skills: [
    {
      group: "Data & BI",
      items: [
        { name: "SQL (Advanced)", level: 5 },
        { name: "Snowflake", level: 4 },
        { name: "Data Modeling", level: 4 },
        { name: "ETL / ELT", level: 4 },
        { name: "Data Warehousing", level: 4 },
        { name: "Data Quality", level: 4 },
      ],
    },
    {
      group: "Analytics & Reporting",
      items: [
        { name: "Power BI", level: 5 },
        { name: "Tableau", level: 4 },
        { name: "DAX / Measures", level: 4 },
        { name: "KPI Definition", level: 4 },
        { name: "Stakeholder Collaboration", level: 5 },
      ],
    },
    {
      group: "Engineering",
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
        { name: "GCP Fundamentals", level: 3 },
        { name: "CI/CD (GitHub Actions)", level: 3 },
      ],
    },
    {
      group: "Professional",
      items: [
        { name: "Communication", level: 5 },
        { name: "Presentation Skills", level: 4 },
        { name: "Customer Service", level: 4 },
        { name: "Documentation", level: 4 },
      ],
    },
  ],
};
