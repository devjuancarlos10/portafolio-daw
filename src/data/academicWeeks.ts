export const TEACHER_THEORY = 'SUASNABAR TERREL JAIME';
export const TEACHER_PRACTICE = 'AGUILAR CORONACIÓN MIGUEL ELIAS';

export interface WeekAssignment {
  title: string;
  status: 'Entregado' | 'En progreso' | 'Próximo' | 'Asignada' | 'Calificada';
  grade?: string;
  date?: string;
  description?: string;
  githubUrl?: string; // Enlace al repositorio o entrega en GitHub
  pdfUrl?: string;    // Enlace o archivo PDF de la tarea/informe
  fileUrl?: string;
  type?: 'asignada' | 'enviada';
  space?: 'teoria' | 'practica';
}

export interface WeekResource {
  title: string;
  type: 'PDF' | 'Diapositiva' | 'GitHub' | 'Lectura' | 'Video' | 'Guía';
  url: string;
  fileUrl?: string;
  space?: 'teoria' | 'practica';
}

export interface SpaceContent {
  teacher: string;
  teacherRole: string; // 'Responsable de Asignatura (Teoría)' | 'Responsable de Asignatura (Práctica)'
  title: string;
  subtitle: string;
  summary: string;
  topics: string[];
  learningObjectives?: string[];
  labTitle?: string;
  labDescription?: string;
  labTechStack?: string[];
  labCodeSnippet?: string;
  labCodeLanguage?: string;
  labResults?: string[];
  labGithubUrl?: string;
  assignments?: WeekAssignment[];
  resources?: WeekResource[];
  reflection?: string;
}

export type WeekStatus = 'completed' | 'in-progress' | 'upcoming' | 'disabled' | 'hidden';

export interface AcademicWeek {
  id: number;
  unit: 'Unidad I' | 'Unidad II';
  unitTitle: string;
  title: string;
  subtitle: string;
  summary: string;
  dateRange: string;
  status: WeekStatus;
  topics: string[];
  learningObjectives: string[];
  practicalLab: {
    title: string;
    description: string;
    techStack: string[];
    codeSnippet?: string;
    codeLanguage?: string;
    results?: string[];
    githubUrl?: string;
  };
  assignments: WeekAssignment[];
  resources: WeekResource[];
  reflection: string;
  tags: string[];
  theoryTeacher?: string;
  practiceTeacher?: string;
  theory?: SpaceContent;
  practice?: SpaceContent;
  theoryData?: any;
  practiceData?: any;
}

export function resolveWeekSpaces(week: AcademicWeek): AcademicWeek {
  const defaultTheoryAssignments: WeekAssignment[] = [
    {
      title: `Tarea Asignada: Cuestionario Teórico y Análisis Semanal`,
      status: 'Asignada',
      type: 'asignada',
      date: week.dateRange || `Semana ${week.id}`,
      description: `Investigación formal y desarrollo de conceptos teóricos sobre ${week.title}.`,
      pdfUrl: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
      space: 'teoria',
    },
    {
      title: `Tarea Enviada: Informe Monográfico y Resumen Crítico`,
      status: 'Entregado',
      type: 'enviada',
      date: week.dateRange || `Semana ${week.id}`,
      description: `Entrega formal del informe de teoría con fuentes bibliográficas y conclusiones.`,
      githubUrl: `https://github.com/devjuancarlos10/daw-teoria-semana-${week.id < 10 ? '0' + week.id : week.id}`,
      pdfUrl: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
      space: 'teoria',
    },
  ];

  const defaultPracticeAssignments: WeekAssignment[] = [
    {
      title: `Guía de Laboratorio Asignada: ${week.practicalLab?.title || week.title}`,
      status: 'Asignada',
      type: 'asignada',
      date: week.dateRange || `Semana ${week.id}`,
      description: `Requerimientos técnicos del laboratorio práctico, arquitectura de componentes y tests.`,
      pdfUrl: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
      space: 'practica',
    },
    {
      title: `Tarea Enviada: Repositorio GitHub y Reporte de Laboratorio`,
      status: 'Entregado',
      type: 'enviada',
      date: week.dateRange || `Semana ${week.id}`,
      description: `Solución técnica con código fuente funcional versionado en GitHub y reporte PDF.`,
      githubUrl: week.practicalLab?.githubUrl || `https://github.com/devjuancarlos10/daw-lab-semana-${week.id < 10 ? '0' + week.id : week.id}`,
      pdfUrl: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
      space: 'practica',
    },
  ];

  const defaultTheoryResources: WeekResource[] = [
    {
      title: `Sílabo Oficial DAW (IS093A)`,
      type: 'PDF',
      url: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
      space: 'teoria',
    },
    {
      title: `Diapositivas y Lectura: ${week.title}`,
      type: 'Lectura',
      url: 'https://developer.mozilla.org/es/',
      space: 'teoria',
    },
    {
      title: `Repositorio de Referencias Teóricas en GitHub`,
      type: 'GitHub',
      url: `https://github.com/devjuancarlos10/portafolio-web-uncp`,
      space: 'teoria',
    },
  ];

  const defaultPracticeResources: WeekResource[] = [
    {
      title: `Repositorio Oficial de Práctica en GitHub`,
      type: 'GitHub',
      url: week.practicalLab?.githubUrl || `https://github.com/devjuancarlos10/daw-lab-semana-${week.id < 10 ? '0' + week.id : week.id}`,
      space: 'practica',
    },
    {
      title: `Guía Paso a Paso de Laboratorio (PDF)`,
      type: 'PDF',
      url: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
      space: 'practica',
    },
  ];

  const rawAssignments = Array.isArray(week.assignments) ? week.assignments : [];
  const theoryAssignments = rawAssignments.filter(a => !a.space || a.space === 'teoria');
  const practiceAssignments = rawAssignments.filter(a => a.space === 'practica');

  const rawResources = Array.isArray(week.resources) ? week.resources : [];
  const theoryResources = rawResources.filter(r => !r.space || r.space === 'teoria');
  const practiceResources = rawResources.filter(r => r.space === 'practica');

  const theory: SpaceContent = week.theory || {
    teacher: week.theoryTeacher || TEACHER_THEORY,
    teacherRole: 'Responsable de Asignatura (Teoría)',
    title: week.title,
    subtitle: week.subtitle,
    summary: week.summary,
    topics: week.topics || [],
    learningObjectives: week.learningObjectives || [],
    assignments: theoryAssignments.length > 0 ? theoryAssignments : defaultTheoryAssignments,
    resources: theoryResources.length > 0 ? theoryResources : defaultTheoryResources,
    reflection: week.reflection,
  };

  const practice: SpaceContent = week.practice || {
    teacher: week.practiceTeacher || TEACHER_PRACTICE,
    teacherRole: 'Responsable de Asignatura (Práctica)',
    title: week.practicalLab?.title || `Laboratorio Práctico ${week.id}`,
    subtitle: week.subtitle,
    summary: week.practicalLab?.description || week.summary,
    topics: week.topics || [],
    labTitle: week.practicalLab?.title || `Laboratorio Práctico ${week.id}`,
    labDescription: week.practicalLab?.description || '',
    labTechStack: week.practicalLab?.techStack || [],
    labCodeSnippet: week.practicalLab?.codeSnippet,
    labCodeLanguage: week.practicalLab?.codeLanguage || 'typescript',
    labResults: week.practicalLab?.results || [],
    labGithubUrl: week.practicalLab?.githubUrl || `https://github.com/devjuancarlos10/daw-lab-semana-${week.id < 10 ? '0' + week.id : week.id}`,
    assignments: practiceAssignments.length > 0 ? practiceAssignments : defaultPracticeAssignments,
    resources: practiceResources.length > 0 ? practiceResources : defaultPracticeResources,
    reflection: week.reflection,
  };

  return {
    ...week,
    theoryTeacher: week.theoryTeacher || TEACHER_THEORY,
    practiceTeacher: week.practiceTeacher || TEACHER_PRACTICE,
    theory,
    practice,
    practicalLab: {
      ...week.practicalLab,
      githubUrl: week.practicalLab?.githubUrl || practice.labGithubUrl,
    },
  };
}

