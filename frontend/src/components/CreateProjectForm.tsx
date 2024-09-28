import React, { useState } from "react";
import { ProjectProps } from "../types";

interface CreateProjectFormProps {
  onCreateProjectFormSubmitted: (
    projectData: Omit<ProjectProps, "id"> & { startDate: Date; endDate?: Date }
  ) => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onCreateProjectFormSubmitted,
}) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onCreateProjectFormSubmitted({
      title,
      image: imageUrl,
      description,
      category,
      startDate,
      endDate,
    });

    // Clear form fields after submission
    setTitle("");
    setImageUrl("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(undefined);
    setCategory("");
  };

  return (
    <div id="project-form-container">
      <form id="project-form" onSubmit={handleSubmit}>
        <h3>Add New Project</h3>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate.toISOString().split("T")[0]} // Format for input
          onChange={(e) => setStartDate(new Date(e.target.value))}
          required
        />
        <label>End Date (optional):</label>
        <input
          type="date"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setEndDate(e.target.value ? new Date(e.target.value) : undefined)
          }
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
