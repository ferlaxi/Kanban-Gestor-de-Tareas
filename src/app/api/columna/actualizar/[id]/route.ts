import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const columnaEncontrada = await prisma.columna.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(columnaEncontrada);
}
