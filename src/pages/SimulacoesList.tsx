import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import useSimulacoes from '../hooks/useSimulacoes';
import SimulacoesCard from '../components/SimulacoesCard';
import SimulacoesForm from '../components/SimulacoesForm';

const SimulacoesList: React.FC = () => {
  const { simulacoes, loading, error } = useSimulacoes();
  const [showForm, setShowForm] = useState(false);
  const [selectedSimulacoes, setSelectedSimulacoes] = useState<any | null>(null);

  const handleAddNew = () => {
    setSelectedSimulacoes(null);
    setShowForm(true);
  };

  const handleEdit = (simulacoes: any) => {
    setSelectedSimulacoes(simulacoes);
    setShowForm(true);
  };

  const handleView = (simulacoes: any) => {
    console.log('View simulacoes:', simulacoes);
    // Navegar para a página de detalhes do concurso
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedSimulacoes(null);
    // Recarregar concursos
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSimulacoes(null);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>Simulacoes</Typography>
      <Button variant="contained" onClick={handleAddNew} sx={{ marginBottom: 2 }}>Add Simulacoes</Button>
      {showForm && (
        <Box sx={{ borderBottom: '1px solid gray', paddingBottom: 2, marginBottom: 2 }}>
          <SimulacoesForm contest={selectedSimulacoes} onSave={handleSave} onCancel={handleCancel} />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>{error}</Typography>}
        {simulacoes.map((simulacao) => (
          <SimulacoesCard
            key={simulacao.id}
            contest={simulacao}
            onEdit={() => handleEdit(simulacao)}
            onView={() => handleView(simulacao)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SimulacoesList;
