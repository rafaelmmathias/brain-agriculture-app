import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { API_BASE_URL } from "../../../../config";
import { server } from "../../../../test/server/test-server";
import { fillProducerFormAndSubmit, render } from "../../../../test/test-utils";
import { ProducerCreate } from "./producer-create.component";

const errorHandler = rest.post(
  `${API_BASE_URL}/producers`,
  async (req, res, ctx) => {
    if (!req.body) return;

    return res(ctx.status(500), ctx.json({}));
  }
);

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

describe("Producer create", () => {
  it("should show success message after creating", async () => {
    const { container } = render(<ProducerCreate />);
    await fillProducerFormAndSubmit(container, formPayload);

    await waitFor(async () => {
      const successMessage = await screen.findByText(
        "Produtor inserido com sucesso."
      );

      expect(successMessage).toBeVisible();
    });
  });

  it("should show error message after creation attempt", async () => {
    server.use(errorHandler);

    const { container } = render(<ProducerCreate />);
    await fillProducerFormAndSubmit(container, formPayload);

    await waitFor(async () => {
      const successMessage = await screen.findByText(
        "Ocorreu um erro ao tentar criar o Produtor."
      );

      expect(successMessage).toBeVisible();
    });
  });
});

export {};
