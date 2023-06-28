import { Navigate } from "react-router-dom";

export const GuardedRoute = ({ auth, children }) => {
  console.log(auth, "desde Guarded Route")
//  console.log(typeof localStorage.getItem("auth"), "uwu")
  if (localStorage.getItem("auth")=== "true") {
    //console.log("pero entre :")
    return children;
  }else{
    //console.log(localStorage.getItem("auth"), "desde Guarded Route en false :v")

    return <Navigate to="/auth/login" />;

  }
};