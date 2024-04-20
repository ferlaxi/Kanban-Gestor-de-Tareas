"use client";

import { useEffect } from "react";
import useKanban from "@/hooks/useKanban";
import axios from "axios";

export default function DatosHome() {
  const { setDatosTabla } = useKanban();
  useEffect(() => {
    async function infoHome() {
      if (localStorage.getItem("key") !== null) {
        const { data } = await axios(
          `/api/tabla/${localStorage.getItem("key")}`
        );
        setDatosTabla({
          id: data.id,
          nombre: data.nombre,
          userId: data.userId,
        });
      }
      return;
    }
    infoHome();
  }, []);
  return <></>;
}
