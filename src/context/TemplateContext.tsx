import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ResumeTemplate = 'classic' | 'modern' | 'minimal';

export type AccentKey = 'teal' | 'navy' | 'burgundy' | 'forest' | 'charcoal';

const TEMPLATE_KEY = 'resumeBuilderTemplate';
const ACCENT_KEY = 'resumeBuilderAccent';

const ACCENT_HSL: Record<AccentKey, string> = {
  teal: 'hsl(168, 60%, 40%)',
  navy: 'hsl(220, 60%, 35%)',
  burgundy: 'hsl(345, 60%, 35%)',
  forest: 'hsl(150, 50%, 30%)',
  charcoal: 'hsl(0, 0%, 25%)',
};

function loadStoredTemplate(): ResumeTemplate {
  try {
    const raw = localStorage.getItem(TEMPLATE_KEY);
    if (raw === 'classic' || raw === 'modern' || raw === 'minimal') return raw;
  } catch {
    /* ignore */
  }
  return 'classic';
}

function loadStoredAccent(): AccentKey {
  try {
    const raw = localStorage.getItem(ACCENT_KEY);
    if (raw && raw in ACCENT_HSL) return raw as AccentKey;
  } catch {
    /* ignore */
  }
  return 'teal';
}

export function getAccentHsl(key: AccentKey): string {
  return ACCENT_HSL[key];
}

type TemplateContextValue = {
  template: ResumeTemplate;
  setTemplate: (t: ResumeTemplate) => void;
  accentColor: AccentKey;
  setAccentColor: (a: AccentKey) => void;
  accentHsl: string;
};

const TemplateContext = createContext<TemplateContextValue | null>(null);

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplateState] = useState<ResumeTemplate>(loadStoredTemplate);
  const [accentColor, setAccentColorState] = useState<AccentKey>(loadStoredAccent);

  useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_KEY, template);
    } catch {
      /* ignore */
    }
  }, [template]);

  useEffect(() => {
    try {
      localStorage.setItem(ACCENT_KEY, accentColor);
    } catch {
      /* ignore */
    }
  }, [accentColor]);

  const setTemplate = useCallback((t: ResumeTemplate) => {
    setTemplateState(t);
  }, []);

  const setAccentColor = useCallback((a: AccentKey) => {
    setAccentColorState(a);
  }, []);

  const value: TemplateContextValue = {
    template,
    setTemplate,
    accentColor,
    setAccentColor,
    accentHsl: ACCENT_HSL[accentColor],
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}
