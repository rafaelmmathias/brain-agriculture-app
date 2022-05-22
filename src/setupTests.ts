// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { clearDb, initializeDb } from "./test/data/db";
import { server } from "./test/server/test-server";

//Mocking charts to avoid error renderings in test environment
jest.mock("react-chartjs-2", () => ({
  Pie: () => null,
}));

//Mocking methods which are not implemented in JSDOM
//https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
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
