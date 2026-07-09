import { Lang } from '../types';

export const useAnalytics = () => {
  const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
    window.gtag?.('event', eventName, data);

    // Log para desarrollo
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${eventName}`, data);
    }
  };

  const trackPageView = (pagePath: string) => {
    trackEvent('page_view', { page_path: pagePath });
  };

  const trackLanguageSwitch = (lang: Lang) => {
    trackEvent('language_switch', { language: lang });
  };

  const trackThemeSwitch = (theme: 'light' | 'dark') => {
    trackEvent('theme_switch', { theme });
  };

  const trackDownload = (fileName: string) => {
    trackEvent('download', { file_name: fileName });
  };

  return {
    trackEvent,
    trackPageView,
    trackLanguageSwitch,
    trackThemeSwitch,
    trackDownload
  };
};