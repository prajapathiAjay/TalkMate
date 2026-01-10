import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from 'react-router-dom'

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
const navigate=useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    navigate('/chat');
    console.log("Form Data:", data);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
