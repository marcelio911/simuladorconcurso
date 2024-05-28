import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

interface Props {
  theme: string;
  handleMenuClick: MenuProps['onClick'];
  navigate: (path: string, section: string) => void;
}

const MenuComponent: React.FC<Props> = ({ theme, handleMenuClick, navigate }) => {
  const items: MenuProps['items'] = [
    {
      key: 'concursos',
      label: 'Concursos',
      onClick: () => navigate('home', 'concursos'),
    },
    {
      key: 'simulacoes',
      label: 'Simulações',
      onClick: () => navigate('home', 'simulacoes'),
    },
    {
      key: 'meuAprendizado',
      label: 'Meu Aprendizado',
      onClick: () => navigate('home', 'meuAprendizado'),
    },
  ];

  return (
    <Menu
      theme={theme as any}
      style={{ background: '#001529', color: 'white' }}
      mode="horizontal"
      onClick={handleMenuClick}
      items={items}
    />
  );
};

export default MenuComponent;
