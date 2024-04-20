-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tabla" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tabla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Columna" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "color" INTEGER NOT NULL,
    "tablaId" INTEGER NOT NULL,

    CONSTRAINT "Columna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "columnaId" INTEGER NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtarea" (
    "ind" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "finalizada" BOOLEAN,
    "tareaId" INTEGER NOT NULL,

    CONSTRAINT "Subtarea_pkey" PRIMARY KEY ("ind")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tabla" ADD CONSTRAINT "Tabla_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Columna" ADD CONSTRAINT "Columna_tablaId_fkey" FOREIGN KEY ("tablaId") REFERENCES "Tabla"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_columnaId_fkey" FOREIGN KEY ("columnaId") REFERENCES "Columna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtarea" ADD CONSTRAINT "Subtarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
