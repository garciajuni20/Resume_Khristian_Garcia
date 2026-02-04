import { useMemo, useState } from "react";
import Container from "../components/Container";
import { useLanguage } from "../context/LanguageContext";
import useSEO from "../hooks/useSEO";
import { motion } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Link } from "react-router-dom";

type ProjectCategory = "All" | "Data" | "Web" | "Cloud" | "Systems";

type Project = {
  title: string;
  subtitle?: string;
  description: string;
  categories: ProjectCategory[];
  stack: string[];
  links?: {
    live?: string;
    repo?: string;
  };
  highlights?: string[];
};

const projectsEn: Project[] = [
  {
    title: "Interactive Resume (React + TypeScript)",
    subtitle: "Bilingual portfolio (EN/ES) deployed on GitHub Pages",
    description:
      "An interactive CV/resume built with React + Tailwind + TypeScript. Includes language toggle, clean navigation, and a modern layout optimized for recruiters.",
    categories: ["Web", "All"],
    stack: ["React", "TypeScript", "Tailwind", "Vite", "GitHub Actions"],
    links: {
      live: "https://garciajuni20.github.io/Resume_Khristian_Garcia/",
      repo: "https://github.com/GarciaJuni20/Resume_Khristian_Garcia",
    },
    highlights: [
      "HashRouter-friendly navigation for GitHub Pages",
      "Clean experience & skills sections aligned with BI profile",
      "Professional UI with consistent components",
    ],
  },
  {
    title: "NG Legal / Pre-Lit Power BI Data Layer",
    subtitle: "Analytics foundation for operational visibility",
    description:
      "Designed curated reporting datasets and SQL logic to track legal/pre-lit inventory and settlements, enabling operational visibility and monitoring by legal partner.",
    categories: ["Data", "All"],
    stack: ["Snowflake", "SQL", "Power BI", "Data Modeling", "ETL"],
    highlights: [
      "Curated analytics tables as a source of truth",
      "Optimized SQL for performance and consistency",
      "Partnered with stakeholders to define KPIs",
    ],
  },
  {
    title: "ETL: PDF → PostgreSQL → MongoDB",
    subtitle: "Academic ETL pipeline and database modeling",
    description:
      "End-to-end extraction from PDFs into structured SQL tables (PostgreSQL) with a staged ETL process, plus selected exports into MongoDB for document-style access.",
    categories: ["Data", "Systems", "All"],
    stack: ["Python", "PostgreSQL", "MongoDB", "ETL", "Data Modeling"],
    highlights: [
      "Staging → dimensions → facts approach",
      "Automated load scripts and validation checks",
      "Documented workflow and schema design",
    ],
  },
  {
    title: "Swaptify (Microservices + CI/CD)",
    subtitle: "Course project: services, containers, and deployment",
    description:
      "Microservices-based system with React frontend, Node.js backend services, PostgreSQL, containerization, and CI/CD using GitHub Actions and GCP.",
    categories: ["Web", "Cloud", "Systems", "All"],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "Kubernetes", "GCP"],
    highlights: [
      "Service contracts and architecture documentation",
      "Docker/K8s deployment structure",
      "CI/CD pipeline via GitHub Actions",
    ],
  },
  {
    title: "Kubernetes Microservices on GCP (Kops)",
    subtitle: "Hands-on cloud deployment & orchestration",
    description:
      "Deployed multiple microservices and an API gateway to a Kubernetes cluster on GCP using Kops. Includes a private image registry and jobs for DB initialization.",
    categories: ["Cloud", "Systems", "All"],
    stack: ["Kubernetes", "Docker", "GCP", "Kops", "CI/CD"],
    highlights: [
      "Ingress + gateway setup",
      "Private registry workflow",
      "Jobs/cronjobs for automation",
    ],
  },
  {
    title: "VLangCherry Interpreter (Go + ANTLR + Fyne)",
    subtitle: "Compiler/interpreter project with GUI",
    description:
      "Implemented an interpreter in Go using ANTLR for lexing/parsing and built a functional GUI with Fyne to run and visualize results.",
    categories: ["Systems", "All"],
    stack: ["Go", "ANTLR", "Fyne", "Parsing", "AST"],
    highlights: [
      "Lexer/parser integration",
      "Interpreter runtime execution",
      "GUI to run scripts and inspect outputs",
    ],
  },
];

