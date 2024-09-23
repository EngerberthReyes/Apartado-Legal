import { useState, useEffect, useRef } from "react";
import stylesBusqueda from "./style-busqueda.module.css";
import Loading from "./loading.jsx";
import useSWR from "swr";

const BuscadorContratosSeguros = ({ textosFiltrados }) => {
  const [valor, setValor] = useState("");
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const fetcher = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const { data: contratosData, error: contratosError } = useSWR(
    "http://localhost:3000/api/ctss_demandas",
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

  const letraPresionada = (event) => {
    if (event.key === "Enter") {
      setMostrarContenido(false);
    } else if (event.key === "Tab") {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  const ContenedorClick = (event) => {
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

    container.addEventListener("click", ContenedorClick);

    return () => {
      container.removeEventListener("click", ContenedorClick);
    };
  }, [contratosData]);

  if (contratosError)
    return (
      <section>Error al Cargar Las Predicciones de Los Registros...</section>
    );
  if (!contratosData) return <Loading />;

  const elementosFiltrados = contratosData.filter(
    (dataGet) => {
    if (dataGet.id_tipo_contrato > 3) {
      return (
        dataGet.razon_social.toLowerCase().includes(valor.toLowerCase()) ||
        dataGet.categoria_empresa.toLowerCase().includes(valor.toLowerCase())
      );
    } else {
      return false;
    }
  }
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
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <p style={{ fontSize: "15px" }}>Buscador de Demandas en los Seguros:</p>
        <input
          ref={inputRef}
          className={`buscador ${stylesBusqueda.buscador}`}
          placeholder="Ejem: Nombre o Fecha de la Demanda Sin '-'"
          type="text"
          onChange={manejadorInput}
          onKeyPress={letraPresionada}
          value={valor}
          tabIndex="1"
        />
      </section>
      <section
        ref={containerRef}
        className={`container ${stylesBusqueda.container}`}
        style={{
          display: mostrarContenido ? "block" : "none",
          zIndex: "250",
          top: "4.4rem",
          background: "#eeeeeee8",
          height:
            elementosFiltrados.length < 3
              ? "auto"
              : elementosFiltrados.length > 0
              ? "40vh"
              : "auto",
          overflow: "auto",
        }}
      >
        {elementosFiltrados.length === 0 ? (
          <p className={stylesBusqueda.elemento}>Sin Resultados.</p>
        ) : (
          elementosFiltrados.map((dataGet, index) => (
            <section key={`item-${index}`}>
              {(dataGet.razon_social
                .toLowerCase()
                .includes(valor.toLowerCase()) ||
                dataGet.categoria_empresa
                  .toLowerCase()
                  .includes(valor.toLowerCase())) && (
                <>
                  <p
                    className={`elemento ${stylesBusqueda.elemento}`}
                    key={`item-${index}-service`}
                  >
                    {dataGet.razon_social}
                  </p>
                  <section key={`item-${index}-section`}>
                    <p
                      style={{ background: "#f2d709ab", color: "#000000" }}
                      className={stylesBusqueda.elemento}
                      key={`item-${index}-xd`}
                    >
                      Tipo de Seguro:
                    </p>
                    <p
                      style={{
                        background: "#f2d709e8",
                        color: "#000000",
                        borderRadius: "5px",
                      }}
                      className={`elemento ${stylesBusqueda.elemento}`}
                      key={`item-${index}-type`}
                    >
                      {dataGet.categoria_empresa}
                    </p>
                  </section>
                </>
              )}
            </section>
          ))
        )}
      </section>
    </section>
  );
};

export default BuscadorContratosSeguros;