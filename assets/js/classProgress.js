'use strict'
let pathFrame = path.join(__dirname,'../js/classFrame.js')
const classFrame = require(pathFrame)
class Progress{
    constructor(){
        this.idFrames = 1; //inicializamos ids a 1
        // var elementoEliminado = frames.splice(pos, 1);  así es como se elimina un elemento de las posicion pos
        this.frames = []; //inicializamos array de frames
    }
    //LLamamos al constructor de la clase frame para crear un nuevo frame, lo metemos en nuestro array y actualizamos idFrames
    addFrame(name, borde, etiqueta){ 
        let newFrame = new classFrame.Frame(this.idFrames,name,borde,etiqueta);
        this.frames.push(newFrame);
        this.idFrames ++;
    }
    lastAsignedId(){
        return this.idFrames -1;
    }
    addVartoFrame(idFrame,varInfo){
        let frame = this.frames[idFrame-1]; //Esto funciona hasta que eliminemos frames. Ahora busca por id -1 para obtener la pos. NO ES CORRECTO
        //console.log(idFrame,frame, varInfo);
        frame.addVariable(varInfo['nombre'],varInfo['tipo'],varInfo['format'],varInfo['label'],varInfo['initial']);
    }
    getFrames(){
        return this.frames;
    }
}
module.exports = {
    Progress:Progress
}