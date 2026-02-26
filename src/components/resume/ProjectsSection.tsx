import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { BulletDetailsField } from './BulletDetailsField';
import { ProjectTechInput } from './ProjectTechInput';

const DESC_MAX = 200;

export function ProjectsSection() {
  const { data, addProject, removeProject, updateProject } = useResume();
  const [openId, setOpenId] = useState<string | null>(data.projects[0]?.id ?? null);

  return (
    <section className="form-section">
      <div className="form-section-head">
        <h3 className="form-section-title">Projects</h3>
        <button type="button" className="btn-text" onClick={addProject}>
          + Add Project
        </button>
      </div>
      <div className="projects-accordion">
        {data.projects.map((entry) => {
          const isOpen = openId === entry.id;
          const title = entry.name?.trim() || 'Untitled Project';
          return (
            <div key={entry.id} className="project-accordion-item">
              <button
                type="button"
                className="project-accordion-header"
                onClick={() => setOpenId(isOpen ? null : entry.id)}
              >
                <span>{title}</span>
                <span className="project-accordion-chevron">{isOpen ? '▼' : '▶'}</span>
              </button>
              {isOpen && (
                <div className="project-accordion-body">
                  <label>
                    <span>Project Title</span>
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
                  <label>
                    <span>Description (max {DESC_MAX} chars)</span>
                    <textarea
                      className="form-textarea"
                      value={entry.description ?? ''}
                      onChange={(e) =>
                        updateProject(entry.id, {
                          description: e.target.value.slice(0, DESC_MAX),
                        })
                      }
                      placeholder="Short description..."
                      rows={2}
                      maxLength={DESC_MAX}
                    />
                    <span className="char-counter">
                      {(entry.description ?? '').length}/{DESC_MAX}
                    </span>
                  </label>
                  <label>
                    <span>Tech Stack</span>
                    <ProjectTechInput
                      value={entry.techStack ?? []}
                      onChange={(techStack) => updateProject(entry.id, { techStack })}
                    />
                  </label>
                  <label>
                    <span>Live URL (optional)</span>
                    <input
                      type="url"
                      value={entry.liveUrl ?? ''}
                      onChange={(e) => updateProject(entry.id, { liveUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </label>
                  <label>
                    <span>GitHub URL (optional)</span>
                    <input
                      type="url"
                      value={entry.githubUrl ?? ''}
                      onChange={(e) => updateProject(entry.id, { githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </label>
                  <label className="span-2">
                    <span>Details (optional) — one bullet per line</span>
                    <BulletDetailsField
                      value={entry.details ?? ''}
                      onChange={(v) => updateProject(entry.id, { details: v })}
                      placeholder="Outcomes, metrics..."
                    />
                  </label>
                  <div className="project-accordion-actions">
                    <button
                      type="button"
                      className="btn-remove project-delete-btn"
                      onClick={() => removeProject(entry.id)}
                    >
                      Delete project
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
