import "./loading.css";

const Loading = () => {
  return (
    <>
       <section style={{ display: "flex", columnGap: "1rem", justifyContent: "center", alignItems: "center"}}>
      <section class="ytp-spinner" data-layer="4">
        <section>
          <section class="ytp-spinner-container">
            <section class="ytp-spinner-rotator">
              <section class="ytp-spinner-left">
                <section class="ytp-spinner-circle"></section>
              </section>
              <section class="ytp-spinner-right">
                <section class="ytp-spinner-circle"></section>
              </section>
            </section>
          </section>
        </section>
            </section>
      <p style={{ fontSize: "18px" }}>
            Actualizando Resultados de Busqueda...
            </p>
            </section>
    </>
  );
};

export default Loading;