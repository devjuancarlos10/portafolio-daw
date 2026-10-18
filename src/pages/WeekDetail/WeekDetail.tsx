import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Terminal,
  GraduationCap,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  Lock,
  EyeOff,
  Copy,
  Check,
  Target,
  BookMarked,
  Sparkles,
  Layers,
  Award,
  Calendar,
} from 'lucide-react';
import { GithubIcon as Github } from '../../components/common/BrandIcons';
import {
  academicWeeks,
  TEACHER_THEORY,
  TEACHER_PRACTICE,
  type AcademicWeek,
} from '../../data/academicWeeks';
import './WeekDetail.css';

export default function WeekDetail() {
  const { weekId } = useParams<{ weekId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const initialSpace = (searchParams.get('espacio') as 'teoria' | 'practica') || 'teoria';
  const [activeSpace, setActiveSpace] = useState<'teoria' | 'practica'>(initialSpace);

  const currentId = parseInt(weekId || '1', 10);
  const defaultWeek = academicWeeks.find(w => w.id === currentId);
  const [week, setWeek] = useState<AcademicWeek | undefined>(defaultWeek);

  const prevWeek = academicWeeks.find(w => w.id === currentId - 1 && w.status !== 'hidden');
  const nextWeek = academicWeeks.find(w => w.id === currentId + 1 && w.status !== 'hidden');

  // Sincronizar activeSpace con URL param
  const handleSpaceChange = (space: 'teoria' | 'practica') => {
    setActiveSpace(space);
    setSearchParams({ espacio: space });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const spaceFromUrl = searchParams.get('espacio') as 'teoria' | 'practica';
    if (spaceFromUrl && (spaceFromUrl === 'teoria' || spaceFromUrl === 'practica')) {
      setActiveSpace(spaceFromUrl);
    }

    const staticWeek = academicWeeks.find(w => w.id === currentId);
    setWeek(staticWeek);
  }, [currentId, searchParams]);

  if (!week || week.status === 'hidden') {
    return (
      <div className="week-detail-not-found">
        <div className="week-detail-not-found__card">
          <EyeOff size={44} style={{ color: '#E11D48', marginBottom: '1rem' }} />
          <h2>Semana No Disponible</h2>
          <p>La semana {weekId} se encuentra temporalmente oculta del portafolio o en preparación curricular.</p>
          <Link to="/#academic" className="week-detail__btn-primary">
            <ArrowLeft size={16} /> Volver al Portafolio DAW
          </Link>
        </div>
      </div>
    );
  }

  const spaceData = activeSpace === 'teoria' ? week.theory : week.practice;
  const currentTeacher = activeSpace === 'teoria'
    ? (week.theoryTeacher || TEACHER_THEORY)
    : (week.practiceTeacher || TEACHER_PRACTICE);

  const handleCopyCode = () => {
    const code = activeSpace === 'practica'
      ? (spaceData?.labCodeSnippet || week.practicalLab.codeSnippet)
      : week.practicalLab.codeSnippet;
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="week-detail-page">
      {/* Top Navigation Bar with Back Button & Breadcrumbs */}
      <div className="week-topbar">
        <div className="week-topbar__container">
          <Link to="/#academic" className="week-back-btn" title="Volver al Semestre Académico">
            <span className="week-back-btn__icon">
              <ArrowLeft size={16} />
            </span>
            <span className="week-back-btn__label">Volver a Mi Aprendizaje en Clases (DAW)</span>
          </Link>

          <div className="week-topbar__right">
            <div className="week-topbar__breadcrumbs">
              <span className="week-topbar__crumb">UNCP (IS093A)</span>
              <span className="week-topbar__sep">/</span>
              <span className="week-topbar__crumb">Semestre 2026-II</span>
              <span className="week-topbar__sep">/</span>
              <span className="week-topbar__crumb active">Semana {week.id < 10 ? `0${week.id}` : week.id}</span>
            </div>
            <span className="week-topbar__unit-pill">{week.unit}</span>
          </div>
        </div>
      </div>

      <main className="week-detail-main">
        <div className="week-detail__container">
          {/* Hero of the Week */}
          <motion.section
            className="week-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="week-hero__meta">
              <span className="week-hero__number">
                Semana {week.id < 10 ? `0${week.id}` : week.id}
              </span>
              <span className="week-hero__sep">/</span>
              <span className="week-hero__unit-title">{week.unitTitle}</span>
              <span className="week-hero__sep">/</span>
              <span className={`week-hero__status ${week.status}`}>
                {week.status === 'completed' && <><CheckCircle2 size={13} /> Completado</>}
                {week.status === 'in-progress' && <><Clock size={13} /> En Progreso</>}
                {week.status === 'upcoming' && <><Clock size={13} /> Próximo</>}
                {week.status === 'disabled' && <><Lock size={13} /> Bloqueada (Por Dictar)</>}
              </span>
            </div>

            <h1 className="week-hero__title">{week.title}</h1>
            <p className="week-hero__subtitle">{week.subtitle}</p>
            <p className="week-hero__summary">{week.summary}</p>

            <div className="week-hero__tags">
              {week.tags.map((tag: string) => (
                <span key={tag} className="week-hero__tag">#{tag}</span>
              ))}
            </div>

            {week.status === 'disabled' && (
              <div className="week-disabled-notice-banner">
                <Lock size={20} />
                <div>
                  <strong>Semana en preparación curricular — Aún no dictada</strong>
                  <p>Esta semana académica todavía no se ha desarrollado en clases. Los informes, prácticas y tareas se habilitarán conforme avancen las sesiones formativas.</p>
                </div>
              </div>
            )}
          </motion.section>

          {/* DUAL SPACE SWITCHER: TEORÍA (SUASNABAR) VS PRÁCTICA (AGUILAR) */}
          <div className="week-space-selector">
            <button
              type="button"
              className={`week-space-btn ${activeSpace === 'teoria' ? 'active' : ''}`}
              onClick={() => handleSpaceChange('teoria')}
            >
              <div className="week-space-btn__icon">
                <BookOpen size={20} />
              </div>
              <div className="week-space-btn__info">
                <span className="week-space-btn__title">Espacio de Teoría</span>
                <span className="week-space-btn__teacher">Docente: {TEACHER_THEORY}</span>
              </div>
            </button>

            <button
              type="button"
              className={`week-space-btn ${activeSpace === 'practica' ? 'active' : ''}`}
              onClick={() => handleSpaceChange('practica')}
            >
              <div className="week-space-btn__icon">
                <Code2 size={20} />
              </div>
              <div className="week-space-btn__info">
                <span className="week-space-btn__title">Espacio de Práctica</span>
                <span className="week-space-btn__teacher">Docente: {TEACHER_PRACTICE}</span>
              </div>
            </button>
          </div>

          {/* TEACHER BANNER */}
          <div className={`week-teacher-banner ${activeSpace}`}>
            <div className="week-teacher-banner__avatar">
              {activeSpace === 'teoria' ? <GraduationCap size={26} /> : <Terminal size={26} />}
            </div>
            <div className="week-teacher-banner__content">
              <span className="week-teacher-banner__role">
                {activeSpace === 'teoria' ? 'Responsable de Asignatura (Teoría)' : 'Responsable de Asignatura (Práctica)'}
              </span>
              <h3 className="week-teacher-banner__name">{currentTeacher}</h3>
              <p className="week-teacher-banner__desc">
                {activeSpace === 'teoria'
                  ? 'Desarrollo de fundamentos teóricos, análisis de estándares de ingeniería, protocolos y arquitectura web.'
                  : 'Desarrollo práctico de laboratorios guiados, resolución de problemas técnicos, pruebas y código funcional.'}
              </p>
            </div>
            <div className="week-teacher-banner__badge">
              <Sparkles size={14} /> UNCP — IS093A
            </div>
          </div>

          {/* CONTENIDO ESPECÍFICO DEL ESPACIO SELECCIONADO */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpace}
              className="week-detail__grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* ==================================================== */}
              {/* COLUMNA IZQUIERDA                                    */}
              {/* ==================================================== */}
              <div className="week-detail__col">
                {/* 1. Objetivos de Aprendizaje */}
                <section className="week-section-card">
                  <div className="week-section-card__header">
                    <span className="week-section-card__icon">
                      <Target size={20} />
                    </span>
                    <h2 className="week-section-card__title">
                      {activeSpace === 'teoria' ? 'Objetivos de Teoría' : 'Competencias & Metas del Laboratorio'}
                    </h2>
                  </div>
                  <ul className="week-objectives-list">
                    {(spaceData?.learningObjectives || week.learningObjectives || []).map((obj: string, idx: number) => (
                      <li key={idx} className="week-objective-item">
                        <span className="week-objective-num">0{idx + 1}</span>
                        <p>{obj}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 2. Temario & Conceptos Clave */}
                <section className="week-section-card">
                  <div className="week-section-card__header">
                    <span className="week-section-card__icon">
                      <BookMarked size={20} />
                    </span>
                    <h2 className="week-section-card__title">
                      {activeSpace === 'teoria' ? 'Temario Teórico Oficial' : 'Puntos Clave del Laboratorio'}
                    </h2>
                  </div>
                  <ul className="week-topics-list">
                    {(spaceData?.topics || week.topics || []).map((topic: string, idx: number) => (
                      <li key={idx} className="week-topic-item">
                        <CheckCircle2 size={16} className="week-topic-check-icon" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Recursos & Material Complementario (PDFs, GitHub, etc.) */}
                <section className="week-section-card">
                  <div className="week-section-card__header">
                    <span className="week-section-card__icon">
                      <FileText size={20} />
                    </span>
                    <h2 className="week-section-card__title">
                      Recursos & Documentos ({activeSpace === 'teoria' ? 'Teoría' : 'Práctica'})
                    </h2>
                  </div>

                  <div className="week-resources-grid">
                    {(spaceData?.resources || week.resources || []).map((res: any, idx: number) => (
                      <a
                        key={idx}
                        href={res.fileUrl || res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="week-resource-link"
                      >
                        <div className="week-resource-icon-wrap">
                          {res.type === 'GitHub' ? <Github size={18} /> : <FileText size={18} />}
                        </div>
                        <div className="week-resource-info">
                          <span className="week-resource-type">{res.type}</span>
                          <span className="week-resource-title">{res.title}</span>
                        </div>
                        <span className="week-resource-arrow">
                          <ExternalLink size={14} />
                        </span>
                      </a>
                    ))}
                  </div>
                </section>

                {/* 4. Bitácora / Reflexión */}
                <section className="week-section-card week-section-card--highlight">
                  <div className="week-section-card__header">
                    <span className="week-section-card__icon">
                      <Award size={20} />
                    </span>
                    <h2 className="week-section-card__title">Reflexión de Aprendizaje</h2>
                  </div>
                  <blockquote className="week-reflection-quote">
                    "{spaceData?.reflection || week.reflection}"
                  </blockquote>
                </section>
              </div>

              {/* ==================================================== */}
              {/* COLUMNA DERECHA                                      */}
              {/* ==================================================== */}
              <div className="week-detail__col">
                {/* SI ES ESPACIO DE PRÁCTICA: LABORATORIO COMPLETO */}
                {activeSpace === 'practica' && (
                  <section className="week-section-card week-section-card--lab">
                    <div className="week-section-card__header">
                      <span className="week-section-card__icon">
                        <Terminal size={20} />
                      </span>
                      <div>
                        <h2 className="week-section-card__title">
                          {spaceData?.labTitle || week.practicalLab.title}
                        </h2>
                        <p className="week-section-card__desc">
                          {spaceData?.labDescription || week.practicalLab.description}
                        </p>
                      </div>
                    </div>

                    {/* Botón de Repositorio de GitHub del Laboratorio */}
                    {(spaceData?.labGithubUrl || week.practicalLab.githubUrl) && (
                      <div className="week-lab-github-bar">
                        <a
                          href={spaceData?.labGithubUrl || week.practicalLab.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="week-lab-github-btn"
                        >
                          <Github size={18} />
                          <span>Ver Código del Laboratorio en GitHub</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="week-lab-stack">
                      <span className="week-lab-stack__label">Stack del Laboratorio:</span>
                      <div className="week-lab-stack__badges">
                        {(spaceData?.labTechStack || week.practicalLab.techStack || []).map((tech: string) => (
                          <span key={tech} className="week-lab-stack__badge">
                            <Layers size={13} /> {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    {(spaceData?.labCodeSnippet || week.practicalLab.codeSnippet) && (
                      <div className="week-code-block">
                        <div className="week-code-block__header">
                          <div className="week-code-block__dots">
                            <span className="dot red" />
                            <span className="dot yellow" />
                            <span className="dot green" />
                          </div>
                          <span className="week-code-block__lang">
                            {spaceData?.labCodeLanguage || week.practicalLab.codeLanguage || 'typescript'}
                          </span>
                          <button
                            onClick={handleCopyCode}
                            className="week-code-block__copy"
                            aria-label="Copiar código"
                          >
                            {copied ? (
                              <><Check size={14} /> Copiado</>
                            ) : (
                              <><Copy size={14} /> Copiar</>
                            )}
                          </button>
                        </div>
                        <pre className="week-code-block__content">
                          <code>{spaceData?.labCodeSnippet || week.practicalLab.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Resultados del Lab */}
                    {(spaceData?.labResults || week.practicalLab.results || []).length > 0 && (
                      <div className="week-lab-results">
                        <h4 className="week-lab-results__title">Resultados Técnicos:</h4>
                        <ul>
                          {(spaceData?.labResults || week.practicalLab.results || []).map((res: string, i: number) => (
                            <li key={i}>
                              <CheckCircle2 size={15} className="week-lab-result-icon" />
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                )}

                {/* TAREAS & ENTREGABLES CON SUBIDA Y DESCARGA DE PDF Y GITHUB */}
                <section className="week-section-card">
                  <div className="week-section-card__header">
                    <span className="week-section-card__icon">
                      <FileText size={20} />
                    </span>
                    <div>
                      <h2 className="week-section-card__title">
                        {activeSpace === 'teoria' ? 'Tareas & Evaluaciones de Teoría' : 'Entregables de Laboratorio'}
                      </h2>
                      <p className="week-section-card__desc">
                        Tareas asignadas por el docente y soluciones enviadas con enlace a GitHub y reporte en PDF
                      </p>
                    </div>
                  </div>

                  <div className="week-assignments-list">
                    {(!spaceData?.assignments || spaceData.assignments.length === 0) ? (
                      <div className="week-assignments-empty">
                        <FileText size={28} />
                        <p>No hay tareas ni evaluaciones registradas para esta semana en {activeSpace === 'teoria' ? 'teoría' : 'práctica'}.</p>
                      </div>
                    ) : (
                      spaceData.assignments.map((ass: any, i: number) => (
                      <div key={i} className="week-assignment-item">
                        <div className="week-assignment-top">
                          <span className={`week-assignment-badge ${ass.type || (ass.status === 'Entregado' ? 'enviada' : 'asignada')}`}>
                            {ass.type === 'enviada' || ass.status === 'Entregado' ? 'Tarea Enviada' : 'Tarea Asignada'}
                          </span>
                          <div className="week-assignment-status-wrap">
                            <span className={`week-assignment-status ${ass.status === 'Entregado' ? 'done' : 'pending'}`}>
                              {ass.status}
                            </span>
                          </div>
                        </div>

                        <h4 className="week-assignment-title">{ass.title}</h4>
                        {ass.description && (
                          <p className="week-assignment-desc">{ass.description}</p>
                        )}

                        {ass.date && (
                          <span className="week-assignment-date">
                            <Calendar size={13} /> {ass.date}
                          </span>
                        )}

                        {/* ACCIONES DE ENTREGA: PDF Y GITHUB */}
                        <div className="week-assignment-actions">
                          {ass.pdfUrl && (
                            <a
                              href={ass.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="week-assignment-btn pdf"
                            >
                              <FileText size={15} />
                              <span>Ver / Descargar PDF</span>
                              <Download size={14} />
                            </a>
                          )}

                          {ass.githubUrl && (
                            <a
                              href={ass.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="week-assignment-btn github"
                            >
                              <Github size={15} />
                              <span>Repositorio GitHub</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                </section>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Navigation */}
          <footer className="week-detail-nav">
            <div className="week-detail-nav__grid">
              {prevWeek ? (
                <button
                  type="button"
                  onClick={() => navigate(`/semana/${prevWeek.id}?espacio=${activeSpace}`)}
                  className="week-nav-card week-nav-card--prev"
                  title={`Ir a Semana ${prevWeek.id}`}
                >
                  <div className="week-nav-card__arrow">
                    <ArrowLeft size={18} />
                  </div>
                  <div className="week-nav-card__body">
                    <span className="week-nav-card__badge">← Semana Anterior</span>
                    <h4 className="week-nav-card__title">
                      Semana {prevWeek.id < 10 ? `0${prevWeek.id}` : prevWeek.id}: {prevWeek.title}
                    </h4>
                    <span className="week-nav-card__unit">{prevWeek.unit}</span>
                  </div>
                </button>
              ) : (
                <div className="week-nav-card-empty" />
              )}

              {nextWeek ? (
                <button
                  type="button"
                  onClick={() => navigate(`/semana/${nextWeek.id}?espacio=${activeSpace}`)}
                  className="week-nav-card week-nav-card--next"
                  title={`Ir a Semana ${nextWeek.id}`}
                >
                  <div className="week-nav-card__body">
                    <span className="week-nav-card__badge">Siguiente Semana →</span>
                    <h4 className="week-nav-card__title">
                      Semana {nextWeek.id < 10 ? `0${nextWeek.id}` : nextWeek.id}: {nextWeek.title}
                    </h4>
                    <span className="week-nav-card__unit">{nextWeek.unit}</span>
                  </div>
                  <div className="week-nav-card__arrow">
                    <ArrowRight size={18} />
                  </div>
                </button>
              ) : (
                <div className="week-nav-card-empty" />
              )}
            </div>

            <div className="week-detail-nav__footer">
              <Link to="/#academic" className="week-nav-all-btn">
                <BookOpen size={16} />
                <span>Ver Semanas Académicas (DAW)</span>
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
