/*
botao_PDF.addEventListener('click',()=>{
    window.print();
});
*/

/*
document.querySelector("div.classes > form").addEventListener("submit", evento => {
  evento.preventDefault();
  var radios = document.getElementsByName('forcar_classe');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      forcar_classe = radios[i].value;
      render();
      break;
    }
  }
});
*/

function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}

function formatar_pericia_comum(pericia) {
  /*
    { nome: "", "Nº Pontos Necessários": 0, "Habilidade Relevante": 'Força Destreza Constituição Inteligência Sabedoria Carisma', "Modificador do Teste": 0 },
    { nome: "Lutar no Escuro", pontos: 2, habilidade_relevante: '', modificador: 0 },
  */
  let habilidade = '';
  if (pericia.habilidade_relevante != '') {
    let modificador = pericia.modificador;
    if (pericia.modificador > 0) {
      modificador = "+" + modificador;
    }
    habilidade = ', Habilidade Relevante: ' + pericia.habilidade_relevante + ', Modificador do Teste: ' + modificador;
  }
  return pericia.nome + habilidade;
}

function rolar1d6(callback) {
  let resultado = Math.floor(Math.random() * 6) + 1;
  callback(resultado);
  return;
}

function rolar1d100(callback) {
  let resultado = Math.floor(Math.random() * 100) + 1;
  callback(resultado);
  return;
}

function rolar3d6(callback) {
  rolar1d6(dado1 => {
    rolar1d6(dado2 => {
      rolar1d6(dado3 => {
        let resultado = dado1 + dado2 + dado3;
        callback(resultado);
        return;
      })
    })
  })
}

function rolarAtributo(callback) {
  if (forcar_darksun) {
    let r1 = Math.floor(Math.random() * 4) + 1;
    let r2 = Math.floor(Math.random() * 4) + 1;
    let r3 = Math.floor(Math.random() * 4) + 1;
    let r4 = Math.floor(Math.random() * 4) + 1;
    callback(r1 + r2 + r3 + r4 + 4);
    return;
  } else {
    let r1 = Math.floor(Math.random() * 6) + 1;
    let r2 = Math.floor(Math.random() * 6) + 1;
    let r3 = Math.floor(Math.random() * 6) + 1;
    callback(r1 + r2 + r3);
    return;
  }
}

function calcular_PSP(personagem) {
  if (personagem["Classe"] == "Psionicista") {
    let sabedoria = personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"];
    let inteligencia = personagem["Habilidades"]["Inteligência"]["Valor da Habilidade"];
    let constituicao = personagem["Habilidades"]["Constituição"]["Valor da Habilidade"];

    if (sabedoria == 15) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = 20;
      personagem["Dados Básicos"]["PSPs por Nível Adicional"] = 10;
    } else if (sabedoria == 16) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = 22;
      personagem["Dados Básicos"]["PSPs por Nível Adicional"] = 11;
    } else if (sabedoria == 17) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = 24;
      personagem["Dados Básicos"]["PSPs por Nível Adicional"] = 12;
    } else if (sabedoria == 18) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = 26;
      personagem["Dados Básicos"]["PSPs por Nível Adicional"] = 13;
    } else if (sabedoria == 19) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = 28;
      personagem["Dados Básicos"]["PSPs por Nível Adicional"] = 14;
    } else if (sabedoria >= 20) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = 30;
      personagem["Dados Básicos"]["PSPs por Nível Adicional"] = 15;
    }

    if (constituicao == 16) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 1;
    } else if (constituicao == 17) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 2;
    } else if (constituicao == 18) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 3;
    } else if (constituicao == 19) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 4;
    } else if (constituicao >= 20) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 5;
    }

    if (inteligencia == 16) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 1;
    } else if (inteligencia == 17) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 2;
    } else if (inteligencia == 18) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 3;
    } else if (inteligencia == 19) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 4;
    } else if (inteligencia >= 20) {
      personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] = personagem["Dados Básicos"]["Pontos de Força Psiônica (PSPs)"] + 5;
    }
  }
}

function poderes_psionicos(personagem,callback) {
  if (personagem["Classe"] == "Psionicista") {
    let disciplinas = [
      'Clariscientes',
      'Psicocinéticos',
      'Psicometabólicos',
      'Psicoportivos',
      'Telepáticos'
    ];
    personagem["Dados Básicos"]["Disciplinas Psiônicas"] = disciplinas[Math.floor(Math.random() * disciplinas.length)];

    let ciencias = 1;
    let devocoes = 3;

    let array_ciencias = DISCIPLINAS_PSIONICAS[personagem["Dados Básicos"]["Disciplinas Psiônicas"]]["Ciências"].slice();
    let array_devocoes = DISCIPLINAS_PSIONICAS[personagem["Dados Básicos"]["Disciplinas Psiônicas"]]["Devoções"].slice();

    personagem["Dados Básicos"]["Modos de Ataque"] = 'Nenhum';
    if (personagem["Dados Básicos"]["Disciplinas Psiônicas"] == 'Telepáticos') {

      // Só possui uma ciência disponível
      personagem["Poderes Psiônicos"]["Ciências"].push('Mindlink');
      ciencias = ciencias - 1;

      if (Math.floor(Math.random() * 2) == 0) {
        let modos_ataque = ['Impulso Mental', 'Chicote do Ego', 'Insinuação do Id', 'Esmagamento Psíquico'];
        personagem["Dados Básicos"]["Modos de Ataque"] = modos_ataque[Math.floor(Math.random() * modos_ataque.length)];
        devocoes = devocoes - 1;
      }
    }

    let defesas = ['Mente em Branco','Escudo de Pensamento','Barreira Mental','Torre de Vontade de Ferro','Fortaleza do Intelecto'];
    personagem["Dados Básicos"]["Modos de Defesa"] = defesas[Math.floor(Math.random() * defesas.length)];

    while ( (ciencias + devocoes) > 0 ) {

      if (ciencias > 0) {
        ciencias = ciencias - 1;

        if (array_ciencias.length > 0) {
          if (array_ciencias.length == 1) {
            personagem["Poderes Psiônicos"]["Ciências"].push(array_ciencias[0]);
            array_ciencias.splice(0, 1);
          } else {
            let index_array_ciencias = Math.floor(Math.random() * array_ciencias.length);
            personagem["Poderes Psiônicos"]["Ciências"].push(array_ciencias[index_array_ciencias]);
            array_ciencias.splice(index_array_ciencias, 1);
          }
        } else {
          ciencias = 0;
        }

      } else if (devocoes > 0) {
        devocoes = devocoes - 1;

        if (array_devocoes.length == 0) {
          error('Erro ao definir as devoções do psionicista!');
          devocoes = 0;
        } else if (array_devocoes.length == 1) {
          personagem["Poderes Psiônicos"]["Devoções"].push(array_devocoes[0]);
          array_devocoes.splice(0, 1);
        } else {
          let index_array_devocoes = Math.floor(Math.random() * array_devocoes.length);
          personagem["Poderes Psiônicos"]["Devoções"].push(array_devocoes[index_array_devocoes]);
          array_devocoes.splice(index_array_devocoes, 1);
        }
      }

      if ( (ciencias == 0) && (devocoes == 0) ) {
        callback();
        return;
      }
    }
  } else {
    callback();
    return;
  }
}

function valores_medo(personagem) {
  if (personagem["Dados Básicos"]["Grupo"] == "Homem de Armas") {
    personagem["Medo, Horror e Loucura"]["Teste de Medo"] = 12;
    personagem["Medo, Horror e Loucura"]["Teste de Horror"] = 18;
    personagem["Medo, Horror e Loucura"]["Teste de Loucura"] = 19;
  } else if (personagem["Dados Básicos"]["Grupo"] == "Arcano") {
    personagem["Medo, Horror e Loucura"]["Teste de Medo"] = 16;
    personagem["Medo, Horror e Loucura"]["Teste de Horror"] = 14;
    personagem["Medo, Horror e Loucura"]["Teste de Loucura"] = 18;
  } else if (personagem["Dados Básicos"]["Grupo"] == "Sacerdote") {
    personagem["Medo, Horror e Loucura"]["Teste de Medo"] = 13;
    personagem["Medo, Horror e Loucura"]["Teste de Horror"] = 15;
    personagem["Medo, Horror e Loucura"]["Teste de Loucura"] = 18;
  } else if (personagem["Dados Básicos"]["Grupo"] == "Ladino") {
    personagem["Medo, Horror e Loucura"]["Teste de Medo"] = 15;
    personagem["Medo, Horror e Loucura"]["Teste de Horror"] = 15;
    personagem["Medo, Horror e Loucura"]["Teste de Loucura"] = 18;
  } else if (personagem["Dados Básicos"]["Grupo"] == "Psionicista") {
    personagem["Medo, Horror e Loucura"]["Teste de Medo"] = 15;
    personagem["Medo, Horror e Loucura"]["Teste de Horror"] = 17;
    personagem["Medo, Horror e Loucura"]["Teste de Loucura"] = 16;
  }
}

function atributos_forca(atributo, forca, forca_extraordinaria) {
  if ( forca == 1 ) {
    if (atributo == "Chance de Acertar") {
      return -5;
    } else if (atributo == "Ajuste de Dano") {
      return -4;
    } else if (atributo == "Carga Permitida") {
      return (0.5).toFixed(2);
    } else if (atributo == "Sustentação") {
      return (1.5).toFixed(2);
    } else if (atributo == "Abrir Portas") {
      return 1;
    } else if (atributo == "Barras/Portais") {
      return "0%";
    }
  } else if ( forca == 2 ) {
    if (atributo == "Chance de Acertar") {
      return -3;
    } else if (atributo == "Ajuste de Dano") {
      return -2;
    } else if (atributo == "Carga Permitida") {
      return (0.5).toFixed(2);
    } else if (atributo == "Sustentação") {
      return (2.5).toFixed(2);
    } else if (atributo == "Abrir Portas") {
      return 1;
    } else if (atributo == "Barras/Portais") {
      return "0%";
    }
  } else if ( forca == 3 ) {
    if (atributo == "Chance de Acertar") {
      return -3;
    } else if (atributo == "Ajuste de Dano") {
      return -1;
    } else if (atributo == "Carga Permitida") {
      return (2.5).toFixed(2);
    } else if (atributo == "Sustentação") {
      return 5;
    } else if (atributo == "Abrir Portas") {
      return 2;
    } else if (atributo == "Barras/Portais") {
      return "0%";
    }
  } else if ( (forca >= 4) && (forca <= 5) ) {
    if (atributo == "Chance de Acertar") {
      return -2;
    } else if (atributo == "Ajuste de Dano") {
      return -1;
    } else if (atributo == "Carga Permitida") {
      return 5;
    } else if (atributo == "Sustentação") {
      return 13;
    } else if (atributo == "Abrir Portas") {
      return 3;
    } else if (atributo == "Barras/Portais") {
      return "0%";
    }
  } else if ( (forca >= 6) && (forca <= 7) ) {
    if (atributo == "Chance de Acertar") {
      return -1;
    } else if (atributo == "Ajuste de Dano") {
      return 0;
    } else if (atributo == "Carga Permitida") {
      return 10;
    } else if (atributo == "Sustentação") {
      return 28;
    } else if (atributo == "Abrir Portas") {
      return 4;
    } else if (atributo == "Barras/Portais") {
      return "0%";
    }
  } else if ( (forca >= 8) && (forca <= 9) ) {
    if (atributo == "Chance de Acertar") {
      return 0;
    } else if (atributo == "Ajuste de Dano") {
      return 0;
    } else if (atributo == "Carga Permitida") {
      return 18;
    } else if (atributo == "Sustentação") {
      return 45;
    } else if (atributo == "Abrir Portas") {
      return 5;
    } else if (atributo == "Barras/Portais") {
      return "1%";
    }
  } else if ( (forca >= 10) && (forca <= 11) ) {
    if (atributo == "Chance de Acertar") {
      return 0;
    } else if (atributo == "Ajuste de Dano") {
      return 0;
    } else if (atributo == "Carga Permitida") {
      return 20;
    } else if (atributo == "Sustentação") {
      return 58;
    } else if (atributo == "Abrir Portas") {
      return 6;
    } else if (atributo == "Barras/Portais") {
      return "2%";
    }
  } else if ( (forca >= 12) && (forca <= 13) ) {
    if (atributo == "Chance de Acertar") {
      return 0;
    } else if (atributo == "Ajuste de Dano") {
      return 0;
    } else if (atributo == "Carga Permitida") {
      return 23;
    } else if (atributo == "Sustentação") {
      return 70;
    } else if (atributo == "Abrir Portas") {
      return 7;
    } else if (atributo == "Barras/Portais") {
      return "4%";
    }
  } else if ( (forca >= 14) && (forca <= 15) ) {
    if (atributo == "Chance de Acertar") {
      return 0;
    } else if (atributo == "Ajuste de Dano") {
      return 0;
    } else if (atributo == "Carga Permitida") {
      return 28;
    } else if (atributo == "Sustentação") {
      return 85;
    } else if (atributo == "Abrir Portas") {
      return 8;
    } else if (atributo == "Barras/Portais") {
      return "7%";
    }
  } else if ( forca == 16 ) {
    if (atributo == "Chance de Acertar") {
      return 0;
    } else if (atributo == "Ajuste de Dano") {
      return 1;
    } else if (atributo == "Carga Permitida") {
      return 35;
    } else if (atributo == "Sustentação") {
      return 98;
    } else if (atributo == "Abrir Portas") {
      return 9;
    } else if (atributo == "Barras/Portais") {
      return "10%";
    }
  } else if ( forca == 17 ) {
    if (atributo == "Chance de Acertar") {
      return 1;
    } else if (atributo == "Ajuste de Dano") {
      return 1;
    } else if (atributo == "Carga Permitida") {
      return 43;
    } else if (atributo == "Sustentação") {
      return 110;
    } else if (atributo == "Abrir Portas") {
      return 10;
    } else if (atributo == "Barras/Portais") {
      return "13%";
    }
  } else if ( (forca == 18) && (forca_extraordinaria == 0) ) {
    if (atributo == "Chance de Acertar") {
      return 1;
    } else if (atributo == "Ajuste de Dano") {
      return 2;
    } else if (atributo == "Carga Permitida") {
      return 55;
    } else if (atributo == "Sustentação") {
      return 128;
    } else if (atributo == "Abrir Portas") {
      return 11;
    } else if (atributo == "Barras/Portais") {
      return "16%";
    }
  } else if ( (forca == 18) && (forca_extraordinaria >= 1) && (forca_extraordinaria <= 50) ) {
    if (atributo == "Chance de Acertar") {
      return 1;
    } else if (atributo == "Ajuste de Dano") {
      return 3;
    } else if (atributo == "Carga Permitida") {
      return 68;
    } else if (atributo == "Sustentação") {
      return 140;
    } else if (atributo == "Abrir Portas") {
      return 12;
    } else if (atributo == "Barras/Portais") {
      return "20%";
    }
  } else if ( (forca == 18) && (forca_extraordinaria >= 51) && (forca_extraordinaria <= 75) ) {
    if (atributo == "Chance de Acertar") {
      return 2;
    } else if (atributo == "Ajuste de Dano") {
      return 3;
    } else if (atributo == "Carga Permitida") {
      return 80;
    } else if (atributo == "Sustentação") {
      return 153;
    } else if (atributo == "Abrir Portas") {
      return 13;
    } else if (atributo == "Barras/Portais") {
      return "25%";
    }
  } else if ( (forca == 18) && (forca_extraordinaria >= 76) && (forca_extraordinaria <= 90) ) {
    if (atributo == "Chance de Acertar") {
      return 2;
    } else if (atributo == "Ajuste de Dano") {
      return 4;
    } else if (atributo == "Carga Permitida") {
      return 93;
    } else if (atributo == "Sustentação") {
      return 165;
    } else if (atributo == "Abrir Portas") {
      return 14;
    } else if (atributo == "Barras/Portais") {
      return "30%";
    }
  } else if ( (forca == 18) && (forca_extraordinaria >= 91) && (forca_extraordinaria <= 99) ) {
    if (atributo == "Chance de Acertar") {
      return 2;
    } else if (atributo == "Ajuste de Dano") {
      return 5;
    } else if (atributo == "Carga Permitida") {
      return 118;
    } else if (atributo == "Sustentação") {
      return 190;
    } else if (atributo == "Abrir Portas") {
      return "15(3)";
    } else if (atributo == "Barras/Portais") {
      return "35%";
    }
  } else if ( (forca == 18) && (forca_extraordinaria == 100) ) {
    if (atributo == "Chance de Acertar") {
      return 3;
    } else if (atributo == "Ajuste de Dano") {
      return 6;
    } else if (atributo == "Carga Permitida") {
      return 168;
    } else if (atributo == "Sustentação") {
      return 240;
    } else if (atributo == "Abrir Portas") {
      return "16(6)";
    } else if (atributo == "Barras/Portais") {
      return "40%";
    }
  } else if ( forca == 19 ) {
    if (atributo == "Chance de Acertar") {
      return 3;
    } else if (atributo == "Ajuste de Dano") {
      return 7;
    } else if (atributo == "Carga Permitida") {
      return 243;
    } else if (atributo == "Sustentação") {
      return 320;
    } else if (atributo == "Abrir Portas") {
      return "16(8)";
    } else if (atributo == "Barras/Portais") {
      return "50%";
    }
  } else if ( forca == 20 ) {
    if (atributo == "Chance de Acertar") {
      return 3;
    } else if (atributo == "Ajuste de Dano") {
      return 8;
    } else if (atributo == "Carga Permitida") {
      return 268;
    } else if (atributo == "Sustentação") {
      return 350;
    } else if (atributo == "Abrir Portas") {
      return "17(10)";
    } else if (atributo == "Barras/Portais") {
      return "60%";
    }
  } else if ( forca == 21 ) {
    if (atributo == "Chance de Acertar") {
      return 4;
    } else if (atributo == "Ajuste de Dano") {
      return 9;
    } else if (atributo == "Carga Permitida") {
      return 318;
    } else if (atributo == "Sustentação") {
      return 405;
    } else if (atributo == "Abrir Portas") {
      return "17(12)";
    } else if (atributo == "Barras/Portais") {
      return "70%";
    }
  } else if ( forca == 22 ) {
    if (atributo == "Chance de Acertar") {
      return 4;
    } else if (atributo == "Ajuste de Dano") {
      return 10;
    } else if (atributo == "Carga Permitida") {
      return 393;
    } else if (atributo == "Sustentação") {
      return 485;
    } else if (atributo == "Abrir Portas") {
      return "18(14)";
    } else if (atributo == "Barras/Portais") {
      return "80%";
    }
  } else if ( forca == 23 ) {
    if (atributo == "Chance de Acertar") {
      return 5;
    } else if (atributo == "Ajuste de Dano") {
      return 11;
    } else if (atributo == "Carga Permitida") {
      return 468;
    } else if (atributo == "Sustentação") {
      return 565;
    } else if (atributo == "Abrir Portas") {
      return "18(16)";
    } else if (atributo == "Barras/Portais") {
      return "90%";
    }
  } else if ( forca == 24 ) {
    if (atributo == "Chance de Acertar") {
      return 6;
    } else if (atributo == "Ajuste de Dano") {
      return 12;
    } else if (atributo == "Carga Permitida") {
      return 618;
    } else if (atributo == "Sustentação") {
      return 720;
    } else if (atributo == "Abrir Portas") {
      return "19(17)";
    } else if (atributo == "Barras/Portais") {
      return "95%";
    }
  } else if ( forca == 25 ) {
    if (atributo == "Chance de Acertar") {
      return 7;
    } else if (atributo == "Ajuste de Dano") {
      return 14;
    } else if (atributo == "Carga Permitida") {
      return 768;
    } else if (atributo == "Sustentação") {
      return 875;
    } else if (atributo == "Abrir Portas") {
      return "19(18)";
    } else if (atributo == "Barras/Portais") {
      return "99%";
    }
  }
}

