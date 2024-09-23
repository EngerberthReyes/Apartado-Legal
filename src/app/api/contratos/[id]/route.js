import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async (request, { params: { id } }) => {
  
  const resultado = await conexion.query('select * from contratos where id_contrato = ?;', Number(id));

  return NextResponse.json( resultado );

};

export const PUT = async (request, { params: { id } }) => {

  console.log(await request.json)
  
/*const resultado = await conexion.query('UPDATE contratos SET servicio_contratado = ?, tipo_de_servicio = ?, fecha_de_inicio = ?, fecha_de_fin = ?, firma_paquetes_turisticos = ?, firma_representante_servicio = ? WHERE id_contrato = ?', ({servicio_contratado, tipo_de_servicio, fecha_de_inicio, fecha_de_fin, firma_paquetes_turisticos, firma_representante_servicio, id_contrato}); */

  return NextResponse.json( resultado );

};

export const DELETE = async (request, { params: { id } }) => {
  
  const resultado = await conexion.query('DELETE FROM contratos where id_contrato = ?;', Number(id));

  return NextResponse.json( resultado );

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