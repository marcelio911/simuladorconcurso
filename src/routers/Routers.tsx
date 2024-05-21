import { createHashRouter } from "react-router-dom";
import LoginPage from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import ConcursoList from "../pages/ConcursoList";
import QuestionComponent from "../components/Question";
import SimulacoesList from "../pages/SimulacoesList";
import Home from "../pages/Home";

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/concursos',
    element: <ConcursoList />,
  },
  {
    path: '/questoes/:simulacaoId',
    Component: QuestionComponent,
  },
  {
    path: '/simulacoes/:concursoId/:userId',
    element: <SimulacoesList />,
    errorElement: <ErrorPage />,
  },
]);