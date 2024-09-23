import styles from "../../app/styles-index.module.css";
import stylesContrato from "../styles-nuevocontrato.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import ContratoServicio from "@/componentes/demandas/contratoServicio.jsx";
import ContratoSeguro from "@/componentes/demandas/contratoSeguro.jsx";

const ContenedorContratos = ({
  redireccionarDemandas,
  onData,
  redireccionarNuevoContrato,
  loadingData
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [opcionSeleccionada, setOpcionSeleccionada] =
    useState("Tipo de Contrato");
  const [opcionServicio, setOpcionServicio] = useState(null);
  const [opcionSeguro, setOpcionSeguro] = useState(null);

  const servicioDom = useRef(null);
  const seguroDom = useRef(null);
  const contratoServicioDom = useRef(null);
  const contratoSeguroDom = useRef(null);
  const contenedorContratoDom = useRef(null);

  useEffect(() => {
    servicioDom.current = document.querySelector(".servicio");
    seguroDom.current = document.querySelector(".seguro");
    contratoServicioDom.current = document.querySelector(".contratoServicio");
    contratoSeguroDom.current = document.querySelector(".contratoSeguro");
    contenedorContratoDom.current = document.querySelector(
      ".contenedorContrato"
    );
  }, []);

  const manejadorContenedorContrato = (event) => {
    onData(contenedorContratoDom.current);
  };

  manejadorContenedorContrato();

  const actualizarVisibilidadContenedor = (contenedorRef, mostrar) => {
    const { current: contenedorDom } = contenedorRef;
    contenedorDom?.classList.toggle(stylesContrato.aparecerContenedor, mostrar);
    contenedorDom?.classList.toggle(
      stylesContrato.desaparecerContenedor,
      !mostrar
    );
  };

  const aparecerOpciones = () => {
    const servicioActivo = opcionSeleccionada === "Servicio";
    const seguroActivo = opcionSeleccionada === "Seguro";
    const verificacion = opcionSeleccionada === "Tipo de Contrato";
    actualizarVisibilidadContenedor(servicioDom, servicioActivo);
    actualizarVisibilidadContenedor(seguroDom, seguroActivo);
    if (verificacion) {
      actualizarVisibilidadContenedor(contratoServicioDom, false);
      actualizarVisibilidadContenedor(contratoSeguroDom, false);
    }
    if (servicioActivo) {
      actualizarVisibilidadContenedor(contratoSeguroDom, false);
    } else if (seguroActivo) {
      actualizarVisibilidadContenedor(contratoServicioDom, false);
    }
  };

  const obtenerValorTipoContrato = (e) => {
    const opcionSeleccionadaContrato = e.target.value;
    setOpcionSeleccionada(opcionSeleccionadaContrato);
    aparecerOpciones();
  };

  const obtenerValorServicio = (e) => {
    const opcionSeleccionadaServicio = e.target.value;
    setOpcionServicio(opcionSeleccionadaServicio);
    actualizarVisibilidadContenedor(
      contratoServicioDom,
      opcionSeleccionadaServicio !== "Tipo de Servicio"
    );
    actualizarVisibilidadContenedor(contratoSeguroDom, false);
  };

  const obtenerValorSeguro = (e) => {
    const opcionSeleccionadaSeguro = e.target.value;
    setOpcionSeguro(opcionSeleccionadaSeguro);
    actualizarVisibilidadContenedor(
      contratoSeguroDom,
      opcionSeleccionadaSeguro !== "Tipo de Seguro"
    );
    actualizarVisibilidadContenedor(contratoServicioDom, false);
  };

  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptionUno, setSelectedOptionUno] = useState();
  const [selectedOptionDos, setSelectedOptionDos] = useState();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    obtenerValorTipoContrato();
  };
  const handleChangeUno = (event) => {
    selectedOptionUno(event.target.value);
    obtenerValorTipoContrato();
  };
  const handleChangeDos = (event) => {
    selectedOptionDos(event.target.value);
    obtenerValorTipoContrato();
  };
  const [nombreDeServicio, setNombreDeServicio] = useState("");

  const agregarNombreServicio = (event) => {
    setNombreDeServicio(event.target.value);
  };

  const onSubmit = async (datos) => {
    const datosRecibidos = await datos;
    return console.log(datosRecibidos);
  };

  return (
    <>
      <section
        className={`contenedorContrato ${stylesContrato.contenedorInformacion}`}
        style={{
          width: "53vw",
          overflowY: "auto",
          height: "70vh",
          display: "none",
        }}
      >
        <section
          style={{ display: "flex", flexFlow: "column wrap", rowGap: "2rem" }}
        >
          <section className={stylesContrato.contenedorTitulo}>
            <h1>Demandar un</h1>
            <select
              onClick={obtenerValorTipoContrato}
              className={`opciones ${stylesContrato.opciones}`}
              style={{ width: "11rem", height: "3rem" }}
              onChange={obtenerValorTipoContrato}
              defaultValue={selectedOption}
            >
              <option value="Tipo de Contrato">Seleccione</option>
              <option value="Servicio">Servicio</option>
              <option value="Seguro">Seguro</option>
            </select>
          </section>
          <section
            onChange={(e) => setOpcionServicio(e.target.value)}
            className={`servicio ${stylesContrato.contenedorTitulo} ${stylesContrato.desaparecerContenedor}`}
          >
            <h1 style={{ fontSize: "31px" }}>Seleccione: Servicio de</h1>
            <select
              defaultValue={selectedOptionUno}
              onChange={obtenerValorServicio}
              className={stylesContrato.opciones}
              style={{ width: "auto", height: "3rem" }}
            >
              <option value="Tipo de Servicio">Tipo de Servicio</option>
              <option value="Hospedaje">Hospedaje</option>
              <option value="Transporte">Transporte</option>
              <option value="Restaurante (Alimentacion)">
                Restaurante (Alimentacion)
              </option>
            </select>
          </section>
          <section
            className={`seguro ${stylesContrato.contenedorTitulo} ${stylesContrato.desaparecerContenedor}`}
          >
            <h1 style={{ fontSize: "31px" }}>Seleccione: Seguro</h1>
            <select
              defaultValue={selectedOptionDos}
              onChange={obtenerValorSeguro}
              className={stylesContrato.opciones}
              style={{ width: "11rem", height: "3rem" }}
            >
              <option
                value="Tipo de Seguro"
                className={stylesContrato.opciones}
              >
                Tipo de Seguro
              </option>
              <option value="Vida" className={stylesContrato.opciones}>
                de Vida
              </option>
              <option value="Seguro Transporte" className={stylesContrato.opciones}>
                de Transporte
              </option>
              <option value="Mortuorio" className={stylesContrato.opciones}>
                Mortuorio
              </option>
            </select>
          </section>
        </section>
        {opcionSeleccionada === "Tipo de Contrato" && (
          <section className={stylesContrato.seleccionasa}>
            <h1 style={{ fontSize: "36px", textAlign: "center" }}>
              Seleccione Hacia Donde Va Dirigida Esta Demanda, Si Hacia un
              Servicio o Hacia un Seguro
            </h1>
          </section>
        )}

        <ContratoServicio
        loadingData={loadingData}
        setOpcionServicio={setOpcionServicio}
          setOpcionSeleccionada={setOpcionSeleccionada}
          actualizarVisibilidadContenedor={actualizarVisibilidadContenedor}
          aparecerOpciones={aparecerOpciones}
          contratoServicioDom={contratoServicioDom}
          contratoSeguroDom={contratoSeguroDom}
          obtenerValorTipoContrato={obtenerValorTipoContrato}
          obtenerValorServicio={obtenerValorServicio}
          obtenerValorSeguro={obtenerValorSeguro}
          handleChange={handleChange}
          handleChangeUno={handleChangeUno}
          handleChangeDos={handleChangeDos}
          agregarNombreServicio={agregarNombreServicio}
          onSubmit={onSubmit}
          opcionServicio={opcionServicio}
          redireccionarNuevoContrato={redireccionarNuevoContrato}
        />

        <ContratoSeguro
        loadingData={loadingData}
        setOpcionServicio={setOpcionServicio}
          setOpcionSeleccionada={setOpcionSeleccionada}
           contratoServicioDom={contratoServicioDom}
          contratoSeguroDom={contratoSeguroDom}
          opcionServicio={opcionServicio}
          redireccionarNuevoContrato={redireccionarNuevoContrato}
                    actualizarVisibilidadContenedor={actualizarVisibilidadContenedor}
          aparecerOpciones={aparecerOpciones}
          obtenerValorTipoContrato={obtenerValorTipoContrato}
          obtenerValorSeguro={obtenerValorSeguro}
          handleChange={handleChange}
          handleChangeUno={handleChangeUno}
          handleChangeDos={handleChangeDos}
          agregarNombreServicio={agregarNombreServicio}
          onSubmit={onSubmit}
          setOpcionSeguro={setOpcionSeguro}
          opcionSeguro={opcionSeguro}
        />
      </section>
    </>
  );
};

export default ContenedorContratos;