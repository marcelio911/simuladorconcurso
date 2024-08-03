import React from 'react';
import HeaderBar from '../components/Header';
import DefaultLayout from '@/components/Templates/DefaultLayout';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {

  return (
    <DefaultLayout>
      <HeaderBar />
      <div className="flex flex-col ">
        <div id="menu" className="py-12">
          <div className={`p-4 border-l-4 border-gray-600 bg-green-900 mb-4 `}>
            <Link to="/dashboard/routine" className=" text-white rounded-md">Minha Rotina</Link>
          </div>
          <div className={`p-4 border-l-4 border-green-600 bg-yellow-800 mb-4 `}>
            <Link to="/dashboard/simulations" className="text-white rounded-md">Concursos e Simulações</Link>
          </div>
          <div className={`p-4 border-l-4 border-yellow-600 bg-blue-900 mb-4 `}>
            <Link to="/dashboard/tracking" className=" text-white rounded-md">Acompanhe</Link>
          </div>
          <div className={`p-4 border-l-4 border-blue-600 bg-gray-900 mb-4 `}>
            <Link to="/dashboard/settings" className=" text-white rounded-md">Menu</Link>
          </div>

        </div>


      </div>

    </DefaultLayout>
  );
};

export default Dashboard;
