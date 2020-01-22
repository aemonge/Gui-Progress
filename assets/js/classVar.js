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
        position={
            x:this.posx,
            y:this.posy
        }
        return position;
    }
    setPosition(x,y){
        this.posx=x;
        this.posy=y;
    }
}
module.exports = {
    Variable:Variable
}