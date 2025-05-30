import React, { useState, useContext } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // 👈 import context

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext); // 👈 get function

  // const handleChange = (e) =>
  //   setForm({ ...form, [e.target.name]: e.target.value });
  const handleChange= (e) =>{
    setForm({...form, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      setToken(res.data.token);
      loginSuccess(); // 👈 update context immediately
      navigate("/");
    } catch (err) {
      setError("Invalid email or password", err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@mail.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
