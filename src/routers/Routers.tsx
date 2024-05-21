import { createHashRouter } from "react-router-dom";
import LoginPage from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import QuestionComponent from "../components/Question";
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
    path: '/questoes/:simulacaoId',
    Component: QuestionComponent,
  },
]);