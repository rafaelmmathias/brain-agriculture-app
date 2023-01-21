import { setupWorker } from "msw";
import { handlers } from "../graphql/handlers";

const server = setupWorker(...handlers);

if (import.meta.env.MODE === "development") {
  server.start({
    quiet: true,
    onUnhandledRequest: "bypass",
  });
}

export * from "msw";
export { server };
