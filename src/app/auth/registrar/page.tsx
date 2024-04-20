"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import logo from "@/assets/logo-dark.svg";
import { useState } from "react";
import Toast from "@/components/Toast";

export default function Registrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [mensaje, setMensaje] = useState({});
  const [aux, setAux] = useState(false);
  const { msg }: any = mensaje;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ([email, password, repetirPassword].includes("")) {
      setAux(!aux);
      setMensaje({
        msg: "Hay campos vacíos",
        error: true,
        estado: aux,
      });
      return setAux(!aux);
    }

    if (password !== repetirPassword) {
      setAux(!aux);
      setMensaje({
        msg: "Los Passwords no son iguales",
        error: true,
        estado: aux,
      });
      return setAux(!aux);
    }

    if (password.length < 6) {
      setAux(!aux);
      setMensaje({
        msg: "Password Min. 6 Carácteres",
        error: true,
        estado: aux,
      });
      return setAux(!aux);
    }

    try {
      const res = await axios.post("/api/auth/registrar", { email, password });
      setAux(!aux);
      setMensaje({
        msg: "Registrado Correctamente",
        error: false,
        estado: aux,
      });
      setAux(!aux);
    } catch (error: any) {
      setAux(!aux);
      setMensaje({
        msg: error.response.data.message,
        error: true,
        estado: aux,
      });
      setAux(!aux);
    }
  }

  return (
    <>
      {msg && <Toast mensaje={mensaje} />}
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <Image className="mb-7" width={300} src={logo} alt="logo" priority />
        <form onSubmit={handleSubmit} className="flex flex-col w-80">
          <label htmlFor="email" className="font-bold mb-1">
            Email
          </label>
          <input
            className={`w-full mb-5 focus:transition-all outline-none rounded border-kb-gray-medium placeholder:opacity-50 focus:ring-0 focus:outline-none focus:border-kb-morado focus:border-2 caret-kb-morado border-2`}
            type="email"
            placeholder="Ingrese Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="Password" className="font-bold mb-1">
            Password
          </label>
          <input
            className={`w-full mb-5 rounded focus:transition-all outline-none border-kb-gray-medium placeholder:opacity-50 focus:ring-0 focus:outline-none focus:border-kb-morado focus:border-2 caret-kb-morado border-2`}
            type="password"
            placeholder="Ingrese su Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="RepetirPassword" className="font-bold mb-1">
            Repetir Password
          </label>
          <input
            className={` w-full mb-5 rounded focus:transition-all outline-none border-kb-gray-medium placeholder:opacity-50 focus:ring-0 focus:outline-none focus:border-kb-morado focus:border-2 caret-kb-morado border-2`}
            type="password"
            placeholder="Repite tu Password"
            onChange={(e) => setRepetirPassword(e.target.value)}
          />

          <input
            className="w-full bg-kb-morado text-white py-2 rounded cursor-pointer hover:bg-kb-morado-light transition-all"
            type="submit"
            value="Registrar"
          />
        </form>

        <div className="flex gap-x-2 mt-5">
          <p className="text-kb-gray">¿Tienes una cuenta ya?</p>
          <Link
            href={"/auth/login"}
            className="text-kb-black-light underline hover:text-kb-black-light/50 transition-all"
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    </>
  );
}
