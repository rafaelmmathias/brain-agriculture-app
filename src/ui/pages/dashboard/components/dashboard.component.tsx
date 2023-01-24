import { useMemo } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row, Space, Spin, Statistic } from "antd";
import { PieChart } from "@/ui/components";
import { useGetDashboardQuery } from "@/services/hooks";
import { ErrorBoundary } from "./dashboard.error";

const DashboardPage = () => {
  const { data, refetch } = useGetDashboardQuery();

  const soilTypes = useMemo(
    () => [
      {
        name: "Área de vegetação",
        color: "#25801c",
        count: data?.soilTypes.vegetationArea,
      },
      {
        name: "Área agricultável",
        color: "#1c7180",
        count: data?.soilTypes.farmableArea,
      },
    ],
    [data]
  );

  return data ? (
    <>
      <Row gutter={16} justify="center">
        <Card>
          <Row justify="space-between" align="middle">
            <Space size={"large"}>
              <Statistic title="Total de fazendas" value={data.farms} />
              <Statistic title="Hectares" value={data.hectares} />
            </Space>
            <Button
              icon={<SyncOutlined />}
              onClick={() => {
                refetch();
              }}
            ></Button>
          </Row>
          <Divider />
          <Row gutter={16} justify="center">
            <Col span={8}>
              <Card title={"Fazendas por estado"}>
                <PieChart data={data.states} fieldLabelName="state" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title={"Por culturas"}>
                <PieChart data={data.crops} />
              </Card>
            </Col>

            <Col span={8}>
              <Card title={"Por uso do solo"}>
                <PieChart data={soilTypes} />
              </Card>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  ) : (
    <Spin spinning={true}></Spin>
  );
};

export const Dashboard = () => {
  return (
    <ErrorBoundary>
      <DashboardPage />
    </ErrorBoundary>
  );
};
