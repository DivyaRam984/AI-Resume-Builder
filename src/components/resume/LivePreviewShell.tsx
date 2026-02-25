import { useResume } from '../../context/ResumeContext';

export function LivePreviewShell() {
  const { data } = useResume();
  const { personal, summary, education, experience, projects, skills } = data;

  return (
    <div className="live-preview-shell">
      <div className="live-preview-paper">
        <header className="preview-header">
          <h1 className="preview-name">{personal.name || 'Your Name'}</h1>
          <div className="preview-contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </header>
        {summary && (
          <section className="preview-section">
            <h2 className="preview-section-title">Summary</h2>
            <p className="preview-summary">{summary}</p>
          </section>
        )}
        {education.some((e) => e.institution || e.degree) && (
          <section className="preview-section">
            <h2 className="preview-section-title">Education</h2>
            {education.map((e) => (
              <div key={e.id} className="preview-item">
                <div className="preview-item-head">
                  <strong>{e.institution || 'Institution'}</strong>
                  <span className="preview-muted">{e.period}</span>
                </div>
                <div className="preview-muted">{e.degree}</div>
                {e.details && <p className="preview-details">{e.details}</p>}
              </div>
            ))}
          </section>
        )}
        {experience.some((e) => e.role || e.company) && (
          <section className="preview-section">
            <h2 className="preview-section-title">Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="preview-item">
                <div className="preview-item-head">
                  <strong>{e.role || 'Role'}</strong>
                  <span className="preview-muted">{e.period}</span>
                </div>
                <div className="preview-muted">{e.company}</div>
                {e.details && <p className="preview-details">{e.details}</p>}
              </div>
            ))}
          </section>
        )}
        {projects.some((p) => p.name) && (
          <section className="preview-section">
            <h2 className="preview-section-title">Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="preview-item">
                <div className="preview-item-head">
                  <strong>{p.name}</strong>
                  {p.period && <span className="preview-muted">{p.period}</span>}
                </div>
                {p.details && <p className="preview-details">{p.details}</p>}
              </div>
            ))}
          </section>
        )}
        {skills && (
          <section className="preview-section">
            <h2 className="preview-section-title">Skills</h2>
            <p className="preview-skills">{skills}</p>
          </section>
        )}
        {!personal.name && !summary && education.every((e) => !e.institution && !e.degree) && !experience.some((e) => e.role || e.company) && !projects.some((p) => p.name) && !skills && (
          <div className="preview-placeholder">
            <p>Your resume preview will appear here as you fill the form.</p>
          </div>
        )}
      </div>
    </div>
  );
}
