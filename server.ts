import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "node:fs/promises";

// Import necessary modules

// Create a new Hono application
const app = new Hono();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use("/*", cors());

// Set up static file serving for files in the "static" folder
app.use("/static/*", serveStatic({ root: "./" }));

// Define a GET route to fetch projects
app.get("/projects", async (c) => {
    try {
        const data = await fs.readFile('./data/projects/projects.json', 'utf8');
        const projects = JSON.parse(data);
        return c.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return c.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
});

// Define a POST route to add a new project
app.post("/projects", async (c) => {
    try {
        const newProject = await c.req.json();
        // Add the new project to the projects.json file
        const data = await fs.readFile('./data/projects/projects.json', 'utf8');
        const projects = JSON.parse(data);
        projects.push(newProject);
        await fs.writeFile('./data/projects/projects.json', JSON.stringify(projects, null, 2));
        return c.json(projects, { status: 201 });
    } catch (error) {
        console.error("Error adding project:", error);
        return c.json({ error: "Failed to add project" }, { status: 500 });
    }
});

// Define the port for the server to listen on
const port = 3999;

console.log(`Server is running on port ${port}`);

// Start the server
serve({
    fetch: app.fetch,
    port,
});
