import { screen, waitFor } from "@testing-library/react";
import { render } from "@/test/test-utils";
import { Dashboard } from "./components";

describe("Dashboard", () => {
  it("should render dashboard and show this label", async () => {
    render(<Dashboard />);

    await waitFor(() => screen.findByText("Total de fazendas"));
  });
});

export {};
