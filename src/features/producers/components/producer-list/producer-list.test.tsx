import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ProducerList } from "..";
import { render } from "test/test-utils";
import userEvent from "@testing-library/user-event";
import { clearDb } from "test/data/db";

describe("Producer list", () => {
  it("should render all default mocked items", async () => {
    render(<ProducerList />);

    const rows = await waitFor(() => screen.findAllByTestId("delete-button"));

    expect(rows.length).toEqual(4);
  });

  it("should delete one producer", async () => {
    render(<ProducerList />);
    const rows = await waitFor(() => screen.findAllByText("872.525.330-18"));
    expect(rows.length).toEqual(1);

    const deleteButtons = await waitFor(() =>
      screen.findAllByTestId("delete-button")
    );

    userEvent.click(deleteButtons[0]);

    const confirmButton = await waitFor(() => screen.findByTestId("delete-1"));
    userEvent.click(confirmButton);

    await waitForElementToBeRemoved(() => screen.queryByText("872.525.330-18"));

    const rowsAfterDelete = await waitFor(() =>
      screen.findAllByTestId("delete-button")
    );

    expect(rowsAfterDelete.length).toEqual(3);
  });

  it("should show empty message", async () => {
    clearDb();
    render(<ProducerList />);

    const refreshButton = await waitFor(() =>
      screen.findByTestId("refresh-producer-list")
    );

    userEvent.click(refreshButton);

    const rowsAfterDelete = await waitFor(() =>
      screen.findByText("Nenhum produtor cadastrado")
    );

    expect(rowsAfterDelete).toBeInTheDocument();
  });
});

export {};
