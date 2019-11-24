'use strict'

class Frame {
    idVar=0;
    constructor(id,name,color){
        this.id=id;
        this.name=name;
        this.rows=16;
        this.cols=80;
        this.color=color;
        this.vars=[];
    }

    set putVar(variable){
        this.vars.push(variable);
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

