import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HomePage from "./HomePage";
import { useEffect } from "react";

const PrincipalPage = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <div className=" h-full bottom-0 top-0 right-0 left-0">
        <Navbar />

        <div className="mt-24 h-full">
          <Outlet />
        </div>
      </div>
      {/*<main className="mt-24 overflow-auto max-h-full">
        <Outlet />
  </main>*/}
    </>
  );
};
export default PrincipalPage;
