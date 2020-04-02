'use strict'
let pathVar = path.join(__dirname,'../js/classVar.js')
const classVar = require(pathVar)

class Frame {
    /*Type      = 0 entrada
                = 1 salida
    */
    constructor(id,name,title,type){
        this.idVar=1; // inicializamos ids variables
        this.id=id;  // mi id me viene dado de la clase Progress
        this.name=name;
        this.title=title;
        this.type=type;
        this.vars= new Map(); //inicializamos map de variables
        this.view = "update";
    }
    addVariable(name, type, format, label, initial){
        let newVar = new classVar.Variable(this.idVar,name, type, format, label, initial);
        this.vars.set(this.idVar,newVar);
        this.idVar ++;
        return  this.idVar -1;
    }
    addVariableRead(name, type, format, label, initial,col,row,movido){
        let newVar = new classVar.Variable(this.idVar,name, type, format, label, initial);
        
        if(movido==1){
            newVar.setMovido();
        }
        if(col!=0)
            newVar.setCol(col);
        if(row!=0)
            newVar.setFila(row);
        console.log("movido: ",newVar);
        this.vars.set(this.idVar,newVar);
        this.idVar ++;
        return  this.idVar -1;
    }
    getVista(){
        return this.view;
    }
    setVista(vista){
        this.view = vista;
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
    getTitulo(){
        return this.title;
    }
    editData(newData){
        this.name=newData.name;
        this.title=newData.titulo;
        this.type=newData.tipo;
    }
    editVar(newData){
        this.vars.get(parseInt(newData.idVar)).editData(newData);
    }
    deleteVariable(idVar){
        this.vars.delete(parseInt(idVar));
    }
}
module.exports = {
    Frame:Frame
}

