import { setupServer } from "msw/node";
import { API_TYPE } from "../../config";
import { handlers } from "../graphql/handlers";
import { handlers as handlersRest } from "./server-handlers";

// @ts-ignore: removing unnecessary warning from antd for test environment
globalThis.ASYNC_VALIDATOR_NO_WARNING = 1;

const type = API_TYPE;

//@ts-ignore
const _handlers = type === "graphql" ? handlers : handlersRest;

const server = setupServer(..._handlers);

export * from "msw";
export { server };
