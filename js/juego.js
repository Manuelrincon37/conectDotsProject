/*
* JS Para el juego Connect dots game
*
*/

//Variable global
var iniciadoMarcado = false;
var adyacentes = [];
var idMarcados = [];
var classMarcada;
var idInterval;
var tamanoPanel;

/**
 * INICIALIZACION DEL PANEL
  
 * */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rellenarFormularioUsuario() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg;
    tamanoPanel = parseInt(tamano);
}

function pintarPanelJuego() {
    document.getElementById("juego").style.gridTemplateColumns = "repeat(" + tamano + ", 1fr)"
    document.getElementById("juego").style.gridTemplateRows = "repeat(" + tamano + ", 1fr)"
    //Elementos de forma automatica
    let items = "";
    let color = ["rojo", "verde"];
    let colorRnd = 0;
    for (let index = 0; index < (parseInt(tamano) * parseInt(tamano)); index++) {
        if (index % 2 > 0) colorRnd = getRandomInt(2);
        items += `<div class="containerItem"><div id="${index}" class="item ${color[colorRnd]}"></div></div>`;
    }
    document.getElementById("juego").innerHTML = items;
}

/**
 * Calcular el array de los adyacentes
 */
function calcularAdyacentes(idMarcado) {
    adyacentes = [];
    //Adyacente superior
    if ((idMarcado - tamanoPanel) >= 0) adyacentes.push(idMarcado - tamanoPanel);
    //Adyacente inferior
    if ((idMarcado + tamanoPanel) < (tamanoPanel * tamanoPanel)) adyacentes.push(idMarcado + tamanoPanel);
    //Adyacente izquierda
    if ((idMarcado % tamanoPanel) > 0) adyacentes.push(idMarcado - 1);
    //Adyacente derecha
    if (((idMarcado + 1) % tamanoPanel) > 0) adyacentes.push(idMarcado + 1);

    for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);
    }
}
/**
 * Fucnion que realiza el conteo hacia atras del juego
 */
function cuentaAtras() {
    let tmpoRestante = parseInt(document.getElementById("tmpo").value) - 1
    document.getElementById("tmpo").value = tmpoRestante
    if (tmpoRestante == 0) {
        clearInterval(idInterval);
        //Filanizar todos los eventos
        const items = document.getElementsByClassName("item");
        for (let item of items) {
            item.removeEventListener('mousedown', comenzarMarcar);
            item.removeEventListener('mouseover', continuarMarcando);
        }
        document.removeEventListener('mouseup', finalizarMarcado);
        //Cambiar z-index de los paneles
        document.getElementById("juegoAcabado").classList.add("juegoAcabadoColor")
        document.getElementById("juegoAcabado").style.zIndex = "2";
        document.getElementById("juego").style.zIndex = "1";
        document.getElementById("nuevaPartida").addEventListener("click", (e) => location.reload());
    }
}


/**
 * Añadir eventos del juego
*/
function programarEventosJuego() {
    const items = document.getElementsByClassName('item');
    for (let item of items) {
        item.addEventListener('mousedown', comenzarMarcar);
        item.addEventListener('mouseover', continuarMarcando);
    }
    document.addEventListener('mouseup', finalizarMarcado);
    //Cuenta atrás
    idInterval = setInterval(cuentaAtras, 1000)
}

/** Funciones del juego
* iniciar el marcado de los "dots"
* @param {} event
*  
*/
function comenzarMarcar(event) {
    let item = event.target;
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) {
        classMarcada = 'rojo';
        containerItem.classList.add('rojo');
    }
    else {
        classMarcada = 'verde';
        containerItem.classList.add('verde');
    }
    if (!iniciadoMarcado) iniciadoMarcado = true;

    //Guardo los marcados
    idMarcados.push(parseInt(item.id));
    //Comienzo a calcular adyacentes
    calcularAdyacentes(parseInt(item.id));
    console.log("Pinchado sobre un circulo");
}

function continuarMarcando(event) {
    if (iniciadoMarcado) {
        let item = event.target;
        let idNuevo = parseInt(item.id);
        //Es adyacente?
        if (adyacentes.includes(idNuevo) && item.classList.contains(classMarcada)) {
            let containerItem = event.target.parentElement;
            if (item.classList.contains('rojo')) containerItem.classList.add('rojo');
            else containerItem.classList.add('verde');
            //Guardo los marcados
            idMarcados.push(parseInt(item.id));
            calcularAdyacentes(parseInt(item.id));
        }

    }
    console.log("Pasando sobre un circulo");
}

function finalizarMarcado(event) {
    iniciadoMarcado = false;
    adyacentes = []
    const puntuacionImput = document.getElementById("puntuacion");
    if (idMarcados.length > 1) {
        puntuacionImput.value = parseInt(puntuacionImput.value) + idMarcados.length
    }
    //Trabajar con los marcados
    for (let index = 0; index < idMarcados.length; index++) {
        //Capturar el objeto
        let itemMarcado = document.getElementById(idMarcados[index])
        itemMarcado.parentElement.classList.remove(classMarcada);
        //Cambiar el color de los objetos de forma rnd
        let color = ["rojo", "verde"];
        let colorRnd = getRandomInt(2);
        itemMarcado.classList.remove(classMarcada);
        itemMarcado.classList.add(color[colorRnd]);
    }
    idMarcados = []
    console.log("Finalizar el marcado");
}

//Test
getDatosUsuario();
if (!comprobacionDatosUsuario()) location = "index.html";
//Rellenamos formulario
rellenarFormularioUsuario();
//Pintar panel de Juego
pintarPanelJuego();
programarEventosJuego();