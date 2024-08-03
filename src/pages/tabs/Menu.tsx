import React from 'react';
import DefaultLayout from '@/components/Templates/DefaultLayout';
import HeaderBar from '@/components/Header';
import { Link } from 'react-router-dom';
import { isNight } from '@/utils/dateTimeUtils';

const Menu: React.FC = () => {
  return (
    <DefaultLayout>
      <HeaderBar />
      <main className={`container ${isNight ? 'noite' : 'dia'} theme-color bg-painel flex flex-col mx-2 my-3 p-4`}>
        <ul>
          <li><Link to="/menu/profile" className=" rounded-md">Meu perfil</Link></li>
          <li><Link to="/menu/settings" className=" rounded-md">Configurações</Link></li>
        </ul>
        ...opcoesB
        ...opcoesC
      </main>
    </DefaultLayout>
  );
};

export default Menu;
