/*
* JS Para la gestión de los datos de usuario
*
*/

var nick

function datosUsuario(nick) {

    sessionStorage.setItem('nick', nick.value);
}

function getDatosUsuario() {
    let nick = sessionStorage.getItem('nick');
    console.log(nick);
}
function comprobarDatosUsuario() {
    if (nick == null) {
        sessionStorage.setItem("error", "No se ha rellenado el formulario correctmente")
        return false;
    }
    return true;
}