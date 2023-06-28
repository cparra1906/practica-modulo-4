const URLbase = "https://swapi.dev/api/";

class Personaje {
  constructor(nombre, estatura, peso) {
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
  }
}

const obtenerPersonaje = (id) => {
  return fetch(`${URLbase}people/${id}/`)
    .then(response => response.json())
    .catch(e => console.error(e, ": No se pudo obtener el personaje."));
};

const crearPersonaje = async (id) => {
  let data = await obtenerPersonaje(id);
  let { name: nombre, height: estatura, mass: peso } = data;
  let obj = new Personaje(nombre, estatura, peso);
  return obj;
};

function* generarPersonaje(IDinicio, IDfin) {
  for (let i = IDinicio; i <= IDfin; i++) {
    yield crearPersonaje(i);
  }
}

let g1a5 = generarPersonaje(1, 5);
let g6a10 = generarPersonaje(6, 10);
let g11a15 = generarPersonaje(11, 15);

const eventoHover = async (elementoHTML, generador, color) => {
  let personaje = generador.next();
  console.log(personaje);
  if (personaje.done) {
    return false;
  } else {
    pintarHTML(elementoHTML, await personaje.value, color);
    return true;
  }
};

const pintarHTML = (elementoHTML, personaje, color) => {
  elementoHTML.innerHTML += `
  <div class="col-12 col-md-6 col-lg-4">
  <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                      style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                      <div class="timeline-icon" style="background-color: ${color};"><i class="fa fa-address-card"
                          aria-hidden="true"></i>
                      </div>
                      <div class="timeline-text">
                        <h6>${personaje.nombre}</h6>
                        <p>Estatura: ${personaje.estatura} Peso: ${personaje.peso} </p>
                      </div>
                    </div>
  `;
};

const limpiarHTML = (elementoHTML) => {
  elementoHTML.innerHTML = "";
};

const ID1a5 = document.getElementById("ID1a5");
const ID6a10 = document.getElementById("ID6a10");
const ID11a15 = document.getElementById("ID11a15");

ID1a5.addEventListener("mouseenter", function () { eventoHover(firstRow, g1a5, "salmon"); });
ID6a10.addEventListener("mouseenter", function () { eventoHover(secondRow, g6a10, "lightgreen"); });
ID11a15.addEventListener("mouseenter", function () { eventoHover(thirdRow, g11a15, "lightskyblue"); });