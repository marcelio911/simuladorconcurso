// src/pages/Login.tsx
import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';
import { Form, Input, Button, Row, Col } from 'antd';
const LoginPage: React.FC = () => {

  // Implement your login page logic here

  const { handleSubmit, handleLoginSuccess, handleLoginFailure, setUsername, setPassword } = useAuth();

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col span={12}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <h1>Entrar no sistema</h1>
          <p>Você deseja acessar, o nosso simulador de estudos? </p>
          <Form.Item
            label="Usuário"
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
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
      </Col>
    </Row>
  );
};

export default LoginPage;
