import { useResume } from '../../context/ResumeContext';

export function ResumeForm() {
  const { data, setPersonal, setSummary, addEducation, removeEducation, updateEducation, addExperience, removeExperience, updateExperience, addProject, removeProject, updateProject, setSkills, setLinks, loadSampleData } = useResume();
  const { personal, summary, education, experience, projects, skills, links } = data;

  return (
    <div className="resume-form">
      <div className="form-actions-top">
        <button type="button" className="btn-secondary" onClick={loadSampleData}>
          Load Sample Data
        </button>
      </div>

      <section className="form-section">
        <h3 className="form-section-title">Personal Info</h3>
        <div className="form-grid-2">
          <label>
            <span>Name</span>
            <input
              type="text"
              value={personal.name}
              onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
              placeholder="Full name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={personal.email}
              onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
              placeholder="email@example.com"
            />
          </label>
          <label>
            <span>Phone</span>
            <input
              type="tel"
              value={personal.phone}
              onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </label>
          <label>
            <span>Location</span>
            <input
              type="text"
              value={personal.location}
              onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
              placeholder="City, State"
            />
          </label>
        </div>
      </section>

      <section className="form-section">
        <h3 className="form-section-title">Summary</h3>
        <textarea
          className="form-textarea"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Brief professional summary..."
          rows={4}
        />
      </section>

      <section className="form-section">
        <div className="form-section-head">
          <h3 className="form-section-title">Education</h3>
          <button type="button" className="btn-text" onClick={addEducation}>
            + Add
          </button>
        </div>
        {education.map((entry) => (
          <div key={entry.id} className="form-block">
            <div className="form-grid-2">
              <label>
                <span>Institution</span>
                <input
                  value={entry.institution}
                  onChange={(e) => updateEducation(entry.id, { institution: e.target.value })}
                  placeholder="School name"
                />
              </label>
              <label>
                <span>Degree</span>
                <input
                  value={entry.degree}
                  onChange={(e) => updateEducation(entry.id, { degree: e.target.value })}
                  placeholder="Degree"
                />
              </label>
              <label className="span-2">
                <span>Period</span>
                <input
                  value={entry.period}
                  onChange={(e) => updateEducation(entry.id, { period: e.target.value })}
                  placeholder="e.g. 2019 – 2023"
                />
              </label>
              <label className="span-2">
                <span>Details (optional)</span>
                <input
                  value={entry.details ?? ''}
                  onChange={(e) => updateEducation(entry.id, { details: e.target.value })}
                  placeholder="Relevant coursework, honors..."
                />
              </label>
            </div>
            {education.length > 1 && (
              <button type="button" className="btn-remove" onClick={() => removeEducation(entry.id)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="form-section-head">
          <h3 className="form-section-title">Experience</h3>
          <button type="button" className="btn-text" onClick={addExperience}>
            + Add
          </button>
        </div>
        {experience.map((entry) => (
          <div key={entry.id} className="form-block">
            <div className="form-grid-2">
              <label>
                <span>Role</span>
                <input
                  value={entry.role}
                  onChange={(e) => updateExperience(entry.id, { role: e.target.value })}
                  placeholder="Job title"
                />
              </label>
              <label>
                <span>Company</span>
                <input
                  value={entry.company}
                  onChange={(e) => updateExperience(entry.id, { company: e.target.value })}
                  placeholder="Company name"
                />
              </label>
              <label className="span-2">
                <span>Period</span>
                <input
                  value={entry.period}
                  onChange={(e) => updateExperience(entry.id, { period: e.target.value })}
                  placeholder="e.g. 2021 – Present"
                />
              </label>
              <label className="span-2">
                <span>Details (optional)</span>
                <input
                  value={entry.details ?? ''}
                  onChange={(e) => updateExperience(entry.id, { details: e.target.value })}
                  placeholder="Key responsibilities, achievements..."
                />
              </label>
            </div>
            {experience.length > 1 && (
              <button type="button" className="btn-remove" onClick={() => removeExperience(entry.id)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="form-section">
        <div className="form-section-head">
          <h3 className="form-section-title">Projects</h3>
          <button type="button" className="btn-text" onClick={addProject}>
            + Add
          </button>
        </div>
        {projects.map((entry) => (
          <div key={entry.id} className="form-block">
            <div className="form-grid-2">
              <label>
                <span>Project name</span>
                <input
                  value={entry.name}
                  onChange={(e) => updateProject(entry.id, { name: e.target.value })}
                  placeholder="Project name"
                />
              </label>
              <label>
                <span>Period (optional)</span>
                <input
                  value={entry.period ?? ''}
                  onChange={(e) => updateProject(entry.id, { period: e.target.value })}
                  placeholder="e.g. 2024"
                />
              </label>
              <label className="span-2">
                <span>Details (optional)</span>
                <input
                  value={entry.details ?? ''}
                  onChange={(e) => updateProject(entry.id, { details: e.target.value })}
                  placeholder="Tech stack, outcome..."
                />
              </label>
            </div>
            {projects.length > 1 && (
              <button type="button" className="btn-remove" onClick={() => removeProject(entry.id)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="form-section">
        <h3 className="form-section-title">Skills</h3>
        <input
          type="text"
          className="form-input"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Comma-separated, e.g. React, TypeScript, Node.js"
        />
      </section>

      <section className="form-section">
        <h3 className="form-section-title">Links</h3>
        <div className="form-grid-2">
          <label>
            <span>GitHub</span>
            <input
              type="url"
              value={links.github}
              onChange={(e) => setLinks({ ...links, github: e.target.value })}
              placeholder="https://github.com/..."
            />
          </label>
          <label>
            <span>LinkedIn</span>
            <input
              type="url"
              value={links.linkedin}
              onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </label>
        </div>
      </section>
    </div>
  );
}
