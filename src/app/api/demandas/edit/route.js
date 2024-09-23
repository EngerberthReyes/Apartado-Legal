import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async (request { params }) => {
  
  const resultado = await conexion.query('select * from contratos where id = ?;', {params.id});

  return NextResponse.json({ message: resultado });

};

export const POST = async (request) => {

 const contratos = await request.json();

 let totalAffectedRows = 0;

 for (let contrato of contratos) {

    const resultadosIngresados = await conexion.query("INSERT INTO contratos SET ?", {

      id_contrato: null,

      nombre_de_contrato: contratos

    });

    totalAffectedRows += resultadosIngresados.insertId;
 }

 return NextResponse.json(` Id_Contrato ${id_contrato}, Nombre de Contrato: ${nombre_de_contrato}. Celdas Afectadas: ${totalAffectedRows}`);

};