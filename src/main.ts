function renderProjects(projects: any[]) {
    const projectsContainer = document.getElementById("projects-container");

    if (!projectsContainer) return;

    projects.forEach((project) => {
        const projectCard = document.createElement("article");
        projectCard.className = "project-card";

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Start Date:</strong> ${project.startDate}</p>
            <p><strong>End Date:</strong> ${project.endDate}</p>
            `
            //<p><strong>Status:</strong> ${project.status}</p>
        ;

        projectsContainer.appendChild(projectCard);
    });
}

function fetchProjects() {
    fetch("../data/projects/projects.json")
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

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;
    const image = (document.getElementById("image") as HTMLInputElement).value;
    const startDate = (document.getElementById("startDate") as HTMLInputElement).value;
    const endDate = (document.getElementById("endDate") as HTMLInputElement).value;
    const status = (document.getElementById("status") as HTMLInputElement).value;

    const newProject = {
        title,
        image,
        description,
        startDate,
        endDate,
        status,
    };


    fetch("../data/projects/projects.json", {
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
    projectForm.addEventListener("submit", addProject);
}

fetchProjects();
