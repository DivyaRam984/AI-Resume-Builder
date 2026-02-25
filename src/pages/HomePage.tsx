import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-headline">Build a Resume That Gets Read.</h1>
      <p className="home-subline">
        Structure your experience. Preview in real time. Keep it premium and ATS-ready.
      </p>
      <Link to="/builder" className="home-cta">
        Start Building
      </Link>
    </div>
  );
}
