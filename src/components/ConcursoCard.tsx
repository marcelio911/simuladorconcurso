import React from 'react';
import { Card, Button } from 'antd';

interface ConcursoCardProps {
  concurso: any;
  onEdit: () => void;
  onView: () => void;
  onSelection: () => void;
}

const ConcursoCard: React.FC<ConcursoCardProps> = ({ concurso, onEdit, onView, onSelection }) => {
  return (
    <Card key={concurso._id} title={concurso.descricao} bordered={true} style={{ margin: '16px', width: 300 }}>
      <p>Data da Prova: {new Date(concurso.dataProva).toLocaleDateString()}</p>
      <p>Local: {concurso.local}</p>
      <Button type="primary" onClick={onView} style={{ marginRight: '8px' }}>Ver</Button>
      <Button onClick={onEdit}>Editar</Button>
      <Button type="link" onClick={onSelection}>Selecionar</Button>,

    </Card>
  );
};

export default ConcursoCard;
