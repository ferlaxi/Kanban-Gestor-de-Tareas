import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const tabla = await prisma.tabla.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!tabla) {
      return NextResponse.json({ message: "No existe Tabla" }, { status: 500 });
    }

    return NextResponse.json(tabla);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const tablaBorrada = await prisma.tabla.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(tablaBorrada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { nombre } = await request.json();
  try {
    const tablaActualizada = await prisma.tabla.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nombre,
      },
    });
    return NextResponse.json(tablaActualizada);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
