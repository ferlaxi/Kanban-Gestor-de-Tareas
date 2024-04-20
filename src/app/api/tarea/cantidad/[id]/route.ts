import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const tareasEncontradas = await prisma.tarea.findMany({
      where: {
        columnaId: Number(params.id),
      },
    });
    return NextResponse.json(tareasEncontradas);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
