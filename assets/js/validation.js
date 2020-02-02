
exports.validateNewFrame = function validateNewFrame(frameInfo, callback){

    let encontrado = false;
    let vacio = false;
    if (frameInfo["nombre"] == ""){
        callback("Nombre de frame vacío, debe rellenar este campo");
    }
    else{
        nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {
            if (elemF.getNombre() == frameInfo["nombre"]){
                encontrado = true;
            }
        });
        if (encontrado){
            callback("Nombre de frame ya existente, elija otro");
        }
        else
        callback("Ok");
    }
    
}
exports.validateEditFrame = function validateEditFrame(frameInfoOld,frameInfoNew, callback){

    let encontrado = false;
    let vacio = false;
    if (frameInfoNew["name"] === ""){
        callback("Nombre de frame vacío, debe rellenar este campo");
    }
    else{
        if(frameInfoNew["name"] !== frameInfoOld["name"]){ //Si ha cambiado el nombre, compruebo que no sea uno existente
            nuevaPlantilla.getFrames().forEach(function (elemF, indexF, array) {
                if (elemF.getNombre() == frameInfoNew["name"]){
                    encontrado = true;
                }
            });
        }
        if (encontrado){
            callback("Nombre de frame ya existente, elija otro");
        }
        else
        callback("Ok");
    }
    
}
exports.validateNewVar = function validateNewVar(varInfo, idFrame, callback){

    let encontrado = false;
    let vacio = false;
    if (varInfo["name"] == ""){
        callback("Nombre de variable vacío, debe rellenar este campo");
    }
    else{
        nuevaPlantilla.getFrame(idFrame).getVariables().forEach(function (elemF, indexF, array) {
            if (elemF.getNombre() == varInfo["name"]){
                encontrado = true;
            }
        });
        if (encontrado){
            callback("Nombre de variable ya existente, elija otro");
        }
        else
        callback("Ok");
    }
    
}