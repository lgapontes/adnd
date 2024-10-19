let texto = "";
let LEVEL = 1;
// ⚒ $ ✠ 𝔓 𝔭 𝒜 ⨳ ♫ 🎗 ✄ ✂ ☖ ⚒ ⛉ ⛏ ⛻ ☆ ♡ ♰

const P_ITENS_ITENS = [
  { nome: '⛏ Sineta', preco: { quantidade: 1, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Algibeira Grande', preco: { quantidade: 1, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Algibeira Pequena', preco: { quantidade: 7, moeda: 'pp' }, peso: 0.25 },
  { nome: '⛏ Talha', preco: { quantidade: 5, moeda: 'po' }, peso: 2.5 },
  { nome: '⛏ Tecido Comum (1Om)', preco: { quantidade: 7, moeda: 'po' }, peso: 5 },
  { nome: '⛏ Tecido Fino (1Om)', preco: { quantidade: 50, moeda: 'po' }, peso: 5 },
  { nome: '⛏ Tecido Suntuoso (1Om)', preco: { quantidade: 100, moeda: 'po' }, peso: 5 },
  { nome: '⛏ Vela', preco: { quantidade: 1, moeda: 'pc' }, peso: 0 },
  { nome: '⛏ Lona (1m),', preco: { quantidade: 4, moeda: 'pp' }, peso: 0.5 },
  { nome: '⛏ Giz', preco: { quantidade: 1, moeda: 'pc' }, peso: 0 },
  { nome: '⛏ Ganchos de Ferro (10x)', preco: { quantidade: 4, moeda: 'po' }, peso: 1 },
  { nome: '⛏ Rede de Pesca', preco: { quantidade: 4, moeda: 'po' }, peso: 2.5 },
  { nome: '⛏ Pederneira', preco: { quantidade: 5, moeda: 'pp' }, peso: 0 },
  { nome: '⛏ Garrafa de Vidro', preco: { quantidade: 10, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Água Benta', preco: { quantidade: 25, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Símbolo Divino', preco: { quantidade: 25, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Ampulheta', preco: { quantidade: 25, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Panela de Ferro', preco: { quantidade: 5, moeda: 'pc' }, peso: 1 },
  { nome: '⛏ Farolete', preco: { quantidade: 150, moeda: 'po' }, peso: 25 },
  { nome: '⛏ Lanterna Furta-Fogo', preco: { quantidade: 12, moeda: 'po' }, peso: 1.5 },
  { nome: '⛏ Lanterna com Cobertura', preco: { quantidade: 7, moeda: 'po' }, peso: 1 },
  { nome: '⛏ Cadeado Bom', preco: { quantidade: 100, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Cadeado Razoável', preco: { quantidade: 20, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Lente de Aumento', preco: { quantidade: 100, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Porta-Mapas', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.25 },
  { nome: '⛏ Porta-Pergaminhos', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.25 },
  { nome: '⛏ Balança de Comerciante', preco: { quantidade: 2, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Espelho Pequeno de Metal', preco: { quantidade: 10, moeda: 'po' }, peso: 0 },
  { nome: '🎻 Instrumento Musical: Alaúde', preco: { quantidade: 35, moeda: 'po' }, peso: 1 },
  { nome: '🎻 Instrumento Musical: Charamela', preco: { quantidade: 2, moeda: 'po' }, peso: 0.5 },
  { nome: '🎻 Instrumento Musical: Flauta Doce', preco: { quantidade: 2, moeda: 'po' }, peso: 0.5 },
  { nome: '🎻 Instrumento Musical: Flauta', preco: { quantidade: 12, moeda: 'po' }, peso: 1 },
  { nome: '🎻 Instrumento Musical: Gaita de Fole', preco: { quantidade: 30, moeda: 'po' }, peso: 2.5 },
  { nome: '🎻 Instrumento Musical: Lira', preco: { quantidade: 30, moeda: 'po' }, peso: 1 },
  { nome: '🎻 Instrumento Musical: Tambor', preco: { quantidade: 6, moeda: 'po' }, peso: 1.5 },
  { nome: '🎻 Instrumento Musical: Trombeta', preco: { quantidade: 3, moeda: 'po' }, peso: 1 },
  { nome: '🎻 Instrumento Musical: Viola', preco: { quantidade: 30, moeda: 'po' }, peso: 0.5 },
  { nome: '🎻 Instrumento Musical: Xilofone', preco: { quantidade: 25, moeda: 'po' }, peso: 4.5 },
  { nome: '⛏ Óleo para Lamparina', preco: { quantidade: 6, moeda: 'pc' }, peso: 0.5 },
  { nome: '⛏ Papel', preco: { quantidade: 2, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Papiro', preco: { quantidade: 8, moeda: 'pp' }, peso: 0 },
  { nome: '⛏ Pergaminho', preco: { quantidade: 1, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Perfume', preco: { quantidade: 5, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Piton', preco: { quantidade: 3, moeda: 'pc' }, peso: 0.5 },
  { nome: '⛏ Piton (3x)', preco: { quantidade: 9, moeda: 'pc' }, peso: 1.5 },
  { nome: '⛏ Piton (5x)', preco: { quantidade: 15, moeda: 'pc' }, peso: 2.5 },
  { nome: '⛏ Piton (10x)', preco: { quantidade: 30, moeda: 'pc' }, peso: 5 },
  { nome: '⛏ Aljava (vazia)', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.25 },
  { nome: '⛏ Corda de Cânhamo (5m)', preco: { quantidade: 5, moeda: 'pp' }, peso: 5 },
  { nome: '⛏ Corda de Cânhamo (10m)', preco: { quantidade: 7, moeda: 'pp' }, peso: 7 },
  { nome: '⛏ Corda de Cânhamo (15m)', preco: { quantidade: 1, moeda: 'po' }, peso: 10 },
  { nome: '⛏ Corda de Cânhamo (20m)', preco: { quantidade: 2, moeda: 'po' }, peso: 15 },
  { nome: '⛏ Corda de Fio de Seda (15m)', preco: { quantidade: 10, moeda: 'po' }, peso: 4 },
  { nome: '⛏ Corda de Fio de Seda (5m)', preco: { quantidade: 6, moeda: 'po' }, peso: 1 },
  { nome: '⛏ Saco Grande', preco: { quantidade: 2, moeda: 'pp' }, peso: 0.25 },
  { nome: '⛏ Saco Pequeno', preco: { quantidade: 5, moeda: 'pc' }, peso: 0 },
  { nome: '⛏ Cera para Velas, 500g', preco: { quantidade: 1, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Cera para Lacrar, 500g', preco: { quantidade: 1, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Agulha de Costura', preco: { quantidade: 5, moeda: 'pc' }, peso: 0 },
  { nome: '⛏ Apito de Advertência', preco: { quantidade: 8, moeda: 'pp' }, peso: 0 },
  { nome: '⛏ Anel com Selo Personalizado', preco: { quantidade: 5, moeda: 'po' }, peso: 0 },
  { nome: '⛏ Sabão, 500g', preco: { quantidade: 5, moeda: 'pp' }, peso: 0.5 },
  { nome: '⛏ Pequeno Telescópio', preco: { quantidade: 1000, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Tenda Grande', preco: { quantidade: 25, moeda: 'po' }, peso: 10 },
  { nome: '⛏ Tenda Pavilhão', preco: { quantidade: 100, moeda: 'po' }, peso: 25 },
  { nome: '⛏ Tenda Pequena', preco: { quantidade: 5, moeda: 'po' }, peso: 5 },
  { nome: '⛏ Saco de Dormir', preco: { quantidade: 3, moeda: 'po' }, peso: 2 },
  { nome: '⛏ Ferramentas para Ladrões', preco: { quantidade: 30, moeda: 'po' }, peso: 0.5 },
  { nome: '⛏ Tocha', preco: { quantidade: 1, moeda: 'pc' }, peso: 0.5 },
  { nome: '⛏ Tocha (2x)', preco: { quantidade: 2, moeda: 'pc' }, peso: 1 },
  { nome: '⛏ Tocha (3x)', preco: { quantidade: 3, moeda: 'pc' }, peso: 1.5 },
  { nome: '⛏ Tocha (4x)', preco: { quantidade: 4, moeda: 'pc' }, peso: 2 },
  { nome: '⛏ Tocha (5x)', preco: { quantidade: 5, moeda: 'pc' }, peso: 2.5 },
  { nome: '⛏ Clepsidra', preco: { quantidade: 1000, moeda: 'po' }, peso: 100 },
  { nome: '⛏ Esmeril', preco: { quantidade: 2, moeda: 'pc' }, peso: 0.5 },
  { nome: '⛏ Odre de Vinho', preco: { quantidade: 8, moeda: 'pp' }, peso: 0.5 },
  { nome: '⛏ Coberta de inverno', preco: { quantidade: 3, moeda: 'po' }, peso: 2 },
  { nome: '⛏ Tinta de Escrever, 10ml', preco: { quantidade: 8, moeda: 'po' }, peso: 0 }
];

const P_ITENS_INSTRUMENTOS = [
  P_ITENS_ITENS[28],
  P_ITENS_ITENS[29],
  P_ITENS_ITENS[30],
  P_ITENS_ITENS[31],
  P_ITENS_ITENS[32],
  P_ITENS_ITENS[33],
  P_ITENS_ITENS[34],
  P_ITENS_ITENS[35],
  P_ITENS_ITENS[36],
  P_ITENS_ITENS[37]
];

const P_ITENS_VESTIMENTAS = {
  'Masculino': [
    { nome: '⚜ Botas de Montaria, Calças, Túnica', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Túnica', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sapatos, Calças, Túnica', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sapatos, Calças, Túnica, Mitenes', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Mitenes', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Luvas', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Sapatos, Calças, Túnica, Luvas', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Botas de Montaria, Calças, Manto Comum', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Manto Comum', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sapatos, Calças, Manto Comum', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Manto Comum, Cinto', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Botas de Montaria, Calças, Túnica, Cinto', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Gibão de Seda', preco: { quantidade: 80, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Gibão de Seda, Mitenes', preco: { quantidade: 80, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Gibão de Seda, Luvas', preco: { quantidade: 80, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Gibão de Seda, Cinto', preco: { quantidade: 80, moeda: 'po' } }
  ],
  'Feminino': [
    { nome: '⚜ Botas de Montaria, Calças, Túnica', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Túnica', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica, Mitenes', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica Bordada', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Túnica Bordada', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica, Luvas', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica Bordada, Luvas', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Túnica Bordada, Luvas', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Manto Comum', preco: { quantidade: 2, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Manto Comum', preco: { quantidade: 2, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Túnica Bordada, Cinto', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica, Luvas, Cinto', preco: { quantidade: 4, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Túnica Bordada, Cinto', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Túnica Bordada, Cinto', preco: { quantidade: 5, moeda: 'po' } },
    { nome: '⚜ Sandálias, Vestido Simples, Cinto', preco: { quantidade: 3, moeda: 'po' } },
    { nome: '⚜ Sandálias, Vestido Ornamentado, Cinto', preco: { quantidade: 10, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Gibão de Seda, Luvas', preco: { quantidade: 80, moeda: 'po' } },
    { nome: '⚜ Botas Normais, Calças, Gibão de Seda, Luvas', preco: { quantidade: 80, moeda: 'po' } },
    { nome: '⚜ Sandálias, Calças, Gibão de Seda', preco: { quantidade: 80, moeda: 'po' } }
  ]
};

const P_ITENS_ALIMENTOS = [
  { nome: '🍽 Cerveja (1 garrafa)', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Cerveja Leve (1 garrafa)', preco: { quantidade: 2, moeda: 'pp' } },
  { nome: '🍽 Hidromel (1 garrafa)', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Hidromel do Reino (1 garrafa)', preco: { quantidade: 1, moeda: 'po' } },
  { nome: '🍽 Pão (1 dia)', preco: { quantidade: 5, moeda: 'pc' } },
  { nome: '🍽 Lembas (1 dia)', preco: { quantidade: 1, moeda: 'po' } },
  { nome: '🍽 Pão de Viagem (1 dia)', preco: { quantidade: 10, moeda: 'pc' } },
  { nome: '🍽 Queijo (1 dia)', preco: { quantidade: 4, moeda: 'pp' } },
  { nome: '🍽 Queijo Halfling (1 dia)', preco: { quantidade: 5, moeda: 'pp' } },
  { nome: '🍽 Queijo de Viagem (1 dia)', preco: { quantidade: 5, moeda: 'pp' } },
  { nome: '🍽 Vinho (1 garrafa)', preco: { quantidade: 2, moeda: 'pp' } },
  { nome: '🍽 Vinho do Reino (1 garrafa)', preco: { quantidade: 1, moeda: 'po' } },
  { nome: '🍽 Ovos (1 dia)', preco: { quantidade: 1, moeda: 'pc' } },
  { nome: '🍽 Verduras Frescas, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { nome: '🍽 Legumes Frescos, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { nome: '🍽 Frutas, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { nome: '🍽 Frutas Secas, 500g', preco: { quantidade: 1, moeda: 'pc' } },
  { nome: '🍽 Frutas Vermelhas, 500g', preco: { quantidade: 3, moeda: 'pc' } },
  { nome: '🍽 Frutas Cítricas, 500g', preco: { quantidade: 3, moeda: 'pc' } },
  { nome: '🍽 Mel (1 garrafa)', preco: { quantidade: 5, moeda: 'pp' } },
  { nome: '🍽 Carne, 500g', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Carne Seca, 500g', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Sopa, 500ml', preco: { quantidade: 5, moeda: 'pc' } },
  { nome: '🍽 Ração de Viagem (1 dia)', preco: { quantidade: 0, moeda: 'po' } },
  { nome: '🍽 Coldre de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Chifre de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Garrafa de Água', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Peixe, 500g', preco: { quantidade: 3, moeda: 'po' } },
  { nome: '🍽 Manteiga, 500g', preco: { quantidade: 2, moeda: 'pp' } },
  { nome: '🍽 Açúcar Mascavo, 500g', preco: { quantidade: 1, moeda: 'po' } },
  { nome: '🍽 Provisões Desidratadas (1 dia)', preco: { quantidade: 5, moeda: 'pp' } },
  { nome: '🍽 Figos, 500g', preco: { quantidade: 3, moeda: 'pp' } },
  { nome: '🍽 Nozes, 500g', preco: { quantidade: 1, moeda: 'po' } },
  { nome: '🍽 Uvas Passas, 500g', preco: { quantidade: 2, moeda: 'pp' } },
  { nome: '🍽 Arroz, 500g', preco: { quantidade: 2, moeda: 'pp' } },
  { nome: '🍽 Sal, 500g', preco: { quantidade: 1, moeda: 'pp' } },
  { nome: '🍽 Açafrão, 500g', preco: { quantidade: 15, moeda: 'po' } },
  { nome: '🍽 Cravo, 500g', preco: { quantidade: 15, moeda: 'po' } },
  { nome: '🍽 Pimenta, 500g', preco: { quantidade: 2, moeda: 'po' } },
  { nome: '🍽 Gengibre, 500g', preco: { quantidade: 2, moeda: 'po' } },
  { nome: '🍽 Canela, 500g', preco: { quantidade: 1, moeda: 'po' } },
  { nome: '🍽 Cidra (1 garrafa)', preco: { quantidade: 8, moeda: 'po' } },
  { nome: '🍽 Raízes Medicinais (1pv)', preco: { quantidade: 10, moeda: 'po' } },
  { nome: '🍽 Folhas Medicinais (1pv)', preco: { quantidade: 10, moeda: 'po' } },
  { nome: '🍽 Frutas Medicinais (1pv)', preco: { quantidade: 10, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } },
  { nome: '⚱ Poção de Cura (2d4+2)', preco: { quantidade: 60, moeda: 'po' } },
  { nome: '⚱ Meia Poção de Cura (1d4+1)', preco: { quantidade: 30, moeda: 'po' } }
];

const P_ITENS_ESCUDOS = [
  { level: 2, nome: '🛡 Escudo de Corpo de Madeira', ca: 1, preco: { quantidade: 7, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 0, detalhes: [ "O Escudo de Corpo fornece +1 de Categoria de Armadura para ataques à distância." ] },
  { level: 1, nome: '🛡 Broquei (escudo) de Madeira', ca: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 1, nome: '🛡 Escudo Médio de Madeira', ca: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 5, ataques_por_rodada: 0, detalhes: [] },
  { level: 1, nome: '🛡 Escudo Pequeno de Madeira', ca: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 2, detalhes: [] },
  { level: 5, nome: '🛡 Escudo de Corpo de Ferro', ca: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 0, detalhes: [ "O Escudo de Corpo fornece +1 de Categoria de Armadura para ataques à distância." ] },
  { level: 3, nome: '🛡 Broquei (escudo) de Ferro', ca: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 3, nome: '🛡 Escudo Médio de Ferro', ca: 1, preco: { quantidade: 7, moeda: 'po' }, peso: 5, ataques_por_rodada: 0, detalhes: [] },
  { level: 3, nome: '🛡 Escudo Pequeno de Ferro', ca: 1, preco: { quantidade: 3, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 2, detalhes: [] },
  { level: 5, nome: '🛡 Escudo de Corpo de bronze', ca: 1, preco: { quantidade: 12, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 0, detalhes: [ "O Escudo de Corpo fornece +1 de Categoria de Armadura para ataques à distância." ] },
  { level: 5, nome: '🛡 Broquei (escudo) de bronze', ca: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 5, nome: '🛡 Escudo Médio de bronze', ca: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 5, ataques_por_rodada: 0, detalhes: [] },
  { level: 5, nome: '🛡 Escudo Pequeno de bronze', ca: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 2, detalhes: [] },
  { level: 1, nome: '🛡 Escudo de Corpo (rachado)', ca: 1, preco: { quantidade: 3, moeda: 'po' }, peso: 7.5, ataques_por_rodada: 3, detalhes: [ "O Escudo de Corpo fornece +1 de Categoria de Armadura para ataques à distância." ] },
  { level: 1, nome: '🛡 Broquei (escudo, rachado)', ca: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1.5, ataques_por_rodada: 1, detalhes: [] },
  { level: 1, nome: '🛡 Escudo Médio (rachado)', ca: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 5, ataques_por_rodada: 2, detalhes: [] },
  { level: 1, nome: '🛡 Escudo Pequeno (rachado)', ca: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2.5, ataques_por_rodada: 1, detalhes: [] }
];

const P_ITENS_ARMADURAS = [
  { level: 1, nome: '♔ Corselete de Couro Simples', ca: 8, preco: { quantidade: 5, moeda: 'po' }, peso: 7.5 },
  { level: 1, nome: '♔ Corselete de Couro Simples (rasgado)', ca: 9, preco: { quantidade: 4, moeda: 'po' }, peso: 7.5 },
  { level: 1, nome: '♔ Corselete de Couro Acolchoado', ca: 8, preco: { quantidade: 4, moeda: 'po' }, peso: 5 },
  { level: 1, nome: '♔ Corselete de Couro Acolchoado (rasgado)', ca: 9, preco: { quantidade: 3, moeda: 'po' }, peso: 5 },
  { level: 1, nome: '♔ Corselete de Couro Batido', ca: 7, preco: { quantidade: 20, moeda: 'po' }, peso: 12.5 },
  { level: 1, nome: '♔ Corselete de Couro Batido (rasgado)', ca: 8, preco: { quantidade: 15, moeda: 'po' }, peso: 12.5 },
  { level: 2, nome: '♔ Loriga', ca: 7, preco: { quantidade: 100, moeda: 'po' }, peso: 15 },
  { level: 2, nome: '♔ Loriga (amassada)', ca: 8, preco: { quantidade: 80, moeda: 'po' }, peso: 15 },
  { level: 3, nome: '♔ Brigandina', ca: 6, preco: { quantidade: 120, moeda: 'po' }, peso: 17.5 },
  { level: 3, nome: '♔ Brigandina (cortada)', ca: 7, preco: { quantidade: 100, moeda: 'po' }, peso: 17.5 },
  { level: 3, nome: '♔ Brunea', ca: 6, preco: { quantidade: 120, moeda: 'po' }, peso: 20 },
  { level: 3, nome: '♔ Brunea (amassada)', ca: 7, preco: { quantidade: 100, moeda: 'po' }, peso: 20 },
  { level: 4, nome: '♔ Gibão de Peles', ca: 6, preco: { quantidade: 15, moeda: 'po' }, peso: 15 },
  { level: 4, nome: '♔ Gibão de Peles (rasgado)', ca: 7, preco: { quantidade: 13, moeda: 'po' }, peso: 15 },
  { level: 5, nome: '♔ Cota de Malha', ca: 5, preco: { quantidade: 75, moeda: 'po' }, peso: 20 },
  { level: 5, nome: '♔ Cota de Malha (com elos faltando)', ca: 6, preco: { quantidade: 60, moeda: 'po' }, peso: 20 },
  { level: 5, nome: '♔ Cota de Malha Élfica', ca: 5, preco: { quantidade: 200, moeda: 'po' }, peso: 10 },
  { level: 6, nome: '♔ Cota de Talas', ca: 4, preco: { quantidade: 80, moeda: 'po' }, peso: 20 },
  { level: 6, nome: '♔ Cota de Talas (com placas faltando)', ca: 5, preco: { quantidade: 70, moeda: 'po' }, peso: 20 },
  { level: 6, nome: '♔ Loriga Segmentada', ca: 4, preco: { quantidade: 200, moeda: 'po' }, peso: 17.5 },
  { level: 6, nome: '♔ Loriga Segmentada (amassada)', ca: 5, preco: { quantidade: 180, moeda: 'po' }, peso: 17.5 },
  { level: 7, nome: '♔ Armadura de Bronze', ca: 4, preco: { quantidade: 400 , moeda: 'po' }, peso: 22.5 },
  { level: 7, nome: '♔ Armadura de Bronze (amassada)', ca: 5, preco: { quantidade: 350 , moeda: 'po' }, peso: 22.5 },
  { level: 8, nome: '♔ Armadura Simples', ca: 3, preco: { quantidade: 600, moeda: 'po' }, peso: 25 },
  { level: 8, nome: '♔ Armadura Simples (amassada)', ca: 4, preco: { quantidade: 550, moeda: 'po' }, peso: 25 },
  { level: 9, nome: '♔ Armadura de Batalha', ca: 2, preco: { quantidade: 2000, moeda: 'po' }, peso: 30 },
  { level: 9, nome: '♔ Armadura de Batalha (amassada)', ca: 3, preco: { quantidade: 1900, moeda: 'po' }, peso: 30 },
  { level: 10, nome: '♔ Armadura Completa', ca: 1, preco: { quantidade: 4000, moeda: 'po' }, peso: 35 },
  { level: 10, nome: '♔ Armadura Completa (amassada)', ca: 2, preco: { quantidade: 3900, moeda: 'po' }, peso: 35 },
  { level: 1, nome: '♔ Elmo Grande', ca: 0, preco: { quantidade: 30, moeda: 'po' }, peso: 5 },
  { level: 1, nome: '♔ Elmo Grande (amassado)', ca: 0, preco: { quantidade: 28, moeda: 'po' }, peso: 5 },
  { level: 1, nome: '♔ Basinet', ca: 0, preco: { quantidade: 8, moeda: 'po' }, peso: 2.5 },
  { level: 1, nome: '♔ Basinet (amassado)', ca: 0, preco: { quantidade: 7, moeda: 'po' }, peso: 2.5 }
];

const P_ITENS_MISSEIS = {
  "🏹 Dardo Farpado": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d3', cadencia: '2/1' },
  "🏹 Dardo Agulha": { level: 1, quantidade: 1, preco: { quantidade: 2, moeda: 'pc' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1', dano_mg: '1', cadencia: '2/1' },
  "🏹 Flecha de Caça": { level: 1, quantidade: 1, preco: { quantidade: 3, moeda: 'pc' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d6', dano_mg: '1d6', cadencia: '2/1' },
  "🏹 Flecha da Guerra": { level: 1, quantidade: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d8', dano_mg: '1d8', cadencia: '2/1' },
  "🏹 Quadrelo de Mão": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d2', cadencia: '1/1' },
  "🏹 Quadrelo Grande": { level: 1, quantidade: 1, preco: { quantidade: 2, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d4+1', dano_mg: '1d6+1', cadencia: '1/1' },
  "🏹 Quadrelo Pequeno": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d4', dano_mg: '1d4', cadencia: '1/2' },
  "🏹 Chumbo de Funda": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pc' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Concussão', velocidade: 0, dano_p: '1d4+1', dano_mg: '1d6+1', cadencia: '2/1' },
  "🏹 Pedra de Funda": { level: 1, quantidade: 1, preco: { quantidade: 1, moeda: 'pc' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Concussão', velocidade: 4, dano_p: '1d4', dano_mg: '1d4', cadencia: '2/1' }
};

const P_ITENS_ARMAS = {
  "⚔ Arcabuz": { level: 10, preco: { quantidade: 500, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 15, dano_p: '1d10', dano_mg: '1d10', dano: 10, detalhes: [] },
  "⚔ Arcabuz (quase quebrado)": { level: 10, preco: { quantidade: 490, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 15, dano_p: '1d10-1', dano_mg: '1d10-1', dano: 10, detalhes: [] },
  "⚔ Machado de Guerra": { level: 3, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 7, dano_p: '1d8', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Machado de Guerra (lascado)": { level: 3, preco: { quantidade: 4, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 7, dano_p: '1d8-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Zarabatana": { preco: { level: 1, quantidade: 5, moeda: 'po' }, peso: 1, tamanho: 'Grande', tipo: '', velocidade: 5, dano_p: '', dano_mg: '', dano: 3, detalhes: [] },
  "⚔ Arco Longo Composto": { level: 5, preco: { quantidade: 100, moeda: 'po' }, peso: 1.5, tamanho: 'Grande', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 8, detalhes: [] },
  "⚔ Arco Longo Composto (quase quebrado)": { level: 5, preco: { quantidade: 100, moeda: 'po' }, peso: 1.5, tamanho: 'Grande', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 8, detalhes: [] },
  "⚔ Arco Curto Composto": { level: 5, preco: { quantidade: 75, moeda: 'po' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 6, dano_p: '', dano_mg: '', dano: 6, detalhes: [] },
  "⚔ Arco Curto Composto (quase quebrado)": { level: 5, preco: { quantidade: 75, moeda: 'po' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 6, dano_p: '', dano_mg: '', dano: 6, detalhes: [] },
  "⚔ Arco Longo": { level: 3, preco: { quantidade: 75, moeda: 'po' }, peso: 1.5, tamanho: 'Grande', tipo: '', velocidade: 8, dano_p: '', dano_mg: '', dano: 8, detalhes: [] },
  "⚔ Arco Longo (quase quebrado)": { level: 3, preco: { quantidade: 75, moeda: 'po' }, peso: 1.5, tamanho: 'Grande', tipo: '', velocidade: 8, dano_p: '', dano_mg: '', dano: 8, detalhes: [] },
  "⚔ Arco Curto": { level: 1, preco: { quantidade: 30, moeda: 'po' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 6, detalhes: [] },
  "⚔ Arco Curto (quase quebrado)": { level: 1, preco: { quantidade: 30, moeda: 'po' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 6, detalhes: [] },
  "⚔ Clava": { level: 1, preco: { quantidade: 0, moeda: 'po' }, peso: 1.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 4, dano_p: '1d6', dano_mg: '1d3', dano: 3, detalhes: [] },
  "⚔ Clava (rachada)": { level: 1, preco: { quantidade: 0, moeda: 'po' }, peso: 1.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 4, dano_p: '1d6-1', dano_mg: '1d3-1', dano: 3, detalhes: [] },
  "⚔ Clava com Espinhos": { level: 1, preco: { quantidade: 0, moeda: 'po' }, peso: 1.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 4, dano_p: '1d6+1', dano_mg: '1d3+1', dano: 3, detalhes: [] },
  "⚔ Besta de Mão": { level: 2, preco: { quantidade: 300, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: '', velocidade: 5, dano_p: '', dano_mg: '', dano: 2, detalhes: [] },
  "⚔ Besta de Mão (quase quebrada)": { level: 2, preco: { quantidade: 300, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: '', velocidade: 5, dano_p: '', dano_mg: '', dano: 2, detalhes: [] },
  "⚔ Besta Pesada": { level: 3, preco: { quantidade: 50, moeda: 'po' }, peso: 7, tamanho: 'Médio', tipo: '', velocidade: 10, dano_p: '', dano_mg: '', dano: 7, detalhes: [] },
  "⚔ Besta Pesada (quase quebrada)": { level: 3, preco: { quantidade: 50, moeda: 'po' }, peso: 7, tamanho: 'Médio', tipo: '', velocidade: 10, dano_p: '', dano_mg: '', dano: 7, detalhes: [] },
  "⚔ Besta Leve": { level: 1, preco: { quantidade: 35, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "⚔ Besta Leve (quase quebrada)": { level: 1, preco: { quantidade: 35, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "⚔ Adaga": { level: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4', dano_mg: '1d3', dano: 3, detalhes: [] },
  "⚔ Adaga (lascada)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4-1', dano_mg: '1d3-1', dano: 3, detalhes: [] },
  "⚔ Adaga (enferrujada)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4-1', dano_mg: '1d3-1', dano: 3, detalhes: [] },
  "⚔ Punhal": { level: 1, preco: { quantidade: 2, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4', dano_mg: '1d3', dano: 3, detalhes: [] },
  "⚔ Punhal (lascado)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4-1', dano_mg: '1d3-1', dano: 3, detalhes: [] },
  "⚔ Punhal (enferrujado)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d4-1', dano_mg: '1d3-1', dano: 3, detalhes: [] },
  "⚔ Dardo": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d3', dano_mg: '1d2', dano: 2, detalhes: [] },
  "⚔ Mangual de Infantaria": { level: 2, preco: { quantidade: 15, moeda: 'po' }, peso: 7.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6+1', dano_mg: '2d4', dano: 8, detalhes: [] },
  "⚔ Mangual de Infantaria (lascado)": { level: 2, preco: { quantidade: 13, moeda: 'po' }, peso: 7.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6', dano_mg: '2d4-1', dano: 8, detalhes: [] },
  "⚔ Mangual": { preco: { level: 2, quantidade: 10, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6', dano_mg: '2d4', dano: 8, detalhes: [] },
  "⚔ Mangual (lascado)": { preco: { level: 2, quantidade: 9, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6-1', dano_mg: '2d4-1', dano: 8, detalhes: [] },
  "⚔ Maça de Infantaria": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6+1', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Maça de Infantaria (amassada)": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Maça": { level: 1, preco: { quantidade: 6, moeda: 'po' }, peso: 4, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Maça (amassada)": { level: 1, preco: { quantidade: 4, moeda: 'po' }, peso: 4, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '1d6-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Alvião de Infantaria": { level: 3, preco: { quantidade: 8, moeda: 'po' }, peso: 3, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6+1', dano_mg: '2d4', dano: 8, detalhes: [] },
  "⚔ Alvião": { level: 3, preco: { quantidade: 7, moeda: 'po' }, peso: 3, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6', dano_mg: '2d4', dano: 9, detalhes: [] },
  "⚔ Machadinha": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 4, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Machadinha (lascada)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 4, dano_p: '1d6-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Arpão": { level: 2, preco: { quantidade: 20, moeda: 'po' }, peso: 3, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '2d4', dano_mg: '2d6', dano: 13, detalhes: [] },
  "⚔ Mangual de Cavalaria": { level: 4, preco: { quantidade: 8, moeda: 'po' }, peso: 2.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 6, dano_p: '1d4+1', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Mangual de Cavalaria (lascado)": { level: 4, preco: { quantidade: 7, moeda: 'po' }, peso: 2.5, tamanho: 'Médio', tipo: 'Concussão', velocidade: 6, dano_p: '1d4', dano_mg: '1d4-1', dano: 4, detalhes: [] },
  "⚔ Maça de Cavalaria": { level: 3, preco: { quantidade: 5, moeda: 'po' }, peso: 3, tamanho: 'Médio', tipo: 'Concussão', velocidade: 6, dano_p: '1d6', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Maça de Cavalaria (amassada)": { level: 3, preco: { quantidade: 4, moeda: 'po' }, peso: 3, tamanho: 'Médio', tipo: 'Concussão', velocidade: 6, dano_p: '1d6-1', dano_mg: '1d4-1', dano: 4, detalhes: [] },
  "⚔ Alvião de Cavalaria": { level: 3, preco: { quantidade: 7, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 5, dano_p: '1d4+1', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Azagaia": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 4, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Faca": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Perfurante/Cortante', velocidade: 2, dano_p: '1d3', dano_mg: '1d2', dano: 2, detalhes: [] },
  "⚔ Faca (lascada)": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Perfurante/Cortante', velocidade: 2, dano_p: '1d2', dano_mg: '1', dano: 2, detalhes: [] },
  "⚔ Lança de Cavalaria Pesada": { level: 5, preco: { quantidade: 15, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 8, dano_p: '1d8+1', dano_mg: '3d6', dano: 20, detalhes: [ "A Lança de Cavalaria Pesada inflige dano duplo quando usada por atacante em montaria." ] },
  "⚔ Lança de Cavalaria": { level: 3, preco: { quantidade: 6, moeda: 'po' }, peso: 2.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 6, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [ "A Lança de Cavalaria Leve inflige dano duplo quando usada por atacante em montaria." ] },
  "⚔ Lança de Tornoio": { level: 5, preco: { quantidade: 20, moeda: 'po' }, peso: 20, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 10, dano_p: '1d3-1', dano_mg: '1d2-1', dano: 1, detalhes: [ "A Lança de Tornoio inflige dano duplo quando usada por atacante em montaria." ] },
  "⚔ Lança de Cavalaria Média": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6+1', dano_mg: '2d6', dano: 13, detalhes: [ "A Lança de Cavalaria Média inflige dano duplo quando usada por atacante em montaria." ] },
  "⚔ Aprisionador": { level: 1, preco: { quantidade: 30, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: '', velocidade: 7, dano_p: '', dano_mg: '', dano: 1, detalhes: [ "O Aprisionador pode derrubar um cavaleiro num golpe bem sucedido." ] },
  "⚔ Maça-Estrela": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 6, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '2d4', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "⚔ Maça-Estrela (quase quebrada)": { level: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 6, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '2d4-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Maça-Estrela (enferrujada)": { level: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 6, tamanho: 'Médio', tipo: 'Concussão', velocidade: 7, dano_p: '2d4-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Pique": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 6, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 13, dano_p: '1d6', dano_mg: '1d12', dano: 12, detalhes: [ "O Pique inflige dano duplo quando firmemente presa para receber ataque." ] },
  "⚔ Bardiche": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 6, tamanho: 'Grande', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '2d6', dano: 13, detalhes: [] },
  "⚔ Bec de Corbin": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 5, tamanho: 'Grande', tipo: 'Perfurante/Concussão', velocidade: 9, dano_p: '1d8', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Bill-Guisarme": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 10, dano_p: '2d4', dano_mg: '1d10', dano: 10, detalhes: [] },
  "⚔ Fauchard": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 8, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Bordona": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 8, dano_p: '1d8', dano_mg: '1d10', dano: 10, detalhes: [] },
  "⚔ Glaive": { level: 2, preco: { quantidade: 6, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Cortante', velocidade: 8, dano_p: '1d6', dano_mg: '1d10', dano: 10, detalhes: [ "A Glaive inflige dano duplo se usada contra atacantes de tamanho G ou maiores." ] },
  "⚔ Glaive Guisarme": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '2d6', dano: 13, detalhes: [ "A Glaive Guisarme inflige dano duplo se usada contra atacantes de tamanho G ou maiores." ] },
  "⚔ Guisarme": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Cortante', velocidade: 8, dano_p: '2d4', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Guisarme Voulge": { level: 2, preco: { quantidade: 8, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 10, dano_p: '2d4', dano_mg: '2d4', dano: 9, detalhes: [] },
  "⚔ Alabarda": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 9, dano_p: '1d10', dano_mg: '2d6', dano: 13, detalhes: [] },
  "⚔ Fauchard Gancho": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Perfurante/Cortante', velocidade: 9, dano_p: '1d4', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Martelo Lucerno": { level: 2, preco: { quantidade: 7, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Perfurante/Concussão', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [ "O Martelo Lucerno inflige dano duplo quando firmemente presa para receber ataque." ] },
  "⚔ Bidente": { level: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d8', dano_mg: '2d4', dano: 9, detalhes: [] },
  "⚔ Bidente (enferrujado)": { level: 1, preco: { quantidade: 4, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d8-1', dano_mg: '2d4-1', dano: 9, detalhes: [] },
  "⚔ Partisan": { level: 2, preco: { quantidade: 10, moeda: 'po' }, peso: 4, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 9, dano_p: '1d6', dano_mg: '1d6+1', dano: 7, detalhes: [ "O Partisan inflige dano duplo quando firmemente presa para receber ataque." ] },
  "⚔ Ranseur": { level: 2, preco: { quantidade: 6, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 8, dano_p: '2d4', dano_mg: '2d4', dano: 9, detalhes: [ "O Ranseur inflige dano duplo quando firmemente presa para receber ataque." ] },
  "⚔ Spetum": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 8, dano_p: '1d6+1', dano_mg: '2d6', dano: 13, detalhes: [ "O Spetum inflige dano duplo quando firmemente presa para receber ataque." ] },
  "⚔ Voulge": { level: 2, preco: { quantidade: 5, moeda: 'po' }, peso: 6, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '2d4', dano_mg: '2d4', dano: 9, detalhes: [] },
  "⚔ Bordão": { level: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 2, tamanho: 'Grande', tipo: 'Concussão', velocidade: 4, dano_p: '1d6', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Bordão (enferrujado)": { level: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 2, tamanho: 'Grande', tipo: 'Concussão', velocidade: 4, dano_p: '1d6-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Açoite": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: '', velocidade: 5, dano_p: '1d4', dano_mg: '1d2', dano: 2, detalhes: [] },
  "⚔ Foice": { level: 1, preco: { quantidade: 6, moeda: 'pp' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 4, dano_p: '1d4+1', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Foice (lascada)": { level: 1, preco: { quantidade: 6, moeda: 'pp' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 4, dano_p: '1d4', dano_mg: '1d4-1', dano: 4, detalhes: [] },
  "⚔ Foice (enferrujada)": { level: 1, preco: { quantidade: 6, moeda: 'pp' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 4, dano_p: '1d4', dano_mg: '1d4-1', dano: 4, detalhes: [] },
  "⚔ Funda": { level: 1, preco: { quantidade: 5, moeda: 'pc' }, peso: 0, tamanho: 'Pequeno', tipo: '', velocidade: 6, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "⚔ Lança": { level: 1, preco: { quantidade: 8, moeda: 'pp' }, peso: 2.5, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 6, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Lança (quase quebrada)": { level: 1, preco: { quantidade: 8, moeda: 'pp' }, peso: 2.5, tamanho: 'Médio', tipo: 'Perfurante', velocidade: 6, dano_p: '1d6-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Cajado-Funda": { level: 1, preco: { quantidade: 2, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 11, dano_p: '', dano_mg: '', dano: 4, detalhes: [] },
  "⚔ Espada Bastarda": { level: 5, preco: { quantidade: 25, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 6, dano_p: '1d8', dano_mg: '1d12', dano: 12, detalhes: [ "Quando usada com duas mãos, a Espada Bastarda possui velocidade 8, dano a personagens P de 2d4 e personagens M ou G de 2d8." ] },
  "⚔ Espada Bastarda (enferrujada)": { level: 5, preco: { quantidade: 23, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 6, dano_p: '1d8-1', dano_mg: '1d12-1', dano: 12, detalhes: [ "Quando usada com duas mãos, a Espada Bastarda possui velocidade 8, dano a personagens P de 2d4 e personagens M ou G de 2d8." ] },
  "⚔ Espada Bastarda (lascada)": { level: 5, preco: { quantidade: 23, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 6, dano_p: '1d8-1', dano_mg: '1d12-1', dano: 12, detalhes: [ "Quando usada com duas mãos, a Espada Bastarda possui velocidade 8, dano a personagens P de 2d4 e personagens M ou G de 2d8." ] },
  "⚔ Espada Larga": { level: 5, preco: { quantidade: 10, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '2d4', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "⚔ Espada Larga (enferrujada)": { level: 5, preco: { quantidade: 9, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '2d4-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Espada Larga (lascada)": { level: 5, preco: { quantidade: 9, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '2d4-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Khopesh": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Khopesh (enferrujada)": { level: 3, preco: { quantidade: 9, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Khopesh (lascada)": { level: 3, preco: { quantidade: 9, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Espada Longa": { level: 2, preco: { quantidade: 15, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '1d8', dano_mg: '1d12', dano: 12, detalhes: [] },
  "⚔ Espada Longa (enferrujada)": { level: 2, preco: { quantidade: 13, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '1d8-1', dano_mg: '1d12-1', dano: 12, detalhes: [] },
  "⚔ Espada Longa (lascada)": { level: 2, preco: { quantidade: 13, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '1d8-1', dano_mg: '1d12-1', dano: 12, detalhes: [] },
  "⚔ Cimitarra": { level: 1, preco: { quantidade: 15, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '1d8', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Cimitarra (enferrujada)": { level: 1, preco: { quantidade: 13, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '1d8-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Cimitarra (lascada)": { level: 1, preco: { quantidade: 13, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '1d8-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Espada Curta": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Espada Curta (enferrujada)": { level: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Espada Curta (lascada)": { level: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Montante": { level: 8, preco: { quantidade: 50, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '1d10', dano_mg: '3d6', dano: 20, detalhes: [] },
  "⚔ Montante (enferrujada)": { level: 8, preco: { quantidade: 48, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '1d10-1', dano_mg: '3d6-2', dano: 20, detalhes: [] },
  "⚔ Montante (lascada)": { level: 8, preco: { quantidade: 48, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '1d10-1', dano_mg: '3d6-2', dano: 20, detalhes: [] },
  "⚔ Tridente": { level: 3, preco: { quantidade: 15, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6+1', dano_mg: '3d4', dano: 14, detalhes: [] },
  "⚔ Tridente (enferrujado)": { level: 3, preco: { quantidade: 13, moeda: 'po' }, peso: 3.5, tamanho: 'Grande', tipo: 'Perfurante', velocidade: 7, dano_p: '1d6', dano_mg: '3d4-2', dano: 14, detalhes: [] },
  "⚔ Martelo de Batalha": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 4, tamanho: 'Médio', tipo: 'Concussão', velocidade: 4, dano_p: '1d6', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "⚔ Martelo de Batalha (amassado)": { level: 3, preco: { quantidade: 9, moeda: 'po' }, peso: 4, tamanho: 'Médio', tipo: 'Concussão', velocidade: 4, dano_p: '1d6-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Martelo": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d4', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Martelo (amassado)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d4-1', dano_mg: '1d4-1', dano: 4, detalhes: [] },
  "⚔ Chicote": { level: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 8, dano_p: '1d2', dano_mg: '1', dano: 1, detalhes: [] },
  "⚔ Rapieira": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Rapieira (enferrujada)": { level: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6-1', dano_mg: '1d8-1', dano: 8, detalhes: [] },
  "⚔ Flamberge": { level: 3, preco: { quantidade: 10, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '2d4', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "⚔ Flamberge (enferrujada)": { level: 3, preco: { quantidade: 9, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 5, dano_p: '2d4-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Gládio": { level: 1, preco: { quantidade: 12, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d6+1', dano: 7, detalhes: [] },
  "⚔ Gládio (enferrujado)": { level: 1, preco: { quantidade: 11, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6-1', dano_mg: '1d6', dano: 7, detalhes: [] },
  "⚔ Gládio (lascado)": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d4', dano_mg: '1d6-1', dano: 7, detalhes: [] },
  "⚔ Falchion": { level: 1, preco: { quantidade: 12, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 3, dano_p: '1d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Falchion (enferrujada)": { level: 1, preco: { quantidade: 11, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 3, dano_p: '1d4-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Falchion (lascada)": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 3, dano_p: '1d4-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Alfange": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Claymore": { level: 5, preco: { quantidade: 50, moeda: 'po' }, peso: 7.5, tamanho: 'Grande', tipo: 'Cortante', velocidade: 10, dano_p: '1d10', dano_mg: '3d6', dano: 20, detalhes: [] },
  "⚔ Machete": { level: 1, preco: { quantidade: 5, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 2, dano_p: '1d4', dano_mg: '1d4+1', dano: 5, detalhes: [] },
  "⚔ Machete (enferrujada)": { level: 1, preco: { quantidade: 4, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 2, dano_p: '1d4-1', dano_mg: '1d4', dano: 5, detalhes: [] },
  "⚔ Sabre": { level: 1, preco: { quantidade: 10, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4', dano_mg: '1d6', dano: 6, detalhes: [] },
  "⚔ Sabre (enferrujado)": { level: 1, preco: { quantidade: 9, moeda: 'po' }, peso: 3.5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 9, dano_p: '2d4-1', dano_mg: '1d6-1', dano: 6, detalhes: [] },
  "⚔ Zweihander": { level: 3, preco: { quantidade: 25, moeda: 'po' }, peso: 5, tamanho: 'Médio', tipo: 'Cortante', velocidade: 6, dano_p: '1d8', dano_mg: '1d12', dano: 12, detalhes: [ "Quando usada com duas mãos, a Zweihander possui velocidade 8, dano a personagens P de 2d4 e personagens M ou G de 2d8." ] },
  "⚔ Wakizashi": { level: 5, preco: { quantidade: 20, moeda: 'po' }, peso: 1, tamanho: 'Pequeno', tipo: 'Cortante', velocidade: 2, dano_p: '1d6+1', dano_mg: '1d8+1', dano: 9, detalhes: [] },
  "⚔ Katana": { level: 5, preco: { quantidade: 25, moeda: 'po' }, peso: 2, tamanho: 'Médio', tipo: 'Cortante', velocidade: 4, dano_p: '1d8+1', dano_mg: '1d12+1', dano: 13, detalhes: [] },
  "⚔ Tachi": { level: 5, preco: { quantidade: 15, moeda: 'po' }, peso: 1.5, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 3, dano_p: '1d6', dano_mg: '1d8', dano: 8, detalhes: [] },
  "⚔ Tanto": { level: 5, preco: { quantidade: 10, moeda: 'pp' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d3', dano_mg: '1d3', dano: 3, detalhes: [] },
  "⚔ Shuriken": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 0.25, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 2, dano_p: '1d2', dano_mg: '1d2', dano: 2, detalhes: [] },
  "⚔ Corrente": { level: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 8, dano_p: '1d2', dano_mg: '1', dano: 1, detalhes: [] },
  "⚔ Cajado": { level: 1, preco: { quantidade: 10, moeda: 'pp' }, peso: 1, tamanho: 'Grande', tipo: 'Concussão', velocidade: 3, dano_p: '1d4', dano_mg: '1d4', dano: 4, detalhes: [] },
  "⚔ Cajado (quase quebrado)": { level: 1, preco: { quantidade: 10, moeda: 'pp' }, peso: 1, tamanho: 'Grande', tipo: 'Concussão', velocidade: 3, dano_p: '1d4-1', dano_mg: '1d4-1', dano: 4, detalhes: [] },
  "⚔ Cetro": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1, tamanho: 'Grande', tipo: 'Concussão', velocidade: 5, dano_p: '1d4', dano_mg: '1d4+1', dano: 5, detalhes: [] },
  "⚔ Cetro (quase quebrado)": { level: 1, preco: { quantidade: 1, moeda: 'po' }, peso: 1, tamanho: 'Grande', tipo: 'Concussão', velocidade: 5, dano_p: '1d4-1', dano_mg: '1d4', dano: 5, detalhes: [] },
  "⚔ Cajado Pequeno": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d3', dano_mg: '1d3', dano: 3, detalhes: [] },
  "⚔ Cajado Pequeno (quase quebrado)": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d2', dano_mg: '1d2', dano: 3, detalhes: [] },
  "⚔ Bastão": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d3', dano_mg: '1d3', dano: 3, detalhes: [] },
  "⚔ Bastão (quase quebrado)": { level: 1, preco: { quantidade: 5, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: 'Concussão', velocidade: 3, dano_p: '1d2', dano_mg: '1d2', dano: 3, detalhes: [] },
  "⚔ Laço": { level: 1, preco: { quantidade: 1, moeda: 'pp' }, peso: 1, tamanho: 'Médio', tipo: '', velocidade: 8, dano_p: '1d2', dano_mg: '1', dano: 1, detalhes: [] }
};

function sortear_lista_itens_itens(loot, itens, total_itens,callback) {
  for (let i=0; i<total_itens; i++) {

    if (Math.floor(Math.random() * 2) == 0) {
      let index = Math.floor(Math.random() * itens.length);
      texto = texto + p_itens_formatar_item_itens(loot, itens[index]) + "<br/>";
    }

    if (i == (total_itens-1)) {
      callback();
    }
  }
}

function sortear_lista_armaduras_itens(loot, total_itens,callback) {
  let itens = P_ITENS_ARMADURAS;
  for (let i=0; i<total_itens; i++) {

    if (Math.floor(Math.random() * 2) == 0) {
      let index = Math.floor(Math.random() * itens.length);
      if (itens[index].level <= LEVEL) {
        texto = texto + p_itens_formatar_item_itens(loot, itens[index]) + "<br/>";
      }
    }

    if (i == (total_itens-1)) {
      callback();
    }
  }
}

function sortear_lista_misseis_itens(loot, total_itens,callback) {
  let keys = Object.keys(P_ITENS_MISSEIS);
  for (let i=0; i<total_itens; i++) {

    if (Math.floor(Math.random() * 2) == 0) {
      let index = Math.floor(Math.random() * keys.length);
      texto = texto + formatar_misseis_itens(loot, keys[index], P_ITENS_MISSEIS[keys[index]]) + "<br/>";
    }

    if (i == (total_itens-1)) {
      callback();
    }
  }
}

function sortear_lista_armas_itens(loot, total_itens,callback) {
  let keys = Object.keys(P_ITENS_ARMAS);
  for (let i=0; i<total_itens; i++) {
    if (Math.floor(Math.random() * 2) == 0) {

      let index = Math.floor(Math.random() * keys.length);
      if (P_ITENS_ARMAS[keys[index]].level <= LEVEL) {
        texto = texto + p_itens_formatar_arma_itens(loot, keys[index], P_ITENS_ARMAS[keys[index]]) + "<br/>";
      }

    }
    if (i == (total_itens-1)) {
      callback();
    }
  }
}

function sortear_lista_escudos_itens(loot, total_itens,callback) {
  let keys = Object.keys(P_ITENS_ESCUDOS);
  for (let i=0; i<total_itens; i++) {
    if (Math.floor(Math.random() * 2) == 0) {
      let index = Math.floor(Math.random() * keys.length);
      if (P_ITENS_ESCUDOS[keys[index]].level <= LEVEL) {
        texto = texto + formatar_escudos_itens(loot, P_ITENS_ESCUDOS[keys[index]]);
      }
    }
    if (i == (total_itens-1)) {
      callback();
    }
  }
}

function sortear_moedas_itens(callback) {
  let moedas = '';
  /* Peça de Cobre (pc) */
  if (Math.floor(Math.random() * 2) == 0) {
    moedas = '<b>🏆 Moedas:</b> <i style="color: #966a18;">' + (Math.floor(Math.random() * (10 * LEVEL)) + 1) + 'pc</i><br/>';
  }
  /* Peça de Prata (pp) */
  else if (Math.floor(Math.random() * 2) == 0) {
    moedas = '<b>🏆 Moedas:</b> <i style="color: #966a18;">' + (Math.floor(Math.random() * (8 * LEVEL)) + 1) + 'pp</i><br/>';
  }
  /* Peça de Electrum (pe) */
  else if (Math.floor(Math.random() * 2) == 0) {
    moedas = '<b>🏆 Moedas:</b> <i style="color: #966a18;">' + (Math.floor(Math.random() * (5 * LEVEL)) + 1) + 'pe</i><br/>';
  }
  /* Peça de Ouro (po) */
  else if (Math.floor(Math.random() * 2) == 0) {
    moedas = '<b>🏆 Moedas:</b> <i style="color: #966a18;">' + (Math.floor(Math.random() * (2 * LEVEL)) + 1) + 'po</i><br/>';
  }
  /* Peça de platina (pl) */
  else if (Math.floor(Math.random() * 2) == 0) {
    moedas = '<b>🏆 Moedas:</b> <i style="color: #966a18;">' + (Math.floor(Math.random() * LEVEL) + 1) + 'pl</i><br/>';
  }

  texto = texto + moedas;
  callback();
}

function formatar_escudos_itens(loot, escudo) {
  let ataques_por_rodada = '';
  if (escudo.ataques_por_rodada > 0) {
    ataques_por_rodada = 'Ataques por rodada: ' + escudo.ataques_por_rodada + ', ';
  }
  let moedas = '';
  if (!loot) {
    moedas = ', <i style="color: #966a18;">' + escudo.preco.quantidade + ' ' + escudo.preco.moeda + '</i>';
  }
  return '<b>' + escudo.nome + '</b>, ' + ataques_por_rodada + escudo.peso + 'kg' + moedas + "<br/>";
}

function formatar_misseis_itens(loot, nome_missel, missel) {
  /*
  "Dardo Farpado": { quantidade: 20, preco: { quantidade: 20, moeda: 'pp' }, peso: 0, tamanho: 'Pequeno', tipo: 'Perfurante', velocidade: 0, dano_p: '1d3', dano_mg: '1d3' },
  */
  let moedas = '';
  if (!loot) {
    moedas = ', <i style="color: #966a18;">' + missel.preco.quantidade + ' ' + missel.preco.moeda + '</i>';
  }

  return "<b>" + nome_missel + "</b> (" + missel.quantidade + "x), " +
        (missel.peso * missel.quantidade).toFixed(2) + "kg, " + missel.tamanho + ", " +
        missel.tipo + ", Velocidade " + missel.velocidade + ", Dano (P) " + missel.dano_p + ", Dano (MG) " + missel.dano_mg + ", Disparos/Rodada: " + missel.cadencia + moedas;
}

function p_itens_formatar_arma_itens(loot, nome_arma, arma) {
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
  let moedas = '';
  if (!loot) {
    moedas = ', <i style="color: #966a18;">' + arma.preco.quantidade + ' ' + arma.preco.moeda + '</i>';
  }
  return '<b>' + nome_arma + "</b>, " + arma.peso + "kg, " + tamanho + tipo + "Velocidade " + arma.velocidade + danos + moedas;
}

function p_itens_formatar_item_itens(loot, item) {
  let peso = '';
  if ( (item.peso != undefined) && (item.peso != 'undefined') && (item.peso != null) && (item.peso != 0) ) {
    peso = ", " + item.peso + "kg";
  }
  let moedas = '';
  if (!loot) {
    moedas = ', <i style="color: #966a18;">' + item.preco.quantidade + ' ' + item.preco.moeda + '</i>';
  }
  return "<b>" + item.nome + "</b>" + peso + moedas;
}

function copy_text_itens(item) {
  const str = item.innerText;
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select(); document.execCommand("copy");
  document.body.removeChild(el);
};

function render_texto_itens(tag,t,texto) {
  let DIV = document.getElementById(tag);
  DIV.style.display = 'block';

  if (texto == '') texto = 'Nenhum item encontrado.';

  /*
  <button type="button">
    <img src="img/copy-regular.svg">
    <span>Copiar itens</span>
  </button>
  */

  DIV.innerHTML = `
  <button type="button">
    <img src="img/copy-regular.svg">
    <span>Copiar itens</span>
  </button>
  <b style='color: #1a3578; font-size: 1.2em;'>${t}</b>
  <br/>
  <div class="texto-itens">${texto}</div>
  `;

  document.querySelector(`#${tag} > button`).addEventListener('click',event=>{
    event.preventDefault();
    let elemento = document.querySelector(`#${tag} > div.texto-itens`);
    copy_text_itens(elemento);
  });
}

/*
  #ficha-itens-loot
  #ficha-itens-armeiro
  #ficha-itens-taverna
  #ficha-itens-alfaiataria
*/

function sortear_loot_itens(callback) {
  texto = "";
  sortear_lista_itens_itens(true, P_ITENS_ITENS, 1, () => {
    sortear_lista_itens_itens(true, P_ITENS_ALIMENTOS, 1, () => {
      sortear_lista_itens_itens(true, P_ITENS_VESTIMENTAS['Masculino'], 1, () => {
        sortear_lista_itens_itens(true, P_ITENS_VESTIMENTAS['Feminino'], 1, () => {
          sortear_lista_armas_itens(true, 1, () => {
            sortear_lista_escudos_itens(true, 1, () => {
              sortear_lista_misseis_itens(true, 1, () => {
                sortear_lista_armaduras_itens(true, 1, () => {
                  sortear_moedas_itens(() => {
                    render_texto_itens("ficha-itens-loot",'Baús ou Loots',texto);
                    callback();
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

function sortear_taverna_itens(callback) {
  texto = "";
  sortear_lista_itens_itens(false, P_ITENS_ITENS, 10, () => {
    sortear_lista_itens_itens(false, P_ITENS_ALIMENTOS, 10, () => {
      render_texto_itens("ficha-itens-taverna",'Tavernas ou Estalagens',texto);
      callback();
    });
  });
}

function sortear_alfaiataria_itens(callback) {
  texto = "";
  sortear_lista_itens_itens(false, P_ITENS_VESTIMENTAS['Masculino'], 3, () => {
    sortear_lista_itens_itens(false, P_ITENS_VESTIMENTAS['Feminino'], 3, () => {
      render_texto_itens("ficha-itens-alfaiataria",'Alfaiataria',texto);
      callback();
    });
  });
}

function sortear_armeiro_itens(callback) {
  texto = "";
  sortear_lista_armas_itens(false, 20, () => {
    sortear_lista_escudos_itens(false, 3, () => {
      sortear_lista_misseis_itens(false, 3, () => {
        sortear_lista_armaduras_itens(false, 3, () => {
          render_texto_itens("ficha-itens-armeiro",'Loja de Armas e Armaduras',texto);
          callback();
        });
      });
    });
  });
}

function renderItens(callback) {
  let texto_formulario_nivel_itens = document.getElementById('texto-formulario-nivel-itens');

  if ( isInt(texto_formulario_nivel_itens.value) ) {
    LEVEL = parseInt(texto_formulario_nivel_itens.value);
  }

  sortear_loot_itens(()=>{
    sortear_armeiro_itens(()=>{
      sortear_taverna_itens(()=>{
        sortear_alfaiataria_itens(()=>{
          callback();
        });
      });
    });
  });
}
