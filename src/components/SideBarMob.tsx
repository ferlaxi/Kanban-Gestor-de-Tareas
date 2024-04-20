"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import sol from "@/assets/icon-light-theme.svg";
import luna from "@/assets/icon-dark-theme.svg";
import Link from "next/link";
import useKanban from "@/hooks/useKanban";
import { useEffect } from "react";
import DatosHome from "./DatosHome";

export default function SideBarMod() {
  const {
    obtenerTablas,
    tablas,
    setDatosTabla,
    setIdActual,
    idActual,
    obtenerColumnas,
    setColumnas,
    dark,
    setDark,
    menuMob,
    setMenuMob,
  } = useKanban();

  useEffect(() => {
    obtenerTablas();
    obtenerColumnas();
    setIdActual(Number(localStorage.getItem("key")));
  }, []);

  function asignarDatos(tabla: any) {
    setColumnas([]);
    setDatosTabla({
      id: tabla.id,
      nombre: tabla.nombre,
      userId: tabla.userId,
    });
    localStorage.setItem("key", tabla.id);
    setIdActual(Number(localStorage.getItem("key")));
    obtenerColumnas();
  }

  return (
    <div
      className={`${
        !menuMob && "hidden"
      } absolute w-full flex md:hidden justify-center bg-kb-black/50 h-full z-20`}
    >
      <div
        className={` ${
          dark && "dark:bg-kb-black-medium border-kb-black-light"
        } ${
          !menuMob && "hidden"
        } h-fit w-[300px] absolute flex bg-white rounded-lg md:hidden flex-col justify-between z-20 mt-5`}
      >
        <div>
          <div className="mt-5">
            <p className="text-kb-gray font-bold text-[12px] tracking-widest pl-[34px] mb-5">
              TODAS LAS TABLAS ({tablas.length})
            </p>

            {tablas.map((tabla, index) => {
              return (
                <div
                  onClick={() => {
                    asignarDatos(tabla);
                    setMenuMob(!menuMob);
                  }}
                  key={index}
                  className={`flex flex-col gap-y-3 text-kb-gray font-bold text-[15px]`}
                >
                  <div
                    className={`${
                      idActual == tabla.id
                        ? "bg-kb-morado text-white hover:bg-kb-morado pointer-events-none"
                        : ""
                    } ${
                      dark ? "hover:bg-white" : ""
                    } flex items-center gap-x-3 group pl-[34px] cursor-pointer rounded-r-full h-[48px] mr-5 hover:bg-kb-morado/10 transition-all`}
                  >
                    <svg
                      className={`${
                        idActual == tabla.id
                          ? "text-white group-hover:text-white"
                          : ""
                      } fill-current text-kb-gray group-hover:text-kb-morado transition-all`}
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                    </svg>
                    <p
                      className={`${
                        idActual == tabla.id ? "group-hover:text-white" : ""
                      } group-hover:text-kb-morado`}
                    >
                      {tabla.nombre}
                    </p>
                  </div>
                  <DatosHome />
                </div>
              );
            })}

            <Link
              href={"/tabla"}
              onClick={() => setMenuMob(!menuMob)}
              scroll={false}
              className={`${
                tablas.length == 9 && "pointer-events-none text-kb-morado-light"
              } flex flex-col gap-y-3 text-kb-morado font-bold text-[15px]`}
            >
              <div
                className={`${
                  dark ? "hover:bg-white" : ""
                } flex items-center gap-x-3 group pl-[34px] cursor-pointer rounded-r-full h-[48px] mr-5 hover:bg-kb-morado/10 transition-all`}
              >
                <svg
                  className="fill-current text-kb-morado group-hover:text-kb-morado transition-all"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
                <button className={`group-hover:text-kb-morado transition-all`}>
                  + Crear Nueva Tabla
                </button>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div
            className={`${
              dark && "dark:bg-kb-black-semi"
            } flex items-center gap-x-4 w-[250px] h-[48px] bg-kb-gray-light justify-center mx-[24px] mb-2 mt-5`}
          >
            <Image src={sol} alt="sol-icon" />
            <label className="inline-flex cursor-pointer items-center">
              <input
                onClick={() => setDark(!dark)}
                type="checkbox"
                className="peer sr-only"
              />
              <div className="peer relative h-[20px] w-[40px] rounded-full bg-kb-morado hover:bg-kb-morado-light after:absolute after:start-[3px] after:top-[3px] after:h-[14px] after:w-[14px] after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-full"></div>
            </label>
            <Image src={luna} alt="luna-icon" />
          </div>

          <div
            onClick={() => signOut()}
            className="flex items-center gap-x-3 mb-2 font-bold text-kb-gray group pl-[34px] cursor-pointer rounded-r-full h-[48px] mr-5 hover:bg-kb-red-light/20 transition-all"
          >
            <svg
              className="fill-current text-kb-gray group-hover:text-kb-red transition-all"
              width="25px"
              height="25px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 9.875v12.219c0 1.125 0.469 2.125 1.219 2.906 0.75 0.75 1.719 1.156 2.844 1.156h6.125v-2.531h-6.125c-0.844 0-1.5-0.688-1.5-1.531v-12.219c0-0.844 0.656-1.5 1.5-1.5h6.125v-2.563h-6.125c-1.125 0-2.094 0.438-2.844 1.188-0.75 0.781-1.219 1.75-1.219 2.875zM6.719 13.563v4.875c0 0.563 0.5 1.031 1.063 1.031h5.656v3.844c0 0.344 0.188 0.625 0.5 0.781 0.125 0.031 0.25 0.031 0.313 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.344-0.281 0.313-0.844 0-1.156l-7.344-7.313c-0.438-0.469-1.375-0.188-1.375 0.563v3.875h-5.656c-0.563 0-1.063 0.469-1.063 1.031z"></path>
            </svg>
            <p className="group-hover:text-kb-red transition-all">
              Cerrar Sesión
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
