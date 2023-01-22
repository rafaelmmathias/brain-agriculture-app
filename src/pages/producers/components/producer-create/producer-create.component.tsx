import { Card, message, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProducerMutation } from "@/services/hooks";

import { ProducerForm } from "../producer-form";

export const ProducerCreate = () => {
  const navigate = useNavigate();

  const {
    mutate: addProducer,
    isSuccess,
    error,
    isLoading,
  } = useCreateProducerMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/producers");
      message.success("Produtor inserido com sucesso.");
    }

    if (error) {
      message.error("Ocorreu um erro ao tentar criar o Produtor.");
    }
  }, [isSuccess, navigate, error]);

  return (
    <Card title="Cadastrar produtor">
      <Spin spinning={isLoading}>
        <ProducerForm
          onSubmit={(data) => {
            addProducer(data);
          }}
        />
      </Spin>
    </Card>
  );
};
