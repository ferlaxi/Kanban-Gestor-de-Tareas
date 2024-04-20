import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";


export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "email@correo.com",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "****",
          },
        },
        async authorize(credentials: any, req): Promise<any> {
          const data = credentials;
  
          const usuarioEncontrado = await prisma.user.findUnique({
            where: {
              email: data.email,
            },
          });
  
          if (!usuarioEncontrado) throw new Error("Credenciales Invalidas");
  
          const passwordValido = await bcrypt.compare(
            data.password,
            usuarioEncontrado.password
          );
          if (!passwordValido) throw new Error("Credenciales Invalidas");
  
          return {
            id: usuarioEncontrado.id,
            email: usuarioEncontrado.email,
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token, user }) {
        if (token) {
          session.id = token.id;
        }
        return session;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  };