function atributos_destreza(atributo, destreza) {
  if ( destreza == 1 ) {
    if (atributo == "Ajuste de Reação") {
      return -6;
    } else if (atributo == "Ataque à Distância") {
      return -6;
    } else if (atributo == "Ajuste Defensivo") {
      return 5;
    }
  } else if ( destreza == 2 ) {
    if (atributo == "Ajuste de Reação") {
      return -4;
    } else if (atributo == "Ataque à Distância") {
      return -4;
    } else if (atributo == "Ajuste Defensivo") {
      return 5;
    }
  } else if ( destreza == 3 ) {
    if (atributo == "Ajuste de Reação") {
      return -3;
    } else if (atributo == "Ataque à Distância") {
      return -3;
    } else if (atributo == "Ajuste Defensivo") {
      return 4;
    }
  } else if ( destreza == 4 ) {
    if (atributo == "Ajuste de Reação") {
      return -2;
    } else if (atributo == "Ataque à Distância") {
      return -2;
    } else if (atributo == "Ajuste Defensivo") {
      return 3;
    }
  } else if ( destreza == 5 ) {
    if (atributo == "Ajuste de Reação") {
      return -1;
    } else if (atributo == "Ataque à Distância") {
      return -1;
    } else if (atributo == "Ajuste Defensivo") {
      return 2;
    }
  } else if ( destreza == 6 ) {
    if (atributo == "Ajuste de Reação") {
      return 0;
    } else if (atributo == "Ataque à Distância") {
      return 0;
    } else if (atributo == "Ajuste Defensivo") {
      return 1;
    }
  } else if ( (destreza >= 7) && (destreza <= 14) ) {
    if (atributo == "Ajuste de Reação") {
      return 0;
    } else if (atributo == "Ataque à Distância") {
      return 0;
    } else if (atributo == "Ajuste Defensivo") {
      return 0;
    }
  } else if ( destreza == 15 ) {
    if (atributo == "Ajuste de Reação") {
      return 0;
    } else if (atributo == "Ataque à Distância") {
      return 0;
    } else if (atributo == "Ajuste Defensivo") {
      return -1;
    }
  } else if ( destreza == 16 ) {
    if (atributo == "Ajuste de Reação") {
      return 1;
    } else if (atributo == "Ataque à Distância") {
      return 1;
    } else if (atributo == "Ajuste Defensivo") {
      return -2;
    }
  } else if ( destreza == 17 ) {
    if (atributo == "Ajuste de Reação") {
      return 2;
    } else if (atributo == "Ataque à Distância") {
      return 2;
    } else if (atributo == "Ajuste Defensivo") {
      return -3;
    }
  } else if ( destreza == 18 ) {
    if (atributo == "Ajuste de Reação") {
      return 2;
    } else if (atributo == "Ataque à Distância") {
      return 2;
    } else if (atributo == "Ajuste Defensivo") {
      return -4;
    }
  } else if ( destreza == 19 ) {
    if (atributo == "Ajuste de Reação") {
      return 3;
    } else if (atributo == "Ataque à Distância") {
      return 3;
    } else if (atributo == "Ajuste Defensivo") {
      return -4;
    }
  } else if ( destreza == 20 ) {
    if (atributo == "Ajuste de Reação") {
      return 3;
    } else if (atributo == "Ataque à Distância") {
      return 3;
    } else if (atributo == "Ajuste Defensivo") {
      return -4;
    }
  } else if ( destreza == 21 ) {
    if (atributo == "Ajuste de Reação") {
      return 4;
    } else if (atributo == "Ataque à Distância") {
      return 4;
    } else if (atributo == "Ajuste Defensivo") {
      return -5;
    }
  } else if ( destreza == 22 ) {
    if (atributo == "Ajuste de Reação") {
      return 4;
    } else if (atributo == "Ataque à Distância") {
      return 4;
    } else if (atributo == "Ajuste Defensivo") {
      return -5;
    }
  } else if ( destreza == 23 ) {
    if (atributo == "Ajuste de Reação") {
      return 4;
    } else if (atributo == "Ataque à Distância") {
      return 4;
    } else if (atributo == "Ajuste Defensivo") {
      return -5;
    }
  } else if ( destreza == 24 ) {
    if (atributo == "Ajuste de Reação") {
      return 5;
    } else if (atributo == "Ataque à Distância") {
      return 5;
    } else if (atributo == "Ajuste Defensivo") {
      return -6;
    }
  } else if ( destreza == 25 ) {
    if (atributo == "Ajuste de Reação") {
      return 5;
    } else if (atributo == "Ataque à Distância") {
      return 5;
    } else if (atributo == "Ajuste Defensivo") {
      return -6;
    }
  }
}

function atributos_constituicao(atributo, constituicao, classe) {
  if (constituicao == 1) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return -3;
    } else if (atributo == "Colapso") {
      return "25%";
    } else if (atributo == "Chance de Ressurreição") {
      return "30%";
    } else if (atributo == "Resistência contra Veneno") {
      return -2;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 2) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return -2;
    } else if (atributo == "Colapso") {
      return "30%";
    } else if (atributo == "Chance de Ressurreição") {
      return "35%";
    } else if (atributo == "Resistência contra Veneno") {
      return -1;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 3) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return -2;
    } else if (atributo == "Colapso") {
      return "35%";
    } else if (atributo == "Chance de Ressurreição") {
      return "40%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 4) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return -1;
    } else if (atributo == "Colapso") {
      return "40%";
    } else if (atributo == "Chance de Ressurreição") {
      return "45%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 5) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return -1;
    } else if (atributo == "Colapso") {
      return "45%";
    } else if (atributo == "Chance de Ressurreição") {
      return "50%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 6) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return -1;
    } else if (atributo == "Colapso") {
      return "50%";
    } else if (atributo == "Chance de Ressurreição") {
      return "55%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 7) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "55%";
    } else if (atributo == "Chance de Ressurreição") {
      return "60%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 8) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "60%";
    } else if (atributo == "Chance de Ressurreição") {
      return "65%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 9) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "65%";
    } else if (atributo == "Chance de Ressurreição") {
      return "70%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 10) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "70%";
    } else if (atributo == "Chance de Ressurreição") {
      return "75%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 11) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "75%";
    } else if (atributo == "Chance de Ressurreição") {
      return "80%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 12) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "80%";
    } else if (atributo == "Chance de Ressurreição") {
      return "85%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 13) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "85%";
    } else if (atributo == "Chance de Ressurreição") {
      return "90%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 14) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 0;
    } else if (atributo == "Colapso") {
      return "88%";
    } else if (atributo == "Chance de Ressurreição") {
      return "92%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 15) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 1;
    } else if (atributo == "Colapso") {
      return "90%";
    } else if (atributo == "Chance de Ressurreição") {
      return "94%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 16) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      return 2;
    } else if (atributo == "Colapso") {
      return "95%";
    } else if (atributo == "Chance de Ressurreição") {
      return "96%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 17) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 3;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "97%";
    } else if (atributo == "Chance de Ressurreição") {
      return "98%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 18) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 4;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 0;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 19) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 5;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 1;
    } else if (atributo == "Regeneração") {
      return "Não há";
    }
  } else if (constituicao == 20) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 5;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 1;
    } else if (atributo == "Regeneração") {
      return "1/6 turnos";
    }
  } else if (constituicao == 21) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 6;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 2;
    } else if (atributo == "Regeneração") {
      return "1/5 turnos";
    }
  } else if (constituicao == 22) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 6;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 2;
    } else if (atributo == "Regeneração") {
      return "1/4 turnos";
    }
  } else if (constituicao == 23) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 6;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 3;
    } else if (atributo == "Regeneração") {
      return "1/3 turnos";
    }
  } else if (constituicao == 24) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 7;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "99%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 3;
    } else if (atributo == "Regeneração") {
      return "1/2 turnos";
    }
  } else if (constituicao == 25) {
    if (atributo == "Ajuste dos Pontos de Vida") {
      if ( (classe == "Guerreiro") || (classe == "Paladino") || (classe == "Ranger") ) {
        return 7;
      } else {
        return 2;
      }
    } else if (atributo == "Colapso") {
      return "100%";
    } else if (atributo == "Chance de Ressurreição") {
      return "100%";
    } else if (atributo == "Resistência contra Veneno") {
      return 4;
    } else if (atributo == "Regeneração") {
      return "1/1 turnos";
    }
  }
}

function atributos_inteligencia(atributo, inteligencia) {

  if (inteligencia == 1) {
    if (atributo == "Número de Línguas") {
      return 0;
    } else if (atributo == "Círculo de Magia") {
      return 'Nenhum';
    } else if (atributo == "Chance de Aprender Magia") {
      return "Nenhuma";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Nenhuma";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( (inteligencia >= 2) && (inteligencia <= 8) ) {
    if (atributo == "Número de Línguas") {
      return 1;
    } else if (atributo == "Círculo de Magia") {
      return 'Nenhum';
    } else if (atributo == "Chance de Aprender Magia") {
      return "Nenhuma";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Nenhuma";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 9 ) {
    if (atributo == "Número de Línguas") {
      return 2;
    } else if (atributo == "Círculo de Magia") {
      return '4º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "35%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "6";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 10 ) {
    if (atributo == "Número de Línguas") {
      return 2;
    } else if (atributo == "Círculo de Magia") {
      return '5º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "40%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "7";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 11 ) {
    if (atributo == "Número de Línguas") {
      return 2;
    } else if (atributo == "Círculo de Magia") {
      return '5º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "45%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "7";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 12 ) {
    if (atributo == "Número de Línguas") {
      return 3;
    } else if (atributo == "Círculo de Magia") {
      return '6º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "50%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "7";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 13 ) {
    if (atributo == "Número de Línguas") {
      return 3;
    } else if (atributo == "Círculo de Magia") {
      return '6º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "55%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "9";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 14 ) {
    if (atributo == "Número de Línguas") {
      return 4;
    } else if (atributo == "Círculo de Magia") {
      return '7º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "60%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "9";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 15 ) {
    if (atributo == "Número de Línguas") {
      return 4;
    } else if (atributo == "Círculo de Magia") {
      return '7º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "65%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "11";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 16 ) {
    if (atributo == "Número de Línguas") {
      return 5;
    } else if (atributo == "Círculo de Magia") {
      return '8º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "70%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "11";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 17 ) {
    if (atributo == "Número de Línguas") {
      return 6;
    } else if (atributo == "Círculo de Magia") {
      return '8º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "75%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "14";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 18 ) {
    if (atributo == "Número de Línguas") {
      return 7;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "85%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "18";
    } else if (atributo == "Imunidade a Magias") {
      return "Nenhuma";
    }
  } else if ( inteligencia == 19 ) {
    if (atributo == "Número de Línguas") {
      return 8;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "95%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 1º Círculo";
    }
  } else if ( inteligencia == 20 ) {
    if (atributo == "Número de Línguas") {
      return 9;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "96%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 2º Círculo";
    }
  } else if ( inteligencia == 21 ) {
    if (atributo == "Número de Línguas") {
      return 10;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "97%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 3º Círculo";
    }
  } else if ( inteligencia == 22 ) {
    if (atributo == "Número de Línguas") {
      return 11;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "98%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 4º Círculo";
    }
  } else if ( inteligencia == 23 ) {
    if (atributo == "Número de Línguas") {
      return 12;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "99%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 5º Círculo";
    }
  } else if ( inteligencia == 24 ) {
    if (atributo == "Número de Línguas") {
      return 15;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "100%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 6º Círculo";
    }
  } else if ( inteligencia == 25 ) {
    if (atributo == "Número de Línguas") {
      return 20;
    } else if (atributo == "Círculo de Magia") {
      return '9º';
    } else if (atributo == "Chance de Aprender Magia") {
      return "100%";
    } else if (atributo == "Número Máx Magias/Círculo") {
      return "Todas";
    } else if (atributo == "Imunidade a Magias") {
      return "Ilusões do 7º Círculo";
    }
  }
}

function atributos_sabedoria(atributo, sabedoria) {
  if (sabedoria == 1) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -6;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "80%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 2) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -4;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "60%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 3) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -3;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "50%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 4) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -2;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "45%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 5) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -1;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "40%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 6) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -1;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "35%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 7) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return -1;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "30%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 8) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "25%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 9) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "20%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 10) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "15%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 11) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "10%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 12) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "Nenhuma";
    } else if (atributo == "Chance da Magia Falhar") {
      return "5%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 13) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "1º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 14) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 0;
    } else if (atributo == "Magias Extras") {
      return "1º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 15) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 1;
    } else if (atributo == "Magias Extras") {
      return "2º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 16) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 2;
    } else if (atributo == "Magias Extras") {
      return "2º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 17) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 3;
    } else if (atributo == "Magias Extras") {
      return "3º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 18) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "4º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Nenhuma";
    }
  } else if (sabedoria == 19) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "1º, 4º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose";
    }
  } else if (sabedoria == 20) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "2º, 4º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose, Esquecer, Paralisar Pessoa, Raio de Esquecimanto, Assustar";
    }
  } else if (sabedoria == 21) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "3º, 5º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose, Esquecer, Paralisar Pessoa, Raio de Esquecimanto, Assustar, Medo";
    }
  } else if (sabedoria == 22) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "4º, 5º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose, Esquecer, Paralisar Pessoa, Raio de Esquecimanto, Assustar, Medo, Encantar Monstro, Confusão, Emoção, Falha, Sugestão";
    }
  } else if (sabedoria == 23) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "5º, 5º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose, Esquecer, Paralisar Pessoa, Raio de Esquecimanto, Assustar, Medo, Encantar Monstro, Confusão, Emoção, Falha, Sugestão, Caos, Debilitar Mente, Paralisar Monstro, Jarro Arcano, Busca";
    }
  } else if (sabedoria == 24) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "6º, 6º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose, Esquecer, Paralisar Pessoa, Raio de Esquecimanto, Assustar, Medo, Encantar Monstro, Confusão, Emoção, Falha, Sugestão, Caos, Debilitar Mente, Paralisar Monstro, Jarro Arcano, Busca, Tarefa, Sugestão em Massa, Cetro do Poder";
    }
  } else if (sabedoria == 25) {
    if (atributo == "Ajuste de Defesa Contra Magia") {
      return 4;
    } else if (atributo == "Magias Extras") {
      return "6º, 7º";
    } else if (atributo == "Chance da Magia Falhar") {
      return "0%";
    } else if (atributo == "Imunidade à Magia") {
      return "Causar Medo, Encantar Pessoa, Comanda, Amigos, Hipnose, Esquecer, Paralisar Pessoa, Raio de Esquecimanto, Assustar, Medo, Encantar Monstro, Confusão, Emoção, Falha, Sugestão, Caos, Debilitar Mente, Paralisar Monstro, Jarro Arcano, Busca, Tarefa, Sugestão em Massa, Cetro do Poder, Antipatia/Simpatia, Morte, Encantar as Massas";
    }
  }
}

function atributos_carisma(atributo, carisma) {
  if (carisma == 1) {
    if (atributo == "Nº Máximo de aliados") {
      return 0;
    } else if (atributo == "Fator de Lealdade") {
      return -8;
    } else if (atributo == "Ajuste de reação") {
      return -7;
    }
  } else if (carisma == 2) {
    if (atributo == "Nº Máximo de aliados") {
      return 1;
    } else if (atributo == "Fator de Lealdade") {
      return -7;
    } else if (atributo == "Ajuste de reação") {
      return -6;
    }
  } else if (carisma == 3) {
    if (atributo == "Nº Máximo de aliados") {
      return 1;
    } else if (atributo == "Fator de Lealdade") {
      return -6;
    } else if (atributo == "Ajuste de reação") {
      return -5;
    }
  } else if (carisma == 4) {
    if (atributo == "Nº Máximo de aliados") {
      return 1;
    } else if (atributo == "Fator de Lealdade") {
      return -5;
    } else if (atributo == "Ajuste de reação") {
      return -4;
    }
  } else if (carisma == 5) {
    if (atributo == "Nº Máximo de aliados") {
      return 2;
    } else if (atributo == "Fator de Lealdade") {
      return -4;
    } else if (atributo == "Ajuste de reação") {
      return -3;
    }
  } else if (carisma == 6) {
    if (atributo == "Nº Máximo de aliados") {
      return 2;
    } else if (atributo == "Fator de Lealdade") {
      return -3;
    } else if (atributo == "Ajuste de reação") {
      return -2;
    }
  } else if (carisma == 7) {
    if (atributo == "Nº Máximo de aliados") {
      return 3;
    } else if (atributo == "Fator de Lealdade") {
      return -2;
    } else if (atributo == "Ajuste de reação") {
      return -1;
    }
  } else if (carisma == 8) {
    if (atributo == "Nº Máximo de aliados") {
      return 3;
    } else if (atributo == "Fator de Lealdade") {
      return -1;
    } else if (atributo == "Ajuste de reação") {
      return 0;
    }
  } else if (carisma == 9) {
    if (atributo == "Nº Máximo de aliados") {
      return 4;
    } else if (atributo == "Fator de Lealdade") {
      return 0;
    } else if (atributo == "Ajuste de reação") {
      return 0;
    }
  } else if (carisma == 10) {
    if (atributo == "Nº Máximo de aliados") {
      return 4;
    } else if (atributo == "Fator de Lealdade") {
      return 0;
    } else if (atributo == "Ajuste de reação") {
      return 0;
    }
  } else if (carisma == 11) {
    if (atributo == "Nº Máximo de aliados") {
      return 4;
    } else if (atributo == "Fator de Lealdade") {
      return 0;
    } else if (atributo == "Ajuste de reação") {
      return 0;
    }
  } else if (carisma == 12) {
    if (atributo == "Nº Máximo de aliados") {
      return 5;
    } else if (atributo == "Fator de Lealdade") {
      return 0;
    } else if (atributo == "Ajuste de reação") {
      return 0;
    }
  } else if (carisma == 13) {
    if (atributo == "Nº Máximo de aliados") {
      return 5;
    } else if (atributo == "Fator de Lealdade") {
      return 0;
    } else if (atributo == "Ajuste de reação") {
      return 1;
    }
  } else if (carisma == 14) {
    if (atributo == "Nº Máximo de aliados") {
      return 6;
    } else if (atributo == "Fator de Lealdade") {
      return 1;
    } else if (atributo == "Ajuste de reação") {
      return 2;
    }
  } else if (carisma == 15) {
    if (atributo == "Nº Máximo de aliados") {
      return 7;
    } else if (atributo == "Fator de Lealdade") {
      return 3;
    } else if (atributo == "Ajuste de reação") {
      return 3;
    }
  } else if (carisma == 16) {
    if (atributo == "Nº Máximo de aliados") {
      return 8;
    } else if (atributo == "Fator de Lealdade") {
      return 4;
    } else if (atributo == "Ajuste de reação") {
      return 5;
    }
  } else if (carisma == 17) {
    if (atributo == "Nº Máximo de aliados") {
      return 10;
    } else if (atributo == "Fator de Lealdade") {
      return 6;
    } else if (atributo == "Ajuste de reação") {
      return 6;
    }
  } else if (carisma == 18) {
    if (atributo == "Nº Máximo de aliados") {
      return 15;
    } else if (atributo == "Fator de Lealdade") {
      return 8;
    } else if (atributo == "Ajuste de reação") {
      return 7;
    }
  } else if (carisma == 19) {
    if (atributo == "Nº Máximo de aliados") {
      return 20;
    } else if (atributo == "Fator de Lealdade") {
      return 10;
    } else if (atributo == "Ajuste de reação") {
      return 8;
    }
  } else if (carisma == 20) {
    if (atributo == "Nº Máximo de aliados") {
      return 25;
    } else if (atributo == "Fator de Lealdade") {
      return 12;
    } else if (atributo == "Ajuste de reação") {
      return 9;
    }
  } else if (carisma == 21) {
    if (atributo == "Nº Máximo de aliados") {
      return 30;
    } else if (atributo == "Fator de Lealdade") {
      return 14;
    } else if (atributo == "Ajuste de reação") {
      return 10;
    }
  } else if (carisma == 22) {
    if (atributo == "Nº Máximo de aliados") {
      return 35;
    } else if (atributo == "Fator de Lealdade") {
      return 16;
    } else if (atributo == "Ajuste de reação") {
      return 11;
    }
  } else if (carisma == 23) {
    if (atributo == "Nº Máximo de aliados") {
      return 40;
    } else if (atributo == "Fator de Lealdade") {
      return 18;
    } else if (atributo == "Ajuste de reação") {
      return 12;
    }
  } else if (carisma == 24) {
    if (atributo == "Nº Máximo de aliados") {
      return 45;
    } else if (atributo == "Fator de Lealdade") {
      return 20;
    } else if (atributo == "Ajuste de reação") {
      return 13;
    }
  } else if (carisma == 25) {
    if (atributo == "Nº Máximo de aliados") {
      return 50;
    } else if (atributo == "Fator de Lealdade") {
      return 20;
    } else if (atributo == "Ajuste de reação") {
      return 14;
    }
  }
}

