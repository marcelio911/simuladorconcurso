// src/pages/Login.tsx
import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const LoginPage: React.FC = () => {

  // Implement your login page logic here
  const navigation = useNavigate();

  const handleLoginSuccess = () => {
    navigation('/concursos');
  };

  const handleLoginFailure = () => {
    // Handle login failure
  };

  return (
    <Layout>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Login</h1>
        <p>Você deseja acessar, o nosso simulador de estudos? </p>
        <GoogleLoginButton
          clientId="603498498690-j2bq19pj20uk228om9ncrpdd6qa9in1p.apps.googleusercontent.com"
          buttonText="Login com Google"
          onSuccess={() => {
            handleLoginSuccess();
          }}
          onFailure={() => {
            handleLoginFailure();
          }}
        />
      </Content>
    </Layout>
  );
};

export default LoginPage;
