import React, { useState } from 'react';
import { Button, Typography, Modal } from 'antd';
import useConcursos from '../hooks/useConcursos';
import ConcursoForm from '../components/ConcursoForm';
import Loading from '@/components/Loading';
import ListItem from '@/components/Templates/ListItem';

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
    <section className="pr-2 mb-4 pl-2 pt-4 bg-painel rounded-lg  ">

      <Loading />
      {errorConcurso && <h3><Typography.Text type="danger">{errorConcurso}</Typography.Text></h3>}
      <div className="horizontal-scroll">
        {concursos?.map((concurso) => (
          <ListItem
            title={concurso.descricao}
            content={[concurso.local, `Data: ${concurso?.dataProva}`]}
            key={concurso._id}
            _onClick={() => { onSelected(concurso._id, 'simulacoes'), handleSelected({ concurso, userId }, navigation) }}
            onEdit={() => handleEdit(concurso)}
            concurso={concurso}
          />

        ))}
        <div className="action-box">
          <Button className='add-button' id="add-button" type="dashed" onClick={handleAddNew} style={{ marginBottom: '16px' }}>Adicione um Concurso</Button>
        </div>

      </div >
      <Modal
        title={selectedConcurso ? 'Editar Concurso' : 'Adicionar Concurso'}
        open={showForm}
        footer={null}
        onCancel={handleCancel}
      >
        <ConcursoForm concurso={selectedConcurso} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

    </section>
  );
};

export default ConcursoList;
