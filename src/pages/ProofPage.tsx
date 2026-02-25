import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBuild } from '../context/BuildContext';
import { TopBar } from '../components/TopBar';
import { ProofFooter } from '../components/ProofFooter';

const STEP_NAMES = [
  '01 — Problem',
  '02 — Market',
  '03 — Architecture',
  '04 — HLD',
  '05 — LLD',
  '06 — Build',
  '07 — Test',
  '08 — Ship',
];

export function ProofPage() {
  const { stepArtifacts, proofLinks, setProofLinks } = useBuild();
  const [copied, setCopied] = useState(false);

  const buildFinalSubmission = () => {
    const lines = [
      'AI Resume Builder — Build Track — Final Submission',
      '',
      'Step status:',
      ...STEP_NAMES.map((name, i) => {
        const a = stepArtifacts[i];
        const status = a?.status ?? 'pending';
        return `  ${name}: ${status}`;
      }),
      '',
      'Links:',
      `  Lovable: ${proofLinks.lovable}`,
      `  GitHub: ${proofLinks.github}`,
      `  Deploy: ${proofLinks.deploy}`,
    ];
    return lines.join('\n');
  };

  const handleCopyFinal = () => {
    navigator.clipboard.writeText(buildFinalSubmission());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="premium-layout">
      <TopBar stepLabel="Project 3 — Proof & Submit" statusBadge="current" />
      <div className="premium-context-header-wrap">
        <h2 className="context-title">Proof & Final Submission</h2>
        <p className="context-subtitle">8-step status and submission links</p>
      </div>
      <div className="premium-workspace premium-workspace-single">
        <main className="premium-main proof-main">
          <section className="proof-section">
            <h3>Step status</h3>
            <ul className="proof-step-list">
              {STEP_NAMES.map((name, i) => {
                const a = stepArtifacts[i];
                const status = a?.status ?? 'pending';
                return (
                  <li key={name} className={`proof-step-item status-${status}`}>
                    <span className="step-name">{name}</span>
                    <span className="step-status">{status}</span>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="proof-section">
            <h3>Submission links</h3>
            <div className="proof-links">
              <label>
                <span>Lovable link</span>
                <input
                  type="url"
                  value={proofLinks.lovable}
                  onChange={(e) => setProofLinks({ lovable: e.target.value })}
                  placeholder="https://..."
                />
              </label>
              <label>
                <span>GitHub link</span>
                <input
                  type="url"
                  value={proofLinks.github}
                  onChange={(e) => setProofLinks({ github: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </label>
              <label>
                <span>Deploy link</span>
                <input
                  type="url"
                  value={proofLinks.deploy}
                  onChange={(e) => setProofLinks({ deploy: e.target.value })}
                  placeholder="https://..."
                />
              </label>
            </div>
          </section>
          <div className="proof-actions">
            <button
              type="button"
              className="proof-copy-btn"
              onClick={handleCopyFinal}
            >
              {copied ? 'Copied!' : 'Copy Final Submission'}
            </button>
            <Link to="/rb/01-problem" className="proof-back-link">
              ← Back to Step 1
            </Link>
          </div>
        </main>
      </div>
      <ProofFooter />
    </div>
  );
}
