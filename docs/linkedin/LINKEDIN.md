# LinkedIn kit: Khristian Garcia

Ready-to-paste copy and images for <https://www.linkedin.com/in/khristian-garcia--/>.
Everything here comes from `src/data/profile-en.ts` / `profile-es.ts` (the same source as the site and the CVs), so the numbers match everywhere. Regenerate the images with `python scripts/linkedin-assets.py`.

**Strategy:** primary profile in **English** (remote roles from US/EU/LATAM recruiters), plus a **secondary profile in Spanish** (LinkedIn → *Add profile in another language*). Lead with **Data Engineer**; Full-Stack, AI and Solutions Architect act as differentiators, not as the headline.

---

## 1. Images

| File | Where | Size |
|---|---|---|
| `linkedin-banner.jpg` | Profile background photo | 1584 × 396 |
| `featured-flowber.jpg` | Featured → Link → Flowber case study (thumbnail) | 1200 × 627 |
| `featured-portfolio.jpg` | Featured → Link → portfolio (thumbnail) | 1200 × 630 |

- The banner puts the copy on the right because the profile photo covers the lower-left corner.
- Profile photo: use `public/me/khristian-square.jpg` (the same photo as the site and the CV, so recruiters recognize you across channels).
- Turn on **Open to work → Recruiters only** (not the green public frame) with: Data Engineer, Analytics Engineer, BI Engineer, Data Analyst; Remote; Full-time + Contract.

## 2. Headline (≤ 220 characters)

**EN (recommended):**
> Data Engineer · AI Implementation Engineer · Snowflake, dbt, Databricks, Azure Data Factory · US fintech + US wellness brand · Built an AI + RAG platform end to end · Remote from Guatemala · EN/ES

**ES:**
> Ingeniero de Datos · Ingeniero de Implementación de IA · Snowflake, dbt, Databricks, Azure Data Factory · Fintech y marca de bienestar de EE. UU. · Construí una plataforma con IA y RAG de punta a punta · Remoto desde Guatemala · EN/ES

Site links for recruiters: append `?lang=en` (or `?lang=es`) to the portfolio URL so it always opens in that language, e.g. `https://garciajuni20.github.io/Resume_Khristian_Garcia/?lang=en#/resume`.

Why: the first ~60 characters show up in search results and comments, so the role and the stack recruiters filter on go first.

## 3. About (≤ 2,600 characters)

**EN:**

> I build data platforms people can trust, and the software around them.
>
> For the last three years I've been the engineer behind the analytics platform at Alleviate Financial Solutions, a US debt-consolidation fintech, working remotely from Guatemala. I was the first BI hire on the account, built the function from zero, and was promoted to Data Engineer in November 2026:
> • Snowflake as the single source of truth for 5 departments: dimensional models, role profiling, query and stored-procedure optimization, native data sharing.
> • dbt and SQL ELT pipelines, Azure Data Factory orchestration across Azure and GCP, Databricks, and Salesforce → Snowflake integrations.
> • Data accuracy from 85% to 99.5%. Financial reporting from 2+ days to under 30 minutes. 15+ Power BI / Tableau dashboards and 20+ KPIs defined with US stakeholders.
>
> On the side, I took Flowber, a real barbershop in Guatemala, from a paper appointment book to production as the sole engineer (Jan 2024 → today):
> • React + TypeScript on Supabase/PostgreSQL with role-based Row-Level Security, no custom backend, $0 infrastructure.
> • An AI agent (Llama 4 Scout on Cloudflare Workers AI) with 20 role-filtered tools and RAG on pgvector, 100% hit@1 on its evaluation set.
> • A medallion warehouse (dbt + DuckDB, 24 models, 50 tests) with cancellation-risk and demand-forecast models.
> • 160+ appointments and 90+ customers on the platform.
>
> Since November 2026 I also work part-time as an AI Implementation Engineer through Virtrify: CRM, n8n automations, and a content system for a US wellness and retreat brand, documented so a solo founder can run it.
>
> Before data, I spent four years in a 24/7 global NOC for international remittances (IDT), which is where I learned incident response, SOPs, and how much a wrong number costs.
>
> Systems Engineering at USAC completed in 2026 (pensum closed, private exam passed); master's degree starting February 2027. I also taught Organizational Systems (BI, ERP/CRM) there as my final practicum.
>
> Open to remote Data Engineer / Analytics Engineer roles. English and Spanish.
> Portfolio and case study: garciajuni20.github.io/Resume_Khristian_Garcia

**ES:**

