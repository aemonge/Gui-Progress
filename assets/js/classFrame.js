'use strict'
let pathVar = path.join(__dirname,'../js/classVar.js')
const classVar = require(pathVar)

class Frame {
    /*Borde     = 0 NO
                = 1 Sí
    */
    /*Etiquetas = 0 side-label
                = 1 no-label
    */
    constructor(id,name,borde,etiqueta){
        this.idVar=1; // inicializamos ids variables
        this.id=id;  // mi id me viene dado de la clase Progress
        this.name=name;
        this.borde=borde;
        this.etiqueta=etiqueta;
        this.vars= new Map(); //inicializamos map de variables
    }
    addVariable(name, type, format, label, initial){
        let newVar = new classVar.Variable(this.idVar,name, type, format, label, initial);
        this.vars.set(this.idVar,newVar);
        this.idVar ++;
        return  this.idVar -1;
    }

    getFrame(){
        return this;
    }
    getVariables(){
        return this.vars;
    }
    getVariable(idVar){
        return this.vars.get(parseInt(idVar));
    }
    getNombre(){
        return this.name;
    }
    getBorde(){
        return this.borde;
    }
    getEtiqueta(){
        return this.etiqueta;
    }
    editData(newData){
        this.name=newData.name;
        this.borde=newData.borde;
        this.etiqueta=newData.etiqueta;
    }
    editVar(newData){
        this.vars.get(parseInt(newData.idVar)).editData(newData);
        this.name=newData.name;
        this.borde=newData.borde;
        this.etiqueta=newData.etiqueta;
    }
    deleteVariable(idVar){
        this.vars.delete(parseInt(idVar));
    }
}
module.exports = {
    Frame:Frame
}

