const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
//let value = params.some_key;

if (params.form == 'true') {
  document.querySelector('div.pre-formulario').style.display = 'block';
  document.querySelector('div.formulario').style.display = 'block';
  document.querySelector('div.formulario-idril').style.display = 'block';
  document.querySelector('div.formulario-nirah').style.display = 'block';
  document.querySelector('div.formulario-torteck').style.display = 'block';
  document.querySelector('div.formulario-bravos').style.display = 'block';
} else {
  if (params.debug == 'true') {
    if (params.pagina == '5') {
      document.querySelector('div.o2t5').classList.remove('overlays-esconder');
    } else if (params.pagina == '4') {
      document.querySelector('div.o2t4').classList.remove('overlays-esconder');
    } else if (params.pagina == '3') {
      document.querySelector('div.o2t3').classList.remove('overlays-esconder');
    } else if (params.pagina == '2') {
      document.querySelector('div.o2t2').classList.remove('overlays-esconder');
    } else {
      document.querySelector('div.o2t1').classList.remove('overlays-esconder');
    }

    if (params.red == 'true') {
      /*
      document.querySelector('main span.grande').style.backgroundColor = '#ff0000';
      document.querySelector('main span.grande').style.opacity = '0.4';
      */

      document.querySelector('main div.frame-torteck').style.backgroundColor = '#ff0000';
      document.querySelector('main div.frame-torteck').style.opacity = '0.4';
      
      document.querySelector('main div.frame-nirah').style.backgroundColor = '#ff0000';
      document.querySelector('main div.frame-nirah').style.opacity = '0.4';
      
      document.querySelector('main div.frame-idril').style.backgroundColor = '#ff0000';
      document.querySelector('main div.frame-idril').style.opacity = '0.4';
      
      document.querySelector('main div.frame-bravos').style.backgroundColor = '#ff0000';
      document.querySelector('main div.frame-bravos').style.opacity = '0.4';
    }
    
    document.querySelector('main div.frame-torteck').style.display = 'none';
    document.querySelector('main div.frame-nirah').style.display = 'none';
    document.querySelector('main div.frame-idril').style.display = 'none';
    document.querySelector('main div.frame-bravos').style.display = 'none';
    
    let personagens = '';
    if ((params.personagem != undefined) && (params.personagem != null) && (params.personagem != '')) {
        personagens = params.personagem;
    }
    
    if (personagens.includes('torteck')) {
        document.querySelector('main div.frame-torteck').style.display = 'block';
    }
    if (personagens.includes('nirah')) {
        document.querySelector('main div.frame-nirah').style.display = 'block';
    }
    if (personagens.includes('idril')) {
        document.querySelector('main div.frame-idril').style.display = 'block';
    }
    if (personagens.includes('bravos')) {
        document.querySelector('main div.frame-bravos').style.display = 'block';
    }
  }
}

if (params.pagina == '5') {
  document.querySelector('main.pagina').classList.add('personagens');
} else if (params.pagina == '4') {
  document.querySelector('main.pagina').classList.add('solo');
} else if (params.pagina == '3') {
  document.querySelector('main.pagina').classList.add('imagens');
} else if (params.pagina == '2') {
  document.querySelector('main.pagina').classList.add('fichas');
} else {
  document.querySelector('main.pagina').classList.add('batepapo');
}

const base_url = 'https://flechamagica.com.br/live/onering.php';

const MESES = {
  'Yestarë': { info: '(First day)', dias: 1, index: 0 },
  'Narvinyë': { info: '(janeiro)', dias: 30, index: 1 },
  'Nénimë': { info: '(fevereiro)', dias: 30, index: 2 },
  'Súlìmë': { info: '(março)', dias: 30, index: 3 },
  'Víressë': { info: '(abril)', dias: 30, index: 4 },
  'Lótessë': { info: '(maio)', dias: 30, index: 5 },
  'Náríë': { info: '(junho)', dias: 31, index: 6 },
  'Loëndë': { info: '(Middle days)', dias: 1, index: 7 },
  'Cermië': { info: '(julho)', dias: 31, index: 8 },
  'Urimë': { info: '(agosto)', dias: 30, index: 9 },
  'Yavannië': { info: '(setembro)', dias: 30, index: 10 },
  'Narquelië': { info: '(outubro)', dias: 30, index: 11 },
  'Hísimë': { info: '(novembro)', dias: 30, index: 12 },
  'Ringarë': { info: '(dezembro)', dias: 30, index: 13 },
  'Mettarë': { info: '(Last day)', dias: 1, index: 14 }
};

