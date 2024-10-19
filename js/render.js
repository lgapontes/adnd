
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

  document.getElementById('pagina-itens').style.display = 'none';
  document.getElementById("ficha-itens-armeiro").style.display = 'none';
  document.getElementById("ficha-itens-alfaiataria").style.display = 'none';
  document.getElementById("ficha-itens-taverna").style.display = 'none';
  document.getElementById("ficha-itens-loot").style.display = 'none';

  document.getElementById('pagina-npcs').style.display = 'none';
  document.getElementById('ficha-npcs').style.display = 'none';

  document.getElementById('ficha').style.display = 'none';
  closeLoading();
}

function obterHitDiceNPC() {
  let texto_formulario_npc_dados_vida = document.getElementById('texto-formulario-npc-dados-vida');

  let nivel = 1;

  if ( isInt(texto_formulario_npc_dados_vida.value) ) {
    nivel = parseInt(texto_formulario_npc_dados_vida.value);
  }

  return nivel;
}

function openNPCs(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-npcs').style.display = 'block';
  document.getElementById('ficha-npcs').style.display = 'block';

  preencher_profissoes(()=>{
    let nivel = obterHitDiceNPC();
    render_npc(nivel,()=>{
      closeLoading();
    });
  });
}

function openItens(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-itens').style.display = 'block';
  renderItens(()=>{
    closeLoading();
  });
}

function openPersonagens(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-personagens').style.display = 'block';
  document.getElementById('ficha').style.display = 'none';

  carregarCombosRacas(()=>{
    carregarCombosClasses(null,()=>{
      definirAtributosTela(() => {
        carregarComboTendencias(()=>{
          carregarComboLinhagem(()=>{
            carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
              render(() => {
                closeLoading();
              });
            });
          });
        });
      });
    });
  });
}

document.getElementById('menu-npcs').addEventListener('click',(event)=>{
  openNPCs(event);
});

document.getElementById('menu-itens').addEventListener('click',(event)=>{
  openItens(event);
});

document.getElementById('menu-personagens').addEventListener('click',(event)=>{
  openPersonagens(event);
});

document.getElementById('header-botao-voltar').addEventListener('click',(event)=>{
  openMain(event);
});

document.getElementById('texto-botao-voltar').addEventListener('click',(event)=>{
  openMain(event);
});

document.getElementById('texto-botao-voltar-itens').addEventListener('click',(event)=>{
  openMain(event);
});

