import { useEffect, useState, useRef } from "react";
import styles from "../../app/contratos/styles-contratos.module.css";
import styleContenedorFixed from "../informacionModal.module.css";
import Image from "next/image";
import BuscadorContratosSeguros from "./buscadorContratosSeguros.jsx";
import Loading from "../loading.jsx";
import LoadingLista from "../loadingLista.jsx";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import {
  NotificacionVisualizar,
  NotificacionEditar,
  NotificacionEliminar,
} from "./notificaciones/notificaciones-amarillas.jsx";
import {
  VisualizarContrato,
  EditarContrato,
  EliminarContrato,
} from "./RUD/visualizar-editar-eliminar.jsx";

const ListadoSeguros = ({
  redireccionarNuevoContrato,
  buttonText,
  contenedorTabla,
  setListadoDeServicios,
  setListadoDeSeguros,
  listadoDeServicios,
  listadoDeSeguros,
  loadingData,
  datosIniciales,
  isLoading,
  botones,
  setTextosFiltrados,
  textFiltrado,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [visualizar, setVisualizar] = useState(false);
  const [editar, setEditar] = useState([]);
  const [eliminar, setEliminar] = useState([]);
  const [especialActivo, setEspecialActivo] = useState(false);
  const [weaActiva, setWeaActiva] = useState(false);
  const [weaActivaEditar, setWeaActivaEditar] = useState(false);
  const [weaActivaEliminar, setWeaActivaEliminar] = useState(false);

  useEffect(() => {
    loadingData();
  }, []);

  const textosFiltrados = (cosas) => {
    setTextosFiltrados(cosas);
  };

  const [elementosFiltradosAceptados, setElementosFiltrados] = useState([]);

  const filtrarElementos = () => {
    const elementosFiltrados = datosIniciales.filter((elemento) => {
      if (elemento.id_tipo_contrato > 3) {
        return (
          elemento.razon_social
            .toLowerCase()
            .includes(textFiltrado.toLowerCase()) ||
          elemento.categoria_empresa
            .toLowerCase()
            .includes(textFiltrado.toLowerCase()) ||
          elemento.fecha_emision
            .toLowerCase()
            .includes(textFiltrado.toLowerCase())
        );
      } else {
        return false;
      }
    });
    const elementosFiltradosReverse = elementosFiltrados.slice().reverse();
    console.log(elementosFiltradosReverse);
    setElementosFiltrados(elementosFiltradosReverse);
  };

  useEffect(() => {
    filtrarElementos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosIniciales, textFiltrado]);

  const [elementoSeleccionado, setElementoSeleccionado] = useState();
  const [tumama, setTumama] = useState(false);
  const handleClick = () => {
    setTumama(!tumama);
    console.log("click");
  };

  const handleClickId = async (id, alteracion) => {
    let contratoData;
    try {
      const respuesta = await axios.get(
        `http://localhost:3000/api/ctss_contratos/${id}`
      );

      contratoData = respuesta.data;

      const contratoDataFiltrado = contratoData.filter(
        (elemento) =>
          elemento.id_tipo_contrato > 3 && elemento.id_contrato === id
      );
      console.log(contratoDataFiltrado);
      contratoData = contratoDataFiltrado;

      if (alteracion === "editarcontrato") {
        setEditar(contratoData);
        setVisualizar(false);
        setEliminar([]);
        handleClick();
        setWeaActivaEditar(false);
        console.log("Editando");
      } else if (alteracion === "eliminarcontrato") {
        await axios.delete(`http://localhost:3000/api/ctss_demandas/${id}`);
        setEliminar(contratoData);
        loadingData();
        setVisualizar(false);
        setEditar([]);
        setWeaActivaEliminar(false);
        console.log("Eliminando");
      } else if (alteracion === "visualizardemanda") {
        let datosDemandas = await axios.get(
          `http://localhost:3000/api/ctss_demandas_incidentes/${id}`
        );

        if (datosDemandas.data) {
          setElementoSeleccionado(datosDemandas.data);
          setVisualizar(true);
          setEditar([]);
          setEliminar([]);
          handleClick();
        }
      }
    } catch (error) {
      console.error("Error al obtener la información del elemento:", error);
    }
  };

  const [hoverTdIndex, sethoverTdIndex] = useState(null);
  const [index, setIndex] = useState([]);
  const [weaArray, setWeaArray] = useState([]);
  const handleTdMouseEnter = (index, alteracion, weaArray) => {
    let arrayIndex = elementosFiltradosAceptados.findIndex(
      (empresa) => empresa.razon_social === weaArray
    );
    setWeaArray(weaArray);
    if (arrayIndex !== -1) {
      // Se puede Cambiar si se elimina la parte del <=, ahora esta en modo todos los contratos asi esten repetidos
      if (index === arrayIndex || arrayIndex <= index) {
        sethoverTdIndex(index);
        setWeaActiva(true);
        setIndex(elementosFiltradosAceptados[index].razon_social);
      }
    } else {
      if (alteracion === "editarcontrato") {
        setWeaActivaEditar(true);
        setIndex(elementosFiltradosAceptados[index].razon_social);
      } else if (alteracion === "eliminarcontrato") {
        setWeaActivaEliminar(true);
        setIndex(elementosFiltradosAceptados[index].razon_social);
      }
    }
  };

  const punteroSinHover = () => {
    sethoverTdIndex(null);
    setWeaActiva(false);

    sethoverTdIndex(null);
    setWeaActivaEditar(false);

    sethoverTdIndex(null);
    setWeaActivaEliminar(false);
  };

  const teclaPresionadaArriba = (event) => {
    if (event.key === "Enter") {
      loadingData();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keyup", teclaPresionadaArriba);
    return () => {
      document.body.removeEventListener("keyup", teclaPresionadaArriba);
    };
  }, []);

  const listadoServiciosBoton = () => {
    loadingData();
    setListadoDeSeguros(false);
    setListadoDeServicios(true);
  };

  const listadoSegurosBoton = () => {
    setListadoDeServicios(false);
    setListadoDeSeguros(true);
  };

  return (
    <>
      <VisualizarContrato
        visualizar={visualizar}
        elementoSeleccionado={elementoSeleccionado}
        especialActivo={tumama}
        handleClick={handleClick}
      />
      <EditarContrato
        editar={editar}
        loadingData={loadingData}
        handleClick={handleClick}
        especialActivo={tumama}
      />
      <EliminarContrato eliminar={eliminar} especialActivo={especialActivo} />
      <NotificacionVisualizar
        weaActiva={weaActiva}
        index={index}
        especialActivo={especialActivo}
      />
      <NotificacionEditar
        weaActivaEditar={weaActivaEditar}
        index={index}
        especialActivo={especialActivo}
      />
      <NotificacionEliminar
        weaActivaEliminar={weaActivaEliminar}
        index={index}
        especialActivo={especialActivo}
      />
      <section
        className={styles.contenedorActualizador}
        style={{
          gap: "2rem",
        }}
      >
        <section
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {contenedorTabla?.classList.contains(
            `${styles.contenedorTablaGeneral}`
          ) ? (
            <p style={{ position: "relative" }}>
              Recargue la Lista Presionando Enter.
            </p>
          ) : (
            <p style={{ position: "relative" }}>
              Recargue la Lista Presionando Enter.
            </p>
          )}
          <button
            className={styles.boton}
            style={{
              width: "16rem",
              height: "3rem",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={loadingData}
          >
            Actualizar Lista de Seguros
          </button>
        </section>
        {contenedorTabla?.classList.contains(
          `${styles.contenedorTablaGeneral}`
        ) ||
          (botones && (
            <>
              <section
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: "2rem",
                  marginTop: "1rem",
                }}
              >
                <button
                  className={styles.boton}
                  style={{
                    alignSelf: "flex-end",
                    width: "8rem",
                    height: "3rem",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: listadoDeServicios
                      ? "translateY(-10px)"
                      : "translateY(0)",
                  }}
                  onClick={listadoServiciosBoton}
                >
                  Servicios
                </button>
                <button
                  className={styles.boton}
                  style={{
                    alignSelf: "flex-end",
                    width: "8rem",
                    height: "3rem",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: listadoDeSeguros
                      ? "translateY(-10px)"
                      : "translateY(0)",
                  }}
                  onClick={listadoSegurosBoton}
                >
                  Seguros
                </button>
              </section>
            </>
          ))}
        <BuscadorContratosSeguros textosFiltrados={textosFiltrados} />
      </section>
      {contenedorTabla?.classList.contains(
        `${styles.contenedorTablaGeneral}`
      ) && (
        <p style={{ marginTop: "1rem" }}>
          Registros Encontrados: {` ${elementosFiltradosAceptados.length}`}
        </p>
      )}
      {isLoading ? (
        <section
          style={{
            display: "flex",
            position: "relative",
            fledatosInicialesirection: "column",
          }}
        >
          <section
            className="seccionLoading"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              paddingTop: "4rem",
              alignItems: "flex-start",
              justifyContent: "center",
              zIndex: "200",
              marginTop: "1rem",
              transition: "background-color 500ms ease",
              border: "10px",
              backgroundColor: "#000000ab",
            }}
          >
            <LoadingLista />
          </section>
          <>
            <table className={`tabla ${styles.tabla}`}>
              <thead className={styles.thead}>
                <tr className={styles.tr}>
                  <th className={styles.th}>Seguro Demandado</th>
                  <th className={styles.th}>Tipo de Seguro Demandado</th>
                  <th className={styles.th}>Fecha de Emisión</th>
                  {!contenedorTabla?.classList.contains(
                    `${styles.contenedorTablaGeneral}`
                  ) && (
                    <th className={styles.th} colSpan="2">
                      Registros Encontrados:
                      {` ${elementosFiltradosAceptados.length}`}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className={`${styles.tbody} ${styles.cuerpoTabla}`}>
                {elementosFiltradosAceptados.map((datosGet, index) => {
                  return (
                    <tr className={styles.tr} key={index}>
                      <td
                        className={`${styles.td} ${styles.borderNoneTd}`}
                        style={{
                          maxWidth: "8rem",
                          wordBreak: "break-all",
                        }}
                      >
                        {datosGet.razon_social}
                      </td>
                      <td
                        style={{
                          maxWidth: "8rem",
                          wordBreak: "break-all",
                        }}
                        className={`${styles.td} ${styles.borderNoneTd}`}
                      >
                        {datosGet.tipo_contrato}
                      </td>
                      <td
                        style={{
                          maxWidth: "8rem",
                          wordBreak: "break-all",
                        }}
                        className={`${styles.td} ${styles.borderNoneTd}`}
                      >
                        {datosGet.fecha_emision}
                      </td>
                      {!contenedorTabla?.classList.contains(
                        `${styles.contenedorTablaGeneral}`
                      ) && (
                        <>
                          <td
                            className={`${styles.td} ${styles.borderNoneTd}`}
                            style={{
                              backgroundColor: "#fde105",
                              padding: "0",
                              borderBottom: "0",
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: "#fde105",
                                width: "100%",
                                height: "4.1rem",
                                margin: "0px",
                                padding: "1rem",
                                color: "black",
                              }}
                            >
                              Editar Contrato
                            </button>
                          </td>
                          <td
                            className={`${styles.td} ${styles.borderNoneTd}`}
                            style={{
                              backgroundColor: "#ff0000",
                              padding: "0",
                              borderBottom: "0",
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: "#ff0000",
                                width: "100%",
                                height: "4.1rem",
                                margin: "0px",
                                padding: "1rem",
                                color: "#000000",
                              }}
                            >
                              Eliminar Contrato
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        </section>
      ) : !isLoading &&
        elementosFiltradosAceptados.length === 0 &&
        !textFiltrado ? (
        <>
          <section
            style={{
              display: "flex",
              position: "relative",
              fledatosInicialesirection: "column",
            }}
          >
            <table
              className={`tabla ${styles.tabla}`}
              style={{ position: "relative", width: "100%" }}
            >
              <thead className={styles.thead}>
                <tr className={styles.tr}>
                  <th className={styles.th}>Seguro Demandado</th>
                  <th className={styles.th}>Tipo de Seguro Demandado</th>
                  <th className={styles.th}>Fecha de Emisión</th>
                  {!contenedorTabla?.classList.contains(
                    `${styles.contenedorTablaGeneral}`
                  ) && (
                    <th className={styles.th}>
                      Registros Encontrados:
                      {` ${elementosFiltradosAceptados.length}`}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className={styles.cuerpoTabla}>
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      height: "15rem",
                      fontSize: "40px",
                    }}
                  >
                    Sin Registro de Demandas en Seguros...
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </>
      ) : elementosFiltradosAceptados.length > 0 ? (
        <>
          <table className={`tabla ${styles.tabla}`}>
            <thead className={styles.thead}>
              <tr className={styles.tr} style={{ backgroundColor: "#fde105" }}>
                <th className={styles.th}>Seguro Demandado</th>
                <th className={styles.th}>Tipo de Seguro Demandado</th>
                <th className={styles.th}>Fecha de Emisión</th>
                {!contenedorTabla?.classList.contains(
                  `${styles.contenedorTablaGeneral}`
                ) && (
                  <th className={styles.th} colSpan="2">
                    Registros Encontrados:
                    {` ${elementosFiltradosAceptados.length}`}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={`${styles.tbody} ${styles.cuerpoTabla}`}>
              {elementosFiltradosAceptados.map((datosGet, index) => (
                <tr
                  className={`${styles.tr}`}
                  key={datosGet.id_contrato}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleClickId(datosGet.id_incidente, "visualizardemanda")
                  }
                >
                  <td
                    className={`${styles.td} ${styles.borderNoneTd}`}
                    onMouseEnter={() =>
                      handleTdMouseEnter(index, "", datosGet.razon_social)
                    }
                    onClick={() =>
                      handleClickId(datosGet.id_incidente, "visualizardemanda")
                    }
                    onMouseLeave={punteroSinHover}
                    style={{
                      maxWidth: "8rem",
                      wordBreak: "break-all",
                      backgroundColor:
                        hoverTdIndex === index ? "#eeeeee45" : "transparent",
                    }}
                  >
                    {datosGet.razon_social}
                  </td>
                  <td
                    className={`${styles.td} ${styles.borderNoneTd} animate__animated`}
                    onMouseEnter={() =>
                      handleTdMouseEnter(index, "", datosGet.razon_social)
                    }
                    onClick={() =>
                      handleClickId(datosGet.id_incidente, "visualizardemanda")
                    }
                    onMouseLeave={punteroSinHover}
                    style={{
                      maxWidth: "8rem",
                      wordBreak: "break-all",
                      backgroundColor:
                        hoverTdIndex === index ? "#eeeeee45" : "transparent",
                    }}
                  >
                    {datosGet.tipo_contrato}
                  </td>
                  <td
                    className={`${styles.td} ${styles.borderNoneTd} animate__animated`}
                    onMouseEnter={() =>
                      handleTdMouseEnter(index, "", datosGet.razon_social)
                    }
                    onClick={() =>
                      handleClickId(datosGet.id_incidente, "visualizardemanda")
                    }
                    onMouseLeave={punteroSinHover}
                    style={{
                      maxWidth: "8rem",
                      wordBreak: "break-all",
                      backgroundColor:
                        hoverTdIndex === index ? "#eeeeee45" : "transparent",
                    }}
                  >
                    {datosGet.fecha_emision}
                  </td>
                  {!contenedorTabla?.classList.contains(
                    `${styles.contenedorTablaGeneral}`
                  ) && (
                    <>
                      <td
                        className={`${styles.td} ${styles.borderNoneTd}`}
                        style={{
                          backgroundColor: "#fde105",
                          padding: "0",
                          borderBottom: "0",
                        }}
                        onMouseEnter={() =>
                          handleTdMouseEnter(index, "editarcontrato")
                        }
                        onMouseLeave={punteroSinHover}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClickId(datosGet.id_contrato, "editarcontrato");
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "#fde105",
                            width: "100%",
                            height: "4.1rem",
                            margin: "0px",
                            padding: "1rem",
                            color: "black",
                          }}
                        >
                          Editar Contrato
                        </button>
                      </td>
                      <td
                        className={`${styles.td} ${styles.borderNoneTd}`}
                        style={{
                          backgroundColor: "#ff0000",
                          padding: "0",
                          borderBottom: "0",
                        }}
                        onMouseEnter={() =>
                          handleTdMouseEnter(index, "eliminarcontrato")
                        }
                        onMouseLeave={punteroSinHover}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClickId(
                            datosGet.id_contrato,
                            "eliminarcontrato"
                          );
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "#ff0000",
                            width: "100%",
                            height: "4.1rem",
                            margin: "0px",
                            padding: "1rem",
                            color: "#000000",
                          }}
                        >
                          Eliminar Contrato
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table className={`tabla ${styles.tabla}`}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>Seguro Demandado</th>
                <th className={styles.th}>Tipo de Seguro Demandado</th>
                <th className={styles.th}>Fecha de Emisión</th>
              </tr>
            </thead>
            <tbody className={`${styles.tbody} ${styles.cuerpoTabla}`}>
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    height: "15rem",
                    fontSize: "40px",
                  }}
                >
                  <p style={{ wordBreak: "break-word" }}>
                    Sin Resultados Para: &quot;
                    {textFiltrado.length > 16
                      ? `${textFiltrado.substring(0, 16)}...`
                      : textFiltrado}
                    &quot;
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export { ListadoSeguros };
