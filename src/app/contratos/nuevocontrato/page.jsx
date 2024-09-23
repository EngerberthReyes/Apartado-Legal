"use client";

import head from "next/head";
import styles from "./styles-nuevocontrato.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ContenedoresContratos from "@/componentes/contenedoresContratos.jsx";
/* import { fetch } from "@/services/fetch.js"; */

const NuevoContrato = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const enrutadorUrl = useRouter();

  const redireccionarIndex = () => {
    enrutadorUrl.push(`/`);
  };

  const [encontrarUsuario, setEncontrarUsario] = useState({});
  /* const [mensajeErrorBase, setMensajeErrorBase] = useState(
    "El Nombre de Usuario Ingresado Ya Se Encuentra Registrado"
  );
  const [swicth, setSwicth] = useState(false); */

  const enrutador = useRouter();

  useEffect(() => {
    (async () => {
      const respuesta = await fetch({
        url: "http://localhost:3000/api/usuario",
      });
      if (respuesta) {
        setEncontrarUsario(respuesta.results);
      }
    })();
  }, []);
  const enviar = handleSubmit(async (datosDeUsuario) => {
    const { nombre_de_usuario } = datosDeUsuario;

    (async () => {
      const respuesta = await fetch({
        url: "http://localhost:3000/api/usuario",
        method: "POST",
        body: { nombre: nombre_de_usuario },
      });
      if (respuesta) {
        setEncontrarUsario(respuesta.results);
      }
    })();
    enrutador.push(
      `/cliente-registrado?nombredeusuario=${JSON.stringify(datosDeUsuario)}`
    );
  });

  const redireccionarContrato = () => {
    enrutadorUrl.push(`/contratos`);
  };

  /*
    Con esto se puede verificar a un usuario ya registrado (se necesita registro de usuario)
    
    console.log(nombre_de_usuario)
    let [usuarioVerificado] = await Promise.all([
      (async () => {
        const usuarioVerificado = await encontrarUsuario
          .filter((obj) => obj.nombre_de_usuario !== nombre_de_usuario)
          .some((obj) => obj.nombre_de_usuario !== nombre_de_usuario);
        return usuarioVerificado;
      })(),
    ]);

    console.log(usuarioVerificado)

  if (usuarioVerificado) {
      
      Hacer algo si todo esta bien

     } else {

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSwicth(true);
      setTimeout(() => {
        setSwicth(false);
      }, 2500);
    } 
    */

  return (
    <>
      <head>
        <title>Nuevo Contrato - Apartado Legal</title>
        <link rel="favicon" href="./favicon.ico" type="Image/ico" />
      </head>
      <body className={styles.body}>
        <header className={styles.cabezera}>
          <h1 className={styles.tituloHeader}>Nuevo Contrato</h1>
          <button className={styles.boton} onClick={redireccionarContrato}>
            Regresar
          </button>
        </header>

        <ContenedoresContratos />

        <footer className={styles.footer}>
          <p className={styles.textoFooter}>
            Apartado Legal 2024 &copy; - Engerberth Reyes y Kleiver Chacón
          </p>
        </footer>
      </body>
    </>
  );
};

export default NuevoContrato;
