import type { ResumeData } from '../types/resume';

function line(str: string): string {
  return str.trim() || '';
}

function sectionTitle(title: string): string {
  return `\n${title}\n${'-'.repeat(Math.min(title.length, 40))}\n`;
}

export function resumeToPlainText(data: ResumeData): string {
  const { personal, summary, education, experience, projects, skills, links } = data;
  const parts: string[] = [];

  parts.push(line(personal.name) || 'Your Name');
  const contact = [personal.email, personal.phone, personal.location]
    .filter(Boolean)
    .join(' · ');
  if (contact) parts.push(contact);
  if (links.github?.trim()) parts.push(links.github);
  if (links.linkedin?.trim()) parts.push(links.linkedin);
  parts.push(''); // blank after contact

  if (summary.trim()) {
    parts.push(sectionTitle('Summary'));
    parts.push(summary.trim());
    parts.push('');
  }

  if (education.some((e) => e.institution?.trim() || e.degree?.trim())) {
    parts.push(sectionTitle('Education'));
    education.forEach((e) => {
      if (e.institution?.trim() || e.degree?.trim()) {
        parts.push(line(e.institution) || 'Institution');
        if (e.degree) parts.push(line(e.degree));
        if (e.period) parts.push(line(e.period));
        if (e.details?.trim()) parts.push(line(e.details));
        parts.push('');
      }
    });
  }

  if (experience.some((e) => e.role?.trim() || e.company?.trim())) {
    parts.push(sectionTitle('Experience'));
    experience.forEach((e) => {
      if (e.role?.trim() || e.company?.trim()) {
        parts.push(line(e.role) || 'Role');
        parts.push(line(e.company));
        if (e.period) parts.push(line(e.period));
        if (e.details?.trim()) parts.push(line(e.details));
        parts.push('');
      }
    });
  }

  if (projects.some((p) => p.name?.trim())) {
    parts.push(sectionTitle('Projects'));
    projects.forEach((p) => {
      if (p.name?.trim()) {
        parts.push(line(p.name));
        if (p.description?.trim()) parts.push(line(p.description));
        if (p.period) parts.push(line(p.period));
        if (p.techStack?.length) parts.push(p.techStack.join(', '));
        if (p.details?.trim()) parts.push(line(p.details));
        if (p.liveUrl?.trim()) parts.push(line(p.liveUrl));
        if (p.githubUrl?.trim()) parts.push(line(p.githubUrl));
        parts.push('');
      }
    });
  }

  const allSkills = [
    ...(skills.technical || []),
    ...(skills.soft || []),
    ...(skills.tools || []),
  ].filter(Boolean);
  if (allSkills.length > 0) {
    parts.push(sectionTitle('Skills'));
    parts.push(allSkills.join(', '));
    parts.push('');
  }

  if (links.github?.trim() || links.linkedin?.trim()) {
    parts.push(sectionTitle('Links'));
    if (links.github?.trim()) parts.push(links.github);
    if (links.linkedin?.trim()) parts.push(links.linkedin);
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
