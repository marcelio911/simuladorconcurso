import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Button } from '@mui/material';
import { formatDateTime } from '../utils';

interface SimulacoesCardProps {
  contest: any;
  onEdit: () => void;
  onView: () => void;
}

const SimulacoesCard: React.FC<SimulacoesCardProps> = ({ contest, onEdit, onView }) => {
  const { startTime, endTime } = contest;
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      {/* <CardTitle title="Simulacao" /> */}
      <CardContent>
        <Typography variant="h5" component="div">
          {contest.name}
        </Typography>
        <Typography color="text.secondary">
          {contest.description}
        </Typography>
        <Typography variant="body2">
          Iniciado em: {startTime ? formatDateTime(startTime) : '-'}
        </Typography>
        <Typography variant="body2">
          Concluído: {endTime ? new Date(endTime)?.toLocaleDateString() : 'Em andamento'}
        </Typography>


      </CardContent>
      <CardActionArea className='prompt-box'>
        <Button size="small" onClick={onView}>{!endTime ? 'Iniciar' : 'Revisar'}</Button>

        <Button size="small" onClick={onEdit}>Editar</Button>
      </CardActionArea>
    </Card>
  );
};

export default SimulacoesCard;
