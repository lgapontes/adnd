/******************************************************************************/
/******************************      APOIO     ********************************/
/******************************************************************************/

document.getElementById('texto-formulario-versao').innerHTML = versao_texto;

function openLoading() {
  esconder_todos();
  mostrar_shimmer();
  document.getElementById('loading').style.display = 'block';
}

function closeLoading() {
  document.getElementById('loading').style.display = 'none';
}

function generateUUID() {
  // uuid char(36)
  return crypto.randomUUID();
}

function criarOption(select,value,texto) {
  let opt = document.createElement('option');
  opt.value = value;
  opt.innerHTML = texto;
  select.appendChild(opt);
}

function preecherSelect(id,lista,campoValue,functionTexto,selectedValue,callback) {
  let select = document.getElementById(id);
  select.innerHTML = '';
  let selectedIndex = -1;
  lista.forEach((entry, index) => {
    if (entry[campoValue] === selectedValue) {
      selectedIndex = index;
    }
    criarOption(select,entry[campoValue],functionTexto(entry));

    if (index === (lista.length -1)) {
      if (selectedIndex > -1) {
        select.selectedIndex = selectedIndex;
      }
      callback();
    }
  });
}

function isOdd(num) {
  return num % 2;
}

function itsTrue(valor) {
  return valor === 1;
}

function itsFalse(valor) {
  return valor === 0;
}

function disableInput(id) {
  document.getElementById(id).setAttribute('disabled','disabled');
  document.getElementById(id).setAttribute('readonly','readonly');
}

function enableInput(id) {
  document.getElementById(id).removeAttribute('disabled');
  document.getElementById(id).removeAttribute('readonly');
}

function uuidEhValido(uuid) {
  if ( (uuid !== undefined) && (uuid !== null) && (uuid !== '') ) {
    if (typeof uuid === 'string' || uuid instanceof String) {
      if (uuid.length === 36) {
        return true;
      }
    }
  }
  return false;
}

function stringEhValida(s) {
  if ( (s !== undefined) && (s !== null) && (s !== '') ) {
    if (typeof s === 'string' || s instanceof String) {
      return true;
    }
  }
  return false;
}

function salvarUrl(url) {
  if (uuidEhValido(url)) {
    localStorage.setItem('url', url);
    return true;
  } else {
    limparUrl();
    return false;
  }
}

function limparUrl() {
  localStorage.removeItem('url');
}

function obterUrlStorage() {
  let url = localStorage.getItem('url');
  if (url !== null) {
    return {valido: true, valor: url};
  } else {
    return {valido: false, valor: null};
  }
}

function adicionarValorNoJSON(json,id,valor) {
  let field = id;
  field = field.replace("campanhas_nova_", "");
  field = field.replace("campanhas_editar_", "");
  json[field] = valor;
}

function obterValorCheckbox(json,id) {
  let valor = document.getElementById(id).checked;
  adicionarValorNoJSON(json,id,valor);
}

function obterValorInputText(json,id) {
  let valor = document.getElementById(id).value;
  adicionarValorNoJSON(json,id,valor);
}

function obterValorSelect(json,id) {
  let select = document.getElementById(id);
  let valor = select.options[select.selectedIndex].value;
  adicionarValorNoJSON(json,id,valor);
}

function obterValorListaCheckbox(json,id) {
  let lista = [...document.querySelectorAll(`#${id} input[type=checkbox]`)];
  let valores = lista.filter(checkbox => {if (checkbox.checked) return checkbox; }).map(checkbox => checkbox.id);
  adicionarValorNoJSON(json,id,valores);
}

function obterValorLink(json,id) {
  let link = document.getElementById(id);
  let valor = link.getAttribute('url');
  adicionarValorNoJSON(json,id,valor);
}

function copiarParaClipboard(value) {
  navigator.clipboard.writeText(value);
}

const TEMPO_DURACAO_TOAST = 3000;

