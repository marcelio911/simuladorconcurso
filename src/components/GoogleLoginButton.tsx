// src/components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import api from '../services/api';

interface GoogleLoginProps {
  clientId: string;
  buttonText: string;
  onSuccess: (response: any) => void;
  onFailure: (response: any) => void;
  cookiePolicy?: string;
}


const GoogleLoginButton: React.FC<GoogleLoginProps> = ({
  clientId,
  buttonText = 'Entrar com Google',
  onSuccess,
  onFailure,
  cookiePolicy = 'single_host_origin',
}) => {
  const handleLoginSuccess = async (response: any) => {
    const { tokenId } = response;
    await api.post('/auth/google', { tokenId });
    // Redirecionar ou fazer outra ação após o login bem-sucedido
    onSuccess(response);
  };

  const handleLoginFailure = (response: any) => {
    console.error('Login falhou:', response);
    onFailure(response);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy={cookiePolicy}
    />
  );
};

export default GoogleLoginButton;
