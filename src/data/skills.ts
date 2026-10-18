export interface Skill {
  name: string;
  level: number;
  category?: string;
}

export const defaultFrontendSkills: Skill[] = [
  {
    "name": "React / Next.js",
    "level": 90
  },
  {
    "name": "TypeScript",
    "level": 85
  },
  {
    "name": "HTML5 / CSS3",
    "level": 95
  },
  {
    "name": "Tailwind CSS",
    "level": 80
  },
  {
    "name": "MySQL",
    "level": 70
  }
];

export const defaultBackendSkills: Skill[] = [
  {
    "name": "Node.js / Express",
    "level": 85
  },
  {
    "name": "PostgreSQL",
    "level": 80
  },
  {
    "name": "Prisma ORM",
    "level": 75
  },
  {
    "name": "REST APIs",
    "level": 88
  }
];

export const defaultTools: string[] = [
  'Git', 'Docker', 'Figma', 'VS Code', 'Postman',
  'Linux', 'Vercel', 'AWS', 'Jest', 'GitHub Actions'
];
