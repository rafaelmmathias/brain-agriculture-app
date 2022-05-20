import { DeleteRowOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Row, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useDeleteProducerMutation } from "../../../services/brain-agriculture";
import { Producer } from "../../../models/producer";

interface ProducerListActionsProps {
  producer: Producer;
}
export const ProducerListActions: React.FC<ProducerListActionsProps> = ({
  producer,
}) => {
  const [deleteProducer, { isLoading }] = useDeleteProducerMutation();
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(`edit/${producer.document}`, {
      state: {
        producer: producer,
      },
    });
  };

  return (
    <Row justify="end">
      <Space>
        <Button type="primary" onClick={onEditHandler}>
          <EditOutlined />
          Edit
        </Button>

        <Popconfirm
          title="Tem certeza que deseja deletar este produtor?"
          okText="Sim"
          cancelText="Não"
          onConfirm={() => deleteProducer(producer.document)}
          okButtonProps={{
            loading: isLoading,
          }}
        >
          <Button type="primary" danger>
            <DeleteRowOutlined /> Delete
          </Button>
        </Popconfirm>
      </Space>
    </Row>
  );
};
