
const nickImput = document.getElementById("nick");
const tamanoImput = document.getElementById("tamano");
const formEntrada = document.getElementById("formEntrada");
const error = document.getElementById("error")

//Comprobar si hay algun error en "juego.html"
if (sessionStorage.getItem("error") != null) {
    error.innerText = sessionStorage.getItem("error");
    sessionStorage.removeItem("error")
}

//Funciones de evento
function comprobarForm(event) {
    //Comprobamos cambios
    if (nickImput.value.match(/(?<!\S)[0-9]/)) {
        nickImput.focus()
        event.preventDefault();
        error.innerText = "El campo de nick no puede comenzar con un numero";
        return false
    } else if (tamanoImput.value == "0") {
        console.log("No se ha seleccionado tamano");
        tamanoImput.focus()
        event.preventDefault();
        error.innerText = "Se debe seleccionar un tamaño de panel"
        return false
    }
    //informacion correta
    datosUsuario(nickImput);
    return true
}
// Inicio carga de eventos
formEntrada.addEventListener("submit", comprobarForm)