function obter_dados_json_personagem(forca, destreza, constituicao, inteligencia, sabedoria, carisma) {
  return {
    "Nome": '',
    "Raça": '',
    "Linhagem": 'Não é um personagem Vistani',
    "Classe": '',
    "Tendência": '',
    "Dados Básicos": {
      "Gênero": '',
      "Grupo": '',
      "Idade": 0,
      "Altura": 0,
      "Peso": 0,
      "Pontos de Vida": 0,
      "Categoria de Armadura": 10,
      "Iniciativa": '1d10 (menor primeiro)',
      "Teste de Surpresa": '',
      "TACO": 20,
      "Infravisão": '0 metros no escuro',
      "Peso dos Equipamentos": 0,
      "Moedas": 0,
      "Pontos de Força Psiônica (PSPs)": 0,
      "PSPs por Nível Adicional": 0,
      "Próximo Nível": 0,
      "Nível": 1,
      "XP Extra": '0%',
      "Escolas de Magia": [],
      "Escolas Opostas": [],
      "Escolas Adjacentes": [],
      "Esferas": []
    },
    "Movimentação": {
      "Taxa-Base": 0,
      "Em campo aberto": '',
      "Correndo": '',
      "Em dungeons": '',
      "Em combates": '',
      "Investida": '',
      "Natação": '',
      "Escalada (Irregular, Seca)": ''
    },
    "Habilidades": {
      "Força": {
        "Valor da Habilidade": forca,
        "Chance de Acertar": 0,
        "Ajuste de Dano": 0,
        "Carga Permitida": 0,
        "Sustentação": 0,
        "Abrir Portas": 0,
        "Barras/Portais": "0%"
      },
      "Destreza": {
        "Valor da Habilidade": destreza,
        "Ajuste de Reação": 0,
        "Ataque à Distância": 0,
        "Ajuste Defensivo": 0
      },
      "Constituição": {
        "Valor da Habilidade": constituicao,
        "Ajuste dos Pontos de Vida": 0,
        "Colapso": "0%",
        "Chance de Ressurreição": "0%",
        "Resistência contra Veneno": 0,
        "Regeneração": "Não há"
      },
      "Inteligência": {
        "Valor da Habilidade": inteligencia,
        "Número de Línguas": 0,
        "Círculo de Magia": "Nenhum",
        "Chance de Aprender Magia": "Nenhuma",
        "Número Máx Magias/Círculo": "Nenhuma",
        "Imunidade a Magias": "Nenhuma"
      },
      "Sabedoria": {
        "Valor da Habilidade": sabedoria,
        "Ajuste de Defesa Contra Magia": 0,
        "Magias Extras": "Nenhuma",
        "Chance da Magia Falhar": "0%",
        "Imunidade à Magia": []
      },
      "Carisma": {
        "Valor da Habilidade": carisma,
        "Nº Máximo de aliados": 0,
        "Fator de Lealdade": 0,
        "Ajuste de reação": 0
      },
    },
    "Resistência": {
      "Paralisação, Veneno ou Morte por Magia": 0,
      "Bastão, Cajado ou Varinha": 0,
      "Petrificação ou Transformação": 0,
      "Sopro-de-Dragão": 0,
      "Magia": 0
    },
    "Medo, Horror e Loucura": {
      "Teste de Medo": 0,
      "Teste de Horror": 0,
      "Teste de Loucura": 0
    },
    "Idiomas": [],
    "Pontos de Perícia": {
      "Perícias Armas Inicial": 0,
      "Perícias Armas Nº Níveis": 0,
      "Perícias Armas Penalidades": 0,
      "Perícias Comuns Inicial": 0,
      "Perícias Comuns Nº Níveis": 0
    },
    "Magias": [],
    "Perícias": [],
    "Especialização": [],
    "Poderes Psiônicos": {
      "Ciências": [],
      "Devoções": []
    },
    "Itens": [],
    "Detalhes": [],
    "Poder da Fé": {
      "Esqueleto ou 1 DV": '-',
      "Zumbi": '-',
      "Carniçal ou 2 DV": '-',
      "Sombra ou 3-4 DV": '-',
      "Vulto ou 5 DV": '-',
      "Carneçal": '-',
      "Aparição ou 6 DV": '-',
      "Múmia ou 7 DV": '-',
      "Espectro ou 8 DV": '-',
      "Vampiro ou 9 DV": '-',
      "Fantasma ou 10 DV": '-',
      "Lich ou 11+ DV": '-',
      "Especial": '-'
    }
  };
}

function valor_comparador_atributo(valor,setado) {
  if (setado.usar) {
    if (setado.valor > valor) {
      return setado.valor;
    } else {
      return valor;
    }
  } else {
    return valor;
  }
}

function sortear_atributos(callback) {

  let atributos_setados = obter_todos_atributos();

  let habilidades_sorteadas = {
    "Força": atributos_setados.forca.valor,
    "Destreza": atributos_setados.destreza.valor,
    "Constituição": atributos_setados.constituicao.valor,
    "Inteligência": atributos_setados.inteligencia.valor,
    "Sabedoria": atributos_setados.sabedoria.valor,
    "Carisma": atributos_setados.carisma.valor
  };

  callback(obter_dados_json_personagem(habilidades_sorteadas["Força"], habilidades_sorteadas["Destreza"], habilidades_sorteadas["Constituição"], habilidades_sorteadas["Inteligência"], habilidades_sorteadas["Sabedoria"], habilidades_sorteadas["Carisma"]));
  return;

  /*
  rolar3d6(forca => {
    rolar3d6(destreza => {
      rolar3d6(constituicao => {
        rolar3d6(inteligencia => {
          rolar3d6(sabedoria => {
            rolar3d6(carisma => {

              habilidades_sorteadas = {
                "Força": valor_comparador_atributo(forca,atributos_setados.forca),
                "Destreza": valor_comparador_atributo(destreza,atributos_setados.destreza),
                "Constituição": valor_comparador_atributo(constituicao,atributos_setados.constituicao),
                "Inteligência": valor_comparador_atributo(inteligencia,atributos_setados.inteligencia),
                "Sabedoria": valor_comparador_atributo(sabedoria,atributos_setados.sabedoria),
                "Carisma": valor_comparador_atributo(carisma,atributos_setados.carisma)
              };

              if (forcar_classe != 'Todas') {
                let classe_ajustada = ajustar_nome_classe_variavel(forcar_classe);
                let keys_habilidades = Object.keys(CLASSES[classe_ajustada]["Habilidades Exigidas"]);
                keys_habilidades.forEach((habilidade, index_habilidade) => {

                  if (CLASSES[classe_ajustada]["Habilidades Exigidas"][habilidade] > habilidades_sorteadas[habilidade]) {
                    habilidades_sorteadas[habilidade] = CLASSES[classe_ajustada]["Habilidades Exigidas"][habilidade];
                  }

                  if (index_habilidade == (keys_habilidades.length - 1)) {
                    callback(obter_dados_json_personagem(habilidades_sorteadas["Força"], habilidades_sorteadas["Destreza"], habilidades_sorteadas["Constituição"], habilidades_sorteadas["Inteligência"], habilidades_sorteadas["Sabedoria"], habilidades_sorteadas["Carisma"]));
                  }
                });
              } else {
                callback(obter_dados_json_personagem(habilidades_sorteadas["Força"], habilidades_sorteadas["Destreza"], habilidades_sorteadas["Constituição"], habilidades_sorteadas["Inteligência"], habilidades_sorteadas["Sabedoria"], habilidades_sorteadas["Carisma"]));
              }
            });
          });
        });
      });
    });
  });
  */
}

function obter_valores_setados_atributos_tela(id,atributo) {
  let campo = document.getElementById(id);
  let valor = campo.value;
  if ((valor == undefined) || (valor == 'undefined') || (valor == null) || (valor == '')) {
    valor = 0;
  } else {
    valor = parseInt(valor);
  }
  let retorno = { usar: (valor > 0), valor: valor };
  return retorno;
}

function obter_todos_atributos_tela() {
  let retorno = {};
  retorno['forca'] = obter_valores_setados_atributos_tela('texto-formulario-minimo-forca','Força');
  retorno['destreza'] = obter_valores_setados_atributos_tela('texto-formulario-minimo-destreza','Destreza');
  retorno['constituicao'] = obter_valores_setados_atributos_tela('texto-formulario-minimo-constituicao','Constituição');
  retorno['inteligencia'] = obter_valores_setados_atributos_tela('texto-formulario-minimo-inteligencia','Inteligência');
  retorno['sabedoria'] = obter_valores_setados_atributos_tela('texto-formulario-minimo-sabedoria','Sabedoria');
  retorno['carisma'] = obter_valores_setados_atributos_tela('texto-formulario-minimo-carisma','Carisma');
  return retorno;
}

function sortear_atributos_tela(callback) {

  let atributos_setados = obter_todos_atributos_tela();

  rolarAtributo(forca => {
    rolarAtributo(destreza => {
      rolarAtributo(constituicao => {
        rolarAtributo(inteligencia => {
          rolarAtributo(sabedoria => {
            rolarAtributo(carisma => {

              habilidades_sorteadas = {
                "Força": valor_comparador_atributo(forca,atributos_setados.forca),
                "Destreza": valor_comparador_atributo(destreza,atributos_setados.destreza),
                "Constituição": valor_comparador_atributo(constituicao,atributos_setados.constituicao),
                "Inteligência": valor_comparador_atributo(inteligencia,atributos_setados.inteligencia),
                "Sabedoria": valor_comparador_atributo(sabedoria,atributos_setados.sabedoria),
                "Carisma": valor_comparador_atributo(carisma,atributos_setados.carisma)
              };

              if (forcar_classe != 'Todas') {
                let classe_ajustada = ajustar_nome_classe_variavel(forcar_classe);
                let keys_habilidades = Object.keys(CLASSES[classe_ajustada]["Habilidades Exigidas"]);
                keys_habilidades.forEach((habilidade, index_habilidade) => {

                  if (CLASSES[classe_ajustada]["Habilidades Exigidas"][habilidade] > habilidades_sorteadas[habilidade]) {
                    habilidades_sorteadas[habilidade] = CLASSES[classe_ajustada]["Habilidades Exigidas"][habilidade];
                  }

                  if (index_habilidade == (keys_habilidades.length - 1)) {
                    callback({
                      "Força": habilidades_sorteadas["Força"],
                      "Destreza": habilidades_sorteadas["Destreza"],
                      "Constituição": habilidades_sorteadas["Constituição"],
                      "Inteligência": habilidades_sorteadas["Inteligência"],
                      "Sabedoria": habilidades_sorteadas["Sabedoria"],
                      "Carisma": habilidades_sorteadas["Carisma"],
                    });
                    return;
                  }
                });
              } else {
                callback({
                  "Força": habilidades_sorteadas["Força"],
                  "Destreza": habilidades_sorteadas["Destreza"],
                  "Constituição": habilidades_sorteadas["Constituição"],
                  "Inteligência": habilidades_sorteadas["Inteligência"],
                  "Sabedoria": habilidades_sorteadas["Sabedoria"],
                  "Carisma": habilidades_sorteadas["Carisma"],
                });
                return;
              }

            });
          });
        });
      });
    });
  });
}

function validar_habilidades(personagem, callback) {

  let keys_racas = Object.keys(RACAS);
  let keys_habilidades = Object.keys(personagem["Habilidades"]);

  let racas = [];

  keys_racas.forEach((raca,index_racas) => {

    let habilidade_valida = true;
    keys_habilidades.forEach((habilidade,index_habilidades) => {
        let valor = personagem["Habilidades"][habilidade]["Valor da Habilidade"];
        let limites = RACAS[raca][habilidade];
        if ( (valor < limites["minimo"]) || (valor > limites["maximo"]) ) {
          habilidade_valida = false;
        }

        if (index_habilidades == (keys_habilidades.length - 1)) {
          if (habilidade_valida) {
            racas.push(raca);
          }
        }
    });

    if (index_racas == (keys_racas.length - 1)) {
      callback(racas);
      return;
    }
  });

}

function ajustar_nome_raca(personagem) {
  let raca = personagem["Raça"];
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

function sortear_raca(personagem, callback) {
  validar_habilidades(personagem, racas => {

    let raca = '';
    let raca_nao_forcada = (forcar_raca == 'Todas');

    if (raca_nao_forcada) {
      if (forcar_classe == 'Todas') {
        let index = Math.floor(Math.random() * racas.length);
        raca = racas[index];
      } else {
        let classe_ajustada = ajustar_nome_classe_variavel(forcar_classe);
        let index = Math.floor(Math.random() * CLASSES[classe_ajustada]["Raças Permitidas"].length);
        raca = CLASSES[classe_ajustada]["Raças Permitidas"][index];
      }
    } else {
      raca = forcar_raca;
    }

    personagem["Raça"] = raca;

    if (raca == "Meio-Vistani") {
      let texto_formulario_linhagem = document.getElementById('texto-formulario-linhagem');
      let linhagem_selecionada = texto_formulario_linhagem.options[texto_formulario_linhagem.selectedIndex].value;

      if ((linhagem_selecionada == 'Todas') || raca_nao_forcada) {
        let clans = Object.keys(CLANS);
        clans.shift(); // remove o primeiro
        let nome_clan = clans[Math.floor(Math.random() * clans.length)];

        personagem["Linhagem"] = nome_clan;
        personagem["Raça"] = 'Meio-Vistani (' + nome_clan + ')';
      } else {
        personagem["Linhagem"] = linhagem_selecionada;
        personagem["Raça"] = 'Meio-Vistani (' + linhagem_selecionada + ')';
      }
    }

    if (raca == "Elfo") {
      let racas_elficas = [
        'Elfo (Alto-Elfo)', 'Elfo (Alto-Elfo)', 'Elfo (Alto-Elfo)', 'Elfo (Alto-Elfo),',
        'Elfo Aquático', 'Elfo Cinzento', 'Elfo da Floresta', 'Drow'
      ];
      personagem["Raça"] = racas_elficas[Math.floor(Math.random() * racas_elficas.length)];
    }

    if (raca == "Halfling") {
      let racas_halflings = [ 'Halfling Pespeludos', 'Halfling Tiposaltos', 'Halfling Robustos' ];
      personagem["Raça"] = racas_halflings[Math.floor(Math.random() * racas_halflings.length)];
    }

    let ajustes = Object.keys(RACAS[raca].ajustes);
    if (ajustes.length == 0) {
      callback();
      return;
    } else {
      ajustes.forEach((habilidade, i) => {

        let valor = personagem["Habilidades"][habilidade]["Valor da Habilidade"];
        let ajuste = RACAS[raca].ajustes[habilidade];
        personagem["Habilidades"][habilidade]["Valor da Habilidade"] = valor + ajuste;

        if (i == (ajustes.length - 1)) {
          callback();
          return;
        }
      });
    }

  });
}

function definir_valor_basico_classe(personagem,classe_selecionada) {
  if (personagem["Habilidades"]["Força"]["Valor da Habilidade"] < CLASSES[classe_selecionada]["Habilidades Exigidas"]["Força"]) {
    personagem["Habilidades"]["Força"]["Valor da Habilidade"] = CLASSES[classe_selecionada]["Habilidades Exigidas"]["Força"];
  }
  if (personagem["Habilidades"]["Destreza"]["Valor da Habilidade"] < CLASSES[classe_selecionada]["Habilidades Exigidas"]["Destreza"]) {
    personagem["Habilidades"]["Destreza"]["Valor da Habilidade"] = CLASSES[classe_selecionada]["Habilidades Exigidas"]["Destreza"];
  }
  if (personagem["Habilidades"]["Constituição"]["Valor da Habilidade"] < CLASSES[classe_selecionada]["Habilidades Exigidas"]["Constituição"]) {
    personagem["Habilidades"]["Constituição"]["Valor da Habilidade"] = CLASSES[classe_selecionada]["Habilidades Exigidas"]["Constituição"];
  }
  if (personagem["Habilidades"]["Inteligência"]["Valor da Habilidade"] < CLASSES[classe_selecionada]["Habilidades Exigidas"]["Inteligência"]) {
    personagem["Habilidades"]["Inteligência"]["Valor da Habilidade"] = CLASSES[classe_selecionada]["Habilidades Exigidas"]["Inteligência"];
  }
  if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] < CLASSES[classe_selecionada]["Habilidades Exigidas"]["Sabedoria"]) {
    personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] = CLASSES[classe_selecionada]["Habilidades Exigidas"]["Sabedoria"];
  }
  if (personagem["Habilidades"]["Carisma"]["Valor da Habilidade"] < CLASSES[classe_selecionada]["Habilidades Exigidas"]["Carisma"]) {
    personagem["Habilidades"]["Carisma"]["Valor da Habilidade"] = CLASSES[classe_selecionada]["Habilidades Exigidas"]["Carisma"];
  }
}