const ESTACOES = {
  'tuilë': { info: '(primavera)' },
  'lairë': { info: '(verão)' },
  'yávië': { info: '(outono)' },
  'quellë': { info: '(fading)' },
  'hrívë': { info: '(inverno)' },
  'coirë': { info: '(stirring)' }
};

let JSON_RECEBIDO = {};

function definirEstacao(dia,mes) {
  if (mes == 'Lótessë') {
    return 'tuilë';
  }
  if ((mes == 'Náríë') || (mes == 'Loëndë') || (mes == 'Cermië')) {
    return 'lairë';
  }
  if (mes == 'Yavannië') {
    return 'yávië';
  }
  if (mes == 'Hísimë') {
    return 'quellë';
  }
  if ((mes == 'Ringarë') || (mes == 'Mettarë') || (mes == 'Yestarë') || (mes == 'Narvinyë')) {
    return 'hrívë';
  }
  if (mes == 'Súlìmë') {
    return 'coirë';
  }

  if (mes == 'Víressë') {
    if (dia <= 6) {
      return 'coirë';
    }
    if (dia >= 7) {
      return 'tuilë';
    }
  }

  if (mes == 'Urimë') {
    if (dia <= 9) {
      return 'lairë';
    }
    if (dia >= 10) {
      return 'yávië';
    }
  }

  if (mes == 'Narquelië') {
    if (dia <= 3) {
      return 'yávië';
    }
    if (dia >= 4) {
      return 'quellë';
    }
  }

  if (mes == 'Nénimë') {
    if (dia <= 10) {
      return 'hrívë';
    }
    if (dia >= 11) {
      return 'coirë';
    }
  }
}

const PARTES_DIA = [
  'manhã', 'tarde', 'noite', 'madrugada'
];

const TIPOS_TEMPO = {
  'tuilë': [ '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(céu com núvens)', '(tempo chuvoso)', '(ventos fortes)' ],
  'lairë': [ '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(chuva forte)', '(tempo chuvoso)', '(ventos quentes)' ],
  'yávië': [ '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(céu com núvens)', '(tempo chuvoso)', '(ventos fortes)', '(chuva forte)' ],
  'quellë':  [ '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(tempo aberto)', '(céu com núvens)', '(tempo chuvoso)', '(ventos fortes)', '(chuva forte)' ],
  'hrívë': [ '(tempo aberto)', '(céu com núvens)', '(nevando)', '(ventos frios)' ],
  'coirë': [ '(tempo aberto)', '(céu com núvens)', '(nevando)', '(ventos frios)' ]
};

function controleParteDia(hora) {
  let tempoMomentoDia = document.getElementById('tempo-momento-dia');
  if ((hora >= 0) && (hora < 6)) {
    tempoMomentoDia.innerHTML = PARTES_DIA[3];
  } else if ((hora >= 6) && (hora < 12)) {
    tempoMomentoDia.innerHTML = PARTES_DIA[0];
  } else if ((hora >= 12) && (hora < 18)) {
    tempoMomentoDia.innerHTML = PARTES_DIA[1];
  } else {
    tempoMomentoDia.innerHTML = PARTES_DIA[2];
  }
}

function controlarImagemDiaNoite(hora) {
  let imagemDia = document.getElementById('relogio-dia');
  let imagemNoite = document.getElementById('relogio-noite');

  if (hora >= 18) {
    adicionarEstilo(imagemNoite,'frame-tempo-icons-frente');
    removerEstilo(imagemDia,'frame-tempo-icons-frente');
  } else if (hora < 6) {
    adicionarEstilo(imagemNoite,'frame-tempo-icons-frente');
    removerEstilo(imagemDia,'frame-tempo-icons-frente');
  } else {
    adicionarEstilo(imagemDia,'frame-tempo-icons-frente');
    removerEstilo(imagemNoite,'frame-tempo-icons-frente');
  }
}

