import ruletaStyle from "./loadingLista.module.css";

const LoadingLista = () => {
  return (
    <>
    <section style={{ display: "flex", columnGap: "1rem", justifyContent: "center", alignItems: "center", position: "sticky", top: "10%"}}>
      <section className={ruletaStyle.ytpSpinner} data-layer="4">
        <section>
          <section className={ruletaStyle.ytpSpinnerContainer}>
            <section className={ruletaStyle.ytpSpinnerRotator}>
              <section className={ruletaStyle.ytpSpinnerLeft}>
                <section className={ruletaStyle.ytpSpinnerCircle}></section>
              </section>
              <section className={ruletaStyle.ytpSpinnerRight}>
                <section className={ruletaStyle.ytpSpinnerCircle}></section>
              </section>
            </section>
          </section>
        </section>
      </section>
      <p style={{ fontSize: "40px" }}>
            Actualizando Lista...
            </p>
            </section>
    </>
  );
};

export default LoadingLista;