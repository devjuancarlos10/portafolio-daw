import { useState, type FormEvent } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../common/BrandIcons';
import { useInView } from '../../hooks/useAnimations';
import './Contact.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Contact() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage('Por favor completa todos los campos requeridos (nombre, email y mensaje).');
      return;
    }

    setIsSubmitting(true);

    try {
      const localMsg = {
        id: Date.now(),
        name: formState.name.trim(),
        email: formState.email.trim(),
        subject: formState.subject.trim() || 'Consulta desde Portafolio Web',
        message: formState.message.trim(),
        read: false,
        createdAt: new Date().toISOString(),
      };
      const cached = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      localStorage.setItem('portfolio_messages', JSON.stringify([localMsg, ...cached]));

      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMessage('Ocurrió un error al procesar el mensaje localmente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="contact" id="contact" ref={ref}>
        <div className="contact__container">
          <div className="contact__info">
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
            >
              Contacto
            </motion.span>

            <motion.h2
              className="contact__big-text"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
            >
              Hagamos algo <span>increíble</span> juntos
            </motion.h2>

            <motion.p
              className="contact__description"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2}
            >
              ¿Tienes un proyecto en mente o simplemente quieres conectar? 
              No dudes en escribirme. Estoy siempre abierto a nuevas 
              oportunidades y colaboraciones en desarrollo web.
            </motion.p>

            <motion.div
              className="contact__links"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={3}
            >
              <motion.a
                href="mailto:juancarlos@email.com"
                className="contact__link"
                id="contact-email"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="contact__link-icon">
                  <Mail size={18} />
                </div>
                <div className="contact__link-content">
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-value">juancarlos@email.com</span>
                </div>
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
                id="contact-github"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="contact__link-icon">
                  <Github size={18} />
                </div>
                <div className="contact__link-content">
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-value">github.com/juancarlos</span>
                </div>
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
                id="contact-linkedin"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="contact__link-icon">
                  <Linkedin size={18} />
                </div>
                <div className="contact__link-content">
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-value">linkedin.com/in/juancarlos</span>
                </div>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="contact__form-wrapper"
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {isSubmitted ? (
              <motion.div
                className="contact__form-success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="contact__form-success-icon-wrap">
                  <CheckCircle2 size={44} color="#10B981" />
                </div>
                <h3 className="contact__form-success-text">¡Mensaje enviado con éxito!</h3>
                <p className="contact__form-success-sub">
                  Gracias por escribirme. El mensaje ha sido registrado y te responderé a la brevedad posible.
                </p>
                <button
                  type="button"
                  className="contact__form-reset-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  <RotateCcw size={15} />
                  <span>Enviar otro mensaje</span>
                </button>
              </motion.div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
                <h3 className="contact__form-title">
                  <Sparkles size={18} style={{ color: 'var(--color-accent)', display: 'inline', marginRight: '0.4rem', verticalAlign: '-2px' }} />
                  Envíame un mensaje
                </h3>
                <p className="contact__form-subtitle">
                  Completa el formulario y te responderé lo antes posible.
                </p>

                {errorMessage && (
                  <div className="contact__form-error">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="contact-name" className="contact__form-label">Nombre *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="contact__form-input"
                      placeholder="Tu nombre completo"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="contact-email-input" className="contact__form-label">Email *</label>
                    <input
                      type="email"
                      id="contact-email-input"
                      name="email"
                      className="contact__form-input"
                      placeholder="tu@email.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label htmlFor="contact-subject" className="contact__form-label">Asunto</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    className="contact__form-input"
                    placeholder="¿Sobre qué te gustaría conversar?"
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="contact-message" className="contact__form-label">Mensaje *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="contact__form-textarea"
                    placeholder="Describe tu proyecto, duda o propuesta..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="contact__form-submit"
                  disabled={isSubmitting}
                  id="contact-submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Enviando mensaje...' : 'Enviar Mensaje'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__content">
          <span className="footer__text">
            © 2026 Juan Carlos — Portafolio de Desarrollo de Aplicaciones Web (UNCP)
          </span>
          <div className="footer__links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
            <a href="mailto:juancarlos@email.com" className="footer__link">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