function controlarImagemEstacao(estacao) {
  let imagemPrimavera = document.getElementById('relogio-primavera');
  let imagemVerao = document.getElementById('relogio-verao');
  let imagemOutono = document.getElementById('relogio-outono');
  let imagemInverno = document.getElementById('relogio-inverno');

  if (estacao == 'tuilë') {
    adicionarEstilo(imagemPrimavera,'frame-tempo-icons-frente');
    removerEstilo(imagemVerao,'frame-tempo-icons-frente');
    removerEstilo(imagemOutono,'frame-tempo-icons-frente');
    removerEstilo(imagemInverno,'frame-tempo-icons-frente');
  } else if (estacao == 'lairë') {
    adicionarEstilo(imagemVerao,'frame-tempo-icons-frente');
    removerEstilo(imagemOutono,'frame-tempo-icons-frente');
    removerEstilo(imagemInverno,'frame-tempo-icons-frente');
    removerEstilo(imagemPrimavera,'frame-tempo-icons-frente');
  } else if ((estacao == 'yávië') || (estacao == 'quellë')) {
    adicionarEstilo(imagemOutono,'frame-tempo-icons-frente');
    removerEstilo(imagemInverno,'frame-tempo-icons-frente');
    removerEstilo(imagemPrimavera,'frame-tempo-icons-frente');
    removerEstilo(imagemVerao,'frame-tempo-icons-frente');
  } else {
    adicionarEstilo(imagemInverno,'frame-tempo-icons-frente');
    removerEstilo(imagemPrimavera,'frame-tempo-icons-frente');
    removerEstilo(imagemVerao,'frame-tempo-icons-frente');
    removerEstilo(imagemOutono,'frame-tempo-icons-frente');
  }
}

function obterFormularioPersonagem(personagem) {
  let jsonFormulario = clonarJSON(JSON_RECEBIDO);
  jsonFormulario[personagem].endurance = document.getElementById('form-' + personagem + '-endurance').value;
  jsonFormulario[personagem].hope = document.getElementById('form-' + personagem + '-hope').value;
  jsonFormulario[personagem].shadow = document.getElementById('form-' + personagem + '-shadow').value;
  let campoExausto = document.getElementById('form-' + personagem + '-exausto');
  jsonFormulario[personagem].exausto = campoExausto.options[ campoExausto.selectedIndex ].value;
  let campoAbatido = document.getElementById('form-' + personagem + '-abatido');
  jsonFormulario[personagem].abatido = campoAbatido.options[ campoAbatido.selectedIndex ].value;
  let campoFerido = document.getElementById('form-' + personagem + '-ferido');
  jsonFormulario[personagem].ferido = campoFerido.options[ campoFerido.selectedIndex ].value;
  return jsonFormulario;
}

function atualizarDadosPersonagem(personagem,json) {
  /* Seguranca
  if ((json[personagem] == undefined) || (json[personagem] == null)) {
      json[personagem]= {};
      json[personagem]['exausto'] = 'sim';
      json[personagem]['abatido'] = 'sim';
      json[personagem]['ferido'] = 'sim';
      json[personagem]['endurance'] = 0;
      json[personagem]['hope'] = 0;
      json[personagem]['shadow'] = 0;
  }
  */
    
  document.getElementById(personagem + '-exausto').style.opacity = (json[personagem].exausto == 'sim') ? 1 : 0;
  document.getElementById(personagem + '-abatido').style.opacity = (json[personagem].abatido == 'sim') ? 1 : 0;
  document.getElementById(personagem + '-ferido').style.opacity = (json[personagem].ferido == 'sim') ? 1 : 0;
  document.getElementById(personagem + '-endurance').innerHTML = json[personagem].endurance;
  document.getElementById(personagem + '-hope').innerHTML = json[personagem].hope;
  document.getElementById(personagem + '-shadow').innerHTML = json[personagem].shadow;
}

function adicionarEstilo(tag,estilo) {
  if (!tag.classList.contains(estilo)) {
    tag.classList.add(estilo);
  }
}

function removerEstilo(tag,estilo) {
  if (tag.classList.contains(estilo)) {
    tag.classList.remove(estilo);
  }
}

