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
import { useGetCropsQuery } from "../../../../services/brain-agriculture";
import { ProducerFormRules } from "./producer-form.rules";

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

  return (
    <Form.Provider>
      <Form
        name="basic"
        layout="vertical"
        initialValues={initialValues}
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
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="name"
                  label="Nome do produtor"
                  rules={ProducerFormRules.name}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="farmName"
                  label="Nome da fazenda"
                  rules={ProducerFormRules.farmName}
                >
                  <Input />
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
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="state"
                  label="Estado"
                  rules={ProducerFormRules.state}
                >
                  <SelectState />
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
                  <InputNumber min={0} />
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
                  <InputNumber min={0} />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name="vegetationArea"
                  label="Área de vegetação (Hectares)"
                  rules={ProducerFormRules.vegetationArea}
                >
                  <InputNumber min={0} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item
                name="plantedCrops"
                valuePropName="id"
                label="Culturas plantadas"
                rules={[
                  {
                    required: true,
                    message: "Selecione pelo menos uma cultura",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  loading={isLoading}
                  defaultValue={initialValues?.plantedCrops.map(
                    (crop) => crop.id
                  )}
                  fieldNames={{
                    label: "name",
                    value: "id",
                  }}
                  labelInValue
                  options={crops}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Row>
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </Form.Provider>
  );
};
