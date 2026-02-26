import { useState } from 'react';

type ProjectTechInputProps = {
  value: string[];
  onChange: (tech: string[]) => void;
};

export function ProjectTechInput({ value, onChange }: ProjectTechInputProps) {
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const v = inputVal.trim();
      if (v && !value.includes(v)) {
        onChange([...value, v]);
        setInputVal('');
      }
    }
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="project-tech-wrap">
      <div className="project-tech-chips">
        {value.map((t, i) => (
          <span key={`${t}-${i}`} className="skill-chip">
            {t}
            <button type="button" className="skill-chip-remove" onClick={() => remove(i)} aria-label={`Remove ${t}`}>×</button>
          </span>
        ))}
        <input
          type="text"
          className="skill-tag-input project-tech-input"
          placeholder="Tech (Enter to add)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
