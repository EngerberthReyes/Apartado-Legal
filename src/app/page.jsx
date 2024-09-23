"use client";

import head from "next/head";
import stylea from "./contratos/styles-contratos.module.css";
import styles from "./styles-index.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ContenedorContratos from "@/componentes/contenedorDeContratos.jsx";
import ListadoContratos from "@/componentes/listadoContratos.jsx";
import axios from "axios";
import Loading from "../componentes/loading.jsx";
import LoadingLista from "../componentes/loadingLista.jsx";

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const enrutadorUrl = useRouter();
  const redireccionarDemandas = () => {
    enrutadorUrl.push(`/demandas`);
  };

  const enrutador = useRouter();

  const [xd, setXd] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/api/ctss_contratos";

    axios
      .get(url)
      .then((response) => {
        const resultadoObjeto = response.data;

        console.log(resultadoObjeto);

        const datos = resultadoObjeto.map((datosGet) => {
          return datosGet.nombre_de_contrato;
        });

        setXd(resultadoObjeto);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onSubmit = async (datos) => {
    const objetoContrato = {
      id_contrato: null,
      nombre_de_contrato: datos.nombre_de_contrato,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contratos",
        objetoContrato
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Data Chevere");
      } else {
        console.log("Data Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [contenedorContrato, setContenedorContrato] = useState();
  const contenedorGeneralDos = useRef(null);
  const contenedorGeneral = useRef(null);
  const contenedorGeneralXd = useRef(null);
  const contenedorTablaGeneralDos = useRef(null);

  useEffect(() => {
    contenedorGeneralDos.current = document.querySelector(
      ".contenedorGeneralDos"
    );
    contenedorGeneral.current = document.querySelector(".contenedorGeneral");
    contenedorGeneralXd.current = document.querySelector(
      ".contenedorGeneralXd"
    );
    contenedorTablaGeneralDos.current = document.querySelector(
      ".contenedorGeneralDosListado"
    );
  }, []);
  const contenedorGeneralActualizado = contenedorGeneral.current;
  const contenedorGeneralDosActualizado = contenedorGeneralDos.current;
  const a = contenedorGeneralXd.current;
  const ayudador = contenedorTablaGeneralDos.current;
  const [buttonText, setButtonText] = useState("Crear Contratos");

  const redireccionarNuevoContrato = () => {
    contenedorGeneralActualizado?.classList.toggle(
      stylea.contenedorTablaGeneral
    );
    contenedorContrato?.classList.toggle(stylea.aparecerContenedor);
    contenedorGeneralDosActualizado?.classList.toggle(
      stylea.centrarContenedorGeneral
    );

    ayudador?.classList.toggle(stylea.ayudador);
    setButtonText((prevText) =>
      prevText === "Crear Contratos" ? "Ampliar Sección" : "Crear Contratos"
    );
  };
  const [visualizar, setVisualizar] = useState(false);
  const [editar, setEditar] = useState([]);
  const [textFiltrado, setTextosFiltrados] = useState("");
  const [weaActiva, setWeaActiva] = useState(false);
  const [weaActivaEditar, setWeaActivaEditar] = useState(false);
  const [weaActivaEliminar, setWeaActivaEliminar] = useState(false);

  const [datosIniciales, setdatosIniciales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [especialActivo, setEspecialActivo] = useState(false);
  const [botones, setBotones] = useState(false);
  const [eliminar, setEliminar] = useState([]);
  const loadingData = async () => {
    setEspecialActivo(true);
    setTimeout(() => {
      setEspecialActivo(false);
    }, 2500);

    setIsLoading(true);

    try {
      const urlDemanda = "http://localhost:3000/api/ctss_demandas";
      const response = await axios.get(urlDemanda);
      const urlContrato = "http://localhost:3000/api/ctss_contratos";
      const responseDos = await axios.get(urlContrato);
      const resultadoObjeto = responseDos.data.map((datosGet) => {
        if (datosGet.fecha_inicio && datosGet.fecha_fin) {
          const fechaCompletaInicio = datosGet.fecha_inicio;
          const fechaCompletaFin = datosGet.fecha_fin;
          const fechaSinHoraInicio = fechaCompletaInicio.split("T")[0];
          const fechaSinHoraFin = fechaCompletaFin.split("T")[0];
          const partesFechaInicio = fechaSinHoraInicio.split("-");
          const partesFechaFin = fechaSinHoraFin.split("-");
          datosGet.fecha_inicio = `${partesFechaInicio[2]}-${partesFechaInicio[1]}-${partesFechaInicio[0]}`;
          datosGet.fecha_fin = `${partesFechaFin[2]}-${partesFechaFin[1]}-${partesFechaFin[0]}`;
        }
        return datosGet;
      });
      setdatosIniciales(resultadoObjeto);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setEspecialActivo(false);
      setIsLoading(false);
      setTimeout(() => {
        setEliminar([]);
      }, 2000);
      setBotones(true);
    }
  };

  return (
    <>
      <head>
        <title>Actualización de Contratos</title>
        <link rel="favicon" href="./favicon.ico" type="Image/ico" />
      </head>
      <body className={styles.body}>
        <header className={styles.cabezera}>
          <section
            className={styles.contenedorTitulo}
            style={{ display: "flex", columnGap: "1rem" }}
          >
            <Image
              style={{ borderRadius: "5px" }}
              title="Routes"
              width={60}
              height={50}
              alt="R"
              src="/IMG/Banner/R.png"
            />
            <h1 className={styles.tituloHeader}>Actualización de Contratos</h1>
          </section>
          <ul className={styles.dropdown} id="menu">
            <li className={styles.dropdown__list}>
              <a
                className={styles.dropdown__link}
                onClick={redireccionarDemandas}
              >
                <Image
                  width={20}
                  height={20}
                  alt="Imagen"
                  src="/IMG/Banner/projects.svg"
                  className={styles.dropdown__icon}
                />
                <input type="checkbox" className={styles.dropdown__check} />
                <span class="dropdown__span">
                  Demandas a Servicios y Seguros
                </span>
                <Image
                  width={20}
                  height={20}
                  alt="Imagen"
                  src="/IMG/Banner/down.svg"
                  className={styles.dropdown__arrow}
                />
              </a>
            </li>
          </ul>
        </header>
        <section
          className={`contenedorGeneralXd ${styles.contenedorGeneral}`}
          style={{ justifyContent: "center" }}
        >
          <section
            className={`contenedorGeneralDos ${styles.contenedorGeneralDos}`}
            style={{ padding: "0" }}
          >
            <ContenedorContratos
              loadingData={loadingData}
              onData={setContenedorContrato}
              redireccionarDemandas={redireccionarDemandas}
              redireccionarNuevoContrato={redireccionarNuevoContrato}
            />
            <section
              className={`contenedorGeneral ${styles.contenedorInformacion}`}
            >
              <section className={styles.contenedorGeneral}>
                <section
                  className={`contenedorGeneralDosListado ${styles.contenedorGeneralDos}`}
                  style={{ width: "max-content" }}
                >
                  <ListadoContratos
                    setVisualizar={setVisualizar}
                    setEditar={setEditar}
                    setWeaActiva={setWeaActiva}
                    setWeaActivaEditar={setWeaActivaEditar}
                    setWeaActivaEliminar={setWeaActivaEliminar}
                    visualizar={visualizar}
                    editar={editar}
                    setEliminar={setEliminar}
                    setTextosFiltrados={setTextosFiltrados}
                    textFiltrado={textFiltrado}
                    weaActiva={weaActiva}
                    weaActivaEditar={weaActivaEditar}
                    weaActivaEliminar={weaActivaEliminar}
                    especialActivo={especialActivo}
                    loadingData={loadingData}
                    datosIniciales={datosIniciales}
                    isLoading={isLoading}
                    botones={botones}
                    eliminar={eliminar}
                    contenedorTabla={contenedorGeneralActualizado}
                    redireccionarNuevoContrato={redireccionarNuevoContrato}
                    buttonText={buttonText}
                  />
                </section>
              </section>
            </section>
          </section>
        </section>
      </body>
    </>
  );
};

export default Index;
