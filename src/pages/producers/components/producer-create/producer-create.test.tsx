import { screen, waitFor } from "@testing-library/react";
import { gqlMockClient } from "../../../../test/graphql/handlers";
import { server } from "../../../../test/server/test-server";
import { fillProducerFormAndSubmit, render } from "../../../../test/test-utils";
import { ProducerCreate } from "./producer-create.component";

const errorHandler = gqlMockClient.mutation(
  "CreateProducer",
  async (req, res, ctx) => {
    return res(ctx.status(500));
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
