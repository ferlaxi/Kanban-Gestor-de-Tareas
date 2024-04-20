import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { datos } = await request.json();
    const subtareasCreadas = datos.map(async (dato: any) => {
      await prisma.subtarea.createMany({
        data: {
          tareaId: dato.tareaId,
          finalizada: dato.finalizada,
          titulo: dato.titulo,
        },
      });
    });
    return NextResponse.json(subtareasCreadas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request) {
  try {
    const datos = await request.json();
    const subtareasActualizadas = datos.map(async (dato: any) => {
      await prisma.subtarea.updateMany({
        where: {
          ind: dato.ind,
        },
        data: {
          titulo: dato.titulo,
          finalizada: dato.finalizada,
        },
      });
    });
    return NextResponse.json(subtareasActualizadas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
