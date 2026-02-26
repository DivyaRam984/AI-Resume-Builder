import { ResumePreviewDocument } from '../components/resume/ResumePreviewDocument';
import { TemplatePicker } from '../components/resume/TemplatePicker';
import { ColorThemePicker } from '../components/resume/ColorThemePicker';
import { PreviewExportBar } from '../components/resume/PreviewExportBar';

export function PreviewPage() {
  return (
    <div className="preview-page">
      <div className="preview-page-inner">
        <div className="preview-page-pickers no-print">
          <TemplatePicker />
          <ColorThemePicker />
        </div>
        <PreviewExportBar />
        <ResumePreviewDocument />
      </div>
    </div>
  );
}
