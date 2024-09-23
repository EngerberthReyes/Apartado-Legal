import styles from "../../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

const ContratoServivioPlantilla = ({ servicios, especialActivo, handleClick }) => {

const [razones_sociales, setRazonesSociales] = useState();

useEffect(() => {
  const tipoDeContrato = servicios.map(dataGet => dataGet.id_tipo_contrato);
  setRazonesSociales(tipoDeContrato[0]);
}, [servicios]);

const imprimirContratoServicio = () => {
  const contenidoAImprimir = document.getElementById('imprimirContratoServicio').innerHTML;
  const ventanaImpresion = window.open('', '_blank');
  ventanaImpresion.document.write(`
    <html>
      <head>
        <title>Imprimir Demanda de Servicios / Seguros</title>
<style>
 @media print {
    @page {
      size: Oficio;
      margin: 1rem;
    }
    body {
      font-family: "Proxima Nova", sans-serif;
      margin: 0;
      padding: 0;
      height: 100%;
    }
 }
 body {
  font-family: "Proxima Nova", sans-serif;
 }
</style>
      </head>
      <body>
        ${contenidoAImprimir}
      </body>
    </html>
  `);
  ventanaImpresion.document.close();
  ventanaImpresion.print();
};


  return (
    <>
    <section
      className={`contratoServicio ${stylesContrato.contenedorInformacion} ${
        especialActivo ? "" : stylesContrato.desaparecerContenedor
      }`}
      id="imprimirContratoServicio"
    >
      <section className={stylesContrato.contenedorTitulo}>
      {servicios.map((datosGet, index) => (
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Demanda Dirigida Hacia {datosGet.razon_social}
            </h1>
            ))}
          </section>

          <section className={stylesContrato.sectionParteUno}>
            {servicios.map((datosGet, index) => (

            <p className={stylesContrato.p}>
              Empresa de Servicio Demandada: {datosGet.categoria_empresa}

            </p>
            ))}
            <p className={stylesContrato.p}>
              Empresa Demandante: Paquetes Turísticos
            </p>
          </section>
          <section>
              <h1 className={stylesContrato.tituloHeader}>
                Razón de la Demanda:
              </h1>
              <p className={stylesContrato.p}>
                Incumplimiento del Contrato.
              </p>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Motivo Por el Cual la Demanda se Realizo:
              </h1>
                {servicios.map((datosGet, index) => (
               <p
                className={stylesContrato.p}
   style={{ fontSize: "30px" }}>
   {datosGet.descripcion_incidente}
              </p>
              ))}
            </section>
                    <section className={stylesContrato.sectionParteUno}>
      <h1 className={stylesContrato.tituloHeader}>
        Fecha en el Cual Ocurrio el Incidente:
      </h1>
      {servicios.map((datosGet, index) => (
               <p
                className={stylesContrato.p}
   style={{ fontSize: "30px" }}>
   {datosGet.fecha_incidente.split("T")[0]}
              </p>
      ))}
    </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Fecha de Emision de la Demanda:
              </h1>
              {servicios.map((datosGet, index) => (
              <p
                className={stylesContrato.p}
   style={{ fontSize: "30px" }}>
   {datosGet.fecha_emision.split("T")[0]}
              </p>
               ))}
            </section>
            </section>
    </section>
              <section
        className={stylesContrato.sectionParteUno}
        style={{
margin: '3rem 0',
display: 'flex',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
columnGap: '2rem'
        }}
      >
      
        
                                            <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                        style={{ textAlign: "center", width: "24rem"}}
                        onClick={handleClick}
                      >
                        Cerrar La Vizualización de la Demanda
                      </button>
                      <button 
                        className={`${stylesContrato.boton}`}
                        style={{ textAlign: "center", width: "15rem"}}
                        title="Imprimir Contrato de Servicio"
                      onClick={imprimirContratoServicio}>Imprimir Demanda</button>

   
      </section>
   </>
  );
};

export { ContratoServivioPlantilla };