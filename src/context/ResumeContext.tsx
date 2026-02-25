import { createContext, useContext, useState, useCallback } from 'react';
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
} from '../types/resume';

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
      period: '2025',
      details: 'Full-stack resume builder with live preview and ATS-friendly output.',
    },
  ],
  skills: 'React, TypeScript, Node.js, CSS, REST APIs, Git',
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
  setSkills: (s: string) => void;
  setLinks: (l: Links) => void;
  loadSampleData: () => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(initialResumeData);

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

  const setSkills = useCallback((s: string) => {
    setData((prev) => ({ ...prev, skills: s }));
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
