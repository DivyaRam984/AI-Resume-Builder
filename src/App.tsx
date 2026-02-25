import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BuildProvider } from './context/BuildContext';
import { ResumeProvider } from './context/ResumeContext';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { BuilderPage } from './pages/BuilderPage';
import { PreviewPage } from './pages/PreviewPage';
import { ProofAppPage } from './pages/ProofAppPage';
import { StepPage } from './pages/StepPage';
import { ProofPage } from './pages/ProofPage';
import './App.css';

function App() {
  return (
    <BuildProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/preview" element={<PreviewPage />} />
              <Route path="/proof" element={<ProofAppPage />} />
            </Route>
            <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
            <Route path="/rb/01-problem" element={<StepPage stepIndex={1} />} />
            <Route path="/rb/02-market" element={<StepPage stepIndex={2} />} />
            <Route path="/rb/03-architecture" element={<StepPage stepIndex={3} />} />
            <Route path="/rb/04-hld" element={<StepPage stepIndex={4} />} />
            <Route path="/rb/05-lld" element={<StepPage stepIndex={5} />} />
            <Route path="/rb/06-build" element={<StepPage stepIndex={6} />} />
            <Route path="/rb/07-test" element={<StepPage stepIndex={7} />} />
            <Route path="/rb/08-ship" element={<StepPage stepIndex={8} />} />
            <Route path="/rb/proof" element={<ProofPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </BuildProvider>
  );
}

export default App;
