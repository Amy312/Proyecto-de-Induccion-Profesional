import { Navigate, Route, Routes } from "react-router-dom";
import { useTask } from "../../../context/ContextProvider";
import { GuardedRoute } from "../../../guards/GuardedRoute";
import PrincipalPage from "../PrincipalPage";
import HomePage from "../HomePage";
import TasksPage from "./../../tasks/TasksPage";
import TempPage from "./../../timer/TempPage";

export const HomeRoutes = () => {
  const { auth } = useTask();
  //console.log(auth, " --- desde home routes");
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuardedRoute auth={auth}>
            <PrincipalPage />
          </GuardedRoute>
        }
      >
        <Route
          path="/home"
          element={
            <GuardedRoute auth={auth}>
              <HomePage />
            </GuardedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <GuardedRoute auth={auth}>
              <TasksPage />
            </GuardedRoute>
          }
        />
        <Route
          path="/temp"
          element={
            <GuardedRoute auth={auth}>
              <TempPage />
            </GuardedRoute>
          }
        />
        
      </Route>

    { <Route
          path="/*"
          element={
            <GuardedRoute auth={auth}>
              {console.log("Esta sonsera viene aqui")}
              <Navigate to="/home" />
            </GuardedRoute>
          }
        />}
    </Routes>
  );
};
