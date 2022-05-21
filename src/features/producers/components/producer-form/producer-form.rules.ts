import { Rule } from "antd/lib/form";

type Rules = {
  [key: string]: Rule[];
};

export const ProducerFormRules = {
  state: [
    {
      required: true,
      message: "Estado é obrigatório",
    },
  ],
  city: [
    {
      required: true,
      message: "Cidade é obrigatório",
    },
  ],
  farmName: [
    {
      required: true,
      message: "Nome da fazenda é obrigatório",
    },
  ],
  document: [
    {
      required: true,
      message: "Documento é obrigatório",
    },
  ],
  name: [
    {
      required: true,
      message: "Nome é obrigatório",
    },
  ],
  farmableArea: [
    {
      required: true,
      message: "Área agricultável é obrigatório",
    },
  ],
  vegetationArea: [
    {
      required: true,
      message: "Área de vegetação é obrigatório",
    },
  ],
  hectares: [
    {
      required: true,
      message: "Hectares da fazenda é obrigatório",
    },
    ({ getFieldValue }) => ({
      validator(_, totalFarmSize) {
        const farmableArea = getFieldValue("farmableArea");
        const vegetationArea = getFieldValue("vegetationArea");
        const userInputSize = farmableArea + vegetationArea;

        if (totalFarmSize >= userInputSize) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error(
              "A área da fazenda precisa ser maior ou igual à soma da área agricultável e de vegetação"
            )
          );
        }
      },
    }),
  ],
} as Rules;
