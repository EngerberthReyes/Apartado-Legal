import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  
  const resultado = await conexion.query('SELECT p.nombre, p.apellido FROM ctss_representantes_legales AS re JOIN ctss_personas AS p ON p.id_persona = re.id_representante_legal JOIN ctss_empresas AS e ON e.id_empresa = re.id_empresa WHERE e.id_tipo_empresa = 1;');

  return NextResponse.json( resultado );

};