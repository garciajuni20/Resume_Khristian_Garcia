# Khristian Garcia — Portafolio Profesional

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![CI/CD](https://img.shields.io/badge/CI/CD-FF6B6B?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

Portafolio profesional bilingüe que muestra experiencia en **Análisis de Datos / Inteligencia de Negocios** y **Desarrollo Full-Stack** con patrones de arquitectura modernos.

🔗 **Sitio en vivo:** [https://garciajuni20.github.io/Resume_Khristian_Garcia/](https://garciajuni20.github.io/Resume_Khristian_Garcia/)

![Vista previa del Portafolio](https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png)

## ✨ Características

### 🌐 **Interfaz Bilingüe**
- Soporte completo inglés/español con toggle persistente
- Meta tags optimizados para SEO y Open Graph en ambos idiomas

### 📱 **Diseño Completamente Responsivo**
- Enfoque mobile-first con breakpoints optimizados
- Layouts adaptativos para todos los tamaños de pantalla

### 📊 **CV Interactivo**
- Experiencia filtrable con etiquetas personalizadas
- Medidores de habilidades animados con niveles de competencia
- Modales expandibles para descripciones detalladas de roles
- Descarga de PDF en ambos idiomas
- Funcionalidad de exportación JSON para portabilidad de datos

### 🏗️ **Componentes Avanzados**
- **Panel de Habilidades**: Representación visual de experiencia técnica por dominios
- **Diagramas de Arquitectura**: Visualizaciones interactivas de arquitectura de sistemas
- **Display de Stack Cloud**: Mostrando experiencia en GCP, Kubernetes y Docker

### 📬 **Sistema de Contacto Profesional**
- Formulario de contacto integrado con validación
- Integración directa de correo electrónico
- Feedback en tiempo real del estado del formulario
- Display profesional de información de contacto

### 🚀 **Exhibición de Proyectos**
- Portafolio de proyectos categorizados
- Visualización de stack tecnológico
- Enlaces a demostraciones en vivo y repositorios de GitHub
- Destacado de proyectos principales

### 🎨 **Sistema de Diseño Moderno**
- Tailwind CSS con configuraciones personalizadas
- Animaciones Framer Motion para interacciones fluidas
- Tema oscuro/claro con detección de preferencia del sistema
- Fondos degradados y componentes UI modernos

## 🛠️ Stack Tecnológico

### **Frontend**
- **Framework**: React 18 + TypeScript
- **Estilos**: Tailwind CSS con plugins personalizados
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Routing**: React Router (HashRouter para GitHub Pages)

### **Desarrollo & Despliegue**
- **Bundler**: Vite
- **Lenguaje**: TypeScript con configuración estricta
- **Linting**: ESLint + TypeScript ESLint
- **Formato**: Prettier
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Analytics**: Integración con Google Analytics lista

### **Arquitectura**
- Estructura de componentes por capas
- Custom React hooks para lógica reutilizable
- Context API para manejo de estado
- Patrones de diseño responsive
- Builds optimizados para performance

## 📁 Estructura del Proyecto
src/
├── components/ # Componentes UI Reutilizables
│ ├── Container.tsx # Contenedor responsive de layout
│ ├── Navbar.tsx # Navegación bilingüe con toggle de tema
│ ├── Footer.tsx # Footer del sitio con enlaces
│ ├── Section.tsx # Componente wrapper de secciones
│ ├── FilterChips.tsx # Chips de filtro interactivos
│ ├── SkillMeter.tsx # Medidores de habilidad animados
│ ├── ExperienceCard.tsx # Tarjetas de items de experiencia
│ ├── ContactForm.tsx # Formulario de contacto profesional
│ ├── SkillsDashboard.tsx # Visualización de habilidades técnicas
│ └── ArchitectureDiagram.tsx # Diagramas de arquitectura de sistemas
├── context/ # Providers de React Context
│ ├── LanguageContext.tsx # Manejo de idioma
│ └── ThemeContext.tsx # Manejo de tema
├── hooks/ # Custom React Hooks
│ ├── useAnalytics.ts # Seguimiento de analytics
│ ├── useLocalStorage.ts # Utilidades de almacenamiento local
│ └── useSEO.ts # Manejo de SEO
├── pages/ # Páginas Principales de la Aplicación
│ ├── Home.tsx # Página de inicio
│ ├── Resume.tsx # CV interactivo
│ ├── Projects.tsx # Exhibición de proyectos
│ ├── Contact.tsx # Página de contacto con formulario
│ └── NotFound.tsx # Página 404
├── data/ # Contenido del Portafolio
│ ├── profile-en.ts # Datos del perfil en inglés
│ └── profile-es.ts # Datos del perfil en español
├── types/ # Definiciones de Tipos TypeScript
│ └── index.ts
├── utils/ # Funciones de Utilidad
│ ├── dateFormatter.ts # Utilidades de formato de fechas
│ └── seoUtils.ts # Funciones helper de SEO
└── assets/ # Assets Estáticos
└── pdf/ # Archivos PDF de CV

text

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+ y npm/yarn/pnpm

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/garciajuni20/Resume_Khristian_Garcia.git

# Navegar al directorio del proyecto
cd Resume_Khristian_Garcia

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
Construcción para Producción
bash
# Construir el proyecto
npm run build

# Previsualizar la build
npm run preview
📦 Despliegue (GitHub Pages)
Este proyecto está configurado para despliegue automático en GitHub Pages:

Configuraciones Destacadas
vite.config.ts incluye: base: "/Resume_Khristian_Garcia/"

Usa HashRouter para prevenir errores 404 al refrescar

Workflow de GitHub Actions en .github/workflows/deploy.yml

Pasos de Despliegue
Haz commit y push a la rama main

GitHub Actions ejecuta automáticamente el workflow de despliegue

El sitio se despliega en: https://[usuario].github.io/Resume_Khristian_Garcia/

🎯 Aspectos Técnicos Destacados
Optimización de Performance
Code splitting y lazy loading

Carga optimizada de imágenes

Tamaño mínimo de bundle

Manejo eficiente de estado

Experiencia de Usuario
Transiciones suaves entre páginas

Elementos interactivos con estados hover

Validación de formularios con feedback en tiempo real

Consideraciones de accesibilidad

Internacionalización
Manejo de idioma basado en contextos

Contenido específico por idioma

Optimización SEO para ambos idiomas

Diseño listo para RTL

Experiencia de Desarrollo
TypeScript con chequeo estricto de tipos

Custom hooks para lógica reutilizable

Formato de código consistente

Documentación comprehensiva de componentes

🔧 Personalización
Para personalizar este portafolio con tu información:

Actualizar Datos del Perfil: Edita src/data/profile-en.ts y profile-es.ts

Reemplazar Foto: Actualiza photoUrl en los datos del perfil

Actualizar PDFs: Reemplaza archivos en src/assets/pdf/

Personalizar Colores: Modifica tailwind.config.js

Agregar Proyectos: Extiende el array de proyectos en Projects.tsx

Actualizar SEO: Modifica meta tags en index.html y componentes de página

📄 Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

👤 Autor
Khristian Manolo Junior Garcia Pineda

Analista de Datos | Analista de Inteligencia de Negocios | Desarrollador Full-Stack

Ubicación: Ciudad de Guatemala, Guatemala

Correo: garciajuni20@gmail.com

Teléfono: +502 5633 8735

LinkedIn: linkedin.com/in/khristian-garcia--

GitHub: github.com/garciajuni20

🌟 Soporte
Si este proyecto te resulta útil, ¡considera darle una estrella en GitHub!

Áreas de Experiencia Técnica
Ingeniería de Datos: Snowflake, SQL, PostgreSQL, Modelado de Datos, ETL

Inteligencia de Negocios: Power BI, Tableau, Analytics, Diseño de Dashboards

Cloud & DevOps: GCP, Kubernetes, Docker, CI/CD, Infrastructure as Code

Desarrollo Full-Stack: React, TypeScript, Python, REST APIs

Arquitectura de Sistemas: Microservicios, Diseño de APIs, Escalabilidad, Optimización de Performance