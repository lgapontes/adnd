
function clone_npc(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function sortear_nome_npc(callback) {
  let base_nomes = clone_npc(NOMES_RACAS);
  let tipos_nomes = ["Masculino","Feminino","Sobrenome"];
  let racas_nomes = ["Humano","Anão","Elfo","Gnomo","Meio-Elfo","Halfling","Meio-Vistani","Goblin"];

  let racas_selecionada = document.getElementById('texto-formulario-npc-raca').options[document.getElementById('texto-formulario-npc-raca').selectedIndex].value;
  if (racas_selecionada == 'Goblin') {
    racas_nomes = ["Goblin"];
  }

  let array_nomes = [];

  racas_nomes.forEach((raca_nome, index_raca_nome) => {
    tipos_nomes.forEach((tipo_nome, index_tipo_nome) => {
      array_nomes = array_nomes.concat(base_nomes[raca_nome][tipo_nome]);

      if (index_tipo_nome == (tipos_nomes.length - 1)) {
        if (index_raca_nome == (racas_nomes.length - 1)) {
          let nome = array_nomes[Math.floor(Math.random() * array_nomes.length)];

          let generos = [ 'Masculino' , 'Feminino' ];
          let genero = generos[Math.floor(Math.random() * generos.length)];

          let comportamentos = ['Argumentativo','Arrogante','Caprichoso','Descuidado','Corajoso','Curioso','Metódico','Amigável','Ganancioso','Generoso','Melancólico','Ingênuo','Dogmático','Otimista','Pessimista','Quieto','Sóbrio','Desconfiado','Incivilizado','Violento'];
          let comportamento = comportamentos[Math.floor(Math.random() * comportamentos.length)];

          let profissao = PROFISSOES[Math.floor(Math.random() * PROFISSOES.length)];
          let profissao_selecionada = document.getElementById('texto-formulario-npc-profissao').options[document.getElementById('texto-formulario-npc-profissao').selectedIndex].value;
          if (profissao_selecionada != 'Todas') {
            profissao = profissao_selecionada;
          }

          callback(nome,genero,comportamento,profissao);
        }
      }
    });
  });
}

function obterRacaNPC(raca) {
  if (raca == "Goblin") {
    return RACA_GOBLIN;
  } else if (raca == "Drow") {
    return RACA_DROW;
  } else {
    return RACAS[raca];
  }
}

function sortear_raca_npc(genero_original,callback) {

  let raca = "Humano";
  let racas_selecionada = document.getElementById('texto-formulario-npc-raca').options[document.getElementById('texto-formulario-npc-raca').selectedIndex].value;
  if (racas_selecionada != 'Todas') {
    raca = racas_selecionada;
  } else {
    let racas = ["Humano","Humano","Humano","Humano","Anão","Anão","Elfo","Elfo","Gnomo","Meio-Elfo","Halfling","Drow","Goblin"];
    raca = racas[Math.floor(Math.random() * racas.length)];
  }

  let genero = 'Feminino';
  // Ajuste para as regras para de altura e peso do AD&D
  if ( (genero_original == 'Masculino') || (genero_original == 'Neutro') ) {
    genero = 'Masculino';
  }

  let ajuste_altura = obterRacaNPC(raca).altura[genero].maximo - obterRacaNPC(raca).altura[genero].minimo;
  let altura_decimal = (Math.random() * ajuste_altura) + obterRacaNPC(raca).altura[genero].minimo;
  let altura = altura_decimal.toFixed(2);

  let ajuste_idade = obterRacaNPC(raca).idade.maximo - obterRacaNPC(raca).idade.minimo;
  let idade = Math.floor(Math.random() * ajuste_idade) + obterRacaNPC(raca).idade.minimo;

  let ajuste_peso = obterRacaNPC(raca).peso[genero].maximo - obterRacaNPC(raca).peso[genero].minimo;
  let peso_decimal = (Math.random() * ajuste_peso) + obterRacaNPC(raca).peso[genero].minimo;
  let peso = peso_decimal.toFixed(2);

  let divindade = DIVINDADES[raca][Math.floor(Math.random() * DIVINDADES[raca].length)];

  callback(raca,altura,idade,peso,divindade);
}

function ajustar_nome_raca_npc(raca) {
  if ( (raca.indexOf('Elfo') > -1) || (raca.indexOf('Drow') > -1) ) {
    raca = 'Elfo';
  }
  if (raca.indexOf('Halfling') > -1) {
    raca = 'Halfling';
  }
  if (raca.indexOf('Meio-Vistani') > -1) {
    raca = 'Meio-Vistani';
  }
  return raca;
}

function validar_classes_por_raca_npc(raca_original, callback) {
  let keys_classes = Object.keys(CIRCULOS_POR_CLASSE_E_NIVEL);
  let classes_permitidas = [];

  keys_classes.forEach((classe,index_classes) => {
    let keys_racas = CLASSES[classe]["Raças Permitidas"];
    keys_racas.push('Goblin');
    let classe_permitida = false;

    keys_racas.forEach((raca, index_classe_permitida) => {
      if (ajustar_nome_raca_npc(raca_original) == raca) {
        classe_permitida = true;
      }

      if (index_classe_permitida == (keys_racas.length - 1)) {
        if (classe_permitida) {
          classes_permitidas.push(classe);
        }
      }
    });

    if (index_classes == (keys_classes.length - 1)) {
      callback(classes_permitidas);
    }
  });
}

function arredondar_numero_npc(numero) {
  return Math.floor(numero);
}

function sortear_dados_vida_npc(nivel,classe,callback) {
  let pontos_vida = 0;
  let somar_pontos_vida = 1;
  let minimo_pontos_vida = 1;

  if (classe == "Guerreiro") {
    somar_pontos_vida += arredondar_numero_npc(2 * nivel);
    minimo_pontos_vida = 3;
  } else if (classe == "Paladino") {
    somar_pontos_vida += arredondar_numero_npc(1.5 * nivel);
    minimo_pontos_vida = 2;
  } else if (classe == "Ranger") {
    somar_pontos_vida += arredondar_numero_npc(1.5 * nivel);
    minimo_pontos_vida = 2;
  } else if (classe == "Mago") {
    somar_pontos_vida += (1 * nivel);
    minimo_pontos_vida = 1;
  } else if (classe == "Clérigo") {
    somar_pontos_vida += arredondar_numero_npc(1.5 * nivel);
    minimo_pontos_vida = 2;
  } else if (classe == "Druida") {
    somar_pontos_vida += arredondar_numero_npc(1.5 * nivel);
    minimo_pontos_vida = 2;
  } else if (classe == "Ladrão") {
    somar_pontos_vida += arredondar_numero_npc(1.5 * nivel);
    minimo_pontos_vida = 2;
  } else if (classe == "Bardo") {
    somar_pontos_vida += arredondar_numero_npc(1.5 * nivel);
    minimo_pontos_vida = 2;
  }

  for (let i=0; i<nivel; i++) {
    pontos_vida += (Math.floor(Math.random() * 8) + 1);

    if (i == (nivel - 1)) {
      pontos_vida += somar_pontos_vida;

      if (pontos_vida < minimo_pontos_vida) {
        pontos_vida = minimo_pontos_vida;
      }

      callback(pontos_vida);
    }
  }
}

function sortear_classe_npc(profissao,nivel,raca,callback) {
  validar_classes_por_raca_npc(raca, classes => {
    let classe = classes[Math.floor(Math.random() * classes.length)];

    // Restricoes
    /*
    let restricoes = {
      'Abjurante': 'Guerreiro',
      'Conjurador': 'Paladino',
      'Adivinho': 'Ranger',
      'Feiticeiro': 'Mago',
      'Ilusionista': 'Guerreiro',
      'Invocador': 'Paladino',
      'Necromante': 'Ranger',
      'Transmutador': 'Mago',
      'Vingador': 'Guerreiro',
      'Elementalista': 'Mago',
      'Arcanista': 'Druida',
      'Anacoreta': 'Bardo',
      'Cigano': 'Ladrão',
      'Psionicista': 'Clérigo'
    };
    */
    let restricoes = {
      'Abjurante': 'Mago',
      'Conjurador': 'Mago',
      'Adivinho': 'Mago',
      'Feiticeiro': 'Mago',
      'Ilusionista': 'Mago',
      'Invocador': 'Mago',
      'Necromante': 'Mago',
      'Transmutador': 'Mago',
      'Vingador': 'Guerreiro',
      'Elementalista': 'Mago',
      'Arcanista': 'Druida',
      'Anacoreta': 'Bardo',
      'Cigano': 'Ladrão',
      'Psionicista': 'Clérigo'
    };

    if (Object.hasOwn(restricoes, classe)) {
      classe = restricoes[classe];
    }
    if ((raca == 'Gnomo') && (classe == 'Mago')) {
      classe = 'Ilusionista';
    }

    if ((profissao == 'Dragão Púrpura (Suzail)') || (profissao == 'Capitão Dragão Púrpura (Suzail)') || (profissao == 'Vigilante do Trono de Ferro (Suzail)')) {
      classe = 'Guerreiro';
    }

    if ((profissao == 'Dragão Púrpura (Suzail)') || (profissao == 'Capitão Dragão Púrpura (Suzail)') || (profissao == 'Vigilante do Trono de Ferro (Suzail)')) {
      classe = 'Guerreiro';
    }

    let classe_selecionada = document.getElementById('texto-formulario-npc-classe').options[document.getElementById('texto-formulario-npc-classe').selectedIndex].value;
    if (classe_selecionada != 'Todas') {
      classe = classe_selecionada;
    }

    sortear_dados_vida_npc(nivel,classe,pv=>{

      let nivel_resistencia = nivel;
      if (nivel_resistencia > 10) {
        nivel_resistencia = 10;
      }
      let resistencia = clone_npc(RESISTENCIA[nivel_resistencia]);
      let s_resistencia = `Resistências: Magia ${resistencia["Magia"]}, Sopro ${resistencia["Sopro-de-Dragão"]}, Petrificação ${resistencia["Petrificação ou Transformação"]}, Varinha ${resistencia["Bastão, Cajado ou Varinha"]}, Paralisação, Veneno ou Morte ${resistencia["Paralisação, Veneno ou Morte por Magia"]}`;

      let thaco = THAC0[classe][nivel_resistencia];

      let tendencia = TENDENCIAS[Math.floor(Math.random() * TENDENCIAS.length)];

      let moral = MORAL[nivel_resistencia];
      if (raca == 'Goblin') {
        moral = MORAL_GOBLIN[nivel_resistencia];
      }

      callback(classe,pv,s_resistencia,thaco,tendencia,moral);
    });
  });
}

function sortear_magias_npc(nivel,classe,callback) {
  let nivel_magia = nivel - 1;

  let magias = {
    conjurador: false,
    lista: {
      '1º Círculo': [],
      '2º Círculo': [],
      '3º Círculo': [],
      '4º Círculo': [],
      '5º Círculo': []
    }
  };

  if (CIRCULOS_POR_CLASSE_E_NIVEL[classe].magias[nivel_magia].possui) {
    magias.conjurador = true;
    let circulos = Object.keys(magias.lista);
    CIRCULOS_POR_CLASSE_E_NIVEL[classe].obter_lista((lista_magias)=>{

      circulos.forEach((circulo, index_circulo) => {
        let quantidade = CIRCULOS_POR_CLASSE_E_NIVEL[classe].magias[nivel_magia][circulo];

        if (quantidade > 0) {
          for (let contador=quantidade; contador>0; contador--) {

            if (contador == quantidade) {
              magias.lista[circulo].push(
                lista_magias[circulo].importantes[Math.floor(Math.random() * lista_magias[circulo].importantes.length)]
              );
            } else {
              magias.lista[circulo].push(
                lista_magias[circulo].outras[Math.floor(Math.random() * lista_magias[circulo].outras.length)]
              );
            }

            if (contador == 1) {
              if (index_circulo == (circulos.length - 1)) {
                callback(magias);
              }
            }
          }
        } else {
          if (index_circulo == (circulos.length - 1)) {
            callback(magias);
          }
        }
      });

    });
  } else {
    callback(magias);
  }
}

function restringir_armas_npc(array_completo, array_restrito, callback) {
  let array_final = [];

  if ((array_restrito != undefined) && (array_restrito != null) && (array_restrito.length > 0)) {
    array_completo.forEach((item_completo, index_completo) => {
      array_restrito.forEach((item_restrito, index_restrito) => {

        if (item_completo == item_restrito) {
          array_final.push(item_completo);
        }

        if (index_restrito == (array_restrito.length - 1)) {
          if (index_completo == (array_completo.length - 1)) {
            return callback(array_final);
          }
        }
      });
    });
  } else {
    return callback(array_completo);
  }
}

function reduzir_moedas_npc(moedas, preco) {
  // preco: { quantidade: 10, moeda: 'po' }
  let final = 0;
  if (preco.moeda == "pc") {
    let preco_po = preco.quantidade / 100;
    final = moedas - preco_po;
  } else if (preco.moeda == "pp") {
    let preco_po = preco.quantidade / 10;
    final = moedas - preco_po;
  } else if (preco.moeda == "pe") {
    let preco_po = preco.quantidade / 2;
    final = moedas - preco_po;
  } else if (preco.moeda == "po") {
    final = moedas - preco.quantidade;
  } else if (preco.moeda == "pl") {
    let preco_po = preco.quantidade * 5;
    final = moedas - preco_po;
  } else {
    console.log("Erro ao calcular moedas: " + preco);
  }
  return { moedas: final, valido: (final >= 0) };
}

function formatar_misseis_npc(nome_missel, missel) {
  /*
  "Dardo Farpado": { quantidade: 20, preco: { quantidade: 20, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d3' },
  */
  return missel.quantidade + "x " + nome_missel + ", " +
        (missel.peso * missel.quantidade).toFixed(2) + "kg, " + missel.tamanho + ", " +
        missel.tipo + ", Velocidade " + missel.velocidade + ", Dano (P) " + missel.dano_p + ", Dano (MG) " + missel.dano_mg + ", Disparos/Rodada: " + missel.cadencia;
}

function sortear_itens_armas_npc(nivel,moeda_limite, peso_limite, classe, raca, itens, callback) {
  let itens_extras = [];
  let keys_armas = Object.keys(ARMAS);
  let armas_mais_fortes = [];
  let moeda_descontada_final = moeda_limite;
  let peso_descontado_final = peso_limite;
  let armas_ja_sorteadas = [];

  restringir_armas_npc(keys_armas, CLASSES[classe].armas, sorteio_armas_1 => {

    let armas_importantes = obterRacaNPC(raca).armas_importantes;

    restringir_armas_npc(sorteio_armas_1, armas_importantes, sorteio_armas_2 => {
      restringir_armas_npc(sorteio_armas_2, CLASSES[classe].armas_divindade, sorteio_armas_3 => {
        if (sorteio_armas_3.length == 0) {
          if ( (CLASSES[classe].armas_divindade != undefined) && (CLASSES[classe].armas_divindade != null) && (CLASSES[classe].armas_divindade.length > 0) ) {
            sorteio_armas_3 = CLASSES[classe].armas_divindade.slice();
          } else if (CLASSES[classe].armas.length > 0) {
            sorteio_armas_3 = CLASSES[classe].armas.slice();
          } else if (armas_importantes.length > 0) {
            sorteio_armas_3 = armas_importantes.slice();
          } else {
            sorteio_armas_3.push("Adaga");
            sorteio_armas_3.push("Punhal");
            sorteio_armas_3.push("Faca");
            sorteio_armas_3.push("Chicote");
            sorteio_armas_3.push("Cajado");
          }
        }

        /* Sortear arma */
        let quantidade_armas = Math.floor(Math.random() * 4) + 2;

        for (let qtde = 0; qtde < quantidade_armas; qtde++) {

          let index_sorteio = Math.floor(Math.random() * sorteio_armas_3.length);
          let nome_arma = sorteio_armas_3[index_sorteio];
          let arma = ARMAS[nome_arma];
          let arma_preco = { quantidade: 10000, moeda: 'po' };

          if ((arma == 'undefined') || (arma == undefined) || (arma == null) || (arma == '')) {
            console.log('A arma ' + nome_arma + ' não foi encontrada na lista de armas.');
          } else {
            arma_preco = arma.preco;
          }

          let moeda_descontada = reduzir_moedas_npc(moeda_descontada_final, arma_preco);
          if ( (!armas_ja_sorteadas.includes(nome_arma)) && (moeda_descontada.valido) && (peso_descontado_final >= arma.peso) ) {

            /*
              "Arcabuz": { preco: { quantidade: 500, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 15, dano_p: '1d10', dano_mg: '1d10', dano: 10, detalhes: [] },
            */

            //{ arma: 'Nome', dano: 0 }
            if (armas_mais_fortes.length == 0) {
              armas_mais_fortes.push({ arma: nome_arma, dano: arma.dano });
            } else {
              if (arma.dano > armas_mais_fortes[0].dano) {
                armas_mais_fortes.unshift({ arma: nome_arma, dano: arma.dano });
              } else {
                if (nome_arma == "Adaga") {
                  if (!armas_mais_fortes.some(e => e.arma == "Adaga")) {
                    armas_mais_fortes.push({ arma: nome_arma, dano: arma.dano });
                  }
                } else {
                  armas_mais_fortes.push({ arma: nome_arma, dano: arma.dano });
                }
              }
            }

            moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, arma.preco).moedas;
            peso_descontado_final = peso_descontado_final - arma.peso;
            itens.push(formatar_arma_npc(nome_arma, arma));
            armas_ja_sorteadas.push(nome_arma);

            /*
              "Zarabatana" "Dardo Agulha"
              "Arco Longo Composto" "Flecha da Guerra"
              "Arco Curto Composto" "Flecha de Caça"
              "Arco Longo" "Flecha da Guerra"
              "Arco Curto" "Flecha de Caça"
              "Besta de Mão" "Quadrelo de Mão"
              "Besta Pesada" "Quadrelo Grande"
              "Besta Leve" "Quadrelo Pequeno"
              "Funda" "Chumbo de Funda"
              "Cajado-Funda" "Chumbo de Funda"
            */
            if ( (nome_arma == "Arco Longo Composto") || (nome_arma == "Arco Longo") ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Flecha da Guerra"];
              let nome_formatado = formatar_misseis_npc("Flecha da Guerra", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( (nome_arma == "Arco Curto Composto") || (nome_arma == "Arco Curto") ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Flecha de Caça"];
              let nome_formatado = formatar_misseis_npc("Flecha de Caça", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Zarabatana" ) {
              let missel = MISSEIS["Dardo Agulha"];
              let nome_formatado = formatar_misseis_npc("Dardo Agulha", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Besta de Mão" ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Quadrelo de Mão"];
              let nome_formatado = formatar_misseis_npc("Quadrelo de Mão", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Besta Pesada" ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Quadrelo Grande"];
              let nome_formatado = formatar_misseis_npc("Quadrelo Grande", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Besta Leve" ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Quadrelo Pequeno"];
              let nome_formatado = formatar_misseis_npc("Quadrelo Pequeno", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( (nome_arma == "Funda") || (nome_arma == "Cajado-Funda") ) {
              let missel = MISSEIS["Chumbo de Funda"];
              let nome_formatado = formatar_misseis_npc("Chumbo de Funda", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Arcabuz") {
              let missel = MISSEIS["Projéteis de Arcabuz"];
              let nome_formatado = formatar_misseis_npc("Projéteis de Arcabuz", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Mosquete") {
              let missel = MISSEIS["Projéteis de Mosquete"];
              let nome_formatado = formatar_misseis_npc("Projéteis de Mosquete", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Bacamarte") {
              let missel = MISSEIS["Projéteis de Bacamarte"];
              let nome_formatado = formatar_misseis_npc("Projéteis de Bacamarte", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Caviler") {
              let missel = MISSEIS["Projéteis de Caviler"];
              let nome_formatado = formatar_misseis_npc("Projéteis de Caviler", missel);
              itens.push(nome_formatado);
              moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            }
          }

          if (qtde == (quantidade_armas - 1)) {
            callback(moeda_descontada_final, peso_descontado_final, armas_mais_fortes, itens_extras);
          }
        }

      });
    });
  });
}

function ajustar_armas_por_nivel_npc(nivel,armas,callback) {
  if (nivel > 2) {
    callback(armas);
  } else {
    let nova_lista = [];
    let arma = armas[0];
    nova_lista.push(arma);

    if ( arma.includes("Arco Longo Composto") || arma.includes("Arco Longo") ) {
      let missel = MISSEIS["Flecha da Guerra"];
      let nome_formatado = formatar_misseis_npc("Flecha da Guerra", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Arco Curto Composto") || arma.includes("Arco Curto") ) {
      let missel = MISSEIS["Flecha de Caça"];
      let nome_formatado = formatar_misseis_npc("Flecha de Caça", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Zarabatana") ) {
      let missel = MISSEIS["Dardo Agulha"];
      let nome_formatado = formatar_misseis_npc("Dardo Agulha", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Besta de Mão") ) {
      let missel = MISSEIS["Quadrelo de Mão"];
      let nome_formatado = formatar_misseis_npc("Quadrelo de Mão", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Besta Pesada") ) {
      let missel = MISSEIS["Quadrelo Grande"];
      let nome_formatado = formatar_misseis_npc("Quadrelo Grande", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Besta Leve") ) {
      let missel = MISSEIS["Quadrelo Pequeno"];
      let nome_formatado = formatar_misseis_npc("Quadrelo Pequeno", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Funda") || arma.includes("Cajado-Funda") ) {
      let missel = MISSEIS["Chumbo de Funda"];
      let nome_formatado = formatar_misseis_npc("Chumbo de Funda", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Arcabuz") ) {
      let missel = MISSEIS["Projéteis de Arcabuz"];
      let nome_formatado = formatar_misseis_npc("Projéteis de Arcabuz", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Mosquete") ) {
      let missel = MISSEIS["Projéteis de Mosquete"];
      let nome_formatado = formatar_misseis_npc("Projéteis de Mosquete", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Bacamarte") ) {
      let missel = MISSEIS["Projéteis de Bacamarte"];
      let nome_formatado = formatar_misseis_npc("Projéteis de Bacamarte", missel);
      nova_lista.push(nome_formatado);

    } else if ( arma.includes("Caviler") ) {
      let missel = MISSEIS["Projéteis de Caviler"];
      let nome_formatado = formatar_misseis_npc("Projéteis de Caviler", missel);
      nova_lista.push(nome_formatado);

    }

    callback(nova_lista);
  }
}

function formatar_item_npc(item) {
  /*
  let peso = '';
  if ( (item.peso != undefined) && (item.peso != 'undefined') && (item.peso != null) && (item.peso != 0) ) {
    peso = ", " + item.peso + "kg";
  }
  return item.nome + ", " + item.preco.quantidade + " " + item.preco.moeda + peso;
  */
  return item.nome;
}

function sortear_itens_escudos_npc(moeda_limite, peso_limite, classe, itens, callback) {
  let ca_escudo = false;
  if (CLASSES[classe].escudos.length > 0) {
    let index_item = Math.floor(Math.random() * (CLASSES[classe].escudos.length + 1));
    if (index_item == CLASSES[classe].escudos.length) {
      callback(moeda_limite, peso_limite, ca_escudo);
    } else {
      let escudo = CLASSES[classe].escudos[index_item];
      /*{
          nome: 'Escudo de Corpo',
          ca: 1,
          preco: { quantidade: 10, moeda: 'po' },
          peso: 7.5,
          ataques_por_rodada: 0,
          detalhes: [ "O Escudo de Corpo fornece +1 de Categoria de Armadura para ataques à distância." ]
        },*/
      let resultado_moedas = reduzir_moedas_npc(moeda_limite, escudo.preco);
      let resultado_peso = peso_limite - escudo.peso;
      if ( (resultado_moedas.valido) && (resultado_peso >= 0) ) {

        ca_escudo = true;
        let ataques_por_rodada = '';
        if (escudo.ataques_por_rodada > 0) {
          ataques_por_rodada = 'Ataques por rodada: ' + escudo.ataques_por_rodada + ', ';
        }
        itens.push(escudo.nome + ', ' + ataques_por_rodada + escudo.peso + 'kg, ' + escudo.preco.quantidade + ' ' + escudo.preco.moeda);
        callback(resultado_moedas.moedas, resultado_peso, ca_escudo);
      } else {
        callback(moeda_limite, peso_limite, ca_escudo);
      }
    }
  } else {
    callback(moeda_limite, peso_limite, ca_escudo);
  }
}

function sortear_itens_armaduras_npc(nivel,moeda_limite, peso_limite, classe, itens, callback) {
  let armadura_mais_leve = { peso: 1000, validar: true };

  if (CLASSES[classe].armaduras.length > 0) {

    let sorteio_armadura = [];

    CLASSES[classe].armaduras.forEach((armadura, index_armadura) => {

      /*
        { nome: 'Corselete de Couro Simples', ca: 8, preco: { quantidade: 5, moeda: 'po' }, peso: 7.5 },
      */
      let moeda_descontada = reduzir_moedas_npc(moeda_limite, armadura.preco);
      if ( (moeda_descontada.valido) && (peso_limite >= armadura.peso) ) {
        if (armadura_mais_leve.validar) {
          if (armadura.peso < armadura_mais_leve.peso) {
            armadura_mais_leve.peso = armadura.peso;
            sorteio_armadura.push(armadura);
          }
        } else {
          sorteio_armadura.push(armadura);
        }
      }

      if (index_armadura == (CLASSES[classe].armaduras.length - 1)) {
        if (sorteio_armadura.length > 0) {

          let index_sorteio = Math.floor(Math.random() * sorteio_armadura.length);
          let armadura_sorteada = sorteio_armadura[index_sorteio];
          let moeda_descontada_final = reduzir_moedas_npc(moeda_limite, armadura_sorteada.preco);
          let peso_descontado_final = peso_limite - armadura_sorteada.peso;

          if (nivel > 2) {
            itens.push(armadura_sorteada.nome + ', ' + armadura_sorteada.peso + 'kg, ' + armadura_sorteada.preco.quantidade + ' ' + armadura_sorteada.preco.moeda);
            callback(moeda_descontada_final.moedas, peso_descontado_final, armadura_sorteada.ca);
          } else {
            callback(moeda_limite, peso_limite, 10);
          }

        } else {
          callback(moeda_limite, peso_limite, 10);
        }
      }
    });

  } else {
    callback(moeda_limite, peso_limite, 10);
  }
}

function sortear_itens_comuns_npc(moeda_limite, peso_limite, itens, callback) {
  let moeda_descontada_final = moeda_limite;
  let peso_descontado_final = peso_limite;
  let itens_ja_sorteados = [];

  /* Sortear item */
  let quantidade_itens = Math.floor(Math.random() * 6) + 2;
  for (let qtde = 0; qtde < quantidade_itens; qtde++) {

    let index_sorteio = Math.floor(Math.random() * ITENS.length);
    let item = ITENS[index_sorteio];

    let moeda_descontada = reduzir_moedas_npc(moeda_descontada_final, item.preco);
    if ( (!itens_ja_sorteados.includes(item.nome)) && (moeda_descontada.valido) && (peso_descontado_final >= item.peso) ) {
      moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, item.preco).moedas;
      peso_descontado_final = peso_descontado_final - item.peso;
      itens.push(formatar_item_npc(item));
      itens_ja_sorteados.push(item.nome);
    }

    if (qtde == (quantidade_itens - 1)) {
      callback(moeda_descontada_final, peso_descontado_final);
    }

  }
}

function sortear_itens_alimentos_npc(moeda_limite, itens, callback) {
  let moeda_descontada_final = moeda_limite;
  let itens_ja_sorteados = [];

  /* Sortear item */
  let quantidade_itens = Math.floor(Math.random() * 4) + 2;

  for (let qtde = 0; qtde < quantidade_itens; qtde++) {

    let index_sorteio = Math.floor(Math.random() * ALIMENTOS.length);
    let item = ALIMENTOS[index_sorteio];

    let moeda_descontada = reduzir_moedas_npc(moeda_descontada_final, item.preco);
    if ( (!itens_ja_sorteados.includes(item.nome)) && (moeda_descontada.valido) ) {
      moeda_descontada_final = reduzir_moedas_npc(moeda_descontada_final, item.preco).moedas;
      itens.push(formatar_item_npc(item));
      itens_ja_sorteados.push(item.nome);
    }

    if (qtde == (quantidade_itens - 1)) {
      callback(moeda_descontada_final);
    }

  }
}

function formatar_arma_npc(nome_arma, arma) {
  /*
  "Arcabuz": { preco: { quantidade: 500, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 15, dano_p: '1d10', dano_mg: '1d10', dano: 10, detalhes: [] },
  */
  let tamanho = '';
  if (arma.tamanho != '') {
    tamanho = arma.tamanho + ", ";
  }
  let tipo = '';
  if (arma.tipo != '') {
    tipo = arma.tipo + ", ";
  }
  let danos = '';
  if (arma.dano_p != '') {
    danos = ", Dano (P) " + arma.dano_p + ", Dano (MG) " + arma.dano_mg;
  }
  return nome_arma + ", " + arma.peso + "kg, " + arma.preco.quantidade + " " + arma.preco.moeda + ", " + tamanho + tipo + "Velocidade " + arma.velocidade + danos;
}

function converter_po_em_moedas_final_npc(nivel) {
  let moedas_po = (
    (Math.floor(Math.random() * 4) + 1) +
    (Math.floor(Math.random() * 4) + 1)
  );
  let moedas_pp = (
    (Math.floor(Math.random() * 4) + 1) +
    (Math.floor(Math.random() * 4) + 1)
  );
  let moedas_pc = (
    (Math.floor(Math.random() * 4) + 1) +
    (Math.floor(Math.random() * 4) + 1) +
    (Math.floor(Math.random() * 4) + 1)
  );
  return `Moedas: ${moedas_po}po, ${moedas_pp}pp, ${moedas_pc}pc`;
}

function gerar_moedas_npc(nivel) {
  return (
    (Math.floor(Math.random() * 6) + 1) +
    (Math.floor(Math.random() * 6) + 1) +
    (Math.floor(Math.random() * 6) + 1)
  ) * (nivel*10);
}

function sortear_itens_npc(nivel,classe, raca, genero_original, callback) {

  let moedas = gerar_moedas_npc(nivel) * 30;
  let carga_permitida = 50;

  let itens = [];
  let armas = [];
  let armaduras = [];

  /* Vestimentas */
  let genero = 'Feminino';
  // Ajuste para as regras para de altura e peso do AD&D
  if ( (genero_original == 'Masculino') || (genero_original == 'Neutro') ) {
    genero = 'Masculino';
  }

  let lista_vestimentas = VESTIMENTAS[genero];
  let vestimenta_sorteada = lista_vestimentas[Math.floor(Math.random() * lista_vestimentas.length)];
  itens.push(formatar_item_npc(vestimenta_sorteada));

  let moeda_limite = moedas;
  let peso_limite = carga_permitida;
  if (peso_limite < 0) { peso_limite = 0; }

  /* Itens Específicos */
  let instrumento_bardo_nome = '';
  if (classe == "Ladrão") {
    let ferramenta_ladrao = ITENS[67];
    peso_limite = peso_limite - ferramenta_ladrao.peso;
    if (peso_limite < 0) { peso_limite = 0; }
    itens.push(formatar_item_npc(ferramenta_ladrao));
  } else if (classe == "Bardo") {
    let instrumento_bardo = INSTRUMENTOS[Math.floor(Math.random() * INSTRUMENTOS.length)];
    instrumento_bardo_nome = instrumento_bardo.nome;
    peso_limite = peso_limite - instrumento_bardo.peso;
    if (peso_limite < 0) { peso_limite = 0; }
    itens.push(formatar_item_npc(instrumento_bardo));
  } else if (classe == "Clérigo") {
    let simbolo_sagrado = ITENS[15];
    peso_limite = peso_limite - simbolo_sagrado.peso;
    if (peso_limite < 0) { peso_limite = 0; }
    itens.push(formatar_item_npc(simbolo_sagrado));
  }

  sortear_itens_escudos_npc(moeda_limite, peso_limite, classe, armaduras, (resultado_moedas_1, resultado_peso_1, ca_escudo) => {

    sortear_itens_armaduras_npc(nivel,resultado_moedas_1, resultado_peso_1, classe, armaduras, (resultado_moedas_2, resultado_peso_2, ca_armadura) => {

      sortear_itens_armas_npc(nivel,resultado_moedas_2, resultado_peso_2, classe, raca, armas, (resultado_moedas_3, resultado_peso_3, armas_mais_fortes, itens_extras) => {

        ajustar_armas_por_nivel_npc(nivel,armas,(novas_armas)=>{

          sortear_itens_comuns_npc(resultado_moedas_3, resultado_peso_3, itens, (resultado_moedas_4, resultado_peso_4) => {

            sortear_itens_alimentos_npc(resultado_moedas_4, itens, (resultado_moedas_5) => {

              let ajuste_ca = (nivel - 1);
              let ca_final = ca_armadura - ajuste_ca;
              if (ca_escudo) {
                ca_final = ca_final - 1;
              }
              if (ca_final < 0) {
                ca_final = 0;
              }

              let categoria_armadura = ca_final;
              // let moedas_final = converter_po_em_moedas(resultado_moedas_5);
              let moedas_final = converter_po_em_moedas_final_npc(nivel);

              callback(itens,novas_armas,armaduras,categoria_armadura,moedas_final);

            });
          });

        });

      });
    });
  });
}

function formatar_arma_npcs_exibicao_npc(armas,callback) {
  let s_armas = '';
  if (armas.length == 0) {
    callback(s_armas);
  } else {
    armas.forEach((arma, index_arma) => {
      if (index_arma <= (armas.length - 1)) {
        s_armas += '>> ';
      }
      s_armas += arma;
      if (index_arma < (armas.length - 1)) {
        s_armas += '\n';
      }

      if (index_arma == (armas.length - 1)) {
        callback(s_armas);
      }
    });
  }
}

function formatar_arma_npcduras_exibicao_npc(armaduras,callback) {
  let s_armaduras = '\n';
  if (armaduras.length == 0) {
    callback('');
  } else {
    armaduras.forEach((armadura, index_armadura) => {
      if (index_armadura <= (armaduras.length - 1)) {
        s_armaduras += '>> ';
      }
      s_armaduras += armadura;
      if (index_armadura < (armaduras.length - 1)) {
        s_armaduras += '\n';
      }

      if (index_armadura == (armaduras.length - 1)) {
        callback(s_armaduras);
      }
    });
  }
}

function preencher_profissoes(callback) {
  let profissoes = clone_npc(PROFISSOES);
  let select_profissao = document.getElementById('texto-formulario-npc-profissao');

  let option = document.createElement('option');
  option.value = 'Todas';
  option.innerHTML = 'Todas';
  select_profissao.appendChild(option);

  profissoes.forEach((profissao, index_profissao) => {
    let option = document.createElement('option');
    option.value = profissao;
    option.innerHTML = profissao;
    select_profissao.appendChild(option);

    if (index_profissao == (profissoes.length - 1)) {
      callback();
    }
  });
}

function render_npc(nivel,callback) {
  sortear_nome_npc((nome,genero,comportamento,profissao)=>{
    sortear_raca_npc(genero,(raca,altura,idade,peso,divindade)=>{
      sortear_classe_npc(profissao,nivel,raca,(classe,pv,resistencia,thaco,tendencia,moral)=>{
        sortear_magias_npc(nivel,classe,(magias)=>{
          sortear_itens_npc(nivel,classe, raca, genero, (itens,armas,armaduras,categoria_armadura,moedas_final)=>{
            formatar_arma_npcs_exibicao_npc(armas,s_armas=>{
              formatar_arma_npcduras_exibicao_npc(armaduras,s_armaduras=>{

                /* FALTA
                diminuir a qtde de itens
                Magias
                */
                let s_magias = '';
                if (magias.conjurador) {
                  s_magias = '\n>> Magias:';
                  if (magias.lista["1º Círculo"].length > 0) {
                    s_magias += `\n1º Círculo: ${magias.lista["1º Círculo"].join('; ')}`;
                  }
                  if (magias.lista["2º Círculo"].length > 0) {
                    s_magias += `\n2º Círculo: ${magias.lista["2º Círculo"].join('; ')}`;
                  }
                  if (magias.lista["3º Círculo"].length > 0) {
                    s_magias += `\n3º Círculo: ${magias.lista["3º Círculo"].join('; ')}`;
                  }
                  if (magias.lista["4º Círculo"].length > 0) {
                    s_magias += `\n4º Círculo: ${magias.lista["4º Círculo"].join('; ')}`;
                  }
                  if (magias.lista["5º Círculo"].length > 0) {
                    s_magias += `\n5º Círculo: ${magias.lista["5º Círculo"].join('; ')}`;
                  }
                }


                let exibicao_simples = document.getElementById('texto-formulario-npc-exibicao-simples').checked;

                let definir_profissao = document.getElementById('texto-formulario-npc-definir-profissao').checked;
                let texto_profissao = '';
                if (definir_profissao) {
                  if (exibicao_simples) {
                    texto_profissao = `${profissao}`;
                  } else {
                    texto_profissao = ` [${profissao}]`;
                  }
                }

                // Só para exibição
                if ((raca == 'Goblin') && ((classe == 'Mago') || (classe == 'Druida'))) {
                  classe = 'Shaman';
                }

                let text = document.querySelector('#ficha-npcs');

                if (exibicao_simples) {
                  text.value =
`${nome}
${raca}, ${genero}, ${tendencia}, ${comportamento}
${texto_profissao}
Idade: ${idade}, Altura: ${altura}m, Peso: ${peso}kg
${moedas_final}
`;
                } else {
                  text.value =
`${nome} [${raca}, ${genero}, ${tendencia}, ${comportamento}]${texto_profissao}
Idade: ${idade}, Altura: ${altura}m, Peso: ${peso}kg
${classe}, PV ${pv}, THAC0 ${thaco}, CA ${categoria_armadura}, Moral: ${moral}
${resistencia}
${s_armas}${s_armaduras}
Itens: ${itens.join('; ')}
Divindade: ${divindade}
${moedas_final}${s_magias}
`;
                }

                callback();
              });
            });
          });
        });
      });
    });
  });
}

//render_npc(1);
