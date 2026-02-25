import { Link, useNavigate } from 'react-router-dom';
import { useBuild } from '../context/BuildContext';

const STEP_ROUTES = [
  '/rb/01-problem',
  '/rb/02-market',
  '/rb/03-architecture',
  '/rb/04-hld',
  '/rb/05-lld',
  '/rb/06-build',
  '/rb/07-test',
  '/rb/08-ship',
] as const;

type StepNavProps = {
  currentStep: number;
};

export function StepNav({ currentStep }: StepNavProps) {
  const navigate = useNavigate();
  const { hasArtifactForStep } = useBuild();
  const hasArtifact = hasArtifactForStep(currentStep);
  const isFirst = currentStep === 1;
  const isLast = currentStep === 8;
  const prevPath = isFirst ? undefined : STEP_ROUTES[currentStep - 2];
  const nextPath = isLast ? '/rb/proof' : STEP_ROUTES[currentStep];

  return (
    <nav className="step-nav">
      {prevPath ? (
        <Link to={prevPath} className="step-nav-btn step-nav-prev">
          ← Previous
        </Link>
      ) : (
        <span className="step-nav-btn step-nav-disabled">← Previous</span>
      )}
      <span className="step-nav-status">
        {hasArtifact ? 'Artifact recorded — Next unlocked' : 'Upload artifact to unlock Next'}
      </span>
      {hasArtifact ? (
        <button
          type="button"
          className="step-nav-btn step-nav-next"
          onClick={() => navigate(nextPath)}
        >
          {isLast ? 'Go to Proof →' : 'Next →'}
        </button>
      ) : (
        <button type="button" className="step-nav-btn step-nav-disabled" disabled>
          Next →
        </button>
      )}
    </nav>
  );
}
