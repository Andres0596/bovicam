// IMPORTACION DEL MODULO EXPRESS
const express = require("express");
// IMPORTACION DE LA BD BOVINOS
const mibdb = require("../../data/fichabovinos.json");
// IMPORTACION DEL MODULO FILE SYSTEM
const fs = require("fs");
// CREACION DE UNA RUTA CON EL METODO ROUTER
const bovinosRouter = express.Router();

// ENDPOINT CONSULTA GENERAL A LA BD BOVINOS
bovinosRouter.get("/", (req, resp) => {
  let bovinos = mibdb;
  if (!bovinos) return resp.status(404).send();
  resp.send(bovinos);
});

// ENDPOINT CONSULTA POR ID A LA BD BOVINOS
bovinosRouter.get("/:id", (req, resp) => {
  let id = req.params.id;
  const bovino = mibdb.find((bovino) => bovino.id_chapeta === id);
  if (!bovino) return resp.status(404).send();
  return resp.send(bovino);
});

// ENDPOINT PARA AÑADIR REGISTRO A LA BD BOVINOS
bovinosRouter.post("/", (req, resp) => {
  let id_chapeta = req.body.id_chapeta,
    nombre = req.body.nombre,
    marcas = req.body.marcas,
    color = req.body.color,
    sexo = req.body.sexo,
    peso = req.body.peso,
    id_lote = req.body.id_lote,
    id_nacimiento = req.body.id_nacimiento,
    id_destete = req.body.id_destete,
    raza = req.body.raza,
    procedencia = req.body.procedencia,
    id_actividades = req.body.id_actividades,
    observaciones = req.body.observaciones;

  if (!id_chapeta) return resp.status(400).send();
  const bovino = mibdb.find((bovino) => bovino.id_chapeta === id_chapeta);

  if (bovino) return resp.status(409).send();

  mibdb.push({
    id_chapeta,
    nombre,
    marcas,
    color,
    sexo,
    peso,
    id_lote,
    id_nacimiento,
    id_destete,
    raza,
    procedencia,
    id_actividades,
    observaciones,
  });

  let datos = JSON.stringify(mibdb);
  try {
    fs.writeFileSync("./data/fichabovinos.json", datos);
  } catch (error) {
    console.log(error);
  }

  return resp.send(mibdb);
});

// ENDPOINT PARA ACTUALIZACION DE ALGUN CAMPO ESPECIFICO DE LA BD
bovinosRouter.patch("/:id", (req, resp) => {
  let id_chapeta = req.body.id_chapeta,
    nombre = req.body.nombre,
    marcas = req.body.marcas,
    color = req.body.color,
    sexo = req.body.sexo,
    peso = req.body.peso,
    id_lote = req.body.id_lote,
    id_nacimiento = req.body.id_nacimiento,
    id_destete = req.body.id_destete,
    raza = req.body.raza,
    procedencia = req.body.procedencia,
    id_actividades = req.body.id_actividades,
    observaciones = req.body.observaciones;

  if (!id_chapeta) return resp.status(400).send();
  const bovino = mibdb.find((bovino) => bovino.id_chapeta === id_chapeta);
  if (!bovino) return resp.status(404).send();
  bovino.nombre = nombre;
  bovino.marcas = marcas;
  bovino.color = color;
  bovino.sexo = sexo;
  bovino.peso = peso;
  bovino.id_lote = id_lote;
  bovino.id_nacimiento = id_nacimiento;
  bovino.id_destete = id_destete;
  bovino.raza = raza;
  bovino.procedencia = procedencia;
  bovino.id_actividades = id_actividades;
  bovino.observaciones = observaciones;

  let datos = JSON.stringify(mibdb);
  try {
    fs.writeFileSync("./data/fichabovinos.json", datos);
  } catch (error) {
    console.log(error);
  }

  return resp.send(mibdb);
});

// ENDPOINT PARA LA ELIMINACION DE UN REGISTRO POR ID
bovinosRouter.delete("/:id", (req, resp) => {
  let id_chapeta = req.params.id;
  const bovinoIndex = mibdb.findIndex(
    (usuario) => usuario.id_chapeta === id_chapeta
  );
  if (bovinoIndex === -1) return resp.status(404).send();
  mibdb.splice(bovinoIndex, 1);

  let datos = JSON.stringify(mibdb);
  try {
    fs.writeFileSync("./data/fichabovinos.json", datos);
  } catch (error) {
    console.log(error);
  }
  return resp.send(mibdb);
});

// EXPORTACION DE LA RUTA BOVINOSROUTER
module.exports = bovinosRouter;
