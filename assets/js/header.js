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
            frame += "   " + elemV.getNombre() +' label "' + elemV.getLabel() + '" init "' + elemV.getInitial() +'" format "' + elemV.getFormato() +'" at row 0 column 0 \n';
            update += " " + elemV.getNombre();
        });
        tempTable += ". \n";
        frame += "with "
        if(elemF.getEtiqueta() == 0) {
            frame += "side-labels ";
        }
        else if(elemF.getEtiqueta() == 1){
            frame += "column-labels ";
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
   let fs = require('fs');

    fs.writeFile("codeTest.txt", tempTable, function(err) {
        if (err) {
            alert(err);
        }

        alert("El archivo codeTest.txt fue creado correctamente");
    });
}
 
