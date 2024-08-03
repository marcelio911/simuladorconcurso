import React, { useEffect } from 'react';
import DefaultLayout from '@/components/Templates/DefaultLayout';
import SimulacoesList from '../SimulacoesList';
import useSimulacoes from '@/hooks/useSimulacoes';
import HeaderBar from '@/components/Header';
import ConcursoList from '../ConcursoList';
import useToggle from '@/hooks/useToggle';
import { motion } from 'framer-motion';
const Simulations: React.FC = () => {

  const [, setSimulacaoId] = React.useState<string>('');
  const [userId] = React.useState<string>('6649ad6e3204147e329206bf');
  const { selectedConcursoId, handleClean } = useSimulacoes();
  const refreshMeuAprendizado = useToggle(true);

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

  useEffect(() => {
    // Força o recálculo da altura do viewport
    window.dispatchEvent(new Event('resize'));
  }, [selectedConcursoId]); // Executa apenas uma vez quando o componente é montado


  const onSelectedConcurso = async (_id: string, key: string) => {
    console.log('onSelectedConcurso, ', _id, key);
    handleMenuClick({ key });
    handleClean();
    refreshMeuAprendizado.toggle();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    refreshMeuAprendizado.toggle();
  };



  return (
    <DefaultLayout>
      <HeaderBar />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-0 "
      >

        <main className="theme-color  px-6 py-8">
          <div id="concursos">
            <ConcursoList onSelected={onSelectedConcurso} userId={userId} />
          </div>
          <div id="simulacoes">
            <SimulacoesList concursoId={selectedConcursoId} userId={userId} onSelected={onSelectedSimulacao} />
          </div>
        </main>
      </motion.section>
    </DefaultLayout>
  );
};

export default Simulations;
