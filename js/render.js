
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
  document.getElementById('tela-botao-fab').style.display = 'none';

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

  document.getElementById('pagina-calendario').style.display = 'none';

  document.getElementById('pagina-grimorio').style.display = 'none';
  document.getElementById('ficha-grimorio').style.display = 'none';

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
  document.getElementById('tela-botao-fab').style.display = 'block';

  preencher_profissoes(()=>{
    let nivel = obterHitDiceNPC();
    render_npc(nivel,()=>{
      closeLoading();
    });
  });
}

function openCalendario(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-calendario').style.display = 'block';

  closeLoading();
}

function obterNivelGrimorio() {
  //let texto_formulario_grimorio_nivel = document.getElementById('texto-formulario-grimorio-nivel');
  let select = document.getElementById('texto-formulario-grimorio-nivel');
  let nivel = select.options[select.selectedIndex].value;
  if (nivel == 'Todos') {
    nivel = Math.floor(Math.random() * 20) + 1;
  } else {
    nivel = parseInt(nivel);
  }

  /*
  if ( isInt(texto_formulario_grimorio_nivel.value) ) {
    nivel = parseInt(texto_formulario_grimorio_nivel.value);
  }
  */

  return nivel;
}

function openGrimorio(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-grimorio').style.display = 'block';
  document.getElementById('ficha-grimorio').style.display = 'block';
  document.getElementById('tela-botao-fab').style.display = 'block';

  let nivel = obterNivelGrimorio();
  preencher_protecoes(()=>{
    render_grimorio(nivel,()=>{
      closeLoading();
    });
  });
}

document.querySelector('#texto-botao-copiar-grimorio').addEventListener('click',event=>{
  event.preventDefault();
  let elemento = document.querySelector('#ficha-grimorio');
  copy_textarea(elemento.value);
});

function openItens(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-itens').style.display = 'block';
  document.getElementById('tela-botao-fab').style.display = 'block';

  renderItens(()=>{
    closeLoading();
  });
}

