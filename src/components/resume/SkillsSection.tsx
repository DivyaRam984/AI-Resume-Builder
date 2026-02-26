import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { SkillTagInput } from './SkillTagInput';

export function SkillsSection() {
  const { data, addSkill, removeSkill, suggestSkills } = useResume();
  const [suggesting, setSuggesting] = useState(false);

  const handleSuggest = async () => {
    setSuggesting(true);
    await suggestSkills();
    setSuggesting(false);
  };

  return (
    <section className="form-section">
      <div className="form-section-head">
        <h3 className="form-section-title">Skills</h3>
        <button
          type="button"
          className="btn-text suggest-skills-btn"
          onClick={handleSuggest}
          disabled={suggesting}
        >
          {suggesting ? 'Adding…' : '✨ Suggest Skills'}
        </button>
      </div>
      <SkillTagInput
        skills={data.skills}
        onAdd={addSkill}
        onRemove={removeSkill}
      />
    </section>
  );
}
