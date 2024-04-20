"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo-dark.svg";
import Link from "next/link";
import Toast from "@/components/Toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState({});
  const [aux, setAux] = useState(false);

  const { msg }: any = mensaje;
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAux(!aux);
      setMensaje({
        msg: "Hay Campos vacíos",
        error: true,
        estado: aux,
      });
      return setAux(!aux);
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setAux(!aux);
      setMensaje({
        msg: "Credenciales Invalidas",
        error: true,
        estado: aux,
      });
      return setAux(!aux);
    }
  }

  return (
    <>
      {msg && <Toast mensaje={mensaje} />}
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <Image className="mb-7" width={300} src={logo} alt="logo" />

        <form onSubmit={handleSubmit} className="flex flex-col w-80">
          <label className="font-bold mb-1">Email</label>
          <input
            className={`w-full mb-5 focus:transition-all outline-none rounded border-kb-gray-medium placeholder:opacity-50 focus:ring-0 focus:outline-none focus:border-kb-morado focus:border-2 caret-kb-morado border-2`}
            type="email"
            placeholder="Ingrese su Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="font-bold mb-1">Password</label>
          <input
            className={`w-full mb-5 rounded focus:transition-all outline-none border-kb-gray-medium placeholder:opacity-50 focus:ring-0 focus:outline-none focus:border-kb-morado focus:border-2 caret-kb-morado border-2`}
            type="password"
            placeholder="Ingrese su Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full bg-kb-morado text-white py-2 rounded cursor-pointer hover:bg-kb-morado-light transition-all"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>

        <div className="flex gap-x-2 mt-5">
          <p className="text-kb-gray">¿No Tienes una Cuenta?</p>
          <Link
            href={"/auth/registrar"}
            className="text-kb-black-light underline hover:text-kb-black-light/50 transition-all"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </>
  );
}
