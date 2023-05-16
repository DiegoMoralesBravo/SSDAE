-- CreateTable
CREATE TABLE "alumnos" (
    "id_alumno" SERIAL NOT NULL,
    "estatus" VARCHAR NOT NULL,
    "ano_ingreso" SERIAL NOT NULL,
    "ciclo" VARCHAR NOT NULL,

    CONSTRAINT "alumnos_pkey" PRIMARY KEY ("id_alumno")
);

-- CreateTable
CREATE TABLE "profesores" (
    "id_profesor" SERIAL NOT NULL,
    "interno_externo" VARCHAR NOT NULL,

    CONSTRAINT "profesores_pkey" PRIMARY KEY ("id_profesor")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "correo" VARCHAR NOT NULL,
    "contrasena" VARCHAR NOT NULL,
    "tipo_usuario" VARCHAR NOT NULL,
    "nombre" VARCHAR NOT NULL,
    "ap_p" VARCHAR NOT NULL,
    "ap_m" VARCHAR NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "recuperaciones" (
    "id_recuperacion" SERIAL NOT NULL,
    "correo" VARCHAR,
    "token" VARCHAR NOT NULL,
    "fecha_expiracion" DATE NOT NULL,

    CONSTRAINT "recuperaciones_pkey" PRIMARY KEY ("id_recuperacion")
);

-- CreateTable
CREATE TABLE "tesis" (
    "id_tesis" SERIAL NOT NULL,
    "tema" VARCHAR NOT NULL,
    "id_alumno" SERIAL NOT NULL,
    "descripcion" VARCHAR NOT NULL,

    CONSTRAINT "tesis_pkey" PRIMARY KEY ("id_tesis")
);

-- CreateTable
CREATE TABLE "prof_tesis" (
    "id_profesor" SERIAL NOT NULL,
    "id_tesis" SERIAL NOT NULL,
    "rol" VARCHAR NOT NULL,

    CONSTRAINT "prof_tesis_primarykey" PRIMARY KEY ("id_profesor","id_tesis")
);

-- CreateTable
CREATE TABLE "avancescontrol" (
    "ano_ingreso" SERIAL NOT NULL,
    "ciclo" VARCHAR NOT NULL,
    "estatus" VARCHAR NOT NULL,

    CONSTRAINT "avances_primarykey" PRIMARY KEY ("ano_ingreso","ciclo")
);

-- CreateTable
CREATE TABLE "avances" (
    "id_avance" SERIAL NOT NULL,
    "numero_avance" SERIAL NOT NULL,
    "id_tesis" SERIAL NOT NULL,
    "doc" VARCHAR NOT NULL,
    "revisado" VARCHAR NOT NULL,

    CONSTRAINT "avances_pkey" PRIMARY KEY ("id_avance")
);

-- CreateTable
CREATE TABLE "evaluacion" (
    "id_evaluacion" SERIAL NOT NULL,
    "id_profesor" SERIAL NOT NULL,
    "id_avance" SERIAL NOT NULL,
    "numero_avance" SERIAL NOT NULL,
    "id_tesis" SERIAL NOT NULL,
    "campo1" INTEGER NOT NULL,
    "campo2" INTEGER NOT NULL,
    "campo3" INTEGER NOT NULL,
    "campo4" INTEGER NOT NULL,
    "campo5" INTEGER NOT NULL,
    "campo6" INTEGER NOT NULL,
    "campo7" INTEGER NOT NULL,
    "doc" VARCHAR,

    CONSTRAINT "evaluacion_pkey" PRIMARY KEY ("id_evaluacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- AddForeignKey
ALTER TABLE "alumnos" ADD CONSTRAINT "alumnos_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesores" ADD CONSTRAINT "profesores_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recuperaciones" ADD CONSTRAINT "recuperaciones_correo_fkey" FOREIGN KEY ("correo") REFERENCES "usuarios"("correo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tesis" ADD CONSTRAINT "tesis_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumnos"("id_alumno") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prof_tesis" ADD CONSTRAINT "prof_tesis_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "profesores"("id_profesor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prof_tesis" ADD CONSTRAINT "prof_tesis_id_tesis_fkey" FOREIGN KEY ("id_tesis") REFERENCES "tesis"("id_tesis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avances" ADD CONSTRAINT "avances_id_tesis_fkey" FOREIGN KEY ("id_tesis") REFERENCES "tesis"("id_tesis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_id_avance_fkey" FOREIGN KEY ("id_avance") REFERENCES "avances"("id_avance") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluacion" ADD CONSTRAINT "evaluacion_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "profesores"("id_profesor") ON DELETE CASCADE ON UPDATE CASCADE;
