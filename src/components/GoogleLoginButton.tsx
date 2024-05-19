// src/components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleLoginButton: React.FC = () => {
  const handleLoginSuccess = async (response: any) => {
    const { tokenId } = response;
    await axios.post('http://localhost:3000/auth/google', { tokenId });
    // Redirecionar ou fazer outra ação após o login bem-sucedido
  };

  const handleLoginFailure = (response: any) => {
    console.error('Login falhou:', response);
  };

  return (
    <GoogleLogin
      clientId="your-google-client-id"
      buttonText="Login com Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
