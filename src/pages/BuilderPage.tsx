import { ResumeForm } from '../components/resume/ResumeForm';
import { LivePreviewShell } from '../components/resume/LivePreviewShell';

export function BuilderPage() {
  return (
    <div className="builder-page">
      <div className="builder-left">
        <ResumeForm />
      </div>
      <div className="builder-right">
        <div className="builder-preview-header">Live Preview</div>
        <LivePreviewShell />
      </div>
    </div>
  );
}
