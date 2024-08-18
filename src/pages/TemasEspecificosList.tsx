import React, { useEffect, useState } from 'react';
import useTemasEspecificos from '../hooks/useTemasEspecificos';
import TemasEspecificosForm from '../components/TemasEspecificosForm';
import { Button, Card, Modal, Typography } from 'antd';
import Loading from '@/components/Loading';
export type TemaEspecificoDto = {
  _id?: string;
  name?: string;
  data?: Date;
  concursoId: string;
  userId: string;
  questoes?: string[];
};
interface TemasEspecificosProps {
  concursoId: string | null;
  userId: string;
  onSelected: (temaEspecifico: string, type: string) => void;
}


const TemasEspecificosList: React.FC<TemasEspecificosProps> = ({
  concursoId,
  userId,
  onSelected,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTemasEspecificos, setSelectedTemasEspecificos] = useState<any | null>(null);
  const { temasEspecificos, errorSimulados, handleSelected, _loadTemasEspecificosByConcursoId } = useTemasEspecificos();

  const handleAddNew = () => {
    setSelectedTemasEspecificos(null);
    setShowForm(true);
  };

  const handleAfterSaved = () => {
    setShowForm(false);
    setSelectedTemasEspecificos(null);
    // Recarregar temasEspecificos
    _loadTemasEspecificosByConcursoId();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedTemasEspecificos(null);
  };

  const navigation = (temaEspecifico: TemaEspecificoDto) => {
    setSelectedTemasEspecificos(temaEspecifico);
  }

  useEffect(() => {
    // Força o recálculo da altura do viewport
    window.dispatchEvent(new Event('resize'));
  }, []); // Executa apenas uma vez quando o componente é montado


  return (
    <section className="pr-2 pl-2 pt-4 bg-painel rounded-lg  ">

      <Loading />
      {errorSimulados && <h3><Typography.Text type="danger">{errorSimulados}</Typography.Text></h3>}
      <div className="horizontal-scroll ">

        {temasEspecificos?.map((temaEspecifico: any) => (
          <button key={temaEspecifico._id} className='rounded-full mr-2'
            onClick={() => { onSelected(temaEspecifico, 'temas'), handleSelected({ temaEspecifico, userId }, navigation) }}>{temaEspecifico.descricao}</button>

        ))}

        {
          temasEspecificos?.length === 0 && (
            <Card title="Tema especifico não encontrado" bordered={false}>
              Nenhuma caderno de simulação para esta opção
            </Card>
          )
        }
      </div>
      <div className="action-box">
        <Button id="add-button_temaEspecifico" className='add-button' type="dashed" onClick={handleAddNew} style={{ marginBottom: '16px' }}>Adicionar uma nova</Button>
      </div>
      <Modal
        title={selectedTemasEspecificos ? 'Editar TemaEspecifico' : `Adicionar TemaEspecifico ${concursoId}`}
        open={showForm}
        footer={null}
        onCancel={handleCancel}
      >
        {concursoId &&
          <TemasEspecificosForm
            contest={selectedTemasEspecificos}
            concursoId={concursoId}
            userId={userId}
            onSave={handleAfterSaved} onCancel={handleCancel} />
        }
      </Modal>
    </section >

  );
};

export default TemasEspecificosList;
