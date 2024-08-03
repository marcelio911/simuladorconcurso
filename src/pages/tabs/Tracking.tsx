import React, { useEffect } from 'react';
import DefaultLayout from '@/components/Templates/DefaultLayout';
import useToggle from '@/hooks/useToggle';
import MeuAprendizado from '../MeuAprendizado';
import HeaderBar from '@/components/Header';

const Tracking: React.FC = () => {

  useEffect(() => {
    // Força o recálculo da altura do viewport
    window.dispatchEvent(new Event('resize'));
  }, []); // Executa apenas uma vez quando o componente é montado

  const refreshMeuAprendizado = useToggle(true);

  return (
    <DefaultLayout>
      <HeaderBar />
      {
        refreshMeuAprendizado.state && (
          <div id="meuAprendizado">
            <MeuAprendizado />
          </div>
        )
      }
    </DefaultLayout>
  );
};

export default Tracking;
