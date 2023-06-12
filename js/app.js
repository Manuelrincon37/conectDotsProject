const nickImput = document.getElementById("nick");
const tamanoImput = document.getElementById("tamano");
const formEntrada = document.getElementById("formEntrada");
const error = document.getElementById("error")

//Funciones de evento
function comprobarForm(event){
    //Comprobamos cambios
    if(nickImput.value.length == 0 ){
        console.log("No hay click");
        nickImput.focus()
        event.preventDefault();
        error.innerText = "El campo de 'nick' no puede estar vacío";
        return false
    }else if(tamanoImput.value == "0"){
        console.log("No se ha seleccionado tamano");
        tamanoImput.focus()
        event.preventDefault();
        error.innerText = "Se debe seleccionar un tamaño de panel"
        return false
    }
    return true   
}
// Inicio carga de eventos
formEntrada.addEventListener("submit", comprobarForm)
