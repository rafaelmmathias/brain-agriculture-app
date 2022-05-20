import { Card, message, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProducerMutation } from "../../../../services/brain-agriculture";
import { ProducerForm } from "../producer-form";

export const ProducerCreate = () => {
  const navigate = useNavigate();

  const [addProducer, { isLoading: loadingCreation, isSuccess, error }] =
    useAddProducerMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/producers");
      message.success("Produtor inserido com sucesso.");
    }

    if (error) {
      message.error("Ocorreu um erro ao tentar criar o Produtor");
    }
  }, [isSuccess, navigate, error]);

  return (
    <div>
      <Card title="Cadastrar produtor">
        <Spin spinning={loadingCreation}>
          <ProducerForm
            onSubmit={(data) => {
              console.log(data);
              addProducer(data);
            }}
          />
        </Spin>
      </Card>
    </div>
  );
};
