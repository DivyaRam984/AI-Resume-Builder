import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type {
  ResumeData,
  PersonalInfo,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
  Links,
} from '../types/resume';
import {
  initialResumeData,
  createEmptyEducation,
  createEmptyExperience,
  createEmptyProject,
  emptySkillsData,
  migrateSkillsFromString,
} from '../types/resume';
import type { SkillsData } from '../types/resume';

const STORAGE_KEY = 'resumeBuilderData';

function loadStoredData(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialResumeData;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object' && 'personal' in parsed) {
      const p = parsed as Record<string, unknown>;
      const skills =
        typeof p.skills === 'string'
          ? migrateSkillsFromString(p.skills)
          : (p.skills && typeof p.skills === 'object' && 'technical' in (p.skills as object))
            ? { ...emptySkillsData, ...(p.skills as object) } as SkillsData
            : initialResumeData.skills;
      const rawProjects = Array.isArray(p.projects) ? (p.projects as ProjectEntry[]) : initialResumeData.projects;
      const projects = rawProjects.map((proj) => ({
        ...createEmptyProject(),
        ...proj,
        id: proj.id || crypto.randomUUID(),
        description: proj.description ?? '',
        techStack: Array.isArray(proj.techStack) ? proj.techStack : [],
        liveUrl: proj.liveUrl ?? '',
        githubUrl: proj.githubUrl ?? '',
      }));
      return {
        personal: { ...initialResumeData.personal, ...(p.personal as object) },
        summary: typeof p.summary === 'string' ? p.summary : initialResumeData.summary,
        education: Array.isArray(p.education) ? (p.education as EducationEntry[]) : initialResumeData.education,
        experience: Array.isArray(p.experience) ? (p.experience as ExperienceEntry[]) : initialResumeData.experience,
        projects,
        skills,
        links: { ...initialResumeData.links, ...(p.links as object) },
      };
    }
  } catch {
    /* ignore */
  }
  return initialResumeData;
}

const SAMPLE_DATA: ResumeData = {
  personal: {
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary:
    'Software engineer with 5+ years building web applications. Focus on React, TypeScript, and clean architecture. Passionate about UX and performance.',
  education: [
    {
      id: 'ed1',
      institution: 'State University',
      degree: 'B.S. Computer Science',
      period: '2015 – 2019',
      details: 'Relevant coursework: Data structures, Algorithms, Databases.',
    },
  ],
  experience: [
    {
      id: 'ex1',
      role: 'Senior Frontend Engineer',
      company: 'Tech Corp',
      period: '2021 – Present',
      details:
        'Lead frontend for customer dashboard. Migrated legacy stack to React. Improved Core Web Vitals by 40%.',
    },
    {
      id: 'ex2',
      role: 'Software Engineer',
      company: 'Startup Inc',
      period: '2019 – 2021',
      details: 'Built and shipped features for B2B SaaS. Collaborated with design and product.',
    },
  ],
  projects: [
    {
      id: 'pr1',
      name: 'AI Resume Builder',
      description: 'Full-stack resume builder with live preview and ATS-friendly output.',
      period: '2025',
      details: '',
      techStack: ['React', 'TypeScript', 'Vite'],
      liveUrl: '',
      githubUrl: '',
    },
  ],
  skills: {
    technical: ['React', 'TypeScript', 'Node.js', 'CSS', 'REST APIs'],
    soft: ['Problem Solving', 'Communication'],
    tools: ['Git'],
  },
  links: {
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
  },
};

type ResumeContextValue = {
  data: ResumeData;
  setPersonal: (p: PersonalInfo) => void;
  setSummary: (s: string) => void;
  setEducation: (list: EducationEntry[]) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, patch: Partial<EducationEntry>) => void;
  setExperience: (list: ExperienceEntry[]) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, patch: Partial<ExperienceEntry>) => void;
  setProjects: (list: ProjectEntry[]) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, patch: Partial<ProjectEntry>) => void;
  setSkills: (s: SkillsData) => void;
  addSkill: (category: keyof SkillsData, skill: string) => void;
  removeSkill: (category: keyof SkillsData, index: number) => void;
  suggestSkills: () => Promise<void>;
  setLinks: (l: Links) => void;
  loadSampleData: () => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(loadStoredData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const setPersonal = useCallback((p: PersonalInfo) => {
    setData((prev) => ({ ...prev, personal: p }));
  }, []);

  const setSummary = useCallback((s: string) => {
    setData((prev) => ({ ...prev, summary: s }));
  }, []);

  const setEducation = useCallback((list: EducationEntry[]) => {
    setData((prev) => ({ ...prev, education: list }));
  }, []);

  const addEducation = useCallback(() => {
    setData((prev) => ({ ...prev, education: [...prev.education, createEmptyEducation()] }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const updateEducation = useCallback((id: string, patch: Partial<EducationEntry>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }, []);

  const setExperience = useCallback((list: ExperienceEntry[]) => {
    setData((prev) => ({ ...prev, experience: list }));
  }, []);

  const addExperience = useCallback(() => {
    setData((prev) => ({ ...prev, experience: [...prev.experience, createEmptyExperience()] }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const updateExperience = useCallback((id: string, patch: Partial<ExperienceEntry>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }, []);

  const setProjects = useCallback((list: ProjectEntry[]) => {
    setData((prev) => ({ ...prev, projects: list }));
  }, []);

  const addProject = useCallback(() => {
    setData((prev) => ({ ...prev, projects: [...prev.projects, createEmptyProject()] }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  }, []);

  const updateProject = useCallback((id: string, patch: Partial<ProjectEntry>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);

  const setSkills = useCallback((s: SkillsData) => {
    setData((prev) => ({ ...prev, skills: s }));
  }, []);

  const addSkill = useCallback((category: keyof SkillsData, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setData((prev) => {
      const arr = prev.skills[category];
      if (arr.includes(trimmed)) return prev;
      return {
        ...prev,
        skills: { ...prev.skills, [category]: [...arr, trimmed] },
      };
    });
  }, []);

  const removeSkill = useCallback((category: keyof SkillsData, index: number) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index),
      },
    }));
  }, []);

  const suggestSkills = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setData((prev) => ({
      ...prev,
      skills: {
        technical: [...new Set([...prev.skills.technical, 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'])],
        soft: [...new Set([...prev.skills.soft, 'Team Leadership', 'Problem Solving'])],
        tools: [...new Set([...prev.skills.tools, 'Git', 'Docker', 'AWS'])],
      },
    }));
  }, []);

  const setLinks = useCallback((l: Links) => {
    setData((prev) => ({ ...prev, links: l }));
  }, []);

  const loadSampleData = useCallback(() => {
    setData(JSON.parse(JSON.stringify(SAMPLE_DATA)));
  }, []);

  const value: ResumeContextValue = {
    data,
    setPersonal,
    setSummary,
    setEducation,
    addEducation,
    removeEducation,
    updateEducation,
    setExperience,
    addExperience,
    removeExperience,
    updateExperience,
    setProjects,
    addProject,
    removeProject,
    updateProject,
    setSkills,
    addSkill,
    removeSkill,
    suggestSkills,
    setLinks,
    loadSampleData,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
