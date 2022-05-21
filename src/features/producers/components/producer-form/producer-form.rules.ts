import { Rule } from "antd/lib/form";
import { cpf, cnpj } from "cpf-cnpj-validator";

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
      validateTrigger: "onBlur",
      validator: (_, value) => {
        const isCNPJ = value?.includes("/");
        if (!value) return Promise.reject(new Error("Documento obrigatório"));

        if (isCNPJ && !cnpj.isValid(value)) {
          return Promise.reject(new Error("CNPJ inválido"));
        }

        if (isCNPJ && cnpj.isValid(value)) {
          return Promise.resolve();
        }

        if (!cpf.isValid(value)) {
          return Promise.reject(new Error("CPF inválido"));
        }

        if (cpf.isValid(value)) return Promise.resolve();
        if (cnpj.isValid(value)) return Promise.resolve();
        return Promise.reject(new Error("Documento inválido"));
      },
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
