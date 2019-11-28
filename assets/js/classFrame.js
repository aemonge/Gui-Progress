'use strict'
let pathVar = path.join(__dirname,'../js/classVar.js')
const classVar = require(pathVar)

class Frame {
    //Borde booleano si o no
    /*Etiquetas = 0 side-label
                = 1 column-label
                = 2 no-label
    */
    constructor(id,name,borde,etiqueta){
        this.idVar=0; // inicializamos ids variables
        this.id=id;  // mi id me viene dado de la clase Progress
        this.name=name;
        this.borde=borde;
        this.etiqueta=etiqueta;
        this.vars=[]; //inicializamos array de variables
    }
    addVariable(name, type, format, label, initial){
        let newVar = new Variable(this.idVar,name, type, format, label, initial);
        vars.push(newVar);
        this.idVar ++;
    }

    get getFrame(){
        return this;
    }

    getVar(id){
        for(let i=0;i<this.vars.length();i++){
            if(this.vars[i]['id']==id){
                return this.var[i];
            }
        }
    }

}
module.exports = {
    Frame:Frame
}

