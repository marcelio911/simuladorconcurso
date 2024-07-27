import React, { useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid'; // Ícone de check
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export interface Atividade {
  horario: string;
  atividade: string;
  destaque?: boolean;
  concluida: boolean;
}

interface Metodologia {
  titulo: string;
  descricao: string;
}

interface Props {
  goNext: (_rotina?: Atividade) => void;
}

const RotinaEstudos: React.FC<Props> = ({ goNext }) => {
  const [rotinaDiaria, setRotinaDiaria] = useState<Atividade[]>([]);
  const [metodologiaEstudos, setMetodologiaEstudos] = useState<Metodologia[]>([]);
  const [date,] = useState(format(new Date(), 'EE dd/MM/yyyy HH:mm', { locale: ptBR }));
  const [currentTime,] = useState(format(new Date(), 'HH:mm', { locale: ptBR }));
  const [lastTime, setLastTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRotinaDiaria([
      { horario: "06:00 - 06:30", atividade: "Atividade física (ex: corrida, yoga, caminhada)", concluida: false },
      { horario: "06:30 - 08:00", atividade: "Preparar o [Café da manhã]", concluida: false },
      { horario: "08:00 - 09:00", atividade: "Estudos para o concurso (Matérias específicas e gerais)", concluida: false },
      { horario: "09:00 - 09:30", atividade: "Tarefa ou Intervalo / ", concluida: false },
      { horario: "09:30 - 11:30", atividade: "Estudar legislação para o concurso ", concluida: false },
      { horario: "11:30 - 12:00", atividade: "Alongamento / Breve caminhada", concluida: false },
      { horario: "12:00 - 13:00", atividade: "Almoço", concluida: false },
      { horario: "13:00 - 15:00", atividade: "Escrita a minha tese", concluida: false },
      { horario: "15:00 - 15:30", atividade: "Descanso / Lanche", concluida: false },
      { horario: "15:30 - 17:00", atividade: "Escrever a minha tese", concluida: false },
      { horario: "17:00 - 18:00", atividade: "Descanso / Intervalo / Buscar filha na escola", concluida: false },
      { horario: "18:00 - 18:30", atividade: "...", concluida: false },
      { horario: "18:30 - 19:00", atividade: "Preparar o Jantar", concluida: false },
      { horario: "19:00 - 20:00", atividade: "Tempo livre pra família", concluida: false },
      { horario: "20:00 - 21:30", atividade: "HitBox / Funcional / Atividade relaxante ", concluida: false },
      { horario: "21:00 - 22:00", atividade: "Preparação para dormir (higiene, leitura tranquila)", concluida: false },
      { horario: "22:00 - 06:00", atividade: "Sono de qualidade", concluida: false },
    ]);

    setMetodologiaEstudos([
      { titulo: "Defina suas metas", descricao: "Estabeleça metas claras para os estudos e para a produção de artigos científicos. Determine quais matérias do concurso requerem maior atenção e priorize-as." },
      { titulo: "Organize um plano de estudos", descricao: "Divida os conteúdos do concurso por disciplinas e crie um cronograma de estudos para cada uma delas. Reserve um tempo diário para estudar cada matéria." },
      { titulo: "Utilize técnicas de aprendizagem eficientes", descricao: "Experimente diferentes técnicas de estudo, como revisão espaçada, resumos, mapas mentais e questões de prática." },
      { titulo: "Estude em blocos de tempo", descricao: "Utilize a técnica Pomodoro ou outros intervalos de estudo concentrado, alternando com pequenos descansos." },
      { titulo: "Mantenha o foco e evite distrações", descricao: "Desligue dispositivos eletrônicos não relacionados aos estudos durante os períodos de estudo." },
      { titulo: "Pratique a escrita científica", descricao: "Reserve um tempo dedicado exclusivamente à pesquisa e redação dos artigos científicos, seguindo as normas das revistas desejadas." },
      { titulo: "Revise regularmente", descricao: "Reserve momentos para revisar o conteúdo estudado e os artigos escritos, garantindo a assimilação do conhecimento." },
      { titulo: "Acompanhe seu progresso", descricao: "Registre suas atividades diárias e faça uma autoavaliação periódica para verificar o cumprimento das metas estabelecidas." },
    ]);


  }, []);

  useEffect(() => {
    if (rotinaDiaria && rotinaDiaria.length > 0 && currentTime && currentTime !== lastTime) {
      setLastTime(currentTime);
      const updatedRotinaDiaria = rotinaDiaria.map(rotina => {
        const [inicio, fim] = rotina.horario.split(' - '); // Separa o intervalo da atividade
        console.log('inicio', inicio, 'fim', fim);
        console.log('currentTime', currentTime >= inicio && currentTime <= fim);
        if (currentTime >= inicio && currentTime <= fim) {
          return { ...rotina, destaque: true }; // Marca a atividade atual
        } else {
          return { ...rotina, destaque: false }; // Desmarca as outras atividades
        }
      });
      setRotinaDiaria(updatedRotinaDiaria);
    }
  }, [rotinaDiaria, currentTime, lastTime]);

  const toggleAtividade = (index: number) => {
    setRotinaDiaria(prevAtividades => prevAtividades.map((atividade, i) =>
      i === index ? { ...atividade, concluida: !atividade.concluida } : atividade
    ));
  };

  const calcularProgresso = () => {
    const concluidas = rotinaDiaria.filter(rotinaDiaria => rotinaDiaria.concluida).length;
    return Math.round((concluidas / rotinaDiaria.length) * 100);
  };






  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-0 "
    >
      <header className="bg-blue-500 text-white py-4 px-6 ">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{date.charAt(0).toLocaleUpperCase()}{date.slice(1)} </p>
          <div className="flex items-center">
            <img src="caminho/para/imagem/do/usuario.jpg" alt="Foto do usuário" className="w-8 h-8 rounded-full mr-2" />
            <p className="text-lg font-semibold">Olá, Marcelio</p>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-500">{calcularProgresso()}%</span>
          </div>
          <p className="text-lg">das atividades concluídas hoje!</p>
        </div>
      </header>

      <main className="px-6 py-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Hábitos / Tarefas</h2>
            {/* <button className="text-white-500">Ver todos</button> */}
          </div>
          <ul>
            {rotinaDiaria.map((rotina, index) => (

              <li key={index} onClick={() => goNext(rotina)} className={`flex items-center justify-between mb-2
                ${rotina.destaque ? 'text-blue-700 text-lg font-semibold cursor-pointer' : 'text-gray-900'}`}>
                <div className={`flex items-center`}>
                  <span className="text-gray-500
 mr-4">{rotina.horario}</span>
                  <span>{rotina.atividade}</span>
                </div>
                <button onClick={() => toggleAtividade(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${rotina.concluida ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {rotina.concluida && <CheckIcon className="w-5 h-5 text-white" />}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ... outras seções (Metas, etc.) */}

        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Metodologia de Estudos</h2>
          <ul className="list-disc pl-5">
            {metodologiaEstudos.map((item, index) => (
              <li key={index}>
                <strong>{item.titulo}:</strong> {item.descricao}
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-center py-4">
          <div className="text-right mt-4 p-4 bg-gray-100 text-green-800 rounded-lg">
            <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded" onClick={() => goNext()}>
              Continuar
            </button>
          </div>
          <p className="text-gray-600">Lembre-se de que a rotina deve ser adaptada às suas necessidades e preferências pessoais.</p>
          <p className="text-gray-600">Reserve um tempo para momentos de descanso, relaxamento e lazer para evitar sobrecarga e esgotamento.</p>
        </footer>
      </main>
    </motion.section >
  );
};

export default RotinaEstudos;
