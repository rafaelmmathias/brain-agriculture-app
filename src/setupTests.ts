// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { clearDb, initializeDb } from "./test/data/db";
import { server } from "./test/server/test-server";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
beforeEach(() => {
  clearDb();
  initializeDb();
});
afterAll(() => server.close());