function validar_classes_por_habilidades(classes, personagem, callback) {
  let keys_classes = classes;
  let keys_habilidades = Object.keys(personagem["Habilidades"]);
  let classes_permitidas = [];

  keys_classes.forEach((classe,index_classes) => {

    let habilidade_valida = true;
    keys_habilidades.forEach((habilidade,index_habilidades) => {
        let valor = personagem["Habilidades"][habilidade]["Valor da Habilidade"];
        let limite = CLASSES[classe]["Habilidades Exigidas"][habilidade];
        if (valor < limite) {
          habilidade_valida = false;
        }

        if (index_habilidades == (keys_habilidades.length - 1)) {
          if (habilidade_valida) {
            classes_permitidas.push(classe);
          }
        }
    });

    if (index_classes == (keys_classes.length - 1)) {

      if (classes_permitidas.length == 0) {

        let texto_formulario_classe = document.getElementById('texto-formulario-classe');
        let texto_formulario_classe_valor = texto_formulario_classe.options[texto_formulario_classe.selectedIndex].value;
        let classe_selecionada = '';

        if (texto_formulario_classe_valor != 'Todas') {
          classe_selecionada = texto_formulario_classe_valor;
        }
        if (classe_selecionada == '') {
          classe_selecionada = 'Guerreiro';
        }

        definir_valor_basico_classe(personagem,classe_selecionada);
        classes_permitidas.push(classe_selecionada);
      }

      callback(classes_permitidas);
      return;
    }
  });
}

function validar_classes_por_raca(personagem, callback) {
  let keys_classes = Object.keys(CLASSES);
  let classes_permitidas = [];

  let classes_100_por_cento = false;

  if (CLANS[personagem["Linhagem"]].vistani) {
    classes_100_por_cento = CLANS[personagem["Linhagem"]].classes_100_por_cento;
  }

  if ( (ajustar_nome_raca(personagem) == 'Meio-Vistani') && classes_100_por_cento) {
    let classes_clans = Object.keys(CLANS[personagem["Linhagem"]].classes);
    callback(classes_clans);
    return;
  } else {

    keys_classes.forEach((classe,index_classes) => {
      let keys_racas = CLASSES[classe]["Raças Permitidas"];
      let classe_permitida = false;

      keys_racas.forEach((raca, index_classe_permitida) => {
        if (ajustar_nome_raca(personagem) == raca) {
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
        return;
      }
    });

  }
}

function sortear_classes_especificas_do_clan(classes, personagem, callback) {
  let valor100 = Math.floor(Math.random() * 100);
  let classes_clans = Object.keys(CLANS[personagem["Linhagem"]].classes);
  let ja_sorteada = false;
  let classes_copiadas = classes.slice();

  classes_clans.forEach((classe_clan, index_classe_clan) => {
    let valor_comparar = 100 - CLANS[personagem["Linhagem"]].classes[classe_clan];

    if (valor100 <= valor_comparar) {
      if (!ja_sorteada) {
        ja_sorteada = true;
        callback(classe_clan);
        return;
      }
    } else {
      const index_remover = classes_copiadas.indexOf(classe_clan);
      if (index_remover > -1) {
        classes_copiadas.splice(index_remover, 1);
      }
    }

    if (index_classe_clan == (classes_clans.length - 1)) {
      if (!ja_sorteada) {
        if (CLANS[personagem["Linhagem"]].classes_100_por_cento) {
          let index = Math.floor(Math.random() * classes_clans.length);
          callback(classes_clans[index]);
          return;
        } else {
          let index = Math.floor(Math.random() * classes_copiadas.length);
          callback(classes_copiadas[index]);
          return;
        }
      }
    }
  });
}

function sortear_classes_do_clan(classes, personagem, callback) {
  if (CLANS[personagem["Linhagem"]].vistani) {
    if (CLANS[personagem["Linhagem"]].classes_100_por_cento) {
      sortear_classes_especificas_do_clan(classes, personagem, classe=>{
        callback(classe);
        return;
      });
    } else {
      sortear_classes_especificas_do_clan(classes, personagem, classe=>{
        callback(classe);
        return;
      });
    }
  } else {
    let index = Math.floor(Math.random() * classes.length);
    callback(classes[index]);
    return;
  }
}

function sortear_classe(personagem, callback) {
  debug('Executando validar_classes_por_raca()');
  validar_classes_por_raca(personagem, classes => {
    validar_classes_por_habilidades(classes, personagem, classes_permitidas => {

      /* Classes validadas */

      if (classes_permitidas.length == 0) {
        callback({ valores_invalidos: true });
        return;
      } else {
        let classes_fortes = ["Paladino", "Vingador", "Ranger", "Elementalista Fogo", "Elementalista Terra", "Elementalista Ar", "Elementalista Água", "Arcanista", "Psionicista", "Abjurante", "Conjurador", "Adivinho", "Feiticeiro", "Ilusionista", "Invocador", "Necromante", "Transmutador", "Druida", "Anacoreta", "Bardo", "Cigano"];
        let classes_selecionadas = [];

        classes_fortes.forEach((classe_forte, index_classes_fortes) => {
          /* Iteracao classes fortes */

          /*
          classes_permitidas.forEach((classe_permitida, index_classe_permitida) => {
            if (classe_permitida == classe_forte) {
              classes_selecionadas.push(classe_permitida);
            }
          });
          */

          for (let index_classe_permitida = 0; index_classe_permitida < classes_permitidas.length; index_classe_permitida++) {
            if (classes_permitidas[index_classe_permitida] == classe_forte) {
              classes_selecionadas.push(classes_permitidas[index_classe_permitida]);
            }
          }

          if (index_classes_fortes == (classes_fortes.length - 1)) {
            /* Definicao */

            let classe_final = '';
            let ja_sorteada = false;

            if (forcar_classe != "Todas") {
              classe_final = forcar_classe;
            } else if (classes_selecionadas.length > 0) {
              sortear_classes_do_clan(classes_selecionadas, personagem, classe_final=>{
                ja_sorteada = true;
                personagem["Classe"] = classe_final;
                callback({ valores_invalidos: false });
                return;
              });
              /*
              let index = Math.floor(Math.random() * classes_selecionadas.length);
              classe_final = classes_selecionadas[index];
              */
            } else {
              sortear_classes_do_clan(classes_permitidas, personagem, classe_final=>{
                ja_sorteada = true;
                personagem["Classe"] = classe_final;
                callback({ valores_invalidos: false });
                return;
              });
              /*
              let index = Math.floor(Math.random() * classes_permitidas.length);
              classe_final = classes_permitidas[index];
              */
            }

            /*
            if ( (classe_final == "Clérigo") && (forcar_classe == "Todas") ) {
              let lista_clerigos = [
                "Clérigo", "Clérigo", "Clérigo", "Clérigo",
                "Clérigo", "Clérigo", "Clérigo", "Clérigo",
                "Clérigo", "Clérigo", "Clérigo", "Clérigo",
                "Clérigo", "Clérigo", "Clérigo", "Clérigo",
                "Clérigo", "Clérigo", "Clérigo", "Clérigo",
                "Clérigo da Agricultura",
                "Clérigo dos Ferreiros",
                "Clérigo da Morte",
                "Clérigo da Doença",
                "Clérigo da Terra",
                "Clérigo da Cura",
                "Clérigo da Caça",
                "Clérigo do Relâmpago",
                "Clérigo do Amor",
                "Clérigo da Natureza",
                "Clérigo dos Oceanos",
                "Clérigo da Paz",
                "Clérigo da Força",
                "Clérigo do Trovão",
                "Clérigo da Guerra",
                "Clérigo dos Ventos"
              ];
              let index_clerigo = Math.floor(Math.random() * lista_clerigos.length);
              classe_final = lista_clerigos[index_clerigo];
            }
            */

            if (!ja_sorteada) {

              if (classe_final == "Clérigo da Agricultura") {
                CLASSES['Clérigo'].armas_divindade = ["Podão", "Foice", "Mangual"];
              } else if (classe_final == "Clérigo dos Ferreiros") {
                CLASSES['Clérigo'].armas_divindade = ["Martelo de Batalha"];
              } else if (classe_final == "Clérigo da Morte") {
                CLASSES['Clérigo'].armas_divindade = ["Foice"];
              } else if (classe_final == "Clérigo da Doença") {
                CLASSES['Clérigo'].armas_divindade = ["Açoite", "Chicote"];
              } else if (classe_final == "Clérigo da Terra") {
                CLASSES['Clérigo'].armas_divindade = ["Alvião"];
              } else if (classe_final == "Clérigo da Cura") {
                CLASSES['Clérigo'].armas_divindade = ["Aprisionador", "Bordão"];
              } else if (classe_final == "Clérigo da Caça") {
                CLASSES['Clérigo'].armas_divindade = ["Arco Curto", "Azagaia", "Lança de Cavalaria", "Funda"];
              } else if (classe_final == "Clérigo do Relâmpago") {
                CLASSES['Clérigo'].armas_divindade = ["Dardo", "Lança", "Azagaia"];
              } else if (classe_final == "Clérigo do Amor") {
                CLASSES['Clérigo'].armas_divindade = ["Arco Curto", "Aprisionador"];
              } else if (classe_final == "Clérigo da Natureza") {
                CLASSES['Clérigo'].armas_divindade = ["Clava", "Cimitarra", "Foice"];
              } else if (classe_final == "Clérigo dos Oceanos") {
                CLASSES['Clérigo'].armas_divindade = ["Arpão", "Lança", "Tridente"];
              } else if (classe_final == "Clérigo da Paz") {
                CLASSES['Clérigo'].armas_divindade = ["Bordão"];
              } else if (classe_final == "Clérigo da Força") {
                CLASSES['Clérigo'].armas_divindade = ["Martelo"];
              } else if (classe_final == "Clérigo do Trovão") {
                CLASSES['Clérigo'].armas_divindade = ["Clava", "Maça", "Martelo de Batalha"];
              } else if (classe_final == "Clérigo da Guerra") {
                CLASSES['Clérigo'].armas_divindade = ["Machado de Batalha", "Maça", "Maça-Estrela", "Montante", "Espada"];
              } else if (classe_final == "Clérigo dos Ventos") {
                CLASSES['Clérigo'].armas_divindade = ["Zarabatana", "Dardo"];
              }

              personagem["Classe"] = classe_final;
              callback({ valores_invalidos: false });
              return;
            }

            /* Definicao */
          }

          /* Iteracao classes fortes */
        });
      }

      /* Classes validadas */

    });
  });
}

function render(callback) {
  if (!DEBUG)
    console.clear();

  forcar_havenloft = document.getElementById('texto-formulario-ravenloft').checked;
  forcar_darksun = document.getElementById('texto-formulario-darksun').checked;
  forcar_classe = document.getElementById('texto-formulario-classe').options[document.getElementById('texto-formulario-classe').selectedIndex].value;
  forcar_raca = document.getElementById('texto-formulario-raca').options[document.getElementById('texto-formulario-raca').selectedIndex].value;

  obter_dados_personagem(personagem => {

    if (personagem["Dados Básicos"]["Escolas de Magia"].length == 0) {
      //personagem["Dados Básicos"]["Escolas de Magia"] = personagem["Dados Básicos"]["Escolas de Magia"].join(", ");
      personagem["Dados Básicos"]["Escolas de Magia"] = "Nenhuma";
    }
    if (personagem["Dados Básicos"]["Escolas Opostas"].length == 0) {
      //personagem["Dados Básicos"]["Escolas Opostas"] = personagem["Dados Básicos"]["Escolas Opostas"].join(", ");
      personagem["Dados Básicos"]["Escolas Opostas"] = "Nenhuma";
    }
    if (personagem["Dados Básicos"]["Escolas Adjacentes"].length == 0) {
      //personagem["Dados Básicos"]["Escolas Adjacentes"] = personagem["Dados Básicos"]["Escolas Adjacentes"].join(", ");
      personagem["Dados Básicos"]["Escolas Adjacentes"] = "Nenhuma";
    }

    if (personagem["Dados Básicos"]["Esferas"].length == 0) {
      personagem["Dados Básicos"]["Esferas"] = "Nenhuma";
    }

    let output = document.getElementById('ficha');
    output.innerHTML = "";
    var node = prettyPrint(personagem);
    document.getElementById('ficha').appendChild(node);
    output.style.display = 'block';
    callback();
    return;
  });
}

function sortear_personagem(callback) {
  debug('Chamando sortear_atributos()');
  sortear_atributos(personagem => {
    debug('Chamando sortear_raca()');
    sortear_raca(personagem, () => {
      debug('Chamando sortear_classe()');
      sortear_classe(personagem, resultado => {

        if (resultado.valores_invalidos) {
          sortear_personagem(personagem => {
            error("Foi necessário outro lance de dados pois não foi possível escolher uma classe.");
            sortear_tendencia(personagem, () => {
              organizar_divindades_permitidas(false,personagem, (lista_divindades)=>{
                sortear_dados_basicos(personagem, () => {
                  callback(personagem);
                  return;
                });
              });
            });
          });
        } else {
          sortear_tendencia(personagem, () => {
            organizar_divindades_permitidas(false,personagem, (lista_divindades)=>{

              // AQUI
              console.log(personagem['Raça']);
              console.log(personagem['Tendência']);
              console.log(personagem['Classe']);
              console.log(lista_divindades);

              sortear_dados_basicos(personagem, () => {
                callback(personagem);
                return;
              });
            });
          });
        }

      });
    });
  });
}

function ajustar_nome_grupo(classe) {
  if (CLASSES[classe]["Grupo"] == "Homem de Armas") {
    return "Homem de Armas";
  } else if (CLASSES[classe]["Grupo"] == "Sacerdote") {
    return "Sacerdote";
  } else if (CLASSES[classe]["Grupo"] == "Arcano") {
    return "Arcano";
  } else if (CLASSES[classe]["Grupo"] == "Ladino") {
    return "Ladino";
  } else if (CLASSES[classe]["Grupo"] == "Psionicista") {
    return "Arcano";
  } else {
    return "Homem de Armas";
  }
}

function ajustar_nome_classe_variavel(classe) {
  if (classe.indexOf('Clérigo') > -1) {
    classe = 'Clérigo';
  }
  return classe;
}

function ajustar_nome_classe(personagem) {
  let classe = personagem["Classe"];
  return ajustar_nome_classe_variavel(classe);
}

function sortear_tendencia(personagem, callback) {
  let combo_tendencia = document.getElementById('texto-formulario-tendencia');
  let tendencia_selecionada = combo_tendencia.options[combo_tendencia.selectedIndex].value;

  if (tendencia_selecionada == 'Todas') {
    let classe = ajustar_nome_classe(personagem);
    let tendencias = CLASSES[classe].tendencias;
    let index = Math.floor(Math.random() * tendencias.length);
    personagem["Tendência"] = tendencias[index];
  } else {
    personagem["Tendência"] = tendencia_selecionada;
  }

  callback();
  return;
}

function organizar_divindades_pertence_tendencias_proximas(tendencia_personagem,tendencia_testada,callback) {
  let lista = TENDENCIAS_UM_PASSO[tendencia_personagem];
  let pertence = false;

  lista.forEach((entry, index) => {

    if (entry == tendencia_testada) {
      pertence = true;
    }

    if (index == (lista.length - 1)) {
      callback(pertence);
    }
  });
}

function organizar_divindades_tendencias(classe,tendencia,callback) {
  if (classe == "Paladino") {
    callback(["Justo (bom e leal)"]);
  } else {
    callback(TENDENCIAS_UM_PASSO[tendencia]);
  }
}

function organizar_divindades_havenloft(classe,tendencia,callback) {
  let lista_opcoes = [];

  if (classe == "Paladino") {
    lista_opcoes = lista_opcoes.concat(DIVINDADES_PERSONAGENS["Meio-Vistani"]["Justo (bom e leal)"]);
    callback(lista_opcoes);
  } else {

    let keys_tendencias = Object.keys(DIVINDADES_PERSONAGENS["Meio-Vistani"]);

    keys_tendencias.forEach((entry_tendencias, index_tendencias) => {
      organizar_divindades_pertence_tendencias_proximas(tendencia,entry_tendencias,(pertence)=>{
        if (pertence) {
          lista_opcoes = lista_opcoes.concat(DIVINDADES_PERSONAGENS["Meio-Vistani"][entry_tendencias]);
        }

        if (index_tendencias == (keys_tendencias.length - 1)) {
          callback(lista_opcoes);
        }
      });
    });

  }
}

function organizar_divindades_permitidas(ja_foi,personagem, callback) {

  let lista_opcoes = [];

  if (forcar_darksun) {
    lista_opcoes.push(SEM_DIVINDADES_PERSONAGENS);
    callback(lista_opcoes);
  } else {

    if (forcar_havenloft) {
      organizar_divindades_havenloft(personagem['Classe'],personagem['Tendência'],(lista_opcoes)=>{
        callback(lista_opcoes);
      });
    } else {
      let raca = ajustar_nome_raca(personagem);

      organizar_divindades_tendencias(personagem['Classe'],personagem['Tendência'],(lista_tendencias)=>{
        lista_tendencias.forEach((tendencia, index_tendencia) => {
          lista_opcoes = lista_opcoes.concat(DIVINDADES_PERSONAGENS[raca][tendencia]);

          if (index_tendencia == (lista_tendencias.length - 1)) {

            if ( (personagem['Raça'] == "Humano") && (!ja_foi) ) {
              organizar_divindades_permitidas(false,{
                'Raça': "Meio-Vistani",
                'Tendência': personagem['Tendência'],
                'Classe': personagem['Classe'],
              }, (lista_vistani)=>{
                lista_opcoes = lista_opcoes.concat(lista_vistani);
                callback(lista_opcoes);
              });
            } else {

              if (lista_opcoes.length == 0) {
                organizar_divindades_permitidas(true,{
                  'Raça': "Humano",
                  'Tendência': personagem['Tendência'],
                  'Classe': personagem['Classe'],
                }, callback);
              } else {
                callback(lista_opcoes);
              }

            }

          }
        });

      });
    }

  }
}

function acrescentar_novas_linguas(personagem, raca, numero_de_linguas, callback) {
  let linguas = [ 'élfico', 'do anões', 'dos gnomos', 'dos halflings', 'dos goblins', 'dos robgoblins', 'dos orcs', 'dos gnolls' ];

  if (numero_de_linguas == 0) {
    personagem["Detalhes"].push("Mesmo incapaz de falar qualquer língua, o personagem ainda pode se comunicar através de gestos e grunhidos.");
  } else if (numero_de_linguas == 1) {
    let linguas_importantes = [ RACAS[raca].linguas_importantes[0] ];
    personagem["Idiomas"] = linguas_importantes;
    numero_de_linguas = numero_de_linguas - 1;
  } else {
    personagem["Idiomas"] = RACAS[raca].linguas_importantes;
    numero_de_linguas = numero_de_linguas - RACAS[raca].linguas_importantes.length;
  }

  let idiomas_do_personagem = personagem["Idiomas"].slice();

  if (numero_de_linguas > 0) {

    linguas.forEach((idioma_disponivel, index_externo) => {
      let possui_idioma = false;
      idiomas_do_personagem.forEach((idioma_aprendido, index_interno) => {
        if (idioma_disponivel == idioma_aprendido) {
          possui_idioma = true;
        }

        if (index_interno == (idiomas_do_personagem.length - 1)) {
          if ( (!possui_idioma) && (numero_de_linguas > 0) ) {
            let acrescentar_nova_lingua = Math.floor(Math.random() * 100) + 1;
            if (acrescentar_nova_lingua <= 5) {
              personagem["Idiomas"].push(idioma_disponivel);
              numero_de_linguas = numero_de_linguas - 1;
            }
          }
        }
      });

      if (index_externo == (linguas.length - 1)) {
        callback(numero_de_linguas);
        return;
      }
    });
  } else {
    callback(numero_de_linguas);
    return;
  }
}

function sortear_pontos_talentos(classe, personagem, callback) {

  if ((classe != "Ladrão") && (classe != "Bardo")) {
    callback();
    return;
  }

  let pontos_extras = 60;
  let limites = {
    'Furtar Bolsos': 30,
    'Abrir Fechaduras': 30,
    'Achar/Desarmar Armadilhas': 30,
    'Mover-se em Silêncio': 30,
    'Esconder-se nas Sombras': 30,
    'Ouvir Ruídos': 30,
    'Escalar Muros': 30,
    'Decifrar Linguagens': 30,
    'Ataque pelas Costas': 0,
    'Gíria dos ladrões': 0,
    'Usar Pergaminhos': 30,
    'Identificar Item Mágico': 30
  };

  if (personagem['Classe'] == "Bardo") {
    pontos_extras = 20;
  }

  let keys_talentos = Object.keys(CLASSES[classe].talentos);
  while (pontos_extras > 0) {
    let index = Math.floor(Math.random() * keys_talentos.length);
    let talento = keys_talentos[index];
    if (limites[talento] > 0) {

        let extra = 1000;
        while (extra > pontos_extras) {
          extra = Math.floor(Math.random() * limites[talento]) + 1;
        }

        limites[talento] = limites[talento] - extra;
        pontos_extras = pontos_extras - extra;
        personagem["Talentos"][talento] = personagem["Talentos"][talento] + extra;

    }
    if (pontos_extras == 0) {
      callback();
      return;
    }
  }
}

function definir_talentos(classe, personagem, callback) {
  personagem["Talentos"] = {};
  let keys_talentos = Object.keys(CLASSES[classe].talentos);
  keys_talentos.forEach((talento, index_talento) => {
    let destreza = personagem["Habilidades"]["Destreza"]["Valor da Habilidade"];
    let raca = ajustar_nome_raca(personagem);
    personagem["Talentos"][talento] =
      CLASSES[classe].talentos[talento] +
      ajustar_talentos_pela_destreza(classe,destreza,talento) +
      RACAS[raca].talentos[talento];

    if (index_talento == (keys_talentos.length - 1)) {
      sortear_pontos_talentos(classe, personagem, () => {
        callback();
        return;
      });
    }
  });

  /*
  if ( (CLASSES[classe]["Grupo"] == "Ladino") || (classe == "Ranger") ) {
    personagem["Talentos"] = {};
    let keys_talentos = Object.keys(CLASSES[classe].talentos);
    keys_talentos.forEach((talento, index_talento) => {
      let destreza = personagem["Habilidades"]["Destreza"]["Valor da Habilidade"];
      let raca = ajustar_nome_raca(personagem);
      personagem["Talentos"][talento] =
        CLASSES[classe].talentos[talento] +
        ajustar_talentos_pela_destreza(destreza,talento) +
        RACAS[raca].talentos[talento];

      if (index_talento == (keys_talentos.length - 1)) {
        sortear_pontos_talentos(classe, personagem, () => {
          callback();
        });
      }
    });
  } else {
    callback();
  }
  */
}

function ajustar_talentos_pela_destreza(classe,destreza,talento) {
  let grupo = ajustar_nome_grupo(classe);

  if ( (grupo == "Ladino") || (classe == "Ranger") ) {
    if ( (talento == 'Ataque pelas Costas') || (talento == 'Gíria dos ladrões') ) {
      return '';
    } else if ( talento == 'Usar Pergaminhos' ) {
      return 0;
    } else if (talento == 'Furtar Bolsos') {
      if (destreza == 9) { return -15; }
      else if (destreza == 10) { return -10; }
      else if (destreza == 11) { return -5; }
      else if (destreza == 12) { return 0; }
      else if ( (destreza >= 13) && (destreza <= 15) ) { return 0; }
      else if (destreza == 16) { return 0; }
      else if (destreza == 17) { return 5; }
      else if (destreza == 18) { return 10; }
      else if (destreza == 19) { return 15; }
      else { return 0; }
    } else if (talento == 'Abrir Fechaduras') {
      if (destreza == 9) { return -10; }
      else if (destreza == 10) { return -5; }
      else if (destreza == 11) { return 0; }
      else if (destreza == 12) { return 0; }
      else if ( (destreza >= 13) && (destreza <= 15) ) { return 0; }
      else if (destreza == 16) { return 5; }
      else if (destreza == 17) { return 10; }
      else if (destreza == 18) { return 15; }
      else if (destreza == 19) { return 20; }
      else { return 0; }
    } else if (talento == 'Achar/Desarmar Armadilhas') {
      if (destreza == 9) { return -10; }
      else if (destreza == 10) { return -10; }
      else if (destreza == 11) { return -5; }
      else if (destreza == 12) { return 0; }
      else if ( (destreza >= 13) && (destreza <= 15) ) { return 0; }
      else if (destreza == 16) { return 0; }
      else if (destreza == 17) { return 0; }
      else if (destreza == 18) { return 5; }
      else if (destreza == 19) { return 10; }
      else { return 0; }
    } else if (talento == 'Mover-se em Silêncio') {
      if (destreza == 9) { return -20; }
      else if (destreza == 10) { return -15; }
      else if (destreza == 11) { return -10; }
      else if (destreza == 12) { return -5; }
      else if ( (destreza >= 13) && (destreza <= 15) ) { return 0; }
      else if (destreza == 16) { return 0; }
      else if (destreza == 17) { return 5; }
      else if (destreza == 18) { return 10; }
      else if (destreza == 19) { return 15; }
      else { return 0; }
    } else if (talento == 'Esconder-se nas Sombras') {
      if (destreza == 9) { return -10; }
      else if (destreza == 10) { return -5; }
      else if (destreza == 11) { return 0; }
      else if (destreza == 12) { return 0; }
      else if ( (destreza >= 13) && (destreza <= 15) ) { return 0; }
      else if (destreza == 16) { return 0; }
      else if (destreza == 17) { return 5; }
      else if (destreza == 18) { return 10; }
      else if (destreza == 19) { return 15; }
      else { return 0; }
    } else if ( talento == 'Ouvir Ruídos' ) {
      return 0;
    } else if ( talento == 'Escalar Muros' ) {
      return 0;
    } else if ( talento == 'Decifrar Linguagens' ) {
      return 0;
    } else { return 0; }
  } else {
    if ( (talento == 'Ataque pelas Costas') || (talento == 'Gíria dos ladrões') ) {
      return '';
    } else {
      return 0;
    }
  }
}

function converter_po_em_moedas(moedas) {
  let moedas_po = Math.floor(moedas);
  let moedas_pc = Math.round((moedas - moedas_po) * 100);
  return moedas_po + " po, " + moedas_pc + " pc";
}

function reduzir_moedas(moedas, preco) {
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
    error("Erro ao calcular moedas:");
    error(preco);
  }
  return { moedas: final, valido: (final >= 0) };
}

function sortear_itens_escudos(moeda_limite, peso_limite, classe, personagem, callback) {
  let ca_escudo = false;
  if (CLASSES[classe].escudos.length > 0) {

    let texto_formulario_escudo = document.getElementById('texto-formulario-escudo');
    let texto_formulario_escudo_valor = texto_formulario_escudo.options[texto_formulario_escudo.selectedIndex].value;

    let index_item = CLASSES[classe].escudos.length;

    if ( (texto_formulario_escudo_valor != 'Todos') && (texto_formulario_escudo_valor != 'Nenhum') ) {
      debug(`Escudo selecionado: ${texto_formulario_escudo_valor}`);
      let nomes_escudos = CLASSES[classe].escudos.map(e => e.nome);

      if (nomes_escudos.includes(texto_formulario_escudo_valor)) {
        debug(`Escudo selecionado e incluído: ${texto_formulario_escudo_valor}`);
        index_item = nomes_escudos.indexOf(texto_formulario_escudo_valor);
      } else {
        debug(`Escudo selecionado mas não permitido`);
        index_item = Math.floor(Math.random() * (CLASSES[classe].escudos.length + 1));
      }
    } else {
      debug(`Nenhum escudo selecionado`);
      index_item = Math.floor(Math.random() * (CLASSES[classe].escudos.length + 1));
    }

    if (index_item == CLASSES[classe].escudos.length) {
      debug(`Nenhum escudo incluído`);
      callback(moeda_limite, peso_limite, ca_escudo);
      return;
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
      let resultado_moedas = reduzir_moedas(moeda_limite, escudo.preco);
      let resultado_peso = peso_limite - escudo.peso;
      if ( (resultado_moedas.valido) && (resultado_peso >= 0) ) {

        ca_escudo = true;
        let ataques_por_rodada = '';
        if (escudo.ataques_por_rodada > 0) {
          ataques_por_rodada = 'Ataques por rodada: ' + escudo.ataques_por_rodada + ', ';
        }
        personagem["Itens"].push(escudo.nome + ', ' + ataques_por_rodada + escudo.peso + 'kg, ' + escudo.preco.quantidade + ' ' + escudo.preco.moeda);
        if (escudo.detalhes.length > 0) {
          personagem["Detalhes"].push.apply(personagem["Detalhes"], escudo.detalhes);
        }
        callback(resultado_moedas.moedas, resultado_peso, ca_escudo);
        return;
      } else {
        callback(moeda_limite, peso_limite, ca_escudo);
        return;
      }
    }
  } else {
    debug(`Nenhum escudo incluído`);
    callback(moeda_limite, peso_limite, ca_escudo);
    return;
  }
}

function sortear_itens_armaduras(moeda_limite, peso_limite, classe, personagem, callback) {
  let grupo = ajustar_nome_grupo(classe);
  let armadura_mais_leve = { peso: 1000, validar: true };
  if (grupo == "Homem de Armas") {
    armadura_mais_leve.validar = false;
  }

  let texto_formulario_armadura = document.getElementById('texto-formulario-armadura');
  let texto_formulario_armadura_valor = texto_formulario_armadura.options[texto_formulario_armadura.selectedIndex].value;
  let armadura_selecionada = '';
  if ( (texto_formulario_armadura_valor != 'Todas') && (texto_formulario_armadura_valor != 'Nenhuma') ) {
    armadura_selecionada = texto_formulario_armadura_valor;
    debug(`Armadura selecionada: ${armadura_selecionada}`);
  } else {
    debug(`Nenhuma armadura selecionada`);
  }

  if (CLASSES[classe].armaduras.length > 0) {

    let sorteio_armadura = [];

    CLASSES[classe].armaduras.forEach((armadura, index_armadura) => {

      /*
        { nome: 'Corselete de Couro Simples', ca: 8, preco: { quantidade: 5, moeda: 'po' }, peso: 7.5 },
      */
      let moeda_descontada = reduzir_moedas(moeda_limite, armadura.preco);
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
          let nomes_armaduras = sorteio_armadura.map(e => e.nome);

          if (armadura_selecionada != '') {
            if (nomes_armaduras.includes(armadura_selecionada)) {
              index_sorteio = nomes_armaduras.indexOf(armadura_selecionada);
              debug(`Armadura selecionada e incluída: ${armadura_selecionada}`);
            } else {
              debug(`Armadura selecionada mas não foi incluída: ${armadura_selecionada}`);
            }
          }

          let armadura_sorteada = sorteio_armadura[index_sorteio];
          let moeda_descontada_final = reduzir_moedas(moeda_limite, armadura_sorteada.preco);
          let peso_descontado_final = peso_limite - armadura_sorteada.peso;
          personagem["Itens"].push(armadura_sorteada.nome + ', ' + armadura_sorteada.peso + 'kg, ' + armadura_sorteada.preco.quantidade + ' ' + armadura_sorteada.preco.moeda);
          callback(moeda_descontada_final.moedas, peso_descontado_final, armadura_sorteada.ca);
          return;

        } else {
          debug(`Nenhuma armadura incluída`);
          callback(moeda_limite, peso_limite, 10);
          return;
        }
      }
    });

  } else {
    debug(`Nenhuma armadura incluída`);
    callback(moeda_limite, peso_limite, 10);
    return;
  }
}

