// INICIO ANIMACIONES SIDEBAR
const logo = document.getElementById("logo");
const sideBar = document.querySelector(".sidebar");
const spans = document.querySelectorAll("span");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
const button = document.querySelectorAll(".nofocus");

menu.addEventListener("click", () => {
  sideBar.classList.toggle("max-sidebar");
  if (sideBar.classList.contains("max-sidebar")) {
    menu.children[0].style.display = "none";
    menu.children[1].style.display = "block";
  } else {
    menu.children[0].style.display = "block";
    menu.children[1].style.display = "none";
  }

  if (window.innerWidth <= 320) {
    sideBar.classList.add("mini-sidebar");
    main.classList.add("min-main");
    spans.forEach((span) => {
      span.classList.add("hidden");
    });
  }
});

logo.addEventListener("click", () => {
  sideBar.classList.toggle("mini-sidebar");
  main.classList.toggle("min-main");
  spans.forEach((span) => {
    span.classList.toggle("hidden");
  });
});

let focusElement = null;

button.forEach((el) => {
  el.addEventListener("click", () => {
    if (focusElement) {
      focusElement.classList.remove("focus");
      focusElement.disabled = false;
    }
    el.classList.add("focus");
    focusElement = el;
    focusElement.disabled = true;
  });
});

// FIN ANIMACIONES SIDEBAR

// document.addEventListener("DOMContentLoaded", getTotalData);

let btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", postData);

let btnStock = document.getElementById("btnStock");
btnStock.addEventListener("click", getTotalData);

let btnDashboard = document.getElementById("btnDashboard");
btnDashboard.addEventListener("click", () => location.reload());

let btnActivities = document.getElementById("btnActivities");
btnActivities.addEventListener("click", () => location.reload());

let btnSettings = document.getElementById("btnSettings");
btnSettings.addEventListener("click", () => location.reload());

let btnHelp = document.getElementById("btnHelp");
btnHelp.addEventListener("click", () => location.reload());

document.addEventListener("click", dataActions);

let btnUpdate = document.getElementById("btnUpdate");
btnUpdate.disabled = true;
btnUpdate.addEventListener("click", patchData);

let btncancelar = document.querySelectorAll(".cancelar");
btncancelar.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.reload();
  });
});

// let btnbuscar = document.getElementById("btnbuscar");
// btnbuscar.addEventListener("click", getOneData);

