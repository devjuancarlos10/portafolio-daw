import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  FolderGit2,
  GraduationCap,
  Cpu,
  Mail,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../common/BrandIcons';
import { useSmoothScroll, useActiveSection } from '../../hooks/useAnimations';
import heroImg from '../../assets/nav-hero.jpg';
import aboutImg from '../../assets/nav-about.jpg';
import projectsImg from '../../assets/nav-projects.jpg';
import academicImg from '../../assets/nav-academic.jpg';
import skillsImg from '../../assets/nav-skills.jpg';
import contactImg from '../../assets/nav-contact.jpg';
import './Navbar.css';

interface NavLinkItem {
  id: string;
  label: string;
  number: string;
  tagline: string;
  image: string;
  category: string;
  icon: typeof Home;
}

const navLinks: NavLinkItem[] = [
  {
    id: 'hero',
    label: 'Inicio',
    number: '01',
    tagline: 'Portada & Presentación',
    image: heroImg,
    category: 'Home',
    icon: Home,
  },
  {
    id: 'about',
    label: 'Sobre Mí',
    number: '02',
    tagline: 'Trayectoria & Experiencia UNCP',
    image: aboutImg,
    category: 'Perfil',
    icon: User,
  },
  {
    id: 'projects',
    label: 'Proyectos',
    number: '03',
    tagline: 'Trabajos & Casos de Estudio',
    image: projectsImg,
    category: 'Portafolio',
    icon: FolderGit2,
  },
  {
    id: 'academic',
    label: 'Aprendizaje DAW',
    number: '04',
    tagline: 'Mi Aprendizaje en Clases - DAW (16 Semanas)',
    image: academicImg,
    category: 'Académico',
    icon: GraduationCap,
  },
  {
    id: 'skills',
    label: 'Habilidades',
    number: '05',
    tagline: 'Stack Tecnológico & Herramientas',
    image: skillsImg,
    category: 'Tecnologías',
    icon: Cpu,
  },
  {
    id: 'contact',
    label: 'Contacto',
    number: '06',
    tagline: 'Inicia un Proyecto o Consulta',
    image: contactImg,
    category: 'Mensajes',
    icon: Mail,
  },
];

const sectionIds = navLinks.map(link => link.id);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnLightBg, setIsOnLightBg] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<NavLinkItem>(navLinks[0]);
  const scrollTo = useSmoothScroll();
  const activeSection = useActiveSection(sectionIds);
  const location = useLocation();
  const navigate = useNavigate();

  const isSubpage = location.pathname !== '/';

  // Detect when logo is over a light background (past the Hero section)
  useEffect(() => {
    if (isSubpage) {
      setIsOnLightBg(true);
      return;
    }
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        setIsOnLightBg(window.scrollY > heroBottom - 80);
      } else {
        setIsOnLightBg(window.scrollY > 100);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSubpage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollTo(sectionId), 350);
    } else {
      setTimeout(() => scrollTo(sectionId), 200);
    }
  }, [location.pathname, navigate, scrollTo]);

  return (
    <>
      {/* Floating Nav Bar: Logo + 4-Dot Menu */}
      <div className={`nav-topbar ${isOpen ? 'menu-open' : ''} ${isOnLightBg ? 'on-light' : ''}`}>
        <a
          href="#hero"
          className="nav-topbar__logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          aria-label="Ir al inicio - DevJuanCarlos"
        >
          <span className="nav-topbar__logo-badge">DEV</span>
          <span className="nav-topbar__logo-name">JUANCARLOS</span>
          <span className="nav-topbar__logo-dot" />
        </a>

        <button
          className={`nav-fab ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú de navegación"
          id="nav-menu-toggle"
        >
          <span className="nav-fab__dot" />
          <span className="nav-fab__dot" />
          <span className="nav-fab__dot" />
          <span className="nav-fab__dot" />
        </button>
      </div>

      {/* Fullscreen Navigation Overlay */}
      <div className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <div className="nav-overlay__backdrop" onClick={() => setIsOpen(false)} />

        <div className="nav-overlay__container">
          {/* Columna de Enlaces */}
          <div className="nav-overlay__menu">
            <div className="nav-overlay__menu-top">
              <span className="nav-overlay__section-tag">
                <Sparkles size={14} /> Menú Principal del Portafolio
              </span>
            </div>

            <ul className="nav-overlay__links">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <li
                    key={link.id}
                    className={`nav-overlay__link ${isActive ? 'active' : ''} ${hoveredLink.id === link.id ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredLink(link)}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                      id={`nav-link-${link.id}`}
                    >
                      <span className="nav-overlay__link-icon-wrap">
                        <IconComponent size={20} />
                      </span>
                      <span className="nav-overlay__link-number">{link.number}</span>
                      <span className="nav-overlay__link-text">{link.label}</span>
                      <span className="nav-overlay__link-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </a>
                  </li>
                );
              })}

            </ul>

            <div className="nav-overlay__footer">
              <div className="nav-overlay__socials">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-overlay__social-link">
                  <Github size={15} /> GitHub
                </a>
                <span className="nav-overlay__social-sep">/</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-overlay__social-link">
                  <Linkedin size={15} /> LinkedIn
                </a>
                <span className="nav-overlay__social-sep">/</span>
                <a href="mailto:juancarlos@email.com" className="nav-overlay__social-link">
                  <Mail size={15} /> juancarlos@email.com
                </a>
              </div>
              <span className="nav-overlay__location">Huancayo, Perú — UNCP IS093A</span>
            </div>
          </div>

          {/* Columna de Previsualización Visual con Foto */}
          <div className="nav-overlay__preview-column">
            <div className="nav-overlay__preview-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredLink.id}
                  className="nav-overlay__preview-media"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img
                    src={hoveredLink.image}
                    alt={hoveredLink.label}
                    className="nav-overlay__preview-img"
                  />
                  <div className="nav-overlay__preview-gradient" />

                  <div className="nav-overlay__preview-caption">
                    <span className="nav-overlay__preview-badge">{hoveredLink.category}</span>
                    <h4 className="nav-overlay__preview-title">{hoveredLink.label}</h4>
                    <p className="nav-overlay__preview-tagline">{hoveredLink.tagline}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Section indicator dots (solo en la página principal) */}
      {!isSubpage && (
        <div className="navbar__section-dots">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`navbar__section-dot ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
              aria-label={`Ir a ${link.label}`}
              id={`section-dot-${link.id}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
