"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useKanban from "@/hooks/useKanban";

export default function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const router = useRouter();

  const {
    datosTabla,
    eliminarTabla,
    setDatosTabla,
    setColumnas,
    dark,
    tablas,
    setIdActual,
  } = useKanban();

  async function eliminar() {
    await eliminarTabla();
    setIdActual(0);
    setDatosTabla({
      id: "",
      nombre: "",
      userId: "",
    });
    setColumnas([]);
    localStorage.removeItem("key");
    router.back();
  }
  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black/50 z-50 overflow-auto flex justify-center items-center">
          <div
            className={`${
              dark ? "bg-kb-black-medium" : "bg-white"
            } flex flex-col justify-between py-[32px] px-[16px] md:px-[32px] w-full md:w-[480px] md:h-[229px] h-[284px] rounded`}
          >
            <span className="text-kb-red font-bold text-[18px]">
              ¿Eliminar esta Tabla?
            </span>
            <p className="text-kb-gray font-medium text-[13px]">
              ¿Estás seguro de que deseas eliminar el tablero "
              {datosTabla.nombre}"? Esta acción eliminará todas las columnas y
              tareas y no se puede revertir.
            </p>
            <div className="md:flex md:flex-row flex flex-col gap-y-3 w-full md:justify-between font-bold text-[13px]">
              <button
                onClick={() => eliminar()}
                className="bg-kb-red md:px-[75px] text-white py-3 rounded-full hover:bg-kb-red-light transition-all"
              >
                Borrar
              </button>
              <button
                onClick={() => router.back()}
                className={`${
                  dark ? "bg-white hover:bg-white" : "bg-kb-morado/10"
                }  hover:bg-kb-morado/25 text-kb-morado py-3 px-[75px] rounded-full transition-all`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
