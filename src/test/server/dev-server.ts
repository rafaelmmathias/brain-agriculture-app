import { setupWorker } from "msw";
import { API_TYPE } from "../../config";
import { handlers } from "../graphql/handlers";
import { handlers as handlersRest } from "./server-handlers";

const type = API_TYPE;

//@ts-ignore
const _handlers = type === "graphql" ? handlers : handlersRest;

const server = setupWorker(..._handlers);

server.start({
  quiet: true,
  onUnhandledRequest: "bypass",
});

export * from "msw";
export { server };
