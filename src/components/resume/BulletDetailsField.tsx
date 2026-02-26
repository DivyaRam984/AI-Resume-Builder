import { getBulletTips, ACTION_VERB_SUGGESTION, MEASURABLE_SUGGESTION } from '../../utils/bulletGuidance';

type BulletDetailsFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function BulletDetailsField({ value, onChange, placeholder }: BulletDetailsFieldProps) {
  const tips = getBulletTips(value);

  return (
    <div className="bullet-details-wrap">
      <textarea
        className="form-textarea bullet-details-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
      {tips.length > 0 && (
        <div className="bullet-guidance">
          {tips.map(({ line, tip }, i) => (
            <div key={`${line}-${tip}-${i}`} className="bullet-guidance-item">
              <span className="bullet-guidance-hint">
                {tip === 'action-verb' ? ACTION_VERB_SUGGESTION : MEASURABLE_SUGGESTION}
              </span>
              <span className="bullet-guidance-line"> (bullet {line})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
