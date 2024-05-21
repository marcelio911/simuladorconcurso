import React, { useEffect, useState } from 'react';
import useSimulacoes from '../hooks/useSimulacoes';
import SimulacoesCard from '../components/SimulacoesCard';
import SimulacoesForm from '../components/SimulacoesForm';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Modal, Row, Typography } from 'antd';
type SimulacaoDto = {
  _id: string;
  nome: string;
  data: Date;
  concursoId: string;
  userId: string;
  questoes: string[];
};
interface SimulacoesProps {
  concursoId: string;
  userId: string;
  onSelected: (simulacao: string, type: string) => void;
}


const SimulacoesList: React.FC<SimulacoesProps> = ({
  concursoId,
  userId,
  onSelected,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSimulacoes, setSelectedSimulacoes] = useState<any | null>(null);
  const { loadSimulacoesByConcursoId, simulacoes, loading, error } = useSimulacoes();
  // const { concursoId, userId } = useParams();

  useEffect(() => {
    if (concursoId) {
      loadSimulacoesByConcursoId(concursoId, userId);
    }
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
    <Col>
      <Typography variant="h4" component="h1" gutterBottom>Simulações</Typography>
      {loading && <Typography.Text>Loading...</Typography.Text>}
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
      <Row justify="space-around" gutter={16}>
        <div className="horizontal-scroll">
          {simulacoes?.map((simulacao) => (
            <SimulacoesCard
              key={simulacao._id}
              contest={simulacao}
              onEdit={() => handleEdit(simulacao)}
              onView={() => handleView(simulacao)}
            />
          ))}

          {
            simulacoes?.length === 0 && (
              <Card title="Simulação não encontrada" bordered={false}>
                Nenhuma caderno de simulação para esta opção
              </Card>
            )
          }
          <div className="action-box">
            <Button id="add-button_simulacao" className='add-button' type="dashed" onClick={handleAddNew} style={{ marginBottom: '16px' }}>Adicionar uma nova</Button>
          </div>

        </div>
      </Row>
      <Modal
        title={selectedSimulacoes ? 'Editar Simulacao' : 'Adicionar Simulacao'}
        open={showForm}
        footer={null}
        onCancel={handleCancel}
      >
        <SimulacoesForm
          contest={selectedSimulacoes}
          concursoId={concursoId}
          userId={userId}
          onSave={handleAfterSaved} onCancel={handleCancel} />
      </Modal>

    </Col >
  );
};

export default SimulacoesList;
