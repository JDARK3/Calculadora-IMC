const dadosIMC = [
    { faixa: 'Menor que 18,5', classificacao: 'Magreza', grau: '0' },
    { faixa: 'Entre 18,5 e 24,9', classificacao: 'Normal', grau: '0' },
    { faixa: 'Entre 25,0 e 29,9', classificacao: 'Sobrepeso', grau: 'I' },
    { faixa: 'Entre 30,0 e 39,9', classificacao: 'Obesidade', grau: 'II' },
    { faixa: 'Maior que 40,0', classificacao: 'Obesidade Grave', grau: 'III' }
];

function criarTabela() {
    const tabela = document.getElementById('tabelaIMC').getElementsByTagName('tbody')[0];
    dadosIMC.forEach((dado, index) => {
        const linha = document.createElement('tr');
        const celulaFaixa = document.createElement('td');
        const celulaClassificacao = document.createElement('td');
        const celulaGrau = document.createElement('td');

        celulaFaixa.textContent = dado.faixa;
        celulaClassificacao.textContent = dado.classificacao;
        celulaGrau.textContent = dado.grau;

        linha.appendChild(celulaFaixa);
        linha.appendChild(celulaClassificacao);
        linha.appendChild(celulaGrau);

        linha.setAttribute('data-index',index);
        tabela.appendChild(linha);
    });
}
function calcularIMC(event) {
    event.preventDefault();
    
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        document.getElementById('resultadoIMC').textContent = 'Por favor, insira um valor Válidos.';
        return;
    }
    const imc = peso / (altura * altura);
    let faixaIndex = -1;

    if (imc < 18.5) {
        faixaIndex = 0; 
    } else if (imc >= 18.5 && imc < 24.9){
        faixaIndex = 1; 
    } else if (imc >= 25.0 && imc < 29.9){
        faixaIndex = 2;
    } else if (imc >= 30.0 && imc < 39.9){
        faixaIndex = 3;
    } else {
        faixaIndex = 4;
    }
 
    document.querySelectorAll('#tabelaIMC tbody tr').forEach(linha => {
        linha.classList.remove('linha-destacada');
    });

    const linhaDestacada = document.querySelector(`#tabelaIMC tbody tr[data-index="${faixaIndex}"]`);
    if (linhaDestacada){
        linhaDestacada.classList.add('linha-destacada');
    }
    document.getElementById('resultadoIMC').textContent = `${imc.toFixed(2)}`;
}
document.getElementById('formularioIMC').addEventListener('submit', calcularIMC);
criarTabela();
