'use strict'

class Variable{
    constructor(id,name, type, format, label, initial){
        this.id=id;
        this.name=name;
        this.type=type; //0 Integer; 1 Decimal; 2 Logical; 3 Caharacter;
        this.format=format;
        this.label=label;
        this.initial=initial;
    }
    
    get getVar(){
        return this;
    }
}
module.exports = {
    Variable:Variable
}