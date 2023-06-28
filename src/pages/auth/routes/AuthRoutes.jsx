import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./../LoginPage";
import RegisterPage from "./../RegisterPage";
import { useTask } from "../../../context/ContextProvider";

export const AuthRoutes = () => {
  const { auth } = useTask();
  console.log(localStorage.getItem("auth"), " en authroutes")
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route
        path="/*"
        element={
          /*<GuardedRoute auth={auth}>
            {console.log("siu viene aqui desde lofgin", auth)}
            <Navigate to={"/home"} />
          </GuardedRoute>*/
         // localStorage.getItem("auth") === "false" ? <Navigate to="/auth/login"/> : <Navigate to="home"/>
         <Navigate to="/auth/login" />
        }
      />
    </Routes>
  );
};
