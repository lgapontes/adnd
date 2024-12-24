/* version */
const VERSION = '1.0.4';
document.getElementById('texto-formulario-versao').innerHTML = `Versão ${VERSION}`;

/* debug */
const DEBUG = false;
function debug(texto) {
  if (DEBUG) {
    console.log(texto);
  }
}

function error(texto) {
  console.error(texto);
}

function warning(texto) {
  console.warn(texto);
}

var forcar_classe = 'Todas';
var forcar_raca = 'Todas';
var forcar_havenloft = false;
var forcar_darksun = false;
//forcar_classe = 'Vingador';
//forcar_havenloft = true;


/*
function popularSelectRacas(callback) {
  let racas = Object.keys(RACAS);
  racas.unshift('Todas');
  let selectRacas = document.getElementById('racas');
  selectRacas.innerHTML = '';
  racas.forEach((raca, index) => {
    criarOption(selectRacas,raca,raca);
    if (index == (racas.length - 1)) {
      selectRacas.selectedIndex = 0;
      callback();
    }
  });
}
*/
