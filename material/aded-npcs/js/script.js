/* debug */
const DEBUG = false;
function debug(texto) {
  if (DEBUG) {
    console.log(texto);
  }
}

var forcar_classe = 'Todas';
var forcar_raca = 'Todas';
var forcar_havenloft = false;
//forcar_classe = 'Vingador';
//forcar_havenloft = true;

function criarOption(select,value,texto) {
  let opt = document.createElement('option');
  if ( (value == 'Todas') || (value == 'Todos') ) {
    value = 'Todas';
  }
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}

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
