import type { Lang } from '../types';

/**
 * Copy of the Alleviate case study (/alleviate). Every fact here is already in
 * profile-en/es.ts (experience alleviate-mid / alleviate-de / icon-it); this file
 * only arranges them as a story. The architecture is a schematic: no client data,
 * table names or screenshots.
 */

export interface AlleviateCopy {
  crumb: string;
  title: string;
  lead: string;
  props: { label: string; value: string }[];
  numbers: { before?: string; value: string; label: string }[];
  beforeTitle: string;
  before: string;
  archTitle: string;
  archIntro: string;
  /** Each stage: its tools, and one proof taken from the figures above */
  stages: { name: string; items: string[]; proof: string }[];
  governanceLabel: string;
  governance: string[];
  decisionsTitle: string;
  decisions: { title: string; text: string }[];
  pathTitle: string;
  path: { when: string; role: string; text: string }[];
  note: string;
  ctaTitle: string;
  download: string;
  contact: string;
  other: string;
}

const EN: AlleviateCopy = {
  crumb: 'Projects',
  title: 'Alleviate: from five departments of spreadsheets to one source of truth',
  lead: 'Alleviate Financial Solutions is a US debt consolidation fintech. I joined its account as the first BI hire, built its analytics platform on Snowflake from scratch, and was promoted to run it as its Data Engineer.',
  props: [
    { label: 'Role', value: 'First BI hire (Nov 2023), Data Engineer since Nov 2026' },
    { label: 'Company', value: 'Alleviate Financial Solutions, via Icon Solutions Group' },
    { label: 'Industry', value: 'Fintech, debt consolidation (US)' },
    { label: 'Stack', value: 'Snowflake, dbt, SQL, Azure Data Factory, Databricks, Python, Salesforce, Power BI, Tableau, GitLab' },
  ],
  numbers: [
    { before: '85%', value: '99.5%', label: 'data accuracy' },
    { before: '2+ days', value: '30 min', label: 'financial reporting cycle' },
    { value: '90%', label: 'fewer recurring reporting errors' },
    { value: '70%', label: 'less manual work per cycle' },
    { value: '15+', label: 'dashboards for 5 departments' },
    { value: '20+', label: 'KPIs defined with US stakeholders' },
  ],
  beforeTitle: 'Before',
  before: 'Five departments reported from their own spreadsheets, and their figures were 85% accurate. Closing the financial reports took more than two days of manual Excel work, and the same errors came back every cycle.',
  archTitle: 'How the data moves',
  archIntro: 'From the CRM and the operational databases to the dashboards each department opens, with governance across every step.',
  stages: [
    { name: 'Sources', items: ['Salesforce (CRM)', 'Local and cloud databases', 'External sources and APIs'], proof: 'Replaces the spreadsheets 5 departments reported from' },
    { name: 'Ingestion', items: ['Azure Data Factory', 'Python', 'Databricks'], proof: 'Validation and alerting in the pipelines: 90% fewer recurring errors' },
    { name: 'Warehouse', items: ['Snowflake', 'Dimensional models, star schema', 'Views and stored procedures', 'Native data sharing'], proof: 'One model for every department: accuracy from 85% to 99.5%' },
    { name: 'Transformation', items: ['dbt and SQL (ELT)', 'Validation and alerting'], proof: 'Financial reporting from 2+ days to under 30 minutes' },
    { name: 'Consumption', items: ['Power BI and Tableau', '15+ dashboards', '5 departments'], proof: '15+ dashboards and 20+ KPIs defined with US stakeholders' },
  ],
  governanceLabel: 'Across every step',
  governance: ['Role profiling and access design', 'GitLab version control and CI', 'Standard Operating Procedures', 'Azure DevOps backlog'],
  decisionsTitle: 'Decisions that made the difference',
  decisions: [
    { title: 'One model for every department', text: 'Instead of a report per department, one dimensional model in Snowflake that all five query. That is what took accuracy from 85% to 99.5%.' },
    { title: 'KPIs defined with the people who use them', text: '20+ KPIs agreed directly with finance, operations and strategy stakeholders in the US, then 15+ Power BI and Tableau dashboards built on them.' },
    { title: 'Errors caught in the pipeline, not in the meeting', text: 'Validation and alerting inside the dbt and Azure Data Factory pipelines eliminated 90% of recurring reporting errors.' },
    { title: 'Written down, so it runs without me', text: 'Every process has an SOP and data documentation, and every change goes through GitLab with CI.' },
  ],
  pathTitle: 'From IT support to Data Engineer',
  path: [
    { when: 'Jan 2023', role: 'IT support engineer', text: 'Support for 100+ internal users; the reporting gaps I kept finding became the case for an analytics function.' },
    { when: 'Nov 2023', role: 'First BI hire', text: 'Built the function from scratch: the Snowflake layer, the pipelines and the dashboards.' },
    { when: 'Nov 2026', role: 'Data Engineer', text: 'Promoted to own the platform: Azure and GCP resources, Snowflake administration, Databricks and integrations.' },
  ],
  note: 'The diagram is a schematic drawn for this page. No client data, internal table names or screenshots are shown.',
  ctaTitle: 'Want this on your team?',
  download: 'Download CV (PDF)',
  contact: 'Contact me',
  other: 'Read the Flowber case study',
};

