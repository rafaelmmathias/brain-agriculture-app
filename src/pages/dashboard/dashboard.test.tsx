import { screen, waitFor } from "@testing-library/react";
import { Dashboard } from "./components";
import { render } from "../../test/test-utils";

describe("Dashboard", () => {
  it("should render dashboard and show this label", async () => {
    render(<Dashboard />);

    await waitFor(() => screen.findByText("Total de fazendas"));
  });
});

export {};
