import { useMemo, useState } from "react";
import { Download, Mail, MapPin, Link as LinkIcon, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../components/Container";
import Section from "../components/Section";
import FilterChips from "../components/FilterChips";
import SkillMeter from "../components/SkillMeter";
import ExperienceCard from "../components/ExperienceCard";

import { profileEn } from "../data/profile-en";
import { profileEs } from "../data/profile-es";
import { useLanguage } from "../context/LanguageContext";
import useSEO from "../hooks/useSEO";
import useAnalytics from "../hooks/useAnalytics";
import { formatMonthYearRange } from "../utils/dateFormatter";
import type { SkillItem } from "../types";

type Chip = "All" | "Data & BI" | "Engineering" | "Cloud & DevOps" | "Professional";

function normalizeGroup(group: string): Chip {
  const g = group.toLowerCase();
  if (g.includes("data") || g.includes("bi") || g.includes("datos")) return "Data & BI";
  if (g.includes("engine") || g.includes("ingen")) return "Engineering";
  if (g.includes("cloud") || g.includes("devops")) return "Cloud & DevOps";
  return "Professional";
}

function getChipLabel(lang: "en" | "es", chip: Chip): string {
  if (lang === "en") return chip;
  // Spanish labels for the UI
  switch (chip) {
    case "All":
      return "Todo";
    case "Data & BI":
      return "Datos & BI";
    case "Engineering":
      return "Ingeniería";
    case "Cloud & DevOps":
      return "Cloud & DevOps";
    case "Professional":
      return "Profesional";
    default:
      return chip;
  }
}

export default function Resume() {
  const { language } = useLanguage();
  const profile = language === "en" ? profileEn : profileEs;

  useSEO({
    title: language === "en" ? "Resume | Khristian Garcia" : "CV | Khristian García",
    description:
      language === "en"
        ? "Interactive resume with experience, skills, and projects."
        : "CV interactivo con experiencia, habilidades y proyectos.",
  });

  useAnalytics("resume");

  const chips: Chip[] = ["All", "Data & BI", "Engineering", "Cloud & DevOps", "Professional"];
  const [selected, setSelected] = useState<Chip>("All");

  const flatSkills = useMemo(() => {
    const list: Array<SkillItem & { group: Chip }> = [];
    for (const sg of profile.skills) {
      const group = normalizeGroup(sg.group);
      for (const item of sg.items) list.push({ ...item, group });
    }
    return list;
  }, [profile.skills]);

  const filteredSkills = useMemo(() => {
    if (selected === "All") return flatSkills;
    return flatSkills.filter((s) => s.group === selected);
  }, [flatSkills, selected]);

  const summaryTitle = language === "en" ? "Summary" : "Resumen";
  const highlightsTitle = language === "en" ? "Core Highlights" : "Puntos clave";
  const experienceTitle = language === "en" ? "Experience" : "Experiencia";
  const skillsTitle = language === "en" ? "Skills" : "Habilidades";

  const downloadLabel = language === "en" ? "Download PDF" : "Descargar PDF";

  return (
    <Container>
      <div className="mx-auto max-w-5xl pb-16 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="text-2xl font-semibold text-white">{profile.name}</div>
              <div className="text-white/80">{profile.role}</div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {profile.location}
                </span>

                <a
                  className="inline-flex items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                  href={`mailto:${profile.email}`}
                >
                  <Mail size={16} />
                  {profile.email}
                </a>

                <a
                  className="inline-flex items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon size={16} />
                  Portfolio
                </a>

                <a
                  className="inline-flex items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>

                <a
                  className="inline-flex items-center gap-2 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </div>

            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              <Download size={16} />
              {downloadLabel}
            </a>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title={summaryTitle}>
            <p className="text-sm leading-relaxed text-white/80">{profile.summary}</p>
          </Section>

          <Section title={highlightsTitle}>
            <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
              {profile.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="mt-8">
          <Section title={experienceTitle}>
            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <ExperienceCard
                  key={`${exp.company}-${exp.title}-${idx}`}
                  company={exp.company}
                  title={exp.title}
                  start={exp.start}
                  end={exp.end}
                  location={exp.location}
                  bullets={exp.bullets}
                  tech={exp.tech}
                />
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-8">
          <Section title={skillsTitle}>
            <div className="mb-4">
              <FilterChips
                selected={getChipLabel(language, selected)}
                options={chips.map((c) => getChipLabel(language, c))}
                onSelect={(label) => {
                  const found = chips.find((c) => getChipLabel(language, c) === label);
                  setSelected(found ?? "All");
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredSkills.map((s) => (
                <SkillMeter key={`${s.group}-${s.name}`} name={s.name} level={s.level ?? 3} />
              ))}
            </div>

            <div className="mt-6 text-xs text-white/50">
              {language === "en"
                ? `Last updated: ${formatMonthYearRange("2026-01-01", undefined).split("–")[0].trim()}`
                : `Última actualización: ${formatMonthYearRange("2026-01-01", undefined).split("–")[0].trim()}`}
            </div>
          </Section>
        </div>
      </div>
    </Container>
  );
}
