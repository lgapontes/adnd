
const QTDE_TESTS = 1000;

function sortear100Percento() {
  return true;
}

function sortear80Percento() {
  return (Math.floor(Math.random() * 10) <= 7);
}

function sortear20Percento() {
  return (Math.floor(Math.random() * 10) > 7);
}

function sortear50Percento() {
  return (Math.floor(Math.random() * 10) <= 4);
}

function sortear40Percento() {
  return (Math.floor(Math.random() * 10) <= 3);
}

function sortearCheck(id,percentual) {
  let tag = document.getElementById(id);
  let resultado = percentual();

  if (resultado) {
    tag.checked = true;
  } else {
    tag.checked = false;
  }

  return resultado;
}

function sortearValorSelect(id,percentual) {
  let tag = document.getElementById(id);
  let resultado = percentual();

  if (resultado) {
    let lista = Array.from(tag.options).map(el => el.value);
    let index = Math.floor(Math.random() * lista.length);
    tag.selectedIndex = index;
  }

  return tag.options[tag.selectedIndex].value;
}

function selectTemMuitosOptions(id) {
  let tag = document.getElementById(id);
  let lista = Array.from(tag.options).map(el => el.value);
  return (lista.length > 1);
}

function definirValorTexto(id,percentual,valor) {
  let tag = document.getElementById(id);
  let resultado = percentual();

  if (resultado) {
    tag.value = valor;
  }
}

function testDefinirAtributosTela(callback) {
  if (sortear50Percento()) {
    definirAtributosTela(() => {
      callback();
    });
  } else {
    callback();
  }
}

function makeUnitTests(callback) {
  /*
    texto-formulario-nivel - select
    texto-formulario-vida-fixa
    texto-formulario-idade

    texto-formulario-ravenloft - check
    texto-formulario-darksun - check
    texto-formulario-vida - check
    texto-formulario-multiclasse - check

    texto-formulario-raca - select
    texto-formulario-classe1 - select
    texto-formulario-classe2
    texto-formulario-classe3

    texto-formulario-tendencia
    texto-formulario-linhagem
    texto-formulario-arma
    texto-formulario-escudo
    texto-formulario-armadura
    texto-formulario-pericia

    texto-formulario-darksun-tipo-mago - nao

    texto-formulario-divindade
    texto-formulario-escola
    texto-formulario-escola-magia
    texto-formulario-disciplina
    texto-formulario-modo-defesa
    texto-formulario-ciencia
    texto-formulario-devocao

    texto-formulario-minimo-forca
    texto-formulario-minimo-destreza
    texto-formulario-minimo-constituicao
    texto-formulario-minimo-inteligencia
    texto-formulario-minimo-sabedoria
    texto-formulario-minimo-carisma

    texto-botao-rolar-atributos - botao

    texto-formulario-atributo-forca
    texto-formulario-atributo-destreza
    texto-formulario-atributo-constituicao
    texto-formulario-atributo-inteligencia
    texto-formulario-atributo-sabedoria
    texto-formulario-atributo-carisma
  */

  sortearValorSelect('texto-formulario-nivel',sortear100Percento);

  definirValorTexto('texto-formulario-vida-fixa',sortear20Percento,40);

  definirValorTexto('texto-formulario-idade',sortear20Percento,30);

  sortearCheck('texto-formulario-ravenloft',sortear50Percento);

  sortearCheck('texto-formulario-vida',sortear50Percento);

  let multiclasse = sortearCheck('texto-formulario-multiclasse',sortear80Percento);

  sortearValorSelect('texto-formulario-classe1',sortear50Percento);

  if (multiclasse) {
    sortearValorSelect('texto-formulario-classe2',sortear50Percento);

    sortearValorSelect('texto-formulario-classe3',sortear50Percento);
  }

  sortearValorSelect('texto-formulario-tendencia',sortear50Percento);

  if (selectTemMuitosOptions('texto-formulario-linhagem')) {
    sortearValorSelect('texto-formulario-linhagem',sortear50Percento);
  }

  sortearValorSelect('texto-formulario-arma',sortear50Percento);

  if (selectTemMuitosOptions('texto-formulario-escudo')) {
    sortearValorSelect('texto-formulario-escudo',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-armadura')) {
    sortearValorSelect('texto-formulario-armadura',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-armadura')) {
    sortearValorSelect('texto-formulario-armadura',sortear50Percento);
  }

  sortearValorSelect('texto-formulario-pericia',sortear50Percento);

  // sortearValorSelect('texto-formulario-darksun-tipo-mago',sortear50Percento);

  sortearValorSelect('texto-formulario-divindade',sortear50Percento);

  if (selectTemMuitosOptions('texto-formulario-escola')) {
    sortearValorSelect('texto-formulario-escola',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-escola-magia')) {
    sortearValorSelect('texto-formulario-escola-magia',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-disciplina')) {
    sortearValorSelect('texto-formulario-disciplina',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-modo-defesa')) {
    sortearValorSelect('texto-formulario-modo-defesa',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-ciencia')) {
    sortearValorSelect('texto-formulario-ciencia',sortear50Percento);
  }

  if (selectTemMuitosOptions('texto-formulario-devocao')) {
    sortearValorSelect('texto-formulario-devocao',sortear50Percento);
  }

  definirValorTexto('texto-formulario-minimo-forca',sortear40Percento,17);
  definirValorTexto('texto-formulario-minimo-destreza',sortear40Percento,17);
  definirValorTexto('texto-formulario-minimo-constituicao',sortear40Percento,17);
  definirValorTexto('texto-formulario-minimo-inteligencia',sortear40Percento,17);
  definirValorTexto('texto-formulario-minimo-sabedoria',sortear40Percento,17);
  definirValorTexto('texto-formulario-minimo-carisma',sortear40Percento,17);

  // texto-botao-rolar-atributos - botao

  testDefinirAtributosTela(()=>{

    definirValorTexto('texto-formulario-atributo-forca',sortear40Percento,17);
    definirValorTexto('texto-formulario-atributo-destreza',sortear40Percento,17);
    definirValorTexto('texto-formulario-atributo-constituicao',sortear40Percento,17);
    definirValorTexto('texto-formulario-atributo-inteligencia',sortear40Percento,17);
    definirValorTexto('texto-formulario-atributo-sabedoria',sortear40Percento,17);
    definirValorTexto('texto-formulario-atributo-carisma',sortear40Percento,17);

    render(()=>{
      callback();
    });

  });
}

function unitTests() {
  if (UNIT_TESTS) {
    console.log(`Realizando ${QTDE_TESTS} unitários.`);

    let lista = Array.from(Array(QTDE_TESTS).keys());
    lista.forEach((item, index) => {
      makeUnitTests(()=>{
        if (index == (lista.length -1)) {
          console.log('Testes realizados com sucesso!');
        }
      });
    });
  }
}

unitTests();
