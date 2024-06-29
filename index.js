// DECLARACION DEL PUERTO
const PUERTO = 3000;
// IMPORTACION DEL MODULO EXPRESS
const express = require("express");
// IMPORTACION DEL MODULO PATH
const path = require("path");
//IMPORTACION DEL MODULO DE CORS
const cors = require('cors')
// IMPORTACION DEL MODULO ROUTER BOVINOS.JS
const bovinosRouter = require("./routes/bovinos/bovinos");
const usuariosRouter = require("./routes/usuarios/usuarios");
// INSTANCIACION DE OBJETO DE TIPO EXPRESS
const app = express();

app.use(cors())

// MIDDELWARE PARA CONVERSION DE TODA REQ Y RES A JSON
app.use(express.json());
// MIDDELWARE PARA DEFINIR RUTA AL ROUTER BOVINOS.JS
app.use("/bovinos", bovinosRouter);
// MIDDELWARE PARA DEFINIR RUTA AL ROUTER USUARIOS.JS
app.use("/usuarios", usuariosRouter);
// MIDDELWARE PARA LANZAR POR LA RUTA RAIZ DEL SEVIDOR LO QUE ESTA EN EL DIRECTORIO PUBLIC
app.use(express.static("public"));

// METODO LISTEN DE EXPRESS PARA ENCENDER EL SERVIDOR
app.listen(PUERTO, () => {
  console.log(`Seervidor listo y escuchando en http://localhost:${PUERTO}`);
});
