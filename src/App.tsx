import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionComponent from './components/Question';
import GabaritoComponent from './components/Gabarito';
import ContestList from './pages/SimulacoesList';
import ConcursoList from './pages/ConcursoList';
import Login from './pages/Login';
import SimulacoesList from './pages/SimulacoesList';
// import './App.css';


const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/simulacoes" Component={SimulacoesList} />
          <Route path="/gabarito" Component={GabaritoComponent} />
          <Route path="/questoes" Component={QuestionComponent} />
          <Route path="/admin" element={<ContestList />} />
          <Route path="/login" Component={Login} />
          <Route path="/" element={<ConcursoList />} />
        </Routes>
      </Router>

    </div>
  );
};

export default App
