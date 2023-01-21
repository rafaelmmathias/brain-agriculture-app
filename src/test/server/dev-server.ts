import { setupWorker } from "msw";
import { ENVIRONMENT } from "../../config";
import { handlers } from "../graphql/handlers";

const server = setupWorker(...handlers);

server.start({
  quiet: true,
  onUnhandledRequest: "bypass",
});
