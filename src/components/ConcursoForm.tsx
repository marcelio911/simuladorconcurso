// src/components/ConcursoForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { createConcurso, updateConcurso } from '../services/api';
import moment from 'moment';

interface ConcursoFormProps {
  concurso?: any;
  onSave: () => void;
  onCancel: () => void;
}

const ConcursoForm: React.FC<ConcursoFormProps> = ({ concurso, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [initialValues] = useState({
    name: concurso?.name || '',
    descricao: concurso?.descricao || '',
    dataProva: concurso?.dataProva ? moment(concurso.dataProva) : null,
    local: concurso?.local || '',
    temasGerais: concurso?.temasGerais || '',
    temasEspecificos: concurso?.temasEspecificos || '',
  });

  const handleSubmit = async (values: any) => {
    const concursoData = {
      ...values,
      dataProva: values.dataProva.toDate(), // Convertendo o momento para uma data JS
    };
    if (concurso) {
      await updateConcurso(concurso.id, concursoData);
    } else {
      await createConcurso(concursoData);
    }
    onSave();
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: '400px' }}
    >
      <Form.Item name="descricao" label="Descrição" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="dataProva" label="Data da Prova" rules={[{ required: true }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="local" label="Local" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="temasGerais" label="Temas Gerais" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="temasEspecificos" label="Temas Específicos" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default ConcursoForm;
