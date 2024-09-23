import { useState, useEffect, useRef } from "react";
import styles from "../../app/contratos/styles-contratos.module.css";
import BuscadorDemandas from "../buscadorDemandas.jsx";
import LoadingLista from "../loadingLista.jsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const ListadoDemandas = ({ redireccionarNuevaDemanda, buttonText }) => {
  const enrutadorUrl = useRouter();
  const [xd, setXd] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const url = "http://localhost:3000/api/ctss_demandas";
      const response = await axios.get(url);
      const resultadoObjeto = response.data.map((datosGet) => {
        if (datosGet.fecha_de_emision) {
          const fechaCompleta = datosGet.fecha_de_emision;
          const fechaSinHora = fechaCompleta.split("T")[0];
          const partesFecha = fechaSinHora.split("-");
          datosGet.fecha_de_emision = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
        }
        return datosGet;
      });
      setXd(resultadoObjeto);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [textFiltrado, setTextosFiltrados] = useState("");

  const textosFiltrados = (cosas) => {
    setTextosFiltrados(cosas);
  };

  const [elementosFiltradosAceptados, setElementosFiltrados] = useState([]);

  const filtrarElementos = () => {
    const elementosFiltrados = xd.filter(
      (elemento) =>
        elemento.servicio_demandado
          .toLowerCase()
          .includes(textFiltrado.toLowerCase()) ||
        elemento.tipo_de_servicio_demandado
          .toLowerCase()
          .includes(textFiltrado.toLowerCase()) ||
        elemento.fecha_de_emision
          .toLowerCase()
          .includes(textFiltrado.toLowerCase())
    );

    setElementosFiltrados(elementosFiltrados);
    console.log(elementosFiltrados);
  };

  useEffect(() => {
    filtrarElementos();
  }, [xd, textFiltrado]);

  return (
    <>
      <section className={styles.contenedorGeneral}>
        <section className={styles.contenedorGeneralDos}>
          <section className={styles.contenedorInformacion}>
            <section className={styles.contenedorTitulo}>
              <h1
                className={styles.tituloContratos}
                style={{ marginRight: "2rem" }}
              >
                Nueva Demanda [Servicios y Seguros]
              </h1>
              <button
                className={styles.boton}
                onClick={redireccionarNuevaDemanda}
                style={{ width: "22rem", height: "4rem" }}
              >
                {buttonText}
              </button>
            </section>
            <section className={styles.contenedorActualizador}>
              <button
                className={styles.boton}
                style={{
                  width: "16rem",
                  height: "4rem",
                  textWrap: "pretty",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={fetchData}
              >
                Actualizar Lista de Demandas
              </button>

              <BuscadorDemandas textosFiltrados={textosFiltrados} />
            </section>
            {isLoading ? (
              <section
                style={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
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
                <table
                  className={`tabla ${styles.tabla}`}
                  style={{ position: "relative" }}
                >
                  <thead className={styles.thead}>
                    <tr className={styles.tr}>
                      <th className={styles.th}>Empresa Damandada</th>
                      <th className={styles.th}>Tipo de Servicio Demandado</th>
                      <th className={styles.th}>Tipo de Incidente Ocurrido</th>
                      <th className={styles.th}>Fecha de Emision</th>
                    </tr>
                  </thead>
                  <tbody className={`${styles.tbody} ${styles.cuerpoTabla}`}>
                    {elementosFiltradosAceptados.map((datosGet, index) => (
                      <>
                        <tr className={styles.tr} key={index}>
                          <td className={`${styles.td} ${styles.borderNoneTd}`}>
                            {datosGet.servicio_demandado}
                          </td>
                          <td className={`${styles.td} ${styles.borderNoneTd}`}>
                            {datosGet.fecha_de_emision}
                          </td>
                          <td className={`${styles.td} ${styles.borderNoneTd}`}>
                            {datosGet.fecha_de_emision}
                          </td>
                          <td className={`${styles.td} ${styles.borderNoneTd}`}>
                            {datosGet.fecha_de_emision}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : !isLoading && xd.length === 0 ? (
              <>
                <section
                  style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                  }}
                >
                  <table
                    className={`tabla ${styles.tabla}`}
                    style={{ position: "relative" }}
                  >
                    <thead className={styles.thead}>
                      <tr className={styles.tr}>
                        <th className={styles.th}>Empresa Damandada</th>
                        <th className={styles.th}>
                          Tipo de Servicio Demandado
                        </th>
                        <th className={styles.th}>
                          Tipo de Incidente Ocurrido
                        </th>
                        <th className={styles.th}>Fecha de Emision</th>
                      </tr>
                    </thead>
                    <tbody className={styles.cuerpoTabla}>
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            height: "15rem",
                            fontSize: "40px",
                          }}
                        >
                          Sin Registro de Demandas...
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
                    <tr className={styles.tr}>
                      <th className={styles.th}>Empresa Damandada</th>
                      <th className={styles.th}>Tipo de Servicio Demandado</th>
                      <th className={styles.th}>Tipo de Incidente Ocurrido</th>
                      <th className={styles.th}>Fecha de Emision</th>
                    </tr>
                  </thead>
                  <tbody className={`${styles.tbody} ${styles.cuerpoTabla}`}>
                    {elementosFiltradosAceptados.map((datosGet, index) => (
                      <tr className={styles.tr} key={index}>
                        <td className={`${styles.td} ${styles.borderNoneTd}`}>
                          {datosGet.servicio_demandado}
                        </td>
                        <td className={`${styles.td} ${styles.borderNoneTd}`}>
                          {datosGet.tipo_de_servicio_demandado}
                        </td>
                        <td className={`${styles.td} ${styles.borderNoneTd}`}>
                          {datosGet.fecha_de_emision}
                        </td>
                        <td className={`${styles.td} ${styles.borderNoneTd}`}>
                          {datosGet.fecha_de_emision}
                        </td>
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
                      <th className={styles.th}>Empresa Damandada</th>
                      <th className={styles.th}>Tipo de Servicio Demandado</th>
                      <th className={styles.th}>Tipo de Incidente Ocurrido</th>
                      <th className={styles.th}>Fecha de Emision</th>
                    </tr>
                  </thead>
                  <tbody className={`${styles.tbody} ${styles.cuerpoTabla}`}>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          height: "15rem",
                          fontSize: "40px",
                        }}
                      >
                        <p style={{ wordBreak: "break-word" }}>
                          Sin Resultados Para: &quot
                          {textFiltrado.length > 16
                            ? `${textFiltrado.substring(0, 16)}...`
                            : textFiltrado}
                          &quot
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default ListadoDemandas;
