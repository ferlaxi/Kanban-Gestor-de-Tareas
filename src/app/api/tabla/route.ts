import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tablas = await prisma.tabla.findMany();
    return NextResponse.json(tablas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  const { nombre } = await request.json();

  const tablaNueva = await prisma.tabla.create({
    data: {
      nombre: nombre,
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });
  return NextResponse.json(tablaNueva);
}
