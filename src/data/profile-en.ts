import { files } from "./files"

export const profileEN = {
  name: "Khristian Manolo Junior Garcia Pineda",
  headline: "Data Analyst | Business Intelligence Analyst",
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
    "Data Analyst and Business Intelligence Analyst with strong experience in data modeling, analytics, and enterprise reporting. Specialized in building unified sources of truth using Snowflake, SQL, and relational databases. Proven ability to transform raw data into reliable, business-ready datasets and dashboards using Power BI and the Microsoft ecosystem.",
    resumePdfPath: files.resumeEN,

  experience: [
    {
      id: "usac-teaching",
      company: "Universidad de San Carlos de Guatemala",
      role: "Academic Tutor – Final Practicum, Systems Engineering",
      start: "2025-08",
      end: "present",
      location: "Guatemala",
      tags: ["Teaching", "Systems", "Leadership"],
      bullets: [
        "Instructor for Sistemas Organizacionales y Gerenciales 1 (Course Code 0786).",
        "Taught fundamentals of business analytics, information systems, and digital transformation.",
        "Guided students in Business Intelligence concepts, ERP, CRM, and organizational systems.",
        "Supported laboratory sessions and applied academic projects."
      ]
    },
    {
      id: "alleviate-mid",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst / Data Analyst",
      start: "2024-12",
      end: "present",
      location: "Remote",
      tags: ["BI", "Data", "Snowflake", "Power BI"],
      bullets: [
        "Designed and maintained analytical tables and views in Snowflake.",
        "Built unified sources of truth for financial and operational reporting.",
        "Developed optimized SQL models to improve data accuracy and performance.",
        "Delivered dashboards and analytical reports using Power BI and Tableau."
      ]
    },
    {
      id: "alleviate-jr",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "Business Intelligence Analyst Jr",
      start: "2023-11",
      end: "2024-12",
      location: "Remote",
      tags: ["BI", "SQL", "Reporting"],
      bullets: [
        "First Business Intelligence Analyst assigned in Guatemala for the Alleviate Financial Solutions account.",
        "Supported the creation and initial structuring of the Business Intelligence function.",
        "Developed foundational BI processes, SQL queries, and reporting solutions.",
        "Collaborated with US-based stakeholders."
      ]
    },
    {
      id: "icon-it",
      company: "Icon Solutions Group S.A / Alleviate Financial Solutions",
      role: "IT Support / IT Administration",
      start: "2023-01",
      end: "2023-11",
      location: "Guatemala",
      tags: ["IT", "Support", "Ops"],
      bullets: ["Provided enterprise IT support, systems administration, and user troubleshooting."]
    },
    {
      id: "idt-gnoc",
      company: "Red Chapina S.A (IDT Guatemala)",
      role: "GNOC Support Engineer",
      start: "2019-01",
      end: "2023-01",
      location: "Guatemala",
      tags: ["Networking", "Operations", "Incident Response"],
      bullets: [
        "Monitored and supported global network operations and mission-critical systems.",
        "Performed incident analysis, troubleshooting, and escalation for enterprise services."
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
    { name: "Python", level: 70 },
    { name: "Git", level: 70 },
    { name: "REST APIs", level: 70 }
  ],

  education: [
    {
      institution: "Universidad de San Carlos de Guatemala",
      degree: "Bachelor",
      area: "Computer Science and Systems Engineering",
      end: "present"
    }
  ]
} as const
