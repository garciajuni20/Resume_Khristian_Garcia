import { useEffect } from 'react';
import { Lang } from '../types';

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
  url = 'https://garciajuni20.github.io/Resume_Khristian_Garcia/'
}: SEOProps) => {
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
    if (!metaKeywords && keywords.length > 0) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (metaKeywords && keywords.length > 0) {
      metaKeywords.setAttribute('content', keywords.join(', '));
    }
    
    // Open Graph
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: lang === 'es' ? 'es_GT' : 'en_US' }
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
      { name: 'twitter:image', content: image }
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
    linkCanonical.setAttribute('href', url);
    
  }, [title, description, lang, keywords, image, url]);
};