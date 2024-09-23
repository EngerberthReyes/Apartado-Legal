import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";
import { writeFile } from "fs/promises";
import path from "path";

export const GET = async () => {
  try {
const consulta = `
SELECT 
    c.id_contrato,
    e.razon_social,
    tc.tipo_contrato, 
    pt.fecha_inicio,
    pt.fecha_fin,
    te.categoria_empresa,
    rl.id_representante_legal,
    ct.id_incidente,
    concat(p.nombre, ' ', p.apellido) as nombre,
    rl.firma_representante_legal,
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
    ctss_incidentes as ct on c.id_contrato = ct.id_contrato
WHERE
    tc.id_tipo_contrato <= 6;
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
 return valor.replace(/[<>;():{}'"=]/g, '').replace(/[\W]+/g, ' ');
}

        const requestBody = await request.json();

        console.log(requestBody)

        let { tipo_empresa, id_metodo_pago, tipo_contrato } = requestBody;

        tipo_empresa = antiInyeccioneSql(tipo_empresa);

        const queryEmpresa = `
            SELECT  
                id_empresa
            FROM  
                ctss_empresas
            WHERE razon_social = ?;
        `;
        const resultEmpresa = await conexion.query(queryEmpresa, [requestBody.tipo_empresa]);
        let id_empresa = resultEmpresa[0].id_empresa;

        const queryMetodoPago = `
            SELECT  
                id_metodo_pago
            FROM  
                ctss_metodos_pagos
            WHERE tipo_pago = ?;
        `;
        const resultMetodoPago = await conexion.query(queryMetodoPago, [id_metodo_pago]);
        id_metodo_pago = resultMetodoPago[0].id_metodo_pago;
        let id_tipo_contrato;

        if (tipo_contrato) {
            const busquedaServicio = await conexion.query(
                'SELECT tser.id_tipo_contrato FROM ctss_tipos_contratos AS tser WHERE tser.tipo_contrato = ?',
                [
                    tipo_contrato,
                ]
            );
        
            if (busquedaServicio.length >  0) {
                id_tipo_contrato = busquedaServicio[0].id_tipo_contrato;
                console.log('ID del tipo de servicio encontrado:', id_tipo_contrato);
            } else {
                console.log('No se encontró ningún tipo de servicio para el contrato proporcionado.');
            }
        } else {
            console.log('No se proporcionó ningún tipo de contrato en el requestBody.');
        }

        const paquetesTuristicosId = await conexion.query(
            'select pt.id_paquete_turistico from ctss_paquetes_turisticos as pt join ctss_contratos as c on pt.id_paquete_turistico = c.id_paquete_turistico join ctss_tipos_contratos as tc on tc.id_tipo_contrato = c.id_tipo_contrato WHERE tc.id_tipo_contrato = ?;',
            [
                tipo_contrato
            ]
        );

        let id_paquete_turistico;

        const queryInsertPaquetesTuristicos = await conexion.query(
            'INSERT INTO ctss_paquetes_turisticos (id_paquete_turistico, cantidad_persona, costo, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?);',
            [
                id_paquete_turistico,
                Number(requestBody.cantidad_persona),
                Number(requestBody.costo),
                requestBody.fecha_inicio,
                requestBody.fecha_fin
            ]
        );


        // Obtén el ID del paquete turístico insertado
        id_paquete_turistico = queryInsertPaquetesTuristicos.insertId;

        const queryRepresentanteLegal = `
            SELECT r.id_representante_legal, r.firma_representante_legal, te.categoria_empresa, e.razon_social
            FROM ctss_representantes_legales r
            JOIN ctss_personas p ON r.id_persona = p.id_persona
            JOIN ctss_empresas e ON r.id_empresa = e.id_empresa
            JOIN ctss_tipos_de_empresas as te ON e.id_tipo_empresa = te.id_tipo_empresa
            JOIN ctss_tipos_personas tp ON p.id_tipo_persona = tp.id_tipo_persona
            WHERE tp.tipo_persona = 'Jurídica' AND te.categoria_empresa = ?;
        `;
        if (tipo_contrato === "Restaurante (Alimentacion)") {

            tipo_contrato = "Alimentación"

        }
        console.log(tipo_contrato)
        const representanteLegal = await conexion.query(queryRepresentanteLegal, [tipo_contrato]);
        let id_representante_legal = representanteLegal[0].id_representante_legal;

        const queryCurdate = await conexion.query("SELECT curdate();");

        let fecha_firma_contrato = queryCurdate[0]["curdate()"];

        // Ahora que tenemos el ID, podemos proceder a insertar en la tabla ctss_contratos
        const queryInsertContratos = `
            INSERT INTO ctss_contratos
            (id_contrato, id_empresa, id_paquete_turistico, id_representante_legal, id_metodo_pago, firma_paquete_turistico, fecha_firma_contrato, id_tipo_contrato)   
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const resultInsertContratos = await conexion.query(queryInsertContratos, [
            requestBody.id_contrato,
            id_empresa,
            id_paquete_turistico,
            id_representante_legal,
            id_metodo_pago,
            requestBody.firma_paquete_turistico,
            fecha_firma_contrato,
            id_tipo_contrato
        ]);

        //  6. Obtener el número de filas afectadas
        const totalAffectedRows = resultInsertContratos.affectedRows;

        return NextResponse.json(resultInsertContratos);
    } catch (error) {
        console.error('Error al insertar datos en la base de datos:', error);
        return NextResponse.error(error.message);
    }
};
