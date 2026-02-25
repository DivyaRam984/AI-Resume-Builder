import { createContext, useContext, useCallback, useState, useEffect } from 'react';

const ARTIFACT_KEYS = [
  'rb_step_1_artifact',
  'rb_step_2_artifact',
  'rb_step_3_artifact',
  'rb_step_4_artifact',
  'rb_step_5_artifact',
  'rb_step_6_artifact',
  'rb_step_7_artifact',
  'rb_step_8_artifact',
] as const;

export type ArtifactStatus = 'worked' | 'error' | 'screenshot' | null;
export type StepArtifact = { status: ArtifactStatus; value?: string } | null;

function getArtifact(key: string): StepArtifact {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as StepArtifact;
  } catch {
    return null;
  }
}

function setArtifactStorage(key: string, value: StepArtifact): void {
  if (value === null) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(value));
}

export type ProofLinks = {
  lovable: string;
  github: string;
  deploy: string;
};

const PROOF_LINKS_KEY = 'rb_proof_links';

function getProofLinks(): ProofLinks {
  try {
    const raw = localStorage.getItem(PROOF_LINKS_KEY);
    if (!raw) return { lovable: '', github: '', deploy: '' };
    return { ...{ lovable: '', github: '', deploy: '' }, ...JSON.parse(raw) };
  } catch {
    return { lovable: '', github: '', deploy: '' };
  }
}

type BuildContextValue = {
  stepArtifacts: StepArtifact[];
  setStepArtifact: (stepIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, artifact: StepArtifact) => void;
  hasArtifactForStep: (stepIndex: number) => boolean;
  proofLinks: ProofLinks;
  setProofLinks: (links: Partial<ProofLinks>) => void;
};

const BuildContext = createContext<BuildContextValue | null>(null);

function readAllArtifacts(): StepArtifact[] {
  return ARTIFACT_KEYS.map((k) => getArtifact(k));
}

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [stepArtifacts, setStepArtifacts] = useState<StepArtifact[]>(readAllArtifacts);
  const [proofState, setProofState] = useState<ProofLinks>(getProofLinks);

  useEffect(() => {
    setStepArtifacts(readAllArtifacts);
    setProofState(getProofLinks);
  }, []);

  const setStepArtifact = useCallback((stepIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, artifact: StepArtifact) => {
    const key = ARTIFACT_KEYS[stepIndex - 1];
    setArtifactStorage(key, artifact);
    setStepArtifacts((prev) => {
      const next = [...prev];
      next[stepIndex - 1] = artifact;
      return next;
    });
  }, []);

  const hasArtifactForStep = useCallback((stepIndex: number) => {
    const a = stepArtifacts[stepIndex - 1];
    return a != null && a.status != null;
  }, [stepArtifacts]);

  const setProofLinks = useCallback((links: Partial<ProofLinks>) => {
    setProofState((prev) => {
      const next = { ...prev, ...links };
      localStorage.setItem(PROOF_LINKS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value: BuildContextValue = {
    stepArtifacts,
    setStepArtifact,
    hasArtifactForStep,
    proofLinks: proofState,
    setProofLinks,
  };

  return <BuildContext.Provider value={value}>{children}</BuildContext.Provider>;
}

export function useBuild() {
  const ctx = useContext(BuildContext);
  if (!ctx) throw new Error('useBuild must be used within BuildProvider');
  return ctx;
}

export { ARTIFACT_KEYS };
