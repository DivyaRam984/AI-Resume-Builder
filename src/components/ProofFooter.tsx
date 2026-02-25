import { Link } from 'react-router-dom';

export function ProofFooter() {
  return (
    <footer className="premium-proof-footer">
      <Link to="/rb/proof" className="proof-footer-link">
        View proof & final submission →
      </Link>
    </footer>
  );
}
