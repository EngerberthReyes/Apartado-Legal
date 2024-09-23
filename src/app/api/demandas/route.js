import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  
  const resultado = await conexion.query('select * from demandas;');

  return NextResponse.json( resultado );

};

export const POST = async (request) => {
 const { id_demanda, servicio_demandado, fecha_de_emision } = await request.json();
 let totalAffectedRows = 0;
 
    const resultadosIngresados = await conexion.query("INSERT INTO demandas SET ?", {
    id_demanda,
    servicio_demandado,
    fecha_de_emision
    });

    totalAffectedRows += resultadosIngresados.affectedRows;

 return NextResponse.json({ id_demanda, servicio_demandado, fecha_de_emision, totalAffectedRows: totalAffectedRows });
};
