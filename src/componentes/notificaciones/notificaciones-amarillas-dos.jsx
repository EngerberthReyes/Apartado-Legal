import styles from "../../app/contratos/styles-contratos.module.css";
import styleContenedorFixed from "../informacionModal.module.css";

const NotificacionCreacion = ({ weaActivaCreacion, estatusActivo }) => {
  return (
    <>
      {weaActivaCreacion.length > 0 ? (
        <>
          <section
            style={{
              width: "auto",
              background: "green",
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
                  El Contrato Creado Exitosamente.
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
                  El Contrato Creado Exitosamente.
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
                  Visualizar el Contrato: {index}
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
                  Visualizar el Contrato: {index}
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
                  Editar el Contrato: {index}
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
                  Editar el Contrato: {index}
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
                  Eliminar el Contrato: {index}
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
                  Eliminar el Contrato: {index}
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