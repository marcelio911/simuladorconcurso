import { useState } from 'react';

const useAprendizados = () => {
  const [loading,] = useState(true);
  const [error,] = useState<string | null>(null);


  return {
    loading,
    error,
  };
};

export default useAprendizados;
