import { SyncOutlined } from "@ant-design/icons";
import { Button, Row, Space, Spin, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetProducersQuery } from "../../../../services/brain-agriculture";
import { useProducersListColumns } from "./use-producer-list-columns";
const { Title } = Typography;

export const ProducerList = () => {
  const navigate = useNavigate();
  const columns = useProducersListColumns();
  const { isFetching, refetch, data } = useGetProducersQuery();

  return (
    <>
      <Row justify="space-between">
        <Title>Produtores</Title>
        <Row justify="end">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate("create");
              }}
            >
              Cadastrar
            </Button>
            <Button data-testid="refresh-producer-list" type="primary" onClick={refetch}>
              <SyncOutlined spin={isFetching} disabled={isFetching} />
            </Button>
          </Space>
        </Row>
      </Row>
      <Spin spinning={isFetching}>
        {data && (
          <Table
            dataSource={data}
            columns={columns}
            rowKey={(producer) => producer.document}
            locale={{
              emptyText: "Nenhum produtor cadastrado"
            }}
          />
        )}
      </Spin>
    </>
  );
};
