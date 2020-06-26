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
        if (type == "0")
            this.type="input";
        if (type == "1")
            this.type="output";
        this.vars= new Map(); //inicializamos map de variables
        this.view = "update";
        this.varsOutFrame = new Array(0); //inicializamos array para variables de salida
    }
    addVariable(name, type, format, label, initial, tam){
        let newVar = new classVar.Variable(this.idVar,name, type, format, label, initial, tam);
        this.vars.set(this.idVar,newVar);
        this.idVar ++;
        return  this.idVar -1;
    }
    addVariableRead(name, type, format, label, initial,col,row,movido,tam){
        let newVar = new classVar.Variable(this.idVar,name, type, format, label, initial,tam);
        
        if(movido==1){
            newVar.setMovido();
        }
        if(col!=0)
            newVar.setCol(col);
        if(row!=0)
            newVar.setFila(row);
        this.vars.set(this.idVar,newVar);
        this.idVar ++;
        return  this.idVar -1;
    }
    addVariableOutput(idVar){
        this.varsOutFrame.push(idVar.toString());
    }
    actualizarPosiciones(arrayActualizado){
        this.varsOutFrame = arrayActualizado.slice();
    } 
    getPosicionOutput(idVar){
        return  this.varsOutFrame.indexOf(idVar.toString()) + 1; 
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
    getVariablesOutput(){
        return this.varsOutFrame;
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
    getTipo(){
        return this.type;
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
        if(this.type == "output"){
            this.varsOutFrame.splice(this.varsOutFrame.indexOf(idVar.toString()),1);
        }
    }
}
module.exports = {
    Frame:Frame
}

