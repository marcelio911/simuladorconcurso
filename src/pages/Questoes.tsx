import React from 'react';
// import 'antd/dist/antd.css';
import { Content } from 'antd/es/layout/layout';
import HeaderBar from '../components/Header';
import ConcursoList from './ConcursoList';
import SimulacoesList from './SimulacoesList';
import MeuAprendizado from './MeuAprendizado';
import useSimulacoes from '@/hooks/useSimulacoes';
import useToggle from '@/hooks/useToggle';
import MyLayout from '@/components/Templates/MyLayout';

const Questoes: React.FC = () => {
  const [, setSimulacaoId] = React.useState<string>('');
  const [userId] = React.useState<string>('6649ad6e3204147e329206bf');
  const { selectedConcursoId, handleClean } = useSimulacoes();
  const refreshMeuAprendizado = useToggle(true);

  const onSelectedConcurso = async (_id: string, key: string) => {
    handleMenuClick({ key });
    handleClean();
    refreshMeuAprendizado.toggle();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    refreshMeuAprendizado.toggle();
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
    <MyLayout>
      <HeaderBar />
      <Content style={{ padding: '12vh 50px 0 50px' }}>
        <div id="concursos">
          <ConcursoList onSelected={onSelectedConcurso} userId={userId} />
        </div>
        <div id="simulacoes">
          <SimulacoesList concursoId={selectedConcursoId} userId={userId} onSelected={onSelectedSimulacao} />
        </div>
        {
          refreshMeuAprendizado.state && (
            <div id="meuAprendizado">
              <MeuAprendizado />
            </div>
          )
        }
      </Content>
    </MyLayout>
  );
};

export default Questoes;
