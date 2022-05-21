import { Card, message, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProducerQuery,
  useUpdateProducerMutation,
} from "../../../../services/brain-agriculture";
import { ProducerForm } from "../producer-form";

export const ProducerEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, data } = useGetProducerQuery(params.id || "");
  const [updateProducer, { isLoading: loadingUpdate, isSuccess, error }] =
    useUpdateProducerMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/producers");
      message.success("Produtor atualizado com sucesso.");
    }
    if (error) {
      message.error("Ocorreu um erro ao tentar atualizar o Produtor");
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
