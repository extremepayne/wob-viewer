document.getElementById("wobSearchSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("wobSearchInput").value;
  const url = "https://wob.coppermind.net/api/search_entry?query=" + value;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let output = "";
      output += "<p>" + json.count + " results for " + value + "</p>";
      if (json.count > 10){
        output += "<p>Showing the first ten results:</p>";
        var numberWobsShown = 10;
      }else{
        var numberWobsShown = json.count;
      }
      for (let i = 0; i < numberWobsShown; i ++){
        output += "<div class=\"wob\">"; 
        output += "<p class=\"eventName\">" + json.results[i].event_name + "</p>";
        output += "<p class=\"wobNumber\">" + json.results[i].id + "</p>";
        for (let j = 0; j < json.results[i].lines.length; j++){
          if (j > 5){
            output += "<p><em>(WoB truncated)</em></p>";
            break;
          }
          output += "<p class=\"wobSpeaker\"><strong>" + json.results[i].lines[j].speaker + "</strong></p>";
          output += "<div class=\"wobText\">";
          if (json.results[i].lines[j].text.length > 1000){
            output += "<p>" + json.results[i].lines[j].text.substring(3, 999);
            output += "[...]</p>";
          }else{
            output += json.results[i].lines[j].text; 
          }
          output += "</div>";
        }
        output += "</div>";
      }
      document.getElementById("wobOutput").innerHTML = output;
    });
});
document.getElementById("wobDisplaySumbit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("wobDisplayInput").value;
  const url = "https://wob.coppermind.net/api/entry/" + value;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let output = "";
      output += "<div class=\"wob\">"; 
      output += "<p class=\"eventName\">" + json.event_name + "</p>";
      output += "<p class=\"wobNumber\">" + json.id + "</p>";
      for (let j = 0; j < json.lines.length; j++){
        if (j > 5){
          output += "<p><em>(WoB truncated)</em></p>";
          break;
        }
        output += "<p class=\"wobSpeaker\"><strong>" + json.lines[j].speaker + "</strong></p>";
        output += "<div class=\"wobText\">";
        output += json.lines[j].text; 
        output += "</div>";
      }
      output += "</div>";
      document.getElementById("wobOutput").innerHTML = output;
    });
});
document.getElementById("randomWob").addEventListener("click", function(event) {
  event.preventDefault();
  const url = "https://wob.coppermind.net/api/random_entry/";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let output = "";
      output += "<div class=\"wob\">"; 
      output += "<p class=\"eventName\">" + json.event_name + "</p>";
      output += "<p class=\"wobNumber\">" + json.id + "</p>";
      for (let j = 0; j < json.lines.length; j++){
        if (j > 5){
          output += "<p class=\"wobTruncation\"><em>(WoB truncated)</em></p>";
          break;
        }
        output += "<p class=\"wobSpeaker\"><strong>" + json.lines[j].speaker + "</strong></p>";
        output += "<div class=\"wobText\">";
        output += json.lines[j].text; 
        output += "</div>";
      }
      output += "</div>";
      document.getElementById("wobOutput").innerHTML = output;
    });
});
