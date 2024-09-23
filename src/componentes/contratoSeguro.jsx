"use client";
import styles from "../app/styles-index.module.css";
import stylesContrato from "./styles-nuevocontrato.module.css";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  NotificacionCreacion
} from "./notificaciones/notificaciones-amarillas.jsx";

const ContratoSeguro = ({
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
  opcionSeguro,
  loadingData
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

     const [fechaActual, setFechaActual] = useState('');

 useEffect(() => {
    const fechaHoy = new Date().toISOString().split('T')[0];
    setFechaActual(fechaHoy);
 }, []);

  const [representanteLegal, setRepresentanteLegal] = useState([]);
  const [metodoPago, setMetodoPago] = useState([]);
  const [seguros, setSeguros] = useState([]);
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
const [especialActivoA, setEspecialActivoA] = useState(false)      



  const manejadorDeRepresentante = (event) => {
    if (event.target.value === "Seleccione") {
      setRepresentanteLegalSeleccionado("Sin Firmar");
    } else {
      setRepresentanteLegalSeleccionado(event.target.value);
    }
  };
console.log(seguros)
  const fetchData = async (opcionSeguro) => {
    setIsLoading(true);
    try {
      const metodoPagoUrl = "http://localhost:3000/api/ctss_metodo_pago";
      const responseMetodoPago = await axios.get(metodoPagoUrl);
      const resultadoMetodoPago = responseMetodoPago.data;
      if (opcionSeguro === "Vida") {
        const urlServicios = `http://localhost:3000/api/ctss_tipos_seguros/${4}`;

        const responseServicio = await axios.get(urlServicios);

        const resultadoObjetoServicio = responseServicio.data;

        setSeguros(resultadoObjetoServicio);
      } else if (opcionSeguro === "Seguro Transporte") {
        const urlServicios = `http://localhost:3000/api/ctss_tipos_seguros/${5}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${5}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setSeguros(resultadoObjetoServicio);
      } else if (opcionSeguro === "Mortuorio") {
                const urlServicios = `http://localhost:3000/api/ctss_tipos_seguros/${6}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${6}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setSeguros(resultadoObjetoServicio);
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
    fetchData(opcionSeguro);
  }, [opcionSeguro]);


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
        setVerificador(true)
          setEspecialActivoA(true); 

}



  const onSubmit = async (datos) => {
     if (representanteLegal.length > 0 && imagenDos) {
xd()
    try {
      const urlContrato = "http://localhost:3000/api/ctss_contratos";
    const formularioImagen = new FormData();

  formularioImagen.append('file', imagenDos);

  console.log(imagenDos)
  
const urlSubidaImagen = "http://localhost:3000/api/ctss_contratos_imagenes"

const resolverPeticion = await axios.post(urlSubidaImagen, formularioImagen, {
    headers: {
      'Content-Type': 'multipart/form-data'
      }});
      const datosRecibidos = { ...datos, firma_paquete_turistico: `http://localhost:3000/${imagenDos.name}`, tipo_contrato: opcionSeguro }
      console.log(datosRecibidos)
      const responseServicio = await axios.post(urlContrato, datosRecibidos);
      

    } catch (error) {
      console.error(error);
    } finally {
                   setEspecialActivoA(false)
              setVerificador(false)
            setImagenAgregada(null);
            setImagenAgregadaDos(null);
            setOpcionServicio("Tipo de Seguro")
            actualizarVisibilidadContenedor(contratoServicioDom, false);
            actualizarVisibilidadContenedor(contratoSeguroDom, false);
            reset();
            loadingData();
            setImagenDos("")
   redireccionarNuevoContrato();
    } 

    } else {
        alert("Paquetes Turisticos Aún No Ha Firmado.")
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
            setOpcionServicio(null)
            actualizarVisibilidadContenedor(contratoServicioDom, false);
            actualizarVisibilidadContenedor(contratoSeguroDom, false);
            reset();
   redireccionarNuevoContrato();
}


console.log(opcionSeguro)

  return (
    <>

      <section
        className={`contratoSeguro ${stylesContrato.contenedorInformacion} ${stylesContrato.desaparecerContenedor}`}
      >
                                                            <NotificacionCreacion
        weaActivaCreacion={verificador}
        estatusActivo={especialActivoA}
      />

          {opcionSeguro === "Vida" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={stylesContrato.contenedorTitulo}>
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Contrato Para Seguros de Vida
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de las Partes
            </h1>

            <p className={stylesContrato.p}>
              Prestadores del Seguro de Vida:
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
                {seguros.map((datosGet, index) => (
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
              Tipo de Seguro: { `${opcionSeguro.split(" ")[1]}`}
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
              Empresa que optará por el Seguro: Paquetes Turísticos
            </p>
          </section>
          {RepresentanteLegalSeleccionado !== "Sin Firmar" && (
            <>
              <section>
                <section className={stylesContrato.sectionParteUno}>
<h1 className={stylesContrato.tituloHeader}>
  Cláusula I: Cobertura del Seguro de Vida
</h1>

<p className={stylesContrato.p}>
  El Prestador se compromete a proporcionar seguros de vida integrales
  para los beneficiarios designados. La cobertura del seguro de vida incluye:
</p>
<ul>
  <li>Beneficio por fallecimiento.</li>
  <li>Beneficios adicionales por accidentes.</li>
  <li>Beneficios por enfermedades graves.</li>
</ul>
                  <p className={stylesContrato.p}>
                    Este contrato de seguros de vida se aplica a
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
    Cláusula II: Cobertura y Beneficios Esperados
  </h1>
  <ul>
    <p className={stylesContrato.p}>
      Los beneficios que se esperan del seguro de vida son:
    </p>
    <li>
      Cobertura de Fallecimiento: El asegurador proporcionará una suma asegurada en caso de fallecimiento del asegurado, destinada a beneficiarios designados para ayudar a cubrir gastos y proporcionar apoyo financiero en momentos difíciles.
    </li>
    <li>
      Beneficios Adicionales: Además de la cobertura básica, el contrato de seguro puede incluir beneficios adicionales como cobertura por fallecimiento accidental, enfermedades críticas o invalidez total y permanente, según los términos acordados.
    </li>
    <li>
      Asistencia en Vida: El asegurador puede ofrecer servicios de asistencia en vida, como asesoramiento médico telefónico, programas de bienestar y descuentos en servicios de salud, para promover el bienestar general del asegurado.
    </li>
    <li>
      Flexibilidad en Pago de Primas: El contrato puede permitir flexibilidad en el pago de primas, como opciones de pago mensual, trimestral o anual, para adaptarse a las necesidades financieras del asegurado.
    </li>
    <li>
      Proceso de Reclamación: El asegurador se compromete a facilitar un proceso de reclamación ágil y eficiente para que los beneficiarios puedan recibir los beneficios en caso de fallecimiento del asegurado, con un servicio al cliente dedicado para atender cualquier pregunta o inquietud.
    </li>
    <li>
      Protección y Seguridad Financiera: El seguro de vida proporciona una capa adicional de protección y seguridad financiera para el asegurado y sus seres queridos, asegurando que estén preparados financieramente para hacer frente a circunstancias adversas.
    </li>
  </ul>
</section>
                <section className={stylesContrato.sectionParteUno}>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula III: Capacidad Máxima de Personas en el Seguro
                  </h1>
                  <p className={stylesContrato.p}>
                    Este seguro ofrece una cantidad máxima de personas a
                    asegurar en este seguro es de:
                    <input
                      placeholder="Cantidad Maxima de Personas"
                      className={stylesContrato.inputTexto}
                      type="number"
                      min="0"
                      {...register("cantidad_persona", {
                        required: {
                          value: true,
                          message: "Introduzca la Cantidad de Personas Para Este Servicio"
                        },
                      })}
                    />
                    .
                  </p>
                                                              {errors.cantidad_persona && (
                    <p className={stylesContrato.errorInput}>{errors.cantidad_persona.message}</p>
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
                           message: "Introduzca El Costo del Servicio"
                        },
                      })}
                    />
                    $.
                  </p>
                                      {errors.costo && (
                    <p className={stylesContrato.errorInput}>{errors.costo.message}</p>
                  )}
                </section>
                <section className={stylesContrato.sectionParteUno}>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula VI: Vigencia del Servicio
                  </h1>
                  <p className={stylesContrato.p}>
                    Este Seguro tendrá una
                    duración de vigencia desde el
 <input
        className={stylesContrato.inputTexto}
        id="fecha_inicio"
        {...register("fecha_inicio", {
          required: "Introduzca La Fecha de Inicio",
          validate: {
            fechaMenor: valor => {
              const fechaInicio = new Date(valor);
              const fechaFin = new Date(document.getElementById('fecha_fin').value);
              return fechaInicio <= fechaFin || "La fecha de inicio no puede ser mayor que la fecha de fin";
            }
          }
        })}
        min={fechaActual}
        type="date"
      />
      {" "}
      hasta el
      {" "}
      <input
      id="fecha_fin"
        className={stylesContrato.inputTexto}
        {...register("fecha_fin", {
          required: "Introduzca La Fecha de Fin",
          validate: {
            fechaMayor: valor => {
              const fechaFin = new Date(valor);
              const fechaInicio = new Date(document.getElementById('fecha_inicio').value);
              return fechaFin >= fechaInicio || "La fecha de fin no puede ser menor que la fecha de inicio";
            }
          }
        })}
         min={fechaActual}
        type="date"
      />
                    .
                  </p>
                                                       {errors.fecha_inicio && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_inicio.message}</p>
                  )}
                    {errors.fecha_fin && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_fin.message}</p>
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
      {representanteLegal.length > 0 && representanteLegal[0] && representanteLegal[0].firma_representante_legal ? (
  <Image
                  src={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal  : ""}
                  alt={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal  : "Sin Imagen"}
                  title={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal : "Sin Imagen"}
                  width={350}
                  height={350}
                  style={{
                    borderRadius: "0.5rem",
                    boxShadow:
                      "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                    marginBottom: "10px",
                  }}
                />
                    ) :
                      null}            

                   

                    <p
                      className={stylesContrato.p}
                      style={{ textAlign: "center", fontSize: "23px", wordBreak: "break-word" }}
                    >
                      Firma del Representante Legal
                    </p>
                  </section>
                  <section className={stylesContrato.contenedorFirmaInterno}>
                        {imagenAgregadaDos && (
  <Image
                  src={imagenAgregadaDos ? imagenAgregadaDos : ""}
                  alt={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
                  title={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
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
                                   <section style={{ position: 'relative', display: 'inline-block' }}>
  <input
    accept=".png, .jpg, .jpeg"
    className={stylesContrato.inputTexto}
    style={{
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: "pointer",
      top: 0,
      left: 0,
      zIndex: -10
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
                      style={{ textAlign: "center", fontSize: "23px", wordBreak: "break-word"}}
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
                      Contratar Seguro
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

  {opcionSeguro === "Seguro Transporte" && (
           <form onSubmit={handleSubmit(onSubmit)}>
          <section className={stylesContrato.contenedorTitulo}>
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Contrato Para Seguros de Transportes
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de las Partes
            </h1>

            <p className={stylesContrato.p}>
              Prestadores del Seguro de Transporte:
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
                {seguros.map((datosGet, index) => (
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
              Tipo de Seguro: Transporte
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
              Empresa que optará por el Seguro: Paquetes Turísticos
            </p>
          </section>
          {RepresentanteLegalSeleccionado !== "Sin Firmar" && (
            <>
              <section>
                <section className={stylesContrato.sectionParteUno}>

  <h1 className={stylesContrato.tituloHeader}>
    Cláusula I: Cobertura y Compromisos del Seguro de Transporte
  </h1>
  <p className={stylesContrato.p}>
    El asegurador se compromete a proporcionar seguros de transporte seguros y eficientes para los pasajeros. Los seguros de transporte incluyen:
  </p>
  <ul>
    <li>Asistencia en caso de necesidades en los transportes</li>
  </ul>


                  <p className={stylesContrato.p}>
                    Este contrato de seguros de transporte se aplica a
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
      Los resultados esperados del seguro de transporte son:
    </p>
    <li>
      Atención a cualquier inconveniente con el tranporte transporte durante el viaje.
    </li>
  </ul>
                </section>
                <section className={stylesContrato.sectionParteUno}>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula III: Capacidad Máxima de Personas Aptas Para El Seguro
                  </h1>
                  <p className={stylesContrato.p}>
                    Este Seguro ofrece una cantidad maxima de medios de transporte a asegurar de:
                    <input
                      placeholder="Cantidad Maxima de Personas"
                      className={stylesContrato.inputTexto}
                      type="number"
                      min="0"
                      {...register("cantidad_persona", {
                        required: {
                          value: true,
                          message: "Introduzca la Cantidad de Personas Para Este Servicio"
                        },
                      })}
                    />
                    .
                  </p>
                                                              {errors.cantidad_persona && (
                    <p className={stylesContrato.errorInput}>{errors.cantidad_persona.message}</p>
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
                    El Seguro acuerda realizar los pagos a través
                    <select
                      {...register("id_metodo_pago", {
                        required: {
                          value: true,
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
                           message: "Introduzca El Costo del Servicio"
                        },
                      })}
                    />
                    $.
                  </p>
                                      {errors.costo && (
                    <p className={stylesContrato.errorInput}>{errors.costo.message}</p>
                  )}
                </section>
                <section className={stylesContrato.sectionParteUno}>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula VI: Vigencia del Seguro
                  </h1>
                  <p className={stylesContrato.p}>
                    Este Seguro destinado a el Transporte tendrá una
                    duración de vigencia desde el
 <input
        className={stylesContrato.inputTexto}
        id="fecha_inicio"
        {...register("fecha_inicio", {
          required: "Introduzca La Fecha de Inicio",
          validate: {
            fechaMenor: valor => {
              const fechaInicio = new Date(valor);
              const fechaFin = new Date(document.getElementById('fecha_fin').value);
              return fechaInicio <= fechaFin || "La fecha de inicio no puede ser mayor que la fecha de fin";
            }
          }
        })}
        min={fechaActual}
        type="date"
      /> {" "}
      hasta el
      {" "}
      <input
      id="fecha_fin"
        className={stylesContrato.inputTexto}
        {...register("fecha_fin", {
          required: "Introduzca La Fecha de Fin",
          validate: {
            fechaMayor: valor => {
              const fechaFin = new Date(valor);
              const fechaInicio = new Date(document.getElementById('fecha_inicio').value);
              return fechaFin >= fechaInicio || "La fecha de fin no puede ser menor que la fecha de inicio";
            }
          }
        })}
         min={fechaActual}
        type="date"
      />
                    .
                  </p>
                                                       {errors.fecha_inicio && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_inicio.message}</p>
                  )}
                    {errors.fecha_fin && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_fin.message}</p>
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
                  {representanteLegal.length > 0 && representanteLegal[0] && representanteLegal[0].firma_representante_legal ? (
  <Image
                  src={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal  : ""}
                  alt={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal  : "Sin Imagen"}
                  title={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal : "Sin Imagen"}
                  width={350}
                  height={350}
                  style={{
                    borderRadius: "0.5rem",
                    boxShadow:
                      "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                    marginBottom: "10px",
                  }}
                />
                    ) :
                      null}        




                    <p
                      className={stylesContrato.p}
                      style={{ textAlign: "center", fontSize: "23px", wordBreak: "break-word" }}
                    >
                      Firma del Representante Legal
                    </p>
                  </section>
                  <section className={stylesContrato.contenedorFirmaInterno}>
                      {imagenAgregadaDos && (
  <Image
                  src={imagenAgregadaDos ? imagenAgregadaDos : ""}
                  alt={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
                  title={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
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
                                   <section style={{ position: 'relative', display: 'inline-block' }}>
  <input
    accept=".png, .jpg, .jpeg"
    className={stylesContrato.inputTexto}
    style={{
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: "pointer",
      top: 0,
      left: 0,
      zIndex: -10
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
                      style={{ textAlign: "center", fontSize: "23px", wordBreak: "break-word"}}
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
                      Contratar Seguro
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
{opcionSeguro === "Mortuorio" && (
           <form onSubmit={handleSubmit(onSubmit)}>
          <section className={stylesContrato.contenedorTitulo}>
            <h1
              className={stylesContrato.tituloHeader}
              style={{ marginTop: "0px" }}
            >
              Contrato Para Seguros Mortuorios
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de las Partes
            </h1>

            <p className={stylesContrato.p}>
              Prestadores de los Seguros de Mortuorios:
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
                {seguros.map((datosGet, index) => (
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
              Tipo de Seguro: { `${opcionSeguro}`}
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
              Empresa que optará por el Seguro: Paquetes Turísticos
            </p>
          </section>
          {RepresentanteLegalSeleccionado !== "Sin Firmar" && (
            <>
              <section>
                <section className={stylesContrato.sectionParteUno}>
  <h1 className={stylesContrato.tituloHeader}>
    Cláusula I: Cobertura y Compromisos del Seguro Mortuorio
  </h1>
  <p className={stylesContrato.p}>
    El Asegurador se compromete a proporcionar servicios de alta calidad para los clientes en el marco del seguro mortuorio. Los servicios incluyen:
  </p>
  <ul>
    <li>Suministro de ataúdes y urnas de calidad para eventos conmemorativos.</li>
    <li>Mantenimiento de la limpieza y la higiene en todas las áreas destinadas a los servicios funerarios.</li>
    <li>Atención al cliente profesional y cortés durante el proceso de organización y ejecución de los servicios funerarios.</li>
    <li>Garantía de seguridad en todos los aspectos relacionados con la manipulación y el transporte de los restos mortales.</li>
  </ul>
                  <p className={stylesContrato.p}>
                    Este contrato de seguros mortuorios se aplica a
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
<section className={stylesContrato.sectionParteDos}>
  <h1 className={stylesContrato.tituloHeader}>
    Cláusula II: Alcance y Resultados Esperados
  </h1>
  <ul>
    <p className={stylesContrato.p}>
      Los resultados que se esperan del seguro de atención funeraria son:
    </p>
    <li>
      Calidad en la preparación: El seguro funerario se compromete a proporcionar una preparación de alta calidad para los restos mortales, asegurando el respeto y la dignidad en todo momento.
    </li>
    <li>
      Variedad de opciones: El seguro funerario ofrecerá una amplia gama de opciones y paquetes para los servicios conmemorativos, permitiendo a los clientes personalizar y adaptar los arreglos según sus preferencias y necesidades.
    </li>
    <li>
      Atención al cliente: El seguro funerario proporcionará un seguro al cliente compasivo y profesional, brindando apoyo emocional y ayudando a los clientes a navegar por el proceso de organización de los seguros funerarios.
    </li>
    <li>
      Ambiente y cuidado: El seguro funerario mantendrá un ambiente tranquilo, sereno y respetuoso en todas las instalaciones, garantizando un entorno adecuado para que los familiares y amigos puedan despedirse y honrar a sus seres queridos.
    </li>
  </ul>
</section>


                </section>
                <section className={stylesContrato.sectionParteUno}>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula III: Capacidad Máxima de Personas en el Servicio
                  </h1>
                  <p className={stylesContrato.p}>
                    Este seguro abarca una cantidad máxima de personas a
                    asegurar en los siniestros durante el paquete turistico de:
                    <input
                      placeholder="Cantidad Maxima de Personas"
                      className={stylesContrato.inputTexto}
                      type="number"
                      min="0"
                      {...register("cantidad_persona", {
                        required: {
                          value: true,
                          message: "Introduzca la Cantidad de Personas Para Este Servicio"
                        },
                      })}
                    />
                    .
                  </p>
                                                              {errors.cantidad_persona && (
                    <p className={stylesContrato.errorInput}>{errors.cantidad_persona.message}</p>
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
                           message: "Introduzca El Costo del Servicio"
                        },
                      })}
                    />
                    $.
                  </p>
                                      {errors.costo && (
                    <p className={stylesContrato.errorInput}>{errors.costo.message}</p>
                  )}
                </section>
                <section className={stylesContrato.sectionParteUno}>
                  <h1 className={stylesContrato.tituloHeader}>
                    Cláusula VI: Vigencia del Servicio
                  </h1>
                  <p className={stylesContrato.p}>
                    Este Servicio destinado a {opcionSeguro} tendrá una
                    duración de vigencia desde el
 <input
        className={stylesContrato.inputTexto}
        id="fecha_inicio"
        {...register("fecha_inicio", {
          required: "Introduzca La Fecha de Inicio",
          validate: {
            fechaMenor: valor => {
              const fechaInicio = new Date(valor);
              const fechaFin = new Date(document.getElementById('fecha_fin').value);
              return fechaInicio <= fechaFin || "La fecha de inicio no puede ser mayor que la fecha de fin";
            }
          }
        })}
        min={fechaActual}
        type="date"
      />
      {" "}
      hasta el
      {" "}
      <input
      id="fecha_fin"
        className={stylesContrato.inputTexto}
        {...register("fecha_fin", {
          required: "Introduzca La Fecha de Fin",
          validate: {
            fechaMayor: valor => {
              const fechaFin = new Date(valor);
              const fechaInicio = new Date(document.getElementById('fecha_inicio').value);
              return fechaFin >= fechaInicio || "La fecha de fin no puede ser menor que la fecha de inicio";
            }
          }
        })}
         min={fechaActual}
        type="date"
      />
                    .
                  </p>
                                                       {errors.fecha_inicio && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_inicio.message}</p>
                  )}
                    {errors.fecha_fin && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_fin.message}</p>
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
{representanteLegal.length > 0 && representanteLegal[0] && representanteLegal[0].firma_representante_legal ? (
  <Image
                  src={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal  : ""}
                  alt={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal  : "Sin Imagen"}
                  title={representanteLegal[0].firma_representante_legal  ? representanteLegal[0].firma_representante_legal : "Sin Imagen"}
                  width={350}
                  height={350}
                  style={{
                    borderRadius: "0.5rem",
                    boxShadow:
                      "#eeeeee17 0.5rem 0.5rem 1rem, #eeeeee17 -0.5em -0.5rem 1rem",
                    marginBottom: "10px",
                  }}
                />
                    ) :
                      null}       




                    <p
                      className={stylesContrato.p}
                      style={{ textAlign: "center", fontSize: "23px", wordBreak: "break-word" }}
                    >
                      Firma del Representante Legal
                    </p>
                  </section>
                  <section className={stylesContrato.contenedorFirmaInterno}>
                  {imagenAgregadaDos && (
  <Image
                  src={imagenAgregadaDos ? imagenAgregadaDos : ""}
                  alt={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
                  title={nombreImagenDos ? nombreImagenDos : "Sin Imagen"}
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
                                   <section style={{ position: 'relative', display: 'inline-block' }}>
  <input
    accept=".png, .jpg, .jpeg"
    className={stylesContrato.inputTexto}
    style={{
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: "pointer",
      top: 0,
      left: 0,
      zIndex: -10
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
                      style={{ textAlign: "center", fontSize: "23px", wordBreak: "break-word"}}
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
                      Contratar Seguro
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

export default ContratoSeguro;