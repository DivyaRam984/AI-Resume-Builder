import { ResumeForm } from '../components/resume/ResumeForm';
import { LivePreviewShell } from '../components/resume/LivePreviewShell';
import { ATSScoreMeter } from '../components/resume/ATSScoreMeter';
import { TemplateTabs } from '../components/resume/TemplateTabs';

export function BuilderPage() {
  return (
    <div className="builder-page">
      <div className="builder-left">
        <ResumeForm />
      </div>
      <div className="builder-right">
        <div className="builder-preview-header">
          <span>Live Preview</span>
          <TemplateTabs />
        </div>
        <div className="builder-right-content">
          <ATSScoreMeter />
          <LivePreviewShell />
        </div>
      </div>
    </div>
  );
}
