import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import photoUserProfile from '/assets/images/user-icon.svg';
import { isNight } from '@/utils/dateTimeUtils';
interface HeaderProps {
  isLogged?: boolean;
}

const HeaderBar: React.FC<HeaderProps> = () => {
  const [date,] = useState(format(new Date(), 'EE, dd MMMM yyyy - HH:mm', { locale: ptBR }));


  return (
    <div className={` ${isNight ? 'noite-obj noite-estrelas-1 text-white' : 'dia-obj'} `}>
      <header className=" py-2 px-2 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-semibold">{date.charAt(0).toLocaleUpperCase()}{date.slice(1)} </p>
          </div>
          <div className="dia-obj dia-sol"></div>
          <div className="noite-obj noite-lua"></div>
        </div>
        <div className="flex-row flex items-center justify-left ">
          <h2 className="font-bold text-2xl ">Olá, Marcelio</h2>
          <img src={photoUserProfile} alt="Foto do usuário" className="w-8 h-8 rounded-full m-2" />
        </div>
      </header>
    </div>
  );
};

export default HeaderBar;
