import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, Laptop, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useLanguage } from "../context/LanguageContext";
import useSEO from "../hooks/useSEO";

export default function Home() {
  const { language } = useLanguage();

  useSEO({
    title: language === "en" ? "Home | Khristian Garcia" : "Inicio | Khristian García",
    description:
      language === "en"
        ? "Data & BI analyst portfolio — Snowflake, SQL, Power BI, Tableau, and engineering."
        : "Portafolio de analista de datos/BI — Snowflake, SQL, Power BI, Tableau e ingeniería.",
  });

  const title = language === "en" ? "Data & BI, built for impact." : "Datos & BI, enfocado en impacto.";
  const subtitle =
    language === "en"
      ? "I build scalable sources of truth and enterprise reporting with Snowflake, SQL, Power BI, and Tableau — bridging analytics with engineering execution."
      : "Construyo fuentes de verdad escalables y reporting empresarial con Snowflake, SQL, Power BI y Tableau — conectando analítica con ejecución técnica.";

  const ctaPrimary = language === "en" ? "View Resume" : "Ver CV";
  const ctaSecondary = language === "en" ? "Explore Projects" : "Ver Proyectos";

  const cards =
    language === "en"
      ? [
          {
            icon: <Database size={18} />,
            title: "Data Modeling & Warehousing",
            text: "Snowflake + SQL modeling for scalable, reliable analytics layers.",
          },
          {
            icon: <BarChart3 size={18} />,
            title: "Enterprise Reporting",
            text: "Power BI and Tableau dashboards for operational and financial decisions.",
          },
          {
            icon: <Laptop size={18} />,
            title: "Engineering Execution",
            text: "ETL pipelines, APIs (Express/Django), and React/TypeScript delivery.",
          },
          {
            icon: <Cloud size={18} />,
            title: "Cloud & DevOps",
            text: "Docker/Kubernetes fundamentals and GCP experience for deployments.",
          },
        ]
      : [
          {
            icon: <Database size={18} />,
            title: "Modelado & Data Warehousing",
            text: "Modelado Snowflake + SQL para capas analíticas escalables y confiables.",
          },
          {
            icon: <BarChart3 size={18} />,
            title: "Reporting Empresarial",
            text: "Dashboards en Power BI y Tableau para decisiones operativas y financieras.",
          },
          {
            icon: <Laptop size={18} />,
            title: "Ejecución Técnica",
            text: "Pipelines ETL, APIs (Express/Django) y entrega con React/TypeScript.",
          },
          {
            icon: <Cloud size={18} />,
            title: "Cloud & DevOps",
            text: "Fundamentos Docker/Kubernetes y experiencia en GCP para despliegues.",
          },
        ];

  return (
    <Container>
      <div className="mx-auto max-w-6xl pb-16 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm"
        >
          <div className="max-w-3xl">
            <div className="text-3xl font-semibold text-white">{title}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{subtitle}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/resume"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                {ctaPrimary}
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {ctaSecondary}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  {c.icon}
                </span>
                <div className="text-base font-semibold">{c.title}</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
}