function renderErrorToast(msg) {
  vanillaToast.error(msg,{
    duration: TEMPO_DURACAO_TOAST,
    closeButton: false,
  });
}

function renderWarningToast(msg) {
  vanillaToast.warning(msg,{
    duration: TEMPO_DURACAO_TOAST,
    closeButton: false,
  });
}

function renderToast(msg) {
  vanillaToast.default(msg,{
    duration: TEMPO_DURACAO_TOAST,
    closeButton: false,
  });
}

/******************************************************************************/
/******************************    VALIDAÇÃO   ********************************/
/******************************************************************************/

function palavraEhProibida(text) {
  if (PALAVRAS_PROIBIDAS.some(word => text.includes(word))) {
    return true;
  }
  if (FRASES_PROIBIDAS.some(v => text.includes(v))) {
    return true;
  }
  return false;
}

function validarCampanha(json) {
  if (!stringEhValida(json.nome)) {
    renderWarningToast('O campo Nome está inválido!');
    return false;
  }
  if (palavraEhProibida(json.nome)) {
    renderWarningToast('Há palavras proibidas no campo Nome!');
    return false;
  }

  if (!stringEhValida(json.narrador)) {
    renderWarningToast('O campo Narrador está inválido!');
    return false;
  }
  if (palavraEhProibida(json.narrador)) {
    renderWarningToast('Há palavras proibidas no campo Narrador!');
    return false;
  }

  return true;
}

/******************************************************************************/
/******************************      API       ********************************/
/******************************************************************************/

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

/*
function obterCampanha(url,url,sucesso,falha) {
    consumirAPI(
        'GET',
        `${url}?url=${url}`,
        sucesso,
        falha
    );
}
*/

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

function renderBloco(textLabel,inputType,inputDisabled,inputValue,blocoMenor,blocoDireita) {
  let bloco = document.createElement('div');
  bloco.classList.add('bloco');

  if (blocoMenor) {
    bloco.classList.add('menor');
  }
  if (blocoDireita) {
    bloco.classList.add('menor-direita');
  }

  let label = document.createElement('label');
  label.innerHTML = textLabel;

  let input = document.createElement('div');
  input.classList.add('input-like');
  input.innerHTML = inputValue;

  /*
  input.setAttribute('type',inputType);
  if (inputDisabled) {
    input.setAttribute('readonly','readonly');
    input.setAttribute('disabled','disabled');
  }
  input.value = inputValue;
  */

  bloco.appendChild(label);
  bloco.appendChild(input);

  return bloco;
}

function renderLinhaCampanha(nome,narrador,criacao,url_visualizador) {
  let linha = document.createElement('div');
  linha.classList.add('linha');
  linha.classList.add('linha-link');
  linha.appendChild(renderBloco('Nome','text',true,nome,false,false));
  linha.appendChild(renderBloco('Narrador','text',true,narrador,true,false));
  linha.appendChild(renderBloco('Criação','text',true,criacao,true,true));
  linha.addEventListener('click',(event)=>{
    campanhas_listar_exibir(event,url_visualizador);
  });
  return linha;
}

