import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  
  const resultado = await conexion.query('select * from representantes_legales_contratos_servicios;');

  return NextResponse.json( resultado );

};