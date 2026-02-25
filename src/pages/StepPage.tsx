import { PremiumLayout } from '../layouts/PremiumLayout';
import { BuildPanel } from '../components/BuildPanel';
import { StepNav } from '../components/StepNav';
import { useBuild } from '../context/BuildContext';

const STEPS: { title: string; subtitle?: string; copyContent: string }[] = [
  { title: '01 — Problem', subtitle: 'Define the problem', copyContent: 'Copy this into Lovable: Step 1 — Problem definition and scope.' },
  { title: '02 — Market', subtitle: 'Market research', copyContent: 'Copy this into Lovable: Step 2 — Market and user research.' },
  { title: '03 — Architecture', subtitle: 'System architecture', copyContent: 'Copy this into Lovable: Step 3 — Architecture overview.' },
  { title: '04 — HLD', subtitle: 'High-level design', copyContent: 'Copy this into Lovable: Step 4 — High-level design.' },
  { title: '05 — LLD', subtitle: 'Low-level design', copyContent: 'Copy this into Lovable: Step 5 — Low-level design.' },
  { title: '06 — Build', subtitle: 'Build phase', copyContent: 'Copy this into Lovable: Step 6 — Build implementation.' },
  { title: '07 — Test', subtitle: 'Testing', copyContent: 'Copy this into Lovable: Step 7 — Test plan and results.' },
  { title: '08 — Ship', subtitle: 'Ship & deploy', copyContent: 'Copy this into Lovable: Step 8 — Ship and deployment.' },
];

type StepPageProps = {
  stepIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export function StepPage({ stepIndex }: StepPageProps) {
  const { hasArtifactForStep } = useBuild();
  const step = STEPS[stepIndex - 1];
  const hasArtifact = hasArtifactForStep(stepIndex);
  const statusBadge = hasArtifact ? 'complete' : 'current';

  return (
    <PremiumLayout
      stepNumber={stepIndex}
      stepTitle={step.title}
      stepSubtitle={step.subtitle}
      statusBadge={statusBadge}
      mainContent={
        <>
          <div className="step-placeholder">
            <p>Step {stepIndex} workspace. No resume features yet — route rail and gating only.</p>
            <p>Complete the build panel on the right and record an outcome to unlock Next.</p>
          </div>
          <StepNav currentStep={stepIndex} />
        </>
      }
      buildPanel={
        <BuildPanel stepIndex={stepIndex} copyContent={step.copyContent} />
      }
    />
  );
}
