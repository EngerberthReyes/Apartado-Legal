"use client";
import styles from "../../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";

const DemandaServicio = ({
  redireccionarContratos,
  redireccionarDemandas,
  redireccionarNuevaDemanda,
  actualizarVisibilidadContenedor,
  aparecerOpciones,
  obtenerValorTipoContrato,
  obtenerValorServicio,
  obtenerValorSeguro,
  handleChange,
  handleChangeUno,
  handleChangeDos,
  agregarNombreServicio,
  onSubmitb,
  opcionServicio,
  ejecutarDosFunciones,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textareaRef.current?.value]);

  const manejador = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const onSubmit = async (datos) => {
    console.log(datos);
    const objetoDemandaServicio = {
      id_demanda: null,
      servicio_demandado: datos.servicioDemanda,
      fecha_de_emision: datos.fechaEmision,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ctss_demandas",
        objetoDemandaServicio
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Data sent successfully");
      } else {
        console.log("bro se envio mal");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section
        className={`contratoServicio ${stylesContrato.contenedorInformacion} ${stylesContrato.desaparecerContenedor}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={stylesContrato.contenedorTitulo}>
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Emisión Demanda Hacia un Servicio
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación del Servicio de a Demandar
            </h1>

            <p className={stylesContrato.p}>
              Empresa a Demandar:
              <select
                className={stylesContrato.opciones}
                {...register("servicioDemanda", {
                  required: {
                    value: true,
                  },
                })}
                onChange={agregarNombreServicio}
              >
                <option value="algo">{`Algo`}</option>
              </select>
            </p>
            <p className={stylesContrato.p}>
              El Tipo de Servicio a Demandar: {opcionServicio}
            </p>
            <p className={stylesContrato.p}>
              Tipo de Incidente Ocurrido: {opcionServicio}
            </p>
            <p className={stylesContrato.p}>
              Empresa Demandante del Servicio: Paquetes Turísticos
            </p>
          </section>
          <section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Descripción de Incidente:
              </h1>

              <select
                className={stylesContrato.opciones}
                {...register("descripcionIncidente", {
                  required: {
                    value: true,
                  },
                })}
                onChange={agregarNombreServicio}
              >
                <option value="algo">{`Algo`}</option>
              </select>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Descripcion Propio del Motivo de la Demanda
              </h1>
              <textarea
                className={stylesContrato.inputTextoTextArea}
                ref={textareaRef}
                onChange={manejador}
              ></textarea>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Fecha de Emision de la Demanda
              </h1>
              <input
                {...register("fechaEmision", {
                  required: {
                    value: true,
                  },
                })}
                className={stylesContrato.inputTexto}
                type="date"
                style={{ width: "15rem", height: "4rem", fontSize: "30px" }}
              />
            </section>
            <section
              className={stylesContrato.sectionParteUno}
              style={{
                marginTop: "3rem",
                display: "grid",
                placeItems: "center",
              }}
            >
              <section
                className={stylesContrato.contenedorFirma}
                style={{ columnGap: "2rem", wordBreak: "break-all" }}
              >
                <section className={stylesContrato.contenedorFirmaInterno}>
                  <button
                    className={`${stylesContrato.boton} ${stylesContrato.botonHoverVerde}`}
                    style={{ textAlign: "center" }}
                    type="submit"
                  >
                    Demandar
                  </button>
                </section>
                <section className={stylesContrato.contenedorFirmaInterno}>
                  <button
                    className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                    style={{ textAlign: "center" }}
                    onClick={ejecutarDosFunciones}
                    type="button"
                  >
                    Declinar Demanda
                  </button>
                </section>
              </section>
            </section>
          </section>
        </form>
      </section>
    </>
  );
};

export default DemandaServicio;