import React, { useMemo } from "react";
import { Col, Layout, Menu, Row, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import { usePrefetchProducers } from "services/hooks";
const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = useMemo(
    () => [
      {
        key: "/dashboard",
        label: "Dashboard",
      },
      {
        key: "/producers",
        label: "Produtores",
      },
    ],
    []
  );

  const selectedMenuItems = menu
    .filter((item) => location.pathname.includes(item.key))
    .map((item) => item.key);

  const isFetching = useIsFetching();
  const prefetchProducers = usePrefetchProducers();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isFetching > 0 && (
        <Spin style={{ position: "absolute", top: 20, left: 10 }} />
      )}
      <Header>
        <Row>
          <Col flex="auto">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedMenuItems}
              items={menu}
              onClick={(menuInfo) => navigate(menuInfo.key)}
              onMouseEnter={() => {
                prefetchProducers();
              }}
            />
          </Col>
        </Row>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          backgroundColor: "#fff",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>Brain Agriculture</Footer>
    </Layout>
  );
};
