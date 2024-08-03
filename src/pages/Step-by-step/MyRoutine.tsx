import React, { useEffect } from 'react';
import Routines, { Activities } from './components/Routines';
import DefaultLayout from '@/components/Templates/DefaultLayout';
import HeaderBar from '@/components/Header';

const MyRoutine: React.FC = () => {

  const ATIVIDADES_RESERVADAS = [
    'Sono',
    'Atividade física',
    'Hitbox',
    'Funcional',
    'Almoço',
    'Jantar',
    'Descanso',
    'Tarefa',
    'Preparar',
    'Tempo livre',
    'Intervalo',
  ];

  const validateRotina = (_rotina?: Activities): boolean => {
    if (!_rotina?.emphasis) return false;
    if (ATIVIDADES_RESERVADAS.some(_reservada =>
      _rotina.activity.toLocaleLowerCase().includes(_reservada.toLowerCase()))
    ) return false;
    return true;
  }
  const goNext = (_rotina?: Activities): void => {
    console.log('goNext ', _rotina);
    if (validateRotina(_rotina) || !_rotina) {
      window.location.href = '#/dashboard';
    } else {
      // TODO: implementar um guia de ajuda para atividades reservadas

      console.log('Não ignore atividades reservadas para o seu Bem-estar!');
      console.log('Por favor, continue apenas quando iniciar uma outra atividade!');
    }
  };

  useEffect(() => {
    // Força o recálculo da altura do viewport
    window.dispatchEvent(new Event('resize'));
  }, []); // Executa apenas uma vez quando o componente é montado

  return (
    <DefaultLayout>
      <HeaderBar />
      <Routines goNext={goNext} />
    </DefaultLayout>
  );
};

export default MyRoutine;
