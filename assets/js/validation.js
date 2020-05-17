
exports.validateNewFrame = function validateNewFrame(frameInfo, callback){

    let encontrado = false;
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
    //validaciones["nombre"]=nombre ; validaciones[1]=valor inicial coincide con formato; 
    let validaciones={
        "nombre": null,
        "ini": null
    };
    
    let encontrado = false;
    if (varInfo["name"] == ""){
        validaciones["nombre"]="vacio";
        //callback("Nombre de variable vacío, debe rellenar este campo");
    }
    else{
        nuevaPlantilla.getFrame(idFrame).getVariables().forEach(function (elemF, indexF, array) {
            if (elemF.getNombre() == varInfo["name"]){
                //encontrado = true;
                validaciones["nombre"]="repetido"
            }
        });
        /*if (encontrado){
            callback("Nombre de variable ya existente, elija otro");
            validaciones[0]="repetido"
        }
        else
        callback("Ok");*/
    }
    if(varInfo["type"]=="integer"){ //integer
        
        validaciones["ini"]=!isNaN(varInfo["initial"]);
        if(validaciones["ini"]){
            console.log("tamño:",varInfo["tam"]);
            varInfo["tam"]=Math.max(8,varInfo["initial"].length);
            console.log("tamño:",varInfo["tam"]);
            varInfo["initial"]=parseInt(varInfo["initial"]).toFixed();
        }
        
    }
    if(validaciones["nombre"]=="vacio"){
        callback("Nombre de variable vacío, debe rellenar este campo");
    }else if(validaciones["nombre"]=="repetido"){
        callback("Nombre de variable ya existente, elija otro");
    }else if(validaciones["ini"]==false){
        callback("Valor inicial no corresponde con el tipo elegido");
    }else{

        callback("Ok");
    }
    
    
}
exports.validateEditVar= function validateEditVar(idFrame, varInfoOld,validateEditVar, callback){
    let encontrado = false;
    if (validateEditVar["name"] === ""){
        callback("Nombre de variable vacío, debe rellenar este campo");
    }
    else{
        if(validateEditVar["name"] !== varInfoOld["name"]){ //Si ha cambiado el nombre, compruebo que no sea uno existente
            nuevaPlantilla.getFrame(idFrame).getVariables().forEach(function (elemF, indexF, array) {
                if (elemF.getNombre() == validateEditVar["name"]){
                    encontrado = true;
                }
            });
        }
        if (encontrado){
            callback("Nombre de variable ya existente, elija otro");
        }
        else
        callback("Ok");
    }
    
}