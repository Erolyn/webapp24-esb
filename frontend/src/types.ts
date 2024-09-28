export type ExperienceProps = {
  id: ReturnType<typeof crypto.randomUUID>;
  name: string;
  description: string;
};

export type ExperiencesProps = {
  experiences: ExperienceProps[];
};

export type ProjectProps = {
  id: string;
  title: string;
  image?: string;
  description: string;
  category: string;
  startDate: Date;
  endDate?: Date;
};

export type CreateProjectFormProps = {
  onCreateProjectFormSubmitted: (
    projectData: Omit<ProjectProps, "id"> & { startDate: Date; endDate?: Date }
  ) => void;
};

export type ProjectsProps = {
  projects: ProjectProps[];
  onRemoveProjectButtonClicked: (id: string) => void;
};

export type StudentProps = {
  name: string;
  degree: string;
  points: number;
  email: string;
};

export type Action = "add" | "delete";
