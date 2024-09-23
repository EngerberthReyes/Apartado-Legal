import styles from "../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

const ContratoSeguroPlantilla = ({ servicios, especialActivo, handleClick }) => {

const [razones_sociales, setRazonesSociales] = useState();

useEffect(() => {
  const tipoDeContrato = servicios.map(dataGet => dataGet.id_tipo_contrato);
  setRazonesSociales(tipoDeContrato[0]);
}, [servicios]);

const imprimirContratoSeguro = () => {
  const contenidoAImprimir = document.getElementById('imprimirContratoSeguro').innerHTML;
  const ventanaImpresion = window.open('', '_blank');
  ventanaImpresion.document.write(`
    <html>
      <head>
        <title>Imprimir Contrato de Seguro</title>
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
      id="imprimirContratoSeguro"
    >
            <section className={stylesContrato.contenedorTitulo}>
            <h1
            className={stylesContrato.tituloHeader}
            style={{ marginTop: "0px", textAlign: "center", width: "100%" }}
          >
            Contrato de Seguro 
          </h1>
          </section>
      <section className={stylesContrato.contenedorTitulo}>
        

        {servicios.map((datosGet, index) => (
          <>
          <h1 style={{ textAlign: "center", width: "100%" }}>
            {datosGet.razon_social}
          </h1>
          </>
        ))}
      </section>

      <section className={stylesContrato.sectionParteUno}>
        <h1 className={stylesContrato.tituloHeader}>
          Identificación de las Partes
        </h1>
        {servicios.map((datosGet, index) => (
          <p key={index} className={stylesContrato.p}>
            Prestador de Seguros: {datosGet.razon_social}
          </p>
        ))}
        <>
          {servicios.map((datosGet, index) => (
            <p key={index} className={stylesContrato.p}>
              Tipo de Seguro: {datosGet.categoria_empresa}
            </p>
          ))}
        </>
        {servicios.map((datosGet, index) => (
          <p key={index} className={stylesContrato.p}>
            Representante Legal: {datosGet.nombre}
          </p>
        ))}
        <p className={stylesContrato.p}>
          Empresa que optará por el Seguro: Paquetes Turísticos
        </p>
      </section>
      <section>
        <section className={stylesContrato.sectionParteUno}>
        {razones_sociales === 4 && (
          <>
<h1 className={stylesContrato.tituloHeader}>
  Cláusula I: Cobertura del Seguro de Vida
</h1>

<p className={stylesContrato.p}>
  El Prestador se compromete a proporcionar seguros de vida integrales
  para los beneficiarios designados. La cobertura del seguro de vida incluye:
</p>
<ul>
  <li>Beneficio por fallecimiento.</li>
  <li>Beneficios adicionales por accidentes.</li>
  <li>Beneficios por enfermedades graves.</li>
</ul>
</>
          )}
                {razones_sociales === 5 && (
          <>
<h1 className={stylesContrato.tituloHeader}>
    Cláusula I: Cobertura y Compromisos del Seguro de Transporte
  </h1>
  <p className={stylesContrato.p}>
    El asegurador se compromete a proporcionar seguros de transporte seguros y eficientes para los pasajeros. Los seguros de transporte incluyen:
  </p>
  <ul>
    <li>Asistencia en caso de necesidades en los transportes</li>
  </ul>
</>
          )}
                        {razones_sociales === 6 && (
          <>
  <h1 className={stylesContrato.tituloHeader}>
    Cláusula I: Cobertura y Compromisos del Seguro Mortuorio
  </h1>
  <p className={stylesContrato.p}>
    El Asegurador se compromete a proporcionar servicios de alta calidad para los clientes en el marco del seguro mortuorio. Los servicios incluyen:
  </p>
  <ul>
    <li>Suministro de ataúdes y urnas de calidad para eventos conmemorativos.</li>
    <li>Mantenimiento de la limpieza y la higiene en todas las áreas destinadas a los servicios funerarios.</li>
    <li>Atención al cliente profesional y cortés durante el proceso de organización y ejecución de los servicios funerarios.</li>
    <li>Garantía de seguridad en todos los aspectos relacionados con la manipulación y el transporte de los restos mortales.</li>
  </ul>
</>
          )}
          <p className={stylesContrato.p}>
            Este contrato de servicios de hospedaje se aplica a
            <span
              className={stylesContrato.p}
              style={{
                display: "inline-block",
                margin: "0 .5rem",
              }}
            >
              {servicios.map((datosGet, index) => (
                <p key={index} value={datosGet.categoria_empresa}>
                  {datosGet.categoria_empresa}
                </p>
              ))}
            </span>
          </p>
        </section>

        <section className={stylesContrato.sectionParteUno}>
                {razones_sociales === 4 && (
        <>
                 <h1 className={stylesContrato.tituloHeader}>
    Cláusula II: Cobertura y Beneficios Esperados
  </h1>
  <ul>
    <p className={stylesContrato.p}>
      Los beneficios que se esperan del seguro de vida son:
    </p>
    <li>
      Cobertura de Fallecimiento: El asegurador proporcionará una suma asegurada en caso de fallecimiento del asegurado, destinada a beneficiarios designados para ayudar a cubrir gastos y proporcionar apoyo financiero en momentos difíciles.
    </li>
    <li>
      Beneficios Adicionales: Además de la cobertura básica, el contrato de seguro puede incluir beneficios adicionales como cobertura por fallecimiento accidental, enfermedades críticas o invalidez total y permanente, según los términos acordados.
    </li>
    <li>
      Asistencia en Vida: El asegurador puede ofrecer servicios de asistencia en vida, como asesoramiento médico telefónico, programas de bienestar y descuentos en servicios de salud, para promover el bienestar general del asegurado.
    </li>
    <li>
      Flexibilidad en Pago de Primas: El contrato puede permitir flexibilidad en el pago de primas, como opciones de pago mensual, trimestral o anual, para adaptarse a las necesidades financieras del asegurado.
    </li>
    <li>
      Proceso de Reclamación: El asegurador se compromete a facilitar un proceso de reclamación ágil y eficiente para que los beneficiarios puedan recibir los beneficios en caso de fallecimiento del asegurado, con un servicio al cliente dedicado para atender cualquier pregunta o inquietud.
    </li>
    <li>
      Protección y Seguridad Financiera: El seguro de vida proporciona una capa adicional de protección y seguridad financiera para el asegurado y sus seres queridos, asegurando que estén preparados financieramente para hacer frente a circunstancias adversas.
    </li>
  </ul>
</>
        )}
                {razones_sociales === 5 && (
        <>
  <h1 className={stylesContrato.tituloHeader}>
    Cláusula II: Alcance y Resultados Esperados
  </h1>
  <ul>
    <p className={stylesContrato.p}>
      Los resultados esperados del seguro de transporte son:
    </p>
    <li>
      Atención a cualquier inconveniente con el tranporte transporte durante el viaje.
    </li>
  </ul>
</>
        )}
        {razones_sociales === 6 && (
        <>
    <h1 className={stylesContrato.tituloHeader}>
    Cláusula II: Alcance y Resultados Esperados
  </h1>
  <ul>
    <p className={stylesContrato.p}>
      Los resultados que se esperan del seguro de atención funeraria son:
    </p>
    <li>
      Calidad en la preparación: El seguro funerario se compromete a proporcionar una preparación de alta calidad para los restos mortales, asegurando el respeto y la dignidad en todo momento.
    </li>
    <li>
      Variedad de opciones: El seguro funerario ofrecerá una amplia gama de opciones y paquetes para los servicios conmemorativos, permitiendo a los clientes personalizar y adaptar los arreglos según sus preferencias y necesidades.
    </li>
    <li>
      Atención al cliente: El seguro funerario proporcionará un seguro al cliente compasivo y profesional, brindando apoyo emocional y ayudando a los clientes a navegar por el proceso de organización de los seguros funerarios.
    </li>
    <li>
      Ambiente y cuidado: El seguro funerario mantendrá un ambiente tranquilo, sereno y respetuoso en todas las instalaciones, garantizando un entorno adecuado para que los familiares y amigos puedan despedirse y honrar a sus seres queridos.
    </li>
  </ul>
</>
        )}
        </section>
        <section className={stylesContrato.sectionParteUno}>
          <h1 className={stylesContrato.tituloHeader}>
            Cláusula III: Capacidad Máxima de Personas en el Servicio
          </h1>
          {servicios.map((datosGet, index) => (
            <p key={index} className={stylesContrato.p}>
              Este servicio ofrece una capacidad máxima de personas es de: {datosGet.cantidad_persona}.
            </p>
          ))}
        </section>
        <section className={stylesContrato.sectionParteUno}>
          <h1 className={stylesContrato.tituloHeader}>
            Cláusula IV: Obligaciones de las Partes
          </h1>
          <p className={stylesContrato.p}>
            Ambas partes se comprometen a cumplir con las obligaciones descritas
            en el presente contrato.
          </p>
        </section>
        <section className={stylesContrato.sectionParteUno}>
          <h1 className={stylesContrato.tituloHeader}>
            Cláusula V: Forma de Pago
          </h1>

          {servicios.map((datosGet, index) => (
            <p key={index} className={stylesContrato.p} style={{ wordBreak: 'break-word' }}>
              El Servicio acuerda realizar los pagos a través
              {` ${datosGet.tipo_pago}`} con un costo de {datosGet.costo}$.
            </p>
          ))}
        </section>
        <section className={stylesContrato.sectionParteUno}>
          <h1 className={stylesContrato.tituloHeader}>
            Cláusula VI: Vigencia del Servicio
          </h1>
          {servicios.map((datosGet, index) => (
            <p key={index} className={stylesContrato.p}>
              Este Servicio destinado a {datosGet.tipo_contrato} tendrá una
              duración de vigencia desde el{" "}
              {datosGet.fecha_inicio.split("T")[0]} hasta el
              {` ${datosGet.fecha_fin.split("T")[0]}`}.
            </p>
          ))}
        </section>
        <section className={stylesContrato.sectionParteUno}>
          <h1 className={stylesContrato.tituloHeader}>
            Cláusula VII: Cláusula de Incumplimiento
          </h1>
          <p className={stylesContrato.p}>
            En caso de incumplimiento del contrato por parte del Prestador, se
            aplicarán las siguientes sanciones: Demandas por incumplimiento de
            las cláusulas anteriormente dichas.
          </p>
        </section>
        <section>
        <section className={stylesContrato.sectionParteUno}>
          <h1
            className={stylesContrato.tituloHeader}
            style={{ marginBottom: "1rem" }}
          >
            Firmas:
          </h1>
        </section>
        <section
          className={stylesContrato.contenedorFirma}
          style={{ columnGap: "2rem", wordBreak: "break-all" }}
        >
          <section className={stylesContrato.contenedorFirmaInterno} style={{ width: "100%", textAlign: "center" }}>
            <p
              className={stylesContrato.p}
              style={{
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              {servicios.map((datosGet, index) => (
 <Image
 key={datosGet.id_contrato || index}
 src={datosGet.firma_representante_legal}
 alt="Firma del Representante Legal"
 title="Firma del Representante Legal"
 width={350}
 height={350}
 style={{
   borderRadius: "0.5rem",
   boxShadow:
     "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
   marginBottom: "10px",
 }}
/>
              ))}
            </p>

            <p
              className={stylesContrato.p}
              style={{ textAlign: "center", fontSize: "23px" }}
            >
              Firma del Representante Legal
            </p>
          </section>
          <section className={stylesContrato.contenedorFirmaInterno} style={{ width: "100%", textAlign: "center" }}>
{servicios.map((datosGet, index) => {
        return (
          <Image
            key={datosGet.id_contrato || index}
            src={datosGet.firma_paquete_turistico}
            alt="Firma de Nuestra Empresa Turistica"
            title="Firma de Nuestra Empresa Turistica"
            width={350}
            height={350}
            style={{
              borderRadius: "0.5rem",
              boxShadow:
                "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
              marginBottom: "10px",
            }}
          />
        );
      })}
            <p
              className={stylesContrato.p}
              style={{ textAlign: "center", fontSize: "23px" }}
            >
              Firma del Representante de Paquetes Turísticos
            </p>
          </section>
        </section>
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
                        Cerrar La Vizualización del Contrato
                      </button>
                      <button 
                        className={`${stylesContrato.boton}`}
                        style={{ textAlign: "center", width: "15rem"}}
                        title="Imprimir Contrato de Seguro"
                      onClick={imprimirContratoSeguro}>Imprimir Contrato</button>

   
      </section>
   </>
  );
};

export { ContratoSeguroPlantilla };