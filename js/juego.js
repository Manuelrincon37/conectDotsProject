/*
* JS Para el juego Connect dots game
*
*/

//Variable global
var iniciandoMarcado = false

/**
 * INICIALIZACION DEL PANEL
  
 * */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
}

function pintarPanelJuego() {
    document.getElementById("juego").style.gridTemplateColumns = "repeat(" + tamano + ", 1fr"
    document.getElementById("juego").style.gridTemplateRows = "repeat(" + tamano + ", 1fr"
    let items = ""
    let color = ["rojo", "verde"]
    let colorRnd = 0
    for (let index = 0; index < parseInt(tamano) * parseInt(tamano); index++) {
        if (index % 2 == 0) colorRnd = getRandomInt(2);
        items += `<div class="containerItem"><div class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items
}
/**
 * Añadir eventos del juego
* iniciar el marcado de los "dots"
* @param {} event
*  
*/
function programarEventosJuego() {
    const items = document.getElementsByClassName("item")
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarcar);
        item.addEventListener('mouseover', continuarMarcando);
    }
    document.addEventListener('mouseup', finalizarMarcado);
}

/** Funciones del juego*/
function comenzarMarcar(event) {
    let item = event.target;
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
    else containerItem.classList.add('verde');
    if (!iniciandoMarcado) iniciandoMarcado = true
}

function continuarMarcando(event) {
    if (iniciandoMarcado) {
        let item = event.target;
        let containerItem = event.target.parentElement;
        if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
        else containerItem.classList.add('verde');
    }

}

function finalizarMarcado(event) {
    if (iniciandoMarcado) iniciandoMarcado = false
    console.log("finalizar el marcado");
}

//Test
getDatosUsuario();
if (!comprobacionDatosUsuario()) location = "index.html";
//Rellenamos formulario
rellenarFormularioUsuario();
//Pintar panel de Juego
pintarPanelJuego();
programarEventosJuego();