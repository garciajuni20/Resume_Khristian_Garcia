# Khristian Garcia — Professional Portfolio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![CI/CD](https://img.shields.io/badge/CI/CD-FF6B6B?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

A professional bilingual portfolio showcasing expertise in **Data Analysis / Business Intelligence** and **Full-Stack Development** with modern architecture patterns.

🔗 **Live Site:** [https://resume-khristian-garcia.pages.dev/](https://resume-khristian-garcia.pages.dev/)

![Portfolio Preview](https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png)

## ✨ Features

### 🌐 **Bilingual Interface**
- Complete English/Spanish support with persistent toggle
- SEO optimized meta tags and Open Graph for both languages

### 📱 **Fully Responsive Design**
- Mobile-first approach with optimized breakpoints
- Adaptive layouts for all screen sizes

### 📊 **Interactive Resume**
- Filterable experience with custom tags
- Animated skill meters with proficiency levels
- Expandable modals for detailed role descriptions
- PDF download in both languages
- JSON export functionality for data portability

### 🏗️ **Advanced Components**
- **Skills Dashboard**: Visual representation of technical expertise across domains
- **Architecture Diagrams**: Interactive system architecture visualizations
- **Cloud Stack Display**: Showcasing GCP, Kubernetes, and Docker expertise

### 📬 **Professional Contact System**
- Integrated contact form with validation
- Direct email integration
- Real-time form status feedback
- Professional contact information display

### 🚀 **Projects Showcase**
- Categorized project portfolio
- Technology stack visualization
- Live demo and GitHub repository links
- Featured projects highlight

### 🎨 **Modern Design System**
- Tailwind CSS with custom configurations
- Framer Motion animations for smooth interactions
- Dark/Light theme with system preference detection
- Gradient backgrounds and modern UI components

## 📚 Documentation

| Doc | What it covers |
|---|---|
| [docs/AI-MEDIA.md](docs/AI-MEDIA.md) | Local AI video pipeline (Wan 2.2 on an RTX 3060), ffmpeg encoding, where every clip and image is used |
| [docs/AUDIT-2026-10-10.md](docs/AUDIT-2026-10-10.md) | Latest full audit: build, runtime checks, Lighthouse scores, fixes, known items |
| [docs/linkedin/LINKEDIN.md](docs/linkedin/LINKEDIN.md) | LinkedIn kit: headline, About, experience, Featured, skills, banner and cards |

Scripts: `scripts/encode-ai-media.sh` (web encodes of the AI clips), `scripts/linkedin-assets.py` (LinkedIn images), `scripts/generate-pdfs.tsx` (CV PDFs), `scripts/check-i18n.ts` (EN/ES parity). Shortcuts: `npm run pdf` (build + pagination check + previews), `npm run i18n:check`, `npm run audit` (lint, types, i18n, PDFs, build).

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom plugins
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router (HashRouter for GitHub Pages)

### **Development & Deployment**
- **Bundler**: Vite
- **Language**: TypeScript with strict configuration
- **Linting**: ESLint + TypeScript ESLint
- **Formatting**: Prettier
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Analytics**: Cloudflare Web Analytics (cookieless, enabled in the Pages project)

### **Architecture**
- Layered component structure
- Custom React hooks for reusable logic
- Context API for state management
- Responsive design patterns
- Performance optimized builds

## 📁 Project Structure
```
src/
├── components/              # Reusable UI Components
│   ├── Container.tsx       # Responsive layout container
│   ├── Navbar.tsx          # Bilingual navigation with theme toggle
│   ├── Footer.tsx          # Site footer with links
│   ├── Section.tsx         # Section wrapper component
│   ├── FilterChips.tsx     # Interactive filter chips
│   ├── SkillMeter.tsx      # Animated skill proficiency meters
│   ├── ExperienceCard.tsx  # Experience item cards
│   ├── ContactForm.tsx     # Professional contact form
│   ├── SkillsDashboard.tsx # Technical skills visualization
│   └── ArchitectureDiagram.tsx # System architecture diagrams
│
├── context/                # React Context Providers
│   ├── LanguageContext.tsx # Language management
│   └── ThemeContext.tsx    # Theme management
│
├── hooks/                  # Custom React Hooks
│   ├── useAnalytics.ts     # Analytics tracking
│   ├── useLocalStorage.ts  # Local storage utilities
│   └── useSEO.ts           # SEO management
│
├── pages/                  # Main Application Pages
│   ├── Home.tsx            # Landing page
│   ├── Resume.tsx          # Interactive resume
│   ├── Projects.tsx        # Projects showcase
│   ├── Contact.tsx         # Contact page with form
│   └── NotFound.tsx        # 404 page
│
├── data/                   # Portfolio Content
│   ├── profile-en.ts       # English profile data
│   └── profile-es.ts       # Spanish profile data
│
├── types/                  # TypeScript Type Definitions
│   └── index.ts
│
├── utils/                  # Utility Functions
│   ├── dateFormatter.ts    # Date formatting utilities
│   └── seoUtils.ts         # SEO helper functions
│
└── assets/                 # Static Assets
    └── pdf/                # Resume PDF files
        ├── resume-en.pdf
        └── resume-es.pdf
```
## 🚀 Local Development

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/garciajuni20/Resume_Khristian_Garcia.git

# Navigate to project directory
cd Resume_Khristian_Garcia

# Install dependencies
npm install

# Start development server
npm run dev
Building for Production
bash
# Build the project
npm run build

# Preview the build
npm run preview
```

### 📦 Deployment

**Cloudflare Pages (main site): https://resume-khristian-garcia.pages.dev/**

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` (also pinned in `wrangler.toml`) |
| Environment variable | `NODE_VERSION` = `22` |

Cloudflare sets `CF_PAGES=1` during its build, and that one flag switches the site to its root-host form:

- `base` is `/` (`vite.config.ts`), and the router uses real paths (`/resume`) instead of hash routes (`src/utils/site.ts`). Old links such as `/#/resume?lang=en` are rewritten to `/resume?lang=en` before the app starts.
- The build writes one HTML document per route (`resume.html`, `alleviate.html`…) with its own title, description, canonical and Open Graph tags from `src/data/routes.ts`, plus a sitemap listing every route. LinkedIn and search engines read them without running JavaScript.
- `functions/api/contact.ts` is a Pages Function behind the contact form: validation, a honeypot, same-origin check, optional Turnstile, and delivery through Resend or Formspree. Variables (Settings → Variables and Secrets):
  - `TURNSTILE_SECRET` (secret) + `VITE_TURNSTILE_SITE_KEY` (build variable): turn on Turnstile.
  - `RESEND_API_KEY` (secret) + `CONTACT_TO`: deliver through Resend; otherwise `FORMSPREE_ID` (defaults to the current form).
  - `AUTO_REPLY_FROM` (a sender on a domain verified in Resend): with Resend and Turnstile set, the sender gets a short fixed confirmation (EN/ES) with links to the resume and both case studies. It never echoes what was typed, and stays off without Turnstile so the form cannot be used to mail strangers.
- Analytics: Cloudflare Web Analytics, enabled in the Pages project (Metrics → Web Analytics). No code or cookies.

**GitHub Pages (mirror):** `.github/workflows/deploy.yml` builds with base `/Resume_Khristian_Garcia/` and hash routes. Its canonical tags point to Cloudflare, so search engines index one address. The contact form there posts straight to Formspree.

### 🎯 Technical Highlights
Performance Optimization
Code splitting and lazy loading

Optimized image loading

Minimal bundle size

Efficient state management

User Experience
Smooth page transitions

Interactive elements with hover states

Form validation with real-time feedback

Accessibility considerations

### Internationalization
Context-based language management

Language-specific content

SEO optimization for both languages

RTL-ready design

### Developer Experience
TypeScript with strict type checking

Custom hooks for reusable logic

Consistent code formatting

Comprehensive component documentation

### 🔧 Customization
To customize this portfolio with your information:

Update Profile Data: Edit src/data/profile-en.ts and profile-es.ts

Replace Photo: Update the photoUrl in profile data

Update PDFs: Replace files in src/assets/pdf/

Customize Colors: Modify tailwind.config.js

Add Projects: Extend the projects array in Projects.tsx

Update SEO: Modify meta tags in index.html and page components

### 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

### 👤 Author
Khristian Manolo Junior Garcia Pineda

Data Engineer | AI Implementation Engineer | Full-Stack Developer

Location: Guatemala City, Guatemala

Email: garciajuni20@gmail.com

Phone: +502 5633 8735

LinkedIn: linkedin.com/in/khristian-garcia--

GitHub: github.com/garciajuni20

### 🌟 Support
If you find this project useful, please consider giving it a star on GitHub!

### Technical Expertise Areas
Data Engineering: Snowflake, SQL, PostgreSQL, Data Modeling, ETL

Business Intelligence: Power BI, Tableau, Analytics, Dashboard Design

Cloud & DevOps: GCP, Kubernetes, Docker, CI/CD, Infrastructure as Code

Full-Stack Development: React, TypeScript, Python, REST APIs

Systems Architecture: Microservices, API Design, Scalability, Performance Optimization
