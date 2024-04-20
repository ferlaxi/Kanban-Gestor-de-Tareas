"use client";

import Nav from "@/components/Nav";
import SideBar from "@/components/SideBar";
import SideBarMod from "@/components/SideBarMob";
import Tablero from "@/components/Tablero";
import useKanban from "@/hooks/useKanban";

export default function Admin() {
  const { ocultarBarra, setOcultarBarra, dark } = useKanban();
  return (
    <div className={`${dark && "bg-kb-black-semi"}`}>
      <Nav />
      <div className="relative flex h-[calc(100vh-96px)] w-full">
        <div
          onClick={() => setOcultarBarra(!ocultarBarra)}
          className="absolute bottom-7 w-[56px] h-[48px] bg-kb-morado cursor-pointer rounded-tr-full rounded-br-full md:flex hidden justify-center items-center hover:bg-kb-morado-light transition-all z-20"
        >
          <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
              fill="#FFF"
            />
          </svg>
        </div>
        <SideBar />
        <SideBarMod />
        <Tablero />
      </div>
    </div>
  );
}
