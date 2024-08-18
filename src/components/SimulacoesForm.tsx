import React, { useState } from 'react';
import { uploadQuestionsFileBySimulacaoId } from '../services/questions';
import { createSimulacoes, updateSimulacoes } from '../services/simulacoes';
import LoadingButton from './Button';

interface SimulacoesFormProps {
  contest?: any;
  temaEspecificoId?: string;
  userId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const SimulacoesForm: React.FC<SimulacoesFormProps> = ({ contest, temaEspecificoId, userId, onSave, onCancel }) => {
  const [name, setName] = useState(contest?.name || '');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContest = { name, temaEspecificoId, userId };

    if (contest) {
      console.log('updateSimulacoes', file, contest);
      await updateSimulacoes(contest._id, newContest);
      if (contest && file) {
        await uploadQuestionsFileBySimulacaoId(file, contest._id);
      }
    } else {
      const saved = await createSimulacoes(newContest);
      if (saved && file) {
        await uploadQuestionsFileBySimulacaoId(file, saved._id);
      }
    }

    onSave();
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    console.log('selectedFile:: ', selectedFile);
    if (!selectedFile) return; // No file selected

    // Now you can use the selected file in your logic (e.g., upload it)
    // For example, you can set it in state:
    setFile(selectedFile);
  };

  return (
    <form className="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input type="hidden" placeholder="ID Simulacao" value={contest?._id} />
      <input type="hidden" placeholder="ID do temaEspecifico" value={temaEspecificoId} />
      <input type="hidden" placeholder="ID do usuario" value={userId} />
      <label htmlFor="nome" >Caderno de provas em PDF **</label>

      <input id="nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="fileInput" >Caderno de provas em PDF **</label>
      <input type="file" accept="pdf/*" id="fileInput" onChange={handleFileChange} />
      <button type="submit">Salvar</button>
      <LoadingButton loading type="link" onClick={onCancel}>Cancelar</LoadingButton>

    </form>
  );
};

export default SimulacoesForm;
