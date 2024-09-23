import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async (request, { params: { id } }) => {
  
  const resultado = await conexion.query('select * from ctss_empresas where id_empresa = ?;', Number(id));

  return NextResponse.json( resultado );

};

export const PUT = async (request, { params: { id } }) => {

  let { servicio_contratado: nombre_servicio } = await request.json();

  console.log(nombre_servicio, id)

const resultado = await conexion.query(
  'UPDATE ctss_contratos SET servicio_contratado = ? WHERE id_contrato = ?',
  [nombre_servicio, Number(id)]
);
  return NextResponse.json( resultado );

};

export const DELETE = async (request, { params: { id } }) => {
  
  const resultado = await conexion.query('DELETE FROM ctss_empresas where id_empresa = ?;', Number(id));

  return NextResponse.json( resultado );

};


export const POST = async (request) => {

 const contratos = await request.json();

 let totalAffectedRows = 0;

 for (let contrato of contratos) {

    const resultadosIngresados = await conexion.query("INSERT INTO ctss_contratos SET ?", {

      id_contrato: null,

      nombre_de_contrato: contratos

    });

    totalAffectedRows += resultadosIngresados.insertId;
 }

 return NextResponse.json(` Id_Contrato ${id_contrato}, Nombre de Contrato: ${nombre_de_contrato}. Celdas Afectadas: ${totalAffectedRows}`);

};