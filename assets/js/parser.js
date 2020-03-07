
var parserTable = require(path.join(__dirname,'../js/tempTable.js'));
var parserForm  = require(path.join(__dirname,'../js/form.js'));

// var parser = peg.generate("start = ('a' / 'b')+");
exports.parserCode = function parserCode(code, callback){
     /*
        HACER:
        - si encuentro una tabla que no tenga form, mando mensaje informando para que cree las variables necesarias
        - si encuentro form sin tabala mando mensaje de error
    */
    let lineas = code.split('\n');
    let tablas = new Map();
    let frames = new Map();
    let saveTable = 0;
    let saveFrame = 0;
    let actualTable;
    let actualFrame;
    let codeToParserT = "";
    let codeToParserF = "";
    let errorMSg = "";
    for(let linea of lineas) {
        if(saveTable == 0 & linea.includes("/* BEGIN TemporalTable */")){
            saveTable = 1;
            continue;
        }
        if(saveTable == 1){//GUARDAMOS LINEAS Hasta fin de tabla
            if(!linea.includes("/* END TemporalTable */")){
                codeToParserT = codeToParserT + linea;
            }
            else{
                try {
                    actualTable=parserTable.parse(codeToParserT);
                    tablas.set(actualTable.name,actualTable.campos);
                  }
                  catch(err) {
                    errorMSg= err;
                    //alert("Error temp-table: " + err + ".");
                  }
                  finally {
                    saveTable = 0;
                    codeToParserT = "";
                  }
            }
        }

        if(saveFrame == 0 & linea.includes("/* BEGIN Frame */")){
            saveFrame = 1;
            continue;
        }
        if(saveFrame == 1){
            if(!linea.includes("/* END Frame */")){
                codeToParserF = codeToParserF + linea;
            }
            else{
                try {
                    actualFrame=parserForm.parse(codeToParserF);
                    let dataFrame = {
                        lines:actualFrame.lines,
                        etiquetas:actualFrame.dataFrame.final.etiquetas,
                        borde:actualFrame.dataFrame.final.borde
                    }
                    frames.set(actualFrame.dataFrame.name,dataFrame);
                  }
                  catch(err) {
                    errorMSg= err;
                    //alert("Error frame: " + err + ".");
                  }
                  finally {
                    saveFrame = 0;
                    codeToParserF = "";
                  }
            }
        }
    }
    callback(errorMSg,tablas,frames);
    //console.log(tablas);
    //console.log(frames);
}