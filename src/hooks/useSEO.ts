import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Lang } from '../types';

const SITE_URL = 'https://garciajuni20.github.io/Resume_Khristian_Garcia/';

interface SEOProps {
  title: string;
  description: string;
  lang?: Lang;
  keywords?: string[];
  image?: string;
  url?: string;
}

export const useSEO = ({
  title,
  description,
  lang = 'en',
  keywords = [],
  image = 'https://raw.githubusercontent.com/garciajuni20/Resume_Khristian_Garcia/main/khristian-garcia.png',
  url,
}: SEOProps) => {
  const { pathname } = useLocation();
  // HashRouter: each page lives under /#/<path>, so og:url/canonical must include it
  const pageUrl = url ?? (pathname === '/' ? SITE_URL : `${SITE_URL}#${pathname}`);
  const keywordsContent = keywords.join(', ');

  useEffect(() => {
    // Título del documento
    document.title = `${title} | Khristian Garcia`;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords && keywordsContent) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (metaKeywords && keywordsContent) {
      metaKeywords.setAttribute('content', keywordsContent);
    }

    // Open Graph
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: lang === 'es' ? 'es_GT' : 'en_US' },
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Twitter Cards
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Idioma
    document.documentElement.lang = lang;

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', pageUrl);
  }, [title, description, lang, keywordsContent, image, pageUrl]);
};