function controlarRelogio(json,sortearCondicao) {
  let horaInt = parseInt(json.bravo.hora);
  controleParteDia(horaInt);
  controlarImagemDiaNoite(horaInt);

  let estacao = definirEstacao(parseInt(json.bravo.dia),json.bravo.mes);
  json.bravo.estacao = estacao;
  controlarImagemEstacao(estacao);

  let arrayTiposTempo = TIPOS_TEMPO[estacao];
  let tipoTempo = json.bravo.tempo;
  if (sortearCondicao) {
    tipoTempo = arrayTiposTempo[Math.floor(Math.random()*arrayTiposTempo.length)];
    json.bravo.tempo = tipoTempo;
  }
  document.getElementById('tempo-condicao').innerHTML = tipoTempo;
  document.getElementById('tempo-estacao').innerHTML = estacao;
  document.getElementById('tempo-estacao-info').innerHTML = ESTACOES[estacao].info;

  // 30 de Narquelië ☘ 2980 TA
  let textoDados = json.bravo.dia + ' de ' + json.bravo.mes + ' ☘ ' + json.bravo.ano + ' ' + json.bravo.era;
  document.getElementById('tempo-dados').innerHTML = textoDados;
}

function preencherFormularioPersonagem(json,personagem) {
  document.getElementById('form-' + personagem + '-endurance').value = json[personagem].endurance;
  document.getElementById('form-' + personagem + '-hope').value = json[personagem].hope;
  document.getElementById('form-' + personagem + '-shadow').value = json[personagem].shadow;
  document.getElementById('form-' + personagem + '-exausto').selectedIndex = (json[personagem].exausto == 'sim') ? 0 : 1;
  document.getElementById('form-' + personagem + '-abatido').selectedIndex = (json[personagem].abatido == 'sim') ? 0 : 1;
  document.getElementById('form-' + personagem + '-ferido').selectedIndex = (json[personagem].ferido == 'sim') ? 0 : 1;
}

function preencherFormulario(json) {
  let chaveMeses = Object.keys(MESES);
  chaveMeses.forEach((item, i) => {
    criarOption('form-mes',item,()=>{
      return ' ' + MESES[item].info + ',' + MESES[item].dias;
    });
  });

  document.getElementById('form-fellowship').value = json.bravo.fellowship;
  document.getElementById('form-hora').value = parseInt(json.bravo.hora);
  document.getElementById('form-dia').value = parseInt(json.bravo.dia);
  document.getElementById('form-mes').selectedIndex = MESES[json.bravo.mes].index;
  document.getElementById('form-ano').value = parseInt(json.bravo.ano);
  document.getElementById('form-estacao').value = json.bravo.estacao + ' ' + ESTACOES[json.bravo.estacao].info;

  let condicoes = TIPOS_TEMPO[json.bravo.estacao];
  let selected = 0;
  condicoes.forEach((item, i) => {
    if (json.bravo.tempo == item) {
      selected = i;
    }
    criarOption('form-condicao',item,()=>{return '';});
  });
  document.getElementById('form-condicao').selectedIndex = selected;
}

function adicionarDiasRelogio(dia,mes,ano,dias,callback) {
  let dias_mes = MESES[mes].dias;
  let dias_somados = (dia + dias);

  if (dias_somados <= dias_mes) {
    dias = 0;
    callback(dias_somados,mes,ano);
  } else {
    dias = dias - (dias_mes - dia);

    // Adicionar MES
    if (mes == 'Mettarë') {
      mes = 'Yestarë';
      ano = (ano + 1);
    } else {
      let chaveMeses = Object.keys(MESES);
      let indexChaveMes = chaveMeses.indexOf(mes);
      mes = chaveMeses[ indexChaveMes + 1 ];
    }
    adicionarDiasRelogio(1,mes,ano,dias,callback);
  }
}

function adicionarMesRelogio(mes,ano,callback) {
  if (mes == 'Mettarë') {
    callback('Yestarë',(ano + 1));
  } else {
    let chaveMeses = Object.keys(MESES);
    let indexChaveMes = chaveMeses.indexOf(mes);
    callback(chaveMeses[ indexChaveMes + 1 ],ano);
  }
}

