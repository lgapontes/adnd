

function sortear_nome_grimorio(callback) {
  let base_nomes = clone_npc(NOMES_RACAS);
  let tipos_nomes = ["Masculino","Feminino","Sobrenome"];
  let racas_nomes = ["Humano","Anão","Elfo","Gnomo","Meio-Elfo","Halfling","Meio-Vistani","Goblin"];

  let array_nomes = [];

  racas_nomes.forEach((raca_nome, index_raca_nome) => {
    tipos_nomes.forEach((tipo_nome, index_tipo_nome) => {
      array_nomes = array_nomes.concat(base_nomes[raca_nome][tipo_nome]);

      if (index_tipo_nome == (tipos_nomes.length - 1)) {
        if (index_raca_nome == (racas_nomes.length - 1)) {
          let nome = array_nomes[Math.floor(Math.random() * array_nomes.length)];

          let generos = [ 'Masculino' , 'Feminino' ];
          let genero = generos[Math.floor(Math.random() * generos.length)];

          callback(nome,genero);
        }
      }
    });
  });
}

function sortear_magias_grimorio(nivel,classe,callback) {
  let nivel_magia = nivel - 1;

  let magias = {
    conjurador: false,
    lista: {
      '1º Círculo': ['Ler Magias','Detectar Magia'],
      '2º Círculo': [],
      '3º Círculo': [],
      '4º Círculo': [],
      '5º Círculo': [],
      '6º Círculo': [],
      '7º Círculo': [],
      '8º Círculo': [],
      '9º Círculo': [],
    }
  };

  if (CIRCULOS_MAGO_GRIMORIO[classe].magias[nivel_magia].possui) {
    magias.conjurador = true;
    let circulos = Object.keys(magias.lista);

    CIRCULOS_MAGO_GRIMORIO[classe].obter_lista((lista_magias)=>{

      circulos.forEach((circulo, index_circulo) => {
        let quantidade = CIRCULOS_MAGO_GRIMORIO[classe].magias[nivel_magia][circulo] + bonusQUantidadeGrimorio(nivel,circulo);

        if (quantidade > 0) {
          for (let contador=quantidade; contador>0; contador--) {

            if (contador == quantidade) {
              let magia_sorteada = lista_magias[circulo].importantes[Math.floor(Math.random() * lista_magias[circulo].importantes.length)];
              if (magias.lista[circulo].indexOf(magia_sorteada) == -1) {
                magias.lista[circulo].push(magia_sorteada);
              } else {
                contador++;
              }
            } else {
              let magia_sorteada = lista_magias[circulo].outras[Math.floor(Math.random() * lista_magias[circulo].outras.length)];
              if (magias.lista[circulo].indexOf(magia_sorteada) == -1) {
                magias.lista[circulo].push(magia_sorteada);
              } else {
                contador++;
              }
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

function preencher_protecoes(callback) {
  let keys_protecoes = Object.keys(PROTECAO_GRIMORIOS);
  let select_protecao = document.getElementById('texto-formulario-grimorio-protecao');
  select_protecao.innerHTML = '';

  let option = document.createElement('option');
  option.value = 'Todas';
  option.innerHTML = 'Todas';
  select_protecao.appendChild(option);

  keys_protecoes.forEach((protecao, index_protecao) => {
    let option = document.createElement('option');
    option.value = protecao;
    let texto = protecao;
    if (protecao != 'Nenhuma proteção') {
      texto = `${protecao} (Nível ${PROTECAO_GRIMORIOS[protecao]['Nível']})`;
    }
    option.innerHTML = texto;
    select_protecao.appendChild(option);

    if (index_protecao == (keys_protecoes.length - 1)) {
      callback();
    }
  });
}

function sortear_protecao_grimorio(callback) {
  let select = document.getElementById('texto-formulario-grimorio-protecao');
  let protecao = select.options[select.selectedIndex].value;
  let lista = [...select.options].map(entry => entry.value);
  lista.splice(0, 1);

  if (protecao == 'Todas') {
    protecao = lista[Math.floor(Math.random() * lista.length)];
  }

  callback(protecao);
}

function render_grimorio(nivel,callback) {
  sortear_nome_grimorio((nome,genero)=>{

    sortear_protecao_grimorio(protecao=>{

      sortear_magias_grimorio(nivel,"Mago",(magias)=>{
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
          if (magias.lista["6º Círculo"].length > 0) {
            s_magias += `\n6º Círculo: ${magias.lista["6º Círculo"].join('; ')}`;
          }
          if (magias.lista["7º Círculo"].length > 0) {
            s_magias += `\n7º Círculo: ${magias.lista["7º Círculo"].join('; ')}`;
          }
          if (magias.lista["8º Círculo"].length > 0) {
            s_magias += `\n8º Círculo: ${magias.lista["8º Círculo"].join('; ')}`;
          }
          if (magias.lista["9º Círculo"].length > 0) {
            s_magias += `\n9º Círculo: ${magias.lista["9º Círculo"].join('; ')}`;
          }
        }

        let s_protecao = '\n>> Proteção: ';

        if (protecao == 'Nenhuma proteção') {
          s_protecao += 'Nenhuma proteção';
        } else {
          s_protecao +=
`${protecao}
Nível da magia: ${PROTECAO_GRIMORIOS[protecao]['Nível']}
Escola: ${PROTECAO_GRIMORIOS[protecao]['Escola']}
Duração: ${PROTECAO_GRIMORIOS[protecao]['Duração']}
Área de Efeito: ${PROTECAO_GRIMORIOS[protecao]['Área de Efeito']}
Resistência: ${PROTECAO_GRIMORIOS[protecao]['Resistência']}\n
${PROTECAO_GRIMORIOS[protecao]['Efeito']}
`;
        }

        let text = document.querySelector('#ficha-grimorio');

        text.value =
`${nome} [${genero}], Nível: ${nivel}
${s_magias}
${s_protecao}
`;

        callback();
      });

    });

  });
}
