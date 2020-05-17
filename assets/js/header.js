$(() => {
    $(".headerOptions").hide();
 });

 function generateCode(){
    let code = "\n";
    console.log(nuevaPlantilla);
    code += generarVariables();
    code += generarTablas();
    code += generarFrames();
   return code;
   
}
function generarTablas(){
    let tempTable = "\n";
    nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {
        if (elemF.getTipo() == "output"){
            tempTable += "/* BEGIN TemporalTable Autogenerated */ \n";
            tempTable += "define temp-table tt_" + elemF.getNombre() + " no-undo \n";
            elemF.getVariables().forEach(function (elemV, indexV, array) {    
                tempTable += "   field " + elemV.getNombre() +" as " + elemV.getTipo();
                if(elemV.getInitial() != "")
                    tempTable += " init " + '"' +elemV.getInitial() + '"';
                if(elemV.getFormato()!= "")
                    tempTable += " format " + '"'+ elemV.getFormato() + '"';   
                    tempTable += "\n";
            });
            tempTable += ". \n";
            tempTable += "/* END TemporalTable Autogenerated */ \n";
        }
    });
    return tempTable;
}
function generarVariables(){
    let vars = "\n";
    let haveVars = false;
    vars += "/* BEGIN VARS Autogenerated */ \n";
    nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {   
        if (elemF.getTipo() == "input"){     
            elemF.getVariables().forEach(function (elemV, indexV, array) {    
                if (haveVars == false) haveVars= true;
                vars += "define variable " + elemV.getNombre() +" as " + elemV.getTipo();
                if(elemV.getInitial() != "")
                vars += " init " + '"' +elemV.getInitial() + '"';
                if(elemV.getFormato()!= "")
                vars += " format " + '"'+ elemV.getFormato() + '"';   
                vars += " no-undo.  \n";
            });
        }
    });
    vars += "/* END VARS Autogenerated */ \n";
    if (haveVars == true) 
        return vars;
    else return "";
}
function generarFrames(){
    let frame="";
    nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {
        if(elemF.getTipo() == "output") {
            frame+= " \n/* BEGIN OUTPUT Frame Autogenerated */ \n";
        }
        else{
            frame+= " \n/* BEGIN INPUT Frame Autogenerated */ \n";
        }
        frame += "define frame " + elemF.getNombre() + " \n";
        
        if(elemF.getTipo() == "input") {
            elemF.getVariables().forEach(function (elemV, indexV, array) {
                frame += "   " + elemV.getNombre() +' label "' + elemV.getLabel()  +'" at row '+(elemV.getFila()+1).toString()+' column '+(elemV.getColumna()+elemV.getLabel().length+1).toString()+' \n';
            });
            frame += "with side-labels";
        }
        else{
            elemF.getVariablesOutput().forEach(function (elemento, indice) {
                elemV = elemF.getVariable(parseInt(elemento));
                frame += "   " + elemV.getNombre() +' label "' + elemV.getLabel() +'" \n';
            });
        }
        if(elemF.getTitulo() != "") {
            if(elemF.getTipo() == "input") {
                frame += ' title "' + elemF.getTitulo() + '". \n';
            }
            else{
                frame += 'with title "' + elemF.getTitulo() + '". \n';
            }
        }
        else{
            frame +=". \n";
        }
        if(elemF.getTipo() == "input") {
            frame+= "/* END INPUT Frame Autogenerated */ \n";
        }
        else{
            frame+= "/* END OUTPUT Frame Autogenerated */ \n";
        }
    });
    return frame;
}

function guardarPlantilla(){
    /*
        ENLACE PARA DIALOG
        https://es.ourcodeworld.com/articulos/leer/41/como-escoger-leer-guardar-eliminar-o-crear-un-archivo-con-electron-framework
    */
    var app = require('electron').remote; 
    var dialog = app.dialog;
    let code = generateCode();
    let fs = require('fs');
    let dia = dialog.showSaveDialog();

    dia.then(file => {
        if (file.filePath === undefined){
            alert("Ha ocurrido un error al guardar el archivo");
            return;
        }
        fs.writeFile(file.filePath, code, function(err) {
            if (err) {
                alert(err);
            }
            else{
                let fileName = getFileName(file.filePath);
                nuevaPlantilla.setFileName(fileName);
                $("#title").empty();
                $("#title").append(nuevaPlantilla.getFileName());
                alert("Guardado correctamente");
            }
            
        });
    });
    // CODIGO ANTIGUO QUE GUARDA DIRECTAMENTE
    /* 
    let fs = require('fs');

    fs.writeFile("codeTest.txt", code, function(err) {
        if (err) {
            alert(err);
        }

        alert("El archivo codeTest.txt fue creado correctamente");
    });
    */
}
 function viewCode(){
    //$('#designer').hide();
    //$('#code').show();
    let code = generateCode();
    let count = (code.match(/(?:\r\n|\r|\n)/g) || []).length;
    //code = code.replace(/(?:\r\n|\r|\n)/g, '<br />');
    code = code.split("\n").join(" <br> ");
    $('#codeView').html(code);
    for(let i = 1; i<= count; i++){
        $('.line-numbers').append(''+i+'<br>')
    }
 }
 function getFileName(filePath){
    let i = filePath.length -1 ;
    let encontrado = false ;
    let fileName = "";
     while (i >= 0 && !encontrado){
        if(filePath[i] !== "\\")
            fileName = filePath[i] + fileName;
        else
            encontrado = true;
        i--;
     }
     return fileName;
 }
function volverInicio(){
    nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {
        borrarFrame(elemF.id);
    });
    $('#vars').empty();
    $('#varsOutput').empty();
    $('.headerOptions').hide();
    $('#designer').hide();
    $('#index').show();

}