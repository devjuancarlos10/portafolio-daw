import { motion, type Variants } from 'framer-motion';
import {
  User,
  GraduationCap,
  MapPin,
  Sparkles,
  Briefcase,
  Calendar,
  Cpu,
} from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';
import heroBg from '../../assets/YO.png';
import './About.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

import { defaultProfile } from '../../data/profile';

export default function About() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.12 });
  const profile = {
    name: defaultProfile.name,
    bio: defaultProfile.bio,
    location: defaultProfile.location,
    email: defaultProfile.email,
    university: defaultProfile.university || 'UNCP',
    yearsExp: defaultProfile.yearsExp || '3+',
    projectsCount: defaultProfile.projectsCount || '15+',
    avatarUrl: defaultProfile.avatarUrl || '',
    resumeUrl: defaultProfile.resumeUrl || '',
  };

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__container">
        <motion.div
          className="about__image-wrapper"
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="about__image-frame">
            <img src={profile.avatarUrl || heroBg} alt={`${profile.name} - Desarrollador Web`} />
          </div>
          <div className="about__image-decoration" />
          <motion.div
            className="about__experience-badge"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            <span className="about__experience-number">3+</span>
            <span className="about__experience-text">Años de<br/>experiencia</span>
          </motion.div>
        </motion.div>

        <div className="about__info">
          <motion.span
            className="section-label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Sobre Mí
          </motion.span>

          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Transformando ideas en experiencias digitales
          </motion.h2>

          <motion.p
            className="about__description"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            {profile.bio}
          </motion.p>

          <motion.div
            className="about__stats"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
          >
            {[
              { number: profile.projectsCount, label: 'Proyectos', icon: <Briefcase size={16} /> },
              { number: profile.yearsExp, label: 'Años Exp.', icon: <Calendar size={16} /> },
              { number: '10+', label: 'Tecnologías', icon: <Cpu size={16} /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="about__stat"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
              >
                <div className="about__stat-icon-wrap">{stat.icon}</div>
                <span className="about__stat-number">{stat.number}</span>
                <span className="about__stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="about__details"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={4}
          >
            <div className="about__detail">
              <span className="about__detail-label">
                <User size={14} className="about__detail-icon" /> Nombre
              </span>
              <span className="about__detail-value">{profile.name}</span>
            </div>
            <div className="about__detail">
              <span className="about__detail-label">
                <GraduationCap size={14} className="about__detail-icon" /> Universidad
              </span>
              <span className="about__detail-value">{profile.university}</span>
            </div>
            <div className="about__detail">
              <span className="about__detail-label">
                <MapPin size={14} className="about__detail-icon" /> Ubicación
              </span>
              <span className="about__detail-value">{profile.location}</span>
            </div>
            <div className="about__detail">
              <span className="about__detail-label">
                <Sparkles size={14} className="about__detail-icon" /> Disponibilidad
              </span>
              <span className="about__detail-value">Freelance / Proyectos</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