function restringir_armas(personagem, array_completo, array_restrito, callback) {
  let array_final = [];

  if ((array_restrito != undefined) && (array_restrito != null) && (array_restrito.length > 0)) {
    array_completo.forEach((item_completo, index_completo) => {
      array_restrito.forEach((item_restrito, index_restrito) => {

        if (item_completo == item_restrito) {
          array_final.push(item_completo);
        }

        if (index_restrito == (array_restrito.length - 1)) {
          if (index_completo == (array_completo.length - 1)) {
            callback(array_final);
            return;
          }
        }
      });
    });
  } else {
    callback(array_completo);
    return;
  }
}

function formatar_misseis(nome_missel, missel) {
  /*
  "Dardo Farpado": { quantidade: 20, preco: { quantidade: 20, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d3' },
  */
  return missel.quantidade + "x " + nome_missel + ", " +
        (missel.peso * missel.quantidade).toFixed(2) + "kg, " + missel.tamanho + ", " +
        missel.tipo + ", Velocidade " + missel.velocidade + ", Dano (P) " + missel.dano_p + ", Dano (MG) " + missel.dano_mg + ", Disparos/Rodada: " + missel.cadencia;
}

function formatar_arma(nome_arma, arma) {
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

function formatar_item(item) {
  let peso = '';
  if ( (item.peso != undefined) && (item.peso != 'undefined') && (item.peso != null) && (item.peso != 0) ) {
    peso = ", " + item.peso + "kg";
  }
  return item.nome + ", " + item.preco.quantidade + " " + item.preco.moeda + peso;
}

function sortear_itens_armas(moeda_limite, peso_limite, classe, raca, personagem, callback) {
  let itens_extras = [];
  let keys_armas = Object.keys(ARMAS);
  let armas_mais_fortes = [];
  let moeda_descontada_final = moeda_limite;
  let peso_descontado_final = peso_limite;
  let armas_ja_sorteadas = [];

  if (personagem["Classe"] == "Anacoreta") {
    if ( (personagem["Tendência"] == TENDENCIAS[0]) || (personagem["Tendência"] == TENDENCIAS[1]) ) {
      keys_armas = ["Mangual", "Martelo de Batalha", "Açoite", "Chicote", "Alvião", "Aprisionador", "Bordão", "Arco Curto", "Azagaia", "Lança de Cavalaria", "Funda", "Dardo", "Lança", "Clava", "Arpão", "Tridente", "Martelo", "Maça", "Maça-Estrela", "Zarabatana"];
    } else {
      keys_armas = ["Arcabuz", "Machado de Guerra", "Zarabatana", "Clava", "Adaga", "Punhal", "Dardo", "Mangual de Infantaria", "Mangual", "Maça de Infantaria", "Maça", "Alvião de Infantaria", "Alvião", "Machadinha", "Arpão", "Mangual de Cavalaria", "Maça de Cavalaria", "Alvião de Cavalaria", "Azagaia", "Faca", "Aprisionador", "Maça-Estrela", "Bordão", "Açoite", "Foice", "Funda", "Espada Bastarda", "Espada Larga", "Khopesh", "Espada Longa", "Cimitarra", "Espada Curta", "Martelo de Batalha", "Martelo", "Chicote", "Rapieira", "Flamberge", "Gládio", "Falchion", "Alfange", "Claymore", "Machete", "Sabre", "Zweihander", "Wakizashi", "Katana", "Tachi", "Tanto", "Shuriken", "Corrente", "Cajado Pequeno", "Bastão", "Laço"];
    }
  }

  restringir_armas(personagem, keys_armas, CLASSES[classe].armas, sorteio_armas_1 => {

    let armas_importantes = RACAS[raca].armas_importantes;
    if (classe == "Cigano") {
      armas_importantes.push("Adaga");
      armas_mais_fortes = [ {arma: 'Adaga', dano: 20} ];
    }

    restringir_armas(personagem, sorteio_armas_1, armas_importantes, sorteio_armas_2 => {
      restringir_armas(personagem, sorteio_armas_2, CLASSES[classe].armas_divindade, sorteio_armas_3 => {
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

        let texto_formulario_arma = document.getElementById('texto-formulario-arma');
        let texto_formulario_arma_valor = texto_formulario_arma.options[texto_formulario_arma.selectedIndex].value;
        let arma_escolhida_combo = '';
        if ( (texto_formulario_arma_valor != 'Todas') && sorteio_armas_3.includes(texto_formulario_arma_valor) ) {
          arma_escolhida_combo = texto_formulario_arma_valor;
        }

        /* Sortear arma */
        let quantidade_armas = Math.floor(Math.random() * 4) + 2;
        //debug("Quantidade de armas sorteadas: " + quantidade_armas);

        for (let qtde = 0; qtde < quantidade_armas; qtde++) {

          let index_sorteio = -1;
          let nome_arma = '';
          let arma = { preco: { quantidade: 10000, moeda: 'po' }, peso: 0, tamanho: '', tipo: '', velocidade: 0, dano_p: '', dano_mg: '', dano: 0, detalhes: [] };
          let arma_preco = { quantidade: 10000, moeda: 'po' };

          if ( (qtde == 0) && (arma_escolhida_combo != '') ) {
            index_sorteio = sorteio_armas_3.indexOf(arma_escolhida_combo);
            nome_arma = sorteio_armas_3[index_sorteio];
            arma = ARMAS[nome_arma];

            debug(`A arma escolhida ${arma_escolhida_combo} foi incluída na lista.`);

            arma_escolhida_combo = '';
          } else {
            if ( (qtde == 0) && (arma_escolhida_combo != '') ) {
              debug(`A arma escolhida ${arma_escolhida_combo} NÃO foi incluída na lista por restrições da ficha: ${sorteio_armas_3}`);
            }

            index_sorteio = Math.floor(Math.random() * sorteio_armas_3.length);
            nome_arma = sorteio_armas_3[index_sorteio];
            arma = ARMAS[nome_arma];
          }

          if ((arma == 'undefined') || (arma == undefined) || (arma == null) || (arma == '')) {
            error('A arma ' + nome_arma + ' não foi encontrada na lista de armas.');
          } else {
            arma_preco = arma.preco;
          }

          let moeda_descontada = reduzir_moedas(moeda_descontada_final, arma_preco);
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

            moeda_descontada_final = reduzir_moedas(moeda_descontada_final, arma.preco).moedas;
            peso_descontado_final = peso_descontado_final - arma.peso;
            personagem["Itens"].push(formatar_arma(nome_arma, arma));
            armas_ja_sorteadas.push(nome_arma);

            if (arma.detalhes.length > 0) {
              personagem["Detalhes"].push.apply(personagem["Detalhes"], arma.detalhes);
            }

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
              let nome_formatado = formatar_misseis("Flecha da Guerra", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( (nome_arma == "Arco Curto Composto") || (nome_arma == "Arco Curto") ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Flecha de Caça"];
              let nome_formatado = formatar_misseis("Flecha de Caça", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Zarabatana" ) {
              let missel = MISSEIS["Dardo Agulha"];
              let nome_formatado = formatar_misseis("Dardo Agulha", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Besta de Mão" ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Quadrelo de Mão"];
              let nome_formatado = formatar_misseis("Quadrelo de Mão", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Besta Pesada" ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Quadrelo Grande"];
              let nome_formatado = formatar_misseis("Quadrelo Grande", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( nome_arma == "Besta Leve" ) {
              itens_extras.push( "Aljava" );
              let missel = MISSEIS["Quadrelo Pequeno"];
              let nome_formatado = formatar_misseis("Quadrelo Pequeno", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if ( (nome_arma == "Funda") || (nome_arma == "Cajado-Funda") ) {
              let missel = MISSEIS["Chumbo de Funda"];
              let nome_formatado = formatar_misseis("Chumbo de Funda", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Arcabuz") {
              let missel = MISSEIS["Projéteis de Arcabuz"];
              let nome_formatado = formatar_misseis("Projéteis de Arcabuz", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Mosquete") {
              let missel = MISSEIS["Projéteis de Mosquete"];
              let nome_formatado = formatar_misseis("Projéteis de Mosquete", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Bacamarte") {
              let missel = MISSEIS["Projéteis de Bacamarte"];
              let nome_formatado = formatar_misseis("Projéteis de Bacamarte", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            } else if (nome_arma == "Caviler") {
              let missel = MISSEIS["Projéteis de Caviler"];
              let nome_formatado = formatar_misseis("Projéteis de Caviler", missel);
              personagem["Itens"].push(nome_formatado);
              moeda_descontada_final = reduzir_moedas(moeda_descontada_final, missel.preco).moedas;
              if (moeda_descontada_final < 0) moeda_descontada_final = 0;
              peso_descontado_final = peso_descontado_final - missel.peso;
              if (peso_descontado_final < 0) peso_descontado_final = 0;
            }
          }

          if (qtde == (quantidade_armas - 1)) {
            debug(`Armas roladas: ${armas_mais_fortes.map(e => e.arma)}`);
            callback(moeda_descontada_final, peso_descontado_final, armas_mais_fortes, itens_extras);
            return;
          }
        }

      });
    });
  });
}

function sortear_itens_comuns(moeda_limite, peso_limite, personagem, callback) {
  let moeda_descontada_final = moeda_limite;
  let peso_descontado_final = peso_limite;
  let itens_ja_sorteados = [];

  /* Sortear item */
  let quantidade_itens = Math.floor(Math.random() * 6) + 2;
  //debug("Quantidade de itens sorteados: " + quantidade_itens);
  for (let qtde = 0; qtde < quantidade_itens; qtde++) {

    let index_sorteio = Math.floor(Math.random() * ITENS.length);
    let item = ITENS[index_sorteio];

    let moeda_descontada = reduzir_moedas(moeda_descontada_final, item.preco);
    if ( (!itens_ja_sorteados.includes(item.nome)) && (moeda_descontada.valido) && (peso_descontado_final >= item.peso) ) {
      moeda_descontada_final = reduzir_moedas(moeda_descontada_final, item.preco).moedas;
      peso_descontado_final = peso_descontado_final - item.peso;
      personagem["Itens"].push(formatar_item(item));
      itens_ja_sorteados.push(item.nome);
    }

    if (qtde == (quantidade_itens - 1)) {
      callback(moeda_descontada_final, peso_descontado_final);
      return;
    }

  }
}

function sortear_itens_alimentos(moeda_limite, personagem, callback) {
  let moeda_descontada_final = moeda_limite;
  let itens_ja_sorteados = [];

  /* Sortear item */
  let quantidade_itens = Math.floor(Math.random() * 4) + 2;
  //debug("Quantidade de itens sorteados: " + quantidade_itens);
  for (let qtde = 0; qtde < quantidade_itens; qtde++) {

    let index_sorteio = Math.floor(Math.random() * ALIMENTOS.length);
    let item = ALIMENTOS[index_sorteio];

    let moeda_descontada = reduzir_moedas(moeda_descontada_final, item.preco);
    if ( (!itens_ja_sorteados.includes(item.nome)) && (moeda_descontada.valido) ) {
      moeda_descontada_final = reduzir_moedas(moeda_descontada_final, item.preco).moedas;
      personagem["Itens"].push(formatar_item(item));
      itens_ja_sorteados.push(item.nome);
    }

    if (qtde == (quantidade_itens - 1)) {
      callback(moeda_descontada_final);
      return;
    }

  }
}

function sortear_itens(classe, raca, personagem, callback) {
  let grupo = ajustar_nome_grupo(classe);

  if (CLASSES[classe]["Grupo"] == "Homem de Armas") {
    personagem["Dados Básicos"]["Moedas"] = (
      (Math.floor(Math.random() * 4) + 1) +
      (Math.floor(Math.random() * 4) + 1) +
      (Math.floor(Math.random() * 4) + 1) +
      (Math.floor(Math.random() * 4) + 1) +
      (Math.floor(Math.random() * 4) + 1)
    ) * 10;
  } else if (CLASSES[classe]["Grupo"] == "Arcano") {
    personagem["Dados Básicos"]["Moedas"] = ((Math.floor(Math.random() * 4) + 1) + 1) * 10;
  } else if (CLASSES[classe]["Grupo"] == "Sacerdote") {
    personagem["Dados Básicos"]["Moedas"] = (
      (Math.floor(Math.random() * 6) + 1) +
      (Math.floor(Math.random() * 6) + 1) +
      (Math.floor(Math.random() * 6) + 1)
    ) * 10;
  } else if (CLASSES[classe]["Grupo"] == "Psionicista") {
    personagem["Dados Básicos"]["Moedas"] = (
      (Math.floor(Math.random() * 4) + 1) +
      (Math.floor(Math.random() * 4) + 1) +
      (Math.floor(Math.random() * 4) + 1)
    ) * 10;
  } else if (CLASSES[classe]["Grupo"] == "Ladino") {
    personagem["Dados Básicos"]["Moedas"] = (
      (Math.floor(Math.random() * 6) + 1) +
      (Math.floor(Math.random() * 6) + 1)
    ) * 10;
  }

  /*
  debug("");
  debug("-------------------------------------------------------------------------");
  debug("Calcular itens para " + raca + " e " + classe);
  debug("Moedas sorteadas: " + personagem["Dados Básicos"]["Moedas"] + " po");
  debug("Peso sorteado: " + personagem["Habilidades"]["Força"]["Carga Permitida"]);
  */

  /* Vestimentas */
  let lista_vestimentas = VESTIMENTAS[personagem["Dados Básicos"]["Gênero"]];
  let vestimenta_sorteada = lista_vestimentas[Math.floor(Math.random() * lista_vestimentas.length)];
  personagem["Itens"].push(formatar_item(vestimenta_sorteada));

  /* Alocar Mochila */
  let moeda_limite = (personagem["Dados Básicos"]["Moedas"] - 2);
  let peso_limite = personagem["Habilidades"]["Força"]["Carga Permitida"] - 1;
  if (peso_limite < 0) { peso_limite = 0; }
  personagem["Itens"].push("Mochila, 2 po, 1kg");

  //debug("Moedas pós mochila: " + moeda_limite + " po");
  //debug("Peso pós mochila: " + peso_limite);

  /* Itens Específicos */
  let instrumento_bardo_nome = '';
  if (classe == "Ladrão") {
    let ferramenta_ladrao = ITENS[67];
    peso_limite = peso_limite - ferramenta_ladrao.peso;
    if (peso_limite < 0) { peso_limite = 0; }
    personagem["Itens"].push(formatar_item(ferramenta_ladrao));
  } else if (classe == "Bardo") {
    let instrumento_bardo = INSTRUMENTOS[Math.floor(Math.random() * INSTRUMENTOS.length)];
    instrumento_bardo_nome = instrumento_bardo.nome;
    peso_limite = peso_limite - instrumento_bardo.peso;
    if (peso_limite < 0) { peso_limite = 0; }
    personagem["Itens"].push(formatar_item(instrumento_bardo));
  } else if (classe == "Clérigo") {
    let simbolo_sagrado = ITENS[15];
    peso_limite = peso_limite - simbolo_sagrado.peso;
    if (peso_limite < 0) { peso_limite = 0; }
    personagem["Itens"].push(formatar_item(simbolo_sagrado));
  }

  sortear_itens_escudos(moeda_limite, peso_limite, classe, personagem, (resultado_moedas_1, resultado_peso_1, ca_escudo) => {
    //debug("Moedas pós escudo: " + resultado_moedas_1 + " po");
    //debug("Peso pós escudo: " + resultado_peso_1);
    sortear_itens_armaduras(resultado_moedas_1, resultado_peso_1, classe, personagem, (resultado_moedas_2, resultado_peso_2, ca_armadura) => {
      //debug("Moedas pós armadura: " + resultado_moedas_2 + " po");
      //debug("Peso pós armadura: " + resultado_peso_2);
      sortear_itens_armas(resultado_moedas_2, resultado_peso_2, classe, raca, personagem, (resultado_moedas_3, resultado_peso_3, armas_mais_fortes, itens_extras) => {
        //debug("Moedas pós armas: " + resultado_moedas_3 + " po");
        //debug("Peso pós armas: " + resultado_peso_3);
        sortear_itens_comuns(resultado_moedas_3, resultado_peso_3, personagem, (resultado_moedas_4, resultado_peso_4) => {
          //debug("Moedas pós itens: " + resultado_moedas_4 + " po");
          //debug("Peso pós itens: " + resultado_peso_4);
          sortear_itens_alimentos(resultado_moedas_4, personagem, (resultado_moedas_5) => {
            //debug("Moedas pós alimentos: " + resultado_moedas_5 + " po");

            let ajuste_ca = personagem["Habilidades"]["Destreza"]["Ajuste Defensivo"];
            let ca_final = ca_armadura + ajuste_ca;
            if (ca_escudo) {
              ca_final = ca_final - 1;
            }

            personagem["Dados Básicos"]["Categoria de Armadura"] = ca_final;
            personagem["Dados Básicos"]["Moedas"] = converter_po_em_moedas(resultado_moedas_5);
            personagem["Dados Básicos"]["Peso dos Equipamentos"] = (personagem["Habilidades"]["Força"]["Carga Permitida"] - resultado_peso_4).toFixed(2);

            callback(armas_mais_fortes);
            return;

          });
        });
      });
    });
  });
}

function adicionar_pericias_vistani(raca,personagem,callback) {
  if (raca == "Meio-Vistani") {
    if (CLANS[personagem["Linhagem"]].pericias.length > 0) {
      CLANS[personagem["Linhagem"]].pericias.forEach((pericia, index) => {
        personagem["Perícias"].push(formatar_pericia_comum(pericia));
        if (index == (CLANS[personagem["Linhagem"]].pericias.length - 1)) {
          callback();
          return;
        }
      });
    } else {
      callback();
      return;
    }
  } else {
    callback();
    return;
  }
}

function sortear_pericias(armas_mais_fortes, classe, raca, personagem, callback) {

  /* Perícias fixas */
  if (classe == "Bardo") {
    personagem["Perícias"].push(formatar_pericia_comum(PERICIAS["Ladino"][9]));
    personagem["Perícias"].push(formatar_pericia_comum(PERICIAS["Ladino"][10]));
  } else if (classe == "Ranger") {
    personagem["Perícias"].push(formatar_pericia_comum(PERICIAS["Homem de Armas"][13]));
  }

  if (raca == "Tabaxi") {
    personagem["Perícias"].push(formatar_pericia_comum(PERICIAS["Ladino"][14]));
  }

  adicionar_pericias_vistani(raca,personagem,()=>{
    let qtde_pericias = personagem["Pontos de Perícia"]["Perícias Comuns Inicial"];

    let grupo = ajustar_nome_grupo(classe);

    if (raca == "Meio-Vistani") {
      qtde_pericias = qtde_pericias - CLANS[personagem["Linhagem"]].reduzir_pontos_pericias;
    }

    let qtde_pericias_gerais = Math.floor(Math.random() * 2);
    let contador_pericias = 0;
    let pericias_sorteadas = [];

    let texto_formulario_pericia = document.getElementById('texto-formulario-pericia');
    let texto_formulario_pericia_valor = texto_formulario_pericia.options[texto_formulario_pericia.selectedIndex].value;
    let texto_formulario_pericia_grupo = texto_formulario_pericia.options[texto_formulario_pericia.selectedIndex].getAttribute("grupo");
    let texto_formulario_pericia_texto = texto_formulario_pericia.options[texto_formulario_pericia.selectedIndex].innerHTML;
    let texto_formulario_pericia_index = PERICIAS[texto_formulario_pericia_grupo].findIndex(p => p.nome == texto_formulario_pericia_valor);

    if (texto_formulario_pericia_valor != 'Todas') {
      debug('Perícia selecionada: ' + texto_formulario_pericia_texto);
    }

    while (qtde_pericias > 0) {

      let pericia_sorteada = undefined;

      if (texto_formulario_pericia_valor != 'Todas') {
        /* Pegar perícia selecionada */

        pericia_sorteada = JSON.parse(JSON.stringify(PERICIAS[texto_formulario_pericia_grupo][texto_formulario_pericia_index]));

        if ( (texto_formulario_pericia_grupo != 'Geral') && (CLASSES[classe]["Grupo"] != texto_formulario_pericia_grupo) ) {
          pericia_sorteada.pontos = pericia_sorteada.pontos + 1;
        }

        texto_formulario_pericia_valor = 'Todas';
        /* Pegar perícia selecionada */
      } else {
        /* Sortear perícia */
        if (contador_pericias < qtde_pericias_gerais) {
          /* Perícias Gerais */
          let index_pericia_geral = Math.floor(Math.random() * PERICIAS["Geral"].length);
          pericia_sorteada = PERICIAS["Geral"][index_pericia_geral];
        } else {
          /* Perícias do Grupo */
          let index_pericia_grupo = Math.floor(Math.random() * PERICIAS[CLASSES[classe]["Grupo"]].length);
          pericia_sorteada = PERICIAS[CLASSES[classe]["Grupo"]][index_pericia_grupo];
        }
        /* Sortear perícia */
      }

      /*
        { nome: "Lutar no Escuro", pontos: 2, habilidade_relevante: '', modificador: 0 },
      */
      if ( (pericia_sorteada != undefined) && ( (qtde_pericias - pericia_sorteada.pontos) >= 0 ) && (!pericias_sorteadas.includes(pericia_sorteada.nome)) ) {
        qtde_pericias = qtde_pericias - pericia_sorteada.pontos;
        contador_pericias = contador_pericias + 1;
        pericias_sorteadas.push(pericia_sorteada.nome);
        personagem["Perícias"].push(formatar_pericia_comum(pericia_sorteada));
      }

      if ( qtde_pericias == 0 ) {

        personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] = personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] + " (0 pontos restantes)";
        //debug('Perícias escolhidas');

        /* Perícias com Armas */
        let qtde_pericias_armas = personagem["Pontos de Perícia"]["Perícias Armas Inicial"];
        let procurar_pericias_armas = true;

        if (armas_mais_fortes.length == 0) {
            //debug('Nenhuma perícia de arma foi selecionada');
            personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = qtde_pericias_armas + " (" + qtde_pericias_armas + " pontos restantes)";
            callback();
            return;
        } else {

          let index_arma_mais_forte = 0;
          let possui_especializacao = false;
          if ( (classe == "Guerreiro") || (classe == "Cigano") || (classe == "Vingador") ) {
            possui_especializacao = (Math.floor(Math.random() * 10) <= 7);
          }

          while ( (procurar_pericias_armas) && (qtde_pericias_armas > 0) && (index_arma_mais_forte < armas_mais_fortes.length) ) {

            let arma_da_vez = armas_mais_fortes[index_arma_mais_forte].arma;

            if ( (possui_especializacao) && (index_arma_mais_forte == 0) ) {
              let texto_especializacao = "Especialista em " + arma_da_vez;
              let texto_especialista_arco = 'Especialistas em arcos ou bestas obtém uma categoria de alcance adicional: tiro certo. A distância de tiro certo para arcos vai de 2 a 10 mestros, e para as bestas vai de 2 a 20 metros. Nesta distância, o personagem obtém um bônus de +2 nas jogadas de ataque. Se o personagem possuir uma flecha ou seta preparada, seu primeiro tiro pode ser feito no início da rodada (antes da iniciativa).';
              let texto_especialista_meele = 'Especialistas em arma de combate corpo a corpo ganham bônus de +1 para as jogadas de ataque e +2 para as jogadas de dano.';

              if ( (arma_da_vez == "Arco Longo Composto") || (arma_da_vez == "Arco Curto Composto") || (arma_da_vez == "Arco Longo") || (arma_da_vez == "Arco Curto") ) {
                qtde_pericias_armas = qtde_pericias_armas - 3;
                personagem["Detalhes"].push(texto_especialista_arco);
                texto_especializacao = texto_especializacao + ". +2 Ataque (de 2 a 10 metros)";
              } else {
                qtde_pericias_armas = qtde_pericias_armas - 2;
                if (arma_da_vez == "Besta Pesada") {
                  personagem["Detalhes"].push(texto_especialista_arco);
                  texto_especializacao = texto_especializacao + ". +2 Ataque (de 2 a 20 metros), 1/2 ataques por rodada";
                } else if (arma_da_vez == "Besta Leve") {
                  personagem["Detalhes"].push(texto_especialista_arco);
                  texto_especializacao = texto_especializacao + ". +2 Ataque (de 2 a 20 metros), 1/1 ataques por rodada";
                } else if (arma_da_vez == "Besta de Mão") {
                  personagem["Detalhes"].push(texto_especialista_arco);
                } else if (arma_da_vez == "Dardo") {
                  personagem["Detalhes"].push(texto_especialista_meele);
                  texto_especializacao = texto_especializacao + ". +1 Ataque, +2 Dano, 4/1 ataques por rodada";
                } else if (arma_da_vez == "Adaga") {
                  personagem["Detalhes"].push(texto_especialista_meele);
                  if (classe == "Guerreiro") {
                    texto_especializacao = texto_especializacao + ". +1 Ataque, +2 Dano, 3/2 ataques por rodada. Se arremessada, realiza 3/1 ataques por rodada";
                  } else if (classe == "Cigano") {
                    texto_especializacao = texto_especializacao + ". +1 Ataque, +2 Dano, se arremessada ou ataque corpo-a-corpo, realiza 1 ataque por rodada";
                  }
                } else {
                  personagem["Detalhes"].push(texto_especialista_meele);
                  texto_especializacao = texto_especializacao + ". +1 Ataque, +2 Dano, 3/2 ataques por rodada";
                }
              }

              personagem["Especialização"].push(texto_especializacao);
              personagem["Detalhes"].push('Guerreiros e Vingadores especialistas ganham ataques extras por rodada. Esta regra não vale para especialistas em arcos. No nível 1, ele tem 3/2 ataques por rodada com armas corpo a corpo; 1/1 com bestas leves; 1/2 com bestas pesadas; 3/1 com adagas de arremesso; 4/1 com dardos; e 3/2 com outras armas de arremesso. Vide tabela 35 na página 71.');
              possui_especializacao = false;
            } else {
              qtde_pericias_armas = qtde_pericias_armas - 1;
              personagem["Perícias"].push("Perito em " + arma_da_vez);
            }

            index_arma_mais_forte = index_arma_mais_forte + 1;

            if ( (qtde_pericias_armas == 0) || (index_arma_mais_forte >= armas_mais_fortes.length) ) {
              //debug('Armas escolhidas');
              procurar_pericias_armas = false;
              personagem["Detalhes"].push('Personagens com perícias ou especializações em armas possuem um bônus que reduz pela metade (arredondando para cima) a penalidade para as armas similares. Exemplo: um perito em espeda curta tem reduz sua penalidade pela metade ao usar uma espada longa.');
              personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = personagem["Pontos de Perícia"]["Perícias Armas Inicial"] + " (" + qtde_pericias_armas + " pontos restantes)";
              callback();
              return;
            }
          }

        }

        /* Perícias com Armas */

      }
    }
  });

}

// MAGIAS_ARCANAS
function sortear_magias(classe, personagem, callback) {
  let grupo = ajustar_nome_grupo(classe);
  if (grupo == "Sacerdote") {

    // MAGIAS DIVINAS
    let qtde_magias = personagem["Dados Básicos"]["Magias Divinas por Círculo"]['1º Círculo'];

    /*
      AQUI
      Retirar combo de Esfera
      Talvez colocar combo de divindade
    */

    let qtde = 0;
    let esferas = [];

    while (qtde < qtde_magias) {

      if (classe == "Anacoreta") {
        if (personagem["Tendência"] == TENDENCIAS[1]) {
          // Ordeiro
          esferas = ["Todas", "Feitiço", "Adivinhação", "Guarda", "Cura", "Proteção", "Defesa", "Lei", "Clima" ];
        } else if (personagem["Tendência"] == TENDENCIAS[0]) {
          // Justo
          esferas = ["Todas", "Feitiço", "Adivinhação", "Guarda", "Cura", "Proteção", "Defesa", "Lei", "Solar"];
        } else {
          // Neutro
          esferas = ["Todas", "Feitiço", "Adivinhação", "Guarda", "Cura", "Proteção", "Defesa", "Lei", "Caos"];
        }

        let index_esfera = Math.floor(Math.random() * esferas.length);
        let esfera = esferas[index_esfera];
        if (MAGIAS_DIVINAS[esfera].length > 0) {
          let index_magia = Math.floor(Math.random() * MAGIAS_DIVINAS[esfera].length);
          let magia = MAGIAS_DIVINAS[esfera][index_magia];
          if (!personagem["Magias"].includes(magia)) {
            personagem["Magias"].push(magia);
            qtde++
          }
        }

      } else {
        esferas = CLASSES[classe].esferas;
        let index_esfera = Math.floor(Math.random() * CLASSES[classe].esferas.length);
        let esfera = CLASSES[classe].esferas[index_esfera];
        if (MAGIAS_DIVINAS[esfera].length > 0) {
          let index_magia = Math.floor(Math.random() * MAGIAS_DIVINAS[esfera].length);
          let magia = MAGIAS_DIVINAS[esfera][index_magia];
          if (!personagem["Magias"].includes(magia)) {
            personagem["Magias"].push(magia);
            qtde++
          }
        }
      }

      if (qtde == qtde_magias) {
        personagem["Dados Básicos"]["Esferas"] = esferas;
        callback();
        return;
      }
    }
    // MAGIAS DIVINAS

  } else if (CLASSES[classe]["Grupo"] == "Arcano") {

    // MAGIAS ARCANAS
    let texto_formulario_escola_magia = document.getElementById('texto-formulario-escola-magia');
    let texto_formulario_escola_magia_value = texto_formulario_escola_magia.value;
    let forcar_magia = '';
    if (texto_formulario_escola_magia_value != 'Todas') {
      forcar_magia = texto_formulario_escola_magia_value;
    }

    let qtde_magias = personagem["Dados Básicos"]["Magias Arcanas por Círculo"];

    let qtde = 0;

    if (classe != "Conjurador") {
      personagem["Magias"].push("Ler Magias");
      qtde++;

      personagem["Magias"].push("Detectar Magia");
      qtde++;
    }

    while (qtde < qtde_magias) { // FOR Sortear magias

      if (classe != "Mago") {
        // Especialista ou Elementalista

        let lista_sorteio_magia = MAGIAS_ARCANAS[0][classe];
        if (Math.floor(Math.random() * 2) > 0) {
          let lista_sorteio_keys_escolas = Object.keys(MAGIAS_ARCANAS[0]);
          let lista_sorteio_escola = lista_sorteio_keys_escolas[Math.floor(Math.random() * lista_sorteio_keys_escolas.length)];
          let lista_sorteio_classes_opostas = ESCOLAS_ARCANAS_OPOSTAS[classe].map(escola => LISTA_ESCOLAS_ARCANAS_ESCOLA_PARA_MAGO[escola]);

          if (!lista_sorteio_classes_opostas.includes(lista_sorteio_escola)) {
            lista_sorteio_magia = MAGIAS_ARCANAS[0][lista_sorteio_escola];
          }
        }

        let index_magia = Math.floor(Math.random() * lista_sorteio_magia.length);
        let magia = lista_sorteio_magia[index_magia];

        if (forcar_magia != '') {
          magia = forcar_magia;
          forcar_magia = '';
        }

        if (!personagem["Magias"].includes(magia)) {
          personagem["Magias"].push(magia);
          qtde++;
        }

        // Especialista ou Elementalista
      } else {
        // Mago
        let keys_magias = Object.keys(MAGIAS_ARCANAS[0]);
        let index_escola = keys_magias[Math.floor(Math.random() * keys_magias.length)];
        let index_magia = Math.floor(Math.random() * MAGIAS_ARCANAS[0][index_escola].length);
        let magia = MAGIAS_ARCANAS[0][index_escola][index_magia];

        if (forcar_magia != '') {
          magia = forcar_magia;
          forcar_magia = '';
        }

        if (!personagem["Magias"].includes(magia)) {
          personagem["Magias"].push(magia);
          qtde++;
        }
        // Mago
      }

      if (qtde == qtde_magias) {
        debug(`Magias sorteadas: ${personagem["Magias"]}`);

        callback();
        return;
      }

    } // FOR Sortear magias

    // MAGIAS ARCANAS

  } else {
    callback();
    return;
  }
}

function obter_valores_setados_atributos(id,atributo) {
  let campo = document.getElementById(id);
  let valor = campo.value;
  if ((valor == undefined) || (valor == 'undefined') || (valor == null) || (valor == '')) {
    valor = 0;
  } else {
    valor = parseInt(valor);
  }
  let retorno = { usar: (valor > 0), valor: valor };
  return retorno;
}

function obter_todos_atributos() {
  let retorno = {};
  retorno['forca'] = obter_valores_setados_atributos('texto-formulario-atributo-forca','Força');
  retorno['destreza'] = obter_valores_setados_atributos('texto-formulario-atributo-destreza','Destreza');
  retorno['constituicao'] = obter_valores_setados_atributos('texto-formulario-atributo-constituicao','Constituição');
  retorno['inteligencia'] = obter_valores_setados_atributos('texto-formulario-atributo-inteligencia','Inteligência');
  retorno['sabedoria'] = obter_valores_setados_atributos('texto-formulario-atributo-sabedoria','Sabedoria');
  retorno['carisma'] = obter_valores_setados_atributos('texto-formulario-atributo-carisma','Carisma');
  return retorno;
}

function sortear_dados_basicos(personagem, callback) {
  let classe = ajustar_nome_classe(personagem);
  let raca = ajustar_nome_raca(personagem);
  let grupo = ajustar_nome_grupo(classe);
  personagem["Dados Básicos"]["Grupo"] = CLASSES[classe]["Grupo"];

  /* Ajustes de Resistências */
  personagem["Detalhes"].push('Para realizar um teste de Perícias, adicione o modificador à Habilidade apropriada. Jogue 1d20, se o resultado for menor ou igual, houve sucesso (20 sempre é uma falha).');

  personagem["Detalhes"].push('Aplique o Ajuste Defensivo de Destreza ao lance 1d20 de Resistência contra ataques em que é possível esquivar-se (raios, rochas, etc).');
  if ( (raca == "Elfo") || (raca == "Gnomo") || (raca == "Meio-Elfo") || (raca == "Humano") ) {
    personagem["Detalhes"].push('Aplique a Resistência contra Veneno (Constituição) ao lance 1d20 de Resistência contra venenos.');
  }
  personagem["Detalhes"].push('Aplique o Ajuste de Defesa Contra Magia (Sabedoria) ao lance 1d20 de Resistência contra magias que atacam a mente.');

  let generos = [ 'Masculino' , 'Feminino' ];
  let genero = generos[Math.floor(Math.random() * 2)];
  personagem["Dados Básicos"]["Gênero"] = genero;

  let texto_formulario_nome = document.getElementById('texto-formulario-nome').value;
  if ( (texto_formulario_nome) && (texto_formulario_nome != '') ) {
    personagem["Nome"] = texto_formulario_nome;
  } else {
    let lista_primeiro_nome = NOMES_RACAS[raca][personagem["Dados Básicos"]["Gênero"]];
    let lista_sobre_nome = NOMES_RACAS[raca]["Sobrenome"];
    personagem["Nome"] = lista_primeiro_nome[Math.floor(Math.random() * lista_primeiro_nome.length)] + " " + lista_sobre_nome[Math.floor(Math.random() * lista_sobre_nome.length)];
  }

  let ajuste_altura = RACAS[raca].altura[genero].maximo - RACAS[raca].altura[genero].minimo;
  let altura = (Math.random() * ajuste_altura) + RACAS[raca].altura[genero].minimo;
  personagem["Dados Básicos"]["Altura"] = altura.toFixed(2);

  /* Idade */
  let texto_formulario_idade = document.getElementById('texto-formulario-idade');
  let idade = texto_formulario_idade.value;

  if ( isInt(idade) ) {
    debug('Idade definida pelo usuário');
    idade = parseInt(idade);
      console.log();

    if (idade < RACAS[raca].idade.minimo) {
      idade = RACAS[raca].idade.minimo;
    }
    if (idade > RACAS[raca].idade.maximo) {
      idade = RACAS[raca].idade.maximo;
    }
  } else {
    debug('Idade rolada');
    let ajuste_idade = RACAS[raca].idade.maximo - RACAS[raca].idade.minimo;
    idade = Math.floor(Math.random() * ajuste_idade) + RACAS[raca].idade.minimo;
  }

  debug(`Idade: ${idade}`);

  personagem["Dados Básicos"]["Idade"] = idade;

  let ajuste_peso = RACAS[raca].peso[genero].maximo - RACAS[raca].peso[genero].minimo;
  let peso = (Math.random() * ajuste_peso) + RACAS[raca].peso[genero].minimo;
  personagem["Dados Básicos"]["Peso"] = peso.toFixed(2);

  personagem["Detalhes"].push.apply(personagem["Detalhes"], RACAS[raca].detalhes);

  personagem["Dados Básicos"]["Próximo Nível"] = CLASSES[classe]["Próximo Nível"];
  personagem["Dados Básicos"]["XP Extra"] = CLASSES[classe].xp_extra(personagem);

  if (raca == "Meio-Vistani") {
    personagem["Detalhes"].push.apply(personagem["Detalhes"], CLANS[personagem["Linhagem"]].detalhes);
  }

  let base_movimentacao = 0;

  if (personagem["Raça"].indexOf('Halfling') > -1) {

    base_movimentacao = 6;

    let detalheRobusto = 'Qualquer Halfling Robusto puro tem 15% de chance de ter uma infravisão normal, até 20 metros.';
    let detalheNaoRobustos = 'Halflings que não são Robustos puros, tem 25% de chance de ter uma infravisão limitada, até 10 metros.';
    let resultadoDado = 0;

    if (personagem["Raça"] == 'Halfling Robustos') {

      personagem["Detalhes"].push('Halflings com sangue Robusto podem notar o desnível de uma passagem com 75% de precisão (1-3 em 1d4).');
      personagem["Detalhes"].push('Halflings com sangue Robusto podem determinar a direção com 50% de eficiência (1-3 em 1d6).');

      resultadoDado = Math.floor(Math.random() * 100);
      if (resultadoDado < 15) {
        personagem["Detalhes"].push(detalheRobusto);
        personagem["Dados Básicos"]["Infravisão"] = '20 metros no escuro';
      } else {
        resultadoDado = Math.floor(Math.random() * 100);
        if (resultadoDado < 25) {
          personagem["Detalhes"].push(detalheNaoRobustos);
          personagem["Dados Básicos"]["Infravisão"] = '10 metros no escuro';
        }
      }
    } else {
      resultadoDado = Math.floor(Math.random() * 100);
      if (resultadoDado < 25) {
        personagem["Detalhes"].push(detalheNaoRobustos);
        personagem["Dados Básicos"]["Infravisão"] = '10 metros no escuro';
      }
    }
  } else if (raca == "Anão") {
    personagem["Dados Básicos"]["Infravisão"] = '20 metros no escuro';
    base_movimentacao = 6;
  } else if (raca == "Elfo") {
    personagem["Dados Básicos"]["Infravisão"] = '20 metros no escuro';
    base_movimentacao = 12;
  } else if (raca == "Gnomo") {
    personagem["Dados Básicos"]["Infravisão"] = '20 metros no escuro';
    base_movimentacao = 6;
  } else if (raca == "Meio-Elfo") {
    personagem["Dados Básicos"]["Infravisão"] = '20 metros no escuro';
    base_movimentacao = 12;
  } else if (raca == "Humano") {
    base_movimentacao = 12;
  } else if (raca == "Tabaxi") {
    base_movimentacao = 14;
  }

  /* Movimentação */
  personagem["Movimentação"]["Taxa-Base"] = base_movimentacao;
  personagem["Movimentação"]["Em campo aberto"] = (base_movimentacao * 9);
  personagem["Movimentação"]["Correndo"] = (personagem["Movimentação"]["Em campo aberto"] * 2);
  personagem["Movimentação"]["Em dungeons"] = Math.floor(personagem["Movimentação"]["Em campo aberto"] / 3);
  personagem["Movimentação"]["Em combates"] = Math.floor(personagem["Movimentação"]["Em dungeons"] / 2);
  personagem["Movimentação"]["Investida"] = Math.floor(personagem["Movimentação"]["Em combates"] * 1.5);
  personagem["Movimentação"]["Natação"] = Math.floor(personagem["Movimentação"]["Em campo aberto"] / 2);
  if (classe == "Ladrão") {
    personagem["Movimentação"]["Escalada (Irregular, Seca)"] = (base_movimentacao * 60);
  } else {
    if (raca == "Tabaxi") {
      personagem["Movimentação"]["Escalada (Irregular, Seca)"] = (base_movimentacao * 35);
    } else {
      personagem["Movimentação"]["Escalada (Irregular, Seca)"] = (base_movimentacao * 30);
    }
  }
  personagem["Movimentação"]["Em campo aberto"] = personagem["Movimentação"]["Em campo aberto"] + "m";
  personagem["Movimentação"]["Correndo"] = personagem["Movimentação"]["Correndo"] + "m";
  personagem["Movimentação"]["Em dungeons"] = personagem["Movimentação"]["Em dungeons"] + "m";
  personagem["Movimentação"]["Em combates"] = personagem["Movimentação"]["Em combates"] + "m";
  personagem["Movimentação"]["Investida"] = personagem["Movimentação"]["Investida"] + "m";
  personagem["Movimentação"]["Natação"] = personagem["Movimentação"]["Natação"] + "m";
  personagem["Movimentação"]["Escalada (Irregular, Seca)"] = personagem["Movimentação"]["Escalada (Irregular, Seca)"] + "cm";

  /* Ajustes atributos */
  let forca = personagem["Habilidades"]["Força"]["Valor da Habilidade"];
  let forca_extraordinaria = 0;
  if ( (forca == 18) && (personagem["Raça"].indexOf('Halfling') == -1) ) {
    forca_extraordinaria = Math.floor(Math.random() * 100) + 1;
    personagem["Habilidades"]["Força"]["Força Extraordinária"] = forca_extraordinaria;
  }
  personagem["Habilidades"]["Força"]["Chance de Acertar"] = atributos_forca("Chance de Acertar", forca, forca_extraordinaria);
  personagem["Habilidades"]["Força"]["Ajuste de Dano"] = atributos_forca("Ajuste de Dano", forca, forca_extraordinaria);
  personagem["Habilidades"]["Força"]["Carga Permitida"] = atributos_forca("Carga Permitida", forca, forca_extraordinaria);
  personagem["Habilidades"]["Força"]["Sustentação"] = atributos_forca("Sustentação", forca, forca_extraordinaria);
  personagem["Habilidades"]["Força"]["Abrir Portas"] = atributos_forca("Abrir Portas", forca, forca_extraordinaria);
  personagem["Habilidades"]["Força"]["Barras/Portais"] = atributos_forca("Barras/Portais", forca, forca_extraordinaria);

  let destreza = personagem["Habilidades"]["Destreza"]["Valor da Habilidade"];
  personagem["Habilidades"]["Destreza"]["Ajuste de Reação"] = atributos_destreza("Ajuste de Reação", destreza);
  personagem["Habilidades"]["Destreza"]["Ataque à Distância"] = atributos_destreza("Ataque à Distância", destreza);
  personagem["Habilidades"]["Destreza"]["Ajuste Defensivo"] = atributos_destreza("Ajuste Defensivo", destreza);
  personagem["Dados Básicos"]["Teste de Surpresa"] = "Até 3 em 1d10";
  if (personagem["Habilidades"]["Destreza"]["Ajuste de Reação"] < 0) {
    personagem["Dados Básicos"]["Teste de Surpresa"] = personagem["Dados Básicos"]["Teste de Surpresa"] + personagem["Habilidades"]["Destreza"]["Ajuste de Reação"];
  } else if (personagem["Habilidades"]["Destreza"]["Ajuste de Reação"] > 0) {
    personagem["Dados Básicos"]["Teste de Surpresa"] = personagem["Dados Básicos"]["Teste de Surpresa"] + "+" + personagem["Habilidades"]["Destreza"]["Ajuste de Reação"];
  }

  let constituicao = personagem["Habilidades"]["Constituição"]["Valor da Habilidade"];
  let ajuste_pontos_de_vida = atributos_constituicao("Ajuste dos Pontos de Vida", constituicao, classe);
  personagem["Habilidades"]["Constituição"]["Ajuste dos Pontos de Vida"] = ajuste_pontos_de_vida;
  personagem["Habilidades"]["Constituição"]["Colapso"] = atributos_constituicao("Colapso", constituicao, classe);
  personagem["Habilidades"]["Constituição"]["Chance de Ressurreição"] = atributos_constituicao("Chance de Ressurreição", constituicao, classe);
  personagem["Habilidades"]["Constituição"]["Resistência contra Veneno"] = atributos_constituicao("Resistência contra Veneno", constituicao, classe);
  personagem["Habilidades"]["Constituição"]["Regeneração"] = atributos_constituicao("Regeneração", constituicao, classe);

  let vida = CLASSES[classe].dado_de_vida;
  if (!document.getElementById('texto-formulario-vida').checked) {
    vida = Math.floor(Math.random() * CLASSES[classe].dado_de_vida) + 1;
  }

  if (constituicao == 20) {
    if (vida == 1) {
      vida = 2;
    }
  } else if ( (constituicao >= 21) && (constituicao <= 22) ) {
    if ( (vida >= 1) && (vida <= 2) ) {
      vida = 3;
    }
  } else if ( (constituicao >= 23) && (constituicao <= 25) ) {
    if ( (vida >= 1) && (vida <= 3) ) {
      vida = 4;
    }
  }
  personagem["Dados Básicos"]["Pontos de Vida"] = vida + ajuste_pontos_de_vida;

  if (constituicao == 20) {
    personagem["Detalhes"].push("Todos os resultados de 1 nos Dados de Vida são considerados como 2.");
  } else if ( (constituicao >= 21) && (constituicao <= 22) ) {
    personagem["Detalhes"].push("Todos os resultados de 1 e 2 nos Dados de Vida são considerados como 3.");
  } else if ( (constituicao >= 23) && (constituicao <= 25) ) {
    personagem["Detalhes"].push("Todos os resultados de 1, 2 e 3 nos Dados de Vida são considerados como 4.");
  }

  let inteligencia = personagem["Habilidades"]["Inteligência"]["Valor da Habilidade"];
  let numero_de_linguas = atributos_inteligencia("Número de Línguas", inteligencia);
  personagem["Habilidades"]["Inteligência"]["Número de Línguas"] = numero_de_linguas;
  personagem["Habilidades"]["Inteligência"]["Círculo de Magia"] = atributos_inteligencia("Círculo de Magia", inteligencia);
  personagem["Habilidades"]["Inteligência"]["Chance de Aprender Magia"] = atributos_inteligencia("Chance de Aprender Magia", inteligencia);
  personagem["Habilidades"]["Inteligência"]["Número Máx Magias/Círculo"] = atributos_inteligencia("Número Máx Magias/Círculo", inteligencia);
  personagem["Habilidades"]["Inteligência"]["Imunidade a Magias"] = atributos_inteligencia("Imunidade a Magias", inteligencia);

  acrescentar_novas_linguas(personagem, raca, numero_de_linguas, (numero_de_linguas) => {

    let sabedoria = personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"];
    personagem["Habilidades"]["Sabedoria"]["Ajuste de Defesa Contra Magia"] = atributos_sabedoria("Ajuste de Defesa Contra Magia", sabedoria);
    personagem["Habilidades"]["Sabedoria"]["Magias Extras"] = atributos_sabedoria("Magias Extras", sabedoria);
    personagem["Habilidades"]["Sabedoria"]["Chance da Magia Falhar"] = atributos_sabedoria("Chance da Magia Falhar", sabedoria);
    personagem["Habilidades"]["Sabedoria"]["Imunidade à Magia"] = atributos_sabedoria("Imunidade à Magia", sabedoria);

    let carisma = personagem["Habilidades"]["Carisma"]["Valor da Habilidade"];
    personagem["Habilidades"]["Carisma"]["Nº Máximo de aliados"] = atributos_carisma("Nº Máximo de aliados", carisma);
    personagem["Habilidades"]["Carisma"]["Fator de Lealdade"] = atributos_carisma("Fator de Lealdade", carisma);
    personagem["Habilidades"]["Carisma"]["Ajuste de reação"] = atributos_carisma("Ajuste de reação", carisma);


    if (CLASSES[classe]["Grupo"] == "Homem de Armas") {
      personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = 4;
      personagem["Pontos de Perícia"]["Perícias Armas Nº Níveis"] = 3;
      personagem["Pontos de Perícia"]["Perícias Armas Semelhantes"] = -1;
      personagem["Pontos de Perícia"]["Perícias Armas Penalidades"] = -2;
      personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] = 3 + numero_de_linguas;
      personagem["Pontos de Perícia"]["Perícias Comuns Nº Níveis"] = 3;

      personagem["Resistência"]["Paralisação, Veneno ou Morte por Magia"] = 14;
      personagem["Resistência"]["Bastão, Cajado ou Varinha"] = 16;
      personagem["Resistência"]["Petrificação ou Transformação"] = 15;
      personagem["Resistência"]["Sopro-de-Dragão"] = 17;
      personagem["Resistência"]["Magia"] = 17;

    } else if (CLASSES[classe]["Grupo"] == "Arcano") {
      personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = 1;
      personagem["Pontos de Perícia"]["Perícias Armas Nº Níveis"] = 6;
      personagem["Pontos de Perícia"]["Perícias Armas Semelhantes"] = -3;
      personagem["Pontos de Perícia"]["Perícias Armas Penalidades"] = -5;
      personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] = 4 + numero_de_linguas;
      personagem["Pontos de Perícia"]["Perícias Comuns Nº Níveis"] = 3;

      personagem["Resistência"]["Paralisação, Veneno ou Morte por Magia"] = 14;
      personagem["Resistência"]["Bastão, Cajado ou Varinha"] = 11;
      personagem["Resistência"]["Petrificação ou Transformação"] = 13;
      personagem["Resistência"]["Sopro-de-Dragão"] = 15;
      personagem["Resistência"]["Magia"] = 12;

      if (classe == "Mago") {
        personagem["Dados Básicos"]["Magias Arcanas por Círculo"] = 6;
        personagem["Dados Básicos"]["Escolas de Magia"] = ['Todas'];
        personagem["Dados Básicos"]["Escolas Opostas"] = [];
        personagem["Dados Básicos"]["Escolas Adjacentes"] = [];
      } else if ( (classe == "Elementalista Ar") || (classe == "Elementalista Terra") || (classe == "Elementalista Água") || (classe == "Elementalista Fogo") ) {
        let escolas_elementais = Object.keys(MAGIAS_ELEMENTAIS);
        let index_escolas_elementais = Math.floor(Math.random() * escolas_elementais.length);
        let escola_elemental = escolas_elementais[index_escolas_elementais];
        personagem["Dados Básicos"]["Escolas de Magia"] = [ escola_elemental ];
        personagem["Dados Básicos"]["Escolas Opostas"] = MAGIAS_ELEMENTAIS[escola_elemental]["Escolas Opostas"];
        personagem["Dados Básicos"]["Escolas Adjacentes"] = MAGIAS_ELEMENTAIS[escola_elemental]["Escolas Adjacentes"];
        personagem["Dados Básicos"]["Magias Arcanas por Círculo"] = 7;
      } else if (classe == "Arcanista") {
        personagem["Dados Básicos"]["Magias Arcanas por Círculo"] = 7;
        personagem["Dados Básicos"]["Escolas de Magia"] = CLASSES[classe].escola;
        personagem["Dados Básicos"]["Escolas Opostas"] = ESCOLAS_ARCANAS_OPOSTAS[classe];
        personagem["Dados Básicos"]["Escolas Adjacentes"] = ['Conjuração/Convocação', 'Abjuração'];

        personagem["Detalhes"].push('Os Arcanista podem usar o Poder da Fé para comandar (no caso de personagens malignos) ou afastar (no caso dos benignos) criaturas mortas-vivas como se fossem clérigos. Os jogadores que estiverem representando arcanistas ordeiros (leais e neutros) devem decidir no momento da criação do personagem se seus personagens irão controlar ou afastar mortos-vivos. Depois que tiver feita, a escolha não poderá ser revertida.');

        if ( (personagem["Tendência"] == "Vil (maligno e leal)") || (personagem["Tendência"] == "Egoista (neutro e maligno)") || (personagem["Tendência"] == "Cruel (caótico e maligno)") ) {
          personagem["Detalhes"].push('Por ter alinhamento maligno, o Arcanista pode comandar mortos-vivos com o Poder da Fé. O sucesso na jogada do 1d20 (maior ou igual ao valor indicado), os mortos-vivos seguem seus comandos.');
        } else if ( (personagem["Tendência"] == "Justo (bom e leal)") || (personagem["Tendência"] == "Bondoso (bom e neutro)") || (personagem["Tendência"] == "Honrado (caótico e bom)") ) {
          personagem["Detalhes"].push('Por ter alinhamento benigno, o Arcanista pode afastar mortos-vivos com o Poder da Fé da mesma forma que os Clérigos.');
        } else {
          personagem["Detalhes"].push('Arcanistas neutros devem decidir no momento da criação do personagem se seus personagens irão controlar ou afastar mortos-vivos. Depois que tiver feita, a escolha não poderá ser revertida.');
          let opcao_poder_da_fe = Math.floor(Math.random() * 2);
          if (opcao_poder_da_fe == 0) {
            personagem["Detalhes"].push('Por rolagem (o jogador pode alterar esta escolha somente na criação do personagem), este Arcanista pode afastar mortos-vivos com o Poder da Fé da mesma forma que os Clérigos.');
          } else {
            personagem["Detalhes"].push('Por rolagem (o jogador pode alterar esta escolha somente na criação do personagem), este Arcanista pode comandar mortos-vivos com o Poder da Fé. O sucesso na jogada do 1d20 (maior ou igual ao valor indicado), os mortos-vivos seguem seus comandos.');
          }
        }

        personagem["Poder da Fé"] = {
          "Esqueleto ou 1 DV": '13',
          "Zumbi": '16',
          "Carniçal ou 2 DV": '19',
          "Sombra ou 3-4 DV": '20',
          "Vulto ou 5 DV": '-',
          "Carneçal": '-',
          "Aparição ou 6 DV": '-',
          "Múmia ou 7 DV": '-',
          "Espectro ou 8 DV": '-',
          "Vampiro ou 9 DV": '-',
          "Fantasma ou 10 DV": '-',
          "Lich ou 11+ DV": '-',
          "Especial": '-'
        };

      } else {
        personagem["Dados Básicos"]["Magias Arcanas por Círculo"] = 7;
        personagem["Dados Básicos"]["Escolas de Magia"] = CLASSES[classe].escola;
        personagem["Dados Básicos"]["Escolas Opostas"] = ESCOLAS_ARCANAS_OPOSTAS[classe];
        personagem["Dados Básicos"]["Escolas Adjacentes"] = [];
      }

    } else if (CLASSES[classe]["Grupo"] == "Sacerdote") {
      personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = 2;
      personagem["Pontos de Perícia"]["Perícias Armas Nº Níveis"] = 4;
      personagem["Pontos de Perícia"]["Perícias Armas Semelhantes"] = -2;
      personagem["Pontos de Perícia"]["Perícias Armas Penalidades"] = -3;
      personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] = 4 + numero_de_linguas;
      personagem["Pontos de Perícia"]["Perícias Comuns Nº Níveis"] = 3;

      personagem["Resistência"]["Paralisação, Veneno ou Morte por Magia"] = 10;
      personagem["Resistência"]["Bastão, Cajado ou Varinha"] = 14;
      personagem["Resistência"]["Petrificação ou Transformação"] = 13;
      personagem["Resistência"]["Sopro-de-Dragão"] = 16;
      personagem["Resistência"]["Magia"] = 15;

      // AQUI
      if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 13) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 2,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 14) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 3,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 15) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 3,
          '2º Círculo': 1,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 16) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 3,
          '2º Círculo': 2,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 17) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 3,
          '2º Círculo': 2,
          '3º Círculo': 1,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 18) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 3,
          '2º Círculo': 2,
          '3º Círculo': 1,
          '4º Círculo': 1,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 19) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 2,
          '3º Círculo': 1,
          '4º Círculo': 2,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 20) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 3,
          '3º Círculo': 1,
          '4º Círculo': 3,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 21) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 3,
          '3º Círculo': 2,
          '4º Círculo': 3,
          '5º Círculo': 1,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 22) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 3,
          '3º Círculo': 2,
          '4º Círculo': 4,
          '5º Círculo': 2,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 23) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 3,
          '3º Círculo': 2,
          '4º Círculo': 4,
          '5º Círculo': 4,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 24) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 3,
          '3º Círculo': 2,
          '4º Círculo': 4,
          '5º Círculo': 4,
          '6º Círculo': 2,
        };
      } else if (personagem["Habilidades"]["Sabedoria"]["Valor da Habilidade"] == 25) {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 4,
          '2º Círculo': 3,
          '3º Círculo': 2,
          '4º Círculo': 4,
          '5º Círculo': 4,
          '6º Círculo': 3,
          '7º Círculo': 1,
        };
      } else {
        personagem["Dados Básicos"]["Magias Divinas por Círculo"] = {
          '1º Círculo': 1,
        };
      }

      if ( (classe == "Clérigo") || (classe == "Anacoreta") ) {
        if (forcar_havenloft) {

          if (classe == "Clérigo") {
            personagem["Detalhes"].push('Os clérigos de tendências boas também podem usar seu poder da fé para afastar (ou até mesmo destruir) criaturas mortas-vivas. Os clérigos neutros podem tanto afastar como controlar mortos-vivos de modo que eles sigam suas ordens.');
          } else if (classe == "Anacoreta") {
            personagem["Detalhes"].push('Um anacoreta de qualquer tendência tem a habilidade de afastar mortos-vivos com o Poder da Fé da mesma forma que os clérigos. No entanto, nenhum seguidor de Ezra tem a habilidade de comandar mortos-vivos.');
          }

          personagem["Poder da Fé"] = {
            "Esqueleto ou 1 DV": '13',
            "Zumbi": '16',
            "Carniçal ou 2 DV": '19',
            "Sombra ou 3-4 DV": '20',
            "Vulto ou 5 DV": '-',
            "Carneçal": '-',
            "Aparição ou 6 DV": '-',
            "Múmia ou 7 DV": '-',
            "Espectro ou 8 DV": '-',
            "Vampiro ou 9 DV": '-',
            "Fantasma ou 10 DV": '-',
            "Lich ou 11+ DV": '-',
            "Especial": '-'
          };

        } else {
          personagem["Poder da Fé"] = {
            "Esqueleto ou 1 DV": '10',
            "Zumbi": '13',
            "Carniçal ou 2 DV": '16',
            "Sombra ou 3-4 DV": '19',
            "Vulto ou 5 DV": '20',
            "Carneçal": '-',
            "Aparição ou 6 DV": '-',
            "Múmia ou 7 DV": '-',
            "Espectro ou 8 DV": '-',
            "Vampiro ou 9 DV": '-',
            "Fantasma ou 10 DV": '-',
            "Lich ou 11+ DV": '-',
            "Especial": '-'
          };
        }
      }

    } else if (CLASSES[classe]["Grupo"] == "Ladino") {
      personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = 2;
      personagem["Pontos de Perícia"]["Perícias Armas Nº Níveis"] = 4;
      personagem["Pontos de Perícia"]["Perícias Armas Semelhantes"] = -2;
      personagem["Pontos de Perícia"]["Perícias Armas Penalidades"] = -3;
      personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] = 3 + numero_de_linguas;
      personagem["Pontos de Perícia"]["Perícias Comuns Nº Níveis"] = 4;

      personagem["Resistência"]["Paralisação, Veneno ou Morte por Magia"] = 13;
      personagem["Resistência"]["Bastão, Cajado ou Varinha"] = 14;
      personagem["Resistência"]["Petrificação ou Transformação"] = 12;
      personagem["Resistência"]["Sopro-de-Dragão"] = 16;
      personagem["Resistência"]["Magia"] = 15;

    } else if (CLASSES[classe]["Grupo"] == "Psionicista") {
      personagem["Pontos de Perícia"]["Perícias Armas Inicial"] = 2;
      personagem["Pontos de Perícia"]["Perícias Armas Nº Níveis"] = 5;
      personagem["Pontos de Perícia"]["Perícias Armas Semelhantes"] = -2;
      personagem["Pontos de Perícia"]["Perícias Armas Penalidades"] = -4;
      personagem["Pontos de Perícia"]["Perícias Comuns Inicial"] = 3 + numero_de_linguas;
      personagem["Pontos de Perícia"]["Perícias Comuns Nº Níveis"] = 3;

      personagem["Resistência"]["Paralisação, Veneno ou Morte por Magia"] = 13;
      personagem["Resistência"]["Bastão, Cajado ou Varinha"] = 15;
      personagem["Resistência"]["Petrificação ou Transformação"] = 10;
      personagem["Resistência"]["Sopro-de-Dragão"] = 16;
      personagem["Resistência"]["Magia"] = 15;
    }

    // A definição de sabedoria e carisma estava aqui, mas precisou ir para cima do código

    /* Poder psiônico */
    calcular_PSP(personagem);
    poderes_psionicos(personagem,()=>{

      /* Medo, Horror e Loucura */
      valores_medo(personagem);

      /* Ajustar talentos dos ladinos */
      definir_talentos(classe, personagem, () => {

        /* Detalhes */
        personagem["Detalhes"].push.apply(personagem["Detalhes"], CLASSES[classe].detalhes);

        sortear_itens(classe, raca, personagem, (armas_mais_fortes) => {

          sortear_pericias(armas_mais_fortes, classe, raca, personagem, () => {
            debug(`Perícias sorteadas:${personagem['Perícias'].map(p => ` ${p.split(',')[0]}`)}`);

            sortear_magias(classe, personagem, () => {

              callback();
              return;

            });

          });

        });

      });

    });

  });
}

