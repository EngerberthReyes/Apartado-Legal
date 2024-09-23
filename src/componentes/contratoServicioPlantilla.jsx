import styles from "../app/styles-index.module.css";
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
        <title>Imprimir Contrato de Servicio</title>
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
            <h1
            className={stylesContrato.tituloHeader}
            style={{ marginTop: "0px", textAlign: "center", width: "100%" }}
          >
            Contrato de Servicio 
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
            Prestador de Servicios: {datosGet.razon_social}
          </p>
        ))}
        <>
          {servicios.map((datosGet, index) => (
            <p key={index} className={stylesContrato.p}>
              Tipo de Servicio: {datosGet.categoria_empresa}
            </p>
          ))}
        </>
        {servicios.map((datosGet, index) => (
          <p key={index} className={stylesContrato.p}>
            Representante Legal: {datosGet.nombre}
          </p>
        ))}
        <p className={stylesContrato.p}>
          Empresa que optará por el Servicio: Paquetes Turísticos
        </p>
      </section>
      <section>
        <section className={stylesContrato.sectionParteUno}>
        {razones_sociales === 1 && (
          <>
          <h1 className={stylesContrato.tituloHeader}>
            Cláusula I: Bases del Servicio
          </h1>

          <p className={stylesContrato.p}>
            El Prestador se compromete a proporcionar servicios de hospedaje de
            alta calidad para los huéspedes. Los servicios de hospedaje
            incluyen:
          </p>
          <ul>
            <li>Alojamiento.</li>
            <li>Limpieza.</li>
            <li>Servicio al cliente.</li>
            <li>Seguridad.</li>
          </ul>
</>
          )}
                {razones_sociales === 2 && (
          <>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula I: Bases del Servicio
                  </h1>

  <p className={stylesContrato.p}>
    El Transportista se compromete a proporcionar servicios de transporte seguros y eficientes para los pasajeros. Los servicios de transporte incluyen:
</p>
<ul>
    <li>Transporte terrestre/aéreo/marítimo (según corresponda).</li>
    <li>Seguridad durante el viaje.</li>
    <li>Comodidad para los pasajeros.</li>
    <li>Puntualidad en los horarios de salida y llegada.</li>
    <li>Asistencia en caso de necesidades especiales de los pasajeros (si aplica).</li>
</ul>
</>
          )}
                        {razones_sociales === 3 && (
          <>
<h1 className={stylesContrato.tituloHeader}>
    Cláusula I: Bases del Servicio
</h1>

<p className={stylesContrato.p}>
    El Prestador se compromete a proporcionar servicios de restauración de alta calidad para los clientes. Los servicios de restauración incluyen:
</p>

<ul>
    <li>Suministro de alimentos y bebidas de calidad.</li>
    <li>Mantenimiento de la higiene y limpieza en todas las áreas del restaurante.</li>
    <li>Atención al cliente profesional y cortés.</li>
    <li>Garantía de seguridad alimentaria y sanitaria.</li>
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
                {razones_sociales === 1 && (
        <>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula II: Alcance y Resultados Esperados
                  </h1>
                  <ul>
                    <p className={stylesContrato.p}>
                      Los resultados que se esperaran del servicio de hospedaje
                      son:
                    </p>
                    <li>
                      Alojamiento: El Prestador proporcionará habitaciones
                      limpias y bien mantenidas para los huéspedes. Las
                      habitaciones estarán equipadas con todas las comodidades
                      necesarias, incluyendo cama cómoda, televisión, aire
                      acondicionado y Wifi gratuito.
                    </li>
                    <li>
                      Limpieza: El Prestador se compromete a mantener las
                      habitaciones y las áreas comunes del alojamiento limpias y
                      ordenadas.
                    </li>
                    <li>
                      Servicio al cliente: El Prestador proporcionará un
                      servicio al cliente amigable y eficiente para responder a
                      cualquier pregunta o inquietud que los huéspedes puedan
                      tener.
                    </li>
                    <li>
                      Seguridad: El Prestador garantizará la seguridad de los
                      huéspedes y sus pertenencias durante su estadía.
                    </li>
                  </ul>
</>
        )}
                {razones_sociales === 2 && (
        <>
                <h1 className={stylesContrato.tituloHeader}>
    Cláusula II: Alcance y Resultados Esperados
</h1>
<ul>
    <p className={stylesContrato.p}>
        Los resultados esperados del servicio de transporte son:
    </p>
    <li>
        Transporte seguro: El Transportista proporcionará un transporte seguro y confiable para los pasajeros, garantizando condiciones óptimas de viaje y respetando las normas de tráfico y seguridad.
    </li>
    <li>
        Puntualidad: El Transportista se compromete a cumplir con los horarios de salida y llegada establecidos, asegurando que los pasajeros lleguen a su destino a tiempo.
    </li>
    <li>
        Comodidad: Se ofrecerá un ambiente cómodo y agradable durante el viaje, asegurando que los pasajeros viajen en condiciones confortables y con acceso a servicios básicos como aire acondicionado y asientos ergonómicos.
    </li>
    <li>
        Atención al cliente: El Transportista proporcionará un servicio al cliente profesional y cortés, atendiendo cualquier consulta o necesidad que los pasajeros puedan tener durante el viaje.
    </li>
</ul>
</>
        )}
        {razones_sociales === 3 && (
        <>
               <h1 className={stylesContrato.tituloHeader}>
    Cláusula II: Alcance y Resultados Esperados
</h1>
<ul>
    <p className={stylesContrato.p}>
        Los resultados que se esperan del servicio de restaurante de alimentación son:
    </p>
    <li>
        Calidad de los alimentos: El Restaurante se compromete a proporcionar alimentos de alta calidad, frescos y preparados con los mejores estándares de higiene y seguridad alimentaria.
    </li>
    <li>
        Variedad de opciones: El Restaurante ofrecerá una amplia variedad de platos y menús que satisfagan los gustos y necesidades de los clientes, incluyendo opciones para dietas especiales y restricciones alimentarias.
    </li>
    <li>
        Servicio al cliente: El Restaurante proporcionará un servicio al cliente atento y profesional, asegurando una experiencia gastronómica agradable y satisfactoria para todos los comensales.
    </li>
    <li>
        Ambiente y limpieza: El Restaurante mantendrá un ambiente limpio, acogedor y seguro para los clientes, garantizando condiciones óptimas para disfrutar de la comida en un entorno agradable.
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
            <p key={index} className={stylesContrato.p}>
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
            <p key={index} className={stylesContrato.p} style={{ wordBreak: 'break-word' }}>
              Este Servicio destinado a {datosGet.tipo_contrato} tendrá una
              duración de vigencia desde el
              {` ${datosGet.fecha_inicio.split("T")[0]}`} hasta el
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
              marginBottom: "10px"
            }}
          />

              ))}
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
              marginBottom: "10px"
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
                        title="Imprimir Contrato de Servicio"
                      onClick={imprimirContratoServicio}>Imprimir Contrato</button>

   
      </section>
   </>
  );
};

export { ContratoServivioPlantilla };