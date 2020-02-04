$(() => {
    $(".headerOptions").hide();
 });

 function generateCode(){
    let tempTable = "\n";
    let frame = "";
    let update = "update";



    nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {
        tempTable += "define temp-table tt_" + elemF.getNombre() + " no-undo \n";
        frame += "define frame " + elemF.getNombre() + " \n";
        elemF.getVariables().forEach(function (elemV, indexV, array) {
            tempTable += "   field " + elemV.getNombre() +" as " + elemV.getTipo() + "\n";
            frame += "   " + elemV.getNombre() +' label "' + elemV.getLabel() + '" init "' + elemV.getInitial() +'" format "' + elemV.getFormato() +'" at row '+elemV.getFila()+' column'+elemV.getColumna()+' \n';
            update += " " + elemV.getNombre();
        });
        tempTable += ". \n";
        frame += "with "
        if(elemF.getEtiqueta() == 0) {
            frame += "side-labels ";
        }
        else if(elemF.getEtiqueta() == 1){
            frame += "no-label ";
        }
        if(elemF.getBorde() == 0) {
            frame += "no-box. ";
        }
        else{
            frame += ".";
        }
        update += " with frame " +elemF.getNombre() +". \n";
    });
    
   tempTable += frame +"\n"+ update;
   return tempTable;
   
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
    dialog.showSaveDialog((fileName) =>{
        if (fileName === undefined){
             console.log("No guardaste el archivo");
             return;
        }
        fs.writeFile(fileName, code, function(err) {
            if (err) {
                alert(err);
            }
            alert("El archivo codeTest.txt fue creado correctamente");
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
