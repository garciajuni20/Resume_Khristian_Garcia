import { profileEN } from '../data/profile-en';
import { profileES } from '../data/profile-es';
import { sfx } from '../audio/engine';

/** Builds one of the six CVs in the browser with react-pdf and saves it. Loaded on demand. */
export type PDFVariant = 'creative-en' | 'creative-es' | 'ats-en' | 'ats-es' | 'ats-nophoto-en' | 'ats-nophoto-es';

export async function downloadPDF(
  variant: PDFVariant,
  setLoading: (v: PDFVariant | null) => void,
  setError: (msg: string | null) => void,
) {
  setLoading(variant);
  setError(null);
  try {
    const { pdf } = await import('@react-pdf/renderer');
    const lang = variant.endsWith('en') ? 'en' : 'es';
    const data = lang === 'en' ? profileEN : profileES;
    const isCreative = variant.startsWith('creative');
    const noPhoto = variant.includes('nophoto');
    const fileName = `khristian-garcia-${lang === 'en' ? 'resume' : 'cv'}-${isCreative ? 'creative' : noPhoto ? 'ats-no-photo' : 'ats'}.pdf`;

    let element;
    if (isCreative) {
      const { CVCreative } = await import('../pdf/CVCreative');
      element = <CVCreative data={data} lang={lang} />;
    } else {
      const { CVATS } = await import('../pdf/CVATS');
      element = <CVATS data={data} lang={lang} photo={!noPhoto} />;
    }

    const blob = await pdf(element).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sfx('success');
  } catch (err) {
    console.error('PDF generation error:', err);
    sfx('error');
    setError(err instanceof Error ? err.message : 'PDF generation failed. Please try again.');
  } finally {
    setLoading(null);
  }
}
