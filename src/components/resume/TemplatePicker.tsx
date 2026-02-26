import { useTemplate } from '../../context/TemplateContext';
import type { ResumeTemplate } from '../../context/TemplateContext';

const OPTIONS: { value: ResumeTemplate; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimal', label: 'Minimal' },
];

export function TemplatePicker() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="template-picker">
      <div className="template-picker-label">Template</div>
      <div className="template-thumbnails">
        {OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`template-thumb ${template === value ? 'active' : ''}`}
            onClick={() => setTemplate(value)}
            title={label}
          >
            <div className={`template-thumb-sketch sketch-${value}`}>
              {value === 'classic' && (
                <>
                  <div className="sketch-line sketch-head" />
                  <div className="sketch-hr" />
                  <div className="sketch-line" />
                  <div className="sketch-line short" />
                  <div className="sketch-hr" />
                  <div className="sketch-line" />
                  <div className="sketch-line short" />
                </>
              )}
              {value === 'modern' && (
                <>
                  <div className="sketch-sidebar" />
                  <div className="sketch-main">
                    <div className="sketch-line" />
                    <div className="sketch-hr" />
                    <div className="sketch-line" />
                    <div className="sketch-line short" />
                  </div>
                </>
              )}
              {value === 'minimal' && (
                <>
                  <div className="sketch-line sketch-head" />
                  <div className="sketch-gap" />
                  <div className="sketch-line" />
                  <div className="sketch-gap" />
                  <div className="sketch-line short" />
                  <div className="sketch-gap" />
                  <div className="sketch-line short" />
                </>
              )}
            </div>
            <span className="template-thumb-label">{label}</span>
            {template === value && <span className="template-thumb-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
