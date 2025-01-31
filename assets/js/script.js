// Seleciona os elementos do DOM
const inputTarefa = document.getElementById("inputTarefa");   // input
const btnAdicionarTarefa = document.getElementById("btnAdicionarTarefa");   // button
const listaTarefa = document.getElementById("listaTarefa"); // ul

// Adiciona um evento de clique ao botão "Adicionar Tarefa"
btnAdicionarTarefa.addEventListener("click", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nomeTarefa = inputTarefa.value.trim(); // Obtém o valor do input e remove espaços em branco

    // Validação do formulário
    if (nomeTarefa === '') {
        alert('Por favor, adicione uma tarefa.'); // Mensagem de erro se o campo estiver vazio
        return; // Sai da função se a tarefa estiver vazia
    }

    // Criação do elemento da tarefa
    const li = document.createElement('li');
    li.id = 'tarefa'; // Adiciona a classe tarefa
    li.textContent = nomeTarefa; // Define o texto da tarefa

    // Adiciona a funcionalidade de marcar como concluída
    li.addEventListener('click', function () {
        li.classList.toggle('concluida'); // Alterna entre concluída e não concluída
    });

    // Criação do botão de excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.id = 'btnExcluir'; // Adiciona a classe btnExcluir
    btnExcluir.textContent = 'Excluir'; // Define o texto do botão

    // Adiciona a funcionalidade de exclusão
    btnExcluir.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede que o clique no botão afete o <li>
        li.remove(); // Remove a tarefa ao clicar no botão de excluir
    });

    // Adiciona o botão de excluir à tarefa
    li.appendChild(btnExcluir);
    
    // Adiciona a tarefa à lista
    listaTarefa.appendChild(li);

    // Limpa o campo de entrada
    inputTarefa.value = '';
});

// Função para carregar tarefas iniciais da API (opcional)
async function carregarTarefasIniciais() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const tarefas = await response.json();

        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.id = 'tarefa';
            li.textContent = tarefa.title; // Usa o título da tarefa da API

            // Adiciona funcionalidade de marcar como concluída
            li.addEventListener('click', function () {
                li.classList.toggle('concluida');
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.id = 'btnExcluir';
            btnExcluir.textContent = 'Excluir';

            btnExcluir.addEventListener('click', function(event) {
                event.stopPropagation();
                li.remove();
            });

            li.appendChild(btnExcluir);
            listaTarefa.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}

// Carrega tarefas iniciais
carregarTarefasIniciais();
