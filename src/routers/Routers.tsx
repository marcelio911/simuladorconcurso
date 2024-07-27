import { createHashRouter } from "react-router-dom";
import LoginPage from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import QuestionComponent from "../components/Question";
import Home from "../pages/Home";
import Steps from "../pages/Steps";
import Questoes from "../pages/Questoes";
import MyRoutine from "../pages/Step-by-step/MyRoutine";

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  }, {
    path: '/steps',
    element: <Steps />,
  }, {
    path: '/my-routine',
    element: <MyRoutine />,
  },
  {
    path: '/dashboard',
    element: <Questoes />,
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