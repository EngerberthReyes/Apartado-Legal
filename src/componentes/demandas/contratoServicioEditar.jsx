import styles from "../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const ContratoServivioEditar = ({
  elementoSeleccionado,
  actualizarVisibilidadContenedor,
  aparecerOpciones,
  obtenerValorTipoContrato,
  obtenerValorServicio,
  obtenerValorSeguro,
  handleChange,
  handleChangeUno,
  handleChangeDos,
  agregarNombreServicio,
  opcionServicio,
  redireccionarNuevoContrato,
  editar,
  specialActivo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [representanteLegal, setRepresentanteLegal] = useState([]);
  const [metodoPago, setMetodoPago] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setservicioSeleccionado] = useState(
    "Servicio No Seleccionado"
  );
  const [RepresentanteLegalSeleccionado, setRepresentanteLegalSeleccionado] =
    useState("Sin Firmar");
  const [isLoading, setIsLoading] = useState(false);

  const manejadorDeRepresentante = (event) => {
    if (event.target.value === "Seleccione") {
      setRepresentanteLegalSeleccionado("Sin Firmar");
    } else {
      setRepresentanteLegalSeleccionado(event.target.value);
    }
  };

  const fetchData = async (opcionServicio) => {
    setIsLoading(true);
    try {
      const metodoPagoUrl = "http://localhost:3000/api/ctss_metodo_pago";
      const responseMetodoPago = await axios.get(metodoPagoUrl);
      const resultadoMetodoPago = responseMetodoPago.data;
      if (opcionServicio === "Hospedaje") {
        const urlServicios = `http://localhost:3000/api/ctss_tipos_servicios/${1}`;

        const responseServicio = await axios.get(urlServicios);

        const resultadoObjetoServicio = responseServicio.data;

        setServicios(resultadoObjetoServicio);
      }

      if (opcionServicio === "Transporte") {
        const urlServicios = `http://localhost:3000/api/ctss_tipos_servicios/${2}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${2}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setServicios(resultadoObjetoServicio);
      }

      setMetodoPago(resultadoMetodoPago);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(opcionServicio);
  }, [opcionServicio]);

  const handleServiceChange = async (event) => {
    if (event.target.value === "Seleccione") {
      setservicioSeleccionado("Servicio No Seleccionado");
    } else {
      setservicioSeleccionado(event.target.value);
      const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${event.target.value}`;
      console.log(urlRepresentantes);
      const responseRepresentante = await axios.get(urlRepresentantes);
      const resultadoObjetoRepresentante = responseRepresentante.data;
      setRepresentanteLegal(resultadoObjetoRepresentante);
    }
  };
  const [id, setId] = useState(null);

  useEffect(() => {
    if (editar.length > 0) {
      setId(editar[0].id_contrato);
    }
  }, [editar]);

  const onSubmit = async (datosEditados) => {
    try {
      console.log(datosEditados);
      let a = await axios.put(
        `http://localhost:3000/api/ctss_contratos/${id}`,
        datosEditados
      );
      fetchData();
      handleClick();
    } catch {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section
          className={`contratoServicio ${stylesContrato.contenedorInformacion}`}
          style={{ height: "70vh", overflow: "auto" }}
        >
          <section className={stylesContrato.contenedorTitulo}>
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Contrato de Servicio
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de las Partes
            </h1>

            <p className={stylesContrato.p}>
              Prestador de Servicios:
              <select
                className={stylesContrato.opciones}
                {...register("tipo_empresa", {
                  required: {
                    value: true,
                  },
                })}
                value={servicioSeleccionado}
                onChange={handleServiceChange}
              >
                <option>Seleccione</option>
                {elementoSeleccionado.map((datosGet, index) => (
                  <option
                    key={datosGet.id_empresa || index}
                    value={datosGet.razon_social}
                  >
                    {datosGet.razon_social}
                  </option>
                ))}
              </select>
            </p>
            <p className={stylesContrato.p} defaultValue={opcionServicio}>
              Tipo de Servicio:
              <select
                className={stylesContrato.opciones}
                {...register("tipo_contrato", {
                  required: {
                    value: true,
                  },
                })}
              >
                {elementoSeleccionado.map((datosGet, index) => (
                  <option
                    key={datosGet.id_empresa || index}
                    value={datosGet.tipo_contrato}
                  >
                    <option value={datosGet.tipo_contrato}>
                      {datosGet.tipo_contrato}
                    </option>
                  </option>
                ))}
              </select>
            </p>
            <p className={stylesContrato.p}>
              Representante Legal:
              <select
                className={stylesContrato.opciones}
                {...register("firma_representante_legal", {
                  required: {
                    value: true,
                  },
                })}
                value={RepresentanteLegalSeleccionado}
                onChange={manejadorDeRepresentante}
              >
                <option>Seleccione</option>
                {representanteLegal.map((datosGet, index) => (
                  <>
                    <option
                      key={datosGet.id_representante_legal || index}
                      value={`${datosGet.nombre}`}
                    >{`${datosGet.nombre}`}</option>
                  </>
                ))}
              </select>
            </p>
            <p className={stylesContrato.p}>
              Empresa que optará por el Servicio: Paquetes Turísticos
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
                <li>Limpieza.</li>
                <li>Servicio al cliente.</li>
                <li>Seguridad.</li>
              </ul>
              <p className={stylesContrato.p}>
                Este contrato de servicios de hospedaje se aplica a
                <span
                  className={stylesContrato.p}
                  style={{
                    display: "inline-block",
                    margin: "0 .5rem",
                    ...(servicioSeleccionado === "Servicio No Seleccionado"
                      ? {
                          color: "red",
                          background: "yellow",
                          borderRadius: "10px",
                          padding: "0  5px",
                        }
                      : {}),
                  }}
                >
                  {servicioSeleccionado}
                </span>
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula II: Alcance y Resultados Esperados
              </h1>
              <ul>
                <p className={stylesContrato.p}>
                  Los resultados que se esperaran del servicio de hospedaje son:
                </p>
                <li>
                  Alojamiento: El Prestador proporcionará habitaciones limpias y
                  bien mantenidas para los huéspedes. Las habitaciones estarán
                  equipadas con todas las comodidades necesarias, incluyendo
                  cama cómoda, televisión, aire acondicionado y Wifi gratuito.
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
                Cláusula III: Capacidad Máxima de Personas en el Servicio
              </h1>
              <p className={stylesContrato.p}>
                Este servicio ofrece una capacidad máxima de personas a alojar
                en el Hotel o Residencia es de:
                <input
                  className={stylesContrato.inputTexto}
                  type="number"
                  min="0"
                  {...register("cantidad_persona", {
                    required: {
                      value: true,
                    },
                  })}
                />
                .
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula IV: Obligaciones de las Partes
              </h1>
              <p className={stylesContrato.p}>
                Ambas partes se comprometen a cumplir con las obligaciones
                descritas en el presente contrato.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula V: Forma de Pago
              </h1>

              <p className={stylesContrato.p}>
                El Servicio acuerda realizar los pagos a través
                <select
                  {...register("id_metodo_pago", {
                    required: {
                      value: true,
                    },
                  })}
                  className={stylesContrato.opciones}
                >
                  <option>Métodos de Pago</option>
                  <option value={"Transferencia"}>Transferencia</option>
                  <option value={"Divisas"}>Divisas</option>
                </select>
                con un costo de
                <input
                  min="0"
                  className={stylesContrato.inputTexto}
                  type="number"
                  placeholder="Costo del Servicio"
                  {...register("costo", {
                    required: {
                      value: true,
                    },
                  })}
                />
                $.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula VI: Vigencia del Servicio
              </h1>
              <p className={stylesContrato.p}>
                Este Servicio destinado a {opcionServicio} tendrá una duración
                de vigencia desde el
                <input
                  className={stylesContrato.inputTexto}
                  {...register("fecha_inicio", {
                    required: {
                      value: true,
                    },
                  })}
                  type="date"
                />
                hasta el
                <input
                  className={stylesContrato.inputTexto}
                  type="date"
                  {...register("fecha_fin", {
                    required: {
                      value: true,
                    },
                  })}
                />
                .
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Cláusula VII: Cláusulas de Incumplimiento
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
                <p
                  className={stylesContrato.p}
                  style={{
                    fontSize: "24px",
                    textAlign: "center",
                    ...(RepresentanteLegalSeleccionado === "Sin Firmar"
                      ? {
                          color: "red",
                          background: "yellow",
                          borderRadius: "10px",
                          padding: "0 5px",
                        }
                      : {}),
                  }}
                >
                  {RepresentanteLegalSeleccionado}
                </p>

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
                  {...register("firma_paquete_turistico", {
                    required: {
                      value: true,
                    },
                  })}
                />
                <p
                  className={stylesContrato.p}
                  style={{ textAlign: "center", fontSize: "23px" }}
                >
                  Firma del Representante de Paquetes Turísticos
                </p>
              </section>
            </section>
          </section>
          <section
            className={stylesContrato.sectionParteUno}
            style={{
              marginTop: "2rem",
              display: "grid",
              placeItems: "center",
            }}
          >
            <button
              className={`${stylesContrato.boton} ${stylesContrato.botonHoverVerde}`}
              style={{ textAlign: "center", width: "14rem" }}
              type="submit"
            >
              Guardar Cambios
            </button>
          </section>
        </section>
      </form>
    </>
  );
};

export { ContratoServivioEditar };
