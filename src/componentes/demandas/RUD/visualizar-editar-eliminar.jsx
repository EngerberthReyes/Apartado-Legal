import styles from "../../../app/contratos/styles-contratos.module.css";
import styleContenedorFixed from "../../informacionModal.module.css";
import stylesContrato from "../styles-nuevocontrato.module.css";
import { ContratoServivioPlantilla } from "../contratoServicioPlantilla.jsx";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const VisualizarContrato = ({
  visualizar,
  elementoSeleccionado,
  especialActivo,
  handleClick,
}) => {
  const teclaEscapeVisualizar = (event) => {
    if (event.key === "Escape") {
      handleClick();
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", teclaEscapeVisualizar);
    return () => {
      document.removeEventListener("keyup", teclaEscapeVisualizar);
    };
  }, [visualizar]);

  return (
    <>
      {visualizar && (
        <>
          {elementoSeleccionado.map((datosGet, index) => (
            <section
              key={index}
              className={`animate__animated ${
                especialActivo
                  ? styleContenedorFixed.sectionFixed
                  : "animate__fadeInUp"
              }`}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <section
                style={{
                  position: "relative",
                  height: "90vh",
                  overflow: "auto",
                }}
                className={`${styleContenedorFixed.sectionDisplay} ${
                  especialActivo
                    ? styleContenedorFixed.imagenCentro
                    : stylesContrato.desaparecerContenedor
                } animate__animated ${
                  especialActivo ? "animate__fadeInDown" : "animate__fadeInUp"
                }`}
              >
                <section
                  style={{
                    position: "absolute",
                    zIndex: "20",
                    top: "1rem",
                    right: "1rem",
                  }}
                >
                  <Image
                    title="Cerrar Visualizacion de Contratos [Atajo: Esc o Escape]"
                    src={"/IMG/Banner/x.png"}
                    width={46}
                    height={46}
                    style={{ cursor: "pointer" }}
                    alt="Cerrar Visualizacion de Contratos"
                    onClick={() => handleClick()}
                  />
                </section>
                <section
                  className={`${
                    especialActivo
                      ? `${styleContenedorFixed.informContenedor} ${styleContenedorFixed.especialMente}`
                      : styleContenedorFixed.informContenedor
                  }`}
                >
                  <section
                    className={`${
                      styleContenedorFixed.contenedor
                    } animate__animated ${
                      especialActivo
                        ? "animate__fadeInDown"
                        : "animate__fadeInUp"
                    }`}
                  >
                    <ContratoServivioPlantilla
                      servicios={elementoSeleccionado}
                      especialActivo={especialActivo}
                      handleClick={handleClick}
                    />
                  </section>
                </section>
              </section>
            </section>
          ))}
        </>
      )}
    </>
  );
};

