import { useTemplate } from '../../context/TemplateContext';
import type { ResumeTemplate } from '../../context/TemplateContext';

const OPTIONS: { value: ResumeTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
];

export function TemplateTabs() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-tabs">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`template-tab ${template === value ? 'active' : ''}`}
          onClick={() => setTemplate(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
