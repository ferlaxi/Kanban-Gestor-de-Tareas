"use client";

import { useState } from "react";
import useKanban from "@/hooks/useKanban";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Tarea() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [columnaId, setColumnaId] = useState(0);
  const [menu, setMenu] = useState(false);
  const [nombreColumna, setNombreColumna] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [subtareas, setSubtareas] = useState<any>([]);

  const { columnas, crearTarea, crearSubtarea, dark } =
    useKanban();
  const router = useRouter();

  function agregarSubtarea() {
    setSubtareas([...subtareas, { titulo: "", finalizada: false, tareaId: 0 }]);
  }

  function borrarSubtarea(index: any) {
    const nuevoArr = subtareas.filter(
      (subtarea: any, index2: any) => index !== index2 && subtarea
    );
    setSubtareas(nuevoArr);
  }

  function cambiarTitulo(valor: any, index: any) {
    const nuevoArr = [...subtareas];
    nuevoArr[index].titulo = valor;
    setSubtareas(nuevoArr);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nombre === "") {
      return setErrorNombre(true);
    } else if (columnaId === 0) {
      return;
    }
    await crearTarea({ nombre, descripcion, columnaId });

    await crearSubtarea(subtareas);

    router.back();
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
      } absolute inset-0 z-50 flex justify-center items-center`}
    >
      <div
        className={`${
          dark ? "bg-kb-black-medium" : "bg-white"
        } z-50 md:w-[480px] w-full h-auto rounded-md px-[32px]`}
      >
        <form onSubmit={handleSubmit} className="py-[32px]">
          <p
            className={`${
              dark ? "text-white" : "text-kb-black"
            }  font-bold text-[18px]`}
          >
            Agregar Nueva Tarea
          </p>
          <div className="mt-[24px] relative">
            <label
              className={`${
                dark ? "text-white" : "text-kb-gray"
              }  font-bold text-[12px]`}
            >
              Título
            </label>
            <input
              type="text"
              className={`${errorNombre ? "border-kb-red" : ""} ${
                dark
                  ? "bg-kb-black-medium placeholder:text-white/25 text-white"
                  : ""
              } border-kb-gray/25 focus:outline-none focus:border-kb-morado placeholder:text-black/25 placeholder:font-medium placeholder:text-[13px] rounded focus:border-none cursor-pointer h-[40px] mt-1 w-full`}
              placeholder="Ej. Tomar un descanso para beber café"
              onChange={(e) => setNombre(e.target.value)}
            />
            {errorNombre && (
              <span className="text-kb-red absolute right-4 top-[37px] font-medium text-[13px] pointer-events-none">
                No puede estar vacío
              </span>
            )}
          </div>
          <div className="mt-[24px]">
            <label
              className={`${
                dark ? "text-white" : "text-kb-gray"
              }  font-bold text-[12px]`}
            >
              Descripción
            </label>
            <textarea
              className={`${
                dark
                  ? "bg-kb-black-medium placeholder:text-white/25 text-white"
                  : ""
              } border-kb-gray/25 focus:outline-none focus:border-kb-morado placeholder:text-black/25 placeholder:font-medium placeholder:text-[13px] rounded focus:border-none cursor-pointer h-[112px] mt-1 w-full resize-none`}
              placeholder="Ej. Siempre es bueno tomarse un descanso. Este descanso de 15 minutos
              recargar un poco las pilas."
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="mt-[24px]">
            <label
              className={`${
                dark ? "text-white" : "text-kb-gray"
              }  font-bold text-[12px]`}
            >
              Subtareas
            </label>
            {subtareas.length === 0 ? (
              <p className="text-[13px] text-kb-gray flex w-full justify-center mt-4 mb-4">
                No hay subtareas, puedes agregar alguna
              </p>
            ) : (
              subtareas.map((subtarea: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-x-5 mt-1"
                  >
                    <input
                      className={`${
                        dark
                          ? "bg-kb-black-medium placeholder:text-white/25 text-white"
                          : ""
                      } border-kb-gray/25 focus:outline-none focus:border-kb-morado placeholder:text-black/25 placeholder:font-medium placeholder:text-[13px] rounded focus:border-none cursor-pointer h-[40px] w-full`}
                      type="text"
                      placeholder="Ej. Preparar Cafe"
                      onChange={(e) => cambiarTitulo(e.target.value, index)}
                    />
                    <svg
                      onClick={() => borrarSubtarea(index)}
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
              })
            )}
          </div>

          <div className="flex flex-col gap-y-[24px] mt-[12px]">
            <span
              onClick={() => agregarSubtarea()}
              className={`${
                dark ? "bg-white hover:bg-white" : "bg-kb-morado/10"
              } ${
                subtareas.length === 5 &&
                "pointer-events-none text-kb-morado-light"
              }  w-full py-2 flex justify-center rounded-full text-kb-morado font-bold text-[13px] cursor-pointer hover:bg-kb-morado/25 transition-all`}
            >
              + Agregar Subtarea
            </span>

            <div className="flex flex-col">
              <label
                className={`${
                  dark ? "text-white" : "text-kb-gray"
                }  font-bold text-[12px] mb-1`}
              >
                Columna
              </label>
              <span
                onClick={() => setMenu(!menu)}
                className={`${
                  dark ? "border-kb-gray/25 text-white" : "text-kb-black"
                } border w-full h-[40px] cursor-pointer rounded relative`}
              >
                <div className="flex items-center pl-[16px] font-medium text-[13px] h-[40px]">
                  {nombreColumna !== "" ? nombreColumna : "Seleccione Columna"}
                </div>
                {menu && (
                  <div
                    className={`${
                      dark ? "bg-kb-black-semi border-none" : "bg-white"
                    } flex flex-col gap-y-2 border mt-2 text-kb-gray font-medium text-[13px] rounded-md p-4`}
                  >
                    {columnas.map((columna, index) => {
                      return (
                        <p
                          onClick={() => {
                            setNombreColumna(columna.nombre);
                            setColumnaId(columna.id);
                          }}
                          key={index}
                          className="hover:text-kb-morado transition-all"
                        >
                          {columna.nombre}
                        </p>
                      );
                    })}
                  </div>
                )}
                {menu ? (
                  <svg
                    className="absolute right-3 top-4"
                    width="10"
                    height="7"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="M9 6 5 2 1 6"
                    />
                  </svg>
                ) : (
                  <svg
                    className="absolute right-3 top-4"
                    width="10"
                    height="7"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="#635FC7"
                      strokeWidth="2"
                      fill="none"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                )}
              </span>
            </div>
            <input
              className="bg-kb-morado w-full py-2 rounded-full text-white font-bold text-[13px] cursor-pointer hover:bg-kb-morado-light transition-all"
              type="submit"
              value="Crear Nueva Tarea"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
