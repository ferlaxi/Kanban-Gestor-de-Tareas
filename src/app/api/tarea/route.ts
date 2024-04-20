import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tareaNueva = await prisma.tarea.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        columnaId: data.columnaId,
      },
    });
    return NextResponse.json(tareaNueva);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

