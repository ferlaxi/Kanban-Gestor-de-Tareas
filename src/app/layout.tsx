import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import KanbanProvider from "@/context/kanbanContext";
import Modal from "@/components/Modal";
import ModalTarea from "@/components/ModalTarea";
import { Suspense } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "500"],
});

export const metadata: Metadata = {
  title: "Kanban - Gestor de Tareas",
  description: "Generated by create next app",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
  modal,
  modalTarea,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  modalTarea: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakartaSans.className} bg-kb-gray-light`}>
        <Suspense>
          <KanbanProvider>
            {children}
            {modal}
            {modalTarea}
            <Modal />
            <ModalTarea />
          </KanbanProvider>
        </Suspense>
      </body>
    </html>
  );
}
