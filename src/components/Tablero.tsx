"use client";

import useKanban from "@/hooks/useKanban";
import Link from "next/link";
import CantidadTareas from "./CantidadTareas";
import Tareas from "./Tareas";

export default function Tablero() {
  const { datosTabla, columnas, ocultarBarra, dark, idActual } = useKanban();

  return (
    <div
      className={`${
        ocultarBarra
          ? "transition-all overflow-x-scroll w-full"
          : "translate-x-0 transition-all w-full overflow-x-auto"
      } ${dark && "bg-kb-black-semi"} flex z-10 w-full`}
    >
      {columnas.length === 0 ? (
        <div
          className={`${
            dark && "bg-kb-black-semi"
          } w-full h-[calc(100vh-96px)] flex justify-center items-center gap-x-9 pt-7 pl-5 text-center`}
        >
          <div className="flex flex-col gap-y-7 items-center text-kb-gray font-bold text-[18px]">
            <p>
              Este tablero está vacío. Cree una nueva columna para comenzar.
            </p>
            <Link
              href={"/tabla/actualizar"}
              className={`${
                datosTabla.id === undefined || idActual === 0
                  ? "pointer-events-none bg-kb-morado-light"
                  : ""
              } bg-kb-morado text-white font-bold text-[15px] rounded-full px-4 py-3 hover:bg-kb-morado-light transition-all`}
            >
              + Agregar Columna
            </Link>
          </div>
        </div>
      ) : (
        <>
          {columnas.map((col: any, index1: any) => {
            return (
              <div
                key={index1}
                className="relative flex justify-start items-start gap-x-9 pt-7 pl-5 min-w-[280px] overflow-y-auto no-scrollbar"
              >
                <div className="w-[280px] h-[calc(100vh-170px)]">
                  <div className="w-full flex text-kb-gray font-bold text-[12px] tracking-widest gap-x-3">
                    <div
                      className={`h-[15px] w-[15px] rounded-full ${
                        col.color == 0
                          ? "bg-[#49C4E5]"
                          : col.color == 1
                          ? "bg-[#8471F2]"
                          : col.color == 2
                          ? "bg-[#67E2AE]"
                          : col.color == 3
                          ? "bg-[#EA5555]"
                          : col.color == 4
                          ? "bg-[#f6c667]"
                          : ""
                      }`}
                    ></div>
                    {col.nombre} (<CantidadTareas id={col.id} />)
                  </div>
                  <Tareas id={col.id} />
                </div>
              </div>
            );
          })}
          <div
            className={`${
              dark ? "bg-kb-black-medium/25" : "bg-kb-column-add"
            } flex justify-center items-center w-[280px] h-[calc(100vh-170px)] mt-7 ml-5 rounded-md `}
          >
            <Link
              href={"/tabla/actualizar"}
              className={`${
                columnas.length === 7 &&
                "pointer-events-none text-kb-morado-light"
              } text-kb-gray font-bold w-[280px] text-center text-[24px] hover:text-kb-morado transition-all`}
            >
              + Nueva Columna
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
