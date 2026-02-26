import type { ResumeData, SkillsData } from '../types/resume';

const MAX_SCORE = 100;

const ACTION_VERBS = [
  'built', 'led', 'designed', 'improved', 'created', 'developed', 'implemented',
  'managed', 'delivered', 'achieved', 'launched', 'optimized', 'established',
  'drove', 'increased', 'reduced', 'coordinated', 'executed', 'spearheaded',
  'transformed', 'streamlined', 'automated', 'scaled', 'mentored', 'shipped',
];

function skillsCount(skills: SkillsData): number {
  return (skills.technical?.length ?? 0) + (skills.soft?.length ?? 0) + (skills.tools?.length ?? 0);
}

function summaryHasActionVerbs(summary: string): boolean {
  const lower = summary.trim().toLowerCase();
  return ACTION_VERBS.some((verb) => lower.includes(verb));
}

export type ATSRule = {
  key: string;
  points: number;
  earned: boolean;
  suggestion: string;
};

export type ATSResult = {
  score: number;
  suggestions: string[];
  rules: ATSRule[];
};

export function computeATSScore(data: ResumeData): ATSResult {
  const rules: ATSRule[] = [];
  let score = 0;

  const nameOk = Boolean(data.personal.name?.trim());
  rules.push({
    key: 'name',
    points: 10,
    earned: nameOk,
    suggestion: 'Add your name (+10 points)',
  });
  if (nameOk) score += 10;

  const emailOk = Boolean(data.personal.email?.trim());
  rules.push({
    key: 'email',
    points: 10,
    earned: emailOk,
    suggestion: 'Add your email (+10 points)',
  });
  if (emailOk) score += 10;

  const summaryLongEnough = (data.summary?.trim().length ?? 0) > 50;
  rules.push({
    key: 'summary',
    points: 10,
    earned: summaryLongEnough,
    suggestion: 'Add a professional summary longer than 50 characters (+10 points)',
  });
  if (summaryLongEnough) score += 10;

  const experienceWithBullets = data.experience.some(
    (e) => (e.role?.trim() || e.company?.trim()) && (e.details?.trim() ?? '').length > 0
  );
  rules.push({
    key: 'experience-bullets',
    points: 15,
    earned: experienceWithBullets,
    suggestion: 'Add at least 1 experience entry with bullet points (+15 points)',
  });
  if (experienceWithBullets) score += 15;

  const hasEducation = data.education.some(
    (e) => e.institution?.trim() || e.degree?.trim() || e.period?.trim()
  );
  rules.push({
    key: 'education',
    points: 10,
    earned: hasEducation,
    suggestion: 'Add at least 1 education entry (+10 points)',
  });
  if (hasEducation) score += 10;

  const skillsOk = skillsCount(data.skills) >= 5;
  rules.push({
    key: 'skills',
    points: 10,
    earned: skillsOk,
    suggestion: 'Add at least 5 skills (+10 points)',
  });
  if (skillsOk) score += 10;

  const hasProject = data.projects.some((p) => p.name?.trim());
  rules.push({
    key: 'project',
    points: 10,
    earned: hasProject,
    suggestion: 'Add at least 1 project (+10 points)',
  });
  if (hasProject) score += 10;

  const phoneOk = Boolean(data.personal.phone?.trim());
  rules.push({
    key: 'phone',
    points: 5,
    earned: phoneOk,
    suggestion: 'Add your phone number (+5 points)',
  });
  if (phoneOk) score += 5;

  const linkedinOk = Boolean(data.links.linkedin?.trim());
  rules.push({
    key: 'linkedin',
    points: 5,
    earned: linkedinOk,
    suggestion: 'Add your LinkedIn URL (+5 points)',
  });
  if (linkedinOk) score += 5;

  const githubOk = Boolean(data.links.github?.trim());
  rules.push({
    key: 'github',
    points: 5,
    earned: githubOk,
    suggestion: 'Add your GitHub URL (+5 points)',
  });
  if (githubOk) score += 5;

  const actionVerbsOk = summaryHasActionVerbs(data.summary ?? '');
  rules.push({
    key: 'action-verbs',
    points: 10,
    earned: actionVerbsOk,
    suggestion: 'Use action verbs in your summary (e.g. built, led, designed, improved) (+10 points)',
  });
  if (actionVerbsOk) score += 10;

  score = Math.min(score, MAX_SCORE);
  const suggestions = rules.filter((r) => !r.earned).map((r) => r.suggestion);

  return { score, suggestions, rules };
}