> Construyo plataformas de datos en las que se puede confiar, y el software que las rodea.
>
> Los últimos tres años he sido el ingeniero detrás de la plataforma analítica de Alleviate Financial Solutions, una fintech de consolidación de deudas en EE. UU., trabajando remoto desde Guatemala. Fui la primera contratación de BI de la cuenta, construí el área desde cero y en noviembre de 2026 fui promovido a Ingeniero de Datos:
> • Snowflake como fuente única de verdad para 5 departamentos: modelos dimensionales, perfiles de roles, optimización de consultas y procedimientos almacenados, data sharing nativo.
> • Pipelines ELT con dbt y SQL, orquestación en Azure Data Factory sobre Azure y GCP, Databricks e integraciones Salesforce → Snowflake.
> • Precisión de datos de 85% a 99.5%. Reportes financieros de más de 2 días a menos de 30 minutos. Más de 15 dashboards en Power BI / Tableau y más de 20 KPIs definidos con stakeholders de EE. UU.
>
> En paralelo llevé Flowber, una barbería real en Guatemala, de un cuaderno de citas a producción como único ingeniero (ene 2024 → hoy):
> • React + TypeScript sobre Supabase/PostgreSQL con Row-Level Security por rol, sin backend propio y con $0 de infraestructura.
> • Un agente de IA (Llama 4 Scout en Cloudflare Workers AI) con 20 herramientas filtradas por rol y RAG sobre pgvector: 100% hit@1 en su set de evaluación.
> • Un warehouse medallion (dbt + DuckDB, 24 modelos, 50 tests) con modelos de riesgo de cancelación y pronóstico de demanda.
> • Más de 160 citas y 90 clientes en la plataforma.
>
> Desde noviembre de 2026 también trabajo medio tiempo como AI Implementation Engineer a través de Virtrify: CRM, automatizaciones en n8n y un sistema de contenido para una marca de bienestar y retiros en EE. UU., documentado para que una fundadora lo opere sola.
>
> Antes de datos pasé cuatro años en un NOC global 24/7 de remesas internacionales (IDT): ahí aprendí respuesta a incidentes, SOPs y cuánto cuesta un número equivocado.
>
> Ingeniería en Ciencias y Sistemas en la USAC completada en 2026 (pensum cerrado y examen privado aprobado); maestría a partir de febrero de 2027. Además fui instructor de Sistemas Organizacionales (BI, ERP/CRM) como práctica final.
>
> Disponible para roles remotos de Data Engineer / Analytics Engineer. Inglés y español.
> Portafolio y caso de estudio: garciajuni20.github.io/Resume_Khristian_Garcia

## 4. Experience

Show the Alleviate progression as **three positions under the same company** (LinkedIn groups them and displays the promotion). Dates come from the CV.

### Data Engineer
Icon Solutions Group S.A / Alleviate Financial Solutions · Full-time · Nov 2026 – Present · Remote

> Promoted to Data Engineer on 1 Nov 2026 after building the account's analytics platform from zero. Own the data platform end to end:
> • Azure and Google Cloud resources: Azure Data Factory pipelines and orchestration, dockerized apps, resource scaling.
> • Snowflake: role profiling, database/stored-procedure/query optimization, native data sharing, database modeling.
> • Databricks implementation and management; data flows and ETL/ELT pipelines (dbt, SQL, Python).
> • CRM (Salesforce) and external-source integration into local and cloud databases; POST API consumption and REST API design, deployment, and scaling.
> • Python, SQL, and Selenium automation (lead-generation automations included); predictive and data-analysis consulting; SOPs; GitLab environment.
>
> Skills: Snowflake · dbt · Databricks · Azure Data Factory · GCP · Python · SQL · REST APIs · GitLab

### AI Implementation Engineer (Part-time)
Virtrify · Contract · Nov 2026 – Present · Remote (US client)

> Part-time (~20 h/week, from 23 Nov 2026) build-out of the AI-augmented operating system for a US wellness and retreat brand run by a solo founder: lean CRM (GoHighLevel/HubSpot or equivalent), lead capture and nurture, retreat enrollment pipeline (inquiry → deposit → payment → pre-retreat sequence), post-retreat follow-up, scheduling, and a centralized podcast/YouTube/social content system. Automations on n8n/Make/Zapier integrated with ad platforms, Stripe, and scheduling tools; every workflow tested against real scenarios and documented in plain language so the founder runs it without me.
>
> Skills: n8n · CRM · Workflow Automation · LLM tooling · Stripe · Documentation

### Business Intelligence Analyst / Data Analyst (Data & Analytics Engineering)
Icon Solutions Group S.A / Alleviate Financial Solutions · Full-time · Dec 2024 – Oct 2026 · Remote

> Data engineering and analytics for a US debt-consolidation fintech, working directly with finance, operations, and strategy stakeholders.
> • Architect the Snowflake analytical layer (dimensional models, views, stored procedures) used by 5 departments as the single source of truth; data accuracy from 85% to 99.5%.
> • Snowflake platform work: role profiling and access design, query and stored-procedure optimization, native data sharing.
> • ELT pipelines with dbt and SQL; Databricks implementation and management; Azure Data Factory orchestration across Azure and GCP; dockerized apps and resource scaling.
> • Salesforce/CRM and external sources integrated into Snowflake; REST APIs designed, deployed, and scaled.
> • Python, SQL, and Selenium automations, including some that boosted lead generation; validation and alerting that removed 90% of recurring reporting errors.
> • 15+ Power BI / Tableau dashboards, 20+ KPIs; financial reporting from 2+ days to under 30 minutes. SOPs and data documentation.
>
> Skills: Snowflake · dbt · Databricks · Azure Data Factory · SQL · Python · Power BI

