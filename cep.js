document.getElementById("cep").addEventListener("blur", (event) => {
    const elemento = event.target;
    const cepInformado = elemento.value.trim();

    if (cepInformado.length !== 8 || isNaN(cepInformado)) {
        alert("CEP inserido é inválido.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                const nome = document.getElementById("nome").value;
                const cep = document.getElementById("cep").value;
                const numero = document.getElementById("numero").value;  // Corrigido: pegar o valor correto de "numero"

                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;

                // Salva os dados no localStorage
                const dadosCEP = {
                    nome: nome,
                    cep: cep,
                    numero: numero,  // Corrigido: valor de "numero" incluído
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                };

                localStorage.setItem("dadosCEP", JSON.stringify(dadosCEP));
            } else {
                alert(`CEP ${cepInformado} não encontrado.`);
            }
        })
        .catch(error => console.error("Erro ao buscar CEP:", error));
});

// Impede o recarregamento da página ao enviar o formulário
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
    const carregamentoCEP = localStorage.getItem("dadosCEP");

    if (carregamentoCEP) {
        const dadosCEP = JSON.parse(carregamentoCEP);

        // Preenche os campos com os dados recuperados do localStorage
        document.getElementById("nome").value = dadosCEP.nome || "";
        document.getElementById("cep").value = dadosCEP.cep || "";
        document.getElementById("logradouro").value = dadosCEP.logradouro || "";
        document.getElementById("bairro").value = dadosCEP.bairro || "";
        document.getElementById("cidade").value = dadosCEP.cidade || "";
        document.getElementById("estado").value = dadosCEP.estado || "";
        document.getElementById("numero").value = dadosCEP.numero || "";  // Corrigido: preencher "numero"
    } else {
        console.log("Nenhum dado de CEP anterior encontrado.");
    }
});