document.getElementById('texto-botao-voltar-npcs').addEventListener('click',(event)=>{
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

function definirIdadeMinimaMaxima(callback) {
  let campo_idade = document.getElementById('texto-formulario-idade');
  let raca = obterRacaSelecionada();

  let minimo = 1;
  let maximo = 1000;
  let dica = '';

  if (raca != 'Todas') {
    // idade: { minimo: 16, maximo: 130 },

    if (RACAS[raca].idade.minimo > minimo) {
      minimo = RACAS[raca].idade.minimo;
    }
    if (RACAS[raca].idade.maximo < maximo) {
      maximo = RACAS[raca].idade.maximo;
    }

    dica = `Valor mínimo ${minimo} e máximo ${maximo}`;
  }

  let valor = campo_idade.value;

  if ( (valor) && (valor != '') ) {
    if (valor < minimo) {
      valor = minimo;
    }
    if (valor > maximo) {
      valor = maximo;
    }

    campo_idade.value = valor;
  }

  campo_idade.setAttribute("min", minimo);
  campo_idade.setAttribute("max", maximo);
  document.getElementById('texto-formulario-idade-dica').innerHTML = dica;

  callback();
  return;
}

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

document.getElementById('texto-botao-rolar-itens').addEventListener('click',(event)=>{
  event.preventDefault();
  renderItens(()=>{});
});

document.getElementById('texto-botao-rolar-npcs').addEventListener('click',(event)=>{
  event.preventDefault();
  openLoading();
  let nivel = obterHitDiceNPC();
  render_npc(nivel,()=>{
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

function criarOptionEscola(select,value,texto) {
  let opt = document.createElement('option');
  if ( (value != 'Todas') && (value != 'Nenhuma') ) {
    texto = LISTA_ESCOLAS_ARCANAS_MAGO_PARA_ESCOLA[value];
  }
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}

function criarOptionPericias(select,pericia) {
  let opt = document.createElement('option');
  opt.value = pericia.value;
  opt.innerHTML = pericia.option;
  opt.setAttribute("grupo", pericia.grupo);
  select.appendChild(opt);
}

function criarOptionSemAlterarTexto(select,value,texto) {
  let opt = document.createElement('option');
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}

var COMBO_SELECIONADO = 'nenhum';

function obterEscolaSelecionada() {
  let texto_formulario_escola = document.getElementById('texto-formulario-escola');
  let selecionada = 'Todas';
  if (texto_formulario_escola.options.length > 0) {
    selecionada = texto_formulario_escola.options[texto_formulario_escola.selectedIndex].value;
  }

  let retorno = { selecionada: selecionada, escola_especialista: false };

  if ( (retorno.selecionada != 'Todas') && (retorno.selecionada != 'Nenhuma') ) {
    retorno.escola_especialista = true;
  }

  return retorno;
}

function obterNivelSelecionado() {
  let texto_formulario_nivel = document.getElementById('texto-formulario-nivel');
  let nivel = 1;
  if (isInt(texto_formulario_nivel.value)) {
    nivel = parseInt(texto_formulario_nivel.value);

    if (nivel < 1) nivel = 1;
    if (nivel > 3) nivel = 3;
  }
  return nivel;
}

function obterClasseSelecionada() {
  let selecionada = 'Todas';
  if (document.getElementById('texto-formulario-classe').options.length > 0) {
    selecionada = document.getElementById('texto-formulario-classe').options[document.getElementById('texto-formulario-classe').selectedIndex].value;
  }
  return selecionada;
}

function obterTendenciaSelecionada() {
  let selecionada = 'Todas';
  if (document.getElementById('texto-formulario-tendencia').options.length > 0) {
    selecionada = document.getElementById('texto-formulario-tendencia').options[document.getElementById('texto-formulario-tendencia').selectedIndex].value;
  }
  return selecionada;
}

function carregarCombosRacas(callback) {
  let selecionada = obterClasseSelecionada();

  let combo = document.getElementById('texto-formulario-raca');
  combo.innerHTML = '';

  if (selecionada != 'Todas') {
    let index_humano = -1;
    let contador = -1;

    CLASSES[selecionada]["Raças Permitidas"].forEach((classe, i) => {
      COMBO_RACAS.forEach((item, j) => {
        if (classe == item.value) {
          contador = contador + 1;
          criarOption(combo,item.value,item.texto);

          if (item.value == 'Humano') {
            index_humano = contador;
          }
        }

        if (i == (CLASSES[selecionada]["Raças Permitidas"].length - 1)) {
          if (j == (COMBO_RACAS.length - 1)) {
            if (index_humano > -1) {
              combo.selectedIndex = index_humano;
            }

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

function carregarCombosClasses(selecionada,callback) {
  let forcar_classe = false;
  if ( (selecionada) && (selecionada != null) && (selecionada != undefined) && (selecionada != 'Todas') ) {
    forcar_classe = true;
  }

  let raca_selecionada = obterRacaSelecionada();

  let combo = document.getElementById('texto-formulario-classe');
  combo.innerHTML = '';

  if ( (raca_selecionada != 'Todas') && (!forcar_classe) ) {
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
    let index_forcar = -1;

    COMBO_CLASSES.forEach((item, i) => {
      criarOption(combo,item.value,item.texto);

      if (forcar_classe) {
        if (selecionada == item.value) {
          index_forcar = i;
        }
      }

      if (i == (COMBO_CLASSES.length - 1)) {
        if (index_forcar > -1) {
          combo.selectedIndex = index_forcar;
        }

        callback();
      }
    });
  }
}

document.getElementById('texto-formulario-tendencia').addEventListener('input',(event)=>{
  event.preventDefault();
  carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{});
});

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

const PARAMETRO_ITENS_PADRAO = { armas: true, escudos: true, armaduras: true, pericias: true, escolas: true, magias_arcanas: true };

function carregarCombosItens(parametro,callback) {
  // let parametro = { armas: true, escudos: true, armaduras: true, pericias: true, escolas: true };

  let armas = true;
  let escudos = true;
  let armaduras = true;
  let pericias = true;
  let escolas = true;
  let magias_arcanas = true;

  if (parametro) {
    if (parametro.armas == false) armas = false;
    if (parametro.escudos == false) escudos = false;
    if (parametro.armaduras == false) armaduras = false;
    if (parametro.pericias == false) pericias = false;
    if (parametro.escolas == false) escolas = false;
    if (parametro.magias_arcanas == false) magias_arcanas = false;
  }

  carregarComboArmas(armas,()=>{
    carregarComboEscudos(escudos,()=>{
      carregarComboArmaduras(armaduras,()=>{
        carregarComboPericia(pericias,()=>{
          carregarComboEscolas(escolas,()=>{
            carregarComboMagiasArcanas(magias_arcanas,()=>{
              callback();
            });
          });
        });
      });
    });
  });
}

function carregarComboEscolasOptions(escolas,callback) {
  let combo = document.getElementById('texto-formulario-escola');
  combo.innerHTML = '';

  let options = [];

  if (escolas.length == 1) {
    options = escolas;
  } else {
    options = ['Todas'].concat(escolas);
  }

  options.forEach((option, index_option) => {
    criarOptionEscola(combo,option,option);

    if (index_option == (options.length - 1)) {
      callback();
    }
  });
}

function carregarComboEscolas(carregar,callback) {
  if (!carregar) {
    callback();
    return;
  }

  let classe_selecionada = obterClasseSelecionada();
  let keys = [];

  if (classe_selecionada == 'Todas') {
    keys = LISTA_ESCOLAS_ARCANAS;
    carregarComboEscolasOptions(keys,callback);
  } else {
    if (classe_selecionada == 'Mago') {
      keys = LISTA_ESCOLAS_ARCANAS_SEM_ELEMENTALISTA;
      carregarComboEscolasOptions(keys,callback);
    } else {
      if (CLASSES[classe_selecionada]["Grupo"] == 'Arcano') {
        keys = [classe_selecionada];
      } else {
        keys = ['Nenhuma'];
      }
      carregarComboEscolasOptions(keys,callback);
    }
  }
}

function carregarComboMagiasArcanasOptions(keys_escolas,callback) {
  let combo = document.getElementById('texto-formulario-escola-magia');
  combo.innerHTML = '';

  let niveis = [...Array(obterNivelSelecionado()).keys()];

  niveis.forEach((nivel, index_nivel) => {
    // let keys_escolas = Object.keys(MAGIAS_ARCANAS[nivel]); NAO PRECISA POIS PEGA NIVEL ABAIXO

    keys_escolas.forEach((escola, index_escola) => {

      MAGIAS_ARCANAS[nivel][escola].forEach((magia, index_magia) => {

        if ( (index_nivel == 0) && (index_escola == 0) && (index_magia == 0) ) {
          criarOption(combo,'Todas','Todas');
        }

        let texto = `${magia} (${nivel + 1}º Círculo, ${LISTA_ESCOLAS_ARCANAS_MAGO_PARA_ESCOLA[escola]})`;
        criarOption(combo,magia,texto);

        if (index_magia == (MAGIAS_ARCANAS[nivel][escola].length - 1)) {
          if (index_escola == (keys_escolas.length - 1)) {
            if (index_nivel == (niveis.length - 1)) {
              callback();
            }
          }
        }
      });
    });
  });
}

function carregarComboMagiasArcanas(carregar,callback) {
  if (!carregar) {
    callback();
    return;
  }

  let retorno = obterEscolaSelecionada();
  // let retorno = { selecionada: selecionada, escola_especialista: false };

  let todas_escolas = JSON.parse(JSON.stringify(LISTA_ESCOLAS_ARCANAS));

  if (retorno.escola_especialista) {
    let keys_escolas = [retorno.selecionada];

    todas_escolas.splice(todas_escolas.indexOf(retorno.selecionada), 1);

    let escolas_opostas = ESCOLAS_ARCANAS_OPOSTAS[retorno.selecionada];

    escolas_opostas.forEach((oposta, index_oposta) => {

      todas_escolas.splice(todas_escolas.indexOf(LISTA_ESCOLAS_ARCANAS_ESCOLA_PARA_MAGO[oposta]), 1);

      if (index_oposta == (escolas_opostas.length - 1)) {
        keys_escolas.push(...todas_escolas);

        carregarComboMagiasArcanasOptions(keys_escolas,callback);
      }
    });

  } else {
    let classe_selecionada = obterClasseSelecionada();
    if (classe_selecionada == 'Mago') {
      todas_escolas = JSON.parse(JSON.stringify(LISTA_ESCOLAS_ARCANAS_SEM_ELEMENTALISTA));
    }

    carregarComboMagiasArcanasOptions(todas_escolas,callback);
  }
}

function carregarComboPericiaOptions(keys_pericias,callback) {
  let combo = document.getElementById('texto-formulario-pericia');
  combo.innerHTML = '';

  let pericias = [
    {option: 'Todas', value: 'Todas', grupo: 'Geral'}
  ].concat(keys_pericias);

  pericias.forEach((pericia, index_pericia) => {
    criarOptionPericias(combo,pericia);

    if (index_pericia == (pericias.length - 1)) {
      callback();
    }
  });
}

function carregarComboPericia(carregar,callback) {
  if (!carregar) {
    callback();
    return;
  }

  let classe_selecionada = obterClasseSelecionada();
  let keys_pericias = [];

  if (classe_selecionada == 'Todas') {

    let keys_grupos = Object.keys(PERICIAS);

    keys_grupos.forEach((grupo, index_grupo) => {
      let objetos_pericias = PERICIAS[grupo].map(pericia => ({option: `${pericia.nome} (${grupo})`, value: pericia.nome, grupo: grupo}));
      keys_pericias.push(...objetos_pericias);

      if (index_grupo == (keys_grupos.length - 1)) {
        carregarComboPericiaOptions(keys_pericias,callback);
      }
    });

  } else {
    let objetos_pericias_geral = PERICIAS["Geral"].map(pericia => ({option: `${pericia.nome} (Geral)`, value: pericia.nome, grupo: 'Geral'}));
    keys_pericias.push(...objetos_pericias_geral);

    let objetos_pericias_grupo = PERICIAS[CLASSES[classe_selecionada]["Grupo"]].map(pericia => (
      {option: `${pericia.nome} (${CLASSES[classe_selecionada]["Grupo"]})`, value: pericia.nome, grupo: CLASSES[classe_selecionada]["Grupo"]}
    ));
    keys_pericias.push(...objetos_pericias_grupo);

    carregarComboPericiaOptions(keys_pericias,callback);
  }
}

function carregarComboArmaduras(carregar,callback) {
  if (!carregar) {
    callback();
    return;
  }

  let classe_selecionada = obterClasseSelecionada();
  let keys_armaduras = [];
  let nomes_armaduras = ARMADURAS.map(e => e.nome);

  let combo = document.getElementById('texto-formulario-armadura');
  combo.innerHTML = '';

  if (classe_selecionada == 'Todas') {
    keys_armaduras = nomes_armaduras;
  } else {
    if (CLASSES[classe_selecionada].armaduras.length > 0) {
      keys_armaduras = CLASSES[classe_selecionada].armaduras.map(e => e.nome);
    } else {
      keys_armaduras = [];
    }
  }

  if (keys_armaduras.length > 0) {
    let armaduras = ['Todas'].concat(keys_armaduras);
    armaduras.forEach((armadura, index_armadura) => {
      criarOption(combo,armadura,armadura);

      if (index_armadura == (armaduras.length - 1)) {
        callback();
      }
    });
  } else {
    criarOption(combo,'Nenhuma','Nenhuma');
    callback();
  }
}

function carregarComboEscudos(carregar,callback) {
  if (!carregar) {
    callback();
    return;
  }

  let classe_selecionada = obterClasseSelecionada();
  let keys_escudos = [];
  let nomes_escudos = ESCUDOS.map(e => e.nome);

  let combo = document.getElementById('texto-formulario-escudo');
  combo.innerHTML = '';

  if (classe_selecionada == 'Todas') {
    keys_escudos = nomes_escudos;
  } else {
    if (CLASSES[classe_selecionada].escudos.length > 0) {
      keys_escudos = CLASSES[classe_selecionada].escudos.map(e => e.nome);
    } else {
      keys_escudos = [];
    }
  }

  if (keys_escudos.length > 0) {
    let escudos = ['Todos'].concat(keys_escudos);
    escudos.forEach((escudo, index_escudo) => {
      criarOptionSemAlterarTexto(combo,escudo,escudo);

      if (index_escudo == (escudos.length - 1)) {
        callback();
      }
    });
  } else {
    criarOptionSemAlterarTexto(combo,'Nenhum','Nenhum');
    callback();
  }
}

function carregarComboArmas(carregar,callback) {
  if (!carregar) {
    callback();
    return;
  }

  let classe_selecionada = obterClasseSelecionada();
  let keys_armas = [];

  let combo = document.getElementById('texto-formulario-arma');
  combo.innerHTML = '';

  if (classe_selecionada == 'Todas') {
    keys_armas = Object.keys(ARMAS);
  } else {
    if (CLASSES[classe_selecionada].armas.length > 0) {
      keys_armas = CLASSES[classe_selecionada].armas;
    } else {
      if (classe_selecionada == "Anacoreta") {
        let tendencia_selecionada = obterTendenciaSelecionada();

        if ( (tendencia_selecionada == TENDENCIAS[0]) || (tendencia_selecionada == TENDENCIAS[1]) ) {
          keys_armas = ["Mangual", "Martelo de Batalha", "Açoite", "Chicote", "Alvião", "Aprisionador", "Bordão", "Arco Curto", "Azagaia", "Lança de Cavalaria", "Funda", "Dardo", "Lança", "Clava", "Arpão", "Tridente", "Martelo", "Maça", "Maça-Estrela", "Zarabatana"];
        } else {
          keys_armas = ["Arcabuz", "Machado de Guerra", "Zarabatana", "Clava", "Adaga", "Punhal", "Dardo", "Mangual de Infantaria", "Mangual", "Maça de Infantaria", "Maça", "Alvião de Infantaria", "Alvião", "Machadinha", "Arpão", "Mangual de Cavalaria", "Maça de Cavalaria", "Alvião de Cavalaria", "Azagaia", "Faca", "Aprisionador", "Maça-Estrela", "Bordão", "Açoite", "Foice", "Funda", "Espada Bastarda", "Espada Larga", "Khopesh", "Espada Longa", "Cimitarra", "Espada Curta", "Martelo de Batalha", "Martelo", "Chicote", "Rapieira", "Flamberge", "Gládio", "Falchion", "Alfange", "Claymore", "Machete", "Sabre", "Zweihander", "Wakizashi", "Katana", "Tachi", "Tanto", "Shuriken", "Corrente", "Cajado Pequeno", "Bastão", "Laço"];
        }
      } else {
        keys_armas = Object.keys(ARMAS);
      }
    }
  }

  let armas = ['Todas'].concat(keys_armas);
  armas.forEach((arma, index_arma) => {
    criarOption(combo,arma,arma);

    if (index_arma == (armas.length - 1)) {
      callback();
    }
  });
}

document.getElementById('texto-formulario-escola').addEventListener('input',event=>{
  let retorno = obterEscolaSelecionada();
  // let retorno = { selecionada: selecionada, escola_especialista: false };

  if (retorno.escola_especialista) {
    carregarCombosClasses(retorno.selecionada,()=>{
      carregarCombosRacas(()=>{
        carregarComboTendencias(()=>{
          let parametro = { armas: true, escudos: true, armaduras: true, pericias: true, escolas: false, magias_arcanas: true };
          carregarCombosItens(parametro,()=>{
            definirAtributosMinimos();
          });
        });
      });
    });
  }
});

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
    carregarCombosClasses(null,()=>{
      carregarComboLinhagem(()=>{
        definirIdadeMinimaMaxima(()=>{
          carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
            definirAtributosMinimos();
          });
        });
      });
    });
  } else {
    definirIdadeMinimaMaxima(()=>{
      carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
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
        carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
          definirAtributosMinimos();
        });
      });
    });
  } else {
    carregarComboTendencias(()=>{
      carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
        definirAtributosMinimos();
      });
    });
  }
});

/*
function iniciar() {
  let url = new URLSearchParams(window.location.search);
  let pagina = url.get('p');

  if (pagina == 'pj') {
    openPersonagens();
  }
  if (pagina == 'itens') {
    openItens();
  }
}

iniciar();
*/
