import { useTemplate, getAccentHsl } from '../../context/TemplateContext';
import type { AccentKey } from '../../context/TemplateContext';

const COLORS: { key: AccentKey; label: string }[] = [
  { key: 'teal', label: 'Teal' },
  { key: 'navy', label: 'Navy' },
  { key: 'burgundy', label: 'Burgundy' },
  { key: 'forest', label: 'Forest' },
  { key: 'charcoal', label: 'Charcoal' },
];

export function ColorThemePicker() {
  const { accentColor, setAccentColor } = useTemplate();

  return (
    <div className="color-theme-picker">
      <div className="color-theme-picker-label">Color</div>
      <div className="color-theme-circles">
        {COLORS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`color-circle ${accentColor === key ? 'active' : ''}`}
            onClick={() => setAccentColor(key)}
            title={label}
            style={{ backgroundColor: getAccentHsl(key) }}
          />
        ))}
      </div>
    </div>
  );
}
