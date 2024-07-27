import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigate();

  const handleSubmit = () => {
    console.log('User:', username, 'Password:', password);
    // Aqui você adicionaria a lógica para verificar os dados de usuário e senha
    if (username === 'teste' && password === '123') {
      handleLoginSuccess();
    }
  };

  const handleLoginSuccess = () => {
    navigation('/dashboard');
  };

  const handleLoginFailure = () => {
    // Handle login failure
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    handleLoginSuccess,
    handleLoginFailure,
  };
}
