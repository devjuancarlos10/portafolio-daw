import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import {
  ArrowRight,
  GraduationCap,
  MapPin,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useSmoothScroll } from '../../hooks/useAnimations';
import heroBg from '../../assets/YO.png';
import './Hero.css';

const textReveal: Variants = {
  hidden: { y: '120%', opacity: 0 },
  visible: (delay: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

import { defaultProfile } from '../../data/profile';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const profileData = {
    name: defaultProfile.name,
    title: defaultProfile.title,
    tagline: defaultProfile.tagline || defaultProfile.bio,
    location: defaultProfile.location,
  };
  const scrollTo = useSmoothScroll();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className={`hero ${loaded ? 'loaded' : ''}`}
      id="hero"
      style={{ opacity: heroOpacity }}
    >
      <div className="hero__background">
        <motion.img
          src={heroBg}
          alt="Retrato profesional"
          className="hero__background-image"
          loading="eager"
          style={{ scale: heroScale }}
        />
        <div className="hero__background-overlay" />
      </div>

      <div className="hero__content">
        <motion.div
          className="hero__greeting"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          <span className="hero__greeting-inner">
            <Sparkles size={14} className="hero__sparkle-icon" />
            Hola, mi nombre es
          </span>
        </motion.div>

        <h1 className="hero__name">
          <span className="hero__name-line">
            <motion.span
              className="hero__name-text"
              variants={textReveal}
              initial="hidden"
              animate="visible"
              custom={0.6}
            >
              {profileData.name}
            </motion.span>
          </span>
          <span className="hero__name-line">
            <motion.span
              className="hero__name-text"
              variants={textReveal}
              initial="hidden"
              animate="visible"
              custom={0.75}
            >
              {profileData.title}
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero__title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {profileData.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
        >
          <motion.a
            href="#projects"
            className="hero__cta"
            onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="hero-cta"
          >
            <span>Ver Proyectos</span>
            <ArrowRight size={17} className="hero__cta-arrow" />
          </motion.a>

          <motion.a
            href="#academic-semester"
            className="hero__cta hero__cta--secondary"
            onClick={(e) => { e.preventDefault(); scrollTo('academic-semester'); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="hero-cta-academic"
          >
            <GraduationCap size={17} />
            <span>Aprendizaje DAW</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        onClick={() => scrollTo('about')}
      >
        <span className="hero__scroll-text">Explorar</span>
        <ChevronDown size={16} className="hero__scroll-icon" />
      </motion.div>

      <motion.div
        className="hero__side-info"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="hero__location">
          <MapPin size={13} className="hero__location-icon" />
          {profileData.location}
        </span>
      </motion.div>
    </motion.section>
  );
}
