
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
        👨‍💻 Welcome to the Online Judge
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Login / Register to continue
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
