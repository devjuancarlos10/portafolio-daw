import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  Layers,
  Layout,
  Smartphone,
  Grid,
  Tag,
  Globe,
} from 'lucide-react';
import { GithubIcon as Github } from '../common/BrandIcons';
import { useInView } from '../../hooks/useAnimations';
import project1Img from '../../assets/project-1.jpg';
import project2Img from '../../assets/project-2.jpg';
import project3Img from '../../assets/project-3.jpg';
import project4Img from '../../assets/project-4.jpg';
import './Projects.css';

import { defaultProjects as dbProjects } from '../../data/projects';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured?: boolean;
  order?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

const categories = [
  { key: 'all', label: 'Todos', icon: <Grid size={13} /> },
  { key: 'fullstack', label: 'Full Stack', icon: <Layers size={13} /> },
  { key: 'frontend', label: 'Frontend', icon: <Layout size={13} /> },
  { key: 'mobile', label: 'Mobile', icon: <Smartphone size={13} /> },
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

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const projectImages = [project1Img, project2Img, project3Img, project4Img];

const projectsList: Project[] = dbProjects.map((p, idx) => ({
  ...p,
  image: p.imageUrl || projectImages[idx % projectImages.length],
}));

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.08 });

  const filteredProjects = activeFilter === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === activeFilter);

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="projects__container">
        <div className="projects__header">
          <div className="projects__header-left">
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
            >
              Portafolio
            </motion.span>
            <motion.h2
              className="section-title"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
            >
              Proyectos Destacados
            </motion.h2>
          </div>

          <motion.div
            className="projects__filter"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`projects__filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
                id={`filter-${cat.key}`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        <div className="projects__grid">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const targetUrl = project.liveUrl || project.repoUrl;
              return (
                <motion.article
                  key={project.id}
                  className="project-card"
                  variants={cardVariant}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  exit="exit"
                  custom={index}
                  whileHover={{ y: -10, transition: { duration: 0.35 } }}
                  id={`project-card-${project.id}`}
                  onClick={() => {
                    if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <div className="project-card__image-wrapper">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card__image"
                      loading="lazy"
                    />
                    <div className="project-card__image-overlay" />
                    {targetUrl && (
                      <div className="project-card__view-btn">
                        <ArrowUpRight size={18} />
                      </div>
                    )}
                  </div>
                  <div className="project-card__info">
                    <div className="project-card__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-card__tag">
                          <Tag size={10} style={{ opacity: 0.7 }} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description">{project.description}</p>

                    {(project.liveUrl || project.repoUrl) && (
                      <div className="project-card__actions">
                        {project.liveUrl && !project.liveUrl.includes('github.com') && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__action-link live"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe size={13} />
                            <span>Visitar Web</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__action-link github"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={13} />
                            <span>Ver en GitHub</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

