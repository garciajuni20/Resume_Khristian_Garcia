# Khristian Garcia — Portfolio Profesional

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

Portafolio interactivo bilingüe que muestra mi experiencia en **Análisis de Datos / Business Intelligence** y **Desarrollo Full-Stack**.

🔗 **Sitio en vivo:** [https://garciajuni20.github.io/Resume_Khristian_Garcia/](https://garciajuni20.github.io/Resume_Khristian_Garcia/)

![Preview del Portfolio](https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png)

## ✨ Características

- 🌐 **Interfaz completamente bilingüe** (Inglés/Español) con toggle persistente
- 📱 **Diseño 100% responsivo** - funciona perfecto en móvil, tablet y desktop
- 📄 **CV Interactivo** con:
  - Filtros por etiquetas (chips) para experiencia
  - Barras de habilidades animadas
  - Modal con detalles expandidos por cada rol
  - Descarga de PDF en ambos idiomas
- 🚀 **Página de proyectos** extensible para futuras aplicaciones
- 📞 **Contacto** con enlaces directos (email, LinkedIn, GitHub)
- 🎨 **Diseño moderno** con Tailwind CSS y animaciones de Framer Motion
- ⚡ **Rendimiento optimizado** para GitHub Pages

## 🛠️ Stack Tecnológico

- **Frontend Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router (HashRouter para GitHub Pages)
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📁 Estructura del Proyecto
src/
├── components/ # Componentes reutilizables
│ ├── Container.tsx # Contenedor responsivo
│ ├── Navbar.tsx # Navegación bilingüe
│ ├── Section.tsx # Componente de sección
│ ├── FilterChips.tsx# Filtros interactivos
│ ├── SkillMeter.tsx # Barras de habilidades
│ └── ExperienceCard.tsx # Tarjetas de experiencia
├── context/ # Contextos de React
│ └── LanguageContext.tsx # Manejo de idioma
├── data/ # Datos del portfolio
│ ├── profile-en.ts # Perfil en inglés
│ └── profile-es.ts # Perfil en español
├── pages/ # Páginas principales
│ ├── Home.tsx # Página de inicio
│ ├── Resume.tsx # CV interactivo
│ ├── Projects.tsx # Proyectos destacados
│ └── Contact.tsx # Información de contacto
└── assets/ # Archivos estáticos
└── pdf/ # Currículums en PDF

text

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+ y npm

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/garciajuni20/Resume_Khristian_Garcia.git

# Entrar al directorio
cd Resume_Khristian_Garcia

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
Construcción para producción
bash
# Construir para producción
npm run build

# Vista previa de la build
npm run preview
📦 Despliegue (GitHub Pages)
Este proyecto está configurado para desplegarse automáticamente en GitHub Pages:

Configuración importante:
vite.config.ts incluye:

typescript
base: "/Resume_Khristian_Garcia/"
Router usa HashRouter para evitar errores 404 al refrescar

GitHub Actions está configurado en .github/workflows/deploy.yml

Pasos para desplegar:
Haz commit y push a la rama main

GitHub Actions se ejecuta automáticamente

El sitio se despliega en: https://[usuario].github.io/Resume_Khristian_Garcia/

🎯 Características Técnicas Destacadas
Responsividad
Mobile-first approach

Breakpoints optimizados: sm:, md:, lg:

Grids flexibles que se adaptan a cualquier pantalla

Tipografía escalable

Experiencia de Usuario
Transiciones suaves entre páginas

Animaciones en elementos interactivos

Estados de hover y focus visibles

Carga optimizada de imágenes

Internacionalización
Sistema de traducción sin dependencias externas

Context API para manejo de estado de idioma

Contenido específico por idioma

🔧 Personalización
Para personalizar este portfolio con tu información:

Actualiza los datos en src/data/profile-en.ts y profile-es.ts

Reemplaza la foto en la URL de photoUrl

Actualiza los PDFs en src/assets/pdf/

Modifica los colores en tailwind.config.js si es necesario

📄 Licencia
Este proyecto está bajo la licencia MIT. Ver archivo LICENSE para más detalles.

👤 Autor
Khristian Manolo Junior Garcia Pineda

LinkedIn: linkedin.com/in/khristian-garcia--

GitHub: github.com/garciajuni20

Email: garciajuni20@gmail.com

⭐ Si este proyecto te resulta útil, ¡considera darle una estrella en GitHub!
