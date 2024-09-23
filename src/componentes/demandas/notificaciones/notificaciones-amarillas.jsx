import styles from "../../../app/contratos/styles-contratos.module.css";
import styleContenedorFixed from "../../informacionModal.module.css";

const NotificacionCreacion = ({ weaActivaCreacion, estatusActivo }) => {
  
    console.log(weaActivaCreacion)
    console.log(estatusActivo)
  return (
    <>
      {weaActivaCreacion ? (
        <>
          <section
            style={{
              width: "auto",
              background: "green",
              color: "white"
            }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeInUp`}
          >
            <section
              className={`${
                estatusActivo
                  ? `${styleContenedorFixed.sectionInformacionEliminar} ${styleContenedorFixed.especialMente}`
                  : styleContenedorFixed.sectionInformacionEliminar
              }`}
            >
              <section
                className={`${styleContenedorFixed.contenedor} animate__animated`}
              >
                <h2 className={styleContenedorFixed.tituloSection}>
                  La Demanda se Ha Creado con Exito
                </h2>
              </section>
            </section>
          </section>
        </>
      ) : (
        <>
          <section
            style={{
              width: "auto",
              background: "green",
              color: "white"
            }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeOutDown`}
          >
            <section
              className={`${
                estatusActivo
                  ? `${styleContenedorFixed.sectionInformacionEliminar} ${styleContenedorFixed.especialMente}`
                  : styleContenedorFixed.sectionInformacionEliminar
              }`}
            >
              <section
                className={`${styleContenedorFixed.contenedor} animate__animated`}
              >
                <h2 className={styleContenedorFixed.tituloSection}>
                  La Demanda se Ha Creado con Exito
                </h2>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};

const NotificacionVisualizar = ({ weaActiva, index, especialActivo }) => {
  console.log(index)
  return (
    <>
      {weaActiva ? (
        <>
          <section
            style={{
              width: index.length < 16 ? "auto" : "",
              background: "white",
            }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeInUp`}
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
                  Demanda a Visualizar: {index}
                </h2>
              </section>
            </section>
          </section>
        </>
      ) : (
        <>
          <section
            style={{
              width: index.length < 16 ? "auto" : "",
              background: "white",
            }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeOutDown`}
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
                  Demanda a Visualizar: {index}
                </h2>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};

const NotificacionEditar = ({ weaActivaEditar, index, especialActivo }) => {
  return (
    <>
      {weaActivaEditar ? (
        <>
          <section
            style={{ width: index.length < 16 ? "auto" : "" }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeInUp`}
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
                  Demanda a Editar: {index}
                </h2>
              </section>
            </section>
          </section>
        </>
      ) : (
        <>
          <section
            style={{ width: index.length < 16 ? "auto" : "" }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeOutDown`}
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
                  Demanda a Editar: {index}
                </h2>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};

const NotificacionEliminar = ({ weaActivaEliminar, index, especialActivo }) => {
  return (
    <>
      {weaActivaEliminar ? (
        <>
          <section
            style={{
              width: index.length < 16 ? "auto" : "",
              background: "red",
              color: "white",
            }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeInUp`}
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
                  Demanda a Eliminar: {index}
                </h2>
              </section>
            </section>
          </section>
        </>
      ) : (
        <>
          <section
            style={{
              width: index.length < 16 ? "auto" : "",
              background: "red",
              color: "white",
            }}
            className={`animate__animated ${styleContenedorFixed.sectionEliminar} animate__fadeOutDown`}
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
                  Demanda a Eliminar: {index}
                </h2>
              </section>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export { NotificacionVisualizar, NotificacionEditar, NotificacionEliminar, NotificacionCreacion };