import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";

export const GET = async () => {
  try {
const consulta = `
SELECT
    cd.id_incidente,
    c.id_contrato,
    e.razon_social,
    tc.tipo_contrato, 
    cd.fecha_emision,
    te.categoria_empresa,
    tc.id_tipo_contrato,
    ct.descripcion_incidente,
    ct.fecha_incidente
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
JOIN
    ctss_incidentes as ct ON ct.id_contrato = c.id_contrato
JOIN
    ctss_demandas as cd ON cd.id_incidente = ct.id_incidente;
`;

const resultado = await conexion.query(consulta);

return NextResponse.json(resultado);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Error al obtener los datos de la base de datos.");
  }
};
export const POST = async (request) => {
    try {
                const antiInyeccioneSql = (valor) => {
 return valor.replace(/[<>;():{}'"`=]/g, '').replace(/[\W]+/g, ' ');
}

        const requestBody = await request.json();

        const queryEmpresa = `
SELECT 
    c.id_contrato,
    e.razon_social
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
WHERE
    e.razon_social = ?;
`;
        const resultEmpresa = await conexion.query(queryEmpresa, [requestBody.tipo_empresa]);
        let contratoResultante = resultEmpresa;
        console.log(contratoResultante)

        // Ahora que tenemos el ID, podemos proceder a insertar en la tabla ctss_contratos
        const queryInsercionIncidentes = `
            INSERT INTO ctss_incidentes
            (id_incidente, id_contrato, descripcion_incidente, fecha_incidente)   
            VALUES (?, ?, ?, ?);
        `;

        const insercionIncidentes = await conexion.query(queryInsercionIncidentes, [
            requestBody.id_incidente,
            contratoResultante[0].id_contrato,
            antiInyeccioneSql(requestBody.descripcion_incidente),
            requestBody.fecha_incidente
        ]);
const queryIncidente = `
    SELECT 
        ci.id_incidente
    FROM 
        ctss_incidentes as ci
    RIGHT JOIN
        ctss_contratos as c ON ci.id_contrato = c.id_contrato
    WHERE
        ci.id_contrato = ?
    ORDER BY
        ci.id_incidente DESC
    LIMIT 1;
`;

const incidenteContrato = await conexion.query(queryIncidente, [contratoResultante[0].id_contrato]);

if (incidenteContrato.length > 0) {
    const { id_incidente } = incidenteContrato[0];
    
        const queryDemandas = `
            INSERT INTO ctss_demandas
            (id_demanda, id_incidente, fecha_emision)   
            VALUES (?, ?, ?);
        `;

                const insercionDemanda = await conexion.query(queryDemandas, [
            null,
            id_incidente,
            requestBody.fecha_emision
        ]);
} else {
   null
}
        



        //  6. Obtener el número de filas afectadas
        const totalAffectedRows = resultInsertContratos.affectedRows;

        return NextResponse.json(resultInsertContratos);
    } catch (error) {
        console.error('Error al insertar datos en la base de datos:', error);
        return NextResponse.error(error.message);
    }
};
