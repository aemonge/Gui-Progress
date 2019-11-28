'use strict'
let pathFrame = path.join(__dirname,'../js/classFrame.js')
const classFrame = require(pathFrame)
class Progress{
    constructor(){
        this.idFrames = 0; //inicializamos ids a 0
        // var elementoEliminado = frames.splice(pos, 1);  así es como se elimina un elemento de las posicion pos
        this.frames = []; //inicializamos array de frames
    }
    //LLamamos al constructor de la clase frame para crear un nuevo frame, lo metemos en nuestro array y actualizamos idFrames
    addFrame(name, borde, etiqueta){ 
        let newFrame = new classFrame.Frames(this.idFrames,name,borde,etiqueta);
        frames.push(newFrame);
        this.idFrames ++;
    }
}
module.exports = {
    Progress:Progress
}