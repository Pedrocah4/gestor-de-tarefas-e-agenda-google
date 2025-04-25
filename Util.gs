function converterDataParaString(data) {
  return data.toISOString().split("T")[0];
}

function calcularDiasUteisEntre(startDate, endDate) {
    let start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    let end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    
    let dias = 0;
    
    while (start <= endDate) {
        if (!isFimDeSemana(start)) {
          dias++;
        }
      
        start.setDate(start.getDate() + 1);
    }
    
    return dias;
}

function isFimDeSemana(data) {
  return (data.getDay() === 0 || data.getDay() === 6);
}
