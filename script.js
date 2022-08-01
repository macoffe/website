const url_api_post='http://127.0.0.1:8000/';
const url_api_get = 'http://127.0.0.1:8000/infos';

window.addEventListener("load", function () {

    // fetch l'api pour récupérer les données.
    function getData() {
      fetch(url_api_get)
      .then(
      response => response.json()
      ).then(function(json) {
      document.getElementById("temperature").innerHTML = json.temperature
      document.getElementById("distance").innerHTML = json.distance
      document.getElementById("humidite").innerHTML = json.humidite
      });
    }

    function sendData() {
      var XHR = new XMLHttpRequest();
      var FD = new FormData(form);
      // alerte de réussite.
      XHR.addEventListener("load", function(event) {
        alert("Données envoyées !");
      });
      // alerte d'erreur.
      XHR.addEventListener("error", function(event) {
        alert('erreur');
       });
      // configuration de la requête
      XHR.open("POST", url_api_post);
      // récupération et envoi des données du formulaire en json, avec cast des switch pour aider l'api.
      switch1 = String(FD.get('switch1'));
      switch2 = String(FD.get('switch2'));
      switch3 = String(FD.get('switch3'));
      range1 = FD.get('range1');
      range2 = FD.get('range2');
      range3 = FD.get('range3');
      range4 = FD.get('range4');
      console.log({ switch1 }, { switch2 }, { switch3 }, { range1 }, { range2 }, { range3 }, { range4 }); //si besoin debug
      XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      XHR.send(JSON.stringify({"switch1": switch1, "switch2": switch2, "switch3": switch3, "range1": range1, "range2": range2, "range3": range3, "range4": range4}));
    }

    // récupère les données toutes les 5s.
    getData();
    t=setInterval(getData,5000);

    // récupération du formulaire.
    var form = document.getElementById("data");

    // fonction utilisée lors de la soumission du formulaire.
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendData();
    });

  });