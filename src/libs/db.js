import mysql from "serverless-mysql";

export const conexion = mysql({
	config: {
	host: "localhost",
  user: "root",
  password: '',
  port: 3306,
  database: "contrataciones_turisticas_servicios_seguros"
	}
})