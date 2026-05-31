export const profile = {
  preName: 'The Portfolio of',
  firstName: 'NOUR',
  lastName: 'ELDIN',
  tagline: 'A FULL-STACK ENGINEER',
  role: 'Full-Stack Engineer & Tech Entrepreneur',
  bio: 'Building scalable tech solutions and digital products. Managing code and business infrastructure to launch the next generation of startups.',
  location: 'Giza, Egypt',
  locationFlag: '🇪🇬',
  available: false,
  availabilityNote: 'Focused on work & study',
  photo: '/profile-photo.jpg',
}

export const socials = [
  {
    label: 'GitHub',
    handle: 'noureldin-mahmoud',
    href: 'https://github.com/noureldin-mahmoud',
    icon: 'github' as const,
  },
  {
    label: 'LinkedIn',
    handle: 'Noureldin Mahmoud',
    href: 'https://www.linkedin.com/in/noureldin-mahmoud-422612389/',
    icon: 'linkedin' as const,
  },
  {
    label: 'Email',
    handle: 'noureldeen.mahmoud.fathy@gmail.com',
    href: 'mailto:noureldeen.mahmoud.fathy@gmail.com',
    icon: 'mail' as const,
  },
]

export const email = 'noureldeen.mahmoud.fathy@gmail.com'

export const stackGroups = [
  {
    title: 'Languages & Core',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Python'],
  },
  {
    title: 'Databases & Tech',
    items: ['SQL', 'Database Management', 'Software Engineering Principles'],
  },
  {
    title: 'Version Control',
    items: ['Git', 'GitHub'],
  },
]

export const projects: {
  title: string
  description: string
  tags: string[]
  href?: string
  repo?: string
}[] = []

export const cv = {
  overview:
    'I am a Business Technology student at CIC/CBU and an aspiring Tech Entrepreneur. I focus on software engineering, database design, and business strategy. My goal is simple: bridging the gap between clean code and scalable business models to build products that solve real-world problems.',
  academic: {
    program: 'BTech in Business Technology — Dual Degree Program',
    institutions: [
      'Canadian International College (CIC)',
      'Cape Breton University (CBU), Canada',
    ],
    timeline: '2025 – Present (First-Year Student)',
    focus: [
      'Software Engineering',
      'Full-Stack Development',
      'Business Infrastructure',
    ],
  },
}
