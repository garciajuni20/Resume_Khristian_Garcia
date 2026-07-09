# Khristian Garcia — Professional Portfolio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![CI/CD](https://img.shields.io/badge/CI/CD-FF6B6B?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

A professional bilingual portfolio showcasing expertise in **Data Analysis / Business Intelligence** and **Full-Stack Development** with modern architecture patterns.

🔗 **Live Site:** [https://garciajuni20.github.io/Resume_Khristian_Garcia/](https://garciajuni20.github.io/Resume_Khristian_Garcia/)

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
- **Analytics**: Google Analytics integration ready

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

### 📦 Deployment (GitHub Pages)
This project is configured for automatic deployment to GitHub Pages:

### Configuration Highlights
vite.config.ts includes: base: "/Resume_Khristian_Garcia/"

Uses HashRouter to prevent 404 errors on refresh

GitHub Actions workflow in .github/workflows/deploy.yml

### Deployment Steps
Commit and push to the main branch

GitHub Actions automatically runs the deployment workflow

The site deploys to: https://[username].github.io/Resume_Khristian_Garcia/

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

### 📈 Enabling Google Analytics (GA4)
Analytics hooks (`useAnalytics`, event tracking on downloads/filters/theme/language) are already wired but dormant. To activate:

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) and copy your Measurement ID (`G-XXXXXXXXXX`).
2. In `index.html`, uncomment the Google Analytics snippet and replace `G-XXXXXXXXXX` with your real ID.
3. Deploy — all existing `trackEvent` calls start reporting automatically.

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

Data Analyst | Business Intelligence Analyst | Full-Stack Developer

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
