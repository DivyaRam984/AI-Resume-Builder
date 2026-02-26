import { useResume } from '../../context/ResumeContext';
import { useTemplate } from '../../context/TemplateContext';

/**
 * Clean resume layout for /preview — premium typography, minimal black + white, no colors.
 */
export function ResumePreviewDocument() {
  const { data } = useResume();
  const { template, accentHsl } = useTemplate();
  const { personal, summary, education, experience, projects, skills, links } = data;
  const skillsCount = (skills.technical?.length ?? 0) + (skills.soft?.length ?? 0) + (skills.tools?.length ?? 0);

  const contactLine = [personal.email, personal.phone, personal.location]
    .filter(Boolean)
    .join(' · ') +
    ((links.github?.trim() || links.linkedin?.trim()) ? ' · ' + [links.github, links.linkedin].filter(Boolean).join(' · ') : '');

  const sidebar = (
    <div className="resume-doc-sidebar">
      <div className="resume-doc-contact-block">
        {[personal.email, personal.phone, personal.location].filter(Boolean).join(' · ')}
        {links.github?.trim() && <><br /><a href={links.github} rel="noopener noreferrer" target="_blank">GitHub</a></>}
        {links.linkedin?.trim() && <><br /><a href={links.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a></>}
      </div>
      {skillsCount > 0 && (
        <div className="resume-doc-sidebar-skills">
          <h2 className="resume-doc-h2">Skills</h2>
          <div className="resume-doc-skills-groups">
            {skills.technical?.length > 0 && (
              <div className="resume-doc-skill-group">
                <span className="resume-doc-skill-label">Technical:</span>{' '}
                {skills.technical.map((s, i) => (
                  <span key={i} className="resume-doc-pill">{s}</span>
                ))}
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div className="resume-doc-skill-group">
                <span className="resume-doc-skill-label">Soft:</span>{' '}
                {skills.soft.map((s, i) => (
                  <span key={i} className="resume-doc-pill">{s}</span>
                ))}
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="resume-doc-skill-group">
                <span className="resume-doc-skill-label">Tools:</span>{' '}
                {skills.tools.map((s, i) => (
                  <span key={i} className="resume-doc-pill">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const mainContent = (
    <>
      <header className="resume-doc-header">
        <h1 className="resume-doc-name">{personal.name || 'Your Name'}</h1>
        {template !== 'modern' && contactLine && (
          <div className="resume-doc-contact">{contactLine}</div>
        )}
      </header>

      {summary && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Summary</h2>
          <p className="resume-doc-p">{summary}</p>
        </section>
      )}

      {education.some((e) => e.institution || e.degree) && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Education</h2>
          {education.map((e) => (
            <div key={e.id} className="resume-doc-block">
              <div className="resume-doc-block-head">
                <strong className="resume-doc-strong">{e.institution || 'Institution'}</strong>
                <span className="resume-doc-muted">{e.period}</span>
              </div>
              <p className="resume-doc-muted resume-doc-sub">{e.degree}</p>
              {e.details && <p className="resume-doc-p resume-doc-details">{e.details}</p>}
            </div>
          ))}
        </section>
      )}

      {experience.some((e) => e.role || e.company) && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Experience</h2>
          {experience.map((e) => (
            <div key={e.id} className="resume-doc-block">
              <div className="resume-doc-block-head">
                <strong className="resume-doc-strong">{e.role || 'Role'}</strong>
                <span className="resume-doc-muted">{e.period}</span>
              </div>
              <p className="resume-doc-muted resume-doc-sub">{e.company}</p>
              {e.details && <p className="resume-doc-p resume-doc-details">{e.details}</p>}
            </div>
          ))}
        </section>
      )}

      {projects.some((p) => p.name) && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Projects</h2>
          {projects.filter((p) => p.name?.trim()).map((p) => (
            <div key={p.id} className="resume-doc-block resume-doc-project-card">
              <div className="resume-doc-block-head">
                <strong className="resume-doc-strong">{p.name}</strong>
                {p.period && <span className="resume-doc-muted">{p.period}</span>}
              </div>
              {p.description?.trim() && <p className="resume-doc-p resume-doc-details">{p.description}</p>}
              {(p.techStack?.length ?? 0) > 0 && (
                <p className="resume-doc-pills">
                  {p.techStack!.map((t, i) => (
                    <span key={i} className="resume-doc-pill">{t}</span>
                  ))}
                </p>
              )}
              {(p.liveUrl?.trim() || p.githubUrl?.trim()) && (
                <p className="resume-doc-links">
                  {p.liveUrl?.trim() && <a href={p.liveUrl} rel="noopener noreferrer" target="_blank">Live</a>}
                  {p.liveUrl?.trim() && p.githubUrl?.trim() && ' · '}
                  {p.githubUrl?.trim() && <a href={p.githubUrl} rel="noopener noreferrer" target="_blank">GitHub</a>}
                </p>
              )}
              {p.details?.trim() && <p className="resume-doc-p resume-doc-details">{p.details}</p>}
            </div>
          ))}
        </section>
      )}

      {template !== 'modern' && skillsCount > 0 && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Skills</h2>
          <div className="resume-doc-skills-groups">
            {skills.technical?.length > 0 && (
              <div className="resume-doc-skill-group">
                <span className="resume-doc-skill-label">Technical:</span>{' '}
                {skills.technical.map((s, i) => (
                  <span key={i} className="resume-doc-pill">{s}</span>
                ))}
              </div>
            )}
            {skills.soft?.length > 0 && (
              <div className="resume-doc-skill-group">
                <span className="resume-doc-skill-label">Soft:</span>{' '}
                {skills.soft.map((s, i) => (
                  <span key={i} className="resume-doc-pill">{s}</span>
                ))}
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="resume-doc-skill-group">
                <span className="resume-doc-skill-label">Tools:</span>{' '}
                {skills.tools.map((s, i) => (
                  <span key={i} className="resume-doc-pill">{s}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {template !== 'modern' && (links.github?.trim() || links.linkedin?.trim()) && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Links</h2>
          <p className="resume-doc-p resume-doc-skills">
            {[links.github, links.linkedin].filter(Boolean).join(' · ')}
          </p>
        </section>
      )}

      {!personal.name && !summary && education.every((e) => !e.institution && !e.degree) && !experience.some((e) => e.role || e.company) && !projects.some((p) => p.name) && skillsCount === 0 && !links.github?.trim() && !links.linkedin?.trim() && (
        <p className="resume-doc-empty">Add content in Builder to see your resume here.</p>
      )}
    </>
  );

  return (
    <article
      className={`resume-document template-${template}`}
      style={{ ['--resume-accent' as string]: accentHsl }}
    >
      {template === 'modern' ? (
        <div className="resume-doc-modern-layout">
          {sidebar}
          <div className="resume-doc-main">{mainContent}</div>
        </div>
      ) : (
        mainContent
      )}
    </article>
  );
}
