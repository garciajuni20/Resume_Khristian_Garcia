import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Lang } from '../types';
import { imageFor, pageUrl as urlOf } from '../data/routes';

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
  image,
  url,
}: SEOProps) => {
  const { pathname } = useLocation();
  // Each route keeps the preview card the static document announced
  const imageUrl = image ?? imageFor(pathname);
  // Canonical is always the clean Cloudflare URL, also from the GitHub Pages mirror
  const pageUrl = url ?? urlOf(pathname);
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
      { property: 'og:image', content: imageUrl },
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
      { name: 'twitter:image', content: imageUrl },
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
  }, [title, description, lang, keywordsContent, imageUrl, pageUrl]);
};
