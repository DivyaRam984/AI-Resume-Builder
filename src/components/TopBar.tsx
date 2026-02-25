type TopBarProps = {
  stepLabel: string;
  statusBadge: 'pending' | 'complete' | 'current';
};

export function TopBar({ stepLabel, statusBadge }: TopBarProps) {
  return (
    <header className="premium-topbar">
      <div className="premium-topbar-left">AI Resume Builder</div>
      <div className="premium-topbar-center">{stepLabel}</div>
      <div className="premium-topbar-right">
        <span className={`status-badge status-${statusBadge}`}>
          {statusBadge === 'pending' && 'Pending'}
          {statusBadge === 'complete' && 'Complete'}
          {statusBadge === 'current' && 'Current'}
        </span>
      </div>
    </header>
  );
}
