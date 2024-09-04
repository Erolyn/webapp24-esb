function renderProjects(projects: any[]) {

  
  const projectsContainer = document.getElementById("projects-container");

  if (!projectsContainer) return;

  projectsContainer.innerHTML = "";

  projects.forEach((project) => {
    const projectCard = document.createElement("article");
    projectCard.className = "project-card";

    projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>`
            // <img src="${project.image}" alt="${project.title}" class="project-image">
            // <p><strong>Start Date:</strong> ${project.startDate}</p>
            // <p><strong>End Date:</strong> ${project.endDate}</p>
            ;
    //<p><strong>Status:</strong> ${project.status}</p>

    projectsContainer.appendChild(projectCard);
  });
}

function fetchProjects() {
  fetch("http://localhost:3999/projects")
    .then((response) => response.json())
    .then((projects) => {
      renderProjects(projects);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
    });
}

function addProject(event: Event) {
  event.preventDefault();
  console.log("Form submitted");

  const id = crypto.randomUUID();
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (document.getElementById("description") as HTMLTextAreaElement).value;
  // const image = (document.getElementById("image") as HTMLInputElement).value;
  const startDate = (document.getElementById("startDate") as HTMLInputElement).value;
  const endDate = (document.getElementById("endDate") as HTMLInputElement).value;
  const status = "1";

  const newProject = {
    id,
    title,
    // image,
    description,
    startDate,
    endDate,
    status,
  };

  fetch("http://localhost:3999/projects", {
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
}



const projectForm = document.getElementById("project-form");
if (projectForm) {
  console.log("Project form found");
  projectForm.addEventListener("submit", addProject);
}

fetchProjects();
