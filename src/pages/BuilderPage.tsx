import { ResumeForm } from '../components/resume/ResumeForm';
import { LivePreviewShell } from '../components/resume/LivePreviewShell';
import { ATSScoreMeter } from '../components/resume/ATSScoreMeter';
import { TemplatePicker } from '../components/resume/TemplatePicker';
import { ColorThemePicker } from '../components/resume/ColorThemePicker';

export function BuilderPage() {
  return (
    <div className="builder-page">
      <div className="builder-left">
        <ResumeForm />
      </div>
      <div className="builder-right">
        <div className="builder-preview-header">
          <span>Live Preview</span>
        </div>
        <div className="builder-right-content">
          <TemplatePicker />
          <ColorThemePicker />
          <ATSScoreMeter />
          <LivePreviewShell />
        </div>
      </div>
    </div>
  );
}
