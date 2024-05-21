import { useState, useEffect } from 'react';

const useAprendizados = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(true);
  };

  return {
    loading,
    error,
  };
};

export default useAprendizados;
