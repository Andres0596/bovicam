document.getElementById("logear").addEventListener("click", (e) => {
  e.preventDefault();
  const formulogin = document.getElementById("loginform");
  let datos = new FormData(formulogin);
  let datosjson = Object.fromEntries(datos.entries());

  loginPost(datosjson);
});

async function loginPost(datosjson) {
  const url = "http://localhost:3000/usuarios";

  const cont = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosjson),
  };

  try {
    let peticion = await fetch(url, cont);
    if (!peticion) {
      throw new Error("hubo un problema con las credenciales");
    } else {
      let valores = await peticion.json();
      // sessionStorage.setItem('jwtToken', valores)
      // window.location = 'views/restringido.html'
      let user = valores.nombreus;
      sessionStorage.setItem(user, valores.token);
      let rutahtml = valores.rutahtml;
      window.location = `${rutahtml}?usuario=${user}`;
    }
  } catch {
    console.log("Error de credenciales");
  }
}

// document.getElementById("logear").addEventListener("click", (e) => {
//   e.preventDefault();
//   const formulogin = document.getElementById("loginform");
//   let datos = new FormData(formulogin);
//   let datosjson = Object.fromEntries(datos.entries());

//   loginPost(datosjson);
// });

// async function loginPost(datosjson) {
//   const url = "http://localhost:3000/usuarios";

//   const cont = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(datosjson),
//   };

//   try {
//     let peticion = await fetch(url, cont);
//     if (!peticion.ok) {
//       throw new Error("hubo un problema con las credenciales");
//     } else {
//       let valores = await peticion.json();
//       let user = valores.nombreus;
//       sessionStorage.setItem(user, valores.token);
//       let rutahtml = valores.rutahtml;
//       window.location = `${rutahtml}?usuario=${user}`;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
