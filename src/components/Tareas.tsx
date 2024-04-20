import axios from "axios";
import { useEffect, useState } from "react";
import SubtareasLength from "./SubtareasLength";
import Link from "next/link";
import useKanban from "@/hooks/useKanban";
import SubtareasFinalizadas from "./SubtareasFinalizadas";

export default function Tareas({ id }: any) {
  const [datos, setDatos] = useState<any>([]);

  const { setNombreTarea, dark, tarea, auxCambioColumna } = useKanban();

  useEffect(() => {
    async function TareasColumna() {
      const { data } = await axios(`/api/tarea/cantidad/${id}`);
      setDatos(data);
    }
    TareasColumna();
  }, [tarea, auxCambioColumna]);
  return (
    <div>
      {datos.map((dato: any, index: any) => {
        return (
          <Link
            onClick={() => {
              localStorage.setItem("tarea", dato.id);
              setNombreTarea(dato.nombre);
            }}
            href={`/tarea/${dato.id}`}
            key={index}
            className={`${
              dark
                ? "bg-kb-black-medium shadow-md shadow-[#364E7E]/10"
                : "bg-white shadow-md"
            } w-full  h-[88px] my-5 rounded-lg flex flex-col justify-center pl-[16px] gap-y-1 group cursor-pointer`}
          >
            <div
              className={`${
                dark ? "text-white" : "text-kb-black"
              }  font-bold text-[15px] group-hover:text-kb-morado transition-all`}
            >
              {dato.nombre}
            </div>
            <p className="text-kb-gray font-bold text-[12px]">
              <SubtareasFinalizadas id={dato.id} /> de{" "}
              <SubtareasLength id={dato.id} /> Subtareas
            </p>
          </Link>
        );
      })}
    </div>
  );
}
