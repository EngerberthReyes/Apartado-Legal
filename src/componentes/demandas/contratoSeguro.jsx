"use client";
import styles from "../../app/styles-index.module.css";
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
  setopcionServicio,
  opcionSeguro,
  loadingData,
  setOpcionSeguro
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
  const [servicioSeleccionado, setservicioSeleccionado] = useState(false);
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
        const urlServicios = `http://localhost:3000/api/ctss_demandas/${4}`;

        const responseServicio = await axios.get(urlServicios);

        const resultadoObjetoServicio = responseServicio.data;

        setSeguros(resultadoObjetoServicio);
      }

       if (opcionSeguro === "Seguro Transporte") {
        const urlServicios = `http://localhost:3000/api/ctss_demandas/${5}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${5}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setSeguros(resultadoObjetoServicio);
      }

       if (opcionSeguro === "Mortuorio") {
                const urlServicios = `http://localhost:3000/api/ctss_demandas/${6}`;
        const urlRepresentantes = `http://localhost:3000/api/ctss_representantes_legales/${6}`;
        const responseServicio = await axios.get(urlServicios);
        const responseRepresentante = await axios.get(urlRepresentantes);
        const resultadoObjetoRepresentante = responseRepresentante.data;
        setRepresentanteLegal(resultadoObjetoRepresentante);

        const resultadoObjetoServicio = responseServicio.data;
        setSeguros(resultadoObjetoServicio);
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
      setservicioSeleccionado(false);
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
xd()
      console.log(datos)
    try {

      const urlContrato = "http://localhost:3000/api/ctss_demandas";
  
      console.log(datos)
      const responseSeguro = await axios.post(urlContrato, datos);
      console.log(responseSeguro)

    } catch (error) {
      console.error(error);
    } finally {
                   setEspecialActivoA(false)
              setVerificador(false)
            setImagenAgregada(null);
            setImagenAgregadaDos(null);
            setOpcionSeguro("Tipo de Seguro")
                        setservicioSeleccionado(false)
            actualizarVisibilidadContenedor(contratoServicioDom, false);
            actualizarVisibilidadContenedor(contratoSeguroDom, false);
            reset();
            loadingData();
   redireccionarNuevoContrato();
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
            setOpcionSeguro(null)
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
              Emisión Demanda Hacia un Seguro
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de la Parte a Demandar
            </h1>

            <p className={stylesContrato.p}>
              Empresa de Seguro a Demandar:
 <select
 className={stylesContrato.opciones}
 {...register("tipo_empresa", {
    required: {
      value: true
    }
 })}
 value={servicioSeleccionado}
 onChange={handleServiceChange}
>
 <option>Seleccione</option>
 {
    // Filter out duplicates and map to options
    Array.from(new Set(seguros.map(seguro => seguro.razon_social))).map((razon_social, index) => (
      <option key={index} value={razon_social}>
        {razon_social}
      </option>
    ))
 }

</select>
<>
{!servicioSeleccionado && (
                                                                                       
                    <p className={stylesContrato.errorInput}>Introduzca la Tipo de Empresa a Demandar</p>

                       
                                                                                        )}
    </>

            </p>
            <p className={stylesContrato.p}>
              Tipo de Seguro: { `${opcionSeguro}`}
            </p>
            <p className={stylesContrato.p}>
              Empresa Demandante: Paquetes Turísticos
            </p>
          </section>
          {servicioSeleccionado && (
            <>
          <section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Razón de la Demanda:
              </h1>
              <p className={stylesContrato.p}>
                Incumplimiento del Contrato.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Motivo de la Demanda [Explicación de lo Ocurrido]:
              </h1>
              <textarea
                              {...register("descripcion_incidente", {
                  required: {
                    value: true,
                    message: "Introduzca la Descripción del Incidente"
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
                    <section className={stylesContrato.sectionParteUno}>
      <h1 className={stylesContrato.tituloHeader}>
        Fecha en el Cual Ocurrio el Incidente
      </h1>
      <input
        {...register("fecha_incidente", {
          required: {
            value: true,
            message: "Introduzca la Fecha del Incidente"
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
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Fecha de Emision de la Demanda
              </h1>
              <input
                {...register("fecha_emision", {
                  required: {
                    value: true,
                    message: "Introduzca la Fecha de Emisión de la Demanda"
                  },
                })}
                className={stylesContrato.inputTexto}
                type="date"
                min={fechaActual}
                style={{ width: "15rem", height: "4rem", fontSize: "30px" }}
              />
                                                                                    {errors.fecha_emision && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_emision.message}</p>
                  )}
            </section>
            <section
              className={stylesContrato.sectionParteUno}
              style={{
                marginTop: "3rem",
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
                    style={{ textAlign: "center" }}
                    type="submit"
                  >
                    Demandar
                  </button>
                </section>
                <section className={stylesContrato.contenedorFirmaInterno}>
                  <button
                    className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                    style={{ textAlign: "center" }}
                    type="button"
                    onClick={funcionReset}
                  >
                    Declinar Demanda
                  </button>
                </section>
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
              Emisión Demanda Hacia un Seguro
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de la Parte a Demandar
            </h1>

            <p className={stylesContrato.p}>
              Empresa de Seguro a Demandar:

 <select
 className={stylesContrato.opciones}
 {...register("tipo_empresa", {
    required: {
      value: true
    }
 })}
 value={servicioSeleccionado}
 onChange={handleServiceChange}
>
 <option>Seleccione</option>
 {
    // Filter out duplicates and map to options
    Array.from(new Set(seguros.map(seguro => seguro.razon_social))).map((razon_social, index) => (
      <option key={index} value={razon_social}>
        {razon_social}
      </option>
    ))
 }

</select>
<>
{!servicioSeleccionado && (
                                                                                       
                    <p className={stylesContrato.errorInput}>Introduzca la Tipo de Empresa a Demandar</p>

                       
                                                                                        )}
    </>
            </p>
            <p className={stylesContrato.p}>
              Tipo de Seguro: { `${opcionSeguro.split(' ')[1]}`}
            </p>
            <p className={stylesContrato.p}>
              Empresa Demandante: Paquetes Turísticos
            </p>
          </section>
          {servicioSeleccionado && (
            <>
          <section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Razón de la Demanda:
              </h1>
              <p className={stylesContrato.p}>
                Incumplimiento del Contrato.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Motivo de la Demanda [Explicación de lo Ocurrido]:
              </h1>
              <textarea
                              {...register("descripcion_incidente", {
                  required: {
                    value: true,
                    message: "Introzca la Descripcion del Incidente"
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
                    <section className={stylesContrato.sectionParteUno}>
      <h1 className={stylesContrato.tituloHeader}>
        Fecha en el Cual Ocurrio el Incidente
      </h1>
      <input
        {...register("fecha_incidente", {
          required: {
            value: true,
            message: "Introduzca la Fecha del Incidente"
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
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Fecha de Emision de la Demanda
              </h1>
              <input
                {...register("fecha_emision", {
                  required: {
                    value: true,
                    message: "Introduzca la Fecha de Emisión de la Demanda"
                  },
                })}
                className={stylesContrato.inputTexto}
                type="date"
                min={fechaActual}
                style={{ width: "15rem", height: "4rem", fontSize: "30px" }}
              />
                                                                                                     {errors.fecha_emision && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_emision.message}</p>
                  )}
            </section>
            <section
              className={stylesContrato.sectionParteUno}
              style={{
                marginTop: "3rem",
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
                    style={{ textAlign: "center" }}
                    type="submit"
                  >
                    Demandar
                  </button>
                </section>
                <section className={stylesContrato.contenedorFirmaInterno}>
                  <button
                    className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                    style={{ textAlign: "center" }}
                    type="button"
                    onClick={funcionReset}
                  >
                    Declinar Demanda
                  </button>
                </section>
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
              Emisión Demanda Hacia un Seguro
            </h1>
          </section>

          <section className={stylesContrato.sectionParteUno}>
            <h1 className={stylesContrato.tituloHeader}>
              Identificación de la Parte a Demandar
            </h1>

            <p className={stylesContrato.p}>
              Empresa de Seguro a Demandar:
 <select
 className={stylesContrato.opciones}
 {...register("tipo_empresa", {
    required: {
      value: true
    }
 })}
 value={servicioSeleccionado}
 onChange={handleServiceChange}
>
 <option>Seleccione</option>
 {
    // Filter out duplicates and map to options
    Array.from(new Set(seguros.map(seguro => seguro.razon_social))).map((razon_social, index) => (
      <option key={index} value={razon_social}>
        {razon_social}
      </option>
    ))
 }

</select>
<>
{!servicioSeleccionado && (
                                                                                       
                    <p className={stylesContrato.errorInput}>Introduzca la Tipo de Empresa a Demandar</p>

                       
                                                                                        )}
    </>
            </p>
            <p className={stylesContrato.p}>
              Tipo de Seguro: { `${opcionSeguro}`}
            </p>
            <p className={stylesContrato.p}>
              Empresa Demandante: Paquetes Turísticos
            </p>
          </section>
          {servicioSeleccionado && (
            <>
          <section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Razón de la Demanda:
              </h1>
              <p className={stylesContrato.p}>
                Incumplimiento del Contrato.
              </p>
            </section>
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Motivo de la Demanda [Explicación de lo Ocurrido]:
              </h1>
              <textarea
                              {...register("descripcion_incidente", {
                  required: {
                    value: true,
                    message: "Introduzca la Descripción del Incidente"
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
                    <section className={stylesContrato.sectionParteUno}>
      <h1 className={stylesContrato.tituloHeader}>
        Fecha en el Cual Ocurrio el Incidente
      </h1>
      <input
        {...register("fecha_incidente", {
          required: {
            value: true,
            message: "Introduzca la Fecha del Incidente"
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
            <section className={stylesContrato.sectionParteUno}>
              <h1 className={stylesContrato.tituloHeader}>
                Fecha de Emision de la Demanda
              </h1>
              <input
                {...register("fecha_emision", {
                  required: {
                    value: true,
                    message: "Introduzca la Fecha de Emisión de la Demanda"
                  },
                })}
                className={stylesContrato.inputTexto}
                type="date"
                min={fechaActual}
                style={{ width: "15rem", height: "4rem", fontSize: "30px" }}
              />
                                                                                                     {errors.fecha_emision && (
                    <p className={stylesContrato.errorInput}>{errors.fecha_emision.message}</p>
                  )}
            </section>
            <section
              className={stylesContrato.sectionParteUno}
              style={{
                marginTop: "3rem",
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
                    style={{ textAlign: "center" }}
                    type="submit"
                  >
                    Demandar
                  </button>
                </section>
                <section className={stylesContrato.contenedorFirmaInterno}>
                  <button
                    className={`${stylesContrato.boton} ${stylesContrato.botonHoverRojo}`}
                    style={{ textAlign: "center" }}
                    type="button"
                    onClick={funcionReset}
                  >
                    Declinar Demanda
                  </button>
                </section>
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