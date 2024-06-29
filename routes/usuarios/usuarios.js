// IMPORTACION DEL MODULO EXPRESS
const express = require("express");
// IMPORTACION DE LA BD BOVINOS
const mibdb = require("../../data/usuarios.json");
// IMPORTACION DEL MODULO FILE SYSTEM
const fs = require("fs");
// IMPORTACION DEL MODULO JSONWEBTOKEN
const jwt = require("jsonwebtoken");
// CREACION DE UNA RUTA CON EL METODO ROUTER
const usuariosRouter = express.Router();

// INICIO JSON WEB TOKEN

usuariosRouter.post("/", verficaUsuario, (req, res) => {
  const credenciales = {
    nombreus: req.body.nombreus,
    contraus: req.body.contraus,
  };
  jwt.sign(
    { usuario: credenciales },
    "cualquiercosa",
    { expiresIn: "45s" },
    (err, token) => {
      // res.json(token)
      let nombreus = credenciales.nombreus;
      const rutahtml = "/views/bovinos.html";
      res.json({ token, rutahtml, nombreus });
    }
  );
  // console.log(credenciales);|
});

usuariosRouter.post("/verify", verificatoken, (req, res) => {
  jwt.verify(req.token, "cualquiercosa", (error, datos) => {
    if (error) {
      res.sendFile(path.join(__dirname, "public/views", "noautho.html"));
    } else {
      res.sendFile(path.join(__dirname, "public/views", "restringido.html"));
    }
  });
});

//middleware para validar el usuario y la contraseña
function verficaUsuario(req, res, next) {
  const credenciales = {
    nombreus: req.body.nombreus,
    contraus: req.body.contraus,
  };
  if (!credenciales.nombreus && !credenciales.contraus)
    return res.sendStaus(400);
  let user = mibdb.find((user) => user.username === credenciales.nombreus);
  if (!user) return res.send("Usuario no valido");
  if (user.password != credenciales.contraus)
    return res.send("Contraseña incorrecta");
  next();
}

function verificatoken(req, res, next) {
  const portadora = req.headers["authorization"];
  if (portadora) {
    let tokenportadora = portadora.split(" ")[1];
    req.token = tokenportadora;
    next();
  } else {
    res.status(403);
  }
}

module.exports = usuariosRouter;

// FIN JSON WEB TOKEN


// const express = require("express");
// const mibdb = require("../../data/usuarios.json");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");

// const usuariosRouter = express.Router();

// usuariosRouter.post("/", verficaUsuario, (req, res) => {
//   const credenciales = {
//     nombreus: req.body.nombreus,
//     contraus: req.body.contraus,
//   };
//   jwt.sign(
//     { usuario: credenciales },
//     "cualquiercosa",
//     { expiresIn: "45s" },
//     (err, token) => {
//       if (err) {
//         return res.status(500).json({ error: "Error al generar token" });
//       }
//       const nombreus = credenciales.nombreus;
//       const rutahtml = "/views/bovinos.html";
//       res.json({ token, rutahtml, nombreus });
//     }
//   );
// });

// usuariosRouter.post("/verify", verificatoken, (req, res) => {
//   jwt.verify(req.token, "cualquiercosa", (error, datos) => {
//     if (error) {
//       res.sendFile(path.join(__dirname, "public/views", "noautho.html"));
//     } else {
//       res.sendFile(path.join(__dirname, "public/views", "restringido.html"));
//     }
//   });
// });

// function verficaUsuario(req, res, next) {
//   const credenciales = {
//     nombreus: req.body.nombreus,
//     contraus: req.body.contraus,
//   };
//   if (!credenciales.nombreus || !credenciales.contraus)
//     return res.sendStatus(400);

//   let user = mibdb.find((user) => user.username === credenciales.nombreus);
//   if (!user) return res.status(400).send("Usuario no válido");
//   if (user.password !== credenciales.contraus)
//     return res.status(400).send("Contraseña incorrecta");

//   next();
// }

// function verificatoken(req, res, next) {
//   const portadora = req.headers["authorization"];
//   if (portadora) {
//     let tokenportadora = portadora.split(" ")[1];
//     req.token = tokenportadora;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

// module.exports = usuariosRouter;
