import React from 'react';
import RotinaEstudos, { Atividade } from './components/RotinaEstudos';
import MyLayout from '@/components/Templates/MyLayout';

const MyRoutine: React.FC = () => {

  const ATIVIDADES_RESERVADAS = [
    'Sono',
    'Atividade física',
    'Descanso',
    'Tarefa',
    'Preparar',
    'Tempo livre',
    'Intervalo',
  ];

  const validateRotina = (_rotina?: Atividade): boolean => {
    if (!_rotina?.destaque) return false;
    if (ATIVIDADES_RESERVADAS.some(_reservada =>
      _rotina.atividade.toLocaleLowerCase().includes(_reservada.toLowerCase()))
    ) return false;
    return true;
  }
  const goNext = (_rotina?: Atividade): void => {
    console.log('goNext ', _rotina);
    if (validateRotina(_rotina)) {
      window.location.href = '#/dashboard';
    } else {
      alert('Não ignore atividades reservadas para o seu Bem-estar!');
      alert('Por favor, continue apenas quando iniciar uma outra atividade!');
    }
  };



  return (
    <MyLayout>
      <RotinaEstudos goNext={goNext} />
    </MyLayout>
  );
};

export default MyRoutine;
