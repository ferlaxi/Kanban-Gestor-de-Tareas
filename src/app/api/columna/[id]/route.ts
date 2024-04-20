import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function POST(request: Request) {
  try {
    const { datos } = await request.json();
    const columnasCreadas = await prisma.columna.createMany({
      data: datos,
    });
    return NextResponse.json(columnasCreadas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const columnasEncontradas = await prisma.columna.findMany({
      where: {
        tablaId: Number(params.id),
      },
    });
    return NextResponse.json(columnasEncontradas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();
    const colActualizadas = data.map(async (dato: any) => {
      await prisma.columna.updateMany({
        where: {
          id: dato.id,
          tablaId: dato.tablaId,
        },
        data: {
          nombre: dato.nombre,
        },
      });
    });
    return NextResponse.json(colActualizadas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const columnaEliminada = await prisma.columna.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(columnaEliminada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
