import { createHashRouter } from "react-router-dom";
import LoginPage from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import QuestionComponent from "../components/Question";
import Home from "../pages/Home";
import Steps from "../pages/Steps";
// import Questoes from "../pages/Questoes";
import Dashboard from "../pages/Dashboard";
import MyRoutine from "../pages/Step-by-step/MyRoutine";
import Simulations from "@/pages/tabs/Simulations";
import Tracking from "@/pages/tabs/Tracking";
import Menu from "@/pages/tabs/Menu";

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
    element: <Dashboard />,
  },
  {
    path: '/dashboard/routine',
    element: <MyRoutine />,
  },
  {
    path: '/dashboard/simulations',
    element: <Simulations />,
  },
  {
    path: '/dashboard/tracking',
    element: <Tracking />,
  },
  {
    path: '/dashboard/settings',
    element: <Menu />,
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