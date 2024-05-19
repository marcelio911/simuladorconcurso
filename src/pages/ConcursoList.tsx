import React, { useState } from 'react';
import { Row, Col, Button, Typography, Modal } from 'antd';
import useConcursos from '../hooks/useConcursos';
import ConcursoCard from '../components/ConcursoCard';
import ConcursoForm from '../components/ConcursoForm';
import { useNavigate } from 'react-router-dom';

const ConcursoList: React.FC = () => {
  const { concursos, loading, error, handleSelected } = useConcursos();
  const [showForm, setShowForm] = useState(false);
  const [selectedConcurso, setSelectedConcurso] = useState<any | null>(null);

  const handleAddNew = () => {
    setSelectedConcurso(null);
    setShowForm(true);
  };

  const handleEdit = (concurso: any) => {
    setSelectedConcurso(concurso);
    setShowForm(true);
  };

  const handleView = (concurso: any) => {
    console.log('View concurso:', concurso);
    // Navegar para a página de detalhes do concurso
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedConcurso(null);
    // Recarregar concursos
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedConcurso(null);
  };

  const navigate = useNavigate();

  const navigation = (concurso) => {
    console.log(selectedConcurso);
    setSelectedConcurso(concurso);
    // navigate('/simulacoes');
  }


  return (
    <div>
      <Typography.Title level={2}>Concursos</Typography.Title>
      <Button type="primary" onClick={handleAddNew} style={{ marginBottom: '16px' }}>Add Concurso</Button>
      <Modal
        title={selectedConcurso ? 'Editar Concurso' : 'Adicionar Concurso'}
        open={showForm}
        footer={null}
        onCancel={handleCancel}
      >
        <ConcursoForm concurso={selectedConcurso} onSave={handleSave} onCancel={handleCancel} />
      </Modal>
      <Row gutter={16}>
        {loading && <Typography.Text>Loading...</Typography.Text>}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        {concursos.map((concurso) => (
          <Col key={concurso.id} span={8}>
            <ConcursoCard
              concurso={concurso}
              onEdit={() => handleEdit(concurso)}
              onView={() => handleView(concurso)}
              onSelection={() => handleSelected(concurso, navigation)}

            />
          </Col>
        ))}
      </Row>
    </div >
  );
};

export default ConcursoList;
