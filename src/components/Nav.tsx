"use client";

import Image from "next/image";
import dots from "@/assets/icon-vertical-ellipsis.svg";
import logo from "@/assets/logo-dark.svg";
import logo_dark from "@/assets/logo-light.svg";
import logo_mob from "@/assets/logo-mobile.svg";
import arrowDown from "@/assets/icon-chevron-down.svg";
import arrowUp from "@/assets/icon-chevron-up.svg";
import useKanban from "@/hooks/useKanban";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    idActual,
    datosTabla,
    columnas,
    dark,
    ocultarBarra,
    menuMob,
    setMenuMob,
  } = useKanban();
  return (
    <div
      className={`${dark ? "bg-kb-black-medium" : "bg-white"} ${
        ocultarBarra ? "sticky w-full" : "w-full"
      } md:h-[96px] h-[64px] flex justify-between items-center md:pr-10 pr-[16px] z-30`}
    >
      <div className="flex items-center h-full">
        <div
          className={`${
            dark && "border-kb-black-light"
          } md:flex hidden pl-[34px] items-center border-r-[1px] md:w-[300px] h-full`}
        >
          {dark ? (
            <Image src={logo_dark} alt="logo_dark" width={180} />
          ) : (
            <Image src={logo} alt="logo" width={180} />
          )}
        </div>

        <div
          className={`md:hidden flex pl-[16px] items-center md:w-[300px] h-full`}
        >
          <Image src={logo_mob} alt="logo_mob" width={25} />
        </div>
        <p
          onClick={() => setMenuMob(!menuMob)}
          className={`${
            dark && "text-white"
          } text-kb-black md:flex flex items-center gap-x-2 md:pointer-events-none cursor-pointer font-bold text-[24px] ml-[24px]`}
        >
          {datosTabla.nombre}
          {!menuMob ? (
            <Image className="md:hidden" src={arrowDown} alt="arrowDown" />
          ) : (
            <Image className="md:hidden" src={arrowUp} alt="arrowUp" />
          )}
        </p>
      </div>
      <div className="flex items-center md:gap-x-7 gap-x-5">
        {columnas.length === 0 ? (
          <button
            className={`${
              dark && "bg-kb-morado/25 text-white/25"
            } font-bold text-[15px] text-white pointer-events-none bg-kb-morado-light md:px-6 md:py-3 rounded-full px-[20px] py-[10px]`}
          >
            <p className="md:flex hidden">+ Agregar Tarea</p>
            <p className="md:hidden flex">
              <svg
                className="rotate-45"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#fff" fillRule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </p>
          </button>
        ) : (
          <Link
            href={"/tarea"}
            scroll={false}
            className="font-bold text-[15px] text-white bg-kb-morado md:px-6 md:py-3 rounded-full hover:bg-kb-morado-light transition-all px-[20px] py-[10px]"
          >
            <p className="md:flex hidden">+ Agregar Tarea</p>
            <p className="md:hidden flex">
              <svg
                className="rotate-45"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#fff" fillRule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </p>
          </Link>
        )}
        <div className="relative">
          <Image
            onClick={() => setMenuOpen(!menuOpen)}
            className={`${
              idActual === 0 ? "pointer-events-none" : "cursor-pointer"
            }`}
            src={dots}
            alt="dots"
          />
          {menuOpen ? (
            <div
              className={`${
                dark ? "bg-kb-black-semi" : "bg-white"
              } z-30 absolute flex flex-col justify-center w-[192px] h-[92px] transition-all shadow right-0 top-12 rounded-md  font-bold text-[13px]`}
            >
              <Link
                href={"/tabla/actualizar"}
                onClick={() => setMenuOpen(false)}
                className="text-kb-gray cursor-pointer w-full h-full flex items-center pl-[16px] hover:bg-kb-gray/5 transition-all"
              >
                Editar Tabla
              </Link>
              <Link
                href={"?modal=true"}
                onClick={() => setMenuOpen(false)}
                className="text-kb-red cursor-pointer w-full h-full flex items-center pl-[16px] hover:bg-kb-gray/5 transition-all"
              >
                Borrar Tabla
              </Link>
            </div>
          ) : (
            <div
              className={`${
                dark ? "bg-kb-black-semi" : "bg-white"
              } z-30 absolute font-bold flex flex-col justify-center w-[192px] transition-all h-[0px] shadow right-0 top-12 rounded-md  text-[13px]`}
            >
              <Link
                href={"/tabla/actualizar"}
                onClick={() => setMenuOpen(false)}
                className="text-kb-gray cursor-pointer w-full h-full hidden items-center pl-[16px] hover:bg-kb-gray/5 transition-all"
              >
                Editar Tabla
              </Link>
              <Link
                href={"?modal=true"}
                onClick={() => setMenuOpen(false)}
                className="text-kb-red cursor-pointer w-full h-full hidden items-center pl-[16px] hover:bg-kb-gray/5 transition-all"
              >
                Borrar Tabla
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
