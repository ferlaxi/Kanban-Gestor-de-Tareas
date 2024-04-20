"use client";

import axios from "axios";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export const KanbanContext = createContext<{
  obtenerTablas: () => Promise<void>;
  tablas: any[];
  setDatosTabla: React.Dispatch<React.SetStateAction<Object>>;
  datosTabla: { nombre: string; id: string; userId: string };
  crearTabla: (datos: any) => Promise<void>;
  setIdActual: React.Dispatch<React.SetStateAction<number>>;
  idActual: number;
  eliminarTabla: () => Promise<void>;
  editarTabla: (datos: any) => Promise<void>;
  crearColumna: (datos: any) => Promise<void>;
  obtenerColumnas: () => Promise<void>;
  setColumnas: React.Dispatch<React.SetStateAction<any[]>>;
  columnas: any[];
  editarColumnas: (datos: any) => Promise<void>;
  borrarColumna: (datos: any) => Promise<void>;
  crearTarea: (datos: any) => Promise<void>;
  setLengthTareas: React.Dispatch<React.SetStateAction<number>>;
  lengthTareas: number;
  idColumnas: any[];
  setIdColumnas: React.Dispatch<React.SetStateAction<any[]>>;
  crearSubtarea: (datos: any) => Promise<void>;
  borrarTarea: () => Promise<void>;
  setNombreTarea: React.Dispatch<React.SetStateAction<string>>;
  nombreTarea: string;
  ocultarBarra: boolean;
  setOcultarBarra: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  tarea: any[];
  setTarea: React.Dispatch<React.SetStateAction<any[]>>;
  subtarea: any[];
  setSubtarea: React.Dispatch<React.SetStateAction<any[]>>;
  aux: boolean;
  auxCambioColumna: boolean;
  setAux: React.Dispatch<React.SetStateAction<boolean>>;
  menuMob: boolean;
  setMenuMob: React.Dispatch<React.SetStateAction<boolean>>;
  nombreColumna: string;
  cambiarColumna: (columnaId: any, nombre: any) => Promise<void>;
}>({
  obtenerTablas: async () => {},
  tablas: [],
  setDatosTabla: () => {},
  datosTabla: { nombre: "", id: "", userId: "" },
  crearTabla: async (datos: any) => {},
  setIdActual: () => {},
  idActual: 0,
  eliminarTabla: async () => {},
  editarTabla: async () => {},
  crearColumna: async (datos: any) => {},
  obtenerColumnas: async () => {},
  columnas: [],
  setColumnas: () => {},
  editarColumnas: async () => {},
  borrarColumna: async () => {},
  crearTarea: async () => {},
  setLengthTareas: () => {},
  lengthTareas: 0,
  idColumnas: [],
  setIdColumnas: () => {},
  crearSubtarea: async () => {},
  borrarTarea: async () => {},
  setNombreTarea: () => {},
  nombreTarea: "",
  ocultarBarra: false,
  setOcultarBarra: () => {},
  dark: false,
  setDark: () => {},
  tarea: [],
  setTarea: () => {},
  subtarea: [],
  setSubtarea: () => {},
  aux: false,
  auxCambioColumna: false,
  setAux: () => {},
  nombreColumna: "",
  cambiarColumna: async () => {},
  menuMob: false,
  setMenuMob: () => {},
});

