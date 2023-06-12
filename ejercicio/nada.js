var size = 8
var tablero = ""
for (let row = 0; row < size; row++){
    for (let col = 0; col <= size; col++){
        if((row + col) % 2 === 0){
            tablero+=" "
        }else{
            tablero += "#"
        }
    }
    tablero += "\n"
}
console.log(tablero);