import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você está tentando acessar não existe."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Ir para o dashboard
        </Button>
      }
    />
  );
};
