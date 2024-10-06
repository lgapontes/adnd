
function openLoading() {
  document.getElementById('loading').style.display = 'block';
}

function closeLoading() {
  document.getElementById('loading').style.display = 'none';
}

function closeMain(event) {
  if (event) event.preventDefault();
  openLoading();
  document.getElementById('pagina-inicial').style.display = 'none';
  document.getElementById('pagina-menus').style.display = 'none';
  document.getElementById('header-botao-voltar').style.display = 'block';
}

function openMain(event) {
  if (event) event.preventDefault();
  openLoading();
  document.getElementById('pagina-inicial').style.display = 'block';
  document.getElementById('pagina-menus').style.display = 'block';
  document.getElementById('header-botao-voltar').style.display = 'none';
  document.getElementById('pagina-personagens').style.display = 'none';
  document.getElementById('ficha').style.display = 'none';
  closeLoading();
}

function openPersonagens(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-personagens').style.display = 'block';
  document.getElementById('ficha').style.display = 'none';

  carregarCombosRacas(()=>{
    carregarCombosClasses(()=>{
      definirAtributosTela(() => {
        carregarComboTendencias(()=>{
          carregarComboLinhagem(()=>{
            closeLoading();
          });
        });
      });
    });
  });
}

document.getElementById('menu-personagens').addEventListener('click',(event)=>{
  openPersonagens(event);
});

document.getElementById('header-botao-voltar').addEventListener('click',(event)=>{
  openMain(event);
});

document.getElementById('texto-botao-voltar').addEventListener('click',(event)=>{
  openMain(event);
});

document.getElementById('texto-botao-limpar').addEventListener('click',(event)=>{
  window.location.href = 'index.html?p=pj'
});

document.getElementById('texto-formulario-ravenloft').addEventListener('input',(event)=>{
  document.getElementById('texto-formulario-darksun').checked = false;
  document.getElementById('texto-formulario-nivel').value = 1;
  definirAtributosMinimos();
});

function definirAtributoMinimo(darksun,number,atributo) {
  let raca = obterRacaSelecionada();
  let classe = obterClasseSelecionada();

  let minimo = 3;
  number.setAttribute("min", minimo);
  number.setAttribute("max", 18);
  number.value = minimo;

  if (raca != 'Todas') {
    let ajuste = RACAS[raca][atributo].minimo;
    if (ajuste > minimo) {
      minimo = ajuste;
    }
  }
  if (classe != 'Todas') {
    let ajuste = CLASSES[classe]["Habilidades Exigidas"][atributo];
    if (ajuste > minimo) {
      minimo = ajuste;
    }
  }

  if (darksun) {
    if (minimo < 8) {
      minimo = 8;
    }
    if (parseInt(number.value) < minimo) {
      number.value = minimo;
    }
    number.setAttribute("min", minimo);
    number.setAttribute("max", 20);
  } else {
    if (parseInt(number.value) < minimo) {
      number.value = minimo;
    }
    if (parseInt(number.value) > 18) {
      number.value = 18;
    }
    number.setAttribute("min", minimo);
    number.setAttribute("max", 18);
  }
}

function definirAtributosMinimos() {
  let darksun = document.getElementById('texto-formulario-darksun').checked;
  definirAtributoMinimo(darksun,document.getElementById('texto-formulario-minimo-forca'),"Força");
  definirAtributoMinimo(darksun,document.getElementById('texto-formulario-minimo-destreza'),"Destreza");
  definirAtributoMinimo(darksun,document.getElementById('texto-formulario-minimo-constituicao'),"Constituição");
  definirAtributoMinimo(darksun,document.getElementById('texto-formulario-minimo-inteligencia'),"Inteligência");
  definirAtributoMinimo(darksun,document.getElementById('texto-formulario-minimo-sabedoria'),"Sabedoria");
  definirAtributoMinimo(darksun,document.getElementById('texto-formulario-minimo-carisma'),"Carisma");
}

