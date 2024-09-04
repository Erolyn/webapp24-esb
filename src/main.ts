import { UUID } from "crypto";

// TODO: Refactor code

      // 1. Avoid using global namescape, look into IIFE
      // 2. Use async/await instead of promises
      // 3. Use TypeScript more consistently
      // 4. Better error handling
      // 5. Add comments
      // 6. Add handling for image upload (as optional field)

const projectsURL = "http://localhost:3999/projects";
const projectsContainer = document.getElementById("projects-container");
const projectFormContainer = document.getElementById("project-form-container");

function fetchProjects() {
  fetch(projectsURL)
    .then((response) => response.json())
    .then((projects) => {
      renderProjects(projects);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
};

function addProject(event: Event) {
  event.preventDefault();
  console.log("Form submitted");

  const id: UUID = crypto.randomUUID();
  const title: string = (document.getElementById("title") as HTMLInputElement).value;
  const description: string = (document.getElementById("description") as HTMLTextAreaElement).value;
  const startDate: Date = new Date((document.getElementById("startDate") as HTMLInputElement).value);
  const endDate: Date = new Date((document.getElementById("endDate") as HTMLInputElement).value);
  const status: string = "1"; // 1 - active, 0 - inactive
  const createdAt: Date = new Date();

  const newProject = {
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    createdAt
  };

  fetch(projectsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  })
    .then(() => {
      fetchProjects();
    })
    .catch((error) => {
      console.error("Error adding project:", error);
    });

  (document.getElementById("project-form") as HTMLFormElement).reset();
};

document.addEventListener("DOMContentLoaded", () => {
  const addProjectsLink = document.querySelector('a[href="#add-projects"]');
  const projectsLink = document.querySelector('a[href="#projects"]');

  if (addProjectsLink) {
    addProjectsLink.addEventListener("click", (event) => {
      event.preventDefault();
      renderForm();
    });
  }

  if (projectsLink) {
    projectsLink.addEventListener("click", (event) => {
      event.preventDefault();
      fetchProjects();
    });
  }

  fetchProjects();
});

function renderProjects(projects: any[]) {

  if (!projectsContainer || !projectFormContainer) return;

  projectsContainer.style.display = "grid";
  projectFormContainer.style.display = "none";

  projectsContainer.innerHTML = "";

  if (projects.length === 0) {
    const noProjectsMessage = document.createElement("p");
    noProjectsMessage.textContent = "Error: no projects in the projects array.";
    projectsContainer.appendChild(noProjectsMessage);
    return;
  }

  projects.forEach((project) => {
    const projectCard = document.createElement("article");
    projectCard.className = "project-card";

    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>`;
      // <img src="${project.image}" alt="${project.title}" class="project-image">
      // <p><strong>Start Date:</strong> ${project.startDate}</p>
      // <p><strong>End Date:</strong> ${project.endDate}</p>
      // <p><strong>Status:</strong> ${project.status}</p>

    projectsContainer.appendChild(projectCard);
  });
};

function renderForm() {

  if (!projectsContainer || !projectFormContainer) return;

  projectsContainer.style.display = "none";
  projectFormContainer.style.display = "block";

  projectFormContainer.innerHTML = `
    <form id="project-form">
      <h3>New project</h3>
      <label for="title">Project Title:</label>
      <input type="text" id="title" name="title" required>

      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea>

      <label for="startDate">Start Date</label>
      <input type="date" id="startDate" name="startDate" required>

      <label for="endDate">End Date</label>
      <input type="date" id="endDate" name="endDate">

      <button type="submit">Add Project</button>
    </form>`;

  const form = document.getElementById("project-form");
  if (form) {
    form.addEventListener("submit", addProject);
  }
};