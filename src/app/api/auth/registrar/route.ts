import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const usuarioExiste = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExiste) {
      return NextResponse.json(
        { message: "Usuario ya existente" },
        { status: 500 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
