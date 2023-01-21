import codegen from "codegen.macro";

/**
 * When running in dev, we use mock with dev-server
 * When running tests, we use mock with test-server
 * If is production mode, we do not mock anything.
 * So, to run in production, make sure to have an API running
 * on the .env file endpoint.
 */
console.log(import.meta.env)
// codegen`
// if (import.meta.env.MODE === 'development') {
//   module.exports = "export * from './dev-server'"
// } else if (import.meta.env.MODE === 'test') {
//   module.exports = "export * from './test-server'"
// } else {
//   module.exports = ""
// }
// `;

export * from "./dev-server";
