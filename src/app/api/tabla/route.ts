import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

  const session = await getServerSession(authOptions)

  const tablaNueva = await prisma.tabla.create({
    data: {
      nombre: nombre,
      user:{
        connect: {
          id: parseInt(session?.id)
        }
      }
    },
  });
  return NextResponse.json(tablaNueva);
}
