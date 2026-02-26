export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details?: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  details?: string;
};

export type ProjectEntry = {
  id: string;
  name: string;
  description?: string;
  period?: string;
  details?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export type SkillsData = {
  technical: string[];
  soft: string[];
  tools: string[];
};

export type Links = {
  github: string;
  linkedin: string;
};

export type ResumeData = {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillsData;
  links: Links;
};

export const emptyPersonal: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
};

export const emptyLinks: Links = {
  github: '',
  linkedin: '',
};

export function createEmptyEducation(): EducationEntry {
  return { id: crypto.randomUUID(), institution: '', degree: '', period: '', details: '' };
}

export function createEmptyExperience(): ExperienceEntry {
  return { id: crypto.randomUUID(), role: '', company: '', period: '', details: '' };
}

export function createEmptyProject(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    period: '',
    details: '',
    techStack: [],
    liveUrl: '',
    githubUrl: '',
  };
}

export const emptySkillsData: SkillsData = {
  technical: [],
  soft: [],
  tools: [],
};

export function migrateSkillsFromString(s: string): SkillsData {
  const list = s.split(',').map((x) => x.trim()).filter(Boolean);
  return { technical: list, soft: [], tools: [] };
}

export const initialResumeData: ResumeData = {
  personal: { ...emptyPersonal },
  summary: '',
  education: [createEmptyEducation()],
  experience: [createEmptyExperience()],
  projects: [createEmptyProject()],
  skills: { ...emptySkillsData },
  links: { ...emptyLinks },
};
