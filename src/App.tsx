import { RouterProvider } from 'react-router-dom';

import { router } from './routers/Routers';
import './styles/main.css';

const App: React.FC = () => {
  return (


    <RouterProvider router={router} />



  );
};

export default App
