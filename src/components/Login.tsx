'use client';

import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import api from "../../api";
import { useAppDispatch } from "@/lib/hook";
import { login } from "@/lib/features/userSlice/userSlice";
import { useRouter } from "next/navigation";

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from submitting the default way
    setError("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Login user data: ", response.data.user);
        const userData = response.data.user;
        dispatch(login(userData));
        router.push('/'); 
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen text-black">
      <div className="mx-auto md:w-full max-w-lg bg-white rounded-xl p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">Logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            href="/sign-up"
            className="font-semibold text-primary text-blue-700 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center"> {error}</p>}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              aria-label="Email"
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              className="bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
