import { Navigate } from "react-router-dom";

export const GuardedRoute = ({ auth, children }) => {
  console.log(auth, "desde Guarded Route")
  if (localStorage.getItem("auth")=== "true") {
    return children;
  }else{

    return <Navigate to="/auth/login" />;

  }
};