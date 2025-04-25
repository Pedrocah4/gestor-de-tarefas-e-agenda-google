// Funcao para extrair os projetos da planilha de projetos
// Retorna: uma lista de projetos
// Obs: um projeto é um objeto assim:
// interface Projeto = {
//   nome: string,
//   prazo: Date,
//   tarefas: string[],
//   cor: string
// }

const MAX_DISTANCE_BETWEEN_END_OF_PROJECT_AND_START_OF_NEXT = 15;

function extrairProjetos() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName("Input de Dados");

  var inputRange = inputSheet.getRange("A1:F"); // Definindo o intervalo para ler os dados
  var inputData = inputRange.getValues();
  var inputBackgrounds = inputRange.getBackgrounds(); // Obtém as cores de fundo das células

  var projetos = [];

  let currentRow = 1; // Primeira linha eh a dos titulos.
  while (currentRow < inputData.length) {
    const projectName = inputData[currentRow][0];
    const prazo = inputData[currentRow][1];
    const inicio = inputData[currentRow][2];

    const cor = inputBackgrounds[currentRow][0];

    var tarefas = Array();

    tarefas = tarefas.concat(extrairTarefasDeColuna(currentRow, 3, inputData));
    tarefas = tarefas.concat(extrairTarefasDeColuna(currentRow, 4, inputData));
    tarefas = tarefas.concat(extrairTarefasDeColuna(currentRow, 5, inputData));

    projetos.push({
      nome: projectName,
      prazo: prazo,
      inicio: inicio,
      tarefas: tarefas,
      cor: cor
    })

    currentRow = calculateRowOfNextProject(inputData, currentRow + 1);
    if (currentRow == -1) {
      break;
    }
  }

  return projetos;
}

function extrairTarefasDeColuna(linhaInicial, coluna, inputData) {
  let linha = linhaInicial;

  const tarefas = Array();

  while (inputData[linha][coluna] != '') {
    tarefas.push(inputData[linha][coluna]);

    linha++;
  }

  return tarefas;
}

function calculateRowOfNextProject(inputData, currentRow) {
    let distance = 0;
    while (distance <= MAX_DISTANCE_BETWEEN_END_OF_PROJECT_AND_START_OF_NEXT) {
      if (inputData[currentRow][0] != '') {
        return currentRow;
      }

      currentRow++;
      distance++;
    }

    return -1;
}
