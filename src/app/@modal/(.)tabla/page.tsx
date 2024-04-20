"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useKanban from "@/hooks/useKanban";

export default function Tabla() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(false);
  const [columnas, setColumnas] = useState<any>([]);
  const router = useRouter();
  const { crearTabla, crearColumna, dark } = useKanban();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (nombre === "") {
      return setError(true);
    }

    await crearTabla({ nombre });
    await crearColumna(columnas);

    setColumnas([]);
    router.back();
  }

  function agregarColumna() {
    setColumnas([...columnas, { nombre: "", tablaId: 0 }]);
  }

  function cambiarNombre(value: any, index: any) {
    const nuevoArr = [...columnas];
    nuevoArr[index].nombre = value;
    setColumnas(nuevoArr);
  }

  function borrarColumna(index: any) {
    const nuevoArr = columnas.filter(
      (columna: any, index1: any) => index1 !== index
    );
    setColumnas(nuevoArr);
  }

  function backRoute(e: any) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      router.back();
    }
  }

  return (
    <div
      onClick={(e) => backRoute(e)}
      className={`${
        dark ? "bg-black/50" : "bg-black/40"
      } absolute inset-0  backdrop:blur-md z-50 flex justify-center items-center`}
    >
      <div
        className={`${
          dark ? "bg-kb-black-medium" : "bg-white"
        } z-50 w-[480px] h-auto rounded-md px-[32px]`}
      >
        <form
          className="h-full py-[32px] flex flex-col justify-between"
          onSubmit={handleSubmit}
        >
          <div>
            <p
              className={`${
                dark ? "text-white" : "text-kb-black"
              }  font-bold text-[18px]`}
            >
              Agregar Nuevo Tablero
            </p>
            <div className="relative flex flex-col gap-y-1 mt-[24px]">
              <label
                className={`${
                  dark ? "text-white" : "text-kb-gray"
                }  font-bold text-[12px]`}
              >
                Nombre
              </label>
              <input
                className={`${
                  error ? "border-kb-red focus:border-kb-red" : ""
                }${
                  dark ? "bg-kb-black-medium placeholder:text-white/25 text-white" : ""
                } border-kb-gray/25 placeholder:text-black/25 rounded focus:border-kb-morado cursor-pointer h-[40px] focus:ring-0`}
                type="text"
                autoFocus
                placeholder="Nombre de la Tabla"
                onChange={(e) => setNombre(e.target.value)}
              />
              {error && (
                <span className="text-kb-red absolute right-4 top-[33px] font-medium text-[13px]">
                  No puede estar vacío
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-1 mt-[24px]">
              <label
                className={`${
                  dark ? "text-white" : "text-kb-gray"
                }  font-bold text-[12px]`}
              >
                Columnas
              </label>
              {columnas.length == 0 ? (
                <p className="text-[13px] text-kb-gray flex w-full justify-center mt-4 mb-4">
                  No hay columnas, puedes agregar alguna
                </p>
              ) : (
                <div>
                  {columnas.map((columna: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center gap-x-5 mt-2 mb-2"
                      >
                        <input
                          className={`${
                            dark ? "bg-kb-black-medium text-white" : ""
                          } border-kb-gray/25 focus:outline-none focus:border-kb-morado placeholder:text-black/25 rounded focus:border-none cursor-pointer h-[40px] w-full`}
                          type="text"
                          defaultValue={columna.nombre}
                          onChange={(e) => cambiarNombre(e.target.value, index)}
                        />
                        <svg
                          onClick={() => borrarColumna(index)}
                          className="fill-current text-kb-gray hover:text-kb-red transition-all cursor-pointer"
                          width="15"
                          height="15"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fillRule="evenodd">
                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                          </g>
                        </svg>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <span
              onClick={() => agregarColumna()}
              className={`${
                dark ? "bg-white hover:bg-white" : ""
              } bg-kb-morado/10 w-full py-2 flex justify-center rounded-full text-kb-morado font-bold text-[13px] cursor-pointer hover:bg-kb-morado/25 transition-all`}
            >
              + Agregar Columna
            </span>
            <input
              className="bg-kb-morado w-full py-2 rounded-full text-white font-bold text-[13px] cursor-pointer hover:bg-kb-morado-light transition-all"
              type="submit"
              value="Crear Nueva Tabla"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
