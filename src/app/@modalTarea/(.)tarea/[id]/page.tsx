"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import SubtareasLength from "@/components/SubtareasLength";
import useKanban from "@/hooks/useKanban";
import { useRouter } from "next/navigation";
import SubtareasFinalizadas from "@/components/SubtareasFinalizadas";

export default function TareaUnica() {
  const [datosTarea, setDatosTarea] = useState<any>([]);
  const [datosSubtarea, setDatosSubtarea] = useState<any>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const { columnas, dark, setAux, aux, nombreColumna, cambiarColumna } =
    useKanban();
  const router = useRouter();

  useEffect(() => {
    async function obtenerTarea() {
      const id = localStorage.getItem("tarea");
      const { data } = await axios(`/api/tarea/${id}`);
      setDatosTarea(data);
    }

    async function obtenerSubtareas() {
      const id = localStorage.getItem("tarea");
      const { data } = await axios(`/api/tarea/subtarea/${id}`);
      let ordenado = data.sort((a: any, b: any) => {
        if (a.ind < b.ind) {
          return 1;
        }
        if (a.ind > b.ind) {
          return -1;
        }
        return 0;
      });
      setDatosSubtarea(ordenado);
    }

    obtenerTarea();
    obtenerSubtareas();
  }, []);

  function backRoute(e: any) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      router.back();
    }
  }

  async function marcarFinalizado(id: any, estado: any) {
    const estadoFinal = !estado;
    await axios.put(`/api/tarea/subtarea/${id}`, {
      estadoFinal,
    });
    const { data } = await axios(
      `/api/tarea/subtarea/${localStorage.getItem("tarea")}`
    );
    let ordenado = data.sort((a: any, b: any) => {
      if (a.ind < b.ind) {
        return 1;
      }
      if (a.ind > b.ind) {
        return -1;
      }
      return 0;
    });
    setDatosSubtarea(ordenado);
    setAux(!aux);
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
        } z-50 w-[480px] h-auto rounded-md p-[32px]`}
      >
        <div className="flex justify-between items-center mb-[24px]">
          <p
            className={`${
              dark ? "text-white" : "text-kb-black"
            }  font-bold text-[18px]`}
          >
            {datosTarea.nombre}
          </p>
          <div className="relative">
            <Image
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer"
              src={dots}
              alt="dots"
            />
            {menuOpen && (
              <div
                className={`${
                  dark ? "bg-kb-black-semi" : "bg-white"
                } z-30 absolute flex flex-col justify-center w-[192px] h-[92px] transition-all shadow right-0 top-7 rounded-md font-bold text-[13px] `}
              >
                <Link
                  href={"/tarea/actualizar"}
                  replace
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="text-kb-gray cursor-pointer w-full h-full flex items-center pl-[16px] hover:bg-kb-gray/5 transition-all"
                >
                  Editar Tarea
                </Link>
                <Link
                  href={"?eliminar=true"}
                  replace
                  onClick={() => setMenuOpen(false)}
                  className="text-kb-red cursor-pointer w-full h-full flex items-center pl-[16px] hover:bg-kb-gray/5 transition-all"
                >
                  Borrar Tarea
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className="text-kb-gray font-medium text-[13px] mb-[24px]">
          {datosTarea.descripcion}
        </p>

        <p
          className={`${
            dark ? "text-white" : "text-kb-gray"
          }  font-bold text-[12px]`}
        >
          Subtareas (<SubtareasFinalizadas id={localStorage.getItem("tarea")} />{" "}
          de <SubtareasLength id={localStorage.getItem("tarea")} />)
        </p>

        {datosSubtarea.map((dato: any, index: any) => {
          return (
            <label
              htmlFor={dato.ind}
              key={index}
              className={`${
                dark ? "bg-kb-black-semi" : "bg-kb-gray-light"
              } flex gap-x-2 items-center  p-3 h-auto rounded-md my-3 cursor-pointer hover:bg-kb-morado/25 group transition-all z-10`}
              onClick={() => {
                marcarFinalizado(dato.ind, dato.finalizada);
              }}
            >
              {dato.finalizada ? (
                <>
                  <input
                    type="checkbox"
                    name="check"
                    defaultChecked
                    id={dato.ind}
                    className={`rounded-sm cursor-pointer peer text-kb-morado border-kb-gray/25 checked:ring-transparent pointer-events-none`}
                  />
                  <p
                    className={`${
                      dark
                        ? "text-white peer-checked:text-white/50"
                        : "text-kb-black"
                    } font-bold text-[12px] peer-checked:text-kb-black/50 peer-checked:line-through decoration-kb-black/50 pointer-events-none`}
                  >
                    {dato.titulo}
                  </p>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    name="check"
                    id={dato.ind}
                    className={`${
                      dark ? "bg-kb-black-medium" : ""
                    } rounded-sm cursor-pointer peer text-kb-morado border-kb-gray/25 checked:ring-transparent`}
                  />
                  <p
                    className={`${
                      dark ? "text-white" : ""
                    } text-kb-black font-bold text-[12px] peer-checked:text-kb-black/50 peer-checked:line-through decoration-kb-black/50`}
                  >
                    {dato.titulo}
                  </p>
                </>
              )}
            </label>
          );
        })}

        <div className="flex flex-col mt-[24px]">
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
              dark ? "border-kb-gray/25" : ""
            } border w-full text-kb-black h-[40px] cursor-pointer rounded relative`}
          >
            <div
              className={`${
                dark ? "text-white" : ""
              } flex items-center pl-[16px] font-medium text-[13px] h-[40px]`}
            >
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
                        cambiarColumna(columna.id, columna.nombre);
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
      </div>
    </div>
  );
}
