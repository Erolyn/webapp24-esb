import React, { useEffect, useState } from "react";
import Contact from "./components/Contact";
import CreateProjectForm from "./components/CreateProjectForm";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import config from "./config";
import { ExperienceProps, ProjectProps } from "./types";

const student = "Elise Brun";
const degree = "Informatikk - Bachelor";
const points = 180;
const email = "student@hiof.no";

function App() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
  const [activePage, setActivePage] = useState("projects");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state from localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Apply or remove the 'dark-mode' class to the body element
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);

    // Update localStorage whenever the dark mode state changes
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Fetch Projects
  async function fetchProjectData() {
    try {
      const res = await fetch(
        `${config.apiAddress}:${config.apiPort}/projects`
      );
      const data: ProjectProps[] = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // Fetch Experiences
  async function fetchExperienceData() {
    try {
      const res = await fetch(
        `${config.apiAddress}:${config.apiPort}/experiences`
      );
      const data: ExperienceProps[] = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  // Add Project
  async function addProject(project: Omit<ProjectProps, "id">) {
    try {
      await fetch(`${config.apiAddress}:${config.apiPort}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...project,
          id: crypto.randomUUID(),
          startDate: project.startDate.toISOString(), // Convert Date to string
          endDate: project.endDate ? project.endDate.toISOString() : undefined, // Convert Date to string
        }),
      });
      fetchProjectData();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  }

  // Delete Project
  async function removeProjectData(id: string) {
    try {
      await fetch(`${config.apiAddress}:${config.apiPort}/projects/${id}`, {
        method: "DELETE",
      });
      fetchProjectData();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  // Handle Project Mutation
  function HandleProjectDeletion(id: string) {
    removeProjectData(id);
  }

  // Handle Form Submission for Projects
  function ProjectFormSubmittedHandler(
    projectData: Omit<ProjectProps, "id"> & { startDate: Date; endDate?: Date }
  ) {
    addProject(projectData);
  }

  // Page Anchor Click Handler
  function PageAnchorClickedHandler(page: string) {
    setActivePage(page);
  }

  // Fetch projects and experiences on mount
  useEffect(() => {
    fetchProjectData();
    fetchExperienceData();
  }, []);

  return (
    <>
      <Header onPageAnchorClicked={PageAnchorClickedHandler} />
      <main>
        {activePage === "createProject" ? (
          <CreateProjectForm
            onCreateProjectFormSubmitted={ProjectFormSubmittedHandler}
          />
        ) : activePage === "contact" ? (
          <Contact email={email} onContactFormSubmitted={() => {}} />
        ) : (
          <>
            <h1>EXPERIENCES</h1>
            <Experiences experiences={experiences} />
            <h1>PROJECTS</h1>
            <Projects
              projects={projects}
              onRemoveProjectButtonClicked={HandleProjectDeletion}
            />
          </>
        )}
      </main>
      <Footer onToggleDarkMode={toggleDarkMode} />
    </>
  );
}

export default App;
