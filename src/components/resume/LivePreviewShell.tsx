import { useResume } from '../../context/ResumeContext';
import { useTemplate } from '../../context/TemplateContext';

export function LivePreviewShell() {
  const { data } = useResume();
  const { template } = useTemplate();
  const { personal, summary, education, experience, projects, skills, links } = data;

  const hasContact = personal.email || personal.phone || personal.location || links.github || links.linkedin;
  const hasLinks = Boolean(links.github?.trim() || links.linkedin?.trim());
  const skillsCount = (skills.technical?.length ?? 0) + (skills.soft?.length ?? 0) + (skills.tools?.length ?? 0);
  const hasAnyContent =
    personal.name ||
    summary ||
    education.some((e) => e.institution || e.degree) ||
    experience.some((e) => e.role || e.company) ||
    projects.some((p) => p.name) ||
    skillsCount > 0 ||
    hasLinks;

  return (
    <div className="live-preview-shell">
      <div className={`live-preview-paper template-${template}`}>
        <header className="preview-header">
          <h1 className="preview-name">{personal.name || 'Your Name'}</h1>
          {(hasContact || hasLinks) && (
            <div className="preview-contact">
              {[personal.email, personal.phone, personal.location].filter(Boolean).map((s) => (
                <span key={s}>{s}</span>
              ))}
              {links.github?.trim() && <span><a href={links.github} rel="noopener noreferrer" target="_blank">GitHub</a></span>}
              {links.linkedin?.trim() && <span><a href={links.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a></span>}
            </div>
          )}
        </header>
        {summary.trim() && (
          <section className="preview-section">
            <h2 className="preview-section-title">Summary</h2>
            <p className="preview-summary">{summary}</p>
          </section>
        )}
        {education.some((e) => e.institution?.trim() || e.degree?.trim()) && (
          <section className="preview-section">
            <h2 className="preview-section-title">Education</h2>
            {education.map((e) => (
              <div key={e.id} className="preview-item">
                <div className="preview-item-head">
                  <strong>{e.institution || 'Institution'}</strong>
                  <span className="preview-muted">{e.period}</span>
                </div>
                <div className="preview-muted">{e.degree}</div>
                {e.details?.trim() && <p className="preview-details">{e.details}</p>}
              </div>
            ))}
          </section>
        )}
        {experience.some((e) => e.role?.trim() || e.company?.trim()) && (
          <section className="preview-section">
            <h2 className="preview-section-title">Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="preview-item">
                <div className="preview-item-head">
                  <strong>{e.role || 'Role'}</strong>
                  <span className="preview-muted">{e.period}</span>
                </div>
                <div className="preview-muted">{e.company}</div>
                {e.details?.trim() && <p className="preview-details">{e.details}</p>}
              </div>
            ))}
          </section>
        )}
        {projects.some((p) => p.name?.trim()) && (
          <section className="preview-section">
            <h2 className="preview-section-title">Projects</h2>
            {projects.filter((p) => p.name?.trim()).map((p) => (
              <div key={p.id} className="preview-project-card">
                <div className="preview-project-card-head">
                  <strong>{p.name}</strong>
                  {p.period && <span className="preview-muted">{p.period}</span>}
                </div>
                {p.description?.trim() && <p className="preview-project-desc">{p.description}</p>}
                {(p.techStack?.length ?? 0) > 0 && (
                  <div className="preview-project-tech">
                    {p.techStack!.map((t, i) => (
                      <span key={i} className="preview-pill">{t}</span>
                    ))}
                  </div>
                )}
                <div className="preview-project-links">
                  {p.liveUrl?.trim() && (
                    <a href={p.liveUrl} rel="noopener noreferrer" target="_blank" className="preview-link-icon" title="Live">🔗</a>
                  )}
                  {p.githubUrl?.trim() && (
                    <a href={p.githubUrl} rel="noopener noreferrer" target="_blank" className="preview-link-icon" title="GitHub">⌘</a>
                  )}
                </div>
                {p.details?.trim() && <p className="preview-details">{p.details}</p>}
              </div>
            ))}
          </section>
        )}
        {skillsCount > 0 && (
          <section className="preview-section">
            <h2 className="preview-section-title">Skills</h2>
            <div className="preview-skills-groups">
              {skills.technical?.length > 0 && (
                <div className="preview-skill-group">
                  <span className="preview-skill-group-label">Technical</span>
                  <div className="preview-pills">
                    {skills.technical.map((s, i) => (
                      <span key={i} className="preview-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.soft?.length > 0 && (
                <div className="preview-skill-group">
                  <span className="preview-skill-group-label">Soft</span>
                  <div className="preview-pills">
                    {skills.soft.map((s, i) => (
                      <span key={i} className="preview-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools?.length > 0 && (
                <div className="preview-skill-group">
                  <span className="preview-skill-group-label">Tools</span>
                  <div className="preview-pills">
                    {skills.tools.map((s, i) => (
                      <span key={i} className="preview-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        {hasLinks && (
          <section className="preview-section">
            <h2 className="preview-section-title">Links</h2>
            <div className="preview-links">
              {links.github?.trim() && (
                <a href={links.github} rel="noopener noreferrer" target="_blank">GitHub</a>
              )}
              {links.linkedin?.trim() && (
                <a href={links.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a>
              )}
            </div>
          </section>
        )}
        {!hasAnyContent && (
          <div className="preview-placeholder">
            <p>Your resume preview will appear here as you fill the form.</p>
          </div>
        )}
      </div>
    </div>
  );
}
