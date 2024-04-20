"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useKanban from "@/hooks/useKanban";

export default function ModalTarea() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("eliminar");
  const router = useRouter();

  const { borrarTarea, nombreTarea, dark } = useKanban();

  async function eliminar() {
    await borrarTarea();
    router.back();
  }
  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black/50 z-50 overflow-auto flex justify-center items-center">
          <div
            className={`${
              dark ? "bg-kb-black-semi" : "bg-white"
            } flex flex-col justify-between py-[32px] px-[32px] w-full h-[284px] md:w-[480px] md:h-[229px] rounded`}
          >
            <span className="text-kb-red font-bold text-[18px]">
              ¿Eliminar esta Tarea?
            </span>
            <p className="text-kb-gray font-medium text-[13px]">
              ¿Está seguro de que desea eliminar la tarea "{nombreTarea}" y sus
              subtareas? Esta acción no se puede revertir.
            </p>
            <div className="md:flex md:flex-row flex flex-col gap-y-3 justify-between font-bold text-[13px]">
              <button
                onClick={() => eliminar()}
                className="bg-kb-red px-[75px] text-white py-3 rounded-full hover:bg-kb-red-light transition-all"
              >
                Borrar
              </button>
              <button
                onClick={() => router.back()}
                className={`${
                  dark ? "bg-white hover:bg-white" : "bg-kb-morado/10"
                } hover:bg-kb-morado/25 text-kb-morado py-3 px-[75px] rounded-full transition-all`}
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
