import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface ContestCardProps {
  contest: any;
  onEdit: () => void;
  onView: () => void;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest, onEdit, onView }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {contest.name}
        </Typography>
        <Typography color="text.secondary">
          {contest.description}
        </Typography>
        <Typography variant="body2">
          Data: {contest.date}
        </Typography>
        <Button size="small" onClick={onView}>View</Button>
        <Button size="small" onClick={onEdit}>Edit</Button>
      </CardContent>
    </Card>
  );
};

export default ContestCard;
