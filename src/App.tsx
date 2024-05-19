import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionComponent from './components/Question';
import GabaritoComponent from './components/Gabarito';
// import './App.css';


const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/gabarito" Component={GabaritoComponent} />
          <Route path="/" Component={QuestionComponent} />
        </Routes>
      </Router>

    </div>
  );
};

export default App
