
export let formatDate = function (date: Date) : string{

    var d = date;
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear()
    var months = new Array("Janvier", "Fevrier", "Mars",
      "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
      "Octobre", "Novembre", "Decembre"); 
      
  return curr_date + " " + months[curr_month] + " " + curr_year    
}

export let formatDateEnMois = function (date: Date) : string{

    var d = new Date(date);
    var curr_month = d.getMonth();
    var months = new Array("Janvier", "Fevrier", "Mars",
      "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
      "Octobre", "Novembre", "Decembre"); 
      
  return months[curr_month]; 
}