### Junior Business Intelligence Analyst
Icon Solutions Group S.A / Alleviate Financial Solutions · Nov 2023 – Dec 2024 · Remote

> First BI analyst in Guatemala for the Alleviate Financial Solutions account. Built the BI function from zero: initial structure, base processes, SQL queries, and reporting solutions, in collaboration with US-based teams.

### IT Support Engineer / Systems Administrator
Icon Solutions Group S.A / Alleviate Financial Solutions · Jan 2023 – Nov 2023

> Enterprise IT support and systems administration for 100+ users; on-premise to cloud migration; scripted support workflows that cut ticket volume by 40%. The reporting gaps I kept finding here became the business case for the BI function.

### Founder-engineer · Full-Stack, Solutions Architect, Data & AI (Flowber)
Flowber (independent venture) · Self-employed · Jan 2024 – Present · Guatemala

> Digital transformation of Danover's barbershop, from idea to production, as the sole engineer.
> • Serverless architecture: React + TypeScript on Cloudflare Pages, Supabase/PostgreSQL with role-based RLS on every table, 13 Edge Functions, GiST EXCLUDE against double booking. $0 infrastructure.
> • AI agent on Workers AI (Llama 4 Scout) with 20 role-filtered tools, confirmed writes, and provider fallback.
> • RAG with pgvector (HNSW) and bge-m3 embeddings that honors each role's RLS; golden-set evaluation at 100% hit@1.
> • Medallion warehouse: Postgres → Parquet → dbt + DuckDB, star schema, 24 models, 50 tests, nightly on GitHub Actions; cancellation-risk and demand-forecast models.
> • 160+ appointments and 90+ registered customers. Mobile LCP from 4.8 s to 2.5 s.
>
> Case study: garciajuni20.github.io/Resume_Khristian_Garcia/#/flowber

### Academic Instructor, Organizational Systems (Final Practicum)
Universidad de San Carlos de Guatemala · Aug 2025 – Aug 2026

> Taught Sistemas Organizacionales y Gerenciales 1 (course 0786): business analytics, information systems, ERP/CRM, and digital transformation, with hands-on BI labs.

### GNOC Support Engineer / NOC Analyst
Red Chapina S.A (IDT Guatemala) · Jan 2019 – Jan 2023

> 24/7 monitoring of global remittance infrastructure (5,000+ concurrent users) with Splunk, New Relic, Grafana, and Zabbix. Incident bridge calls and post-mortems; MTTR down 25%; SOPs for recurring alert classes; mentored 3 junior engineers.

## 5. Featured (in this order)

1. **Flowber case study** → `…/Resume_Khristian_Garcia/#/flowber`, thumbnail `featured-flowber.jpg`. Title: *Flowber: a barbershop from a notebook to the cloud*.
2. **Interactive portfolio + CV** → `…/Resume_Khristian_Garcia/`, thumbnail `featured-portfolio.jpg`.
3. **Flowber live** → `https://flowber-barberia.pages.dev/`.
4. **CV (PDF)**: upload the ATS CV in English from the Resume page.

## 6. Skills (pin the top 3)

Pinned: **Data Engineering · Snowflake · dbt**.
Then: SQL, Python, Databricks, Azure Data Factory, ETL/ELT, Data Modeling, Data Warehousing, Power BI, Tableau, PostgreSQL, BigQuery, Microsoft Azure, Google Cloud Platform, Docker, REST APIs, Salesforce, Data Governance, Retrieval-Augmented Generation (RAG), Large Language Models, React, TypeScript, Supabase, Agile, Stakeholder Management.

Do **not** list Airflow, Great Expectations, or Redshift: they are not in the profile.

## 7. Launch post (publish after updating the profile)

> Since January 2024 I've been building something outside my day job: Flowber, a booking, operations, and analytics platform for a real barbershop in Guatemala.
>
> It started as a paper appointment book. Today it runs on:
> → PostgreSQL with Row-Level Security deciding what every role can see (no custom backend)
> → An AI agent with 20 tools and RAG on pgvector that answers with live data, never invented numbers
> → A dbt + DuckDB warehouse with 50 data tests and models that predict cancellations and demand
>
> 160+ appointments later, the biggest lesson is the same one I apply as a data engineer in fintech: understand the business first, then make the data trustworthy.
>
> I wrote the whole story, decisions included: [link to the case study]
>
> #DataEngineering #AnalyticsEngineering #dbt #Snowflake #RAG

## 8. Checklist

- [ ] Banner, photo, headline, About (EN) updated
- [ ] Spanish secondary profile added
- [ ] Alleviate split into three positions (Data Engineer promotion visible)
- [ ] Virtrify part-time role added (Contract)
- [ ] Education updated: pensum closed + private exam passed (2026); add the master's once enrolled (Feb 2027)
- [ ] Flowber added as a position (Self-employed)
- [ ] Featured: 4 items in the order above
- [ ] Top 3 skills pinned
- [ ] Open to work (recruiters only) configured
- [ ] Custom URL kept: `linkedin.com/in/khristian-garcia--`
- [ ] Launch post published, case study link in the first comment as well
