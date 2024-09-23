import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async (request, { params: { id_demanda } }) => {

  
const consulta = `
SELECT 
    c.id_contrato,
    e.razon_social,
    tc.tipo_contrato, 
    pt.fecha_inicio,
    pt.fecha_fin,
    ct.descripcion_incidente,
    ct.fecha_incidente,
    cd.fecha_emision,
    te.categoria_empresa,
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
    ctss_incidentes as ct on ct.id_contrato = c.id_contrato
LEFT JOIN
    ctss_demandas as cd on ct.id_incidente = cd.id_incidente
WHERE
    ct.id_incidente = ?;
`;

const resultado = await conexion.query(consulta, [Number(id_demanda)]);

console.log(resultado);

return NextResponse.json(resultado);
};

export const PUT = async (request, { params: { id } }) => {
  try {
    
                const antiInyeccioneSql = (valor) => {
 return valor.replace(/[<>;():{}'"`=]/g, '').replace(/[\W]+/g, ' ');
}

    const {
    descripcion_incidente: descripcion_incidente,
    fecha_incidente: fecha_incidente
} = await request.json();

    // Realizar la actualización con JOIN
    const resultado = await conexion.query(
      `UPDATE ctss_demandas AS cd
       JOIN ctss_incidentes AS ci ON ci.id_incidente = cd.id_incidente
       JOIN ctss_contratos AS c ON c.id_contrato = ci.id_contrato
       SET
           ci.descripcion_incidente = ?,
           ci.fecha_incidente = ?
       WHERE ci.id_contrato = ?`,
      [antiInyeccioneSql(descripcion_incidente), antiInyeccioneSql(fecha_incidente), Number(id)]
    );

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Error al actualizar la empresa.");
  }
};




export const DELETE = async (request, { params: { id } }) => {
    let arrayId = [id]
  try {
const resultadoId = await conexion.query(
    `SELECT ct.id_incidente
    FROM 
        ctss_contratos AS c
    LEFT JOIN 
        ctss_tipos_contratos tc ON c.id_tipo_contrato = tc.id_tipo_contrato
    LEFT JOIN 
        ctss_empresas e ON c.id_empresa = e.id_empresa
    LEFT JOIN
        ctss_paquetes_turisticos pt ON pt.id_paquete_turistico = c.id_paquete_turistico
    LEFT JOIN
        ctss_tipos_de_empresas te ON te.id_tipo_empresa = e.id_tipo_empresa
    LEFT JOIN
        ctss_incidentes as ct ON ct.id_contrato = c.id_contrato
    JOIN
        ctss_demandas as cd ON cd.id_incidente = ct.id_incidente
    WHERE ct.id_contrato = ?;
    `,
    [Number(arrayId[0])]
);

const [{ id_incidente }] = resultadoId;

const resultado = await conexion.query(
    `DELETE ct, cd
    FROM 
        ctss_contratos AS c
    LEFT JOIN 
        ctss_tipos_contratos tc ON c.id_tipo_contrato = tc.id_tipo_contrato
    LEFT JOIN 
        ctss_empresas e ON c.id_empresa = e.id_empresa
    LEFT JOIN
        ctss_paquetes_turisticos pt ON pt.id_paquete_turistico = c.id_paquete_turistico
    LEFT JOIN
        ctss_tipos_de_empresas te ON te.id_tipo_empresa = e.id_tipo_empresa
    LEFT JOIN
        ctss_incidentes as ct ON ct.id_contrato = c.id_contrato
    JOIN
        ctss_demandas as cd ON cd.id_incidente = ct.id_incidente
    WHERE cd.id_incidente = ?;
    `,
    [Number(id_incidente)]
);

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Error al eliminar la empresa.");
  }
};

/*
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
*/