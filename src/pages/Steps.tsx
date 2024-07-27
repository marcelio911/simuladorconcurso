import React from 'react';
// import 'antd/dist/antd.css';
import HeaderBar from '../components/Header';
import StepList from '@/components/Steps/StepList';
import MyLayout from '@/components/Templates/MyLayout';

const Steps: React.FC = () => {

  return (
    <MyLayout>
      <HeaderBar />
      <div className="bg-gray-100 min-h-screen">
        <br/> <br/> <br/>
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold">Progresso do Plano</h1>
          </div>
        </header>
        <main className="container mx-auto my-8 p-4">
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <StepList />
          </section>
        </main>
        <footer className=" bg-blue-500 text-center py-4">
          <p className="text-white-600">Lembre-se de acompanhar seu progresso regularmente.</p>
        </footer>
      </div>
    </MyLayout>
  );
};

export default Steps;