async function getTotalData() {
  let url = "http://localhost:3000/bovinos";
  let solicitud = await fetch(url);
  let datos = await solicitud.json();
  let cabecera = document.getElementById("tablehead");
  cabecera.classList.add("bg-info");
  let contenido = document.getElementById("tablecontenido");

  let trh = document.createElement("tr");
  trh.classList.add("text-center");

  let th1 = document.createElement("th");
  th1.classList.add("text-center");
  th1.innerHTML = `Chapeta`;
  let th2 = document.createElement("th");
  th2.classList.add("text-center");
  th2.innerHTML = `Nombre`;
  let th3 = document.createElement("th");
  th3.classList.add("text-center");
  th3.innerHTML = `Color`;
  let th4 = document.createElement("th");
  th4.classList.add("text-center");
  th4.innerHTML = `Sexo`;
  let th5 = document.createElement("th");
  th5.classList.add("text-center");
  th5.innerHTML = `Peso`;
  let th6 = document.createElement("th");
  th6.classList.add("text-center");
  th6.innerHTML = `No. Lote`;
  let th7 = document.createElement("th");
  th7.classList.add("text-center");
  th7.innerHTML = `Raza`;
  let th8 = document.createElement("th");
  th8.classList.add("text-center");
  th8.innerHTML = `Opciones`;

  trh.appendChild(th1);
  trh.appendChild(th2);
  trh.appendChild(th3);
  trh.appendChild(th4);
  trh.appendChild(th5);
  trh.appendChild(th6);
  trh.appendChild(th7);
  trh.appendChild(th8);

  cabecera.appendChild(trh);

  datos.forEach((el) => {
    let tr = document.createElement("tr");
    tr.classList.add("text-center");

    let td1 = document.createElement("td");
    td1.classList.add("align-content-center", "text-center");
    td1.innerHTML = `${el.id_chapeta}`;

    let td2 = document.createElement("td");
    td2.classList.add("align-content-center", "text-center");
    td2.innerHTML = `${el.nombre}`;

    let td3 = document.createElement("td");
    td3.classList.add("align-content-center", "text-center");
    td3.innerHTML = `${el.color}`;

    let td4 = document.createElement("td");
    td4.classList.add("align-content-center", "text-center");
    td4.innerHTML = `${el.sexo}`;

    let td5 = document.createElement("td");
    td5.classList.add("align-content-center", "text-center");
    td5.innerHTML = `${el.peso} kg`;

    let td6 = document.createElement("td");
    td6.classList.add("align-content-center", "text-center");
    td6.innerHTML = `${el.id_lote}`;

    let td7 = document.createElement("td");
    td7.classList.add("align-content-center", "text-center");
    td7.innerHTML = `${el.raza}`;

    // let td8 = document.createElement("td");
    // td8.classList.add("align-content-center", "text-center");
    // td8.innerHTML = `${el.id_actividades}`;

    let td9 = document.createElement("td");
    td9.classList.add("align-content-center", "text-center");
    td9.id = `${el.id_chapeta}`;

    let iconoFicha = document.createElement("i");
    iconoFicha.classList.add(
      "bi",
      "bi-file-earmark-medical-fill",
      "btn",
      "btn-secondary",
      "me-1",
      "verficha"
    );
    iconoFicha.setAttribute("data-bs-toggle", "modal");
    iconoFicha.setAttribute("data-bs-target", "#fichaModal");

    td9.appendChild(iconoFicha);

    let iconoeditar = document.createElement("i");
    iconoeditar.classList.add(
      "bi",
      "bi-pencil-square",
      "btn",
      "btn-warning",
      "me-1",
      "text-light",
      "editar"
    );
    iconoeditar.setAttribute("data-bs-toggle", "modal");
    iconoeditar.setAttribute("data-bs-target", "#addModal");

    td9.appendChild(iconoeditar);

    let iconoeliminar = document.createElement("i");
    iconoeliminar.classList.add(
      "bi",
      "bi-trash-fill",
      "btn",
      "btn-danger",
      "eliminar"
    );

    td9.appendChild(iconoeliminar);

    tr.appendChild(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
    // tr.append(td8);
    tr.appendChild(td9);
    contenido.appendChild(tr);
  });

  const tabla = new DataTable("#tabledatos", {
    // layout: {
    //     topStart: 'pageLength',
    //     topEnd: 'search',
    //     bottomStart: 'info',
    //     bottomEnd: 'paging'
    // }

    layout: {
      topStart: {
        pageLength: {
          menu: [5, 10, 25, 50, 100],
        },
      },
      bottomEnd: {
        paging: {
          number: 5,
        },
      },
    },
    // "language": {
    //     "lengthMenu": "Display MENU records per page",
    //     "zeroRecords": "Nothing found - sorry",
    //     "info": "Showing page PAGE of PAGES",
    //     "infoEmpty": "No records available",
    //     "infoFiltered": "(filtered from MAX total records)"
    // }
    language: {
      lengthMenu: "_MENU_ Ver",
      zeroRecords: "Ningún registro coincide",
      info: "Mostrando pagina _PAGE_ de _PAGES_",
      infoEmpty: "Ningún registro disponible",
      search: "Buscar",
      paginate: {
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });
}

// async function getOneData() {
//   let busqueda = document.getElementById("busqueda").value;
//   let url = `http://localhost/bovinos/${busqueda}`;

//   let respuesta = await fetch(url);
//   let dato = await respuesta.json();
//   console.table(dato);
//   let contenido = document.getElementById("tablecontenido");

//   while (contenido.firstChild) {
//     contenido.removeChild(contenido.firstChild);
//   }

//   let tr = document.createElement("tr");
//   tr.classList.add("text-center");

//   let td1 = document.createElement("td");
//   td1.classList.add("align-content-center");
//   td1.innerHTML = `${dato._id}`;

//   let td2 = document.createElement("td");
//   td2.classList.add("align-content-center");
//   td2.innerHTML = `${dato.nombre}`;

//   let td3 = document.createElement("td");
//   td3.classList.add("align-content-center");
//   td3.innerHTML = `${dato.saldo}`;

//   let td4 = document.createElement("td");
//   td4.id = `${dato._id}`;

//   let iconoeditar = document.createElement("i");
//   iconoeditar.classList.add(
//     "fa-solid",
//     "fa-pen-to-square",
//     "btn",
//     "btn-warning",
//     "me-1",
//     "editar"
//   );

//   td4.appendChild(iconoeditar);

//   let iconoeliminar = document.createElement("i");
//   iconoeliminar.classList.add(
//     "fa-solid",
//     "fa-trash-can",
//     "btn",
//     "btn-danger",
//     "eliminar"
//   );

//   td4.appendChild(iconoeliminar);

//   tr.appendChild(td1);
//   tr.append(td2);
//   tr.append(td3);
//   tr.appendChild(td4);
//   contenido.appendChild(tr);
// }

async function postData() {
  let formulario = document.getElementById("formulario");
  let formData = new FormData(formulario);
  let datosJson = {};
  for (const entrada of formData.entries()) {
    datosJson[entrada[0]] = entrada[1];
  }

  let url = "http://localhost:3000/bovinos";

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosJson),
  };

  let solicitud = await fetch(url, config);
  let datos = await solicitud.text();
  setTimeout(() => {
    location.reload();
  }, 0);
}

function dataActions(e) {
  if (e.target.matches(".editar")) {
    editData(e);
  }
  if (e.target.matches(".eliminar")) {
    deleteData(e);
  }
  if (e.target.matches(".verficha")) {
    showData(e);
  }
}

async function editData(e) {
  btnAdd.disabled = true;
  let elemetoeditar = e.target.parentNode.id;
  let url = `http://localhost:3000/bovinos/${elemetoeditar}`;

  let respuesta = await fetch(url);
  let dato = await respuesta.json();
  console.table(dato);

  let formulario = document.getElementById("formulario");
  formulario.elements["id_chapeta"].value = dato.id_chapeta;
  formulario.elements["nombre"].value = dato.nombre;
  formulario.elements["marcas"].value = dato.marcas;
  formulario.elements["color"].value = dato.color;
  formulario.elements["sexo"].value = dato.sexo;
  formulario.elements["peso"].value = dato.peso;
  formulario.elements["id_lote"].value = dato.id_lote;
  formulario.elements["id_nacimiento"].value = dato.id_nacimiento;
  formulario.elements["id_destete"].value = dato.id_destete;
  formulario.elements["raza"].value = dato.raza;
  formulario.elements["procedencia"].value = dato.procedencia;
  formulario.elements["id_actividades"].value = dato.id_actividades;
  formulario.elements["observaciones"].value = dato.observaciones;

  btnUpdate.disabled = false;
}

async function patchData() {
  let datosF = new FormData(formulario);
  let datosJson = {};
  for (const entrada of datosF.entries()) {
    datosJson[entrada[0]] = entrada[1];
  }
  let elemetoeditar = datosJson.id_chapeta;
  let url = `http://localhost:3000/bovinos/${elemetoeditar}`;
  const conf = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosJson),
  };
  let respuestaedit = await fetch(url, conf);
  setTimeout(() => {
    location.reload();
  }, 0);
}

