import React, { useState } from 'react';
import { createTemasEspecificos, updateTemasEspecificos } from '../services/temasEpecificos';
import LoadingButton from './Button';

interface TemasEspecificosFormProps {
  contest?: any;
  concursoId?: string;
  userId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const TemasEspecificosForm: React.FC<TemasEspecificosFormProps> = ({ contest, concursoId, userId, onSave, onCancel }) => {
  const [descricao, setDescricao] = useState(contest?.descricao || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContest = { descricao, concursoId, userId };

    if (contest) {
      await updateTemasEspecificos(contest._id, newContest);
    } else {
      await createTemasEspecificos(newContest);
    }
    onSave();
  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input type="hidden" placeholder="ID TemaEspecifico" value={contest?._id} />
      <input type="hidden" placeholder="ID do concurso" value={concursoId} />
      <input type="hidden" placeholder="ID do usuario" value={userId} />

      <input id="nome" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

      <button type="submit">Salvar</button>
      <LoadingButton loading type="link" onClick={onCancel}>Cancelar</LoadingButton>

    </form>
  );
};

export default TemasEspecificosForm;
