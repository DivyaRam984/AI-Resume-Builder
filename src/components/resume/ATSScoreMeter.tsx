import { useResume } from '../../context/ResumeContext';
import { computeATSScore, getTopImprovements } from '../../utils/atsScore';

export function ATSScoreMeter() {
  const { data } = useResume();
  const { score, suggestions } = computeATSScore(data);
  const improvements = getTopImprovements(data);

  return (
    <div className="ats-score-block">
      <div className="ats-score-label">ATS Readiness Score</div>
      <div className="ats-score-meter-wrap">
        <div className="ats-score-meter-bar" style={{ width: `${score}%` }} />
        <div className="ats-score-meter-bg" aria-hidden />
      </div>
      <div className="ats-score-value">{score}/100</div>
      {suggestions.length > 0 && (
        <ul className="ats-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
      <div className="ats-improvements-section">
        <div className="ats-improvements-label">Top 3 Improvements</div>
        {improvements.length > 0 ? (
          <ul className="ats-improvements-list">
            {improvements.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="ats-improvements-none">No improvements needed in these areas.</p>
        )}
      </div>
    </div>
  );
}
