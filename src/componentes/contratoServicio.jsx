"use client";
import styles from "../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NotificacionCreacion } from "./notificaciones/notificaciones-amarillas.jsx";

const ContratoServicio = ({
  redireccionarContratos,
  redireccionarDemandas,
  actualizarVisibilidadContenedor,
  contratoSeguroDom,
  contratoServicioDom,
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
  setOpcionSeleccionada,
  setOpcionServicio,
  loadingData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [fechaActual, setFechaActual] = useState("");

  useEffect(() => {
    const fechaHoy = new Date().toISOString().split("T")[0];
    setFechaActual(fechaHoy);
  }, []);

  const [representanteLegal, setRepresentanteLegal] = useState([]);
  const [metodoPago, setMetodoPago] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setservicioSeleccionado] = useState(
    "Servicio No Seleccionado"
  );
  const [RepresentanteLegalSeleccionado, setRepresentanteLegalSeleccionado] =
    useState("Sin Firmar");
  const [isLoading, setIsLoading] = useState(false);
  const [nombreImagen, setNombreImagen] = useState();
  const [imagen, setImagen] = useState();
  const [imagenAgregada, setImagenAgregada] = useState();

  const [nombreImagenDos, setNombreImagenDos] = useState();
  const [imagenDos, setImagenDos] = useState();
  const [imagenAgregadaDos, setImagenAgregadaDos] = useState();
  const [verificador, setVerificador] = useState(false);
  const [especialActivoA, setEspecialActivoA] = useState(false);

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
      } else if (opcionServicio === "Transporte") {
        const urlServicios = `http://localhost:3000/api/ctss_tipos_servicios/${2}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${2}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setServicios(resultadoObjetoServicio);
      } else if (opcionServicio === "Restaurante (Alimentacion)") {
        const urlServicios = `http://localhost:3000/api/ctss_tipos_servicios/${3}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${3}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setServicios(resultadoObjetoServicio);
      } else {
        setRepresentanteLegal([]);
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

  const xd = () => {
    setVerificador(true);
    setEspecialActivoA(true);
  };

  const onSubmit = async (datos) => {
    if (representanteLegal.length > 0 && imagenDos) {
      try {
        xd();
        const urlContrato = "http://localhost:3000/api/ctss_contratos";

        const formularioImagen = new FormData();

        formularioImagen.append("file", imagenDos);

        console.log(imagenDos);

        const urlSubidaImagen =
          "http://localhost:3000/api/ctss_contratos_imagenes";

        const resolverPeticion = await axios.post(
          urlSubidaImagen,
          formularioImagen,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const datosRecibidos = {
          ...datos,
          firma_paquete_turistico: `http://localhost:3000/${imagenDos.name}`,
          tipo_contrato: opcionServicio,
        };
        console.log(datosRecibidos);
        const responseServicio = await axios.post(urlContrato, datosRecibidos);
      } catch (error) {
        console.error(error);
      } finally {
        setEspecialActivoA(false);
        setVerificador(false);
        setImagenAgregada(null);
        setImagenAgregadaDos(null);
        setOpcionServicio("Tipo de Servicio");
        actualizarVisibilidadContenedor(contratoServicioDom, false);
        actualizarVisibilidadContenedor(contratoSeguroDom, false);
        reset();
        loadingData();
        setImagenDos("");
        redireccionarNuevoContrato();
      }
    } else {
      alert("Paquetes Turisticos Aún No Ha Firmado..");
    }
  };

  const obtenerImagen = (event, identificador) => {
    const archivo = event.target.files[0];
    const nombreImage = archivo.name;

    if (identificador === 2) {
      setImagenDos(archivo);
      setNombreImagenDos(nombreImage);
      const obtenerImagenValorDos = URL.createObjectURL(archivo);
      setImagenAgregadaDos(obtenerImagenValorDos);
    } else if (identificador === 1) {
      setImagen(archivo);
      setNombreImagen(nombreImage);
      const obtenerImagenValor = URL.createObjectURL(archivo);
      setImagenAgregada(obtenerImagenValor);
    }
  };

  const funcionReset = () => {
    setImagenAgregada(null);
    setImagenAgregadaDos(null);
    setOpcionServicio(null);
    actualizarVisibilidadContenedor(contratoServicioDom, false);
    actualizarVisibilidadContenedor(contratoSeguroDom, false);
    reset();
    redireccionarNuevoContrato();
  };

  return (
    <>
      <section
        className={`contratoServicio ${stylesContrato.contenedorInformacion} ${stylesContrato.desaparecerContenedor}`}
      >
        <NotificacionCreacion
          weaActivaCreacion={verificador}
          estatusActivo={especialActivoA}
        />
        {opcionServicio === "Hospedaje" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={stylesContrato.contenedorTitulo}>
              <h1
                className={stylesContrato.tituloHeader}
                style={{ marginTop: "0px" }}
              >
                Contrato Para Servicios de Hospedajes
              </h1>
            </section>

            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Identificación de las Partes
              </h1>

              <p className={stylesContrato.p}>
                Prestadores del Servicio de Hospedaje:
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
                  {servicios.map((datosGet, index) => (
                    <option
                      key={datosGet.id_empresa || index}
                      value={datosGet.razon_social}
                    >
                      {datosGet.razon_social}
                    </option>
                  ))}
                </select>
              </p>
              <p className={stylesContrato.p}>
                Tipo de Servicio: {`${opcionServicio}`}
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
            {RepresentanteLegalSeleccionado !== "Sin Firmar" && (
              <>
                <section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula I: Bases del Servicio
                    </h1>

                    <p className={stylesContrato.p}>
                      El Prestador se compromete a proporcionar servicios de
                      hospedaje de alta calidad para los huéspedes. Los
                      servicios de hospedaje incluyen:
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
                          ...(servicioSeleccionado ===
                          "Servicio No Seleccionado"
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
                        Los resultados que se esperaran del servicio de
                        hospedaje son:
                      </p>
                      <li>
                        Alojamiento: El Prestador proporcionará habitaciones
                        limpias y bien mantenidas para los huéspedes. Las
                        habitaciones estarán equipadas con todas las comodidades
                        necesarias, incluyendo cama cómoda, televisión, aire
                        acondicionado y Wifi gratuito.
                      </li>
                      <li>
                        Limpieza: El Prestador se compromete a mantener las
                        habitaciones y las áreas comunes del alojamiento limpias
                        y ordenadas.
                      </li>
                      <li>
                        Servicio al cliente: El Prestador proporcionará un
                        servicio al cliente amigable y eficiente para responder
                        a cualquier pregunta o inquietud que los huéspedes
                        puedan tener.
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
                      Este servicio ofrece una cantidad máxima de personas a
                      alojar en el Hotel o Residencia es de:
                      <input
                        placeholder="Cantidad Maxima de Personas"
                        className={stylesContrato.inputTexto}
                        type="number"
                        min="0"
                        {...register("cantidad_persona", {
                          required: {
                            value: true, // Indica que el campo es requerido
                            message: "Introduzca la Cantidad de Personas",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                      />
                      .
                    </p>
                  </section>
                  {errors.cantidad_persona && (
                    <p className={stylesContrato.errorInput}>
                      {errors.cantidad_persona.message}
                    </p>
                  )}
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
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                        className={stylesContrato.opciones}
                      >
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
                            message: "Introduzca El Costo del Servicio",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                      />
                      $.
                    </p>
                    {errors.costo && (
                      <p className={stylesContrato.errorInput}>
                        {errors.costo.message}
                      </p>
                    )}
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula VI: Vigencia del Servicio
                    </h1>
                    <p className={stylesContrato.p}>
                      Este Servicio destinado a {opcionServicio} tendrá una
                      duración de vigencia desde el
                      <input
                        className={stylesContrato.inputTexto}
                        id="fecha_inicio"
                        {...register("fecha_inicio", {
                          required: "Introduzca La Fecha de Inicio",
                          validate: {
                            fechaMenor: (valor) => {
                              const fechaInicio = new Date(valor);
                              const fechaFin = new Date(
                                document.getElementById("fecha_fin").value
                              );
                              return (
                                fechaInicio <= fechaFin ||
                                "La fecha de inicio no puede ser mayor que la fecha de fin"
                              );
                            },
                          },
                        })}
                        min={fechaActual}
                        type="date"
                      />{" "}
                      hasta el{" "}
                      <input
                        id="fecha_fin"
                        className={stylesContrato.inputTexto}
                        {...register("fecha_fin", {
                          required: "Introduzca La Fecha de Fin",
                          validate: {
                            fechaMayor: (valor) => {
                              const fechaFin = new Date(valor);
                              const fechaInicio = new Date(
                                document.getElementById("fecha_inicio").value
                              );
                              return (
                                fechaFin >= fechaInicio ||
                                "La fecha de fin no puede ser menor que la fecha de inicio"
                              );
                            },
                          },
                        })}
                        min={fechaActual}
                        type="date"
                      />
                      .
                    </p>
                    {errors.fecha_inicio && (
                      <p className={stylesContrato.errorInput}>
                        {errors.fecha_inicio.message}
                      </p>
                    )}
                    {errors.fecha_fin && (
                      <p className={stylesContrato.errorInput}>
                        {errors.fecha_fin.message}
                      </p>
                    )}
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula VII: Cláusula de Incumplimiento
                    </h1>
                    <p className={stylesContrato.p}>
                      En caso de incumplimiento del contrato por parte del
                      Prestador, se aplicarán las siguientes sanciones: Demandas
                      por incumplimiento de las cláusulas anteriormente dichas.
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
                      {representanteLegal.length > 0 &&
                      representanteLegal[0] &&
                      representanteLegal[0].firma_representante_legal ? (
                        <Image
                          src={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : ""
                          }
                          alt={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : "Sin Imagen"
                          }
                          title={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : "Sin Imagen"
                          }
                          width={350}
                          height={350}
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow:
                              "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                            marginBottom: "10px",
                          }}
                        />
                      ) : null}

                      <p
                        className={stylesContrato.p}
                        style={{
                          textAlign: "center",
                          fontSize: "23px",
                          wordBreak: "break-word",
                        }}
                      >
                        Firma del Representante Legal
                      </p>
                    </section>
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      {imagenAgregadaDos && (
                        <Image
                          src={imagenAgregadaDos ? imagenAgregadaDos : ""}
                          alt={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
                          title={
                            nombreImagenDos ? nombreImagenDos : "Sin Imagen"
                          }
                          width={350}
                          height={350}
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow:
                              "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <section
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <input
                          accept=".png, .jpg, .jpeg"
                          className={stylesContrato.inputTexto}
                          style={{
                            position: "absolute",
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            top: 0,
                            left: 0,
                            zIndex: -10,
                          }}
                          onChange={(event) => obtenerImagen(event, 2)}
                          id="ImagenDos"
                          type="file"
                        />
                        <label
                          className={stylesContrato.boton}
                          style={{
                            width: "18rem",
                            boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            wordBreak: "break-word",
                            zIndex: 100,
                          }}
                          htmlFor="ImagenDos"
                        >
                          Firma de Paquetes Turísticos
                        </label>
                      </section>

                      <p
                        className={stylesContrato.p}
                        style={{
                          textAlign: "center",
                          fontSize: "23px",
                          wordBreak: "break-word",
                        }}
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
                  <section
                    className={stylesContrato.contenedorFirma}
                    style={{ columnGap: "2rem", wordBreak: "break-all" }}
                  >
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverVerde}`}
                        style={{ textAlign: "center", width: "14rem" }}
                        type="submit"
                      >
                        Contratar Servicio
                      </button>
                    </section>
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                        style={{ textAlign: "center", width: "14rem" }}
                        type="button"
                        onClick={funcionReset}
                      >
                        Cancelar Contrato
                      </button>
                    </section>
                  </section>
                </section>
              </>
            )}
          </form>
        )}

        {opcionServicio === "Transporte" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={stylesContrato.contenedorTitulo}>
              <h1
                className={stylesContrato.tituloHeader}
                style={{ marginTop: "0px" }}
              >
                Contrato Para Servicios de Transportes
              </h1>
            </section>

            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Identificación de las Partes
              </h1>

              <p className={stylesContrato.p}>
                Prestadores del Servicio de Transporte:
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
                  {servicios.map((datosGet, index) => (
                    <option
                      key={datosGet.id_empresa || index}
                      value={datosGet.razon_social}
                    >
                      {datosGet.razon_social}
                    </option>
                  ))}
                </select>
              </p>
              <p className={stylesContrato.p}>
                Tipo de Servicio: {`${opcionServicio}`}
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
            {RepresentanteLegalSeleccionado !== "Sin Firmar" && (
              <>
                <section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula I: Bases del Servicio
                    </h1>

                    <p className={stylesContrato.p}>
                      El Transportista se compromete a proporcionar servicios de
                      transporte seguros y eficientes para los pasajeros. Los
                      servicios de transporte incluyen:
                    </p>
                    <ul>
                      <li>
                        Transporte terrestre/aéreo/marítimo (según corresponda).
                      </li>
                      <li>Seguridad durante el viaje.</li>
                      <li>Comodidad para los pasajeros.</li>
                      <li>Puntualidad en los horarios de salida y llegada.</li>
                      <li>
                        Asistencia en caso de necesidades especiales de los
                        pasajeros (si aplica).
                      </li>
                    </ul>

                    <p className={stylesContrato.p}>
                      Este contrato de servicios de transporte se aplica a
                      <span
                        className={stylesContrato.p}
                        style={{
                          display: "inline-block",
                          margin: "0 .5rem",
                          ...(servicioSeleccionado ===
                          "Servicio No Seleccionado"
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
                        Los resultados esperados del servicio de transporte son:
                      </p>
                      <li>
                        Transporte seguro: El Transportista proporcionará un
                        transporte seguro y confiable para los pasajeros,
                        garantizando condiciones óptimas de viaje y respetando
                        las normas de tráfico y seguridad.
                      </li>
                      <li>
                        Puntualidad: El Transportista se compromete a cumplir
                        con los horarios de salida y llegada establecidos,
                        asegurando que los pasajeros lleguen a su destino a
                        tiempo.
                      </li>
                      <li>
                        Comodidad: Se ofrecerá un ambiente cómodo y agradable
                        durante el viaje, asegurando que los pasajeros viajen en
                        condiciones confortables y con acceso a servicios
                        básicos como aire acondicionado y asientos ergonómicos.
                      </li>
                      <li>
                        Atención al cliente: El Transportista proporcionará un
                        servicio al cliente profesional y cortés, atendiendo
                        cualquier consulta o necesidad que los pasajeros puedan
                        tener durante el viaje.
                      </li>
                    </ul>
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula III: Capacidad Máxima de Personas en el Servicio
                    </h1>
                    <p className={stylesContrato.p}>
                      Este servicio ofrece una cantidad máxima de personas a
                      alojar en el medio transporte o vehiculo en el cual se
                      transportara a los pasajeros es de:
                      <input
                        placeholder="Cantidad Maxima de Personas"
                        className={stylesContrato.inputTexto}
                        type="number"
                        min="0"
                        {...register("cantidad_persona", {
                          required: {
                            value: true,
                            message: "Introduzca la Cantidad de Personas",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se Permiten Números",
                          },
                        })}
                      />
                      .
                    </p>
                    {errors.cantidad_persona && (
                      <p className={stylesContrato.errorInput}>
                        {errors.cantidad_persona.message}
                      </p>
                    )}
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
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                        className={stylesContrato.opciones}
                      >
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
                            message: "Introduzca El Costo del Servicio",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                      />
                      $.
                    </p>
                    {errors.costo && (
                      <p className={stylesContrato.errorInput}>
                        {errors.costo.message}
                      </p>
                    )}
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula VI: Vigencia del Servicio
                    </h1>
                    <p className={stylesContrato.p}>
                      Este Servicio destinado a {opcionServicio} tendrá una
                      duración de vigencia desde el
                      <input
                        className={stylesContrato.inputTexto}
                        id="fecha_inicio"
                        {...register("fecha_inicio", {
                          required: "Introduzca La Fecha de Inicio",
                          validate: {
                            fechaMenor: (valor) => {
                              const fechaInicio = new Date(valor);
                              const fechaFin = new Date(
                                document.getElementById("fecha_fin").value
                              );
                              return (
                                fechaInicio <= fechaFin ||
                                "La fecha de inicio no puede ser mayor que la fecha de fin"
                              );
                            },
                          },
                        })}
                        min={fechaActual}
                        type="date"
                      />{" "}
                      hasta el{" "}
                      <input
                        id="fecha_fin"
                        className={stylesContrato.inputTexto}
                        {...register("fecha_fin", {
                          required: "Introduzca La Fecha de Fin",
                          validate: {
                            fechaMayor: (valor) => {
                              const fechaFin = new Date(valor);
                              const fechaInicio = new Date(
                                document.getElementById("fecha_inicio").value
                              );
                              return (
                                fechaFin >= fechaInicio ||
                                "La fecha de fin no puede ser menor que la fecha de inicio"
                              );
                            },
                          },
                        })}
                        min={fechaActual}
                        type="date"
                      />
                      .
                    </p>
                    {errors.fecha_inicio && (
                      <p className={stylesContrato.errorInput}>
                        {errors.fecha_inicio.message}
                      </p>
                    )}
                    {errors.fecha_fin && (
                      <p className={stylesContrato.errorInput}>
                        {errors.fecha_fin.message}
                      </p>
                    )}
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula VII: Cláusulas de Incumplimiento
                    </h1>
                    <p className={stylesContrato.p}>
                      En caso de incumplimiento del contrato por parte del
                      Prestador, se aplicarán las siguientes sanciones: Demandas
                      por incumplimiento de las cláusulas anteriormente dichas.
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
                      {representanteLegal.length > 0 &&
                      representanteLegal[0] &&
                      representanteLegal[0].firma_representante_legal ? (
                        <Image
                          src={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : ""
                          }
                          alt={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : "Sin Imagen"
                          }
                          title={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : "Sin Imagen"
                          }
                          width={350}
                          height={350}
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow:
                              "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                            marginBottom: "10px",
                          }}
                        />
                      ) : null}

                      <p
                        className={stylesContrato.p}
                        style={{
                          textAlign: "center",
                          fontSize: "23px",
                          wordBreak: "break-word",
                        }}
                      >
                        Firma del Representante Legal
                      </p>
                    </section>
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      {imagenAgregadaDos && (
                        <Image
                          src={imagenAgregadaDos ? imagenAgregadaDos : ""}
                          alt={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
                          title={
                            nombreImagenDos ? nombreImagenDos : "Sin Imagen"
                          }
                          width={350}
                          height={350}
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow:
                              "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <section
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <input
                          accept=".png, .jpg, .jpeg"
                          className={stylesContrato.inputTexto}
                          style={{
                            position: "absolute",
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            top: 0,
                            left: 0,
                            zIndex: -10,
                          }}
                          onChange={(event) => obtenerImagen(event, 2)}
                          id="ImagenDos"
                          type="file"
                        />
                        <label
                          className={stylesContrato.boton}
                          style={{
                            width: "18rem",
                            boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            wordBreak: "break-word",
                            zIndex: 100,
                          }}
                          htmlFor="ImagenDos"
                        >
                          Firma de Paquetes Turísticos
                        </label>
                      </section>
                      <p
                        className={stylesContrato.p}
                        style={{
                          textAlign: "center",
                          fontSize: "23px",
                          wordBreak: "break-word",
                        }}
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
                  <section
                    className={stylesContrato.contenedorFirma}
                    style={{ columnGap: "2rem", wordBreak: "break-all" }}
                  >
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverVerde}`}
                        style={{ textAlign: "center", width: "14rem" }}
                        type="submit"
                      >
                        Contratar Servicio
                      </button>
                    </section>
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                        style={{ textAlign: "center", width: "14rem" }}
                        type="button"
                        onClick={funcionReset}
                      >
                        Cancelar Contrato
                      </button>
                    </section>
                  </section>
                </section>
              </>
            )}
          </form>
        )}
        {opcionServicio === "Restaurante (Alimentacion)" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={stylesContrato.contenedorTitulo}>
              <h1
                className={stylesContrato.tituloHeader}
                style={{ marginTop: "0px" }}
              >
                Contrato de Servicio de Restaurante [Alimentación]
              </h1>
            </section>

            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Identificación de las Partes
              </h1>

              <p className={stylesContrato.p}>
                Prestadores del Servicio de Restaurantes [Alimentacion]:
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
                  {servicios.map((datosGet, index) => (
                    <option
                      key={datosGet.id_empresa || index}
                      value={datosGet.razon_social}
                    >
                      {datosGet.razon_social}
                    </option>
                  ))}
                </select>
              </p>
              <p className={stylesContrato.p}>
                Tipo de Servicio: {`${opcionServicio}`}
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
            {RepresentanteLegalSeleccionado !== "Sin Firmar" && (
              <>
                <section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula I: Bases del Servicio
                    </h1>

                    <p className={stylesContrato.p}>
                      El Prestador se compromete a proporcionar servicios de
                      alimentación de alta calidad para los clientes. Los
                      servicios de alimentación incluyen:
                    </p>

                    <ul>
                      <li>Suministro de alimentos y bebidas de calidad.</li>
                      <li>
                        Mantenimiento de la higiene y limpieza en todas las
                        áreas del restaurante.
                      </li>
                      <li>Atención al cliente profesional y cortés.</li>
                      <li>Garantía de seguridad alimentaria y sanitaria.</li>
                    </ul>

                    <p className={stylesContrato.p}>
                      Este contrato de servicios de restaurantes se aplica a
                      <span
                        className={stylesContrato.p}
                        style={{
                          display: "inline-block",
                          margin: "0 .5rem",
                          ...(servicioSeleccionado ===
                          "Servicio No Seleccionado"
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
                        Los resultados que se esperan del servicio de
                        restaurante de alimentación son:
                      </p>
                      <li>
                        Calidad de los alimentos: El Restaurante se compromete a
                        proporcionar alimentos de alta calidad, frescos y
                        preparados con los mejores estándares de higiene y
                        seguridad alimentaria.
                      </li>
                      <li>
                        Variedad de opciones: El Restaurante ofrecerá una amplia
                        variedad de platos y menús que satisfagan los gustos y
                        necesidades de los clientes, incluyendo opciones para
                        dietas especiales y restricciones alimentarias.
                      </li>
                      <li>
                        Servicio al cliente: El Restaurante proporcionará un
                        servicio al cliente atento y profesional, asegurando una
                        experiencia gastronómica agradable y satisfactoria para
                        todos los comensales.
                      </li>
                      <li>
                        Ambiente y limpieza: El Restaurante mantendrá un
                        ambiente limpio, acogedor y seguro para los clientes,
                        garantizando condiciones óptimas para disfrutar de la
                        comida en un entorno agradable.
                      </li>
                    </ul>
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula III: Capacidad Máxima de Personas en el Servicio
                    </h1>
                    <p className={stylesContrato.p}>
                      Este servicio ofrece una cantidad máxima de personas a
                      alojar en el restaurante es de:
                      <input
                        placeholder="Cantidad Maxima de Personas"
                        className={stylesContrato.inputTexto}
                        type="number"
                        min="0"
                        {...register("cantidad_persona", {
                          required: {
                            value: true,
                            message: "Introduzca la Cantidad de Personas",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Números",
                          },
                        })}
                      />
                      .
                    </p>
                    {errors.cantidad_persona && (
                      <p className={stylesContrato.errorInput}>
                        {errors.cantidad_persona.message}
                      </p>
                    )}
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
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                        className={stylesContrato.opciones}
                      >
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
                            message: "Introduzca El Costo del Servicio",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Solo se Permiten Letras y Números",
                          },
                        })}
                      />
                      $.
                    </p>
                    {errors.costo && (
                      <p className={stylesContrato.errorInput}>
                        {errors.costo.message}
                      </p>
                    )}
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula VI: Vigencia del Servicio
                    </h1>
                    <p className={stylesContrato.p}>
                      Este Servicio destinado a {opcionServicio} tendrá una
                      duración de vigencia desde el
                      <input
                        className={stylesContrato.inputTexto}
                        id="fecha_inicio"
                        {...register("fecha_inicio", {
                          required: "Introduzca La Fecha de Inicio",
                          validate: {
                            fechaMenor: (valor) => {
                              const fechaInicio = new Date(valor);
                              const fechaFin = new Date(
                                document.getElementById("fecha_fin").value
                              );
                              return (
                                fechaInicio <= fechaFin ||
                                "La fecha de inicio no puede ser mayor que la fecha de fin"
                              );
                            },
                          },
                        })}
                        min={fechaActual}
                        type="date"
                      />{" "}
                      hasta el{" "}
                      <input
                        id="fecha_fin"
                        className={stylesContrato.inputTexto}
                        {...register("fecha_fin", {
                          required: "Introduzca La Fecha de Fin",
                          validate: {
                            fechaMayor: (valor) => {
                              const fechaFin = new Date(valor);
                              const fechaInicio = new Date(
                                document.getElementById("fecha_inicio").value
                              );
                              return (
                                fechaFin >= fechaInicio ||
                                "La fecha de fin no puede ser menor que la fecha de inicio"
                              );
                            },
                          },
                        })}
                        min={fechaActual}
                        type="date"
                      />
                      .
                    </p>
                    {errors.fecha_inicio && (
                      <p className={stylesContrato.errorInput}>
                        {errors.fecha_inicio.message}
                      </p>
                    )}
                    {errors.fecha_fin && (
                      <p className={stylesContrato.errorInput}>
                        {errors.fecha_fin.message}
                      </p>
                    )}
                  </section>
                  <section className={stylesContrato.sectionParteUno}>
                    <h1 className={stylesContrato.tituloHeader}>
                      Cláusula VII: Cláusulas de Incumplimiento
                    </h1>
                    <p className={stylesContrato.p}>
                      En caso de incumplimiento del contrato por parte del
                      Prestador, se aplicarán las siguientes sanciones: Demandas
                      por incumplimiento de las cláusulas anteriormente dichas.
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
                      {representanteLegal.length > 0 &&
                      representanteLegal[0] &&
                      representanteLegal[0].firma_representante_legal ? (
                        <Image
                          src={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : ""
                          }
                          alt={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : "Sin Imagen"
                          }
                          title={
                            representanteLegal[0].firma_representante_legal
                              ? representanteLegal[0].firma_representante_legal
                              : "Sin Imagen"
                          }
                          width={350}
                          height={350}
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow:
                              "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                            marginBottom: "10px",
                          }}
                        />
                      ) : null}
                      <p
                        className={stylesContrato.p}
                        style={{
                          textAlign: "center",
                          fontSize: "23px",
                          wordBreak: "break-word",
                        }}
                      >
                        Firma del Representante Legal
                      </p>
                    </section>
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      {imagenAgregadaDos && (
                        <Image
                          src={imagenAgregadaDos ? imagenAgregadaDos : ""}
                          alt={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
                          title={
                            nombreImagenDos ? nombreImagenDos : "Sin Imagen"
                          }
                          width={350}
                          height={350}
                          style={{
                            borderRadius: "0.5rem",
                            boxShadow:
                              "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <section
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <input
                          accept=".png, .jpg, .jpeg"
                          className={stylesContrato.inputTexto}
                          style={{
                            position: "absolute",
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            top: 0,
                            left: 0,
                            zIndex: -10,
                          }}
                          onChange={(event) => obtenerImagen(event, 2)}
                          id="ImagenDos"
                          type="file"
                        />
                        <label
                          className={stylesContrato.boton}
                          style={{
                            width: "18rem",
                            boxShadow: "0px 0px 0.7rem 0 #eeeeee86",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            wordBreak: "break-word",
                            zIndex: 100,
                          }}
                          htmlFor="ImagenDos"
                        >
                          Firma de Paquetes Turísticos
                        </label>
                      </section>
                      <p
                        className={stylesContrato.p}
                        style={{
                          textAlign: "center",
                          fontSize: "23px",
                          wordBreak: "break-word",
                        }}
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
                  <section
                    className={stylesContrato.contenedorFirma}
                    style={{ columnGap: "2rem", wordBreak: "break-all" }}
                  >
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverVerde}`}
                        style={{ textAlign: "center", width: "14rem" }}
                        type="submit"
                      >
                        Contratar Servicio
                      </button>
                    </section>
                    <section className={stylesContrato.contenedorFirmaInterno}>
                      <button
                        className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                        style={{ textAlign: "center", width: "14rem" }}
                        type="button"
                        onClick={funcionReset}
                      >
                        Cancelar Contrato
                      </button>
                    </section>
                  </section>
                </section>
              </>
            )}
          </form>
        )}
      </section>
    </>
  );
};

export default ContratoServicio;