document.getElementById('form-button-add-horas').addEventListener('click',event=>{
  event.preventDefault();
  let jsonFormulario = clonarJSON(JSON_RECEBIDO);

  let horas = parseInt(document.getElementById('form-add-horas').value);
  let hora = parseInt(jsonFormulario.bravo.hora);

  let hora_somada = hora + horas;

  if (hora_somada < 24) { // MENOR DE 24

    jsonFormulario.bravo.hora = String(hora_somada);

    salvar((json)=>{
      controlarRelogio(jsonFormulario,true);
      preencherFormulario(jsonFormulario);
      JSON_RECEBIDO = clonarJSON(jsonFormulario);
      console.log('Dados atualizados com sucesso!');
      
      document.getElementById('form-button-add-horas').value = 'Add ✔';
        setTimeout(()=>{document.getElementById('form-button-add-horas').value = 'Add';},5000);
      
    },jsonFormulario);

  } // MENOR DE 24
  else { // MAIOR QUE 24
    let dia = parseInt(jsonFormulario.bravo.dia);
    let mes = jsonFormulario.bravo.mes;
    let ano = parseInt(jsonFormulario.bravo.ano);
    adicionarDiasRelogio(dia,mes,ano,1,(novo_dia,novo_mes,novo_ano)=>{
      jsonFormulario.bravo.hora = String(Math.abs(24 - hora_somada));
      jsonFormulario.bravo.dia = String(novo_dia);
      jsonFormulario.bravo.mes = novo_mes;
      jsonFormulario.bravo.ano = String(novo_ano);

      salvar((json)=>{
        controlarRelogio(jsonFormulario,true);
        preencherFormulario(jsonFormulario);
        JSON_RECEBIDO = clonarJSON(jsonFormulario);
        console.log('Dados atualizados com sucesso!');
        
        document.getElementById('form-button-add-horas').value = 'Add ✔';
        setTimeout(()=>{document.getElementById('form-button-add-horas').value = 'Add';},5000);
        
      },jsonFormulario);
    });
  } // MAIOR QUE 24
});

document.getElementById('form-button-add-dias').addEventListener('click',event=>{
  event.preventDefault();
  let jsonFormulario = clonarJSON(JSON_RECEBIDO);

  let dia = parseInt(jsonFormulario.bravo.dia);
  let mes = jsonFormulario.bravo.mes;
  let ano = parseInt(jsonFormulario.bravo.ano);
  let dias = parseInt(document.getElementById('form-add-dias').value);

  adicionarDiasRelogio(dia,mes,ano,dias,(novo_dia,novo_mes,novo_ano)=>{
    jsonFormulario.bravo.dia = String(novo_dia);
    jsonFormulario.bravo.mes = novo_mes;
    jsonFormulario.bravo.ano = String(novo_ano);

    salvar((json)=>{
      controlarRelogio(jsonFormulario,true);
      preencherFormulario(jsonFormulario);
      JSON_RECEBIDO = clonarJSON(jsonFormulario);
      console.log('Dados atualizados com sucesso!');
      
      document.getElementById('form-button-add-dias').value = 'Add ✔';
        setTimeout(()=>{document.getElementById('form-button-add-dias').value = 'Add';},5000);
      
    },jsonFormulario);

  });
});

['nirah','idril','torteck','bravos'].forEach((item, i) => {
  let botao = document.getElementById('form-button-atualizar-' + item);
  botao.addEventListener('click',event=>{
    console.log('Salvando dados de ' + item);
    event.preventDefault();
    let jsonFormulario = obterFormularioPersonagem(item);
    if (params.debug == 'true') {
      atualizarDadosPersonagem(item,jsonFormulario);
    } else {
      salvar((json)=>{
        atualizarDadosPersonagem(item,jsonFormulario);
        JSON_RECEBIDO = clonarJSON(jsonFormulario);
        console.log('Dados atualizados com sucesso!');
        botao.value = 'Atualizar Dados ✔';
        setTimeout(()=>{botao.value = 'Atualizar Dados';},5000);
      },jsonFormulario);
    }
  });
});

function clonarJSON(json) {
  return JSON.parse(JSON.stringify(json));
}

function obterDadosFormulario() {
  let jsonFormulario = clonarJSON(JSON_RECEBIDO);
  jsonFormulario.bravo.fellowship = document.getElementById('form-fellowship').value;
  jsonFormulario.bravo.ano = document.getElementById('form-ano').value;
  let campoMes = document.getElementById('form-mes');
  jsonFormulario.bravo.mes = campoMes.options[ campoMes.selectedIndex ].value;
  jsonFormulario.bravo.dia = document.getElementById('form-dia').value;
  jsonFormulario.bravo.hora = document.getElementById('form-hora').value;
  jsonFormulario.bravo.era = 'TA';
  // estacao já está atualizada
  let campoTempo = document.getElementById('form-condicao');
  jsonFormulario.bravo.tempo = campoTempo.options[ campoTempo.selectedIndex ].value;

  return jsonFormulario;
}

