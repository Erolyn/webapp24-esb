import React, { PropsWithChildren, useState } from "react";
import { ProjectProps, ProjectsProps } from "../types";

export default function Projects({
  children,
  onRemoveProjectButtonClicked,
  projects,
}: Readonly<PropsWithChildren<ProjectsProps>>) {
  // State to manage the visibility of project details
  const [visibleProjectIds, setVisibleProjectIds] = useState<Set<string>>(
    new Set()
  );

  const toggleProjectDetails = (id: string) => {
    const newVisibleProjectIds = new Set(visibleProjectIds);
    if (newVisibleProjectIds.has(id)) {
      newVisibleProjectIds.delete(id);
    } else {
      newVisibleProjectIds.add(id);
    }
    setVisibleProjectIds(newVisibleProjectIds);
  };

  const renderProjectList = () => (
    <div id="projects-container">
      {projects.map((project: ProjectProps) => (
        <div className="project-card" key={project.id}>
          <h3>{project.title}</h3>
          <button onClick={() => toggleProjectDetails(project.id)}>
            {visibleProjectIds.has(project.id) ? "Show Less" : "Read More"}
          </button>
          {visibleProjectIds.has(project.id) && (
            <div className="project-details">
              <p>{project.description}</p>
              {/* Add other project details as needed */}
              <button onClick={() => onRemoveProjectButtonClicked(project.id)}>
                Remove project
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderProjectCountByCategory = () => {
    const projectCountByCategory = projects.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="category-list">
        <h2>Total Projects per Category:</h2>
        <ul>
          {Object.entries(projectCountByCategory).map(([category, count]) => (
            <li key={category}>
              {category}: {count}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section>
      {children}
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <>
          {renderProjectList()}
          {renderProjectCountByCategory()}
        </>
      )}
    </section>
  );
}
