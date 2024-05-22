import React, { useState } from 'react';
import { Row, Button, Typography, Modal, Col } from 'antd';
import useConcursos from '../hooks/useConcursos';
import ConcursoCard from '../components/ConcursoCard';
import ConcursoForm from '../components/ConcursoForm';

export type ConcursoDto = {
  _id: string;
  descricao: string;
  dataProva: Date;
  local: string;
};

interface ConcursoListProps {
  userId: string,
  onSelected: (concurso: string, type: string) => void;
}
const ConcursoList: React.FC<ConcursoListProps> = ({ userId, onSelected }) => {
  const { concursos, loading, error, handleSelected } = useConcursos();
  const [showForm, setShowForm] = useState(false);
  const [selectedConcurso, setSelectedConcurso] = useState<ConcursoDto | null>(null);

  const handleAddNew = () => {
    setSelectedConcurso(null);
    setShowForm(true);
  };

  const handleEdit = (concurso: ConcursoDto) => {
    setSelectedConcurso(concurso);
    setShowForm(true);
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

  const navigation = (concurso: ConcursoDto) => {
    console.log(selectedConcurso);
    setSelectedConcurso(concurso);
    // navigate(`/simulacoes/${concurso._id}/${userId}`);
  }

  return (
    <Col>
      <Typography>Concursos</Typography>
      {loading && <Typography.Text>Loading...</Typography.Text>}
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
      <Row justify="space-around" gutter={16}>
        <div className="horizontal-scroll">
          {concursos.map((concurso) => (
            <ConcursoCard
              key={concurso._id}
              concurso={concurso}
              onEdit={() => handleEdit(concurso)}
              onSelection={() => { onSelected(concurso._id, 'simulacoes'), handleSelected({ concurso, userId }, navigation) }}

            />
          ))}
          <div className="action-box">
            <Button className='add-button' id="add-button" type="dashed" onClick={handleAddNew} style={{ marginBottom: '16px' }}>Adicione um Concurso</Button>
          </div>

        </div >
      </Row>
      <Modal
        title={selectedConcurso ? 'Editar Concurso' : 'Adicionar Concurso'}
        open={showForm}
        footer={null}
        onCancel={handleCancel}
      >
        <ConcursoForm concurso={selectedConcurso} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

    </Col>
  );
};

export default ConcursoList;
