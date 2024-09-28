import React, { PropsWithChildren, useState } from "react";
import { ExperiencesProps } from "../types";

export default function Experiences({
  children,
  experiences,
}: Readonly<PropsWithChildren<ExperiencesProps>>) {
  // State to manage the visibility of experience details
  const [visibleExperienceIds, setVisibleExperienceIds] = useState<Set<string>>(
    new Set()
  );

  const toggleExperienceDetails = (id: string) => {
    const newVisibleExperienceIds = new Set(visibleExperienceIds);
    if (newVisibleExperienceIds.has(id)) {
      newVisibleExperienceIds.delete(id);
    } else {
      newVisibleExperienceIds.add(id);
    }
    setVisibleExperienceIds(newVisibleExperienceIds);
  };

  const renderExperienceList = () => (
    <div id="experiences-container">
      {experiences.map((experience) => (
        <div className="experience-card" key={experience.id}>
          <h2>{experience.name}</h2>
          <button onClick={() => toggleExperienceDetails(experience.id)}>
            {visibleExperienceIds.has(experience.id)
              ? "Show Less"
              : "Read More"}
          </button>
          {visibleExperienceIds.has(experience.id) && (
            <div className="experience-details">
              <p>{experience.description}</p>
              {/* Add other experience details as needed */}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section>
      {children}
      {experiences.length === 0 ? (
        <p>No known experiences.</p>
      ) : (
        renderExperienceList()
      )}
    </section>
  );
}
