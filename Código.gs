function main() {
  const projetos = extrairProjetos();
  console.log('Projetos extraidos: ', projetos);

  const dias = distribuirTarefasEmDias(projetos);
  console.log(JSON.stringify(dias, null, 2));
  
  //CALENDÁRIO
  preencherGoogleAgenda(dias, projetos);

  //TAREFAS
  preencherGoogleTarefas(dias, projetos);
}
