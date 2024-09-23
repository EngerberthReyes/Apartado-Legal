import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async ({ params: { idHospedaje } }) => {

  const resultado = await conexion.query('select razon_social from ctss_empresas as e join ctss_tipos_de_empresas as te on te.id_tipo_empresa = e.id_tipo_empresa where te.id_tipo_empresa = ?;', [Number(idHospedaje)]);

  return NextResponse.json(resultado);
};
