import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { resumeToPlainText } from '../../utils/resumeToPlainText';
import { shouldWarnIncomplete } from '../../utils/exportValidation';

export function PreviewExportBar() {
  const { data } = useResume();
  const [copied, setCopied] = useState(false);
  const showWarning = shouldWarnIncomplete(data);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    const text = resumeToPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="preview-export-bar no-print">
      {showWarning && (
        <p className="export-warning">Your resume may look incomplete.</p>
      )}
      <div className="export-actions">
        <button type="button" className="export-btn" onClick={handlePrint}>
          Print / Save as PDF
        </button>
        <button type="button" className="export-btn" onClick={handleCopyText}>
          {copied ? 'Copied!' : 'Copy Resume as Text'}
        </button>
      </div>
    </div>
  );
}