function renderCampanhas(lista,callback) {
  console.log(lista);

  let linhas = document.getElementById('campanhas_listar');
  linhas.innerHTML = '';

  if (lista.length == 0) {
    callback();
  } else {
    lista.forEach((entry, index) => {
      let linha = renderLinhaCampanha(entry.nome,entry.narrador,entry.cadastro,entry.url_visualizador);
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

    if ( (propriedade === 'url_narrador') || (propriedade === 'url_jogador') || (propriedade === 'url_visualizador') ) {
      let url = `https://flechamagica.com.br/aded2/inventario.html?url=${valor}`;
      tag.href = url;
      tag.innerHTML = url;
      tag.setAttribute('url',valor);
    } else if (propriedade === 'uuid_medida_padrao') {
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

function createItemLista(index,id,texto,selecionado) {
  let div = document.createElement('div');
  div.classList.add('bloco');
  div.classList.add('menor');
  if (isOdd(index)) {
    div.classList.add('menor-direita');
  }
  div.classList.add('bloco-checkbox');

  let checkbox = document.createElement('input');
  checkbox.id = id;
  checkbox.setAttribute('name', id);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = selecionado;

  let label = document.createElement('label');
  label.htmlFor = id;
  label.innerHTML = texto;

  div.appendChild(checkbox);
  div.appendChild(label);
  return div;
}

function renderLista(id,lista,campoChaveLista,campoTextoLista,selecionados,campoChaveSelecionados,callback) {
  let div = document.getElementById(id);
  div.innerHTML = '';
  lista.forEach((entry, index) => {
    let selecionado = false;
    if (selecionados.some(s => s[campoChaveSelecionados] === entry[campoChaveLista])) {
      selecionado = true;
    }

    let item = createItemLista(index,entry[campoChaveLista],entry[campoTextoLista],selecionado);
    div.appendChild(item);

    if (index === (lista.length - 1)) {
      callback();
    }
  });
}

function render_campanhas_editar_permissoes(json) {
  document.getElementById('campanhas_editar_atualizar').addEventListener('click',campanhas_editar_atualizar);

  if (itsTrue(json.campanha.eh_narrador)) {
    document.getElementById('campanhas_editar_salvar').style.display = 'block';
    enableInput('campanhas_editar_nome');
    enableInput('campanhas_editar_narrador');
    document.getElementById('campanhas_editar_permissao').style.display = 'block';
    document.getElementById('personagens_listar_inserir').style.display = 'block';
    document.getElementById('campanhas_editar_salvar').addEventListener('click',campanhas_editar_salvar);
    document.getElementById('campanhas_editar_url_narrador_botao').addEventListener('click',campanhas_editar_botao_narrador);
    document.getElementById('campanhas_editar_url_jogador_botao').addEventListener('click',campanhas_editar_botao_jogador);
    document.getElementById('campanhas_editar_url_visualizador_botao').addEventListener('click',campanhas_editar_botao_visualizador);
  } else if (itsTrue(json.campanha.eh_jogador)) {
    document.getElementById('campanhas_editar_salvar').style.display = 'none';
    disableInput('campanhas_editar_nome');
    disableInput('campanhas_editar_narrador');
    document.getElementById('campanhas_editar_permissao').style.display = 'none';
    document.getElementById('personagens_listar_inserir').style.display = 'block';
  } else {
    document.getElementById('campanhas_editar_salvar').style.display = 'none';
    disableInput('campanhas_editar_nome');
    disableInput('campanhas_editar_narrador');
    document.getElementById('campanhas_editar_permissao').style.display = 'none';
    document.getElementById('personagens_listar_inserir').style.display = 'none';
  }
}

function render_campanhas_editar(json,callback) {
  render_campanhas_editar_permissoes(json);

  if (itsTrue(json.campanha.eh_narrador)) {
    preecherSelect(
      'campanhas_editar_uuid_medida_padrao',
      json.medidas,'uuid',(entry)=>`${entry.medida} (${entry.sigla})`,json.campanha.uuid_medida_padrao,()=>{
        let propriedades = Object.keys(json.campanha);
        propriedades.forEach((propriedade, index) => {
          let valor = json.campanha[propriedade];
          render_campanhas_editar_campo(propriedade,valor,()=>{
            if (index === (propriedades.length - 1)) {
              renderLista(
                'campanhas_editar_moedas_utilizadas',
                json.moedas,
                'uuid','moeda',
                json.moedas_utilizadas,
                'uuid_moeda',
                ()=>{
                  callback();
                }
              );
            }
          });
        });
      }
    );
  } else {
    let propriedades = ['nome','narrador','data_cadastro'];
    propriedades.forEach((propriedade, index) => {
      let valor = json.campanha[propriedade];
      render_campanhas_editar_campo(propriedade,valor,()=>{
        if (index === (propriedades.length - 1)) {
          callback();
        }
      });
    });
  }
}

/******************************************************************************/
/******************************     EVENTOS     *******************************/
/******************************************************************************/

document.getElementById('header-botao-voltar').addEventListener('click',(event)=>{
  event.preventDefault();
  let url = `${window.location.pathname}`;
  window.location.href = url;
});

document.getElementById('campanhas_nova_cancelar').addEventListener('click',(event)=>{
  event.preventDefault();
  document.getElementById('campanhas_nova_nome').value = '';
  document.getElementById('campanhas_nova_narrador').value = '';
  esconder_elemento('campanhas_nova');
});

document.getElementById('campanhas_nova_salvar').addEventListener('click',(event)=>{
  event.preventDefault();

  let url_narrador = generateUUID();
  let json = {
    url_narrador: url_narrador
  };
  obterValorInputText(json,'campanhas_nova_nome');
  obterValorInputText(json,'campanhas_nova_narrador');

  if (validarCampanha(json)) {
    openLoading();
    inserir(
      'https://www.flechamagica.com.br/aded2/api/campanhas.php',
      json,
      ()=>{
        /* Campanha SALVA, obter dados */
        obter_com_parametro(
          'https://www.flechamagica.com.br/aded2/api/campanhas.php',
          'url',
          url_narrador,
          (json_retorno)=>{
            history.pushState({}, "narrador", `?url=${url_narrador}`);
            router('campanhas_editar');
            document.getElementById('campanhas_editar_url').value = url_narrador;
            render_campanhas_editar(json_retorno,()=>{
              closeLoading();
            });
          },
          (erro)=>{
            router('campanhas_listar');
            console.error(erro);
            closeLoading();
            renderErrorToast('Ocorreu um erro ao obter os dados!');
          },
        );
        /* Campanha SALVA, obter dados */
      },
      (erro)=>{
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao salvar os dados!');
      },
    );
  }
});

document.getElementById('campanhas_nova_abrir').addEventListener('click',(event)=>{
  event.preventDefault();
  mostrar_elemento('campanhas_nova');
});

function campanhas_listar_exibir(event,url_visualizador) {
  event.preventDefault();
  let url = `${window.location.pathname}?url=${url_visualizador}`;
  window.location.href = url;
}

function campanhas_editar_atualizar(event) {
  event.preventDefault();
  location.reload();
}

function campanhas_editar_botoes_copiar(event,id) {
  event.preventDefault();
  let url = document.getElementById(id).href;
  copiarParaClipboard(url);
}

function campanhas_editar_botao_narrador(event) {
  campanhas_editar_botoes_copiar(event,'campanhas_editar_url_narrador');
}

function campanhas_editar_botao_jogador(event) {
  campanhas_editar_botoes_copiar(event,'campanhas_editar_url_jogador');
}

function campanhas_editar_botao_visualizador(event) {
  campanhas_editar_botoes_copiar(event,'campanhas_editar_url_visualizador');
}

function campanhas_editar_salvar(event) {
  event.preventDefault();
  let url = document.getElementById('campanhas_editar_url').value;

  let json = {
    url: url
  };
  obterValorInputText(json,'campanhas_editar_uuid');

  obterValorInputText(json,'campanhas_editar_nome');
  obterValorInputText(json,'campanhas_editar_narrador');
  obterValorInputText(json,'campanhas_editar_data_cadastro');

  obterValorCheckbox(json,'campanhas_editar_controlar_peso');
  obterValorCheckbox(json,'campanhas_editar_permitir_incluir_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_alterar_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_alterar_quantidade_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_excluir_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_entregar_item');
  obterValorCheckbox(json,'campanhas_editar_permitir_alterar_moedas');
  obterValorCheckbox(json,'campanhas_editar_permitir_entregar_moedas');

  obterValorSelect(json,'campanhas_editar_uuid_medida_padrao');

  obterValorListaCheckbox(json,'campanhas_editar_moedas_utilizadas');

  obterValorLink(json,'campanhas_editar_url_narrador');
  obterValorLink(json,'campanhas_editar_url_jogador');
  obterValorLink(json,'campanhas_editar_url_visualizador');

  if (validarCampanha(json)) {
    openLoading();
    alterar(
      'https://www.flechamagica.com.br/aded2/api/campanhas.php',
      json,
      (json_retorno)=>{
        router('campanhas_editar');
        render_campanhas_editar(json_retorno,()=>{
          closeLoading();
          renderToast('Campanha atualizada com sucesso!');
        });
      },
      (erro)=>{
        router('campanhas_editar');
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao salvar os dados!');
      },
    );
  }
}

/******************************************************************************/
/******************************     ROUTER      *******************************/
/******************************************************************************/

function obterUrl() {
  let url_pagina = new URLSearchParams(window.location.search);
  let url = url_pagina.get('url');
  let possui_url = salvarUrl(url);

  return {
    url: url,
    possui_url: possui_url,
  };
}

function mostrar_shimmer() {
  document.querySelector('div.shimmer-menor').style.display = 'block';
  document.querySelector('div.shimmer-maior').style.display = 'block';
}

function esconder_shimmer() {
  document.querySelector('div.shimmer-menor').style.display = 'none';
  document.querySelector('div.shimmer-maior').style.display = 'none';
}

function esconder_todos() {
  esconder_elemento('inventario-erro');
  esconder_elemento('campanhas_editar');
  esconder_elemento('campanhas_editar_form');
  esconder_elemento('personagens_listar_titulo');
  esconder_elemento('header-botao-voltar');
  esconder_elemento('campanhas_titulo');
  esconder_elemento('campanhas_nova');
  esconder_elemento('campanhas_listar');
}

function router(rota,mensagem) {
  esconder_todos();

  if (rota === 'erro') {
    mostrar_elemento('inventario-erro');
    if (stringEhValida(mensagem)) {
      document.querySelector('#inventario-erro > label').innerHTML = mensagem;
    } else {
      document.querySelector('#inventario-erro > label').innerHTML = 'Sorry, o site rolou um erro crítico :(';
    }
  } else if (rota === 'campanhas_editar') {
    mostrar_elemento('campanhas_editar');
    mostrar_elemento('campanhas_editar_form');
    mostrar_elemento('personagens_listar_titulo');

    mostrar_elemento('header-botao-voltar');
  } else if (rota === 'campanhas_listar') {
    mostrar_elemento('campanhas_titulo');
    mostrar_elemento('campanhas_listar');
  }

  esconder_shimmer();
}

/******************************************************************************/
/******************************     INICIAR     *******************************/
/******************************************************************************/

function iniciar() {
  console.log(`Versão ${VERSION}`);

  openLoading();
  let pagina = obterUrl();

  if (pagina.possui_url) {
    obter_com_parametro(
      'https://www.flechamagica.com.br/aded2/api/campanhas.php',
      'url',
      pagina.url,
      (json)=>{
        router('campanhas_editar');
        document.getElementById('campanhas_editar_url').value = pagina.url;
        render_campanhas_editar(json,()=>{
          closeLoading();
        });
      },
      (erro)=>{
        router('erro','Sorry, mas sua campanha não foi encontrada :(');
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao obter os dados!');
      },
    );
  } else {

    listar(
      'https://www.flechamagica.com.br/aded2/api/campanhas.php',
      (json)=>{
        router('campanhas_listar');
        renderCampanhas(json,()=>{
          closeLoading();
        });
      },
      (erro)=>{
        router('campanhas_listar');
        console.error(erro);
        closeLoading();
        renderErrorToast('Ocorreu um erro ao obter os dados!');
      },
    );
  }
}

iniciar();
