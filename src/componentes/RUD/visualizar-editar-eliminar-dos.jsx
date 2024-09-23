import styles from "../../app/contratos/styles-contratos.module.css";
import styleContenedorFixed from "../informacionModal.module.css";
import stylesContrato from "../styles-nuevocontrato.module.css";
import { ContratoSeguroPlantilla } from "../contratoSeguroPlantilla.jsx";
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
                    <ContratoSeguroPlantilla
                    handleClick={handleClick}
                      servicios={elementoSeleccionado}
                      especialActivo={especialActivo}
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
    console.log(datosEditados)
    try {
      await axios.put(
        `http://localhost:3000/api/ctss_contratos/${id}`,
        datosEditados
      );
      alert("Cambios Guardados Correctamente")
      handleClick();
      loadingData();
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
                style={{ position: "relative", height: '94vh',
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
                        Edición de Contratos {`➡ ${datosGet.razon_social}`}
                      </h2>
                                                                <h2 style={{ marginBottom: "1rem" }}>
                        Tipo de Contrato {`➡ ${datosGet.tipo_contrato}`}
                      </h2>
            <section>
             <p className={stylesContrato.p}>Cantidad de Personas Estipulada en el Contrato Actual: {datosGet.cantidad_persona}</p>
                <input
                style={{ width: "46%" }}
                placeholder="Introduzca una Nueva Cantidad de Personas"
                  className={stylesContrato.inputTexto}
                  type="number"
                  min="0"
          {...register("cantidad_persona", {
                    required: {
                      value: true,
                      message: "Introduzca la Cantidad de Personas"
                    },
                  })}
                />
                                {errors.cantidad_persona && (
                    <p className={stylesContrato.errorInput}>{errors.cantidad_persona.message}</p>
                  )}
                  </section>
                  <section style={{ display: 'flex',
flexDirection: 'column',
rowGap: '1rem',
margin: '1rem 0' }}>
<p className={stylesContrato.p}>Tipo de Metodo de Pago y Costo del Servicio Estipulados en el Contrato Actualmente:</p>
<p className={stylesContrato.p}>Tipo de Metodo de Pago Actual: {datosGet.tipo_pago}</p>
                      <select 
style={{ width: '21%' }}
                            {...register("id_metodo_pago", {
                    required: {
                      value: true,
                    },
                  })}
className={stylesContrato.opciones}>
    <option value={2}>Transferencia</option>
     <option value={1}>Divisas</option>
     </select>
<p className={stylesContrato.p}>Costo del Servicio Actual: {datosGet.costo}</p>

          <input
      placeholder="Introduzca un Nuevo Valor del Costo del Servicio"
                  className={stylesContrato.inputTexto}
                  type="number"
                  min="0"
                  style={{ width: "54%" }}
          {...register("costo", {
                    required: {
                      value: true,
                      message: "Introduzca El Costo del Servicio"
                    },
                  })}
                />
                                                    {errors.costo && (
                    <p className={stylesContrato.errorInput}>{errors.costo.message}</p>
                  )}
     </section>
     <section style={{ marginBottom: "1rem" }}>
                     <p className={stylesContrato.p}>Fecha de Inicio Estipulada en el Contrato Actual: {datosGet.fecha_inicio.split("T")[0]}</p>
   <input
        id="fecha_inicio"
        className={stylesContrato.inputTexto}
        {...register("fecha_inicio", {
          required: "Introduzca La Fecha de Inicio",
          validate: {
            fechaMenor: valor => {
              const fechaInicio = new Date(valor);
              if (!fechaFin) return true;
              return fechaInicio <= new Date(fechaFin) || "La fecha de inicio no puede ser mayor que la fecha de fin";
            }
          }
        })}
        min={fechaActual}
        type="date"
      />
      {errors.fecha_inicio && (
        <p className={stylesContrato.errorInput}>{errors.fecha_inicio.message}</p>
      )}

        <p className={stylesContrato.p}>Fecha de Fin Estipulado en el Contrato Actual: {datosGet.fecha_fin.split("T")[0]}</p>
        <input
          id="fecha_fin"
          className={stylesContrato.inputTexto}
          {...register("fecha_fin", {
            required: "Introduzca La Fecha de Fin",
            validate: {
              fechaMayor: valor => {
                const fechaFin = new Date(valor);
                if (!fechaInicio) return true;
                return fechaFin >= new Date(fechaInicio) || "La fecha de fin no puede ser menor que la fecha de inicio";
              }
            }
          })}
          min={fechaActual}
          type="date"
        />
        {errors.fecha_fin && (
          <p className={stylesContrato.errorInput}>{errors.fecha_fin.message}</p>
        )}

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