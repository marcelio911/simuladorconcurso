import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import useAprendizados from '../hooks/useAprendizados';

const MeuAprendizado: React.FC = () => {
  const { loading, error } = useAprendizados();

  return (
    <Col>
      <Typography>Meu aprendizado</Typography>
      {loading && <Typography.Text>Loading...</Typography.Text>}
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
      <Row justify="space-around" gutter={16}>
        <div className="horizontal-scroll">
          <Card title="Aprendizado 1" bordered={false}>
            Informações sobre o Aprendizado 1
          </Card>
          <Card title="Aprendizado 2" bordered={false}>
            Informações sobre o Aprendizado 2
          </Card>
          <Card title="Aprendizado 3" bordered={false}>
            Informações sobre o Aprendizado 3
          </Card>
        </div>
      </Row>
    </Col >
  );
};

export default MeuAprendizado;
