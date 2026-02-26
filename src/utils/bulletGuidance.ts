const ACTION_VERBS = new Set([
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated',
]);

function firstWord(line: string): string {
  const trimmed = line.trim();
  const match = trimmed.match(/^\s*([a-zA-Z]+)/);
  return match ? match[1].toLowerCase() : '';
}

function hasNumericIndicator(text: string): boolean {
  return /\d|%|\bk\b/i.test(text);
}

export type BulletTip = 'action-verb' | 'measurable';

/** Returns tips per 1-based line number for non-empty lines. */
export function getBulletTips(details: string | undefined): { line: number; tip: BulletTip }[] {
  if (!details || !details.trim()) return [];
  const lines = details.split(/\r?\n/).map((s) => s.trim());
  const out: { line: number; tip: BulletTip }[] = [];
  lines.forEach((line, i) => {
    if (!line) return;
    const lineNum = i + 1;
    const first = firstWord(line);
    if (first && !ACTION_VERBS.has(first)) {
      out.push({ line: lineNum, tip: 'action-verb' });
    }
    if (!hasNumericIndicator(line)) {
      out.push({ line: lineNum, tip: 'measurable' });
    }
  });
  return out;
}

export const ACTION_VERB_SUGGESTION = 'Start with a strong action verb.';
export const MEASURABLE_SUGGESTION = 'Add measurable impact (numbers).';
