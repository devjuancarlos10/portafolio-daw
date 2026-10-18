export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  university?: string;
  yearsExp?: string;
  projectsCount?: string;
  tagline?: string;
}

export const defaultProfile: ProfileData = {
  name: 'Juan Carlos',
  title: 'Desarrollador Web Full Stack',
  bio: 'Soy un desarrollador web apasionado por crear soluciones digitales que combinen funcionalidad impecable con un diseño visual atractivo. Estudiante de Ingeniería de Sistemas en la UNCP.',
  location: 'Huancayo, Perú',
  email: 'juancarlos@email.com',
  github: 'https://github.com/juancarlos',
  linkedin: 'https://linkedin.com/in/juancarlos',
  avatarUrl: '',
  resumeUrl: '/uploads/1791891357478_Silabo_-_IS093A_-_DESARROLLO_DE_APLICACIONES_WEB.pdf',
  university: 'UNCP',
  yearsExp: '3+',
  projectsCount: '15+',
  tagline: 'Creo experiencias digitales que combinan diseño elegante con código limpio y funcional.'
};
