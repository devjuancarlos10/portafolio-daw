import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  Terminal,
  GraduationCap,
  FileText,
  ExternalLink,
  Download,
  CheckCircle2,
  Clock,
  Lock,
  EyeOff,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookMarked,
  Target,
} from 'lucide-react';
import { GithubIcon as Github } from '../common/BrandIcons';
import { useInView } from '../../hooks/useAnimations';
import {
  academicWeeks,
  TEACHER_THEORY,
  TEACHER_PRACTICE,
  type AcademicWeek,
} from '../../data/academicWeeks';
import './AcademicSemester.css';

const units = [
  { key: 'all', label: 'Todas las Semanas' },
  { key: 'Unidad I', label: 'Unidad I: Desarrollo Web Frontend' },
  { key: 'Unidad II', label: 'Unidad II: Desarrollo Web Fullstack' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function AcademicSemester() {
  const weeks = academicWeeks;
  const [selectedWeekId, setSelectedWeekId] = useState<number>(1);
  const [activeSpace, setActiveSpace] = useState<'teoria' | 'practica'>('teoria');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.05 });

  // Filtrar semanas que no estén completamente ocultas
  const visibleWeeks = weeks.filter(w => w.status !== 'hidden');
  const selectedWeek = visibleWeeks.find(w => w.id === selectedWeekId) || visibleWeeks[0] || weeks[0] || academicWeeks[0];
  const currentVisibleIndex = visibleWeeks.findIndex(w => w.id === selectedWeek.id);

  // Cerrar el menú desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectWeek = (id: number) => {
    setSelectedWeekId(id);
    setIsDropdownOpen(false);
  };

  const handlePrevWeek = () => {
    if (currentVisibleIndex > 0) {
      setSelectedWeekId(visibleWeeks[currentVisibleIndex - 1].id);
    }
  };

  const handleNextWeek = () => {
    if (currentVisibleIndex >= 0 && currentVisibleIndex < visibleWeeks.length - 1) {
      setSelectedWeekId(visibleWeeks[currentVisibleIndex + 1].id);
    }
  };

  const getStatusBadge = (status: AcademicWeek['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="week-showcase__status completed">
            <CheckCircle2 size={13} /> Completado
          </span>
        );
      case 'in-progress':
        return (
          <span className="week-showcase__status in-progress">
            <Clock size={13} /> En Progreso
          </span>
        );
      case 'upcoming':
        return (
          <span className="week-showcase__status upcoming">
            <Clock size={13} /> Próximo
          </span>
        );
      case 'disabled':
        return (
          <span className="week-showcase__status disabled">
            <Lock size={13} /> Bloqueada / Por Dictar
          </span>
        );
      case 'hidden':
        return (
          <span className="week-showcase__status hidden">
            <EyeOff size={13} /> Oculta
          </span>
        );
    }
  };

  // Datos del espacio activo
  const spaceData = activeSpace === 'teoria' ? selectedWeek.theory : selectedWeek.practice;
  const currentTeacher = activeSpace === 'teoria'
    ? (selectedWeek.theoryTeacher || TEACHER_THEORY)
    : (selectedWeek.practiceTeacher || TEACHER_PRACTICE);

  return (
    <section className="academic" id="academic" ref={ref}>
      <div className="academic__container">
        {/* Header */}
        <div className="academic__header">
          <div className="academic__header-left">
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
            >
              Semestre Académico 2026-II — UNCP (IS093A)
            </motion.span>
            <motion.h2
              className="section-title"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
            >
              Mi Aprendizaje en Clases - DAW
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2}
            >
              Explora las semanas desarrolladas durante el semestre en dos modalidades formativas: <strong>Teoría (Suasnabar)</strong> y <strong>Práctica (Aguilar)</strong>, con acceso directo a PDFs, tareas entregadas y repositorios en GitHub.
            </motion.p>
          </div>

          <motion.div
            className="academic__stats"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
          >
            <div className="academic__stat-box">
              <span className="academic__stat-num">{visibleWeeks.length}</span>
              <span className="academic__stat-label">Semanas</span>
            </div>
            <div className="academic__stat-box">
              <span className="academic__stat-num">2</span>
              <span className="academic__stat-label">Espacios</span>
            </div>
            <div className="academic__stat-box">
              <span className="academic__stat-num">9no</span>
              <span className="academic__stat-label">Semestre</span>
            </div>
          </motion.div>
        </div>

        {/* SELECTOR DE ESPACIOS: TEORÍA (SUASNABAR) VS PRÁCTICA (AGUILAR) */}
        <motion.div
          className="academic__space-switcher-wrap"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={3.5}
        >
          <div className="academic__space-switcher">
            <button
              type="button"
              className={`academic__space-btn ${activeSpace === 'teoria' ? 'active' : ''}`}
              onClick={() => setActiveSpace('teoria')}
            >
              <div className="academic__space-btn-icon">
                <BookOpen size={18} />
              </div>
              <div className="academic__space-btn-text">
                <span className="academic__space-btn-title">Teoría</span>
                <span className="academic__space-btn-teacher">Docente: {TEACHER_THEORY}</span>
              </div>
            </button>

            <button
              type="button"
              className={`academic__space-btn ${activeSpace === 'practica' ? 'active' : ''}`}
              onClick={() => setActiveSpace('practica')}
            >
              <div className="academic__space-btn-icon">
                <Code2 size={18} />
              </div>
              <div className="academic__space-btn-text">
                <span className="academic__space-btn-title">Práctica</span>
                <span className="academic__space-btn-teacher">Docente: {TEACHER_PRACTICE}</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* BARRA DEL MENÚ DESPLEGABLE */}
        <motion.div
          className="academic__dropdown-section"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={4}
          ref={dropdownRef}
        >
          <div className="academic__dropdown-header-bar">
            <div className="academic__dropdown-wrapper">
              <label htmlFor="academic-dropdown-toggle" className="academic__dropdown-label">
                Seleccionar Semana del Curso ({visibleWeeks.length} disponibles):
              </label>

              {/* Botón Principal que Abre el Menú Desplegable */}
              <button
                type="button"
                id="academic-dropdown-toggle"
                className={`academic__dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
              >
                <div className="academic__dropdown-trigger-content">
                  <span className="academic__dropdown-trigger-badge">
                    Semana {selectedWeek.id < 10 ? `0${selectedWeek.id}` : selectedWeek.id}
                  </span>
                  <span className="academic__dropdown-trigger-title">
                    {selectedWeek.title}
                  </span>
                  <span className="academic__dropdown-trigger-unit">
                    ({selectedWeek.unit})
                  </span>
                </div>
                <span className="academic__dropdown-chevron">
                  <ChevronDown size={18} />
                </span>
              </button>

              {/* Menú Desplegable Flotante */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="academic__dropdown-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    role="listbox"
                  >
                    <div className="academic__dropdown-scroll">
                      {units
                        .filter(u => u.key !== 'all')
                        .filter(unitGroup => visibleWeeks.some(w => w.unit === unitGroup.key))
                        .map((unitGroup) => (
                        <div key={unitGroup.key} className="academic__dropdown-group">
                          <div className="academic__dropdown-group-title">
                            {unitGroup.label}
                          </div>
                          {visibleWeeks
                            .filter(w => w.unit === unitGroup.key)
                            .map((week) => (
                              <button
                                key={week.id}
                                type="button"
                                className={`academic__dropdown-item ${selectedWeekId === week.id ? 'selected' : ''} ${week.status === 'disabled' ? 'disabled' : ''}`}
                                onClick={() => handleSelectWeek(week.id)}
                                role="option"
                                aria-selected={selectedWeekId === week.id}
                              >
                                <span className="academic__dropdown-item-num">
                                  {week.id < 10 ? `0${week.id}` : week.id}
                                </span>
                                <div className="academic__dropdown-item-text">
                                  <span className="academic__dropdown-item-title">
                                    {week.title}
                                    {week.status === 'disabled' && (
                                      <span className="academic__dropdown-locked-badge">
                                        <Lock size={11} /> Por dictar
                                      </span>
                                    )}
                                  </span>
                                  <span className="academic__dropdown-item-sub">{week.subtitle}</span>
                                </div>
                                <span className={`academic__dropdown-item-dot ${week.status}`} />
                                {selectedWeekId === week.id && (
                                  <span className="academic__dropdown-item-check">✓</span>
                                )}
                              </button>
                            ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botones de navegación directa Anterior / Siguiente */}
            <div className="academic__quick-nav">
              <button
                type="button"
                onClick={handlePrevWeek}
                disabled={currentVisibleIndex <= 0}
                className="academic__quick-btn"
                aria-label="Semana Anterior"
                title="Semana Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="academic__quick-indicator">
                {currentVisibleIndex >= 0 ? `${currentVisibleIndex + 1} / ${visibleWeeks.length}` : `${selectedWeek.id} / ${visibleWeeks.length}`}
              </span>
              <button
                type="button"
                onClick={handleNextWeek}
                disabled={currentVisibleIndex >= visibleWeeks.length - 1}
                className="academic__quick-btn"
                aria-label="Siguiente Semana"
                title="Siguiente Semana"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ESCENARIO DE DETALLE DE LA SEMANA SELECCIONADA */}
        <div className="academic__showcase-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedWeek.id}-${activeSpace}`}
              className="week-showcase"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Barra Superior del Showcase */}
              <div className="week-showcase__top">
                <div className="week-showcase__meta">
                  <span className="week-showcase__unit-badge">{selectedWeek.unit}</span>
                  <span className="week-showcase__week-num">
                    Semana {selectedWeek.id < 10 ? `0${selectedWeek.id}` : selectedWeek.id} de 16
                  </span>
                  <span className="week-showcase__sep">•</span>
                  <span className="week-showcase__unit-title">{selectedWeek.unitTitle}</span>
                </div>
                {getStatusBadge(selectedWeek.status)}
              </div>

              {/* Banner si la semana está bloqueada/por dictar */}
              {selectedWeek.status === 'disabled' && (
                <div className="week-showcase__disabled-banner">
                  <div className="week-showcase__disabled-icon">
                    <Lock size={22} />
                  </div>
                  <div className="week-showcase__disabled-text">
                    <h4>Semana Bloqueada — Contenido por Dictar</h4>
                    <p>
                      Esta sesión académica aún no se ha impartido en el semestre. Los materiales, guías de laboratorio y reportes en PDF se publicarán en el portafolio conforme se desarrolle la clase.
                    </p>
                  </div>
                </div>
              )}

              {/* Banner del Docente y Espacio Formativo */}
              <div className={`academic__teacher-banner ${activeSpace}`}>
                <div className="academic__teacher-avatar">
                  {activeSpace === 'teoria' ? <GraduationCap size={22} /> : <Terminal size={22} />}
                </div>
                <div className="academic__teacher-info">
                  <span className="academic__teacher-role">
                    {activeSpace === 'teoria' ? 'Docente de Teoría' : 'Docente de Práctica / Laboratorio'}
                  </span>
                  <h4 className="academic__teacher-name">{currentTeacher}</h4>
                </div>
                <div className="academic__teacher-tag">
                  {activeSpace === 'teoria' ? 'Fundamentos & Arquitectura' : 'Desarrollo en Laboratorio'}
                </div>
              </div>

              {/* Título Principal y Subtítulo */}
              <div className="week-showcase__header">
                <h3 className="week-showcase__title">
                  {activeSpace === 'teoria' ? selectedWeek.title : (spaceData?.labTitle || selectedWeek.practicalLab.title || selectedWeek.title)}
                </h3>
                <p className="week-showcase__subtitle">{selectedWeek.subtitle}</p>
                <p className="week-showcase__summary">
                  {activeSpace === 'teoria' ? selectedWeek.summary : (spaceData?.labDescription || selectedWeek.practicalLab.description || selectedWeek.summary)}
                </p>
              </div>

              {/* Contenido en 2 Columnas */}
              <div className="week-showcase__content-grid">
                {/* Columna 1: Temario / Objetivos */}
                <div className="week-showcase__box">
                  <div className="week-showcase__box-header">
                    <span className="week-showcase__box-icon">
                      {activeSpace === 'teoria' ? <BookMarked size={20} /> : <Target size={20} />}
                    </span>
                    <h4 className="week-showcase__box-title">
                      {activeSpace === 'teoria' ? 'Temario Teórico Clave' : 'Objetivos de Laboratorio'}
                    </h4>
                  </div>
                  <ul className="week-showcase__list">
                    {(spaceData?.topics || selectedWeek.topics || []).slice(0, 4).map((item, i) => (
                      <li key={i} className="week-showcase__list-item">
                        <CheckCircle2 size={16} className="week-showcase__list-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enlace directo a GitHub de la práctica si existe */}
                  {activeSpace === 'practica' && (selectedWeek.practicalLab.githubUrl || spaceData?.labGithubUrl) && (
                    <div className="week-showcase__repo-box">
                      <a
                        href={selectedWeek.practicalLab.githubUrl || spaceData?.labGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="week-showcase__repo-btn"
                      >
                        <Github size={16} />
                        <span>Ver Repositorio de la Práctica</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Columna 2: Tareas & Entregables (PDFs y GitHub) */}
                <div className="week-showcase__box week-showcase__box--assignments">
                  <div className="week-showcase__box-header">
                    <span className="week-showcase__box-icon">
                      <FileText size={20} />
                    </span>
                    <div>
                      <h4 className="week-showcase__box-title">
                        {activeSpace === 'teoria' ? 'Tareas & Evaluaciones de Teoría' : 'Laboratorios & Entregas de Práctica'}
                      </h4>
                      <span className="week-showcase__lab-desc">
                        Documentos en PDF, guías y enlaces a repositorios
                      </span>
                    </div>
                  </div>

                  <div className="week-showcase__assignments-list">
                    {(!spaceData?.assignments || spaceData.assignments.length === 0) ? (
                      <div className="week-showcase__empty-assignments">
                        <FileText size={20} />
                        <span>Sin tareas ni evaluaciones registradas para este espacio.</span>
                      </div>
                    ) : (
                      spaceData.assignments.slice(0, 2).map((ass, idx) => (
                        <div key={idx} className="week-showcase__assignment-card">
                          <div className="week-showcase__assignment-top">
                            <span className={`week-showcase__assignment-badge ${ass.type || (ass.status === 'Entregado' ? 'enviada' : 'asignada')}`}>
                              {ass.type === 'enviada' || ass.status === 'Entregado' ? 'Tarea Enviada' : 'Tarea Asignada'}
                            </span>
                          </div>

                          <h5 className="week-showcase__assignment-name">{ass.title}</h5>
                          {ass.description && (
                            <p className="week-showcase__assignment-desc">{ass.description}</p>
                          )}

                          <div className="week-showcase__assignment-actions">
                            {ass.pdfUrl && (
                              <a
                                href={ass.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="week-showcase__action-btn pdf"
                              >
                                <FileText size={14} />
                                <span>Ver / Descargar PDF</span>
                                <Download size={13} />
                              </a>
                            )}
                            {ass.githubUrl && (
                              <a
                                href={ass.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="week-showcase__action-btn github"
                              >
                                <Github size={14} />
                                <span>Repositorio GitHub</span>
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Stack de Tecnologías para práctica */}
                  {activeSpace === 'practica' && (selectedWeek.practicalLab.techStack || []).length > 0 && (
                    <div className="week-showcase__tech-tags">
                      {selectedWeek.practicalLab.techStack.map(tech => (
                        <span key={tech} className="week-showcase__tech-tag">
                          <Terminal size={12} /> {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer con Botón de Redirección Destacado */}
              <div className="week-showcase__footer">
                <div className="week-showcase__nav-arrows">
                  <button
                    onClick={handlePrevWeek}
                    disabled={currentVisibleIndex <= 0}
                    className="week-showcase__arrow-btn"
                    aria-label="Semana Anterior"
                  >
                    <ChevronLeft size={16} /> Semana Anterior
                  </button>
                  <button
                    onClick={handleNextWeek}
                    disabled={currentVisibleIndex >= visibleWeeks.length - 1}
                    className="week-showcase__arrow-btn"
                    aria-label="Siguiente Semana"
                  >
                    Siguiente Semana <ChevronRight size={16} />
                  </button>
                </div>

                <Link
                  to={`/semana/${selectedWeek.id}?espacio=${activeSpace}`}
                  className="week-showcase__cta-btn"
                  id={`cta-week-${selectedWeek.id}`}
                >
                  <span>
                    Ver Detalle Completo de {activeSpace === 'teoria' ? 'Teoría' : 'Práctica'}
                  </span>
                  <ArrowRight size={16} className="week-showcase__cta-arrow" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
