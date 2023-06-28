import { NavLink, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { useDispatch } from "../../context/ContextProvider";
import { useForm } from "react-hook-form";
import { types } from "../../context/taskReducer";
import { getClients } from "../../services/clientsService";
import { useState } from "react";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCheckSubmit = async (data) => {
    const clientsD = await getClients();

    const isCorrect = clientsD.data.filter(
      (client) =>
        client.user === data.username && client.password === data.password
    );

    if (isCorrect.length === 1) {
      dispatch({ type: types.login, id: isCorrect[0].id });
      localStorage.setItem("auth", true);
      setError(false);
      navigate("/home");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <section className="bg-slate-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Title />
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Iniciar Sesión
              </h1>
              <form
                onSubmit={handleSubmit(onCheckSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="ej: amy313"
                    {...register("username", { required: true, maxLength: 20 })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    {...register("password", { required: true, minLength: 4 })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  {error && (
                    <label className="block mb-2 text-sm font-medium text-red-500 ">
                      El usuario y la contraseña no coinciden O_o
                    </label>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 "
                >
                  Iniciar sesión
                </button>

                <p className="text-sm font-light text-gray-500 ">
                  ¿No tienes una cuenta?{" "}
                  <NavLink
                    to="/auth/register"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Crear cuenta
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginPage;
