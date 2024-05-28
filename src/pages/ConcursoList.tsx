import React, { useState } from 'react';
import { Row, Button, Typography, Modal, Col } from 'antd';
import useConcursos from '../hooks/useConcursos';
import ConcursoCard from '../components/ConcursoCard';
import ConcursoForm from '../components/ConcursoForm';
import Loading from '@/components/Loading';

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
  const { concursos, errorConcurso, handleSelected } = useConcursos();
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
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedConcurso(null);
  };

  const navigation = (concurso: ConcursoDto) => {
    setSelectedConcurso(concurso);
  }

  return (
    <Col>
      <h2>Concursos</h2>
      <Loading />
      {errorConcurso && <h3><Typography.Text type="danger">{errorConcurso}</Typography.Text></h3>}
      <Row justify="space-around" gutter={16}>
        <div className="horizontal-scroll">
          {concursos?.map((concurso) => (
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
