// Funcao para distribuir as tarefas dos projetos nos dias do calendario.
// Retorna: um mapa de dias com suas respectivas tarefas.
// Formato do retorno:
// Map<string, Tarefa>
// interface Tarefa = {
//   tarefa: string,
//   cor: string
// }
function distribuirTarefasEmDias(projetos) {
    projetos.sort((p1, p2) => p1.prazo.getTime() - p2.prazo.getTime());

    const diasComTarefas = new Map();

    for (const projeto of projetos) {
      let diaLimiteParaConcluirTarefas = projeto.prazo;
      diaLimiteParaConcluirTarefas.setDate(diaLimiteParaConcluirTarefas.getDate() - 1);

      const dataInicioProjeto = projeto.inicio;
      dataInicioProjeto.setHours(0, 0, 0, 0);

      const diasRestantesParaConcluirProjeto = calcularDiasUteisEntre(dataInicioProjeto, diaLimiteParaConcluirTarefas);
      if (diasRestantesParaConcluirProjeto < 0) {
        continue;
      }

      const numeroMaximoDeTarefasPorDia = Math.ceil(projeto.tarefas.length / diasRestantesParaConcluirProjeto);

      const tarefasParaConcluir = projeto.tarefas;

      var data = new Date(dataInicioProjeto);
      while (tarefasParaConcluir.length > 0) {
        if (isFimDeSemana(data)) {
          data.setDate(data.getDate() + 1);
          continue;
        }

        const dataString = converterDataParaString(data);
        if (!diasComTarefas.has(dataString)) {
          diasComTarefas.set(dataString, new Array());
        }

        const tarefasNesseDia = tarefasParaConcluir.splice(0, numeroMaximoDeTarefasPorDia);
        for (const tarefa of tarefasNesseDia) {
          diasComTarefas.get(dataString).push({ tarefa: tarefa, cor: projeto.cor });
        }

        data.setDate(data.getDate() + 1);
      }
    }

    return diasComTarefas;
}
