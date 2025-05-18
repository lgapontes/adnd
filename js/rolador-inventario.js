/******************************************************************************/
/******************************      API       ********************************/
/******************************************************************************/

document.getElementById('texto-formulario-versao').innerHTML = versao_texto;

function openLoading() {
  document.getElementById('loading').style.display = 'block';
}

function closeLoading() {
  document.getElementById('loading').style.display = 'none';
}

function generateUUID() {
  // uuid char(36)
  return crypto.randomUUID();
}

function consumirAPI(metodo,url,sucesso,falha,json) {
    var xhr = new XMLHttpRequest();
    xhr.open(metodo,url);
    xhr.timeout = 10000;

    xhr.addEventListener('load',function(){
        if (xhr.status == 200) {
            if ( (metodo != 'POST') && (metodo != 'DELETE') ) {
              var json = JSON.parse(xhr.responseText);
              sucesso(json);
            } else {
              sucesso();
            }
        } else {
            falha(xhr.status + ': ' + xhr.statusText);
        }
    });
    xhr.addEventListener('timeout',function(){
        falha('Não foi possível obter o conteúdo!');
    });
    xhr.addEventListener('error',function(evento){
        falha('Ocorreu um erro ao obter o conteúdo!');
    });

    if (json != undefined) {
        xhr.send(json);
    } else {
        xhr.send();
    }
}

function listar(url,sucesso,falha) {
    consumirAPI(
        'GET',
        url,
        sucesso,
        falha
    );
}

function obter_com_parametro(url,parametro,valor,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?${parametro}=${valor}`,
        sucesso,
        falha
    );
}

function obter(url,uuid,sucesso,falha) {
    obter_com_parametro(
        url,
        'uuid',
        uuid,
        sucesso,
        falha
    );
}

function obterCampanha(url,hash,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?uuid=${uuid}`,
        sucesso,
        falha
    );
}

