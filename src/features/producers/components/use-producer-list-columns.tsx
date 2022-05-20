import { Row, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ProducerListActions } from ".";
import { Producer } from "../../../models/producer";

export const useProducersListColumns = () => {
  return [
    {
      title: "Documento",
      dataIndex: "document",
      key: "document",
      width: 100,
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Fazenda",
      dataIndex: "farmName",
      key: "farmName",
    },
    {
      title: "Tamanhos",
      dataIndex: "hectares",
      key: "hectares",
      render: (value, producer) => (
        <>
          <Row>
            <Typography.Text>Hectares: </Typography.Text>
            <Typography.Text>{value}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text>Área agricultável: </Typography.Text>
            <Typography.Text>{producer.farmableArea}</Typography.Text>
          </Row>
        </>
      ),
    },
    {
      title: "Cultivos",
      dataIndex: "plantedCrops",
      key: "plantedCrops",
      render: (value, producer) => {
        return (
          <>
            {producer.plantedCrops.map((crop) => (
              <Tag key={`crop-row-${producer.document}${crop.id}`}>
                {crop.name}
              </Tag>
            ))}
          </>
        );
      },
    },

    {
      title: "Actions",
      dataIndex: "",
      key: "",
      width: 200,
      render: (value, producer) => <ProducerListActions producer={producer} />,
    },
  ] as ColumnsType<Producer>;
};
