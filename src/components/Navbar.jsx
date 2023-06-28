import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useTask } from "../context/ContextProvider";
import { types } from "../context/taskReducer";
import { memo, useEffect } from "react";
import { getClientById } from './../services/clientsService';
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const {id} = useTask();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const logout = () => {
    localStorage.setItem("auth", false);
    localStorage.setItem("id", 0);
    dispatch({ type: types.logout });
    navigate("/auth/login");
  };

  const getUser = async() => {
    const {data } = await getClientById(id);
  
    setUser(data)
    console.log(user);
  } 

  useEffect(() => {
    getUser();
  },[])
  return (
    <nav className="bg-red-50 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap  justify-between mx-auto p-4">
        <a className="flex items-center">
          <img src={logo} className="w-16 mr-3" alt="amy-io logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Amy_IO
          </span>
        </a>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
     

          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
            <li>
              <Link
              to="/home"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 "
            >
              Home
              </Link>
            </li>
            <li>
              <Link
              to="/tasks"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 "
            >
              Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/temp"
                className="navlink block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 "
              >
                Temp
              </Link>
            </li>
          </ul>
        </div>
        <div className=" flex flex-row order-2 items-center ">
        <h1 className="flex self-center text-center m-5 font-medium"> Hola {user.user}</h1>
        <button
          type="button"
          onClick={logout}
          className=" text-white bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
        >
          Cerrar Sesión
        </button>
        </div>
        
      </div>
    </nav>
  );
};
export default memo(Navbar);
