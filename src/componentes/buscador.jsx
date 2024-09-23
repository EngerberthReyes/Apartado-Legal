import { useState, useEffect, useRef } from "react";
import stylesBusqueda from "./style-busqueda.module.css";
import Loading from "./loading.jsx";
import useSWR from "swr";

const Buscador = ({ textosFiltrados }) => {
  const [valor, setValor] = useState("");
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const fetcher = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data: empresaDemanda, error: errorDemanda } = useSWR(
    "http://localhost:3000/api/demandas",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const manejadorInput = (event) => {
    const valor = event.target.value;
    setValor(valor);
    setMostrarContenido(valor.length > 0);
  };

  const teclaPresionada = (event) => {
    if (event.key === "Enter") {
      setMostrarContenido(false);
    } else if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  const contenedorClick = (event) => {
    if (event.target.classList.contains("elemento")) {
      const textoElemento = event.target.textContent;
      setValor(textoElemento);
      setMostrarContenido(false);
    }
  };

  useEffect(() => {
    const clickFuera = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setMostrarContenido(false);
      }
    };

    document.addEventListener("mousedown", clickFuera);

    return () => {
      document.removeEventListener("mousedown", clickFuera);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("click", contenedorClick);

    return () => {
      container.removeEventListener("click", contenedorClick);
    };
  }, [empresaDemanda]);

  if (errorDemanda)
    return (
      <section>
        <Loading /> Error al Cargar Los Resultados...
      </section>
    );
  if (!empresaDemanda) return <Loading />;

  const elementosFiltrados = empresaDemanda.filter((dataGet) =>
    dataGet.servicio_demandado.toLowerCase().includes(valor.toLowerCase())
  );

  const enviarBusquedaFiltrada = () => {
    textosFiltrados(valor);
  };

  enviarBusquedaFiltrada();

  return (
    <section
      style={{ position: "relative" }}
      className={`contenedor-principal ${stylesBusqueda.contenedorPrincipal}`}
      tabIndex="0"
    >
      <section
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <input
          ref={inputRef}
          className={`buscador ${stylesBusqueda.buscador}`}
          placeholder="Nombre de la Empresa Demandada"
          type="text"
          onChange={manejadorInput}
          onKeyPress={teclaPresionada}
          value={valor}
          tabIndex="1"
        />
      </section>
      <section
        ref={containerRef}
        className={`container ${stylesBusqueda.container}`}
        style={{ display: mostrarContenido ? "block" : "none", zIndex: "250" }}
      >
        {empresaDemanda.length === 0 ? (
          <p className={stylesBusqueda.elemento}>Sin Resultados</p>
        ) : (
          elementosFiltrados.map((dataGet, index) => (
            <p className={`elemento ${stylesBusqueda.elemento}`} key={index}>
              {dataGet.servicio_demandado}
            </p>
          ))
        )}
      </section>
    </section>
  );
};

export default Buscador;
