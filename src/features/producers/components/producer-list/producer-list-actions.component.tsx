import { DeleteRowOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Row, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useDeleteProducerMutation } from "../../../../services/brain-agriculture";
import { Producer } from "../../../../models/producer";

interface ProducerListActionsProps {
  producer: Producer;
}
export const ProducerListActions: React.FC<ProducerListActionsProps> = ({
  producer,
}) => {
  const [deleteProducer, { isLoading }] = useDeleteProducerMutation();
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(`edit/${producer.id}`, {
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
        </Button>

        <Popconfirm
          title="Tem certeza que deseja deletar este produtor?"
          okText="Sim"
          cancelText="Não"
          placement="left"
          onConfirm={() => deleteProducer(producer.id)}
          data-testid="testing-id"
          okButtonProps={{
            loading: isLoading,
            // @ts-ignore: ignoring this line because this antd component doesn't have support for this prop
            "data-testid": `delete-${producer.id}`,
          }}
        >
          <Button data-testid="delete-button" type="primary" danger>
            <DeleteRowOutlined />
          </Button>
        </Popconfirm>
      </Space>
    </Row>
  );
};
