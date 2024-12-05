import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import getBaseUrl from "../utils/baseURL.js";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const auth = res.data;
      console.log(auth);

      if (auth) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("EL Token ha expirado, por favor ingresa nuevamente");
          window.location.href = "/";
        }, 3600 * 1000);
      }

      alert("Administrador logueado con exito");
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage("Por favor ingresa un usuario y contraseña validos");
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>

        <p className="text-gray-500 text-xs text-center mt-4">
          &copy;2024 BookWorms. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
