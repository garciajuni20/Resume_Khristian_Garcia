import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  excerptEs: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  tags: string[];
  url?: string;
  featured?: boolean;
}

export default function BlogSection() {
  const { lang } = useLang();

  const blogPosts: BlogPost[] = [
    {
      id: 'snowflake-best-practices',
      title: 'Snowflake Best Practices for Data Modeling',
      excerpt: 'Learn how to optimize your Snowflake data warehouse with proper modeling techniques, performance tuning, and cost optimization strategies.',
      excerptEs: 'Aprende a optimizar tu data warehouse en Snowflake con técnicas de modelado, ajuste de rendimiento y estrategias de optimización de costos.',
      category: 'Data Engineering',
      categoryColor: 'blue',
      readTime: '8 min',
      date: '2024-03-15',
      tags: ['Snowflake', 'Data Modeling', 'Performance', 'SQL'],
      featured: true
    },
    {
      id: 'react-performance',
      title: 'Advanced React Performance Optimization',
      excerpt: 'Comprehensive techniques to improve React application performance including code splitting, memoization, virtualization, and bundle optimization.',
      excerptEs: 'Técnicas completas para mejorar el rendimiento de aplicaciones React incluyendo code splitting, memoization, virtualización y optimización de bundles.',
      category: 'Frontend',
      categoryColor: 'purple',
      readTime: '12 min',
      date: '2024-02-28',
      tags: ['React', 'TypeScript', 'Performance', 'Web Vitals'],
      featured: true
    },
    {
      id: 'bi-dashboard-design',
      title: 'Designing Effective BI Dashboards',
      excerpt: 'Principles and best practices for creating business intelligence dashboards that drive decision-making and improve user adoption across organizations.',
      excerptEs: 'Principios y mejores prácticas para crear dashboards de inteligencia de negocios que impulsen la toma de decisiones y mejoren la adopción de usuarios.',
      category: 'Business Intelligence',
      categoryColor: 'green',
      readTime: '10 min',
      date: '2024-01-20',
      tags: ['Power BI', 'Tableau', 'Data Visualization', 'UX Design'],
      featured: true
    },
    {
      id: 'etl-pipeline-architecture',
      title: 'Modern ETL Pipeline Architecture',
      excerpt: 'Building scalable and maintainable ETL pipelines using modern tools and cloud-native approaches for data processing.',
      excerptEs: 'Construyendo pipelines ETL escalables y mantenibles usando herramientas modernas y enfoques cloud-native para procesamiento de datos.',
      category: 'Data Engineering',
      categoryColor: 'blue',
      readTime: '15 min',
      date: '2023-12-10',
      tags: ['ETL', 'Python', 'Airflow', 'Data Pipeline'],
      featured: false
    },
    {
      id: 'cloud-cost-optimization',
      title: 'Cloud Cost Optimization Strategies',
      excerpt: 'Practical techniques for reducing cloud infrastructure costs while maintaining performance and scalability in data-intensive applications.',
      excerptEs: 'Técnicas prácticas para reducir costos de infraestructura cloud mientras mantienes rendimiento y escalabilidad en aplicaciones intensivas en datos.',
      category: 'Cloud & DevOps',
      categoryColor: 'orange',
      readTime: '11 min',
      date: '2023-11-05',
      tags: ['GCP', 'AWS', 'Cost Optimization', 'Kubernetes'],
      featured: false
    },
    {
      id: 'api-design-patterns',
      title: 'REST API Design Patterns for Data Services',
      excerpt: 'Design patterns and best practices for building scalable and maintainable REST APIs for data-intensive applications.',
      excerptEs: 'Patrones de diseño y mejores prácticas para construir APIs REST escalables y mantenibles para aplicaciones intensivas en datos.',
      category: 'Backend Development',
      categoryColor: 'red',
      readTime: '9 min',
      date: '2023-10-18',
      tags: ['REST API', 'Node.js', 'Express', 'API Design'],
      featured: false
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const t = lang === 'en' ? {
    title: 'Technical Articles & Insights',
    subtitle: 'Sharing knowledge on data engineering, BI, cloud architecture, and full-stack development',
    readArticle: 'Read Article',
    viewAll: 'View All Articles',
    featured: 'Featured',
    latest: 'Latest Articles',
    readTime: 'min read'
  } : {
    title: 'Artículos Técnicos & Insights',
    subtitle: 'Compartiendo conocimiento sobre ingeniería de datos, BI, arquitectura cloud y desarrollo full-stack',
    readArticle: 'Leer Artículo',
    viewAll: 'Ver Todos los Artículos',
    featured: 'Destacados',
    latest: 'Artículos Recientes',
    readTime: 'min lectura'
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h3>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{t.subtitle}</p>
      </div>

      {/* Featured Articles */}
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">{t.featured}</h4>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">3 articles</span>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="absolute right-4 top-4">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(post.categoryColor)}`}>
                  {post.category}
                </span>
              </div>
              
              <div className="mb-4 h-2 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              
              <h4 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h4>

              <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                {lang === 'en' ? post.excerpt : post.excerptEs}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    <Tag className="h-2 w-2" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime} {t.readTime}</span>
                  </div>
                </div>

                <button className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  {t.readArticle}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Other Articles */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">{t.latest}</h4>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">3 articles</span>
        </div>
        
        <div className="space-y-4">
          {otherPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-xl border border-neutral-200 bg-white p-5 hover:border-blue-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getCategoryColor(post.categoryColor)}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {post.date} • {post.readTime} {t.readTime}
                    </span>
                  </div>
                  
                  <h4 className="mb-2 font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h4>
                  
                  <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                    {lang === 'en' ? post.excerpt : post.excerptEs}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="flex items-center gap-1 self-start rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
                  {t.readArticle}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-neutral-800 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white">
              {lang === 'en' ? 'Want to read more?' : '¿Quieres leer más?'}
            </h4>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {lang === 'en' 
                ? 'I regularly write about data engineering, BI, and full-stack development on my blog.'
                : 'Escribo regularmente sobre ingeniería de datos, BI y desarrollo full-stack en mi blog.'}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            {t.viewAll}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}