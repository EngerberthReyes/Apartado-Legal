import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {

  
const consulta = `
  SELECT 
    c.id_contrato,
    e.razon_social,
    tc.tipo_contrato, 
    pt.fecha_inicio,
    pt.fecha_fin,
    te.categoria_empresa,
    rl.id_representante_legal,
    rl.firma_representante_legal,
    concat(p.nombre, ' ', p.apellido) as nombre,
    pt.cantidad_persona,
    mp.tipo_pago,
    pt.costo,
    c.firma_paquete_turistico,
    tc.id_tipo_contrato
FROM 
    ctss_contratos c
LEFT JOIN 
    ctss_tipos_contratos tc ON c.id_tipo_contrato = tc.id_tipo_contrato
LEFT JOIN 
    ctss_empresas e ON c.id_empresa = e.id_empresa
LEFT JOIN
    ctss_paquetes_turisticos pt ON pt.id_paquete_turistico = c.id_paquete_turistico
LEFT JOIN
    ctss_tipos_de_empresas te ON te.id_tipo_empresa = e.id_tipo_empresa
LEFT JOIN
    ctss_representantes_legales rl ON rl.id_empresa = e.id_empresa
LEFT JOIN
    ctss_personas p ON rl.id_persona = p.id_persona
LEFT JOIN
    ctss_metodos_pagos mp ON mp.id_metodo_pago = c.id_metodo_pago
`;

const resultado = await conexion.query(consulta);

console.log(resultado);

return NextResponse.json(resultado);
};

export const PUT = async (request, { params: { id } }) => {
  try {
    // Obtener el nuevo nombre de la empresa del cuerpo de la solicitud
    const {
    cantidad_persona: cantidad_persona,
    id_metodo_pago: id_metodo_pago,
    costo: costo,
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin
} = await request.json();

    
                const antiInyeccioneSql = (valor) => {
 return valor.replace(/[<>;():{}'"`=]/g, '').replace(/[\W]+/g, ' ');
}

    const resultado = await conexion.query(
      `UPDATE ctss_contratos AS c
       JOIN ctss_empresas AS e ON e.id_empresa = c.id_empresa
       JOIN ctss_paquetes_turisticos AS pt ON c.id_paquete_turistico = pt.id_paquete_turistico
       SET
           pt.cantidad_persona = ?,
           c.id_metodo_pago = ?,
           pt.costo = ?,
           pt.fecha_inicio = ?,
           pt.fecha_fin = ?
       WHERE c.id_contrato = ?`,
      [Number(cantidad_persona), Number(id_metodo_pago), Number(costo), fecha_inicio, fecha_fin, Number(id)]
    );

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Error al actualizar la empresa.");
  }
};




export const DELETE = async (request, { params: { id } }) => {
  try {
    const resultado = await conexion.query(
      `DELETE c, pt
FROM ctss_contratos AS c
JOIN ctss_paquetes_turisticos AS pt ON c.id_paquete_turistico = pt.id_paquete_turistico
WHERE c.id_contrato = ?;
`,
      [Number(id)]
    );
console.log(id)
    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Error al eliminar la empresa.");
  }
};