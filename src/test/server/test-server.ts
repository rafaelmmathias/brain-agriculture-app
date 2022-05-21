import { setupServer } from "msw/node";
import { handlers } from "./server-handlers";

// @ts-ignore: removing unnecessary warning from antd for test environment
globalThis.ASYNC_VALIDATOR_NO_WARNING = 1;

const server = setupServer(...handlers);

export * from "msw";
export { server };
