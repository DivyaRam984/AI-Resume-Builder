import { useState } from 'react';
import { useBuild } from '../context/BuildContext';

type BuildPanelProps = {
  stepIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  copyContent: string;
  onArtifactRecorded?: () => void;
};

export function BuildPanel({ stepIndex, copyContent, onArtifactRecorded }: BuildPanelProps) {
  const { setStepArtifact, stepArtifacts } = useBuild();
  const [textarea, setTextarea] = useState(copyContent);
  const current = stepArtifacts[stepIndex - 1];

  const handleCopy = () => {
    navigator.clipboard.writeText(textarea);
  };

  const handleWorked = () => {
    setStepArtifact(stepIndex, { status: 'worked' });
    onArtifactRecorded?.();
  };

  const handleError = () => {
    setStepArtifact(stepIndex, { status: 'error' });
    onArtifactRecorded?.();
  };

  const handleScreenshot = () => {
    const url = prompt('Paste screenshot URL or path:');
    setStepArtifact(stepIndex, { status: 'screenshot', value: url ?? '' });
    onArtifactRecorded?.();
  };

  return (
    <aside className="premium-build-panel">
      <label className="panel-label">Copy This Into Lovable</label>
      <textarea
        className="panel-textarea"
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        placeholder="Paste or type content to copy..."
        rows={8}
      />
      <div className="panel-actions">
        <button type="button" className="panel-btn" onClick={handleCopy}>
          Copy
        </button>
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="panel-btn panel-btn-primary"
        >
          Build in Lovable
        </a>
      </div>
      <div className="panel-outcome">
        <span className="outcome-label">Outcome:</span>
        <div className="outcome-buttons">
          <button
            type="button"
            className={`outcome-btn ${current?.status === 'worked' ? 'active' : ''}`}
            onClick={handleWorked}
          >
            It Worked
          </button>
          <button
            type="button"
            className={`outcome-btn ${current?.status === 'error' ? 'active' : ''}`}
            onClick={handleError}
          >
            Error
          </button>
          <button
            type="button"
            className={`outcome-btn ${current?.status === 'screenshot' ? 'active' : ''}`}
            onClick={handleScreenshot}
          >
            Add Screenshot
          </button>
        </div>
      </div>
    </aside>
  );
}
