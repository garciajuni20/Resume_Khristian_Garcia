import { Lang } from '../types';

export const formatDate = (dateStr: string, lang: Lang): string => {
  if (!dateStr) return '';
  
  if (dateStr.toLowerCase() === 'present' || dateStr.toLowerCase() === 'actual') {
    return lang === 'en' ? 'Present' : 'Actual';
  }
  
  try {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short' 
    };
    
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-GT', options);
  } catch {
    return dateStr;
  }
};

export const getDuration = (start: string, end: string, lang: Lang): string => {
  const startFormatted = formatDate(start, lang);
  const endFormatted = formatDate(end, lang);
  
  return `${startFormatted} – ${endFormatted}`;
};