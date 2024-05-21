import React, { useState } from 'react';
import { Menu, Button, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { MenuWrapper, RightSection, StyledHeader } from './styles';

const HeaderBar: React.FC = () => {
  const history = useNavigate();
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
      <MenuWrapper theme={theme as any} mode="horizontal" onClick={handleMenuClick}>
        <Menu.Item key="concursos" onClick={() => navigate('home', 'concursos')}>Concursos</Menu.Item>
        <Menu.Item key="simulacoes" onClick={() => navigate('home', 'simulacoes')}>Simulações</Menu.Item>
        <Menu.Item key="meuAprendizado" onClick={() => navigate('home', 'meuAprendizado')}>Meu Aprendizado</Menu.Item>
      </MenuWrapper>
      <RightSection>
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          onChange={handleThemeChange}
        />
        <Button icon={<LogoutOutlined />}>Sair</Button>
      </RightSection>
    </StyledHeader>
  );
};

export default HeaderBar;
