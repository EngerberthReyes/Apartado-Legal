"use client";
import styles from "../../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";

const DemandaSeguro = ({
  redireccionarContratos,
  redireccionarDemandas,
  actualizarVisibilidadContenedor,
  aparecerOpciones,
  obtenerValorTipoContrato,
  obtenerValorServicio,
  obtenerValorSeguro,
  handleChange,
  handleChangeUno,
  handleChangeDos,
  agregarNombreServicio,
  onSubmit,
  opcionSeguro,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <>
      <section
        className={`contratoSeguro ${stylesContrato.contenedorInformacion} ${stylesContrato.desaparecerContenedor}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={stylesContrato.contenedorTitulo}>
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Demanda de Seguro
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de las Partes
            </h1>
            <p className={stylesContrato.p}>
              Prestador de Servicios:{" "}
              <select className={stylesContrato.opciones}>
                <option>{`Algo`}</option>
              </select>
            </p>
            <p className={stylesContrato.p}>Tipo de Seguro: {opcionSeguro}</p>
            <p className={stylesContrato.p}>
              Representante Legal:{" "}
              <select className={stylesContrato.opciones}>
                <option>{`Nombre de la persona que firmara el contrato`}</option>
              </select>
            </p>
            <p className={stylesContrato.p}>
              Empresa Optadora del Servicio: Paquetes Turísticos
            </p>
          </section>
          <section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula I: Bases del Servicio
              </h1>

              <p className={stylesContrato.p}>
                El Prestador se compromete a proporcionar servicios de hospedaje
                de alta calidad para los huéspedes. Los servicios de hospedaje
                incluyen:
              </p>
              <ul>
                <li>Alojamiento.</li>
                <li>Desayuno.</li>
                <li>Limpieza.</li>
                <li>Servicio al cliente.</li>
                <li>Seguridad.</li>
              </ul>
              <p className={stylesContrato.p}>
                Este contrato de servicios de hospedaje se aplica a{" "}
                <input
                  className={stylesContrato.inputTexto}
                  type="text"
                  placeholder="Tiempo de Duración con el Servicio"
                />
                , con la posibilidad de renovación si ambas partes están
                satisfechas con el servicio proporcionado.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula II: Alcance y Resultados Esperados
              </h1>
              <ul>
                <p className={stylesContrato.p}>
                  Los resultados que se esperaran del servicio de hospedaje es:
                </p>
                <li>
                  Alojamiento: El Prestador proporcionará habitaciones limpias y
                  bien mantenidas para los huéspedes. Las habitaciones estarán
                  equipadas con todas las comodidades necesarias, incluyendo
                  cama cómoda, televisión, aire acondicionado y WiFi gratuito.
                </li>
                <li>
                  Desayuno: Se ofrecerá un desayuno diario a los huéspedes para
                  comenzar su día. El desayuno incluirá una variedad de opciones
                  para satisfacer las preferencias dietéticas de los huéspedes.
                </li>
                <li>
                  Limpieza: El Prestador se compromete a mantener las
                  habitaciones y las áreas comunes del alojamiento limpias y
                  ordenadas.
                </li>
                <li>
                  Servicio al cliente: El Prestador proporcionará un servicio al
                  cliente amigable y eficiente para responder a cualquier
                  pregunta o inquietud que los huéspedes puedan tener.
                </li>
                <li>
                  Seguridad: El Prestador garantizará la seguridad de los
                  huéspedes y sus pertenencias durante su estadía.
                </li>
              </ul>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula III: Obligaciones de las Partes
              </h1>
              <p className={stylesContrato.p}>
                Ambas partes se comprometen a cumplir con las obligaciones
                descritas en el presente contrato.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula IV: Forma de Pago
              </h1>
              <p className={stylesContrato.p}>
                El Cliente acuerda realizar los pagos a través de{" "}
                <select className={stylesContrato.opciones}>
                  <option>Metodos de Pago</option>
                </select>{" "}
                en las siguiente fecha:{" "}
                <input className={stylesContrato.inputTexto} type="date" /> con
                un costo de{" "}
                <input
                  className={stylesContrato.inputTexto}
                  type="number"
                  placeholder="Costo del Servicio"
                />{" "}
                $.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula V: Vigencia del Contrato
              </h1>
              <p className={stylesContrato.p}>
                Este contrato tendrá una duración de vigencia desde el{" "}
                <input className={stylesContrato.inputTexto} type="date" />{" "}
                hasta el{" "}
                <input className={stylesContrato.inputTexto} type="date" />.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula VI: Cláusulas de Incumplimiento
              </h1>
              <p className={stylesContrato.p}>
                En caso de incumplimiento del contrato por parte del Prestador,
                se aplicarán las siguientes sanciones: Demandas por
                incumplimiento de las cláusulas anteriormente dichas.
              </p>
            </section>
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
              <section className={stylesContrato.contenedorFirmaInterno}>
                <select
                  style={{ textAlign: "center" }}
                  className={stylesContrato.opciones}
                >
                  <option>{`Prestado de Seguro`}</option>
                </select>
                <p
                  className={stylesContrato.p}
                  style={{ textAlign: "center", fontSize: "23px" }}
                >
                  Firma del Representante Legal
                </p>
              </section>
              <section className={stylesContrato.contenedorFirmaInterno}>
                <input
                  className={stylesContrato.inputTexto}
                  style={{ textAlign: "center" }}
                  type="text"
                />
                <p
                  className={stylesContrato.p}
                  style={{ textAlign: "center", fontSize: "23px" }}
                >
                  Firma del Representante de Paquetes Turisticos
                </p>
              </section>
            </section>
          </section>
        </form>
      </section>
    </>
  );
};

export default DemandaSeguro;