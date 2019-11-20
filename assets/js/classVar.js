'use strict'

export default class Variable{
    constructor(id,name, type, format, label, def){
        this.id=id;
        this.name=name;
        this.type=type; //0 Integer; 1 Decimal; 2 Logical; 3 Caharacter;
        this.format=format;
        this.label=label;
        this.def=def;
    }
    
    get getVar(){
        return this;
    }
}