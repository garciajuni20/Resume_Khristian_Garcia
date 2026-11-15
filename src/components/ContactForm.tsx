import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { sfx } from '../audio/engine';
import { CLEAN_URLS } from '../utils/site';
import Turnstile, { TURNSTILE_SITE_KEY } from './Turnstile';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* Form fields share one template; only the validity state varies */
const INPUT = 'n-text w-full rounded-lg border bg-n-bg px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2';
const INPUT_OK = 'border-n-border focus:ring-n-accent';
const INPUT_ERROR = 'border-red-300 focus:ring-red-500 dark:border-red-700';

export default function ContactForm() {
  const { lang } = useLang();
  const { trackEvent } = useAnalytics();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  // Bot checks: a field people never see, and Turnstile where a key is set
  const [honeypot, setHoneypot] = useState('');
  const [token, setToken] = useState('');
  const [sent, setSent] = useState(0);

  const t = lang === 'en' ? {
    title: 'Send me a message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending',
    success: 'Message sent. I will reply within 24 hours.',
    error: 'The message did not go through. Try again, or write to me by email.',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    placeholderName: 'Your name',
    placeholderEmail: 'your.email@example.com',
    placeholderSubject: 'Data Engineer role at …',
    placeholderMessage: 'The role, the team and the stack'
  } : {
    title: 'Envíame un mensaje',
    name: 'Nombre',
    email: 'Correo',
    subject: 'Asunto',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando',
    success: 'Mensaje enviado. Te respondo en menos de 24 horas.',
    error: 'El mensaje no se envió. Intenta de nuevo o escríbeme por correo.',
    required: 'Este campo es requerido',
    invalidEmail: 'Por favor ingresa un correo válido',
    placeholderName: 'Tu nombre',
    placeholderEmail: 'tu.correo@ejemplo.com',
    placeholderSubject: 'Rol de Ingeniero de Datos en …',
    placeholderMessage: 'El rol, el equipo y el stack'
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!formData.subject.trim()) newErrors.subject = t.required;
    if (!formData.message.trim()) newErrors.message = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      sfx('error');
      return;
    }
    
    setStatus('loading');
    
    try {
      // Cloudflare: our own Pages Function (functions/api/contact.ts) validates,
      // checks Turnstile and delivers. The GitHub Pages mirror has no backend.
      const response = await fetch(CLEAN_URLS ? '/api/contact' : 'https://formspree.io/f/meezgvoq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          company: honeypot,
          turnstile: token,
        }),
      });
      setSent(n => n + 1);
      
      if (response.ok) {
        setStatus('success');
        sfx('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        trackEvent('contact_form_submit', { status: 'success' });
        
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      sfx('error');
      trackEvent('contact_form_submit', { status: 'error' });
      
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="font-display text-3xl n-text">{t.title}</h2>
        <p className="mt-1 text-sm n-muted">
          {lang === 'en' 
            ? 'I\'ll respond within 24 hours' 
            : 'Responderé en menos de 24 horas'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot: hidden from people and screen readers, bots fill it in */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium n-text mb-1">
              {t.name} *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t.placeholderName}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`${INPUT} ${
                errors.name ? INPUT_ERROR : INPUT_OK}`}
              disabled={status === 'loading'}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium n-text mb-1">
              {t.email} *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t.placeholderEmail}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${INPUT} ${
                errors.email ? INPUT_ERROR : INPUT_OK}`}
              disabled={status === 'loading'}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium n-text mb-1">
            {t.subject} *
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder={t.placeholderSubject}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`${INPUT} ${
              errors.subject ? INPUT_ERROR : INPUT_OK}`}
            disabled={status === 'loading'}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium n-text mb-1">
            {t.message} *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder={t.placeholderMessage}
            rows={4}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${INPUT} resize-none ${
              errors.message ? INPUT_ERROR : INPUT_OK}`}
            disabled={status === 'loading'}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>
          )}
        </div>

        <Turnstile lang={lang} onToken={setToken} resetKey={sent} />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs n-muted">
            * {lang === 'en' ? 'Required fields' : 'Campos requeridos'}
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || (Boolean(TURNSTILE_SITE_KEY) && CLEAN_URLS && !token)}
            className="n-btn-primary gap-2 px-6 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-n-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            {status === 'loading' ? t.sending : t.send}
          </button>
        </div>

        {/* The outcome is announced to screen readers, not hidden inside the button */}
        <p role="status" aria-live="polite" className="min-h-5 text-sm">
          {status === 'success' && (
            <span className="inline-flex items-center gap-2 n-text"><CheckCircle className="h-4 w-4 text-ink-green" aria-hidden="true" />{t.success}</span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-center gap-2 text-red-700 dark:text-red-400"><AlertCircle className="h-4 w-4" aria-hidden="true" />{t.error}</span>
          )}
        </p>
      </form>
    </motion.div>
  );
}
