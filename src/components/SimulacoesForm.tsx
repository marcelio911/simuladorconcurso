import React, { useState } from 'react';
import { uploadQuestionsFileBySimulacaoId } from '../services/questions';
import { createSimulacoes, updateSimulacoes } from '../services/simulacoes';
import { Button } from 'antd';

interface SimulacoesFormProps {
  contest?: any;
  concursoId?: string;
  userId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const SimulacoesForm: React.FC<SimulacoesFormProps> = ({ contest, concursoId, userId, onSave, onCancel }) => {
  const [name, setName] = useState(contest?.name || '');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContest = { name, concursoId, userId };

    if (contest) {
      console.log('updateSimulacoes', file, contest);
      await updateSimulacoes(contest._id, newContest);
      if (contest && file) {
        await uploadQuestionsFileBySimulacaoId(file, contest._id);
      }
    } else {
      const saved = await createSimulacoes(newContest);
      console.log('saved', saved);
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
    <div className="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input type="text" placeholder="ID" value={contest?._id} />
      <input type="text" placeholder="ID do concurso" value={concursoId} />
      <input type="text" placeholder="ID do usuario" value={userId} />
      <label htmlFor="nome" >Caderno de provas em PDF **</label>

      <input id="nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="fileInput" >Caderno de provas em PDF **</label>
      <input type="file" accept="pdf/*" id="fileInput" onChange={handleFileChange} />

      <Button type="primary" >Salvar</Button>
      <Button type="link" onClick={onCancel}>Cancelar</Button>

    </div>
  );
};

export default SimulacoesForm;
