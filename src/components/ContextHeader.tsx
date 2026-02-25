type ContextHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ContextHeader({ title, subtitle }: ContextHeaderProps) {
  return (
    <div className="premium-context-header">
      <h2 className="context-title">{title}</h2>
      {subtitle && <p className="context-subtitle">{subtitle}</p>}
    </div>
  );
}
