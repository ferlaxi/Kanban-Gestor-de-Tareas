"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useKanban from "@/hooks/useKanban";

export default function CantidadTareas({ id }: any) {
  const [length, setLength] = useState(0);

  const { tarea, auxCambioColumna } = useKanban();

  useEffect(() => {
    async function DevolverLength() {
      const { data } = await axios(`/api/tarea/cantidad/${id}`);
      setLength(data.length);
    }
    DevolverLength();
  }, [tarea, auxCambioColumna]);
  return <>{length}</>;
}
