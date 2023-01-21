import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  fillProducerFormAndSubmit,
  getFormElements,
  render,
} from "../../../../test/test-utils";
import { ProducerForm } from "./producer-form";

describe("Producer Form", () => {
  it("should validate invalid CPF field", async () => {
    render(<ProducerForm onSubmit={() => {}} />);

    const { submitButton, documentInput } = getFormElements();
    userEvent.type(documentInput, "11111111111");
    userEvent.click(submitButton);

    const cpfErrorMessage = await waitFor(() =>
      screen.findByText("CPF inválido")
    );

    expect(cpfErrorMessage).toBeVisible();
  });

  it("should validate invalid CNPJ field", async () => {
    render(<ProducerForm onSubmit={() => {}} />);

    const { submitButton, documentInput } = getFormElements();
    userEvent.type(documentInput, "11111111111111");

    userEvent.click(submitButton);

    const cpfErrorMessage = await waitFor(() =>
      screen.findByText("CNPJ inválido")
    );

    expect(cpfErrorMessage).toBeVisible();
  });

  it("should validate farm size among others areas", async () => {
    const expectedErrorMessage =
      "A área da fazenda precisa ser maior ou igual à soma da área agricultável e de vegetação";

    render(<ProducerForm onSubmit={() => {}} />);

    const { totalSizeInput, farmableInput, vegetationInput } =
      getFormElements();

    userEvent.type(totalSizeInput, "50");
    userEvent.type(farmableInput, "25");
    userEvent.type(vegetationInput, "26");

    const submitButton = await waitFor(() =>
      screen.findByTestId("button-submit")
    );

    userEvent.click(submitButton);

    await waitFor(() => screen.findByText(expectedErrorMessage));
  });

  it("should receive valid producer", async () => {
    const formPayload = {
      city: "Indaiatuba",
      document: "489.462.050-24",
      farmName: "Farm name",
      farmableArea: 25,
      hectares: 50,
      name: "Producer name",
      plantedCrops: ["1"],
      state: "AL",
      vegetationArea: 25,
    };

    const mockedCallback = jest.fn();
    const { container } = render(<ProducerForm onSubmit={mockedCallback} />);

    await fillProducerFormAndSubmit(container, formPayload);

    await waitFor(() => expect(mockedCallback).toHaveBeenCalled());
  });
});
