import { useResume } from '../../context/ResumeContext';
import { computeATSScore } from '../../utils/atsScore';

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getBand(score: number): { label: string; className: string } {
  if (score <= 40) return { label: 'Needs Work', className: 'ats-band-red' };
  if (score <= 70) return { label: 'Getting There', className: 'ats-band-amber' };
  return { label: 'Strong Resume', className: 'ats-band-green' };
}

export function ATSScoreMeter() {
  const { data } = useResume();
  const { score, suggestions } = computeATSScore(data);
  const band = getBand(score);
  const strokeDashoffset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="ats-score-block">
      <div className="ats-score-label">ATS Readiness Score</div>
      <div className="ats-score-circular-wrap">
        <svg className="ats-score-circle-svg" viewBox="0 0 100 100" aria-hidden>
          <circle
            className="ats-score-circle-bg"
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
          />
          <circle
            className={`ats-score-circle-progress ${band.className}`}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="ats-score-circular-center">
          <span className="ats-score-value" aria-live="polite">
            {score}
          </span>
          <span className="ats-score-max">/100</span>
          <span className={`ats-score-band ${band.className}`}>{band.label}</span>
        </div>
      </div>
      {suggestions.length > 0 && (
        <ul className="ats-suggestions" aria-label="Improvement suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
