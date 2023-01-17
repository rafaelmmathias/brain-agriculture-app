import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import { SelectState } from "../../../../components";
import { Producer } from "../../../../models/producer";
import { ProducerFormRules } from "./producer-form.rules";
import InputMask from "antd-mask-input";
import { useMemo } from "react";
import { useGetCropsQuery } from "../../../../services//hooks/useGetCropsQuery";

interface ProducerFormProps {
  initialValues?: Producer;
  isLoading?: boolean;
  onSubmit: (producer: Producer) => void;
}

export const ProducerForm: React.FC<ProducerFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const { data: crops, isLoading } = useGetCropsQuery();

  const transformedInitialValues = useMemo(
    () =>
      initialValues && {
        ...initialValues,
        plantedCrops: initialValues.plantedCrops.map((crop) => crop.id),
      },
    [initialValues]
  );

  return (
    <Form.Provider>
      <Form
        name="basic"
        layout="vertical"
        initialValues={transformedInitialValues}
        onFinish={(data) => {
          onSubmit(data);
        }}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Row justify="center">
          <Col span={12}>
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="document"
                  label="Documento (CPF ou CNPJ)"
                  rules={ProducerFormRules.document}
                >
                  <InputMask
                    data-testid="document-input"
                    mask={[
                      {
                        mask: "000.000.000-00",
                      },
                      {
                        mask: "00.000.000/0000-00",
                      },
                    ]}
                    maskOptions={{
                      dispatch: (appended, dynamicMasked) => {
                        const rawValue = (
                          dynamicMasked.value + appended
                        ).replace(/\D/g, "");

                        const maskIndex = rawValue.length > 11 ? 1 : 0;

                        return dynamicMasked.compiledMasks[maskIndex];
                      },
                    }}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="name"
                  label="Nome do produtor"
                  rules={ProducerFormRules.name}
                >
                  <Input data-testid="producer-name-input" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="farmName"
                  label="Nome da fazenda"
                  rules={ProducerFormRules.farmName}
                >
                  <Input data-testid="farm-name-input" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="city"
                  label="Cidade"
                  rules={ProducerFormRules.city}
                >
                  <Input data-testid="city-input" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="state"
                  label="Estado"
                  rules={ProducerFormRules.state}
                >
                  <SelectState data-testid="state-input" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="hectares"
                  label="Tamanho da fazenda (Hectares)"
                  dependencies={["farmableArea", "vegetationArea"]}
                  rules={ProducerFormRules.hectares}
                >
                  <InputNumber min={0} data-testid="total-size-input" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Form.Item
                  name="farmableArea"
                  label="Área agricultável (Hectares)"
                  rules={ProducerFormRules.farmableArea}
                >
                  <InputNumber min={0} data-testid="farmable-input" />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name="vegetationArea"
                  label="Área de vegetação (Hectares)"
                  rules={ProducerFormRules.vegetationArea}
                >
                  <InputNumber min={0} data-testid="vegetation-input" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="plantedCrops"
              label="Culturas plantadas"
              rules={[
                {
                  required: true,
                  message: "Selecione pelo menos uma cultura",
                },
              ]}
            >
              <Select
                data-testid="planted-crops-input"
                placement="topLeft"
                mode="multiple"
                loading={isLoading}
                fieldNames={{
                  label: "name",
                  value: "id",
                }}
                options={crops}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Row justify="end">
              <Button
                data-testid="button-submit"
                type="primary"
                htmlType="submit"
              >
                Salvar
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </Form.Provider>
  );
};