const EditarContrato = ({
  editar,
  handleClick,
  especialActivo,
  loadingData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

 const fechaInicio = watch("fecha_inicio");
  const fechaFin = watch("fecha_fin");

     const [fechaActual, setFechaActual] = useState('');

 useEffect(() => {
    const fechaHoy = new Date().toISOString().split('T')[0];
    setFechaActual(fechaHoy);
 }, []);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (editar.length > 0) {
      setId(editar[0].id_contrato);
    }
  }, [editar]);

  const onSubmit = async (datosEditados) => {
    console.log(datosEditados, id)
    try {
      await axios.put(
        `http://localhost:3000/api/ctss_demandas/${id}`,
        datosEditados
      );
      handleClick();
      loadingData();
      alert("Cambios Guardados Correctamente")
    } catch (error) {
      console.error(error);
    } finally {
      reset();
    }
  };

  const teclaEscapeEditar = (event) => {
    if (event.key === "Escape") {
      handleClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", teclaEscapeEditar);
    return () => {
      document.removeEventListener("keyup", teclaEscapeEditar);
    };
  }, [editar]);

  return (
    <>
      {editar.length > 0 && (
        <>
          {editar.map((datosGet, index) => (
            <section
              key={index}
              className={`animate__animated ${
                especialActivo
                  ? styleContenedorFixed.sectionFixed
                  : "animate__fadeInUp"
              }`}
              style={{ display: especialActivo ? "" : "none" }}
            >
              <section
                style={{ position: 'relative',
height: '94vh',
overflow: 'auto' }}
                className={`${styleContenedorFixed.sectionDisplay} ${
                  especialActivo ? styleContenedorFixed.imagenCentro : ""
                } animate__animated ${
                  especialActivo ? "animate__fadeInUp" : "animate__fadeInDown"
                }`}
              >
                <section
                  style={{
                    position: "absolute",
                    zIndex: "20",
                    top: "1rem",
                    right: "1rem",
                  }}
                >
                  <Image
                    title="Cerrar Visualizacion de Contratos"
                    src={"/IMG/Banner/x.png"}
                    width={46}
                    height={46}
                    style={{ cursor: "pointer" }}
                    alt="Cerrar Visualizacion de Contratos"
                    onClick={() => handleClick()}
                  />
                </section>
                <section
                  className={`${
                    especialActivo
                      ? `${styleContenedorFixed.informContenedor} ${styleContenedorFixed.especialMente}`
                      : styleContenedorFixed.informContenedor
                  }`}
                >
                  <section
                    style={{ width: "99%" }}
                    className={`${
                      styleContenedorFixed.contenedor
                    } animate__animated ${
                      especialActivo
                        ? "animate__fadeInUp"
                        : "animate__fadeInDown"
                    }`}
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <section>
                                          <h2 style={{ marginBottom: "1rem" }}>
                        Edición de Demandas {`➡ ${datosGet.razon_social}`}
                      </h2>
                                                                <h2 style={{ marginBottom: "1rem" }}>
                        Servicio Demandado {`➡ ${datosGet.tipo_contrato}`}
                      </h2>
                                               <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Motivo de la Demanda [Explicación de lo Ocurrido]:
              </h1>
              <textarea
                              {...register("descripcion_incidente", {
                  required: {
                    value: true,
                    message: "Introduzca la Nueva Descripción del Incidente"
                  },
                })}
                className={stylesContrato.inputTexto}
                style={{ width: '100%',
                         resize: 'none',
                         padding: '0',
                         caretColor: '#0000ff',
                         fontSize: '22px',
                         minHeight: "10rem",
                         outline: 'none' }}
              />
                                                                      {errors.descripcion_incidente && (
                    <p className={stylesContrato.errorInput}>{errors.descripcion_incidente.message}</p>
                  )}
            </section>
            <section>
        <section className={stylesContrato.sectionParteUno}>
      <h1 className={stylesContrato.tituloHeader}>
        Fecha en el Cual Ocurrio el Incidente
      </h1>
      <input
        {...register("fecha_incidente", {
          required: {
            value: true,
            message: "Introduzca la Nueva Fecha del Incidente"
          },
        })}
        className={stylesContrato.inputTexto}
        type="date"
        style={{ width: "15rem", height: "4rem", fontSize: "30px" }}
      />

                                                            {errors.fecha_incidente && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_incidente.message}</p>
                  )}
                                                                </section>
                  </section>
                <section style={{ width: '100%',
display: 'flex',
alignItems: 'center',
columnGap: "4rem",
marginTop: "2rem",
justifyContent: 'center' }}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverVerde}`}
                        style={{ textAlign: "center", width: "14rem"}}
                        type="submit"
                      >
                        Guardar Cambios
                      </button>
                                            <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                        style={{ textAlign: "center", width: "14rem"}}
                        onClick={handleClick}
                      >
                        Cancelar Cambios
                      </button>
                      </section>
                        </section>
                    </form>
                  </section>
                </section>
              </section>
            </section>
          ))}
        </>
      )}
    </>
  );
};

const EliminarContrato = ({ eliminar, especialActivo }) => {
  return (
    <>
      {eliminar.length > 0 && (
        <>
          {eliminar.map((datosGet, index) => (
            <section
              key={index}
              style={{
                width: datosGet.razon_social.length < 16 ? "auto" : "",
                zIndex: "400",
              }}
              className={`animate__animated ${
                styleContenedorFixed.sectionEliminar
              } ${especialActivo ? "animate__fadeInUp" : "animate__fadeOutDown"}
        `}
            >
              <section
                className={`${
                  especialActivo
                    ? `${styleContenedorFixed.sectionInformacionEliminar} ${styleContenedorFixed.especialMente}`
                    : styleContenedorFixed.sectionInformacionEliminar
                }`}
              >
                <section
                  className={`${styleContenedorFixed.contenedor} animate__animated`}
                >
                  <h2 className={styleContenedorFixed.tituloSection}>
                    {datosGet.razon_social} Se Ha Eliminado Exitosamente.
                  </h2>
                </section>
              </section>
            </section>
          ))}
        </>
      )}
    </>
  );
};

export { VisualizarContrato, EditarContrato, EliminarContrato };