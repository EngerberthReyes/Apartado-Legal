import { NextResponse } from "next/server";
import { conexion } from "@/libs/db.js";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (request) => {
    try {
const data = await request.formData();
const imagen = data.get("file");

        const bytes = await imagen.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const archivoPath = path.join(process.cwd(), "public", imagen.name);

        writeFile(archivoPath, buffer);
 return NextResponse.json(imagen);
        } catch (error) {
                console.log(error)
        }
        
};