function obterItensPorPersonagem(url,personagem,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?personagem=${personagem}`,
        sucesso,
        falha
    );
}

function inserir(url,json,sucesso,falha) {
    consumirAPI(
        'POST',
        url,
        sucesso,
        falha,
        JSON.stringify(json)
    );
}

function alterar(url,json,sucesso,falha) {
    consumirAPI(
        'PUT',
        url,
        sucesso,
        falha,
        JSON.stringify(json)
    );
}

function excluir(url,uuid,sucesso,falha) {
    consumirAPI(
        'DELETE',
        `${url}?uuid=${uuid}`,
        sucesso,
        falha
    );
}

/*

// Medidas

listar(
  'https://www.flechamagica.com.br/aded2/api/medidas.php',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

obter(
  'https://www.flechamagica.com.br/aded2/api/medidas.php',
  '6092a47a-9369-4a19-bfee-0d7627ecc042',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

inserir(
  'https://www.flechamagica.com.br/aded2/api/medidas.php',
  {uuid: '6092a47a-9369-4a19-bfee-0d7627ecc043', medida: 'nova', sigla: 'nova2'},
  ()=>{
    console.log('Registro inserido!');
  },
  (erro)=>{
    console.error(erro);
  },
);

alterar(
  'https://www.flechamagica.com.br/aded2/api/medidas.php',
  {uuid: '6092a47a-9369-4a19-bfee-0d7627ecc042', medida: 'Libras', sigla: 'lb'},
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

excluir(
  'https://www.flechamagica.com.br/aded2/api/medidas.php',
  '6092a47a-9369-4a19-bfee-0d7627ecc042',
  ()=>{
    console.log('Registro excluído!');
  },
  (erro)=>{
    console.error(erro);
  },
);

// Campanhas

permitir_incluir_item boolean NOT NULL

permitir_alterar_item boolean NOT NULL

permitir_alterar_quantidade_item boolean NOT NULL

permitir_excluir_item boolean NOT NULL

permitir_entregar_item boolean NOT NULL

permitir_alterar_moedas boolean NOT NULL

permitir_entregar_moedas boolean NOT NULL


inserir(
  'https://www.flechamagica.com.br/aded2/api/campanhas.php',
  {
    nome: 'The Walking Dead: Outbreak',
    narrador: 'SirLockee',
    controlar_peso: true,
    uuid_medida_padrao: '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
  },
  ()=>{
    console.log('Registro inserido!');
  },
  (erro)=>{
    console.error(erro);
  },
);

alterar(
  'https://www.flechamagica.com.br/aded2/api/campanhas.php',
  {
    uuid: '91edb60b-c179-42a7-b61c-106e3879580d',
    nome: 'The Walking Dead: Outbreak2',
    narrador: 'SirLockee2',
    controlar_peso: false,
    uuid_medida_padrao: '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
  },
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

excluir(
  'https://www.flechamagica.com.br/aded2/api/campanhas.php',
  '7c13f7f6-87ee-42ea-986c-4fb51f5edb89',
  ()=>{
    console.log('Registro excluído!');
  },
  (erro)=>{
    console.error(erro);
  },
);

listar(
  'https://www.flechamagica.com.br/aded2/api/campanhas.php',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

obter_com_parametro(
  'https://www.flechamagica.com.br/aded2/api/campanhas.php',
  'hash',
  'df901cea-04cf-40f1-900c-bf32d6689e78',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

// Personagens

inserir(
  'https://www.flechamagica.com.br/aded2/api/personagens.php',
  {
    uuid_campanha: 'df901cea-04cf-40f1-900c-bf32d6689e78',
    nome: 'Delvreck',
    peso_maximo: '20',
    uuid_medida_peso_maximo: '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
  },
  ()=>{
    console.log('Registro inserido!');
  },
  (erro)=>{
    console.error(erro);
  },
);

alterar(
  'https://www.flechamagica.com.br/aded2/api/personagens.php',
  {
    uuid: 'c558e0dd-5c4e-4085-bec2-0e697ddf1ed6',
    nome: 'Delvreck',
    peso_maximo: '20',
    uuid_medida_peso_maximo: '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
  },
  ()=>{
    console.log('Registro alterado!');
  },
  (erro)=>{
    console.error(erro);
  },
);

excluir(
  'https://www.flechamagica.com.br/aded2/api/personagens.php',
  'c558e0dd-5c4e-4085-bec2-0e697ddf1ed6',
  ()=>{
    console.log('Registro excluído!');
  },
  (erro)=>{
    console.error(erro);
  },
);

listar(
  'https://www.flechamagica.com.br/aded2/api/personagens.php',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

obter(
  'https://www.flechamagica.com.br/aded2/api/personagens.php',
  '7138da3b-b91c-4ab8-98c6-95ffdf19bb3b',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

// Itens

inserir(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  {
    uuid_personagem: '7138da3b-b91c-4ab8-98c6-95ffdf19bb3b',
    descricao: 'Espada Curta',
    quantidade: 1,
    peso_unitario: '1',
    uuid_medida_peso_unitario: '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
  },
  ()=>{
    console.log('Registro inserido!');
  },
  (erro)=>{
    console.error(erro);
  },
);

alterar(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  {
    uuid: '97a58c74-1a55-4cc8-a68e-7248835d3406',
    uuid_personagem: '7138da3b-b91c-4ab8-98c6-95ffdf19bb3b',
    descricao: 'Espada Curta2',
    quantidade: 1,
    peso_unitario: '1',
    uuid_medida_peso_unitario: '542fc103-6cbd-4ecc-b457-2959dd0ffe7f'
  },
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

alterar(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  {
    uuid: '97a58c74-1a55-4cc8-a68e-7248835d3406',
    alterar_quantidade: 1
  },
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

listar(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

obter(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  "97a58c74-1a55-4cc8-a68e-7248835d3406",
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

obterItensPorPersonagem(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  "7138da3b-b91c-4ab8-98c6-95ffdf19bb3b",
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

excluir(
  'https://www.flechamagica.com.br/aded2/api/itens.php',
  '97a58c74-1a55-4cc8-a68e-7248835d3406',
  ()=>{
    console.log('Registro excluído!');
  },
  (erro)=>{
    console.error(erro);
  },
);

*/

/******************************************************************************/
/******************************     MOEDAS     ********************************/
/******************************************************************************/

/*
insert into moedas (uuid,moeda,sigla,ordenacao) values ('60b339ec-e9ab-477e-838c-baccf2805e02','Peça de Cobre','pc',2);
60b339ec-e9ab-477e-838c-baccf2805e02
Peça de Cobre
pc
100pc = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('a19f19a8-64e0-459e-8ec4-4b56f62af80c','Peça de Prata','pp',3);
a19f19a8-64e0-459e-8ec4-4b56f62af80c
Peça de Prata
pp
10pp = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('996904ad-51ad-42ae-b831-6c08346e7bed','Peça de Electrum','pe',4);
996904ad-51ad-42ae-b831-6c08346e7bed
Peça de Electrum
pe
2pe = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('982e8a4e-386c-4f4f-b394-c6a78fc636b0','Peça de Ouro','po',5);
982e8a4e-386c-4f4f-b394-c6a78fc636b0
Peça de Ouro
po

insert into moedas (uuid,moeda,sigla,ordenacao) values ('b8d1653f-1cc3-436a-ad22-f87ab6b59e86','Peça de Platina','pl',6);
b8d1653f-1cc3-436a-ad22-f87ab6b59e86
Peça de Platina
pl
1pl = 5po

insert into moedas (uuid,moeda,sigla,ordenacao) values ('f2f2ac1d-f8dc-4dd2-a243-778155d8f98b','Peça de Cerâmica','pc',1);
f2f2ac1d-f8dc-4dd2-a243-778155d8f98b
Peça de Cerâmica
pc
100pc = 1gp

insert into moedas (uuid,moeda,sigla,ordenacao) values ('0f88bf2c-a224-4990-b0cf-ea04dc22f0f1','Bits (1/10 Peça de Cerâmica)','bits',0);
0f88bf2c-a224-4990-b0cf-ea04dc22f0f1
Bits (1/10 Peça de Cerâmica)
bits
(1/10 Peça de Cerâmica)

insert into moedas (uuid,moeda,sigla,ordenacao) values ('9382c783-7888-4e15-9eb8-4777a22afee3','Trade Bar de Prata','trade bar (prata)',7);
9382c783-7888-4e15-9eb8-4777a22afee3
Trade Bar de Prata
trade bar (prata)
25po

insert into moedas (uuid,moeda,sigla,ordenacao) values ('1657f8c3-578a-4a1e-b4b0-8554e7b5479d','Trade Bar de Ouro','trade bar (ouro)',8);
1657f8c3-578a-4a1e-b4b0-8554e7b5479d
Trade Bar de Ouro
trade bar (ouro)
250po
*/

/******************************************************************************/
/******************************     RENDER     ********************************/
/******************************************************************************/

function mostrar_elemento(id) {
  document.getElementById(id).style.display = 'block';
}

function esconder_elemento(id) {
  document.getElementById(id).style.display = 'none';
}

document.getElementById('texto-botao-mostrar').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('texto-botao-mostrar').style.display = 'none';
  document.getElementById('texto-botao-esconder').style.display = 'block';
  document.getElementById('texto-bloco').style.display = 'block';
});

document.getElementById('texto-botao-esconder').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('texto-botao-esconder').style.display = 'none';
  document.getElementById('texto-botao-mostrar').style.display = 'block';
  document.getElementById('texto-bloco').style.display = 'none';
});

function renderBloco(textLabel,inputType,inputDisabled,inputValue,blocoMenor) {
  let bloco = document.createElement('div');
  bloco.classList.add('bloco');

  if (blocoMenor) {
    bloco.classList.add('menor');
  }

  let label = document.createElement('label');
  label.innerHTML = textLabel;

  let input = document.createElement('input');
  input.setAttribute('type',inputType);

  if (inputDisabled) {
    input.setAttribute('readonly','readonly');
    input.setAttribute('disabled','disabled');
  }

  input.value = inputValue;

  bloco.appendChild(label);
  bloco.appendChild(input);

  return bloco;
}

function renderLinhaCampanha(nome,narrador,criacao) {
  let linha = document.createElement('div');
  linha.classList.add('linha');
  linha.appendChild(renderBloco('Nome','text',true,nome,false));
  linha.appendChild(renderBloco('Narrador','text',true,narrador,true));
  linha.appendChild(renderBloco('Criação','text',true,criacao,true));
  return linha;
}

function renderCampanhas(lista,callback) {
  let linhas = document.getElementById('campanhas_listar');
  linhas.innerHTML = '';

  if (lista.length == 0) {
    callback();
  } else {
    lista.forEach((entry, index) => {
      let linha = renderLinhaCampanha(entry.nome,entry.narrador,entry.cadastro);
      linhas.appendChild(linha);

      if (index == (lista.length - 1)) {
        callback();
      }
    });

  }
}

function render_campanhas_editar_campo(propriedade,valor,callback) {
  let ignorar_propriedades = ['medida','sigla','eh_narrador','eh_jogador','eh_visualizador'];
  if (ignorar_propriedades.includes(propriedade)) {
    callback();
  } else {
    let nome_tag = `campanhas_editar_${propriedade}`;
    let tag = document.getElementById(nome_tag);

    if (propriedade === 'uuid_medida_padrao') {
      callback();
    } else {
      if (tag.type === 'checkbox') {
        tag.checked = (valor === 1);
        callback();
      } else {
        tag.value = valor;
        callback();
      }
    }
  }
}

/*
function criarOption(select,value,texto) {
  let opt = document.createElement('option');
  if ( (value == 'Todas') || (value == 'Todos') ) {
    value = 'Todas';
  }
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}
*/

function render_campanhas_editar(json,callback) {
  let propriedades = Object.keys(json.campanha);
  propriedades.forEach((propriedade, index) => {
    let valor = json.campanha[propriedade];
    render_campanhas_editar_campo(propriedade,valor,()=>{
      if (index === (propriedades.length - 1)) {
        callback();
      }
    });
  });
}

/******************************************************************************/
/******************************     INICIAR     *******************************/
/******************************************************************************/

function iniciar() {
  openLoading();

  console.log(`Versão ${VERSION}`);
  let url = new URLSearchParams(window.location.search);
  let hash = url.get('hash');
  let possui_hash = false;
  if ( (hash !== undefined) && (hash !== null) && (hash !== '') ) {
    if (typeof hash === 'string' || hash instanceof String) {
      if (hash.length === 36) {
        possui_hash = true;
      }
    }
  }

  if (possui_hash) {
    obter_com_parametro(
      'https://www.flechamagica.com.br/aded2/api/campanhas.php',
      'hash',
      hash,
      (json)=>{
        render_campanhas_editar(json,()=>{
          console.log(json);
          closeLoading();
        });
      },
      (erro)=>{
        console.error(erro);
        closeLoading();
      },
    );
  } else {
    mostrar_elemento('campanhas_titulo');
    mostrar_elemento('campanhas_listar');

    listar(
      'https://www.flechamagica.com.br/aded2/api/campanhas.php',
      (json)=>{
        renderCampanhas(json,()=>{
          closeLoading();
        });
      },
      (erro)=>{
        console.error(erro);
        closeLoading();
      },
    );
  }
}

iniciar();
