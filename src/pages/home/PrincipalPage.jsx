import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";


const PrincipalPage = () => {
  
  return (
    <>
      <div className=" h-full bottom-0 top-0 right-0 left-0">
        <Navbar />

        <div className="mt-24 h-full">
          <Outlet />
        </div>
      </div>
      
    </>
  );
};
export default PrincipalPage;