const ES: AlleviateCopy = {
  crumb: 'Proyectos',
  title: 'Alleviate: de cinco departamentos en hojas de cálculo a una sola fuente de verdad',
  lead: 'Alleviate Financial Solutions es una fintech de consolidación de deudas de EE. UU. Entré a su cuenta como la primera contratación de BI, construí desde cero su plataforma analítica en Snowflake y me ascendieron para operarla como su Ingeniero de Datos.',
  props: [
    { label: 'Rol', value: 'Primera contratación de BI (nov 2023), Ingeniero de Datos desde nov 2026' },
    { label: 'Empresa', value: 'Alleviate Financial Solutions, vía Icon Solutions Group' },
    { label: 'Industria', value: 'Fintech, consolidación de deudas (EE. UU.)' },
    { label: 'Tecnologías', value: 'Snowflake, dbt, SQL, Azure Data Factory, Databricks, Python, Salesforce, Power BI, Tableau, GitLab' },
  ],
  numbers: [
    { before: '85%', value: '99.5%', label: 'precisión de datos' },
    { before: '2+ días', value: '30 min', label: 'ciclo de reportes financieros' },
    { value: '90%', label: 'menos errores recurrentes en reportes' },
    { value: '70%', label: 'menos trabajo manual por ciclo' },
    { value: '15+', label: 'dashboards para 5 departamentos' },
    { value: '20+', label: 'KPIs definidos con stakeholders de EE. UU.' },
  ],
  beforeTitle: 'Antes',
  before: 'Cinco departamentos reportaban desde sus propias hojas de cálculo y sus cifras tenían 85% de precisión. Cerrar los reportes financieros tomaba más de dos días de trabajo manual en Excel, y los mismos errores volvían en cada ciclo.',
  archTitle: 'Cómo se mueven los datos',
  archIntro: 'Del CRM y las bases operativas a los dashboards que abre cada departamento, con gobierno en cada paso.',
  stages: [
    { name: 'Fuentes', items: ['Salesforce (CRM)', 'Bases de datos locales y en la nube', 'Fuentes externas y APIs'], proof: 'Reemplaza las hojas de cálculo desde las que reportaban 5 departamentos' },
    { name: 'Ingesta', items: ['Azure Data Factory', 'Python', 'Databricks'], proof: 'Validaciones y alertas en los pipelines: 90% menos errores recurrentes' },
    { name: 'Warehouse', items: ['Snowflake', 'Modelos dimensionales, esquema estrella', 'Vistas y stored procedures', 'Data sharing nativo'], proof: 'Un solo modelo para todos los departamentos: precisión del 85% al 99.5%' },
    { name: 'Transformación', items: ['dbt y SQL (ELT)', 'Validaciones y alertas'], proof: 'Reportes financieros de más de 2 días a menos de 30 minutos' },
    { name: 'Consumo', items: ['Power BI y Tableau', '15+ dashboards', '5 departamentos'], proof: '15+ dashboards y 20+ KPIs definidos con stakeholders de EE. UU.' },
  ],
  governanceLabel: 'En todos los pasos',
  governance: ['Perfilamiento de roles y diseño de accesos', 'Control de versiones y CI en GitLab', 'Procedimientos Operativos Estándar', 'Backlog en Azure DevOps'],
  decisionsTitle: 'Las decisiones que hicieron la diferencia',
  decisions: [
    { title: 'Un solo modelo para todos los departamentos', text: 'En lugar de un reporte por departamento, un modelo dimensional en Snowflake que consultan los cinco. Eso llevó la precisión del 85% al 99.5%.' },
    { title: 'KPIs definidos con quienes los usan', text: '20+ KPIs acordados directamente con stakeholders de finanzas, operaciones y estrategia en EE. UU., y sobre ellos 15+ dashboards en Power BI y Tableau.' },
    { title: 'Errores atrapados en el pipeline, no en la reunión', text: 'Validaciones y alertas dentro de los pipelines de dbt y Azure Data Factory eliminaron el 90% de los errores recurrentes en reportes.' },
    { title: 'Todo por escrito, para que funcione sin mí', text: 'Cada proceso tiene su SOP y documentación de datos, y cada cambio pasa por GitLab con CI.' },
  ],
  pathTitle: 'De soporte TI a Ingeniero de Datos',
  path: [
    { when: 'ene 2023', role: 'Ingeniero de soporte TI', text: 'Soporte para 100+ usuarios internos; las brechas de reporting que encontraba se convirtieron en el caso para crear la función analítica.' },
    { when: 'nov 2023', role: 'Primera contratación de BI', text: 'Construí la función desde cero: la capa en Snowflake, los pipelines y los dashboards.' },
    { when: 'nov 2026', role: 'Ingeniero de Datos', text: 'Ascendido para hacerme cargo de la plataforma: recursos en Azure y GCP, administración de Snowflake, Databricks e integraciones.' },
  ],
  note: 'El diagrama es un esquema dibujado para esta página. No se muestran datos del cliente, nombres de tablas internas ni capturas.',
  ctaTitle: '¿Quieres esto en tu equipo?',
  download: 'Descargar CV (PDF)',
  contact: 'Contactarme',
  other: 'Leer el caso de Flowber',
};

export const ALLEVIATE: Record<Lang, AlleviateCopy> = { en: EN, es: ES };
