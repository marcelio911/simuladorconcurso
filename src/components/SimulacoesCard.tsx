import React from 'react';
import { Card, Typography, Button } from 'antd';
import { formatDateTime } from '../utils';

interface SimulacoesCardProps {
  contest: any;
  onEdit: () => void;
  onView: () => void;
}

const SimulacoesCard: React.FC<SimulacoesCardProps> = ({ contest, onEdit, onView }) => {
  const { startTime, endTime } = contest;
  return (
    <Card title={contest.name} bordered={true}>
      <Typography color="text.secondary">
        {contest.description}
      </Typography>
      <Typography >
        Iniciado em: {startTime ? formatDateTime(startTime) : '-'}
      </Typography>
      <Typography color="text.section">
        Concluído: {endTime ? new Date(endTime)?.toLocaleDateString() : 'Em andamento'}
      </Typography>


      <div className='prompt-box'>
        <Button type="default" onClick={onView}>{!endTime ? 'Iniciar' : 'Revisar'}</Button>

        <Button type='link' onClick={onEdit}>Editar</Button>
      </div>
    </Card>
  );
};

export default SimulacoesCard;
