import React, { useEffect, useState } from 'react';
import useSimulacoes from '../hooks/useSimulacoes';
import SimulacoesForm from '../components/SimulacoesForm';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal, Typography } from 'antd';
import Loading from '@/components/Loading';
import ListItem from '@/components/Templates/ListItem';
export type SimulacaoDto = {
  _id?: string;
  name?: string;
  data?: Date;
  temaEspecificoId: string;
  userId: string;
  questoes?: string[];
};
interface SimulacoesProps {
  temaEspecificoId: string | null;
  userId: string;
  onSelected: (simulacao: string, type: string) => void;
}


const SimulacoesList: React.FC<SimulacoesProps> = ({
  temaEspecificoId,
  userId,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSimulacoes, setSelectedSimulacoes] = useState<any | null>(null);
  const { simulacoes, errorSimulados, _loadSimulacoesByTemaEspecificoId } = useSimulacoes();

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
    // Navegar para a página de detalhes do concurso
    navigate('/questoes/' + simulacao._id);
  };

  const handleAfterSaved = () => {
    setShowForm(false);
    setSelectedSimulacoes(null);
    // Recarregar simulacoes
    _loadSimulacoesByTemaEspecificoId();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSimulacoes(null);
  };

  useEffect(() => {
    // Força o recálculo da altura do viewport
    window.dispatchEvent(new Event('resize'));
  }, []); // Executa apenas uma vez quando o componente é montado


  return (
    <section className="pr-2 pl-2 pt-4 bg-painel rounded-lg  ">

      <Loading />
      {errorSimulados && <h3><Typography.Text type="danger">{errorSimulados}</Typography.Text></h3>}
      <div className="horizontal-scroll ">

        {simulacoes?.map((simulacao) => (
          <ListItem

            title={simulacao.name as string}
            content={[simulacao.name as string, `Data: ${simulacao?.data}`]}
            key={simulacao._id}
            _onClick={() => { handleView(simulacao) }}
            onEdit={() => handleEdit(simulacao)}
            concurso={simulacao}
          />
        ))}

        {
          simulacoes?.length === 0 && (
            <Card title="Simulação não encontrada" bordered={false}>
              Nenhuma caderno de simulação para esta opção
            </Card>
          )
        }
      </div>
      <div className="action-box">
        <Button id="add-button_simulacao" className='add-button' type="dashed" onClick={handleAddNew} style={{ marginBottom: '16px' }}>Adicionar uma nova</Button>
      </div>
      <Modal
        title={selectedSimulacoes ? 'Editar Simulacao' : 'Adicionar Simulacao'}
        open={showForm}
        footer={null}
        onCancel={handleCancel}
      >
        {temaEspecificoId &&
          <SimulacoesForm
            contest={selectedSimulacoes}
            temaEspecificoId={temaEspecificoId}
            userId={userId}
            onSave={handleAfterSaved} onCancel={handleCancel} />
        }
      </Modal>
    </section >

  );
};

export default SimulacoesList;
