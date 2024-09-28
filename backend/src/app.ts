import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";
import path from "path";
import { Experience, Project } from "./types";

// Create a new Hono application
const app = new Hono();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./" }));

// Helper functions to get paths
const getProjectsPath = () =>
  path.join(__dirname, "../data/projects/projects.json");
const getExperiencesPath = () =>
  path.join(__dirname, "../data/experiences/experiences.json");

// Define a GET route to fetch projects
app.get("/projects", async (c) => {
  try {
    const data = await readFile(getProjectsPath(), "utf8");
    const projects: Project[] = JSON.parse(data);
    return c.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return c.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
});

// Define a POST route to add a new project
app.post("/projects", async (c) => {
  try {
    const newProject: Project = await c.req.json();
    const data = await readFile(getProjectsPath(), "utf8");
    const projects = JSON.parse(data);
    projects.push(newProject);
    await writeFile(getProjectsPath(), JSON.stringify(projects, null, 2));
    return c.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return c.json({ error: "Failed to add project" }, { status: 500 });
  }
});

// Define a PUT route to update a project
app.put("/projects/:id", async (c) => {
  try {
    const updatedProject: Project = await c.req.json();
    const projectId = c.req.param("id");
    const data = await readFile(getProjectsPath(), "utf8");
    const projects = JSON.parse(data);
    const projectIndex = projects.findIndex(
      (project: Project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      projects[projectIndex] = updatedProject;
      await writeFile(getProjectsPath(), JSON.stringify(projects, null, 2));
      return c.json(updatedProject);
    }
    return c.json({ error: "Project not found" }, { status: 404 });
  } catch (error) {
    console.error("Error updating project:", error);
    return c.json({ error: "Failed to update project" }, { status: 500 });
  }
});

// Define a DELETE route to delete a project
app.delete("/projects/:id", async (c) => {
  try {
    const projectId = c.req.param("id");
    const data = await readFile(getProjectsPath(), "utf8");
    const projects = JSON.parse(data);
    const projectIndex = projects.findIndex(
      (project: Project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      projects.splice(projectIndex, 1);
      await writeFile(getProjectsPath(), JSON.stringify(projects, null, 2));
      return c.json({ message: "Project deleted" });
    }
    return c.json({ error: "Project not found" }, { status: 404 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return c.json({ error: "Failed to delete project" }, { status: 500 });
  }
});

// Define a GET route to fetch experiences
app.get("/experiences", async (c) => {
  try {
    const data = await readFile(getExperiencesPath(), "utf8");
    const experiences: Experience[] = JSON.parse(data);
    return c.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return c.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
});

// Define a POST route to add a new experience
app.post("/experiences", async (c) => {
  try {
    const newExperience: Experience = await c.req.json();
    const data = await readFile(getExperiencesPath(), "utf8");
    const experiences = JSON.parse(data);
    experiences.push(newExperience);
    await writeFile(getExperiencesPath(), JSON.stringify(experiences, null, 2));
    return c.json(newExperience, { status: 201 });
  } catch (error) {
    console.error("Error adding experience:", error);
    return c.json({ error: "Failed to add experience" }, { status: 500 });
  }
});

// Define a PUT route to update an experience
app.put("/experiences/:id", async (c) => {
  try {
    const updatedExperience: Experience = await c.req.json();
    const experienceId = c.req.param("id");
    const data = await readFile(getExperiencesPath(), "utf8");
    const experiences = JSON.parse(data);
    const experienceIndex = experiences.findIndex(
      (experience: Experience) => experience.id === experienceId
    );
    if (experienceIndex !== -1) {
      experiences[experienceIndex] = updatedExperience;
      await writeFile(
        getExperiencesPath(),
        JSON.stringify(experiences, null, 2)
      );
      return c.json(updatedExperience);
    }
    return c.json({ error: "Experience not found" }, { status: 404 });
  } catch (error) {
    console.error("Error updating experience:", error);
    return c.json({ error: "Failed to update experience" }, { status: 500 });
  }
});

// Define a DELETE route to delete an experience
app.delete("/experiences/:id", async (c) => {
  try {
    const experienceId = c.req.param("id");
    const data = await readFile(getExperiencesPath(), "utf8");
    const experiences = JSON.parse(data);
    const experienceIndex = experiences.findIndex(
      (experience: Experience) => experience.id === experienceId
    );
    if (experienceIndex !== -1) {
      experiences.splice(experienceIndex, 1);
      await writeFile(
        getExperiencesPath(),
        JSON.stringify(experiences, null, 2)
      );
      return c.json({ message: "Experience deleted" });
    }
    return c.json({ error: "Experience not found" }, { status: 404 });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return c.json({ error: "Failed to delete experience" }, { status: 500 });
  }
});

export default app;
