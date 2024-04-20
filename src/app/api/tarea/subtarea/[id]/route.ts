import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const subtareasEncontradas = await prisma.subtarea.findMany({
      where: {
        tareaId: Number(params.id),
      },
    });
    return NextResponse.json(subtareasEncontradas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const subtareaEliminada = await prisma.subtarea.delete({
      where: {
        ind: Number(params.id),
      },
    });
    return NextResponse.json(subtareaEliminada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();
    const subtareaFinalizada = await prisma.subtarea.update({
      where: {
        ind: Number(params.id),
      },
      data: {
        finalizada: data.estadoFinal,
      },
    });
    return NextResponse.json(subtareaFinalizada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
