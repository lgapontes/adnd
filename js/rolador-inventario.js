/******************************************************************************/
/******************************      API       ********************************/
/******************************************************************************/

document.getElementById('texto-formulario-versao').innerHTML = versao_texto;

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

function obter(url,uuid,sucesso,falha) {
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

obter(
  'https://www.flechamagica.com.br/aded2/api/campanhas.php',
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

listar(
  'https://www.flechamagica.com.br/aded2/api/medidas.php',
  (json)=>{
    console.log(json);
  },
  (erro)=>{
    console.error(erro);
  },
);

/******************************************************************************/
/******************************     RENDER     ********************************/
/******************************************************************************/

function renderLinhaCampanha(campanha,callback) {
  
}