export default function KanbanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tablas, setTablas] = useState<any[]>([]);
  const [columnas, setColumnas] = useState<any[]>([]);
  const [tarea, setTarea] = useState<any>([]);
  const [subtarea, setSubtarea] = useState<any>([]);
  const [datosTabla, setDatosTabla] = useState<any>({});
  const [idActual, setIdActual] = useState(0);
  const [idColumnas, setIdColumnas] = useState<any[]>([]);
  const [lengthTareas, setLengthTareas] = useState(0);
  const [nombreTarea, setNombreTarea] = useState("");
  const [ocultarBarra, setOcultarBarra] = useState(false);
  const [dark, setDark] = useState(false);
  const [aux, setAux] = useState(false);
  const [auxCambioColumna, setAuxCambioColumna] = useState(false);
  const [menuMob, setMenuMob] = useState(false);
  const [nombreColumna, setNombreColumna] = useState("");

  const router = useRouter();

  //Tablas
  async function obtenerTablas() {
    const { data } = await axios("/api/tabla");
    setTablas(data.reverse());
  }

  async function crearTabla(datos: any) {
    const { data } = await axios.post("/api/tabla", datos);
    setTablas([...tablas, data].reverse());
    setIdActual(data.id);
    localStorage.setItem("key", data.id);
    setDatosTabla({
      id: data.id,
      nombre: data.nombre,
      userId: data.userId,
    });
  }

  async function eliminarTabla() {
    const { data } = await axios.delete(`/api/tabla/${datosTabla.id}`);
    setTablas(tablas.filter((tabla) => tabla.id !== data.id));
  }

  async function editarTabla(datos: any) {
    const { data } = await axios.put(`/api/tabla/${datosTabla.id}`, datos);
    setTablas(
      tablas.map((tabla) => (tabla.id === data.id ? data : tabla)).reverse()
    );
    setDatosTabla({
      id: data.id,
      nombre: data.nombre,
      userId: data.userId,
    });
  }

  //Columnas y Tareas de cada una
  async function obtenerColumnas() {
    if (localStorage.getItem("key") !== null) {
      const tablaId = localStorage.getItem("key");
      const { data } = await axios(`/api/columna/${tablaId}`);
      setColumnas(data);
    }
  }

  async function cambiarColumna(columnaId: any, nombre: any) {
    setNombreColumna(nombre);

    await axios.put(`/api/tarea/${localStorage.getItem("tarea")}`, {
      columnaId,
    });
    localStorage.removeItem("idcolumna");
    router.back();
    setAuxCambioColumna(!auxCambioColumna);
  }

  async function crearColumna(datos: any) {
    datos.map((dato: any) => {
      dato.tablaId = Number(localStorage.getItem("key"));
      dato.color = Math.floor(Math.random() * 5);
    });
    await axios.post(`/api/columna/${localStorage.getItem("key")}`, {
      datos,
    });
    obtenerColumnas();
  }

  async function editarColumnas(datos: any) {
    await axios.put(`/api/columna/${datosTabla.id}`, datos);
  }

  async function borrarColumna(id: any) {
    const { data } = await axios.delete(`/api/columna/${id}`);
    setColumnas(columnas.filter((columna) => columna.id != data.id));
  }

  //Tareas
  async function crearTarea(datos: any) {
    const { data } = await axios.post("/api/tarea", datos);
    localStorage.setItem("tarea", data.id);
    setTarea([...tarea, data]);
  }

  async function borrarTarea() {
    const { data } = await axios.delete(
      `/api/tarea/${localStorage.getItem("tarea")}`
    );
    setTarea([...tarea, data]);
    localStorage.removeItem("tarea");
  }

  //Subtareas
  async function crearSubtarea(datos: any) {
    datos.map((dato: any) => {
      dato.tareaId = Number(localStorage.getItem("tarea"));
    });
    const { data } = await axios.post(`/api/tarea/subtarea`, { datos });
    setSubtarea([...subtarea, data]);
  }

  return (
    <KanbanContext.Provider
      value={{
        obtenerTablas,
        tablas,
        setDatosTabla,
        datosTabla,
        crearTabla,
        setIdActual,
        idActual,
        eliminarTabla,
        editarTabla,
        crearColumna,
        obtenerColumnas,
        columnas,
        setColumnas,
        editarColumnas,
        borrarColumna,
        crearTarea,
        lengthTareas,
        setLengthTareas,
        idColumnas,
        setIdColumnas,
        crearSubtarea,
        borrarTarea,
        nombreTarea,
        setNombreTarea,
        ocultarBarra,
        setOcultarBarra,
        dark,
        setDark,
        setTarea,
        tarea,
        setSubtarea,
        subtarea,
        aux,
        setAux,
        nombreColumna,
        cambiarColumna,
        auxCambioColumna,
        menuMob,
        setMenuMob,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