function definirAtributosTela(callback) {
  sortear_atributos_tela(atributos => {
    document.getElementById('texto-formulario-atributo-forca').value = atributos["Força"];
    document.getElementById('texto-formulario-atributo-destreza').value = atributos["Destreza"];
    document.getElementById('texto-formulario-atributo-constituicao').value = atributos["Constituição"];
    document.getElementById('texto-formulario-atributo-inteligencia').value = atributos["Inteligência"];
    document.getElementById('texto-formulario-atributo-sabedoria').value = atributos["Sabedoria"];
    document.getElementById('texto-formulario-atributo-carisma').value = atributos["Carisma"];
    callback();
  });
}

document.getElementById('texto-formulario-darksun').addEventListener('input',(event)=>{
  document.getElementById('texto-formulario-ravenloft').checked = false;
  if (document.getElementById('texto-formulario-darksun').checked) {
    document.getElementById('texto-formulario-nivel').value = 3;
  } else {
    document.getElementById('texto-formulario-nivel').value = 1;
  }
  definirAtributosMinimos();
});

document.getElementById('texto-botao-mostrar1').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('texto-botao-mostrar1').style.display = 'none';
  document.getElementById('texto-botao-esconder1').style.display = 'block';
  document.getElementById('texto-bloco1').style.display = 'block';
});

document.getElementById('texto-botao-esconder1').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('texto-botao-esconder1').style.display = 'none';
  document.getElementById('texto-botao-mostrar1').style.display = 'block';
  document.getElementById('texto-bloco1').style.display = 'none';
});

document.getElementById('texto-botao-mostrar2').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('texto-botao-mostrar2').style.display = 'none';
  document.getElementById('texto-botao-esconder2').style.display = 'block';
  document.getElementById('texto-bloco2').style.display = 'block';
});

document.getElementById('texto-botao-esconder2').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('texto-botao-esconder2').style.display = 'none';
  document.getElementById('texto-botao-mostrar2').style.display = 'block';
  document.getElementById('texto-bloco2').style.display = 'none';
});

document.getElementById('texto-botao-rolar-atributos').addEventListener('click',(event)=>{
  event.preventDefault();
  openLoading();
  definirAtributosTela(() => {
    closeLoading();
  });
});

document.getElementById('texto-botao-rolar').addEventListener('click',(event)=>{
  event.preventDefault();
  openLoading();
  render(() => {
    closeLoading();
  });
});

function criarOption(select,value,texto) {
  let opt = document.createElement('option');
  if ( (value == 'Todas') || (value == 'Todos') ) {
    value = 'Todas';
  }
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}

var COMBO_SELECIONADO = 'nenhum';

function obterClasseSelecionada() {
  let selecionada = 'Todas';
  if (document.getElementById('texto-formulario-classe').options.length > 0) {
    selecionada = document.getElementById('texto-formulario-classe').options[document.getElementById('texto-formulario-classe').selectedIndex].value;
  }
  return selecionada;
}

function carregarCombosRacas(callback) {
  let selecionada = obterClasseSelecionada();

  let combo = document.getElementById('texto-formulario-raca');
  combo.innerHTML = '';

  if (selecionada != 'Todas') {
    CLASSES[selecionada]["Raças Permitidas"].forEach((classe, i) => {
      COMBO_RACAS.forEach((item, j) => {
        if (classe == item.value) {
          criarOption(combo,item.value,item.texto);
        }

        if (i == (CLASSES[selecionada]["Raças Permitidas"].length - 1)) {
          if (j == (COMBO_RACAS.length - 1)) {
            callback();
          }
        }
      });
    });
  } else {
    COMBO_RACAS.forEach((item, i) => {
      criarOption(combo,item.value,item.texto);

      if (i == (COMBO_RACAS.length - 1)) {
        callback();
      }
    });
  }
}

