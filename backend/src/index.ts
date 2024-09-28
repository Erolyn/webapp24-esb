import { serve } from "@hono/node-server";
import { port } from "../config.ts";
import app from "./app.ts";

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});