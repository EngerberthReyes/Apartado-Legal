import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  
  const resultado = await conexion.query('select * from contratos;');

  return NextResponse.json( resultado );

};

export const POST = async (request) => {
 const { id_contrato,
servicio_contratado,
tipo_de_servicio,
fecha_de_inicio,
fecha_de_fin,
firma_paquetes_turisticos,
firma_representante_servicio } = await request.json();
 let totalAffectedRows = 0;
 
    const resultadosIngresados = await conexion.query("INSERT INTO contratos SET ?", {
id_contrato,
servicio_contratado,
tipo_de_servicio,
fecha_de_inicio,
fecha_de_fin,
firma_paquetes_turisticos,
firma_representante_servicio

    });

    totalAffectedRows += resultadosIngresados.affectedRows;

 return NextResponse.json({ id_contrato: id_contrato, nombre_de_contrato: nombre_de_contrato, totalAffectedRows: totalAffectedRows });
};
