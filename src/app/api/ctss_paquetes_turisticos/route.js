import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  
  const resultado = await conexion.query('select costo from ctss_paquetes_turisticos as pt, ctss_tipos_servicios as ts where pt.id_paquete_turistico = ts.id_paquete_turistico');

  return NextResponse.json( resultado );

};


export const POST = async (request) => {
  
  const resultado = await conexion.query('select capacidad from ctss_paquetes_turisticos as pt, ctss_tipos_servicios as ts where pt.id_paquete_turistico = as ts.id_paquete_turistico');

  return NextResponse.json( resultado );

};