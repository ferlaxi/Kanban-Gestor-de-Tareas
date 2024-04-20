import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const tareaEncontrada = await prisma.tarea.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(tareaEncontrada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();
    const tareaActualizada = await prisma.tarea.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        columnaId: data.columnaId,
      },
    });
    return NextResponse.json(tareaActualizada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const tareaBorrada = await prisma.tarea.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(tareaBorrada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
