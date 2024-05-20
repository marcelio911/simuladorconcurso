import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import useSimulacoes from '../hooks/useSimulacoes';
import SimulacoesCard from '../components/SimulacoesCard';
import SimulacoesForm from '../components/SimulacoesForm';
import { useNavigate, useParams } from 'react-router-dom';

const SimulacoesList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSimulacoes, setSelectedSimulacoes] = useState<any | null>(null);
  const { loadSimulacoesByConcursoId, insertSimulacao, simulacoes, loading, error } = useSimulacoes();
  const { concursoId, userId } = useParams();

  useEffect(() => {
    loadSimulacoesByConcursoId(concursoId);
  }, [concursoId]);

  const navigate = useNavigate();


  const handleAddNew = () => {
    setSelectedSimulacoes(null);
    setShowForm(true);
  };

  const handleEdit = (simulacao: any) => {
    setSelectedSimulacoes(simulacao);
    setShowForm(true);
  };

  const handleView = (simulacao: any) => {
    console.log('View simulacoes:', simulacao);
    // Navegar para a página de detalhes do concurso
    navigate('/questoes/' + simulacao._id);
  };

  const handleAfterSaved = () => {
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
          <SimulacoesForm
            contest={selectedSimulacoes}
            concursoId={concursoId}
            userId={userId}
            onSave={handleAfterSaved} onCancel={handleCancel} />
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
