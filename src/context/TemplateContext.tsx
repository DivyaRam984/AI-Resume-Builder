import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ResumeTemplate = 'classic' | 'modern' | 'minimal';

const STORAGE_KEY = 'resumeBuilderTemplate';

function loadStoredTemplate(): ResumeTemplate {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'classic' || raw === 'modern' || raw === 'minimal') return raw;
  } catch {
    /* ignore */
  }
  return 'classic';
}

type TemplateContextValue = {
  template: ResumeTemplate;
  setTemplate: (t: ResumeTemplate) => void;
};

const TemplateContext = createContext<TemplateContextValue | null>(null);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplateState] = useState<ResumeTemplate>(loadStoredTemplate);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, template);
    } catch {
      /* ignore */
    }
  }, [template]);

  const setTemplate = useCallback((t: ResumeTemplate) => {
    setTemplateState(t);
  }, []);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}
