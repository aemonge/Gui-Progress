
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
            varInfo["tam"]=Math.max(8,varInfo["initial"].length);
            varInfo["initial"]=parseInt(varInfo["initial"]).toFixed();
        }
        
    }else if(varInfo["type"]=="date"){//date
        console.log("date initial:",varInfo["initial"]);
        console.log("date format:",varInfo["format"]);
        validaciones["ini"]=isValidDate(varInfo["initial"],varInfo["format"]);
            
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

function isValidDate(dateString,format)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;
    
    var parts = dateString.split("/");
    if(format=="dd/mm/yyyy"){
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
    }else if(format=="mm/dd/yyyy"){
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);
    }else if(format=="yyyy/mm/dd"){
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);
    }else{
        return false;
    }
    
    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

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