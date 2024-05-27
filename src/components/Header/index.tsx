import React, { useState } from 'react';
import { Menu, Button, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { RightSection, StyledHeader } from './styles';
import useQuestions from '../../hooks/useQuestions';

const HeaderBar: React.FC = () => {
  const history = useNavigate();
  const { explainQuetions } = useQuestions();
  const [theme, setTheme] = useState('light');

  const handleBack = () => {
    history(-1);
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
  };

  const handleMenuClick = ({ key }: any) => {
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = (path: string, key: string) => {
    history('/' + path);
    handleMenuClick(key);
  };


  return (
    <StyledHeader>
      <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
      <Menu theme={theme as any} style={{ background: '#001529', color: 'white' }} mode="horizontal" onClick={handleMenuClick}>
        <Menu.Item key="concursos" onClick={() => navigate('home', 'concursos')}>Concursos</Menu.Item>
        <Menu.Item key="simulacoes" onClick={() => navigate('home', 'simulacoes')}>Simulações</Menu.Item>
        <Menu.Item key="meuAprendizado" onClick={() => navigate('home', 'meuAprendizado')}>Meu Aprendizado</Menu.Item>
      </Menu>
      <RightSection>
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          onChange={handleThemeChange}
        />

        <button type="submit" onClick={() => { explainQuetions() }} id="help">?</button>
        {/* <Button icon={<LogoutOutlined />}>Sair</Button> */}

      </RightSection>
    </StyledHeader>
  );
};

export default HeaderBar;
