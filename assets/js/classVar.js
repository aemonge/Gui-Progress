'use strict'

class Variable{
    constructor(id,name, type, format, label, initial){
        this.id=id;
        this.name=name;
        this.type=type; //0 Integer; 1 Decimal; 2 Logical; 3 Caharacter;
        this.format=format;
        this.label=label;
        this.initial=initial;
        this.posx=0;
        this.posy=0;
        this.fila=0;
        this.columna=null;
        this.movido=0;
    }
    editData(newData){
        this.name=newData.name;
        this.format=newData.format;
        this.label=newData.label;
        this.initial=newData.initial;
    }
    getVar(){
        return this;
    }
    getNombre(){
        return this.name;
    }
    getTipo(){
        return this.type;
    }
    getFormato(){
        return this.format;
    }
    getLabel(){
        return this.label;
    }
    getInitial(){
        return this.initial;
    }
    getPosition(){
        let position={
            'x':this.posx,
            'y':this.posy
        }
        return position;
    }
    setPosition(x,y){
        this.posx=x;
        this.posy=y;
    }
    setFilaCol(x,y){
        this.fila=x;
        this.columna=y;
    }
    getFilaCol(){
        let position={
            'x':this.fila,
            'y':this.columna
        }
        return position;
    }
    getFila(){
        return this.fila;
    }
    getColumna(){
        return this.columna;
    }
    setFila(i){
        this.fila=i;
    }
    setCol(i){
        this.columna=i;
    }
    getMovido(){
        return this.movido;
    }
    setMovido(){
        this.movido=1;
    }
    
}
module.exports = {
    Variable:Variable
}