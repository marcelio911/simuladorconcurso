import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createContest, updateContest } from '../services/api';

interface ContestFormProps {
  contest?: any;
  onSave: () => void;
  onCancel: () => void;
}

const ContestForm: React.FC<ContestFormProps> = ({ contest, onSave, onCancel }) => {
  const [name, setName] = useState(contest?.name || '');
  const [description, setDescription] = useState(contest?.description || '');
  const [date, setDate] = useState(contest?.date || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContest = { name, description, date };

    if (contest) {
      await updateContest(contest.id, newContest);
    } else {
      await createContest(newContest);
    }

    onSave();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} />
      <Button type="submit" variant="contained">Save</Button>
      <Button variant="outlined" onClick={onCancel}>Cancel</Button>
    </Box>
  );
};

export default ContestForm;