export const baseAcademicWeeks: AcademicWeek[] = [
  {
    "id": 1,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": "Fundamentos de Tecnologías Web y Entorno de Desarrollo",
    "subtitle": "Exposición de Sílabo, Arquitectura Web (DNS, TCP/IP, HTTP) y Visual Studio Code",
    "summary": "Introducción a la asignatura Desarrollo de Aplicaciones Web (IS093A). Análisis de sistemas web, aplicaciones y sitios web; protocolos HTTP, DNS y TCP/IP; roles frontend, backend y fullstack; y configuración profesional de Visual Studio Code.",
    "dateRange": "Semana 1",
    "status": "completed",
    "topics": [
      "Exposición del sílabo oficial y prueba de diagnóstico",
      "Soluciones web: sistema web, aplicación web, sitio web y página web",
      "Roles en el desarrollo: Frontend, Backend y Fullstack Developer",
      "Herramienta de desarrollo: Visual Studio Code, extensiones y atajos de teclado"
    ],
    "learningObjectives": [
      "Comprender la diferencia entre sitios, sistemas y aplicaciones web interactivas.",
      "Configurar un entorno de desarrollo profesional con Visual Studio Code, extensiones y atajos."
    ],
    "practicalLab": {
      "title": "Laboratorio 01A: Configuración de VS Code y Servidor HTTP Nativo",
      "description": "Configuración del espacio de trabajo en VS Code con extensiones recomendadas, atajos clave y levantamiento de un servidor HTTP nativo con Node.js.",
      "techStack": [
        "VS Code",
        "Node.js",
        "HTTP",
        "Git"
      ],
      "codeLanguage": "javascript",
      "results": [
        "Configuración optimizada de VS Code con atajos y linter.",
        "Servidor HTTP devolviendo payload JSON con cabeceras correctas."
      ],
      "githubUrl": "https://github.com/devjuancarlos10/actividad01.git"
    },
    "assignments": [
      {
        "date": "Semana 1",
        "type": "enviada",
        "space": "practica",
        "title": "Reto semanal",
        "pdfUrl": "/uploads/1791903701527_RETO_SEMANAL_-_CHAHUAYO_MARTINEZ_JUAN_CARLOS.pdf",
        "status": "Asignada",
        "githubUrl": "https://github.com/devjuancarlos10/portafolio-web-uncp.git",
        "description": "Requerimientos técnicos del laboratorio práctico, arquitectura de componentes y tests."
      }
    ],
    "resources": [
      {
        "url": "/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf",
        "type": "PDF",
        "title": "Sílabo Oficial DAW IS093A"
      },
      {
        "url": "/uploads/1791903690022_Guia_Practica_Semana_1.pdf",
        "type": "PDF",
        "space": "practica",
        "title": "Guía de Practica Semanal 1"
      }
    ],
    "reflection": "Comprender los protocolos base permite construir aplicaciones web con fundamentos de ingeniería sólidos.",
    "tags": [
      "HTTP",
      "DNS",
      "TCP/IP",
      "VSCode",
      "Frontend",
      "UNCP"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  },
  {
    "id": 2,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": " HTML5, XML, CSS3, Flexbox/Grid, Diseño Responsivo y SEO",
    "subtitle": "Open Web Platform, Árbol DOM, SEO, Flexbox y Grid Layout",
    "summary": "Construcción de páginas con marcado HTML5 y XML bajo el estándar Open Web Platform. Análisis del árbol DOM, renderizado, ciclo de vida web y optimización SEO. Maquetación con CSS3 mediante Flexbox, Grid y diseño responsivo fluido.",
    "dateRange": "Semana 2",
    "status": "completed",
    "topics": [
      "Estándar Open Web Platform, estructura HTML y XML",
      "Etiquetas principales HTML5, árbol DOM y ciclo de vida de una página web",
      "Optimización en motores de búsqueda (SEO) y compatibilidad entre navegadores",
      "Estándar CSS3: sintaxis, display block/inline/inline-block, unidades absolutas y relativas",
      "Diseño fluido y responsivo con Flexbox, Grid Layout y position"
    ],
    "learningObjectives": [
      "Estructurar documentos HTML5 semánticos y XML válidos.",
      "Optimizar para SEO y compatibilidad entre navegadores.",
      "Dominar Flexbox y CSS Grid para diseño responsivo fluido."
    ],
    "practicalLab": {
      "title": "CASO PRÁCTICO PARA DESARROLLAR SISTEMA DE GESTIÓN DE CITAS MÉDICAS - \"MEDISALUD\"",
      "description": "OBJETIVOS DE LA PRÁCTICA\n1. Aplicar técnicas de elicitación de requerimientos (entrevistas, talleres,\nobservación)\n2. Diferenciar entre requerimientos funcionales y no funcionales\n3. Construir una matriz de elicitación y catálogo de requerimientos\n4. Clasificar los requerimientos según su tipo y prioridad\n",
      "techStack": [],
      "codeLanguage": "css",
      "results": [
        "Estructura 100% semántica y validada.",
        "Diseño fluido sin desbordamientos de 320px a 1920px."
      ]
    },
    "assignments": [
      {
        "grade": "",
        "title": "Formen equipos de 3-4 estudiantes. Deben implementar una Galería de Proyectos Técnicos Responsiva",
        "pdfUrl": "/uploads/1791905547527_Guia_Practica_Semana_2_GRUPAL_.pdf",
        "status": "Entregado",
        "githubUrl": "https://github.com/devjuancarlos10/CHAHUAYO-ZAIR-PRACTICA02.git"
      },
      {
        "date": "Semana Actual",
        "type": "asignada",
        "grade": "",
        "space": "practica",
        "title": "CASO PRÁCTICO PARA DESARROLLAR SISTEMA DE GESTIÓN DE CITAS MÉDICAS - \"MEDISALUD\"",
        "pdfUrl": "/uploads/1791905826638_CHAHUAYO-MARTINEZ-JUAN-CARLOS-GUIA-PRACTICA-02.pdf",
        "status": "Asignada",
        "githubUrl": ""
      }
    ],
    "resources": [
      {
        "url": "/uploads/1791905668596_Guia_Practica_Semana_2_GRUPAL_.pdf",
        "type": "PDF",
        "title": "GUÍA PRÁCTICA SEMANA 02"
      },
      {
        "url": "/uploads/1791905853730_Guia_practica_02.pdf",
        "type": "PDF",
        "space": "practica",
        "title": "ELICITACIÓN Y ANÁLISIS DE REQUERIMIENTOS"
      }
    ],
    "reflection": "La separación adecuada entre la estructura semántica de HTML5 y los estilos responsivos de CSS3 es esencial para crear páginas accesibles.",
    "tags": [
      "HTML5",
      "XML",
      "CSS3",
      "Flexbox",
      "CSSGrid",
      "SEO"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  },
  {
    "id": 3,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": "Frameworks CSS Modernos: Bootstrap y Tailwind CSS",
    "subtitle": "Sistemas de Rejilla, Componentes UI, Utilidades y Práctica Calificada",
    "summary": "Desarrollo ágil de interfaces frontend empleando Bootstrap (Layout, Grid y componentes) y Tailwind CSS (tipografía, spacing, flexbox y Application UI components: badges, dropdowns, forms, shells y navigation).",
    "dateRange": "Semana 3",
    "status": "completed",
    "topics": [
      "Desarrollo con librería CSS Bootstrap: Grid System, Layout y Components",
      "Desarrollo con Tailwind CSS: Tipografía, Backgrounds, Borders y Spacing",
      "Layout en Tailwind: Containers, Columns, Breakpoints y Flexbox utility-first",
      "Application UI: Elements (Avatars, Badges, Dropdowns, Buttons) y Shells",
      "Práctica Calificada 03: Desarrollo integral de un sitio web con CSS"
    ],
    "learningObjectives": [
      "Implementar componentes interactivos con Bootstrap.",
      "Dominar el paradigma utility-first de Tailwind CSS.",
      "Construir un sitio web completo para la Práctica Calificada 03."
    ],
    "practicalLab": {
      "title": "Práctica Calificada 03: Desarrollo de un Sitio Web con Bootstrap y Tailwind",
      "description": "Diseño e implementación de un sitio web comercial aplicando componentes UI modernos de Bootstrap y diseño por utilidades de Tailwind CSS.",
      "techStack": [
        "Bootstrap",
        "Tailwind CSS",
        "HTML5",
        "Responsive Design"
      ],
      "codeSnippet": "<div class=\"max-w-7xl mx-auto px-4 py-8\"><h1 class=\"text-3xl font-bold text-slate-900\">Portal DAW</h1></div>",
      "codeLanguage": "html",
      "results": [
        "Aprobación con nota sobresaliente en la Práctica Calificada 03.",
        "Sitio web 100% responsivo con componentes interactivos."
      ],
      "githubUrl": "https://github.com/juancarlos/daw-lab-semana-03"
    },
    "assignments": [
      {
        "grade": "",
        "title": "Práctica Calificada 03: Sitio Web con CSS Avanzado",
        "pdfUrl": "/uploads/1791906575318_CHAHUAYO_MARTINEZ_JUAN_CARLOS_-_Guia_Practica_Semana_3.pdf",
        "status": "Entregado"
      }
    ],
    "resources": [
      {
        "url": "/uploads/1791906403668_Guia_Practica_Semana_3_GRUPAL.pdf",
        "type": "PDF",
        "title": "GUÍA PRÁCTICA SEMANA 03"
      }
    ],
    "reflection": "Tailwind CSS permite prototipar interfaces únicas a gran velocidad sin salir del archivo HTML/JSX.",
    "tags": [
      "Bootstrap",
      "TailwindCSS",
      "UIComponents",
      "Frontend",
      "Práctica03"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  },
  {
    "id": 4,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": "JavaScript Moderno, TypeScript y Gráficos con Canvas",
    "subtitle": "Motores JS, Estructuras de Control, Closures, DOM y Animaciones en Canvas",
    "summary": "Programación frontend con JavaScript y TypeScript: tipos de datos, estructuras de control, funciones de orden superior, closures y manipulación del DOM. Creación de gráficos interactivos y animaciones utilizando la API Canvas 2D.",
    "dateRange": "Semana 4",
    "status": "completed",
    "topics": [
      "Motores JavaScript (V8), variables (let, const), operadores y tipado en TypeScript",
      "Tipos primitivos y estructurados: Números, Strings, Objects, Arrays y Booleanos",
      "Estructuras de control, bucles y funciones (anónimas, flecha, closures)",
      "Manipulación del DOM con JavaScript: selectores, eventos y estilos dinámicos",
      "Manejo del DOM con Canvas: métodos, propiedades, animaciones y gráficos 2D",
      "Laboratorio 04: Desarrollo de una animación interactiva con JavaScript"
    ],
    "learningObjectives": [
      "Dominar la sintaxis moderna de JavaScript ES6+ y tipos de TypeScript.",
      "Comprender el concepto de closures y funciones de primera clase.",
      "Implementar animaciones fluidas a 60 FPS con Canvas 2D."
    ],
    "practicalLab": {
      "title": "Laboratorio 04: InmoPortal - Animaciones Canvas 2D, Closures y Panel de Rendimiento",
      "description": "Desarrollo del portal inmobiliario 'InmoPortal' con manipulación dinámica del DOM y Canvas 2D. Se aplicó aislamiento de scope mediante IIFE y closures para la retención del estado de animación en el motor hero, animación fluida de partículas interactivas conectadas por proximidad con requestAnimationFrame, cotizador financiero con cálculo de cuotas en tiempo real, radar interactivo en vivo y panel de rendimiento con FPS counter (58 FPS), delta time (16.70 ms) y control de memoria.",
      "techStack": [
        "JavaScript ES6+",
        "HTML5 Canvas",
        "CSS3 Moderno",
        "DOM API",
        "IIFE & Closures",
        "requestAnimationFrame"
      ],
      "codeSnippet": "const crearMotorHero = () => {\n  // IIFE y closures para retención de estado de animación\n  return {\n    actualizar: (w, h) => { /* física de partículas con delta time */ },\n    dibujar: (w, h) => {\n      ctxHero.clearRect(0, 0, w, h);\n      particulas.forEach(p => {\n        ctxHero.beginPath();\n        ctxHero.arc(p.x, p.y, p.r, 0, Math.PI * 2);\n        ctxHero.fillStyle = p.color;\n        ctxHero.fill();\n      });\n      // Conexión dinámica entre partículas cercanas\n      for (let i = 0; i < particulas.length; i++) {\n        for (let j = i + 1; j < particulas.length; j++) {\n          const dx = particulas[i].x - particulas[j].x;\n          const dy = particulas[i].y - particulas[j].y;\n          const dist = Math.sqrt(dx * dx + dy * dy);\n          if (dist < 110) {\n            ctxHero.strokeStyle = `rgba(255,255,255,${(0.04 * (1 - dist / 110))})`;\n            ctxHero.lineWidth = 0.6;\n            ctxHero.beginPath();\n            ctxHero.moveTo(particulas[i].x, particulas[i].y);\n            ctxHero.lineTo(particulas[j].x, particulas[j].y);\n            ctxHero.stroke();\n          }\n        }\n      }\n    }\n  };\n};",
      "codeLanguage": "javascript",
      "results": [
        "Aislamiento de scope con IIFE y closures reteniendo el estado entre frames.",
        "Animación de partículas conectadas con Canvas 2D sincronizado con requestAnimationFrame.",
        "Cotizador inmobiliario dinámico con amortización y cuota mensual en tiempo real.",
        "Radar y mapa interactivo de departamentos con perspectiva 3D simulada.",
        "Panel de rendimiento en tiempo real: monitoreo de 58 FPS, 16.70 ms (DT) y reciclaje de recursos."
      ],
      "githubUrl": "https://github.com/devjuancarlos10/animaciones-inmobiliaria"
    },
    "assignments": [
      {
        "title": "Práctica Calificada 3: Ruleta Dinámica y Sorteo de Equipos en JavaScript Puro",
        "status": "Asignada",
        "type": "asignada",
        "space": "teoria",
        "date": "Semana 4",
        "description": "Examen de Teoría (Docente: Dr. Jaime Suasnabar Terrel). Desarrollo colaborativo en GitHub con ramas y merge: aplicación web de aula virtual con ruleta aleatoria giratoria en Canvas/DOM y sistema de sorteo de equipos.",
        "pdfUrl": "/uploads/PracticaCalificada3.pdf"
      },
      {
        "title": "Actividad 03 (Teoría): Aula Virtual con Ruleta Aleatoria y Sorteo de Equipos",
        "status": "Entregado",
        "type": "enviada",
        "space": "teoria",
        "date": "Semana 4",
        "description": "Entrega grupal de la Práctica Calificada 3. Integrantes: Aroni Salazar Jhon Edison, Chahuayo Martinez Juan Carlos, Salazar Rojas Gabriel Omar, Sanchez Cueva Jefferson Sebastian. Repositorio en GitHub con ramas individuales y merge final.",
        "githubUrl": "https://github.com/Jhon-ArSa/SEMANA04-DAW.git",
        "pdfUrl": "/uploads/PracticaCalificada3.pdf"
      },
      {
        "title": "Guía Práctica Semana 04: Manipulación del DOM, Closures y Canvas API",
        "status": "Asignada",
        "type": "asignada",
        "space": "practica",
        "date": "Semana 4",
        "description": "Implementar IIFE para aislamiento de scope, closures para estado de animación, manipular el árbol DOM dinámicamente y Canvas 2D con requestAnimationFrame.",
        "pdfUrl": "/uploads/Guia_Practica_Semana_4.pdf"
      },
      {
        "title": "Actividad 4 Práctica: InmoPortal - Portal Inmobiliario con Canvas y Cotizador",
        "status": "Entregado",
        "type": "enviada",
        "space": "practica",
        "date": "Semana 4",
        "description": "Solución técnica completa: código fuente versionado en GitHub, implementación de cotizador, animaciones en Canvas 2D, panel de rendimiento e informe PDF con capturas.",
        "githubUrl": "https://github.com/devjuancarlos10/animaciones-inmobiliaria",
        "pdfUrl": "/uploads/CHAHUAYO_MARTINEZ_JUAN_CARLOS_-_actividad_4.pdf"
      }
    ],
    "resources": [
      {
        "title": "Repositorio Grupal en GitHub: SEMANA04-DAW (Actividad 03)",
        "type": "GitHub",
        "url": "https://github.com/Jhon-ArSa/SEMANA04-DAW.git",
        "space": "teoria"
      },
      {
        "title": "Práctica Calificada 3: Enunciado Oficial (Dr. Jaime Suasnabar Terrel)",
        "type": "PDF",
        "url": "/uploads/PracticaCalificada3.pdf",
        "space": "teoria"
      },
      {
        "title": "Repositorio Oficial en GitHub: animaciones-inmobiliaria",
        "type": "GitHub",
        "url": "https://github.com/devjuancarlos10/animaciones-inmobiliaria",
        "space": "practica"
      },
      {
        "title": "Guía Práctica Oficial Semana 04 (UNCP)",
        "type": "PDF",
        "url": "/uploads/Guia_Practica_Semana_4.pdf",
        "space": "practica"
      },
      {
        "title": "Informe de Práctica 04 - Evidencias y Capturas (PDF)",
        "type": "PDF",
        "url": "/uploads/CHAHUAYO_MARTINEZ_JUAN_CARLOS_-_actividad_4.pdf",
        "space": "practica"
      },
      {
        "title": "MDN Web Docs: Guía de Canvas API y requestAnimationFrame",
        "type": "Lectura",
        "url": "https://developer.mozilla.org/es/docs/Web/API/Canvas_API",
        "space": "teoria"
      },
      {
        "title": "Sílabo Oficial DAW (IS093A)",
        "type": "PDF",
        "url": "/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf",
        "space": "teoria"
      }
    ],
    "reflection": "Canvas ofrece un control píxel a píxel que abre las puertas a dashboards avanzados y animaciones de alto rendimiento.",
    "tags": [
      "JavaScript",
      "TypeScript",
      "Canvas",
      "Animaciones",
      "DOM"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  },
  {
    "id": 5,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": "Frameworks JavaScript (React): Componentes y Estilos",
    "subtitle": "Client Side Rendering (CSR), JSX, Props, Children y Modularización CSS",
    "summary": "Introducción a frameworks frontend modernos con React: arquitectura Client Side Rendering, configuración de proyectos con Vite, desarrollo basado en componentes reutilizables, paso de datos con props y children, y técnicas de estilizado (CSS Modules, Styled Components).",
    "dateRange": "Semana 5",
    "status": "completed",
    "topics": [
      "Estructura y operación de un Framework JS: Client Side Rendering (CSR)",
      "Gestión de dependencias y herramientas de creación de proyectos (Vite / npm)",
      "Desarrollo basado en componentes: JSX, Props y Children",
      "Utilización de estilos en Framework JS: Inline, Style Sheets, Style Modules y CSS Frameworks",
      "Laboratorio 05A: Pasar datos con props y children y mostrar en un componente hijo"
    ],
    "learningObjectives": [
      "Entender la arquitectura Client Side Rendering (CSR).",
      "Crear aplicaciones React estructuradas con componentes reutilizables.",
      "Dominar el paso de datos con props y children."
    ],
    "practicalLab": {
      "title": "Laboratorio 05: MediCare San Lucas - Arquitectura React, Props, Children, CSS Modules y Validación CSR",
      "description": "Desarrollo de la SPA clínica 'MediCare San Lucas' utilizando React y Vite. Se implementó una arquitectura modular bajo el Principio de Responsabilidad Única (SRP) con componentes Navbar, HeroSection, Dashboard, MetricCard, ServicesSection, DoctorsSection, AppointmentSection y TechnicalArchitectureModal. Se aplicó el flujo unidireccional de datos tipado con JSDoc, composición avanzada mediante el patrón {children} en Dashboard (integrando Tabla de Triaje y Monitor de Camas UCI), estilización con CSS Modules (*.module.css) con hashing único para evitar colisiones y validación técnica del ciclo de vida de Client-Side Rendering (CSR) e hidratación en el DOM.",
      "techStack": [
        "React",
        "Vite",
        "JSX",
        "Props & Children",
        "CSS Modules",
        "CSR",
        "Lucide React",
        "JSDoc"
      ],
      "codeSnippet": "/**\n * @param {Object} props\n * @param {string} props.title - Nombre del indicador clínico.\n * @param {string|number} props.value - Cifra médica.\n * @param {string} props.change - Variación comparativa.\n * @param {'up'|'down'|'neutral'} props.trend - Dirección.\n * @param {React.ReactNode} [props.children] - Contenido anidado.\n */\nexport const Dashboard = ({ metrics, children }) => (\n  <section className={styles.dashboard}>\n    <div className={styles.metricsGrid}>\n      {metrics.map(m => <MetricCard key={m.id} {...m} />)}\n    </div>\n    {children && <div className={styles.childrenSection}>{children}</div>}\n  </section>\n);",
      "codeLanguage": "javascript",
      "results": [
        "Scaffold moderno con Vite y React prescindiendo de herramientas obsoletas.",
        "Arquitectura desacoplada con 9 componentes modulares respetando SRP.",
        "Flujo unidireccional de datos con props inmutables documentadas con JSDoc.",
        "Patrón de composición con {children} en Dashboard para triaje y monitor UCI.",
        "Aislamiento de scope con CSS Modules (*.module.css) e inline styles dinámicos.",
        "Validación de Client-Side Rendering: HTML inicial vacío e hidratación con createRoot()."
      ],
      "githubUrl": "https://github.com/devjuancarlos10/actividad05-daw.git"
    },
    "assignments": [
      {
        "title": "Sesión Teórica: Instalación de React y 3 Métodos de Creación de Proyectos (CRA, Vite, Next.js)",
        "status": "Entregado",
        "type": "asignada",
        "space": "teoria",
        "date": "Semana 5",
        "description": "Exposición teórica con el Dr. Jaime Suasnabar Terrel: ¿Qué se necesita para crear un proyecto React? Análisis y comandos de las 3 alternativas: Create React App, Vite y Next.js.",
        "pdfUrl": "/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf"
      },
      {
        "title": "Guía Práctica Semana 05: Framework JS (React), CSR, JSX, Props & Children y Estilado",
        "status": "Asignada",
        "type": "asignada",
        "space": "practica",
        "date": "Semana 5",
        "description": "Scaffold con Vite, arquitectura de componentes, implementación del patrón props y children, CSS Modules con hashing único y validación de Client-Side Rendering (CSR).",
        "pdfUrl": "/uploads/Guia_Practica_Semana_5.pdf"
      },
      {
        "title": "Actividad 5 Práctica: MediCare San Lucas - SPA Médica con Props, Children y CSS Modules",
        "status": "Entregado",
        "type": "enviada",
        "space": "practica",
        "date": "Semana 5",
        "description": "Solución técnica completa presentada por Juan Carlos Chahuayo Martínez (Docente: Ing. Miguel Elías Aguilar Coronación). Aplicación React con Vite, telemetría quirúrgica, triaje de emergencias, monitor UCI y validación de CSR.",
        "githubUrl": "https://github.com/devjuancarlos10/actividad05-daw.git",
        "pdfUrl": "/uploads/Chahuayo_Martinez_Juan_-_actividad_5_-_practica.pdf"
      }
    ],
    "resources": [
      {
        "title": "Diapositiva de Clase: 3 Formas de Crear Proyectos con React (Dr. Jaime Suasnabar Terrel)",
        "type": "Diapositiva",
        "url": "/uploads/diapositiva_semana_05_creacion_proyectos_react.jpg",
        "space": "teoria"
      },
      {
        "title": "Documentación Oficial: Crear una Nueva App en React (react.dev)",
        "type": "Lectura",
        "url": "https://es.react.dev/learn/creating-a-new-react-app",
        "space": "teoria"
      },
      {
        "title": "Guía Oficial de Inicio Rápido de Vite (vitejs.dev)",
        "type": "Lectura",
        "url": "https://vitejs.dev/guide/",
        "space": "teoria"
      },
      {
        "title": "Guía Oficial de Instalación de Next.js (nextjs.org)",
        "type": "Lectura",
        "url": "https://nextjs.org/docs/getting-started/installation",
        "space": "teoria"
      },
      {
        "title": "Sílabo Oficial DAW (IS093A)",
        "type": "PDF",
        "url": "/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf",
        "space": "teoria"
      },
      {
        "title": "Repositorio Oficial en GitHub: actividad05-daw (MediCare San Lucas)",
        "type": "GitHub",
        "url": "https://github.com/devjuancarlos10/actividad05-daw.git",
        "space": "practica"
      },
      {
        "title": "Guía Práctica Oficial Semana 05 (UNCP)",
        "type": "PDF",
        "url": "/uploads/Guia_Practica_Semana_5.pdf",
        "space": "practica"
      },
      {
        "title": "Informe de Actividad 5 - Evidencias y Validación CSR (PDF)",
        "type": "PDF",
        "url": "/uploads/Chahuayo_Martinez_Juan_-_actividad_5_-_practica.pdf",
        "space": "practica"
      }
    ],
    "theory": {
      "teacher": "SUASNABAR TERREL JAIME",
      "teacherRole": "Responsable de Asignatura (Teoría)",
      "title": "Fundamentos de React y Creación de Proyectos",
      "subtitle": "¿Qué se necesita para React? 3 Formas de Creación: CRA, Vite y Next.js",
      "summary": "Sesión teórica dictada por el Dr. Jaime Suasnabar Terrel sobre los fundamentos de instalación de React y qué se necesita para inicializar un proyecto. Se explicaron los prerrequisitos de entorno (Node.js LTS, gestores npm/npx) y se contrastaron las 3 formas para crear proyectos en React: Create React App (enfoque clásico de aprendizaje), Vite (bundler moderno y ultrarrápido con soporte ESM nativo) y Next.js (framework fullstack orientado a producción con renderizado en servidor).",
      "topics": [
        "¿Qué se necesita para crear un proyecto React? (Node.js LTS y gestores npm / npx)",
        "Método 1: Create React App (npx create-react-app nombreProyecto)",
        "Método 2: Vite (npm create vite@latest / npm init vite@latest)",
        "Método 3: Next.js (npx create-next-app nombreProyecto)",
        "Comandos de ciclo de vida: cd nombreProyecto, npm install y npm run dev / npm start"
      ],
      "learningObjectives": [
        "Comprender los requisitos de software e instalación de dependencias en el ecosistema React.",
        "Diferenciar las 3 alternativas para inicializar un proyecto React según el tipo de aplicación.",
        "Dominar la ejecución de comandos de terminal para scaffolding y levantamiento de servidores locales."
      ],
      "reflection": "Conocer las 3 alternativas para crear un proyecto en React permite elegir la herramienta más adecuada para cada escenario: Vite para SPAs ágiles y Next.js para plataformas web completas."
    },
    "reflection": "El modelo de componentes en React agiliza el desarrollo y asegura la reutilización del código.",
    "tags": [
      "React",
      "Vite",
      "JSX",
      "Props",
      "Children",
      "CSR"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  },
  {
    "id": 6,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": "Componentes, JSX, TypeScript, Estilos y Consumo de APIs",
    "subtitle": "Teoría: Virtual DOM y TypeScript | Práctica: VetCare Plus SPA con Axios",
    "summary": "Estudio integral del ecosistema React: en teoría se aborda el ciclo de renderizado del Virtual DOM (diffing y reconciliación), la sintaxis JSX, tipado estático con TypeScript, estrategias de estilado (CSS Modules y Tailwind CSS) y transferencia de datos con Props y Children. En la práctica se implementa la SPA 'VetCare Plus' con React Router DOM, hook desacoplado con Axios y cancelación AbortController, y formularios controlados.",
    "dateRange": "Semana 6",
    "status": "completed",
    "topics": [
      "Renderizado HTML en React: Virtual DOM en memoria, algoritmo Diffing y reconciliación sobre el DOM real",
      "Sintaxis JSX (JavaScript eXtensible) y transpilación con Babel",
      "Componentes de Función vs Componentes de Clase",
      "Integración de TypeScript en React: tipado estático, JSX.Element e interfaces de Props",
      "Estrategias de Estilado: CSS global, CSS Modules con hashing único, inline styles y Tailwind CSS",
      "Flujo de datos y composición: Props y Children entre componentes",
      "Enrutamiento SPA del lado del cliente con React Router DOM (BrowserRouter, Routes, Route, NavLink)",
      "Consumo de APIs REST con Axios, Async/Await y AbortController (prevención de memory leaks)",
      "Formularios controlados con useState (onChange / onSubmit) y auditoría CSR en DevTools"
    ],
    "learningObjectives": [
      "Comprender el ciclo de vida del DOM virtual, algoritmo de diffing y reconciliación selectiva.",
      "Desarrollar componentes tipados con TypeScript empleando interfaces de props y JSX.Element.",
      "Configurar y aplicar diversas estrategias de estilado (CSS Modules, Tailwind CSS) en proyectos Vite.",
      "Dominar el enrutamiento SPA, consumo asíncrono con Axios y cancelación de peticiones con AbortController."
    ],
    "theory": {
      "teacher": "SUASNABAR TERREL JAIME",
      "teacherRole": "Responsable de Asignatura (Teoría)",
      "title": "Componentes, JSX, TypeScript y Estilos en React",
      "subtitle": "Actividad de Aprendizaje N° 07A (Mg. Jaime Suasnábar Terrel)",
      "summary": "Sesión teórica correspondiente a la Actividad de Aprendizaje N° 07A desarrollada por el Mg. Jaime Suasnábar Terrel. Se analiza el mecanismo de renderizado mediante Virtual DOM, algoritmo de Diffing y reconciliación con el DOM real; la arquitectura de componentes funcionales y de clase; sintaxis JSX con Babel; tipado estático con TypeScript (interfaces de props y JSX.Element); técnicas de estilado (CSS puro, CSS Modules con hashing, inline styles y configuración de Tailwind CSS con PostCSS/Autoprefixer); y patrones de transferencia de datos con Props y Children.",
      "topics": [
        "Renderizado de HTML en React: Virtual DOM en memoria, Diffing y reconciliación sobre el DOM real",
        "Función de renderizado ReactDOM.render() / createRoot() y punto de montaje en el DOM",
        "Definición y anatomía de un Componente: unidad lógica y reutilizable (HTML, JavaScript, CSS)",
        "Componentes de Clase (extends React.Component, render()) vs Componentes de Función",
        "Sintaxis JSX: expresiones con {}, renderizado condicional (IF, ternario, &&) y bucles .map()",
        "Integración de TypeScript: tipado estático, const element: JSX.Element, interfaces PrimerProps y React.FC",
        "Estrategias de estilado: CSS clásico (*.css), CSS Modules (*.module.css) y estilos inline ({{ }})",
        "Configuración e instalación de Tailwind CSS en Vite: tailwind.config.js, directivas @tailwind y PostCSS",
        "Comunicación entre componentes: flujo unidireccional con Props, datos padre a hijo y Children",
        "Ejercicios teóricos: diseño responsivo de 7 componentes, prop drilling de 4 componentes anidados y tabla con .map()"
      ],
      "learningObjectives": [
        "Comprender el ciclo de renderizado de React, el funcionamiento del Virtual DOM y la reconciliación frente al DOM real.",
        "Estructurar componentes funcionales limpios con JSX y tipado estático mediante interfaces de TypeScript.",
        "Aplicar diversas técnicas de estilado (CSS Modules, inline styles y Tailwind CSS) en aplicaciones frontend.",
        "Dominar la transferencia unidireccional de datos con props y la composición flexible con children."
      ],
      "reflection": "El Virtual DOM junto a la reconciliación selectiva y el tipado estático de TypeScript permiten crear aplicaciones robustas, escalables y con rendimiento predecible."
    },
    "practicalLab": {
      "title": "Laboratorio 06: VetCare Plus - Routing SPA, Consumo de API REST con Axios y Formularios Controlados",
      "description": "Aplicación frontend de página única (SPA) para la gestión hospitalaria 'VetCare Plus - Centro Veterinario de Alta Especialidad'. Integra navegación de múltiples rutas (/, /usuarios, /formulario y 404 personalizado), hook personalizado useUsers con Axios y AbortController para evitar fugas de memoria y llamadas duplicadas, directorio reactivo de pacientes/tutores con renderizado iterativo (.map con key) y condicional, y formulario controlado con useState para emisión instantánea del Carnet Digital de Mascota.",
      "techStack": [
        "React 18",
        "Vite",
        "React Router DOM",
        "Axios",
        "Context API",
        "AbortController",
        "CSS Moderno"
      ],
      "codeSnippet": "// src/hooks/useUsers.js - Consumo con Axios, Async/Await y cancelación AbortController\nimport { useState, useCallback, useRef, useEffect } from 'react';\nimport axios from 'axios';\n\nexport const useUsers = () => {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState(null);\n  const abortControllerRef = useRef(null);\n\n  const loadUsers = useCallback(async () => {\n    // Si hay una petición en curso, cancelarla antes de iniciar una nueva\n    if (abortControllerRef.current) {\n      abortControllerRef.current.abort();\n    }\n    const controller = new AbortController();\n    abortControllerRef.current = controller;\n\n    setLoading(true);\n    setError(null);\n    try {\n      const response = await axios.get('https://jsonplaceholder.typicode.com/users', {\n        signal: controller.signal\n      });\n      setUsers(response.data);\n    } catch (err) {\n      if (axios.isCancel(err) || err.name === 'CanceledError' || err.name === 'AbortError') {\n        return; // Petición cancelada: previene actualizar estado en componentes desmontados\n      }\n      setError(err.message || 'Error de comunicación con la API de pacientes');\n    } finally {\n      setLoading(false);\n    }\n  }, []);\n\n  useEffect(() => {\n    loadUsers();\n    return () => {\n      // Cleanup: cancela peticiones activas al desmontar el componente\n      abortControllerRef.current?.abort();\n    };\n  }, [loadUsers]);\n\n  return { users, loading, error, reload: loadUsers };\n};",
      "codeLanguage": "jsx",
      "results": [
        "SPA 100% funcional con React Router DOM: rutas /, /usuarios, /formulario y fallback * (404 personalizado) con NavLink activo y sin recarga de página.",
        "Custom Hook useUsers implementado con Axios y AbortController en useEffect, previniendo memory leaks y solicitudes zombies.",
        "Directorio de pacientes con renderizado iterativo .map() utilizando key={user.id} estable y estados condicionales de loading, error y respuesta.",
        "Módulo de admisión con formulario controlado (useState), prevención de recarga nativa (e.preventDefault()) y emisión en tiempo real de carnet médico veterinario.",
        "Auditoría en DevTools Network validando comportamiento de Client-Side Rendering (CSR) e interceptación de rutas."
      ],
      "githubUrl": "https://github.com/devjuancarlos10/practica-semana6.git"
    },
    "assignments": [
      {
        "title": "Actividad de Aprendizaje N° 07A: Componentes, JSX, TypeScript y Estilos en React",
        "status": "Asignada",
        "type": "asignada",
        "space": "teoria",
        "date": "Semana 6",
        "description": "Documento teórico-práctico compilado por el Mg. Jaime Suasnábar Terrel sobre Virtual DOM, Diffing, sintaxis JSX, tipado estático con TypeScript, CSS Modules, Tailwind CSS, Props & Children y 5 ejercicios de arquitectura de componentes.",
        "pdfUrl": "/uploads/Guia_Teoria_Semana_06_Componentes_JSX_TypeScript_Estilos.pdf"
      },
      {
        "title": "Guía Práctica Semana 06: Framework JS - Eventos, Renderizado Condicional/Iterativo, Formularios, Routing y Consumo de APIs (Axios)",
        "status": "Asignada",
        "type": "asignada",
        "space": "practica",
        "date": "Semana 6",
        "description": "Guía oficial de laboratorio para la asignatura Desarrollo de Aplicaciones Web (IS093A) impartida por el Ing. Miguel Elías Aguilar Coronación. Contiene requerimientos de Vite, react-router-dom, consumo de API con Axios + async/await y AbortController, y validación CSR.",
        "pdfUrl": "/uploads/Guia_Practica_Semana_6.pdf"
      },
      {
        "title": "Práctica Semana 06: VetCare Plus - SPA Veterinaria, Consumo de API con Axios y Routing",
        "status": "Entregado",
        "type": "enviada",
        "space": "practica",
        "date": "Semana 6",
        "description": "Informe técnico de laboratorio presentado por Juan Carlos Chahuayo Martínez (Docente: Ing. Miguel Elías Aguilar Coronación). Implementación de la SPA VetCare Plus con React Router DOM, hook useUsers con AbortController, directorio de pacientes, carnet médico reactivo y capturas de auditoría en DevTools.",
        "githubUrl": "https://github.com/devjuancarlos10/practica-semana6.git",
        "pdfUrl": "/uploads/informe_practica_semana6.pdf"
      }
    ],
    "resources": [
      {
        "title": "Guía Teórica N° 07A: Componentes, JSX, TypeScript y Estilos (Mg. Jaime Suasnábar Terrel)",
        "type": "PDF",
        "url": "/uploads/Guia_Teoria_Semana_06_Componentes_JSX_TypeScript_Estilos.pdf",
        "space": "teoria"
      },
      {
        "title": "Documentación Oficial: Primeros Componentes en React (react.dev)",
        "type": "Lectura",
        "url": "https://es.react.dev/learn/your-first-component",
        "space": "teoria"
      },
      {
        "title": "Documentación Oficial: Uso de TypeScript en React (react.dev)",
        "type": "Lectura",
        "url": "https://es.react.dev/learn/typescript",
        "space": "teoria"
      },
      {
        "title": "Guía Oficial de Tailwind CSS con Vite (tailwindcss.com)",
        "type": "Lectura",
        "url": "https://tailwindcss.com/docs/guides/vite",
        "space": "teoria"
      },
      {
        "title": "Sílabo Oficial DAW (IS093A)",
        "type": "PDF",
        "url": "/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf",
        "space": "teoria"
      },
      {
        "title": "Repositorio Oficial en GitHub: practica-semana6 (VetCare Plus)",
        "type": "GitHub",
        "url": "https://github.com/devjuancarlos10/practica-semana6.git",
        "space": "practica"
      },
      {
        "title": "Guía Práctica Oficial Semana 06 (UNCP)",
        "type": "PDF",
        "url": "/uploads/Guia_Practica_Semana_6.pdf",
        "space": "practica"
      },
      {
        "title": "Informe de Práctica Semana 06 - Evidencias y Auditoría CSR (PDF)",
        "type": "PDF",
        "url": "/uploads/informe_practica_semana6.pdf",
        "space": "practica"
      },
      {
        "title": "Documentación Oficial: React Router DOM",
        "type": "Lectura",
        "url": "https://reactrouter.com/",
        "space": "practica"
      },
      {
        "title": "Documentación Oficial: Axios HTTP Client",
        "type": "Lectura",
        "url": "https://axios-http.com/docs/intro",
        "space": "practica"
      },
      {
        "title": "API Pública de Prueba: JSONPlaceholder Users",
        "type": "Lectura",
        "url": "https://jsonplaceholder.typicode.com/users",
        "space": "practica"
      }
    ],
    "reflection": "La combinación de tipado estático con TypeScript y estrategias de estilado modulares potencian la arquitectura de componentes en React, mientras que React Router y Axios optimizan la interactividad SPA.",
    "tags": [
      "React 18",
      "Virtual DOM",
      "JSX",
      "TypeScript",
      "Tailwind CSS",
      "CSS Modules",
      "Props & Children",
      "React Router",
      "Axios",
      "AbortController"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  },
  {
    "id": 7,
    "unit": "Unidad I",
    "unitTitle": "Unidad I: Desarrollo Web Frontend",
    "title": "Evaluación Parcial & React Hooks Avanzados",
    "subtitle": "Teoría: Examen Parcial Biblioteca UNCP | Práctica: Fuego & Brasa y LogiTrack Pro™",
    "summary": "Cierre integral de la Unidad I: en Teoría se rindió la Evaluación Parcial dirigida por el Dr. Jaime Suasnábar Terrel, desarrollando un Sistema Web de Biblioteca Universitaria en React, Vite y TypeScript con LocalStorage, gestión de catálogo, préstamos, comprobante digital en PDF y React Router. En Práctica, con el Ing. Miguel Elías Aguilar Coronación, se dominó el uso avanzado de Hooks nativos (useReducer, doble contexto, useMemo, useCallback, useRef) y optimización verificada con React DevTools Profiler y ESLint en los proyectos Fuego & Brasa y LogiTrack Pro™.",
    "dateRange": "Semana 7",
    "status": "completed",
    "topics": [
      "Evaluación Parcial presencial (85 minutos): Sistema de Gestión de Biblioteca Universitaria en React + TypeScript",
      "Ciclo de renderizado, batch updates y doble invocación intencional de React.StrictMode en desarrollo",
      "Efectos secundarios con useEffect, array de dependencias y limpieza (cleanup) con AbortController y cancelación de listeners/timers",
      "Estado global modular con useContext: separación por dominios (ThemeContext y RestaurantContext) para prevenir re-renders monolíticos",
      "Optimización de rendimiento: useMemo para cálculos y filtrados pesados, y useCallback para estabilidad referencial de callbacks",
      "Prevención de renders innecesarios en componentes hijos mediante React.memo",
      "Manipulación eficiente del DOM y persistencia mutable sin re-render con useRef (atajo de teclado '/' y foco de inputs)",
      "Gestión de estado complejo con useReducer: acciones inmutables (ADD_ITEM, UPDATE_QUANTITY, CLEAR_ORDER) e inicialización perezosa (initTasksState)",
      "Diseño e implementación de Custom Hooks reutilizables (useFetch con estado de carga, error y refetch)",
      "Auditoría técnica en React DevTools Profiler (Flamegraph y Ranked Chart) y validación de 0 warnings en ESLint (react-hooks/exhaustive-deps)"
    ],
    "learningObjectives": [
      "Demostrar dominio en la integración de React, Vite y TypeScript modelando un sistema empresarial bajo tiempo limitado.",
      "Gestionar flujos de estado complejos en React combinando useReducer, useState y contextos desacoplados.",
      "Optimizar el árbol de componentes mediante useMemo, useCallback y React.memo respaldado por métricas del Profiler.",
      "Implementar funciones de limpieza estrictas en useEffect para eliminar memory leaks de temporizadores, listeners y peticiones de red.",
      "Cumplir al 100% las Reglas de los Hooks y verificar cero advertencias en el linter react-hooks/exhaustive-deps."
    ],
    "theory": {
      "teacher": "SUASNABAR TERREL JAIME",
      "teacherRole": "Responsable de Asignatura (Teoría)",
      "title": "Evaluación Parcial: Sistema de Gestión de Biblioteca Universitaria",
      "subtitle": "Examen Parcial de Teoría con React, Vite, TypeScript y LocalStorage",
      "summary": "Aplicación de la Evaluación Parcial de la asignatura dictada por el Dr. Jaime Suasnábar Terrel. Los estudiantes desarrollaron en equipos de hasta 4 integrantes un sistema web empresarial en React + Vite + TypeScript para la Biblioteca Central de la UNCP. La solución simula un entorno productivo persistiendo en LocalStorage la gestión de categorías, inventario de libros con control de stock, catálogo de usuarios (estudiantes/docentes), flujo de solicitud de préstamos con comprobante digital descargable en PDF y módulo de historial con React Router.",
      "topics": [
        "Evaluación Parcial presencial (85 minutos) en equipos de hasta 4 estudiantes",
        "Arquitectura modular en React, Vite y TypeScript con tipado estático riguroso",
        "Módulo 1: Gestión de categorías y catálogo de libros (Título, Autor, ISBN, Stock disponible)",
        "Módulo 2: Administración de usuarios (Estudiantes/Docentes) con códigos universitarios sin duplicados",
        "Módulo 3: Flujo de solicitud y préstamo de libros con validación estricta de stock (>0)",
        "Módulo 4: Generación y renderizado de comprobante digital de préstamo con descarga en PDF",
        "Módulo 5: Historial de préstamos activos y devueltos con navegación SPA en React Router",
        "Persistencia íntegra de datos en cliente mediante Web Storage API (LocalStorage)"
      ],
      "learningObjectives": [
        "Demostrar dominio en la integración de React, Vite y TypeScript bajo restricción de tiempo (85 min).",
        "Modelar datos consistentes y tipados con persistencia local simulando bases de datos empresariales.",
        "Implementar validaciones robustas de inventario, stock cero y prevención de duplicados.",
        "Generar documentos digitales formateados (comprobante PDF) y estructurar navegación fluida con React Router."
      ],
      "reflection": "La Evaluación Parcial consolida los conocimientos de la Unidad I, integrando arquitectura de componentes, tipado estático con TypeScript, gestión de inventario y persistencia en cliente sin dependencias de backend."
    },
    "practicalLab": {
      "title": "Laboratorio 07: Fuego & Brasa & LogiTrack Pro™ - React Hooks Avanzados, Optimización y Profiler",
      "description": "Implementación práctica de dos arquitecturas de alta exigencia: 1) 'Fuego & Brasa' (SPA gastronómica con carta de 12 platos, comanda gestionada con useReducer, cálculos financieros con useMemo, DishCard memoizado con React.memo, contextos ThemeContext y RestaurantContext, y useFetch con cancelación); y 2) 'LogiTrack Pro™' (Dashboard de control logístico de flota con useReducer e inicialización perezosa desde localStorage, 0 warnings en ESLint, simulación interactiva de cleanup en useEffect desconectando telemetría satelital, y auditoría con React DevTools Profiler demostrando que solo se re-renderizan los ítems modificados).",
      "techStack": [
        "React 18",
        "Vite",
        "useReducer",
        "useContext",
        "useMemo & useCallback",
        "useRef",
        "React.memo",
        "React DevTools Profiler",
        "ESLint Hooks"
      ],
      "codeSnippet": "// src/reducers/orderReducer.js - Gestión de estado complejo con useReducer y acciones inmutables\nexport const initialOrderState = {\n  items: [],\n  selectedTable: 'Mesa 03',\n  activeWaiter: 'Carlos Mendoza',\n  coupon: null,\n  discountPercent: 0,\n  notes: ''\n};\n\nexport function orderReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_ITEM': {\n      const existing = state.items.find(i => i.id === action.payload.id);\n      if (existing) {\n        return {\n          ...state,\n          items: state.items.map(i =>\n            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i\n          )\n        };\n      }\n      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };\n    }\n    case 'UPDATE_QUANTITY':\n      return {\n        ...state,\n        items: state.items.map(i =>\n          i.id === action.payload.id ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i\n        )\n      };\n    case 'REMOVE_ITEM':\n      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };\n    case 'APPLY_COUPON':\n      return { ...state, coupon: action.payload.code, discountPercent: action.payload.discount };\n    case 'CLEAR_ORDER':\n      return { ...initialOrderState, selectedTable: state.selectedTable };\n    default:\n      return state;\n  }\n}",
      "codeLanguage": "jsx",
      "results": [
        "Desarrollo completo de la SPA 'Fuego & Brasa' con comanda reactiva gobernada por useReducer y doble contexto (ThemeContext y RestaurantContext).",
        "Estabilización referencial de funciones con useCallback y optimización con React.memo en DishCard, evitando re-renders en los 12 platillos al filtrar.",
        "Implementación del Dashboard 'LogiTrack Pro™' con inicialización perezosa (initTasksState) en useReducer para lectura síncrona sin renders en cascada.",
        "Auditoría con React DevTools Profiler verificando que al modificar un despacho sólo se re-renderiza su TaskItem ('Did not render during this commit' en los restantes).",
        "Prueba de cleanup en useEffect con desconexión de telemetría GPS, cancelando clearInterval() y removeEventListener() sin fugas de memoria.",
        "Auditoría de linter con npm run lint arrojando 0 errores y 0 warnings en react-hooks/exhaustive-deps."
      ],
      "githubUrl": "https://github.com/devjuancarlos10/semana07-practica.git"
    },
    "assignments": [
      {
        "title": "Evaluación Parcial: Sistema de Gestión de Biblioteca Universitaria",
        "status": "Asignada",
        "type": "asignada",
        "space": "teoria",
        "date": "Semana 7",
        "description": "Enunciado oficial de la Evaluación Parcial elaborado por el Dr. Jaime Suasnábar Terrel. Desarrollo en React, Vite y TypeScript de un sistema para la Biblioteca Central de la UNCP con LocalStorage, validación de stock, roles de usuario, comprobante digital descargable en PDF y React Router.",
        "pdfUrl": "/uploads/Evaluacion_Parcial_Teoria_Semana_07_Sistema_Biblioteca.pdf"
      },
      {
        "title": "Guía Práctica Semana 07 (Parte 1): React Hooks Nativos, Ciclo de Render y Rendimiento",
        "status": "Asignada",
        "type": "asignada",
        "space": "practica",
        "date": "Semana 7",
        "description": "Guía oficial de laboratorio para la asignatura Desarrollo de Aplicaciones Web (IS093A) impartida por el Ing. Miguel Elías Aguilar Coronación. Ejercicio paso a paso de useState, useEffect con AbortController, useContext modular, useMemo, useCallback, useRef y reglas de Hooks.",
        "pdfUrl": "/uploads/Guia_Practica_Semana_07.pdf"
      },
      {
        "title": "Guía Práctica Semana 07 (2° Parte): Dashboard de Gestión con Estado Complejo y Profiler",
        "status": "Asignada",
        "type": "asignada",
        "space": "practica",
        "date": "Semana 7",
        "description": "Especificación técnica de la segunda parte de laboratorio: useReducer para listas, useContext para tema con persistencia, useMemo para filtrado, useCallback para handlers, useRef para autofocus, y validación con React DevTools Profiler y ESLint.",
        "pdfUrl": "/uploads/Guia_Practica_Semana_07_Parte_2.pdf"
      },
      {
        "title": "Práctica Semana 07 (Parte 1): Fuego & Brasa - SPA de Pedidos con Hooks y Optimización",
        "status": "Entregado",
        "type": "enviada",
        "space": "practica",
        "date": "Semana 7",
        "description": "Informe técnico presentado por Juan Carlos Chahuayo Martínez (Docente: Ing. Miguel Elías Aguilar Coronación). Implementación de Fuego & Brasa con useReducer, doble contexto, useFetch desacoplado con AbortController, memoización con useMemo y React.memo, y atajos con useRef.",
        "githubUrl": "https://github.com/devjuancarlos10/semana07-practica.git",
        "pdfUrl": "/uploads/Informe_Practica_Semana_07_Fuego_y_Brasa.pdf"
      },
      {
        "title": "Práctica Semana 07 (Parte 2): LogiTrack Pro™ - Dashboard de Flota, Profiler y Cleanup",
        "status": "Entregado",
        "type": "enviada",
        "space": "practica",
        "date": "Semana 7",
        "description": "Informe técnico de la segunda parte presentado por Juan Carlos Chahuayo Martínez. Dashboard logístico con 0 warnings en ESLint, inicialización perezosa en useReducer, auditoría con React DevTools Profiler y validación de cleanup de telemetría en useEffect.",
        "githubUrl": "https://github.com/devjuancarlos10/semana07-practica-02.git",
        "pdfUrl": "/uploads/Informe_Practica_Semana_07_Parte_2_LogiTrack_Pro.pdf"
      }
    ],
    "resources": [
      {
        "title": "Evaluación Parcial Oficial: Enunciado del Sistema de Biblioteca Universitaria (Dr. Jaime Suasnábar Terrel)",
        "type": "PDF",
        "url": "/uploads/Evaluacion_Parcial_Teoria_Semana_07_Sistema_Biblioteca.pdf",
        "space": "teoria"
      },
      {
        "title": "Documentación Oficial: React con TypeScript (react.dev)",
        "type": "Lectura",
        "url": "https://es.react.dev/learn/typescript",
        "space": "teoria"
      },
      {
        "title": "Documentación MDN: Web Storage API (localStorage)",
        "type": "Lectura",
        "url": "https://developer.mozilla.org/es/docs/Web/API/Window/localStorage",
        "space": "teoria"
      },
      {
        "title": "Sílabo Oficial DAW (IS093A)",
        "type": "PDF",
        "url": "/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf",
        "space": "teoria"
      },
      {
        "title": "Repositorio Oficial en GitHub: semana07-practica (Fuego & Brasa)",
        "type": "GitHub",
        "url": "https://github.com/devjuancarlos10/semana07-practica.git",
        "space": "practica"
      },
      {
        "title": "Repositorio Oficial en GitHub: semana07-practica-02 (LogiTrack Pro™)",
        "type": "GitHub",
        "url": "https://github.com/devjuancarlos10/semana07-practica-02.git",
        "space": "practica"
      },
      {
        "title": "Guía Práctica Oficial Semana 07 (Parte 1) (UNCP)",
        "type": "PDF",
        "url": "/uploads/Guia_Practica_Semana_07.pdf",
        "space": "practica"
      },
      {
        "title": "Guía Práctica Oficial Semana 07 (2° Parte) (UNCP)",
        "type": "PDF",
        "url": "/uploads/Guia_Practica_Semana_07_Parte_2.pdf",
        "space": "practica"
      },
      {
        "title": "Informe Técnico: Fuego & Brasa - React Hooks (PDF)",
        "type": "PDF",
        "url": "/uploads/Informe_Practica_Semana_07_Fuego_y_Brasa.pdf",
        "space": "practica"
      },
      {
        "title": "Informe Técnico: LogiTrack Pro™ - Profiler & ESLint (PDF)",
        "type": "PDF",
        "url": "/uploads/Informe_Practica_Semana_07_Parte_2_LogiTrack_Pro.pdf",
        "space": "practica"
      },
      {
        "title": "Documentación Oficial: Referencia de Hooks en React (react.dev)",
        "type": "Lectura",
        "url": "https://es.react.dev/reference/react",
        "space": "practica"
      },
      {
        "title": "Guía Oficial del Profiler de React DevTools",
        "type": "Lectura",
        "url": "https://es.react.dev/learn/react-developer-tools",
        "space": "practica"
      }
    ],
    "reflection": "La combinación de rigor arquitectónico en la Evaluación Parcial de Teoría con el dominio de optimización y Profiler en la Práctica consolida un cierre sobresaliente de la Unidad I en Desarrollo Web Frontend.",
    "tags": [
      "EvaluacionParcial",
      "React 18",
      "TypeScript",
      "LocalStorage",
      "useReducer",
      "useContext",
      "useMemo",
      "useCallback",
      "useRef",
      "Profiler"
    ],
    "theoryTeacher": "SUASNABAR TERREL JAIME",
    "practiceTeacher": "AGUILAR CORONACIÓN MIGUEL ELIAS"
  }
];

export const academicWeeks: AcademicWeek[] = baseAcademicWeeks.map(resolveWeekSpaces);
