import { Button, Form, Input, Row, Select } from "antd";
import { Producer } from "../../../../models/producer";
import { useGetCropsQuery } from "../../../../services/brain-agriculture";

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
        <Form.Item name="document" label="Documento (CPF ou CNPJ)">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Nome do produtor">
          <Input />
        </Form.Item>
        <Form.Item name="farmName" label="Nome da fazenda">
          <Input />
        </Form.Item>
        <Form.Item name="city" label="Cidade">
          <Input />
        </Form.Item>
        <Form.Item name="state" label="Estado">
          <Input />
        </Form.Item>
        <Form.Item name="hectares" label="Hectares">
          <Input />
        </Form.Item>
        <Form.Item name="farmableArea" label="Área agricultável">
          <Input />
        </Form.Item>
        <Form.Item name="vegetationArea" label="Área de vegetação">
          <Input />
        </Form.Item>
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
            defaultValue={initialValues?.plantedCrops.map((crop) => crop.id)}
            fieldNames={{
              label: "name",
              value: "id",
            }}
            labelInValue
            options={crops}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Form.Provider>
  );
};