function obterRacaSelecionada() {
  let raca_selecionada = 'Todas';
  if (document.getElementById('texto-formulario-raca').options.length > 0) {
    raca_selecionada = document.getElementById('texto-formulario-raca').options[document.getElementById('texto-formulario-raca').selectedIndex].value;
  }
  return raca_selecionada;
}

function carregarCombosClasses(callback) {
  let raca_selecionada = obterRacaSelecionada();

  let combo = document.getElementById('texto-formulario-classe');
  combo.innerHTML = '';

  if (raca_selecionada != 'Todas') {
    let keys_classes = Object.keys(CLASSES);
    keys_classes.forEach((key_classe, i) => {
      if (CLASSES[key_classe]["Raças Permitidas"].includes(raca_selecionada)) {
        criarOption(combo,COMBO_CLASSES[COMBO_CLASSES_INDEX[key_classe]].value,COMBO_CLASSES[COMBO_CLASSES_INDEX[key_classe]].texto);
      }

      if (i == (keys_classes.length - 1)) {
        callback();
      }
    });
  } else {
    COMBO_CLASSES.forEach((item, i) => {
      criarOption(combo,item.value,item.texto);

      if (i == (COMBO_CLASSES.length - 1)) {
        callback();
      }
    });
  }
}

function carregarComboTendencias(callback) {
  let classe_selecionada = obterClasseSelecionada();
  let keys_tendencias = [];

  let combo = document.getElementById('texto-formulario-tendencia');
  combo.innerHTML = '';

  if (classe_selecionada == 'Todas') {
    keys_tendencias = TENDENCIAS;
  } else {
    keys_tendencias = CLASSES[classe_selecionada].tendencias;
  }

  let tendencias = ['Todas'].concat(keys_tendencias);
  tendencias.forEach((tendencia, index_tendencia) => {
    criarOption(combo,tendencia,tendencia);

    if (index_tendencia == (tendencias.length - 1)) {
      callback();
    }
  });
}

function carregarComboLinhagem(callback) {
  let combo = document.getElementById('texto-formulario-linhagem');
  combo.innerHTML = '';

  let raca_selecionada = obterRacaSelecionada();
  let lista_linhagens = [];

  if (raca_selecionada == "Meio-Vistani") {
    lista_linhagens = Object.keys(CLANS);
    lista_linhagens[0] = 'Todas';
  } else {
    lista_linhagens = ['Não é um personagem Vistani'];
  }

  lista_linhagens.forEach((linhagem, index_linhagem) => {
    criarOption(combo,linhagem,linhagem);

    if (index_linhagem == (lista_linhagens.length - 1)) {
      callback();
    }
  });
}

document.getElementById('texto-formulario-raca').addEventListener('input',event=>{
  let raca_selecionada = obterRacaSelecionada();

  if (COMBO_SELECIONADO == 'nenhum') {
    if (raca_selecionada != 'Todas') {
      COMBO_SELECIONADO = 'racas';
    } else {
      COMBO_SELECIONADO = 'nenhum';
    }
  }

  if (COMBO_SELECIONADO == 'racas') {
    carregarCombosClasses(()=>{
      carregarComboLinhagem(()=>{
        definirAtributosMinimos();
      });
    });
  }
});

document.getElementById('texto-formulario-classe').addEventListener('input',event=>{
  let selecionada = obterClasseSelecionada();

  if (COMBO_SELECIONADO == 'nenhum') {
    if (selecionada != 'Todas') {
      COMBO_SELECIONADO = 'classes';
    } else {
      COMBO_SELECIONADO = 'nenhum';
    }
  }

  if (COMBO_SELECIONADO == 'classes') {
    if (selecionada == 'Todas') {
      COMBO_SELECIONADO = 'nenhum';
    }

    carregarCombosRacas(()=>{
      carregarComboTendencias(()=>{
        definirAtributosMinimos();
      });
    });
  }
});

function iniciar() {
  let url = new URLSearchParams(window.location.search);
  let pagina = url.get('p');

  if (pagina == 'pj') {
    openPersonagens();
  }
}

iniciar();
