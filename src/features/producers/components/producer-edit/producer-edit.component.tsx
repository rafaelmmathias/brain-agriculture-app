import { Card, message, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProducerQuery,
  useUpdateProducerMutation,
} from "../../../../services//hooks";
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

    if (!isLoading && !data) {
      message.error("Produtor não encontrado");
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate("/producers");
      }
    }
  }, [isSuccess, navigate, error, isLoading, data]);

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
