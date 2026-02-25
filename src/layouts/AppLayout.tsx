import { Outlet, NavLink } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-nav">
        <NavLink to="/" className="app-brand">
          AI Resume Builder
        </NavLink>
        <nav className="app-nav-links">
          <NavLink to="/builder" className={({ isActive }) => (isActive ? 'active' : '')}>
            Builder
          </NavLink>
          <NavLink to="/preview" className={({ isActive }) => (isActive ? 'active' : '')}>
            Preview
          </NavLink>
          <NavLink to="/proof" className={({ isActive }) => (isActive ? 'active' : '')}>
            Proof
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
