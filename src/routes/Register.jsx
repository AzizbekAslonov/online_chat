import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../store/services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/appSlices";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [signUp, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("img", data.files[0]);
    // for (const iterator of formData.entries()) {
    //   console.log(iterator);
    // }
    signUp(formData)
      .unwrap()
      .then((data) => {
        toast.success("Signed up");
        navigate("/");
        dispatch(setUser(data.user));
        localStorage.setItem("user", JSON.stringify(data));
      });
  };

  return (
    <div className="flex h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-green-500 to-blue-600">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <img
            className="mx-auto h-20 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          />
        </div>

        <h2 className="mt-10 text-center text-3xl font-extrabold text-white">
          Регистрация
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: "Неверный формат email",
                  },
                })}
                type="text"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Пароль обязателен",
                })}
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700"
            >
              File
            </label>
            <div className="mt-2">
              <input
                type="file"
                {...register("files", {
                  required: "File is required",
                })}
              />
              {errors.files && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.files.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Зарегистрироваться
            </button>
            <NavLink
              className="mt-2 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              to={"/login"}
            >
              Войти
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
