import React from 'react';
import { Layout } from 'antd';
// import 'antd/dist/antd.css';
import { Content } from 'antd/es/layout/layout';
import HeaderBar from '../components/Header';
import ConcursoList from './ConcursoList';
import SimulacoesList from './SimulacoesList';
import MeuAprendizado from './MeuAprendizado';

const Home: React.FC = () => {
  const [concursoId, setConcursoId] = React.useState<string>('');
  const [, setSimulacaoId] = React.useState<string>('');
  const [userId] = React.useState<string>('6649ad6e3204147e329206bf');

  const onSelectedConcurso = (id: string, key: string) => {
    console.log(id);
    setConcursoId(id);
    handleMenuClick({ key });
  };

  const onSelectedSimulacao = (id: string, key: string) => {
    console.log(id);
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
    <Layout>
      <HeaderBar />
      <Content style={{ padding: '0 50px' }}>
        <div id="concursos">
          <ConcursoList onSelected={onSelectedConcurso} userId={userId} />
        </div>
        <div id="simulacoes">
          <SimulacoesList concursoId={concursoId} userId={userId} onSelected={onSelectedSimulacao} />
        </div>
        <div id="meuAprendizado">
          <MeuAprendizado />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
