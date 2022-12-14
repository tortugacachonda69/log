function nuevoRegistro() {
  let registro = document.getElementById("registrador").value;
  if (registro.trim() !== "") {

    var d = new Date();
    var datestring = (d.getDay() + 1) + " " + d.getFullYear().toString().slice(2) +
      "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
      " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    let idRegistro = "reg" + Date.now();
    localStorage.setItem(idRegistro, datestring + " " + registro);
    mostrar();
  }
  document.getElementById("registrador").value = "";
  dias();
}

function mostrar() {
  dias();
  registros = [];
  for (const key in localStorage) {
    if (key.slice(0, 3) == "reg") {
      registros.push(key.slice(3) + " " + localStorage.getItem(key));
    }
  }
  registros = registros.sort();
  entradas = "";
  for (var i = 0; i < registros.length; i++) {
    entradas = registros[i].slice(14) + "<br>" + entradas;
  }
  document.getElementById("entradas").innerHTML = entradas;
}

function mostrarEditables() {
  dias();
  editables = [];
  for (const key in localStorage) {
    if (key.slice(0, 3) == "reg") {
      editables.push(key.slice(3) + " " + localStorage.getItem(key));
    }
  }
  editables = editables.sort();
  textos = "";
  for (var i = 0; i < editables.length; i++) {
    textos = "<span>" + editables[i].slice(14, 33) + "</span><input class=\"casilla\" type=text id=\"reg" + editables[i].slice(0, 13) + "\" value=\"" + editables[i].slice(33) + "\"><br>" + textos;
  }
  document.getElementById("registrosEditables").innerHTML = textos;
}

function dias() {
  nombredias = ["dom", "dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  for (const key in localStorage) {
    registro = localStorage.getItem(key);
    if (registro) {
      numerodia = registro.slice(0, 1);
      if (isNaN(numerodia)) {
        continue;
      }
      registrobien = nombredias[numerodia] + registro.slice(1);
      localStorage.setItem(key, registrobien);
    }
  }
}

function guardarEditables() {
  dias();
  const allElements = document.getElementsByClassName("casilla");
  for (const element of allElements) {
    if (element.value == "") {
      localStorage.removeItem(element.id);
    } else {
      fecha = localStorage.getItem(element.id);
      localStorage.setItem(element.id, fecha.slice(0, 18) + " " + element.value);
    }
  }
  window.location.href = "index.html";

}
