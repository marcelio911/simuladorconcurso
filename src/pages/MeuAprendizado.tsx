import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Statistic } from 'antd';
import useAprendizados from '../hooks/useAprendizados';
import { QuestionDto } from '@/components/Question';
import Loading from '@/components/Loading';
import { theme } from '../styles/theme';
export interface EstatisticaDto {
  _id: string,
  userId: string;
  concursoId: string;
  simulacaoId: string;

  simulacaoName: string;
  question: QuestionDto;
  dateTime: number;
}

const MeuAprendizado: React.FC = () => {
  const { error, _loadEstatisticasByConcursoId, estatisticas } = useAprendizados();
  const [filteredEstatisticas, setFilteredEstatisticas] = useState<EstatisticaDto[]>([]);
  const [filter, setFilter] = useState({ correct: null, simuladoId: null });

  useEffect(() => {
    _loadEstatisticasByConcursoId();
  }, []);

  useEffect(() => {
    if (estatisticas && filter) {
      setFilteredEstatisticas(estatisticas.filter(simulacao => {
        return (filter.correct === null || simulacao.question.correctAnswerChecked === filter.correct) &&
          (filter.simuladoId === null || simulacao._id === filter.simuladoId);
      }));
    }
  }, [filter, estatisticas]);

  const handleFilterChange = (type: any, value: any) => {
    setFilter(prev => ({ ...prev, [type]: value }));
  };

  const correctCount = estatisticas?.filter(simulacao => simulacao?.question?.correctAnswerChecked).length;
  const incorrectCount = estatisticas?.filter(simulacao => !simulacao?.question?.correctAnswerChecked).length ?? 0 ;

  return (
    <Col style={{ padding: theme.spacing.large, backgroundColor: theme.colors.background }}>
      <h2>Meu aprendizado </h2>
      <Loading />
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card onClick={() => handleFilterChange('correct', true)} style={{ backgroundColor: theme.colors.correct }}>
            <Statistic title="Respostas Corretas" value={correctCount} />
          </Card>
        </Col>
        <Col span={12}>
          <Card onClick={() => handleFilterChange('correct', false)} style={{ backgroundColor: theme.colors.incorrect }}>
            <Statistic title="Respostas Erradas" value={incorrectCount} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        {filteredEstatisticas && filteredEstatisticas.map(simulacao => (
          <Col span={8} key={simulacao._id}>
            <Card title={simulacao?.simulacaoName}
              onClick={() => handleFilterChange('simuladoId', simulacao.simulacaoId)}
              style={{ backgroundColor: simulacao.question.correctAnswerChecked ? theme.colors.correct : theme.colors.incorrect }}>
              <p>{simulacao?.question.questionText}</p>
              {simulacao?.question.options.map(a=>
                <li key={a}>{a}</li>
              )}
              <p><b>Resposta:</b> {simulacao.question.correctAnswerChecked ? 'Correta' : 'Errada'}</p>
              <p><b>Tentativas:</b> {simulacao.question.attempt}</p>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Row justify="space-around" gutter={16}>
        <div className="horizontal-scroll">
          <Card title="Aprendizado 1" bordered={false}>
            Informações sobre o Aprendizado 1
          </Card>
          <Card title="Aprendizado 2" bordered={false}>
            Informações sobre o Aprendizado 2
          </Card>
          <Card title="Aprendizado 3" bordered={false}>
            Informações sobre o Aprendizado 3
          </Card>
        </div>
      </Row> */}
    </Col >
  );
};

export default MeuAprendizado;
