import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../pages/auth/routes/AuthRoutes";
import { useTask } from "../context/ContextProvider";
import { HomeRoutes } from "../pages/home/routes/HomeRoutes";
import { GuardedRoute } from "../guards/GuardedRoute";

export const AppRouter = () => {
  const { auth } = useTask();
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route
        path="/*"
        element={
          <GuardedRoute auth={auth}>
            <HomeRoutes />
          </GuardedRoute>
        }
      />
    </Routes>
  );
};
