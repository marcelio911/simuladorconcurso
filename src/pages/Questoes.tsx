import React from 'react';
import { Content } from 'antd/es/layout/layout';
import HeaderBar from '../components/Header';
import ConcursoList from './ConcursoList';
import SimulacoesList from './SimulacoesList';
import MeuAprendizado from './MeuAprendizado';
import useSimulacoes from '@/hooks/useSimulacoes';
import useToggle from '@/hooks/useToggle';
import DefaultLayout from '@/components/Templates/DefaultLayout';
import TemasEspecificosList from './TemasEspecificosList';
import useTemasEspecificos from '@/hooks/useTemasEspecificos';

const Questoes: React.FC = () => {
  const [, setSimulacaoId] = React.useState<string>('');
  const [userId] = React.useState<string>('6649ad6e3204147e329206bf');
  const { selectedConcursoId, handleClean: handleCleanTemasEspecificos } = useTemasEspecificos();
  const { selectedTemaEspecificoId, handleClean: handleCleanSimulacoes } = useSimulacoes();
  const refreshMeuAprendizado = useToggle(true);

  const onSelectedConcurso = async (_id: string, key: string) => {
    handleMenuClick({ key });
    handleCleanTemasEspecificos();
    handleCleanSimulacoes();
    refreshMeuAprendizado.toggle();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    refreshMeuAprendizado.toggle();
  };

  const onSelectedTemaEspecifco = async (_id: string, key: string) => {
    handleMenuClick({ key });
    handleCleanTemasEspecificos();
    handleCleanSimulacoes();

    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const onSelectedSimulacao = (id: string, key: string) => {
    setSimulacaoId(id);
    handleMenuClick({ key });


  };

  const handleMenuClick = ({ key }: any) => {
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DefaultLayout>
      <HeaderBar />
      <Content style={{ padding: '12vh 50px 0 50px' }}>
        <div id="concursos">
          <ConcursoList onSelected={onSelectedConcurso} userId={userId} />
        </div>
        <div id="temasEspecificos">
          <TemasEspecificosList concursoId={selectedConcursoId} userId={userId} onSelected={onSelectedTemaEspecifco} />
        </div>
        <div id="simulacoes">
          <SimulacoesList temaEspecificoId={selectedTemaEspecificoId} userId={userId} onSelected={onSelectedSimulacao} />
        </div>
        {
          refreshMeuAprendizado.state && (
            <div id="meuAprendizado">
              <MeuAprendizado />
            </div>
          )
        }
      </Content>
    </DefaultLayout>
  );
};

export default Questoes;
