import { ResumePreviewDocument } from '../components/resume/ResumePreviewDocument';
import { TemplateTabs } from '../components/resume/TemplateTabs';

export function PreviewPage() {
  return (
    <div className="preview-page">
      <div className="preview-page-inner">
        <div className="preview-page-tabs">
          <TemplateTabs />
        </div>
        <ResumePreviewDocument />
      </div>
    </div>
  );
}
