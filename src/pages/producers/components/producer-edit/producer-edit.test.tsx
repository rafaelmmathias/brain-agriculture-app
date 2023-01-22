import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getFormElements, render } from "@/test/test-utils";
import { ProducerEdit } from "./producer-edit.component";

describe("Producer edit", () => {
  it("should show success message after editing", async () => {
    render(<ProducerEdit />, {
      route: "/producers/edit/1",
      path: "/producers/edit/:id",
    });

    //wait page load producer
    await waitFor(() => screen.findByText("Salvar"));

    const { producerNameInput, submitButton } = getFormElements();

    userEvent.type(producerNameInput, "a new name");

    userEvent.click(submitButton);

    await waitFor(async () => {
      const successMessage = await screen.findByText(
        "Produtor atualizado com sucesso."
      );

      expect(successMessage).toBeVisible();
    });
  });
});
