import { useResume } from '../../context/ResumeContext';

/**
 * Clean resume layout for /preview — premium typography, minimal black + white, no colors.
 */
export function ResumePreviewDocument() {
  const { data } = useResume();
  const { personal, summary, education, experience, projects, skills, links } = data;

  return (
    <article className="resume-document">
      <header className="resume-doc-header">
        <h1 className="resume-doc-name">{personal.name || 'Your Name'}</h1>
        <div className="resume-doc-contact">
          {[personal.email, personal.phone, personal.location]
            .filter(Boolean)
            .join(' · ')}
          {(links.github || links.linkedin) && (
            <>
              {' · '}
              {[links.github, links.linkedin].filter(Boolean).join(' · ')}
            </>
          )}
        </div>
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
          {projects.map((p) => (
            <div key={p.id} className="resume-doc-block">
              <div className="resume-doc-block-head">
                <strong className="resume-doc-strong">{p.name}</strong>
                {p.period && <span className="resume-doc-muted">{p.period}</span>}
              </div>
              {p.details && <p className="resume-doc-p resume-doc-details">{p.details}</p>}
            </div>
          ))}
        </section>
      )}

      {skills && (
        <section className="resume-doc-section">
          <h2 className="resume-doc-h2">Skills</h2>
          <p className="resume-doc-p resume-doc-skills">{skills}</p>
        </section>
      )}

      {!personal.name && !summary && education.every((e) => !e.institution && !e.degree) && !experience.some((e) => e.role || e.company) && !projects.some((p) => p.name) && !skills && (
        <p className="resume-doc-empty">Add content in Builder to see your resume here.</p>
      )}
    </article>
  );
}