async function deleteData(e) {
  let elemetoborrar = e.target.parentNode.id;
  let url = `http://localhost:3000/bovinos/${elemetoborrar}`;

  const conf = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_chapeta: elemetoborrar }),
  };

  let respuesta = await fetch(url, conf);
  let dato = await respuesta.text();
  console.table(dato);
  setTimeout(() => {
    location.reload();
  }, 0);
}

async function showData(e) {
  let elemetoFicha = e.target.parentNode.id;
  let url = `http://localhost:3000/bovinos/${elemetoFicha}`;
  let solicitud = await fetch(url);
  let datos = await solicitud.json();

  console.log("estoy en show data");
  let cuerpoModal = document.getElementById("cuerpomodal");

  let card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "100%";
  card.style.height = "max-content";

  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = "img/vaca.jpg";

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerHTML = `<strong>Chapeta:</strong> ${datos.id_chapeta}`;

  let p = document.createElement("p");
  p.classList.add("card-text");
  p.innerHTML = `<strong>Observaciones:</strong> ${datos.observaciones}`;

  let ul = document.createElement("ul");
  ul.classList.add("list-group", "list-group-flush");

  let li1 = document.createElement("li");
  li1.classList.add("list-group-item");
  li1.innerHTML = `<strong>Nombre:</strong> ${datos.nombre}`;
  let li2 = document.createElement("li");
  li2.classList.add("list-group-item");
  li2.innerHTML = `<strong>Marcas:</strong> ${datos.marcas}`;
  let li3 = document.createElement("li");
  li3.classList.add("list-group-item");
  li3.innerHTML = `<strong>Color:</strong> ${datos.color}`;
  let li4 = document.createElement("li");
  li4.classList.add("list-group-item");
  li4.innerHTML = `<strong>Sexo:</strong> ${datos.sexo}`;
  let li5 = document.createElement("li");
  li5.classList.add("list-group-item");
  li5.innerHTML = `<strong>Peso:</strong> ${datos.peso}`;
  let li6 = document.createElement("li");
  li6.classList.add("list-group-item");
  li6.innerHTML = `<strong>No. Lote:</strong> ${datos.id_lote}`;
  let li7 = document.createElement("li");
  li7.classList.add("list-group-item");
  li7.innerHTML = `<strong>No. nacimiento:</strong> ${datos.id_nacimiento}`;
  let li8 = document.createElement("li");
  li8.classList.add("list-group-item");
  li8.innerHTML = `<strong>No. destete:</strong> ${datos.id_destete}`;
  let li9 = document.createElement("li");
  li9.classList.add("list-group-item");
  li9.innerHTML = `<strong>Raza:</strong> ${datos.raza}`;
  let li10 = document.createElement("li");
  li10.classList.add("list-group-item");
  li10.innerHTML = `<strong>Procedencia:</strong> ${datos.procedencia}`;
  let li11 = document.createElement("li");
  li11.classList.add("list-group-item");
  li11.innerHTML = `<strong>No. actividades:</strong> ${datos.id_actividades}`;

  let cardBody2 = document.createElement("div");
  cardBody2.classList.add("card-body");

  let a1 = document.createElement("a");
  a1.classList.add("card-link");
  a1.href = "#";
  a1.textContent = `Padre`;
  let a2 = document.createElement("a");
  a2.classList.add("card-link");
  a2.href = "#";
  a2.textContent = `Madre`;

  cardBody.appendChild(h5);
  cardBody.appendChild(p);

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
  ul.appendChild(li5);
  ul.appendChild(li6);
  ul.appendChild(li7);
  ul.appendChild(li8);
  ul.appendChild(li9);
  ul.appendChild(li10);
  ul.appendChild(li11);

  cardBody2.appendChild(a1);
  cardBody2.appendChild(a2);

  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(ul);
  card.appendChild(cardBody2);

  cuerpoModal.appendChild(card);
}
