import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export interface Activities {
  id: number;
  intervals: string;
  activity: string;
  emphasis?: boolean;
  done: boolean;
}

interface Methodology {
  title: string;
  description: string;
}

interface Props {
  goNext: (_daily?: Activities) => void;
}

const Routines: React.FC<Props> = ({ goNext }) => {
  const [dailyActivities, updateDailyActivities] = useState<Activities[]>([]);
  const [studyMethodology, setStudyMethodology] = useState<Methodology[]>([]);
  const [currentTime,] = useState(format(new Date(), 'HH:mm', { locale: ptBR }));
  const [lastTime, setLastTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    updateDailyActivities([
      { id: 1, intervals: "06:00 - 06:30", activity: "Atividade física (ex: corrida, yoga, caminhada)", done: false },
      { id: 2, intervals: "06:30 - 08:00", activity: "Preparar o [Café da manhã] / Levar Manu na escola", done: false },
      { id: 3, intervals: "08:00 - 09:00", activity: "Estudos para o concurso (Matérias específicas e gerais)", done: false },
      { id: 4, intervals: "09:00 - 09:30", activity: "Tarefa ou Intervalo / ", done: false },
      { id: 5, intervals: "09:30 - 11:30", activity: "Estudar legislação para o concurso ", done: false },
      { id: 6, intervals: "11:30 - 12:00", activity: "Alongamento / Breve caminhada", done: false },
      { id: 7, intervals: "12:00 - 13:00", activity: "Almoço", done: false },
      { id: 8, intervals: "13:00 - 15:00", activity: "Escrita a minha tese", done: false },
      { id: 9, intervals: "15:00 - 15:30", activity: "Descanso / Lanche", done: false },
      { id: 10, intervals: "15:30 - 17:00", activity: "Escrever a minha tese", done: false },
      { id: 11, intervals: "17:00 - 18:00", activity: "Descanso / Intervalo / Buscar filha na escola", done: false },
      { id: 12, intervals: "18:00 - 18:30", activity: "...", done: false },
      { id: 13, intervals: "18:30 - 19:00", activity: "Preparar o Jantar", done: false },
      { id: 14, intervals: "19:00 - 20:00", activity: "Tempo livre pra família", done: false },
      { id: 15, intervals: "20:00 - 21:30", activity: "HitBox / Funcional / Atividade relaxante ", done: false },
      { id: 16, intervals: "21:00 - 22:00", activity: "Preparação para dormir (higiene, leitura tranquila)", done: false },
      { id: 17, intervals: "22:00 - 06:00", activity: "Sono de qualidade", done: false },
    ]);

    setStudyMethodology([
      { title: "Defina suas metas", description: "Estabeleça metas claras para os estudos e para a produção de artigos científicos. Determine quais matérias do concurso requerem maior atenção e priorize-as." },
      { title: "Organize um plano de estudos", description: "Divida os conteúdos do concurso por disciplinas e crie um cronograma de estudos para cada uma delas. Reserve um tempo diário para estudar cada matéria." },
      { title: "Utilize técnicas de aprendizagem eficientes", description: "Experimente diferentes técnicas de estudo, como revisão espaçada, resumos, mapas mentais e questões de prática." },
      { title: "Estude em blocos de tempo", description: "Utilize a técnica Pomodoro ou outros intervalos de estudo concentrado, alternando com pequenos descansos." },
      { title: "Mantenha o foco e evite distrações", description: "Desligue dispositivos eletrônicos não relacionados aos estudos durante os períodos de estudo." },
      { title: "Pratique a escrita científica", description: "Reserve um tempo dedicado exclusivamente à pesquisa e redação dos artigos científicos, seguindo as normas das revistas desejadas." },
      { title: "Revise regularmente", description: "Reserve momentos para revisar o conteúdo estudado e os artigos escritos, garantindo a assimilação do conhecimento." },
      { title: "Acompanhe seu progresso", description: "Registre suas atividades diárias e faça uma autoavaliação periódica para verificar o cumprimento das metas estabelecidas." },
    ]);


  }, []);

  useEffect(() => {
    console.log('currentTime: ', currentTime, 'lastTime: ', lastTime);
    if (dailyActivities && dailyActivities.length > 0 && currentTime && currentTime !== lastTime) {
      setLastTime(currentTime);
      const updatedRotinaDiaria = dailyActivities.map(rotina => {
        const [inicio, fim] = rotina.intervals.split(' - '); // Separa o intervalo da atividade
        console.log('inicio', inicio, 'fim', fim);
        console.log('inicio >=', currentTime >= inicio);
        console.log('fim <=', currentTime <= fim);
        if (currentTime >= inicio && currentTime <= fim) {
          return { ...rotina, emphasis: true }; // Marca a atividade atual
        } else {
          return { ...rotina, emphasis: false }; // Desmarca as outras atividades
        }
      });
      updateDailyActivities(updatedRotinaDiaria);
    }
  }, [dailyActivities, currentTime, lastTime]);

  const toggleAtividade = (index: number) => {
    updateDailyActivities(prevAtividades => prevAtividades.map((atividade, i) =>
      i === index ? { ...atividade, done: !atividade.done } : atividade
    ));
  };

  const calcularProgresso = () => {
    const concluidas = dailyActivities.filter(rotinaDiaria => rotinaDiaria.done).length;
    return Math.round((concluidas / dailyActivities.length) * 100);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Se o item não foi solto em um destino válido

    const items = Array.from(dailyActivities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateDailyActivities(items);
    localStorage.setItem('rotinaDiaria', JSON.stringify(items)); // Salva a nova ordem no localStorage
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-0 "
    >

      <main className="px-2 py-2">

        <div className="mt-4 mb-4 flex bg-blue-500 text-white p-4 items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-500">{calcularProgresso()}%</span>
          </div>
          <p className="text-lg">das atividades concluídas hoje!</p>
        </div>

        <section className="px-4 py-3 m-0 theme-color bg-painel rounded-lg ">
          <div className="flex items-center justify-between mb-4 pl-4 pt-4">
            <h2 className="text-xl font-bold">Hábitos / Tarefas</h2>
          </div>
          {dailyActivities && (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId={"droppable-0"}>
                {(provided: any) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {dailyActivities.map((rotina, index) => (

                      <li
                        key={index}

                        onClick={() => goNext(rotina)} className={`flex items-center justify-between mb-2
                  ${rotina.emphasis ? 'text-white-700 bg-blue-500 text-lg font-semibold cursor-pointer' : 'text-gray-900'}`}>
                        <div className="justify-between">
                          <div className={`flex items-left`}>
                            <span className="intervals-color ml-4 mb-2">{rotina.intervals}</span>
                          </div>

                          <Draggable key={rotina.id} draggableId={rotina.activity + String(rotina.id)} index={index}>
                            {(providedd: any) => (
                              <div
                                ref={providedd.innerRef}
                                {...providedd.draggableProps}
                                {...providedd.dragHandleProps}
                                className={`flex flex-row rounded-lg w-96 p-2 mr-13 justify-between items-center activity-row`}>
                                <span className="text-sm  ml-4 mb-2">{rotina.activity}</span>
                                <button onClick={() => toggleAtividade(index)}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${rotina.done ? 'bg-green-500' : 'bg-gray-300'}`}>
                                  {rotina.done && <><span className='text-lg text-white font-bold'>✓</span></>}
                                </button>
                              </div>
                            )}
                          </Draggable>
                        </div>

                      </li>

                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </section>

        {/* ... outras seções (Metas, etc.) */}

        <section className="bg-white shadow-md rounded-lg p-6 mt-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Metodologia de Estudos</h2>
          <ul className="list-disc pl-5">
            {studyMethodology.map((item, index) => (
              <li key={index}>
                <strong>{item.title}:</strong> {item.description}
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

export default Routines;