function openPersonagens(event) {
  closeMain(event);
  openLoading();

  document.getElementById('pagina-personagens').style.display = 'block';
  document.getElementById('ficha').style.display = 'none';
  document.getElementById('tela-botao-fab').style.display = 'block';

  carregarCombosRacas(()=>{
    carregarCombosClasses(null,()=>{
      definirAtributosTela(() => {
        carregarComboTendencias(()=>{
          carregarComboLinhagem(()=>{
            carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
              carregarComboDivindades(()=>{
                carregarComboDisciplinas(()=>{
                  carregarComboModosDefesa(()=>{
                    carregarComboCienciasEDevocoes(()=>{
                      render(() => {
                        closeLoading();
                      });
                    });
                  });
                });
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

document.getElementById('menu-grimorio').addEventListener('click',(event)=>{
  openGrimorio(event);
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

document.getElementById('texto-botao-voltar-calendario').addEventListener('click',(event)=>{
  openMain(event);
});

document.getElementById('texto-botao-voltar-grimorio').addEventListener('click',(event)=>{
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
  let classe2_selecionada = obterMulticlasseSelecionada2();
  let classe3_selecionada = obterMulticlasseSelecionada3();

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
  if (classe2_selecionada != 'Todas') {
    let ajuste = CLASSES[classe2_selecionada]["Habilidades Exigidas"][atributo];
    if (ajuste > minimo) {
      minimo = ajuste;
    }
  }
  if (classe3_selecionada != 'Nenhuma') {
    let ajuste = CLASSES[classe3_selecionada]["Habilidades Exigidas"][atributo];
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
  definirAtributosTela(()=>{});
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
    //document.getElementById('texto-formulario-nivel').value = 3;
    document.getElementById('texto-formulario-nivel').selectedIndex = 2;

    document.getElementById('texto-formulario-darksun-tipo-mago').disabled = false;
    document.getElementById('texto-formulario-darksun-tipo-mago').readonly = false;
  } else {
    document.getElementById('texto-formulario-darksun-tipo-mago').selectedIndex = 0;
    document.getElementById('texto-formulario-darksun-tipo-mago').disabled = true;
    document.getElementById('texto-formulario-darksun-tipo-mago').readonly = true;
  }
  definirAtributosMinimos();
});

document.getElementById('texto-formulario-nivel').addEventListener('input',(event)=>{
  carregarComboDisciplinas(()=>{
    let parametro = { armas: false, escudos: false, armaduras: false, pericias: false, escolas: false, magias_arcanas: true };
    carregarCombosItens(parametro,()=>{});
  });
});

document.getElementById('texto-formulario-disciplina').addEventListener('input',(event)=>{
  carregarComboCienciasEDevocoes(()=>{});
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

document.getElementById('texto-botao-rolar-grimorio').addEventListener('click',(event)=>{
  event.preventDefault();
  openLoading();
  let nivel = obterNivelGrimorio();
  render_grimorio(nivel,()=>{
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

function criarOptionCienciasEDevocoes(select,value,texto) {
  let opt = document.createElement('option');
  if ( (value == 'Todas') || (value == 'Todos') ) {
    value = 'Todas';
  }

  let array_ataque = ATAQUES_PSIONICAS.filter(entry => entry.poder == texto);
  if (array_ataque.length == 1) {
    texto = `${texto} (Modo de Ataque)`;
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

function obterDisciplinaSelecionada() {
  let selecionada = {
    disciplina: 'Nenhuma',
    ciencias: [],
    devocoes: [],
  };
  let combo = document.getElementById('texto-formulario-disciplina');

  if (combo.options.length > 0) {
    selecionada.disciplina = combo.options[combo.selectedIndex].value;

    if ( (selecionada.disciplina != 'Nenhuma') && (selecionada.disciplina != 'Todas') ) {
      selecionada.ciencias = DISCIPLINAS_PSIONICAS[selecionada.disciplina]["Ciências"];
      selecionada.devocoes = DISCIPLINAS_PSIONICAS[selecionada.disciplina]["Devoções"];
    }
  }

  return selecionada;
}

function obterClasseSelecionada() {
  let selecionada = 'Todas';
  if (document.getElementById('texto-formulario-classe1').options.length > 0) {
    selecionada = document.getElementById('texto-formulario-classe1').options[document.getElementById('texto-formulario-classe1').selectedIndex].value;
  }
  return selecionada;
}

function obterMulticlasseSelecionada2() {
  let selecionada = 'Todas';
  if (document.getElementById('texto-formulario-classe2').options.length > 0) {
    selecionada = document.getElementById('texto-formulario-classe2').options[document.getElementById('texto-formulario-classe2').selectedIndex].value;
  }
  return selecionada;
}

function obterMulticlasseSelecionada3() {
  let selecionada = 'Nenhuma';
  if (document.getElementById('texto-formulario-classe3').options.length > 0) {
    selecionada = document.getElementById('texto-formulario-classe3').options[document.getElementById('texto-formulario-classe3').selectedIndex].value;
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

function compareItensCombo( a, b ) {
  if ( a.text < b.text ){
    return -1;
  }
  if ( a.text > b.text ){
    return 1;
  }
  return 0;
}

function loadingCriar_Option(combo,list,selectedIndex,callback) {
  /*
    list = {
      value: '',
      text: '',
    }
  */

  if ( (list == undefined) || (list == null) || (list == '') || (list.length == 0) ) {
    criarOption(combo,'Todas','Todas');
    combo.disabled = true;
    combo.readonly = true;
    error('Erro ao montar a lista:');
    console.error(combo);
    callback();
  } else {
    combo.disabled = false;
    combo.readonly = false;

    if (list.length == 1) {
      criarOption(combo,list[0].value,list[0].text);
      callback();
    } else { // LOOP
      let entryTodas = {
        possui: false,
        value: '',
        text: '',
        tem_grupo: false,
        grupo: '',
      };
      let lista_conferencia = [];
      let selectedIndexAjustado = -1;
      let valueSelectedIndex = 'NAO_EXISTE';
      if (selectedIndex > -1) {
        valueSelectedIndex = list[selectedIndex].value;
      }

      let index_todas = list.findIndex(entry => ( (entry.text == 'Todas') || (entry.text == 'Todos') || (entry.text == 'Nenhuma') ));
      if (index_todas > -1) {
        entryTodas.possui = true;
        entryTodas.value = list[index_todas].value;
        entryTodas.text = list[index_todas].text;
        entryTodas.tem_grupo = list[index_todas].tem_grupo;
        entryTodas.grupo = list[index_todas].grupo;
        list.splice(index_todas, 1);
      }

      list.sort(compareItensCombo);

      list.forEach((entry, index) => {
        if ( (entryTodas.possui) && (index == 0) ) {
          if (entryTodas.tem_grupo) {
            criarOptionPericias(combo,{option: entryTodas.text, value: entryTodas.value, grupo: entryTodas.grupo});
          } else {
            criarOption(combo,entryTodas.value,entryTodas.text);
          }
        }

        if (valueSelectedIndex == entry.value) {
          selectedIndexAjustado = index;
        }

        let index_ja_tem = lista_conferencia.findIndex(inner => (inner == entry.value));
        if (index_ja_tem == -1) {
          lista_conferencia.push(entry.value);

          if (entry.tem_grupo) {
            criarOptionPericias(combo,{option: entry.text, value: entry.value, grupo: entry.grupo});
          } else {
            criarOption(combo,entry.value,entry.text);
          }
        }

        if (index == (list.length - 1)) {
          if (selectedIndexAjustado > -1) {
            combo.selectedIndex = selectedIndexAjustado;
          }

          callback();
        }
      });
    } // LOOP
  }
}

function loadingNewItem(list,value,text) {
  list.push({
    value: value,
    text: text,
    tem_grupo: false,
    grupo: '',
  });
}

function loadingNewItemPericias(list,pericia) {
  list.push({
    value: pericia.value,
    text: pericia.option,
    tem_grupo: true,
    grupo: pericia.grupo,
  });
}

function loadingNewItemEscola(list,value,text) {
  if ( (value != 'Todas') && (value != 'Nenhuma') ) {
    text = LISTA_ESCOLAS_ARCANAS_MAGO_PARA_ESCOLA[value];

    if (["Ar","Terra","Água","Fogo"].indexOf(text) > -1) {
      text = `${text} (Elementalista)`;
    }
  }

  list.push({
    value: value,
    text: text,
    tem_grupo: false,
    grupo: '',
  });
}

function loadingNewItem_CienciasEDevocoes(list,value,texto) {
  let array_ataque = ATAQUES_PSIONICAS.filter(entry => entry.poder == texto);
  if (array_ataque.length == 1) {
    texto = `${texto} (Modo de Ataque)`;
  }
  loadingNewItem(list,value,texto);
}

function carregarCombosRacas(callback) {
  let selecionada = obterClasseSelecionada();
  let list_combo = [];

  let multiclasse = document.getElementById('texto-formulario-multiclasse').checked;

  let combo = document.getElementById('texto-formulario-raca');
  combo.innerHTML = '';

  if (selecionada != 'Todas') {
    let index_humano = -1;
    let contador = -1;

    CLASSES[selecionada]["Raças Permitidas"].forEach((classe, i) => {
      COMBO_RACAS.forEach((item, j) => {

        if ( (i == 0) && (j == 0) ) {
          loadingNewItem(list_combo,'Todas','Todas');
        }

        if (!multiclasse) {
          /* Não é multiclasse */
          if (classe == item.value) {
            contador = contador + 1;
            loadingNewItem(list_combo,item.value,item.texto);

            if (item.value == 'Humano') {
              index_humano = contador;
            }
          }
        } else {
          /* É multiclasse */
          contador = contador + 1;
          loadingNewItem(list_combo,item.value,item.texto);

          if (item.value == 'Humano') {
            index_humano = contador;
          }
        }

        if (i == (CLASSES[selecionada]["Raças Permitidas"].length - 1)) {
          if (j == (COMBO_RACAS.length - 1)) {

            let selectedIndex = -1;
            let index_tabaxi = list_combo.findIndex(entry => (entry.value == 'Tabaxi'));
            if ( (index_tabaxi > -1) && (list_combo.length == 3) ) {
              // Quando só tem humano e tabaxi, definir index selecionado
              selectedIndex = index_humano;
            }

            loadingCriar_Option(combo,list_combo,selectedIndex,callback);
          }
        }
      });
    });
  } else {
    COMBO_RACAS.forEach((item, i) => {
      if ( (!multiclasse) || ((multiclasse) && (item.value != 'Humano') && (item.value != 'Meio-Vistani')) ) {
        loadingNewItem(list_combo,item.value,item.texto);
      }

      if (i == (COMBO_RACAS.length - 1)) {
        loadingCriar_Option(combo,list_combo,-1,callback);
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

// AQUI - proximo passo, alterar no GERADOR.JS a regra para gerar mais de uma classe, obedecendo as restrições

document.getElementById('texto-formulario-multiclasse').addEventListener('input',(event)=>{
  event.preventDefault();

  let combo1 = document.getElementById('texto-formulario-classe1');
  combo1.selectedIndex = 0;

  carregarCombosClasses(null,()=>{
    carregarCombosRacas(()=>{
      carregarComboTendencias(()=>{
        carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
          carregarComboDivindades(()=>{
            carregarComboDisciplinas(()=>{
              carregarComboModosDefesa(()=>{
                carregarComboCienciasEDevocoes(()=>{
                  carregarCombosMulticlasses2(()=>{
                    definirAtributosMinimos();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

document.getElementById('texto-formulario-classe2').addEventListener('input',(event)=>{
  carregarCombosMulticlasses3(()=>{
    definirAtributosMinimos();
  });
});

document.getElementById('texto-formulario-classe3').addEventListener('input',(event)=>{
  definirAtributosMinimos();
});

function carregarCombosMulticlasses3(callback) {
  let multiclasse = document.getElementById('texto-formulario-multiclasse').checked;
  let combo3 = document.getElementById('texto-formulario-classe3');

  if (!multiclasse) {
    combo3.innerHTML = '<option value="Nenhuma">Nenhuma</option>';
    callback();

  } else {
    /* Combo 3 */
    let list_combo3 = [];
    let classe1_selecionada = obterClasseSelecionada();
    let classe2_selecionada = obterMulticlasseSelecionada2();

    combo3.innerHTML = '';

    COMBO_CLASSES.forEach((classe3, index3) => {

      if (classe3.value == 'Todas') {
        loadingNewItem(list_combo3,'Nenhuma','Nenhuma');
      } else {
        if ( (classe3.value != classe1_selecionada) && (classe3.value != classe2_selecionada) ) {
          loadingNewItem(list_combo3,classe3.value,classe3.texto);
        }
      }

      if (index3 == (COMBO_CLASSES.length - 1)) {
        loadingCriar_Option(combo3,list_combo3,-1,()=>{
          callback();
        });
      }
    });
    /* Combo 3 */
  }
}

function carregarCombosMulticlasses2(callback) {
  let multiclasse = document.getElementById('texto-formulario-multiclasse').checked;
  let combo2 = document.getElementById('texto-formulario-classe2');
  let combo3 = document.getElementById('texto-formulario-classe3');

  if (!multiclasse) {
    combo2.innerHTML = '<option value="Nenhuma">Nenhuma</option>';
    combo3.innerHTML = '<option value="Nenhuma">Nenhuma</option>';
    callback();

  } else {
    /* Combo 2 */
    let list_combo2 = [];
    let classe1_selecionada = obterClasseSelecionada();

    combo2.innerHTML = '';

    COMBO_CLASSES.forEach((classe2, index2) => {
      if ((classe2.value == 'Todas') || (classe2.value != classe1_selecionada)) {
        loadingNewItem(list_combo2,classe2.value,classe2.texto);
      }

      if (index2 == (COMBO_CLASSES.length - 1)) {
        loadingCriar_Option(combo2,list_combo2,-1,()=>{
          /* Combo 3 */
          carregarCombosMulticlasses3(callback);

        });
      }
    });
    /* Combo 2 */
  }
}

function carregarCombosClasses(selecionada,callback) {
  let list_combo = [];

  let multiclasse = document.getElementById('texto-formulario-multiclasse').checked;
  if (multiclasse) {
    document.getElementById('texto-formulario-classe2').disabled = false;
    document.getElementById('texto-formulario-classe2').readonly = false;
    document.getElementById('texto-formulario-classe3').disabled = false;
    document.getElementById('texto-formulario-classe3').readonly = false;
  } else {
    document.getElementById('texto-formulario-classe2').disabled = true;
    document.getElementById('texto-formulario-classe2').readonly = true;
    document.getElementById('texto-formulario-classe3').disabled = true;
    document.getElementById('texto-formulario-classe3').readonly = true;
  }

  let forcar_classe = false;
  if ( (selecionada) && (selecionada != null) && (selecionada != undefined) && (selecionada != 'Todas') ) {
    forcar_classe = true;
  }

  let raca_selecionada = obterRacaSelecionada();

  let combo = document.getElementById('texto-formulario-classe1');
  combo.innerHTML = '';

  if ( (raca_selecionada != 'Todas') && (!forcar_classe) ) {
    let keys_classes = Object.keys(CLASSES);
    keys_classes.forEach((key_classe, i) => {

      if (i == 0) {
        loadingNewItem(list_combo,'Todas','Todas');
      }

      if (CLASSES[key_classe]["Raças Permitidas"].includes(raca_selecionada)) {
        loadingNewItem(list_combo,COMBO_CLASSES[COMBO_CLASSES_INDEX[key_classe]].value,COMBO_CLASSES[COMBO_CLASSES_INDEX[key_classe]].texto);
      }

      if (i == (keys_classes.length - 1)) {
        loadingCriar_Option(combo,list_combo,-1,callback);
      }
    });
  } else {
    let index_forcar = -1;

    COMBO_CLASSES.forEach((item, i) => {
      loadingNewItem(list_combo,item.value,item.texto);

      if (forcar_classe) {
        if (selecionada == item.value) {
          index_forcar = i;
        }
      }

      if (i == (COMBO_CLASSES.length - 1)) {
        let selectedIndex = -1;
        if (index_forcar > -1) {
          selectedIndex = index_forcar;
        }

        loadingCriar_Option(combo,list_combo,selectedIndex,callback);
      }
    });
  }
}

document.getElementById('texto-formulario-tendencia').addEventListener('input',(event)=>{
  event.preventDefault();
  carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
    carregarComboDivindades(()=>{});
  });
});

function carregarComboTendencias(callback) {
  //let list_combo = [];
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

function carregarComboCienciasEDevocoes(callback) {
  let list_combo_ciencia = [];
  let list_combo_devocoes = [];

  let classe_selecionada = obterClasseSelecionada();
  let selecionada = obterDisciplinaSelecionada();

  let combo_ciencia = document.getElementById('texto-formulario-ciencia');
  combo_ciencia.innerHTML = '';

  let combo_devocoes = document.getElementById('texto-formulario-devocao');
  combo_devocoes.innerHTML = '';

  if ( (classe_selecionada == 'Todas') || (classe_selecionada == 'Psionicista') ) {

    /* Preecnher combos */
    if ( (selecionada.disciplina == 'Todas') || (selecionada.disciplina == 'Nenhuma') ) {
      let texto_padrao = 'Selecione a Disciplina';
      criarOption(combo_ciencia,texto_padrao,texto_padrao);
      criarOption(combo_devocoes,texto_padrao,texto_padrao);
      callback();
    } else {
      loadingNewItem(list_combo_ciencia,'Todas','Todas');

      selecionada.ciencias.forEach((ciencia, index_ciencias) => {
        loadingNewItem_CienciasEDevocoes(list_combo_ciencia,ciencia,ciencia);

        if (index_ciencias == (selecionada.ciencias.length - 1)) {
          loadingNewItem(list_combo_devocoes,'Todas','Todas');

          selecionada.devocoes.forEach((devocao, index_devocoes) => {
            loadingNewItem_CienciasEDevocoes(list_combo_devocoes,devocao,devocao);

            if (index_devocoes == (selecionada.devocoes.length - 1)) {
              loadingCriar_Option(combo_ciencia,list_combo_ciencia,-1,()=>{
                loadingCriar_Option(combo_devocoes,list_combo_devocoes,-1,callback);
              });
            }
          });

        }
      });
    }
    /* Preencher combos */

  } else {
    criarOption(combo_ciencia,'Nenhuma','Nenhuma');
    criarOption(combo_devocoes,'Nenhuma','Nenhuma');
    callback();
  }
}

function carregarComboModosDefesa(callback) {
  let list_combo = [];
  let classe_selecionada = obterClasseSelecionada();
  let nivel_selecionado = obterNivelSelecionado();

  let combo = document.getElementById('texto-formulario-modo-defesa');
  combo.innerHTML = '';

  if ( (classe_selecionada == 'Todas') || (classe_selecionada == 'Psionicista') ) {
    let keys = JSON.parse(JSON.stringify(DEFESAS_PSIONICAS));

    loadingNewItem(list_combo,'Todas','Todas');

    keys.forEach((entry, index) => {
      loadingNewItem(list_combo,entry,entry);

      if (index == (keys.length - 1)) {
        loadingCriar_Option(combo,list_combo,-1,callback);
      }
    });

  } else {
    criarOption(combo,'Nenhuma','Nenhuma');
    callback();
  }
}

function carregarComboDisciplinas(callback) {
  let list_combo = [];
  let classe_selecionada = obterClasseSelecionada();
  let nivel_selecionado = obterNivelSelecionado();

  let combo = document.getElementById('texto-formulario-disciplina');
  combo.innerHTML = '';

  if ( (classe_selecionada == 'Todas') || (classe_selecionada == 'Psionicista') ) {
    let keys_disciplinas = Object.keys(DISCIPLINAS_PSIONICAS);

    if (nivel_selecionado == 1) {
      let index_metapsionicos = keys_disciplinas.indexOf('Metapsionics');
      keys_disciplinas.splice(index_metapsionicos, 1);
    }

    loadingNewItem(list_combo,'Todas','Todas');

    keys_disciplinas.forEach((disciplina, index_disciplina) => {
      loadingNewItem(list_combo,disciplina,disciplina);

      if (index_disciplina == (keys_disciplinas.length - 1)) {
        loadingCriar_Option(combo,list_combo,-1,callback);
      }
    });

  } else {
    criarOption(combo,'Nenhuma','Nenhuma');
    callback();
  }
}

function carregarComboDivindades(callback) {
  let list_combo = [];
  let raca = document.getElementById('texto-formulario-raca').options[document.getElementById('texto-formulario-raca').selectedIndex].value;
  let tendencia = document.getElementById('texto-formulario-tendencia').options[document.getElementById('texto-formulario-tendencia').selectedIndex].value;
  let classe = document.getElementById('texto-formulario-classe1').options[document.getElementById('texto-formulario-classe1').selectedIndex].value;
  let combo = document.getElementById('texto-formulario-divindade');
  combo.innerHTML = '';

  loadingNewItem(list_combo,'Todas','Todas');

  organizar_divindades_permitidas_tela(raca,tendencia,classe,(lista_divindades)=>{
    if (lista_divindades.length > 0) {
      lista_divindades.forEach((divindade, index_divindade) => {
        loadingNewItem(list_combo,divindade,divindade);

        if (index_divindade == (lista_divindades.length - 1)) {
          loadingCriar_Option(combo,list_combo,-1,callback);
        }
      });
    } else {
      loadingCriar_Option(combo,list_combo,-1,callback);
    }
  });
}

function carregarComboLinhagem(callback) {
  let list_combo = [];
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
    loadingNewItem(list_combo,linhagem,linhagem);

    if (index_linhagem == (lista_linhagens.length - 1)) {
      loadingCriar_Option(combo,list_combo,-1,callback);
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

  let list_combo = [];
  let options = [];

  if (escolas.length == 1) {
    options = escolas;
  } else {
    options = ['Todas'].concat(escolas);
  }

  options.forEach((option, index_option) => {
    loadingNewItemEscola(list_combo,option,option);

    if (index_option == (options.length - 1)) {
      loadingCriar_Option(combo,list_combo,-1,callback);
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
    if ( (classe_selecionada == 'Mago') || (classe_selecionada == 'Bardo') ) {
      keys = LISTA_ESCOLAS_ARCANAS_SEM_ELEMENTALISTA;
      carregarComboEscolasOptions(keys,callback);
    } else if (classe_selecionada == 'Cigano') {
      keys = ["Adivinho"];
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
  let list_combo = [];
  let combo = document.getElementById('texto-formulario-escola-magia');
  combo.innerHTML = '';

  let escola_selecionada = obterEscolaSelecionada();
  let classe_selecionada = obterClasseSelecionada();

  let lista_conferencia = [];

  // Obtem os index de 0 a no máximo 1
  let nivel_selecionado = obterNivelSelecionado();
  if (nivel_selecionado > 2) nivel_selecionado = 2;
  if ( (classe_selecionada == 'Bardo') || (classe_selecionada == 'Cigano') ) nivel_selecionado = 1;
  let niveis = [...Array(nivel_selecionado).keys()];

  niveis.forEach((nivel, index_nivel) => {

    keys_escolas.forEach((escola, index_escola) => {

      MAGIAS_ARCANAS[nivel][escola].forEach((magia, index_magia) => {

        if ( (index_nivel == 0) && (index_escola == 0) && (index_magia == 0) ) {
          loadingNewItem(list_combo,'Todas','Todas');
        }

        let nome_escola_convertido = LISTA_ESCOLAS_ARCANAS_MAGO_PARA_ESCOLA[escola];
        let texto = `${magia} (${nivel + 1}º Círculo, ${nome_escola_convertido})`;

        if (lista_conferencia.indexOf(magia) == -1) {

          if (escola_selecionada.escola_especialista) {
            if (classe_selecionada == 'Cigano') {
              if (MAGIAS_ARCANAS[0]["Adivinho"].indexOf(magia) > -1) {
                lista_conferencia.push(magia);
                loadingNewItem(list_combo,magia,texto);
              }
            } else {
              if (ESCOLAS_ARCANAS_OPOSTAS[escola].indexOf(nome_escola_convertido) == -1) {
                lista_conferencia.push(magia);
                loadingNewItem(list_combo,magia,texto);
              }
            }
          } else {
            lista_conferencia.push(magia);
            loadingNewItem(list_combo,magia,texto);
          }
        }

        if (index_magia == (MAGIAS_ARCANAS[nivel][escola].length - 1)) {
          if (index_escola == (keys_escolas.length - 1)) {
            if (index_nivel == (niveis.length - 1)) {
              loadingCriar_Option(combo,list_combo,-1,callback);
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

  let list_combo = [];
  let pericias = [
    {option: 'Todas', value: 'Todas', grupo: 'Geral'}
  ].concat(keys_pericias);

  pericias.forEach((pericia, index_pericia) => {
    loadingNewItemPericias(list_combo,pericia);

    if (index_pericia == (pericias.length - 1)) {
      loadingCriar_Option(combo,list_combo,-1,callback);
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

  let list_combo = [];
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
      loadingNewItem(list_combo,armadura,armadura);

      if (index_armadura == (armaduras.length - 1)) {
        loadingCriar_Option(combo,list_combo,-1,callback);
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

  let list_combo = [];
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
      loadingNewItem(list_combo,escudo,escudo);

      if (index_escudo == (escudos.length - 1)) {
        loadingCriar_Option(combo,list_combo,-1,callback);
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

  let list_combo = [];
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
    loadingNewItem(list_combo,arma,arma);

    if (index_arma == (armas.length - 1)) {
      loadingCriar_Option(combo,list_combo,-1,callback);
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
            carregarComboDivindades(()=>{
              definirAtributosMinimos();
            });
          });
        });
      });
    });
  } else {
    definirIdadeMinimaMaxima(()=>{
      carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
        carregarComboDivindades(()=>{
          definirAtributosMinimos();
        });
      });
    });
  }
});

document.getElementById('texto-formulario-classe1').addEventListener('input',event=>{
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
          carregarComboDivindades(()=>{
            carregarComboDisciplinas(()=>{
              carregarComboModosDefesa(()=>{
                carregarComboCienciasEDevocoes(()=>{
                  carregarCombosMulticlasses2(()=>{
                    definirAtributosMinimos();
                  });
                });
              });
            });
          });
        });
      });
    });
  } else {
    carregarComboTendencias(()=>{
      carregarCombosItens(PARAMETRO_ITENS_PADRAO,()=>{
        carregarComboDivindades(()=>{
          carregarComboDisciplinas(()=>{
            carregarComboModosDefesa(()=>{
              carregarComboCienciasEDevocoes(()=>{
                carregarCombosMulticlasses2(()=>{
                  definirAtributosMinimos();
                });
              });
            });
          });
        });
      });
    });
  }
});

document.getElementById('texto-botao-pdf').addEventListener('click',()=>{
  window.print();
});

document.getElementById('tela-botao-fab').addEventListener('click',(event)=>{
  event.preventDefault();

  if (document.getElementById('pagina-personagens').style.display == 'block') {
    openLoading();
    render(() => {
      closeLoading();
    });
  }
  if (document.getElementById('pagina-itens').style.display == 'block') {
    renderItens(()=>{});
  }
  if (document.getElementById('pagina-npcs').style.display == 'block') {
    openLoading();
    let nivel = obterHitDiceNPC();
    render_npc(nivel,()=>{
      closeLoading();
    });
  }
  if (document.getElementById('pagina-grimorio').style.display == 'block') {
    openLoading();
    let nivel = obterNivelGrimorio();
    render_grimorio(nivel,()=>{
      closeLoading();
    });
  }
});

function iniciar() {
  console.log(`Versão ${VERSION}`);
  let url = new URLSearchParams(window.location.search);
  let pagina = url.get('p');

  if (pagina == 'pj') {
    openPersonagens();
  }
  if (pagina == 'itens') {
    openItens();
  }
  if (pagina == 'npcs') {
    openNPCs();
  }
  if (pagina == 'grimorio') {
    openGrimorio();
  }
}

iniciar();
