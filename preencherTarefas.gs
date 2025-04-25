// Função para preencher o Google Tasks com as tarefas distribuídas
function preencherGoogleTarefas(dias, projetos) {
  projetos.forEach(projeto => {
    console.log('Verificando se existe lista de tarefas para o projeto: ', projeto.nome);

    // Verifica se já existe uma lista de tarefas para o projeto
    var listaId = obterOuCriarListaDeTarefas(projeto.nome);

    if (!listaId) {
      console.log('Erro ao obter ou criar lista de tarefas para o projeto: ', projeto.nome);
      return;
    }

    console.log('Lista de tarefas pronta para o projeto:', projeto.nome);

    // Adiciona as tarefas no Google Tasks
    dias.forEach((tarefas, dataString) => {
      var data = new Date(dataString);
      data.setHours(0, 1, 0, 0); // Definir início às 00:01

      tarefas.forEach((tarefa, index) => {
        if (tarefa.cor === projeto.cor) {
          // Criar tarefa no Google Tasks
          var novaTarefa = {
            title: tarefa.tarefa,
            notes: 'Projeto: ' + projeto.nome,
            due: data.toISOString() // Define a data de vencimento no Google Tasks
          };

          try {
            Tasks.Tasks.insert(novaTarefa, listaId);
            console.log('Tarefa adicionada: ', tarefa.tarefa, ' na data: ', data);
          } catch (e) {
            console.error('Erro ao adicionar tarefa: ', e);
          }

          Utilities.sleep(200); // Pequeno atraso para evitar limite de requisições
        }
      });
    });

    console.log('Criação de tarefas finalizada para o projeto: ', projeto.nome);
  });
}

// Função para obter ou criar uma lista de tarefas para o projeto
function obterOuCriarListaDeTarefas(nomeProjeto) {
  var listas = Tasks.Tasklists.list().items || [];
  var listaExistente = listas.find(lista => lista.title === nomeProjeto);

  if (listaExistente) {
    return listaExistente.id; // Retorna o ID da lista existente
  }

  // Criar nova lista de tarefas
  var novaLista = Tasks.Tasklists.insert({ title: nomeProjeto });
  console.log('Criada nova lista de tarefas:', novaLista.title);
  return novaLista.id;
}