document.getElementById('form-button-atualizar-relogio').addEventListener('click',event=>{
  event.preventDefault();
  let jsonFormulario = obterDadosFormulario();
  if (params.debug == 'true') {debug
    controlarRelogio(jsonFormulario,false);
    JSON_RECEBIDO = clonarJSON(jsonFormulario);
  } else {
    salvar((json)=>{
      controlarRelogio(jsonFormulario,false);
      JSON_RECEBIDO = clonarJSON(jsonFormulario);
      console.log('Dados atualizados com sucesso!');
      
      document.getElementById('form-button-atualizar-relogio').value = 'Atualizar Dados ✔';
        setTimeout(()=>{document.getElementById('form-button-atualizar-relogio').value = 'Atualizar Dados';},5000);
      
    },jsonFormulario);
  }
});

function consumirAPI(metodo,url,sucesso,falha,json) {

    console.log('Consumindo API: ' + url);

    if (params.debug == 'true') {
      sucesso(JSON_DEFAULT);
    } else {
      var xhr = new XMLHttpRequest();

      xhr.open(metodo,url);
      xhr.timeout = 10000;

      xhr.addEventListener('load',function(){
          if (xhr.status == 200) {
              if (metodo != 'POST') {
                var json = JSON.parse(xhr.responseText);
                sucesso(json);
              } else {
                sucesso();
              }
          } else {
              console.log(xhr);
              falha(xhr.status + ': ' + xhr.statusText);
          }
      });
      xhr.addEventListener('timeout',function(){
          //falha('Não foi possível obter o conteúdo!');
          falha(xhr.status + ': ' + xhr.statusText);
      });
      xhr.addEventListener('error',function(evento){
          //falha('Ocorreu um erro ao obter o conteúdo!');
          falha(xhr.status + ': ' + xhr.statusText);
      });

      if (json != undefined) {
          xhr.send(json);
      } else {
          xhr.send();
      }
    }
}

function obter(sucesso,falha) {
  consumirAPI(
      'GET',
      base_url,
      sucesso,
      falha
  );
}

function salvar_api(personagem,atributo,valor,callback) {
    fetch('https://flechamagica.com.br/live/api.php?personagem=' + personagem + '&atributo=' + atributo + '&valor=' + valor)
      .then(response => response.json())
      .then(data => {
          console.log(data.msg);
          callback(data.atualizado);
      });
}

function salvar(callback,json) {
    let personagens = Object.keys(json);
    personagens.forEach((personagem, i) => {
        let atributos = Object.keys(json[personagem]);
        atributos.forEach((atributo, j) => { // FOR

            if (json[personagem][atributo] != JSON_RECEBIDO[personagem][atributo]) {
              salvar_api(personagem,atributo,json[personagem][atributo],atualizado=>{
                  if (!atualizado) {
                      console.log("Não salvo!");
                  }

                  // Sair?
                  if (i == (personagens.length - 1)) {
                      if (j == (atributos.length - 1)) {
                          callback();
                      }
                  }
              });
            } else {
              // Sair?
              if (i == (personagens.length - 1)) {
                  if (j == (atributos.length - 1)) {
                      callback();
                  }
              }
            }

        }); // FOR
    });
}

function criarOption(select,valor,textoExtra) {
  let tagSelect = document.getElementById(select);
  let option = document.createElement('option');
  option.value = valor;
  option.innerHTML = valor + textoExtra();
  tagSelect.appendChild(option);
}

function executar() {
    obter(json=>{
      console.log(json);
      document.getElementById('fellowship').innerHTML = json.bravo.fellowship;
      atualizarDadosPersonagem('nirah',json);
      atualizarDadosPersonagem('idril',json);
      atualizarDadosPersonagem('torteck',json);
      atualizarDadosPersonagem('bravos',json);
      controlarRelogio(json,false);
      preencherFormulario(json);
      preencherFormularioPersonagem(json,'idril');
      preencherFormularioPersonagem(json,'nirah');
      preencherFormularioPersonagem(json,'torteck');
      preencherFormularioPersonagem(json,'bravos');
      JSON_RECEBIDO = json;
    },()=>{
        console.log('Não foi possível obter a pergunta!');
    });
}

executar();
if ( (params.debug != 'true') && (params.form != 'true')) {
  setInterval(executar,5000);
}
