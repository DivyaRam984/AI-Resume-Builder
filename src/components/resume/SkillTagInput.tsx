import { useState, useRef } from 'react';
import type { SkillsData } from '../../types/resume';

const CATEGORIES: { key: keyof SkillsData; label: string }[] = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'tools', label: 'Tools & Technologies' },
];

type SkillTagInputProps = {
  skills: SkillsData;
  onAdd: (category: keyof SkillsData, skill: string) => void;
  onRemove: (category: keyof SkillsData, index: number) => void;
};

export function SkillTagInput({ skills, onAdd, onRemove }: SkillTagInputProps) {
  const [inputVal, setInputVal] = useState<Record<keyof SkillsData, string>>({
    technical: '',
    soft: '',
    tools: '',
  });
  const inputRefs = useRef<Record<keyof SkillsData, HTMLInputElement | null>>({
    technical: null,
    soft: null,
    tools: null,
  });

  const handleKeyDown = (category: keyof SkillsData, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = inputVal[category].trim();
      if (v) {
        onAdd(category, v);
        setInputVal((prev) => ({ ...prev, [category]: '' }));
      }
    }
  };

  return (
    <div className="skills-accordion">
      {CATEGORIES.map(({ key, label }) => {
        const list = skills[key] ?? [];
        return (
          <div key={key} className="skill-category">
            <h4 className="skill-category-title">
              {label} ({list.length})
            </h4>
            <div className="skill-chips-wrap">
              {list.map((skill, i) => (
                <span key={`${skill}-${i}`} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    className="skill-chip-remove"
                    onClick={() => onRemove(key, i)}
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                ref={(el) => { inputRefs.current[key] = el; }}
                type="text"
                className="skill-tag-input"
                placeholder="Type and press Enter"
                value={inputVal[key]}
                onChange={(e) => setInputVal((prev) => ({ ...prev, [key]: e.target.value }))}
                onKeyDown={(e) => handleKeyDown(key, e)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
