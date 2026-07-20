// Consumo da API ViaCEP
async function buscarCEP() {
    const cepDigitado = document.getElementById('cep').value;
    const cepLimpo = cepDigitado.replace(/\D/g, ''); 
    document.getElementById('cep').value = cepLimpo.replace(/^(\d{5})(\d{3})$/, "$1-$2");

    if (cepLimpo.length !== 8) return;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resposta.json();

        if (!dados.erro) {
            document.getElementById('rua').value = dados.logradouro;
            document.getElementById('bairro').value = dados.bairro;
            document.getElementById('cidade').value = dados.localidade + " - " + dados.uf;
        } else {
            alert("CEP não encontrado. Por favor, verifique.");
            limparCamposEndereco();
        }
    } catch (erro) {
        console.error("Erro ao buscar o CEP:", erro);
    }
}

function limparCamposEndereco() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
}

function enviarFormulario(event) {
    event.preventDefault(); 
    
    
    const dadosCadastro = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        generoFavorito: document.getElementById('mensagem').value
    };
    
    console.log("Dados prontos para envio:", dadosCadastro);

    
    document.getElementById('cadastroForm').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';
}