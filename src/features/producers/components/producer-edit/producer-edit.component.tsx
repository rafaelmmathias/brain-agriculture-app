import { Card, message, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProducerQuery } from "../../../../services//hooks/useGetProducerQuery";
import { useUpdateProducerMutation } from "../../../../services//hooks/useUpdateProducerMutation";
import { ProducerForm } from "../producer-form";

export const ProducerEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useGetProducerQuery(params.id || "");
  const {
    isLoading: loadingUpdate,
    isSuccess,
    error,
    mutate: updateProducer,
  } = useUpdateProducerMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/producers");
      message.success("Produtor atualizado com sucesso.");
    }
    if (error) {
      message.error("Ocorreu um erro ao tentar atualizar o Produtor.");
    }
  }, [isSuccess, navigate, error]);

  return (
    <>
      <Spin spinning={isLoading || loadingUpdate}>
        {data ? (
          <Card title="Editar produtor">
            <ProducerForm
              initialValues={data}
              onSubmit={(producer) => {
                updateProducer(producer);
              }}
            />
          </Card>
        ) : null}
      </Spin>
    </>
  );
};
