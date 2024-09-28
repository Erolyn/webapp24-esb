import { serve } from "@hono/node-server";
import config from "../config.ts";
import app from "./app.ts";

console.log(`Starting backend server on port ${config.port}`);
serve({
	fetch: app.fetch,
	port: config.port,
});