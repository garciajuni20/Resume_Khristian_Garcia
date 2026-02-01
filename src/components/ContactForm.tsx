import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { useAnalytics } from '../hooks/useAnalytics';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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

  const t = lang === 'en' ? {
    title: 'Send me a message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Error sending message. Please try again.',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    placeholderName: 'Your name',
    placeholderEmail: 'your.email@example.com',
    placeholderSubject: 'Job opportunity / Collaboration',
    placeholderMessage: 'Tell me about your project...'
  } : {
    title: 'Envíame un mensaje',
    name: 'Nombre',
    email: 'Correo',
    subject: 'Asunto',
    message: 'Mensaje',
    send: 'Enviar Mensaje',
    sending: 'Enviando...',
    success: '¡Mensaje enviado exitosamente!',
    error: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
    required: 'Este campo es requerido',
    invalidEmail: 'Por favor ingresa un correo válido',
    placeholderName: 'Tu nombre',
    placeholderEmail: 'tu.correo@ejemplo.com',
    placeholderSubject: 'Oportunidad laboral / Colaboración',
    placeholderMessage: 'Cuéntame sobre tu proyecto...'
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
    
    if (!validateForm()) return;
    
    setStatus('loading');
    
    try {
      // Usando EmailJS (gratuito) - Necesitarás crear una cuenta y obtener credenciales
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'garciajuni20@gmail.com',
        reply_to: formData.email
      };
      
      // Alternativa:  (también gratis)
      const response = await fetch('https://formspree.io/f/meezgvoq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        trackEvent('contact_form_submit', { status: 'success' });
        
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
      trackEvent('contact_form_submit', { status: 'error' });
      
      setTimeout(() => setStatus('idle'), 3000);
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
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{t.title}</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {lang === 'en' 
            ? 'I\'ll respond within 24 hours' 
            : 'Responderé en menos de 24 horas'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {t.name} *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t.placeholderName}
              className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                  : 'border-neutral-300 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900'
              }`}
              disabled={status === 'loading'}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {t.email} *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t.placeholderEmail}
              className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                  : 'border-neutral-300 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900'
              }`}
              disabled={status === 'loading'}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            {t.subject} *
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder={t.placeholderSubject}
            className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.subject
                ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                : 'border-neutral-300 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900'
            }`}
            disabled={status === 'loading'}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            {t.message} *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder={t.placeholderMessage}
            rows={4}
            className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 resize-none ${
              errors.message
                ? 'border-red-300 focus:ring-red-500 dark:border-red-700'
                : 'border-neutral-300 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900'
            }`}
            disabled={status === 'loading'}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            * {lang === 'en' ? 'Required fields' : 'Campos requeridos'}
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.sending}
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="h-4 w-4" />
                {t.success}
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle className="h-4 w-4" />
                {t.error}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t.send}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
