// src/pages/ConcursoList.tsx
import React, { useState } from 'react';
import { Button, Modal, List, Card, Typography } from 'antd';
import ConcursoForm from '../components/ConcursoForm';
import useConcursos from '../hooks/useConcursos';
import { useNavigate } from 'react-router-dom';

const ConcursoList: React.FC = () => {
  const navigate = useNavigate();
  const { concursos, loading, error } = useConcursos();
  const { handleDelete, handleSelect, handleSave, handleEdit, handleCancel } = useConcursos();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedConcurso, setSelectedConcurso] = useState<any>(null);

  const callSave = () => {
    console.log(selectedConcurso);
    setIsModalVisible(false);
    setSelectedConcurso(null);
  }

  const callEdit = (concurso) => {
    console.log(selectedConcurso);
    setSelectedConcurso(concurso);
    setIsModalVisible(true);
  }

  const callCancel = () => {
    setIsModalVisible(false);
    setSelectedConcurso(null);
  }

  const callDelete = (concurso) => {
    console.log(selectedConcurso);
    setIsModalVisible(false);
    setSelectedConcurso(null);
  }

  const navigation = (concurso) => {
    console.log(selectedConcurso);
    setSelectedConcurso(concurso);
    // navigate('/simulacoes');
  }



  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Adicionar Concurso
      </Button>
      {loading && <Typography.Text>Loading...</Typography.Text>}
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={concursos}
        renderItem={concurso => (
          <List.Item>
            <Card
              title={concurso.name}
              actions={[
                <Button type="link" onClick={() => handleEdit(concurso, callEdit)}>Editar</Button>,
                <Button type="link" onClick={() => handleDelete(concurso._id, callDelete)}>Excluir</Button>,
                <Button type="link" onClick={() => handleSelect(concurso, navigation)}>Selecionar</Button>,
              ]}
            >
              <p>id: {concurso._id}</p>
              <p>{concurso.descricao}</p>
              <p>Data da Prova: {new Date(concurso.dataProva).toLocaleDateString()}</p>
              <p>Local: {concurso.local}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={selectedConcurso ? 'Editar Concurso' : 'Adicionar Concurso'}
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <ConcursoForm concurso={selectedConcurso} onSave={handleSave(callSave)} onCancel={handleCancel(callCancel)} />
      </Modal>
    </div>
  );
};

export default ConcursoList;
