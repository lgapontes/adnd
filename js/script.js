/* version */
const VERSION = '1.0.6';
let versao_texto = `Versão ${VERSION}`;
document.getElementById('texto-formulario-versao1').innerHTML = versao_texto;
document.getElementById('texto-formulario-versao2').innerHTML = versao_texto;
document.getElementById('texto-formulario-versao3').innerHTML = versao_texto;
document.getElementById('texto-formulario-versao4').innerHTML = versao_texto;
document.getElementById('texto-formulario-versao5').innerHTML = versao_texto;

/* Testes unitários */
const UNIT_TESTS = false;

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

var forcar_classe = {
  primeira: 'Todas',
  segunda: 'Nenhuma',
  terceira: 'Nenhuma',
  multiclasse: false,

  tem_multiclasse_sugerida: false,
  multiclasse_sugerida: '',
};
var forcar_raca = 'Todas';
var forcar_havenloft = false;
var forcar_darksun = false;

var ARMAS_MAIS_FORTES_GLOBAL = [];
