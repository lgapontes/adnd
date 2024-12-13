

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
      '1º Círculo': [],
      '2º Círculo': [],
      '3º Círculo': [],
      '4º Círculo': [],
      '5º Círculo': []
    }
  };

  if (CIRCULOS_POR_CLASSE_E_NIVEL["Mago"].magias[nivel_magia].possui) {
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

function copy_text_grimorio(item) {
  const str = item.value;
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select(); document.execCommand("copy");
  document.body.removeChild(el);
};

function render_grimorio(nivel,callback) {
  sortear_nome_grimorio((nome,genero)=>{

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
      }

      let text = document.querySelector('#ficha-grimorio');

      text.value =
`${nome} [${genero}], Nível: ${nivel}
${s_magias}
`;

      callback();
    });


  });
}
