import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { addClient, getClients } from "../../services/clientsService";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onAddSubmit = async (data) => {
    const clientsD = await getClients();

    const clientSize = clientsD.data.filter(
      (client) => client.user === data.newUsername
    ).length;

    if (clientSize === 0 && data.pass === data.confirmPass) {
      addClient({
        id: Number(uuid()),
        user: data.newUsername,
        password: data.pass,
      });
      setError(false);
      navigate("/auth/login");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <section className="bg-slate-100 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Title />
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Crear Cuenta
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onAddSubmit)}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Ingresa un nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="newUsername"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    placeholder="Ej: user123"
                    {...register("newUsername", {
                      required: true,
                    })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Ingresa una contraseña{" "}
                    <span className="text-sm font-light">
                      Min. 5 caracteres
                    </span>
                  </label>
                  <input
                    type="password"
                    id="pass"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    {...register("pass", { required: true, minLength: 5 })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Confirma tu contraseña
                  </label>
                  <input
                    type="password"
                    id=""
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    {...register("confirmPass", {
                      required: true,
                      minLength: 5,
                    })}
                  />
                </div>

                {error && (
                  <label className="block mb-2 text-sm font-medium text-red-500 ">
                    El usuario ya existe o no coinciden las contraseñas O_o
                  </label>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Crear Cuenta
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/auth/login"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Inicia sesión
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default RegisterPage;
