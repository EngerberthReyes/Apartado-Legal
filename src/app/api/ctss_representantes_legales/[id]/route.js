import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async (request, { params: { id } }) => {

  console.log(id)
  
  const resultado = await conexion.query(`SELECT r.id_representante_legal, r.firma_representante_legal, concat(p.nombre, ' ', p.apellido) as nombre, te.categoria_empresa, e.razon_social FROM ctss_representantes_legales r JOIN ctss_personas p ON r.id_persona = p.id_persona JOIN ctss_empresas e ON r.id_empresa = e.id_empresa JOIN ctss_tipos_de_empresas as te ON e.id_tipo_empresa = te.id_tipo_empresa JOIN ctss_tipos_personas tp ON p.id_tipo_persona = tp.id_tipo_persona WHERE tp.tipo_persona = "Jurídica" AND e.razon_social = ?`, [id]);

  return NextResponse.json( resultado );

};