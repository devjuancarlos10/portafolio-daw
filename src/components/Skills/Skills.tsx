import { motion, type Variants } from 'framer-motion';
import {
  Layout,
  Server,
  Wrench,
  Code2,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';
import {
  defaultFrontendSkills as dbFrontendSkills,
  defaultBackendSkills as dbBackendSkills,
  defaultTools as dbTools,
} from '../../data/skills';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
}

const philosophyCards = [
  {
    icon: <Code2 size={24} />,
    title: 'Código Limpio',
    description: 'Escribo código legible, mantenible y bien documentado. Cada línea tiene un propósito claro.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Diseño Centrado',
    description: 'La experiencia del usuario guía cada decisión técnica y de diseño en mis proyectos.',
  },
  {
    icon: <GraduationCap size={24} />,
    title: 'Aprendizaje Continuo',
    description: 'Me mantengo actualizado con las últimas tendencias y mejores prácticas del desarrollo.',
  },
];

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

function SkillBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  return (
    <motion.div
      className="skill-bar"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="skill-bar__header">
        <span className="skill-bar__name">{skill.name}</span>
        <span className="skill-bar__percent">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{
            transform: inView ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
            transitionDelay: `${delay * 0.1 + 0.4}s`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.08 });
  const frontendSkills = dbFrontendSkills;
  const backendSkills = dbBackendSkills;
  const toolsList = dbTools;

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="skills__container">
        <div className="skills__header">
          <motion.span
            className="section-label"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
          >
            Habilidades
          </motion.span>
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            Tecnologías & Herramientas
          </motion.h2>
          <motion.p
            className="section-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            Mi stack tecnológico combina herramientas modernas que me permiten
            construir soluciones robustas y escalables.
          </motion.p>
        </div>

        <div className="skills__content">
          <div>
            <div className="skills__category">
              <motion.h3
                className="skills__category-title"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={3}
              >
                <Layout size={18} />
                <span>Frontend</span>
              </motion.h3>
              <div className="skills__list">
                {frontendSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} inView={isInView} delay={i + 4} />
                ))}
              </div>
            </div>

            <div className="skills__category">
              <motion.h3
                className="skills__category-title"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={6}
              >
                <Server size={18} />
                <span>Backend</span>
              </motion.h3>
              <div className="skills__list">
                {backendSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} inView={isInView} delay={i + 8} />
                ))}
              </div>
            </div>

            <motion.div
              className="skills__tools"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={10}
            >
              <h3 className="skills__tools-title">
                <Wrench size={18} />
                <span>Herramientas & Entorno</span>
              </h3>
              <div className="skills__tools-grid">
                {toolsList.map((tool, i) => (
                  <motion.span
                    key={tool}
                    className="skills__tool-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.06 }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="skills__philosophy">
            {philosophyCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="philosophy-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.18,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <span className="philosophy-card__icon">{card.icon}</span>
                <h4 className="philosophy-card__title">{card.title}</h4>
                <p className="philosophy-card__description">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
