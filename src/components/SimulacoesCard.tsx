import React from 'react';
import { Card, Typography, Button } from 'antd';
import { formatDateTime } from '../utils';
import { CardActionArea } from '@mui/material';

interface SimulacoesCardProps {
  contest: any;
  onEdit: () => void;
  onView: () => void;
}

const SimulacoesCard: React.FC<SimulacoesCardProps> = ({ contest, onEdit, onView }) => {
  const { startTime, endTime } = contest;
  return (
    <Card title={contest.name} sx={{ minWidth: 275, margin: 2 }}>
      <Typography color="text.secondary">
        {contest.description}
      </Typography>
      <Typography variant="body2">
        Iniciado em: {startTime ? formatDateTime(startTime) : '-'}
      </Typography>
      <Typography color="text.section">
        Concluído: {endTime ? new Date(endTime)?.toLocaleDateString() : 'Em andamento'}
      </Typography>


      <CardActionArea className='prompt-box'>
        <Button type="default" onClick={onView}>{!endTime ? 'Iniciar' : 'Revisar'}</Button>

        <Button onClick={onEdit}>Editar</Button>
      </CardActionArea>
    </Card>
  );
};

export default SimulacoesCard;
