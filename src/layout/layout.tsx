import React, { useMemo } from "react";
import { Col, Layout, Menu, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Row>
          <Col flex="auto">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedMenuItems}
              items={menu}
              onClick={(menuInfo) => navigate(menuInfo.key)}
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
