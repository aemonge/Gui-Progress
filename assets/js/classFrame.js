'use strict'
import Variable from './classVar.js'
export default class Frame{
    idVar=0;
    constructor(){
        this.id=0;
        this.name=null;
        this.rows=16;
        this.cols=80;
        this.color=white;
        this.vars=[];
    }
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

    get getVar(id){
        for(let i=0;i<this.vars.length();i++){
            if(this.vars[i]['id']==id){
                return this.var[i];
            }
        }
    }

};

