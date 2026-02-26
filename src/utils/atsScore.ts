import type { ResumeData } from '../types/resume';

const MAX_SCORE = 100;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasNumberInBullet(text: string | undefined): boolean {
  if (!text || !text.trim()) return false;
  return /\d|%|\bk\b/i.test(text);
}

function skillsCount(skills: string): number {
  return skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean).length;
}

function educationIsComplete(entry: { institution: string; degree: string; period: string }): boolean {
  return Boolean(
    entry.institution?.trim() && entry.degree?.trim() && entry.period?.trim()
  );
}

export type ATSResult = {
  score: number;
  suggestions: string[];
};

export function computeATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];

  const summaryWords = wordCount(data.summary);
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else if (data.summary.trim()) {
    if (summaryWords < 40) suggestions.push('Write a stronger summary (40–120 words).');
    else if (summaryWords > 120) suggestions.push('Shorten your summary to 40–120 words.');
  } else {
    suggestions.push('Add a professional summary (40–120 words).');
  }

  if (data.projects.length >= 2) {
    score += 10;
  } else if (data.projects.filter((p) => p.name?.trim()).length < 2) {
    suggestions.push('Add at least 2 projects.');
  }

  if (data.experience.some((e) => e.role?.trim() || e.company?.trim())) {
    score += 10;
  } else {
    suggestions.push('Add at least 1 experience entry.');
  }

  const skillItems = skillsCount(data.skills);
  if (skillItems >= 8) {
    score += 10;
  } else if (skillItems > 0) {
    suggestions.push('Add more skills (target 8+).');
  } else {
    suggestions.push('Add skills (comma-separated, target 8+).');
  }

  const hasLink = Boolean(
    (data.links.github && data.links.github.trim()) ||
    (data.links.linkedin && data.links.linkedin.trim())
  );
  if (hasLink) {
    score += 10;
  } else {
    suggestions.push('Add GitHub or LinkedIn link.');
  }

  const hasMeasurable =
    data.experience.some((e) => hasNumberInBullet(e.details)) ||
    data.projects.some((p) => hasNumberInBullet(p.details));
  if (hasMeasurable) {
    score += 15;
  } else if (
    data.experience.some((e) => e.details?.trim()) ||
    data.projects.some((p) => p.details?.trim())
  ) {
    suggestions.push('Add measurable impact (numbers, %, etc.) in bullets.');
  } else if (data.experience.length > 0 || data.projects.some((p) => p.name?.trim())) {
    suggestions.push('Add measurable impact (numbers, %, etc.) in experience or project details.');
  }

  const educationComplete =
    data.education.length > 0 &&
    data.education.some((e) => educationIsComplete(e));
  if (educationComplete) {
    score += 10;
  } else if (data.education.some((e) => e.institution || e.degree || e.period)) {
    suggestions.push('Complete education fields (institution, degree, period).');
  }

  score = Math.min(score, MAX_SCORE);
  return {
    score,
    suggestions: suggestions.slice(0, 3),
  };
}

/** Top 3 improvements for the improvement panel (Step 4). Does not affect score. */
export function getTopImprovements(data: ResumeData): string[] {
  const list: string[] = [];

  const projectCount = data.projects.filter((p) => p.name?.trim()).length;
  if (projectCount < 2) {
    list.push('Add at least 2 projects to strengthen your profile.');
  }

  const hasMeasurable =
    data.experience.some((e) => hasNumberInBullet(e.details)) ||
    data.projects.some((p) => hasNumberInBullet(p.details));
  if (!hasMeasurable && (data.experience.some((e) => e.details?.trim()) || data.projects.some((p) => p.details?.trim()))) {
    list.push('Add measurable impact (numbers, %, results) in experience or project bullets.');
  } else if (!hasMeasurable && (data.experience.length > 0 || projectCount > 0)) {
    list.push('Add measurable impact (numbers, %) when you add bullet points.');
  }

  const summaryWords = wordCount(data.summary);
  if (data.summary.trim() && summaryWords < 40) {
    list.push('Expand your summary to at least 40 words for stronger ATS alignment.');
  }

  const skillItems = skillsCount(data.skills);
  if (skillItems < 8 && (skillItems > 0 || data.skills.trim())) {
    list.push('Add more skills (target 8+) to improve keyword match.');
  }

  if (!data.experience.some((e) => e.role?.trim() || e.company?.trim())) {
    list.push('Add experience or internship/project work to show practical application.');
  }

  return list.slice(0, 3);
}
