// src/pages/Login.tsx
import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Layout } from 'antd';

const { Content } = Layout;

const Login: React.FC = () => {
  return (
    <Layout>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GoogleLoginButton />
      </Content>
    </Layout>
  );
};

export default Login;