function obter_dados_personagem(callback) {
  let urlParams = new URLSearchParams(window.location.search);
  let h = urlParams.get('h');
  let raca = urlParams.get('r');
  let habilidades = [];

  // ?h=10,11,12,13,14,15&r=Anão
  if ( (h != undefined) && (h != null) && (h != '') && (h.length > 0) && (h.split(',').length == 6) ) {
    let hs = h.split(',');
    let personagem = {
      "Habilidades": {
        "Força": { "Valor da Habilidade": parseInt(hs[0]) },
        "Destreza": { "Valor da Habilidade": parseInt(hs[1]) },
        "Constituição": { "Valor da Habilidade": parseInt(hs[2]) },
        "Inteligência": { "Valor da Habilidade": parseInt(hs[3]) },
        "Sabedoria": { "Valor da Habilidade": parseInt(hs[4]) },
        "Carisma": { "Valor da Habilidade": parseInt(hs[5]) },
      },
      "Raça": raca
    };
    callback(personagem);
    return;
  } else {
    sortear_personagem(personagem => {
      callback(personagem);
      return;
    });
  }
}

/*
document.getElementById('bt-rolar-personagem').addEventListener('click',()=>{
  render();
});

document.getElementById('bt-salvar-personagem').addEventListener('click',()=>{
  window.print();
});
*/
