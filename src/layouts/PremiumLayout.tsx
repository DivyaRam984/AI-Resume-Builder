import type { ReactNode } from 'react';
import { TopBar } from '../components/TopBar';
import { ContextHeader } from '../components/ContextHeader';
import { ProofFooter } from '../components/ProofFooter';

type PremiumLayoutProps = {
  stepNumber?: number;
  stepTitle: string;
  stepSubtitle?: string;
  mainContent: ReactNode;
  buildPanel: ReactNode;
  statusBadge: 'pending' | 'complete' | 'current';
};

export function PremiumLayout({
  stepNumber,
  stepTitle,
  stepSubtitle,
  mainContent,
  buildPanel,
  statusBadge,
}: PremiumLayoutProps) {
  const stepLabel =
    stepNumber != null ? `Project 3 — Step ${stepNumber} of 8` : 'Project 3 — Proof & Submit';

  return (
    <div className="premium-layout">
      <TopBar stepLabel={stepLabel} statusBadge={statusBadge} />
      <div className="premium-context-header-wrap">
        <ContextHeader title={stepTitle} subtitle={stepSubtitle} />
      </div>
      <div className="premium-workspace">
        <main className="premium-main">{mainContent}</main>
        <div className="premium-secondary">{buildPanel}</div>
      </div>
      <ProofFooter />
    </div>
  );
}
