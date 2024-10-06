<!DOCTYPE html>
<html>
<head>
<title>DADOS</title>
<style>
    h4 {
        margin-bottom: 5px;
    }
    input[type=number], input[type=text] {
        width: 70px;
    }
    img {
        height: 15px;
        margin: 0;
        padding: 0;
        border: 0;
    }
</style>
</head>
<body>

    <div id="main">
        
    </div>
    

    <script>
    
        function salvar(personagem,atributo,valor,callback) {
            fetch('https://flechamagica.com.br/live/api.php?personagem=' + personagem + '&atributo=' + atributo + '&valor=' + valor)
              .then(response => response.json())
              .then(data => {
                  console.log(data.msg);
                  callback(data.atualizado);
              });
        }
        
        function obter(personagem,atributo,callback) {
            fetch('https://flechamagica.com.br/live/api.php?personagem=' + personagem + '&atributo=' + atributo)
              .then(response => response.json())
              .then(data => {
                  callback(data);
              });
        }
        
        function salvar_input(event,personagem,atributo) {
            let campo = atributo + '-' + personagem;
            let span = 'resultado-' + campo;
            
            document.getElementById(span).innerHTML = '<img src="img/loading.gif">';
            event.target.disabled = true;
            
            let valor = document.getElementById(campo).value;
            salvar(personagem,atributo,valor,atualizado=>{
                let resultado = 'Não salvo!';
                if (atualizado) {
                    resultado = 'Salvo!'
                }
                document.getElementById(span).innerHTML = resultado;
                event.target.disabled = false;
            });
        }
        
        function salvar_select(event,personagem,atributo) {
            let campo = atributo + '-' + personagem;
            let span = 'resultado-' + campo;
            
            document.getElementById(span).innerHTML = '<img src="img/loading.gif">';
            event.target.disabled = true;
            
            let valor = document.getElementById(campo).options[document.getElementById(campo).selectedIndex].value;
            salvar(personagem,atributo,valor,atualizado=>{
                let resultado = 'Não salvo!';
                if (atualizado) {
                    resultado = 'Salvo!'
                }
                document.getElementById(span).innerHTML = resultado;
                event.target.disabled = false;
            });
        }
        
        function obter_select(personagem,atributo) {
            let campo = atributo + '-' + personagem;
            
            obter(personagem,atributo,json=>{
                if (json.encontrado) {
                    let opcoes = document.getElementById(campo).options;
                    for (let i=0, n=opcoes.length;i<n;i++) {
                      if (opcoes[i].value == json.valor) {
                          document.getElementById(campo).selectedIndex = i;
                          return;
                      }
                    }
                }
            });
        }
        
        function obter_input(personagem,atributo) {
            let campo = atributo + '-' + personagem;
            obter(personagem,atributo,json=>{
                if (json.encontrado) {
                    document.getElementById(campo).value = json.valor;
                }
            });
        }
    
        function campos(titulo,personagem) {
            let main = document.getElementById('main');
            let html = main.innerHTML + '\n';
            
            main.innerHTML = html +
            `<h4>${titulo}</h4>
            <label >Flecha:</label>
            <select id='flecha-${personagem}'>
                <option value="não">não</option>
                <option value="sim">sim</option>
            </select>
            <button id='atualizar-flecha-${personagem}' >Atualizar</button>
            <span id='resultado-flecha-${personagem}'></span>
            <br>
            <label >Maldição:</label>
            <select id='maldicao-${personagem}'>
                <option value="não">não</option>
                <option value="sim">sim</option>
            </select>
            <button id='atualizar-maldicao-${personagem}' >Atualizar</button>
            <span id='resultado-maldicao-${personagem}'></span>
            <br>
            <label >Idade:</label>
            <input type="number" id="idade-${personagem}">
            <button id='atualizar-idade-${personagem}' >Atualizar</button>
            <span id='resultado-idade-${personagem}'></span>
            <br>
            <label >PV:</label>
            <input type="number" id="pv-${personagem}">
            <button id='atualizar-pv-${personagem}' >Atualizar</button>
            <span id='resultado-pv-${personagem}'></span>
            <br>
            <label >Nível:</label>
            <input type="text" id="nivel-${personagem}">
            <button id='atualizar-nivel-${personagem}' >Atualizar</button>
            <span id='resultado-nivel-${personagem}'></span>`;
            
            obter_select(personagem,'flecha');
            obter_select(personagem,'maldicao');
            obter_input(personagem,'idade');
            obter_input(personagem,'pv');
            obter_input(personagem,'nivel');
        }
    
        function metodos(personagem) {
            document.getElementById('atualizar-flecha-' + personagem).addEventListener('click',event=>{
                event.preventDefault();
                salvar_select(event,personagem,'flecha');
            });
            document.getElementById('atualizar-maldicao-' + personagem).addEventListener('click',event=>{
                event.preventDefault();
                salvar_select(event,personagem,'maldicao');
            });
            document.getElementById('atualizar-idade-' + personagem).addEventListener('click',event=>{
                event.preventDefault();
                salvar_input(event,personagem,'idade');
            });
            document.getElementById('atualizar-pv-' + personagem).addEventListener('click',event=>{
                event.preventDefault();
                salvar_input(event,personagem,'pv');
            });
            document.getElementById('atualizar-nivel-' + personagem).addEventListener('click',event=>{
                event.preventDefault();
                salvar_input(event,personagem,'nivel');
            });
        }
        
        function todos() {
            let dados = [
                {titulo:'Bárbara', personagem: 'barbara'},
                {titulo:'Beemon', personagem: 'beemon'},
                {titulo:'Baguera', personagem: 'baguera'},
                {titulo:'Bela', personagem: 'bela'}
            ];
            
            dados.forEach((item,index) => {
                campos(item.titulo,item.personagem);
                
                if (index == (dados.length-1)) {
                    
                    dados.forEach((item,index) => {
                        metodos(item.personagem);
                    });
                    
                }
            });
        }
        
        todos();
        
    </script>

</body>
</html>