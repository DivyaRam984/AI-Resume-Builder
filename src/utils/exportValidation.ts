import type { ResumeData } from '../types/resume';

/** Returns true if we should show the "may look incomplete" warning. Does NOT block export. */
export function shouldWarnIncomplete(data: ResumeData): boolean {
  const hasName = Boolean(data.personal.name?.trim());
  const hasProject = data.projects.some((p) => p.name?.trim());
  const hasExperience = data.experience.some((e) => e.role?.trim() || e.company?.trim());
  if (!hasName) return true;
  if (!hasProject && !hasExperience) return true;
  return false;
}
