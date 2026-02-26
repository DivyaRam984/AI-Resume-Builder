import { ResumePreviewDocument } from '../components/resume/ResumePreviewDocument';
import { TemplateTabs } from '../components/resume/TemplateTabs';
import { PreviewExportBar } from '../components/resume/PreviewExportBar';

export function PreviewPage() {
  return (
    <div className="preview-page">
      <div className="preview-page-inner">
        <div className="preview-page-tabs no-print">
          <TemplateTabs />
        </div>
        <PreviewExportBar />
        <ResumePreviewDocument />
      </div>
    </div>
  );
}
