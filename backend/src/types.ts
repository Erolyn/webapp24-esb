import { UUID } from "crypto";

type Project = {
  id: UUID;
  title: string;
  image?: string;
  description: string;
  category: string;
  startDate: Date;
  endDate?: Date;
  status?: string;
  createdAt?: Date;
};

export type { Project };

type Experience = {
  id: UUID;
  name: string;
  description: string;
};

type ExperiencesProps = {
  experiences: Experience[];
};

export type { Experience, ExperiencesProps };
