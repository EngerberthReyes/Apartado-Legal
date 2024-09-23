import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  
  const resultado = await conexion.query('select * from ctss_tipos_seguros;');

  return NextResponse.json( resultado );

};