const projectsEs: Project[] = [
  {
    title: "CV Interactivo (React + TypeScript)",
    subtitle: "Portafolio bilingüe (EN/ES) en GitHub Pages",
    description:
      "CV/resume interactivo construido con React + Tailwind + TypeScript. Incluye cambio de idioma, navegación limpia y un diseño moderno optimizado para reclutadores.",
    categories: ["Web", "All"],
    stack: ["React", "TypeScript", "Tailwind", "Vite", "GitHub Actions"],
    links: {
      live: "https://garciajuni20.github.io/Resume_Khristian_Garcia/",
      repo: "https://github.com/GarciaJuni20/Resume_Khristian_Garcia",
    },
    highlights: [
      "Navegación compatible con GitHub Pages (HashRouter)",
      "Secciones alineadas a perfil BI",
      "UI profesional con componentes consistentes",
    ],
  },
  {
    title: "NG Legal / Pre-Lit Power BI Data Layer",
    subtitle: "Base analítica para visibilidad operativa",
    description:
      "Diseño de datasets curados y lógica SQL para dar visibilidad del inventario legal/pre-lit y acuerdos, permitiendo monitoreo por partner legal.",
    categories: ["Data", "All"],
    stack: ["Snowflake", "SQL", "Power BI", "Modelado de Datos", "ETL"],
    highlights: [
      "Tablas analíticas como fuente de verdad",
      "SQL optimizado para performance y consistencia",
      "Trabajo con stakeholders para definir KPIs",
    ],
  },
  {
    title: "ETL: PDF → PostgreSQL → MongoDB",
    subtitle: "Pipeline ETL y modelado de bases de datos (académico)",
    description:
      "Extracción end-to-end desde PDFs hacia tablas SQL estructuradas (PostgreSQL) con enfoque ETL por etapas y exportaciones seleccionadas hacia MongoDB.",
    categories: ["Data", "Systems", "All"],
    stack: ["Python", "PostgreSQL", "MongoDB", "ETL", "Modelado de Datos"],
    highlights: [
      "Enfoque staging → dimensiones → hechos",
      "Scripts de carga y validación",
      "Documentación del flujo y el esquema",
    ],
  },
  {
    title: "Swaptify (Microservicios + CI/CD)",
    subtitle: "Proyecto de curso: servicios, contenedores y despliegue",
    description:
      "Sistema basado en microservicios con frontend en React, backend en Node.js, PostgreSQL, contenedores y CI/CD mediante GitHub Actions y GCP.",
    categories: ["Web", "Cloud", "Systems", "All"],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "Kubernetes", "GCP"],
    highlights: [
      "Contratos de servicios y arquitectura documentada",
      "Estructura de despliegue Docker/K8s",
      "Pipeline CI/CD en GitHub Actions",
    ],
  },
  {
    title: "Microservicios en Kubernetes sobre GCP (Kops)",
    subtitle: "Despliegue cloud y orquestación (hands-on)",
    description:
      "Despliegue de múltiples microservicios y API Gateway en un clúster Kubernetes en GCP usando Kops, con registry privado y jobs de inicialización de BD.",
    categories: ["Cloud", "Systems", "All"],
    stack: ["Kubernetes", "Docker", "GCP", "Kops", "CI/CD"],
    highlights: [
      "Ingress + gateway",
      "Workflow de registry privado",
      "Jobs/cronjobs para automatización",
    ],
  },
  {
    title: "Intérprete VLangCherry (Go + ANTLR + Fyne)",
    subtitle: "Proyecto de intérprete con interfaz gráfica",
    description:
      "Implementación de un intérprete en Go usando ANTLR para análisis léxico/sintáctico y GUI funcional con Fyne para ejecutar y visualizar resultados.",
    categories: ["Systems", "All"],
    stack: ["Go", "ANTLR", "Fyne", "Parsing", "AST"],
    highlights: [
      "Integración lexer/parser",
      "Ejecución del runtime del intérprete",
      "GUI para correr scripts y ver salidas",
    ],
  },
];

const allCategories: ProjectCategory[] = ["All", "Data", "Web", "Cloud", "Systems"];

function label(lang: "en" | "es", c: ProjectCategory) {
  if (lang === "en") return c;
  switch (c) {
    case "All":
      return "Todo";
    case "Data":
      return "Datos";
    case "Web":
      return "Web";
    case "Cloud":
      return "Cloud";
    case "Systems":
      return "Sistemas";
    default:
      return c;
  }
}

export default function Projects() {
  const { language } = useLanguage();

  useSEO({
    title: language === "en" ? "Projects | Khristian Garcia" : "Proyectos | Khristian García",
    description:
      language === "en"
        ? "Selected projects across data, BI, web, and cloud."
        : "Proyectos seleccionados en datos, BI, web y cloud.",
  });

  const projects = language === "en" ? projectsEn : projectsEs;

  const [selected, setSelected] = useState<ProjectCategory>("All");

  const filtered = useMemo(() => {
    if (selected === "All") return projects;
    return projects.filter((p) => p.categories.includes(selected));
  }, [projects, selected]);

  return (
    <Container>
      <div className="mx-auto max-w-6xl pb-16 pt-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-2xl font-semibold text-white">
              {language === "en" ? "Projects" : "Proyectos"}
            </div>
            <p className="mt-1 text-sm text-white/70">
              {language === "en"
                ? "A curated selection of work across data, BI, and engineering."
                : "Selección curada de proyectos en datos, BI e ingeniería."}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
            <span className="inline-flex items-center gap-2 px-2 text-xs text-white/70">
              <Filter size={14} />
              {language === "en" ? "Filter" : "Filtrar"}
            </span>

            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value as ProjectCategory)}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
            >
              {allCategories.map((c) => (
                <option key={c} value={c} className="bg-black text-white">
                  {label(language, c)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">{p.title}</div>
                  {p.subtitle ? <div className="text-sm text-white/70">{p.subtitle}</div> : null}
                </div>

                <div className="flex items-center gap-2">
                  {p.links?.live ? (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  ) : null}

                  {p.links?.repo ? (
                    <a
                      href={p.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                    >
                      <Github size={14} />
                      Repo
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/80">{p.description}</p>

              {p.highlights && p.highlights.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-base font-semibold text-white">
            {language === "en" ? "Want to see more?" : "¿Quieres ver más?"}
          </div>
          <p className="mt-1 text-sm text-white/70">
            {language === "en"
              ? "Check the full resume or contact me for details and context."
              : "Revisa el CV completo o contáctame para más detalles y contexto."}
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              {language === "en" ? "Open Resume" : "Ver CV"}
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {language === "en" ? "Contact" : "Contacto"}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
