"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useKanban from "@/hooks/useKanban";

export default function Actualizar() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(false);
  const [columnaActualizadas, setColumnaActualizadas] = useState<any[]>([]);
  const [columnasNuevas, setColumnasNuevas] = useState<any[]>([]);

  const router = useRouter();
  const {
    datosTabla,
    editarTabla,
    columnas,
    editarColumnas,
    borrarColumna,
    crearColumna,
    dark,
  } = useKanban();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (nombre === "") {
      return setError(true);
    }

    await editarTabla({ nombre });
    await editarColumnas(columnaActualizadas);

    if (columnasNuevas.length > 0) {
      await crearColumna(columnasNuevas);
    }

    setColumnasNuevas([]);
    router.back();
  }

  //actualizar
  function actualizarNombreColumna(value: any, index: any) {
    const nuevosValores = [...columnas];
    nuevosValores[index].nombre = value;
    setColumnaActualizadas(nuevosValores);
  }

  //agregar
  function agregarColumnaNueva() {
    setColumnasNuevas([...columnasNuevas, { nombre: "", tablaId: 0 }]);
  }

  function borrarColumnaNueva(index: any) {
    const nuevoArr = columnasNuevas.filter((col, index2) => index2 !== index);
    setColumnasNuevas(nuevoArr);
  }

  function nombreNuevo(valor: any, index: any) {
    const nuevoArr = [...columnasNuevas];
    columnasNuevas[index].nombre = valor;
    setColumnasNuevas(nuevoArr);
  }

  //eliminar
  function eliminarColumna(id: any) {
    borrarColumna(id);
  }

  useEffect(() => {
    setNombre(datosTabla.nombre);
  }, []);

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
          dark ? "bg-kb-black-medium" : "bg-white "
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
              Editar Tablero
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
                  dark
                    ? "bg-kb-black-medium placeholder:text-white/25 text-white"
                    : ""
                } border-kb-gray/25 placeholder:text-black/25 rounded focus:border-kb-morado cursor-pointer h-[40px] focus:ring-0`}
                type="text"
                placeholder="Nombre de la Tabla"
                onChange={(e) => setNombre(e.target.value)}
                defaultValue={nombre}
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
              {columnas.map((col: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-x-5 mt-3 "
                  >
                    <input
                      className={`${
                        dark ? "bg-kb-black-medium text-white focus:border-kb-morado" : ""
                      } border-kb-gray/25 focus:outline-none focus:border-kb-morado placeholder:text-black/25 rounded focus:ring-0 cursor-pointer h-[40px] w-full`}
                      type="text"
                      defaultValue={col.nombre}
                      onChange={(e) => {
                        actualizarNombreColumna(e.target.value, index);
                      }}
                    />
                    <svg
                      onClick={() => eliminarColumna(col.id)}
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
              {columnasNuevas.map((col, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-x-5 mt-1"
                  >
                    <input
                      className={`${
                        dark ? "bg-kb-black-medium text-white focus:border-kb-morado" : ""
                      } border-kb-gray/25 placeholder:text-black/25 rounded focus:ring-0 focus:border focus:border-kb-morado cursor-pointer h-[40px] w-full`}
                      type="text"
                      defaultValue={col.nombre}
                      onChange={(e) => nombreNuevo(e.target.value, index)}
                    />
                    <svg
                      onClick={() => borrarColumnaNueva(index)}
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
          </div>

          <div className="flex flex-col gap-y-3 mt-3">
            <span
              onClick={() => agregarColumnaNueva()}
              className={`${dark ? "bg-white hover:bg-white" : ""} ${
                columnas.length === 7 &&
                "pointer-events-none text-kb-morado-light"
              } ${
                columnas.length + columnasNuevas.length === 7 &&
                "pointer-events-none text-kb-morado-light"
              } bg-kb-morado/10 w-full py-2 flex justify-center rounded-full text-kb-morado font-bold text-[13px] cursor-pointer hover:bg-kb-morado/25 transition-all`}
            >
              + Agregar Columna
            </span>
            <input
              className="bg-kb-morado w-full py-2 rounded-full text-white font-bold text-[13px] cursor-pointer hover:bg-kb-morado-light transition-all"
              type="submit"
              value="Guardar Cambios"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
