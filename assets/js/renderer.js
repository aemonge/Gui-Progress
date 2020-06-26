'use strict'

//import Progress from './classProgress.js'
//window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')
window.frames["../../src/frame.html"]
//require('jquery-ui-dist')


const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const remote=electron.remote
const ipc=electron.ipcRenderer
let pathProgress = path.join(__dirname,'../assets/js/classProgress.js')
const classProgress = require(pathProgress)
const parser=require(path.join(__dirname,'../assets/js/parser.js'));
let nuevaPlantilla;
//const validation=require(path.join(__dirname,'../assets/js/validation.js'));

/*ventana crear Frame*/

//let winnewFrame=null

$(() => {
   $(".headerOptions").hide();
   $('#designer').hide();
   $('#code').hide();
});

function crearPlantilla(tablas, frames, vars, fileName){
  
  $('#index').hide();
  $('#designer').show();
  $('.headerOptions').show();
  $("#title").empty();
  if(frames == undefined){
    nuevaPlantilla = new classProgress.Progress();
  }
  else{
    nuevaPlantilla = new classProgress.Progress();
    nuevaPlantilla.setFileName(fileName);
    createFrameAndVars(tablas, frames,vars);   
  }
  $("#title").append(nuevaPlantilla.getFileName());
}

function createFrameAndVars(tablas,frames,vars){
  console.log("tablas ",tablas,"frames ",frames,"vars ",vars);
  let flog=("Comenzamos a leer el archivo \n");
  let idFrame;
  let outp=true;
  let inp=true;
  if(tablas.size==0 || tablas==null ||tablas==undefined )
    outp=false;
  if(vars.size==0 || vars==null ||vars==undefined)
    inp=false;
if(frames.size!=0 && frames!=null && frames!=undefined){    
  for(var frame of frames){
    console.log(frame);
    var clave=frame[0];
    var valor=frame[1];
    if (valor['title']==null)
      valor['title']="";
    let fr={
      nombre: clave,
      title: valor['title'],
      type: valor['type']
    }
    let tipoTxt="entrada"
    if (fr['type']==1)
      tipoTxt="salida"

    console.log("frame:",fr)

    validation.validateNewFrame(fr,function(message) { 
      if ("Ok" === message) {
        idFrame = nuevaPlantilla.addFrame(fr['nombre'],fr['title'],fr['type']);
        //añadir comentario en el log.
        flog+=">OK:Se añade nuevo Frame de "+tipoTxt+" con nombre: "+fr['nombre']+ " con titulo: "+fr['title']+" con id:"+idFrame+"\n"
        //console.log(flog);
        $('#frames').append('<option value= "'+idFrame+'">'+clave+'</option>');
        $("#frames option:selected").removeAttr("selected");
        $('#frames option[value="'+idFrame+'"]').attr("selected",true);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        if(fr['type'] == 1 && outp==true){ // output frame
          let varInfo={
            name:"",
            type: "",
            label: "",
            initial: "",
            format: "",
            id:"",
          };
          //Rellenamos label, row y col de map frames
          valor.lines.forEach(line =>{
            varInfo["name"] = line.id;
            line.opciones.forEach(opcion =>{
              if(opcion.type == "label")
                varInfo["label"] = opcion.value;
            });
            let encontrado=false;
            // Rellenamos tipo, init y format del map tabla
            tablas.get(clave).forEach(variable =>{
                if (variable.var == varInfo.name){
                  encontrado=true;
                  varInfo["type"] = variable.type;
                  variable.opciones.forEach(opcion =>{
                    if(opcion.type == "init")
                      varInfo["initial"] = opcion.value;
                    if(opcion.type == "format")
                      varInfo["format"] = opcion.format;
                  });
                }
            });
            flog+=">Empezamos a crear la variable de salida: "+varInfo["name"]+" con label: "+varInfo['label']+" de tipo: "+varInfo['type']+" con formato: "+varInfo['format']+" con valor inicial: "+varInfo['initial']+"\n";
            if(encontrado){
              varInfo=preparaDatos(varInfo);
              validation.validateNewVar(varInfo,idFrame,function(message){
                  if("Ok"===message){
                    let idVar = nuevaPlantilla.addVartoOutputFrame(idFrame,varInfo);
                    varInfo["id"]=idVar;
                    flog+=">>OK:Se agrega correctamente la variable: "+varInfo["name"]+" con id: "+varInfo['id']+" con label: "+varInfo['label']+" de tipo: "+varInfo['type']+" con formato: "+varInfo['format']+" con valor inicial: "+varInfo['initial']+"\n";
                  }else{
                    flog+=(">>NOK:Error al crear la variable"+varInfo["name"]+" en el Frame: "+idFrame+" con error: "+message+"\n")
                  }
              });
            }else{
              flog+=">>NOK: Error variable no encontrada en la temp-table"
            }                       
            
            
            
          });
        }else if(fr['type'] == 0 && inp==true){ // input frame
          //Rellenamos label, row y col de map frames
          valor.lines.forEach(line =>{
            
            let varInfo={
              name:line.id,
              type: "",
              label: "",
              initial: "",
              format: "",
              id:"",
              movido:"",
              tam:""
            };
    
            //////////////////////////////////////////////////
            //VALIDAR LA VARIABLE
            ////////////////////////////////////////////////
            line.opciones.forEach(opcion =>{
              if(opcion.type == "label")
                varInfo["label"] = opcion.value;
              if(opcion.type == "row")
                varInfo["row"] = opcion.value;
              if(opcion.type == "colum")
                varInfo["col"] = opcion.value;
              if(varInfo.col != 0 || varInfo.row !=0)
                varInfo["movido"]=1;
            });
            varInfo["col"]=parseInt(varInfo["col"])-(varInfo["label"].length+1);
            // Rellenamos tipo, init y format del map vars
            flog+=">Empezamos a crear la variable de entrada: "+varInfo["name"]+" con label: "+varInfo['label']+"\n";
            if(vars.get(line.id)!=null){
              vars.get(line.id).forEach(opcion =>{
                if(opcion.type == "type")
                  varInfo["type"] = opcion.value;
                if(opcion.type == "init")
                  varInfo["initial"] = opcion.value;
                if(opcion.type == "format")
                  varInfo["format"] = opcion.format;
              });
              varInfo=preparaDatos(varInfo);
              validation.validateNewVar(varInfo,idFrame,function(message){
                if("Ok"===message){
                  let idVar = nuevaPlantilla.addVartoFrameRead(idFrame,varInfo);
                  varInfo.id=idVar;
                  let obj=nuevaPlantilla.getVariableByKey(idFrame,idVar);
                  varInfo.movido=obj.movido;
                  flog+=">>OK:Se agrega correctamente la variable: "+varInfo["name"]+" con id: "+varInfo['id']+" con label: "+varInfo['label']+" de tipo: "+varInfo['type']+" con formato: "+varInfo['format']+" con valor inicial: "+varInfo['initial']+" en fila: "+varInfo['row']+" en columna: "+varInfo['col']+"\n";
                }else{
                  flog+=(">>NOK:Error al crear la variable"+varInfo["name"]+" en el Frame: "+idFrame+" con error: "+message+"\n");
                }
              });

              
            } else{
              flog+=">>NOK: Error variable no encontrada en la tabla de variables.\n"
            }             
            
          });
        }else{
          if(outp==false)
            flog+=">NOK: No se ha definido la temp-table. \n";
          if(inp==false)
            flog+=">NOK: No se ha definido la tabla de variables. \n";
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        
      }else{
        //añadir comentario en el log.
        flog+=(">NOK:Error al crear el frame"+fr+" con error: "+message+"\n")
        
        
      }
      flog+="------------------------------------------------------------\n"
    })
    
    cargarFrame(idFrame);
    
  }
}else{
  flog+=("NOK:Error al leer los frames, no hay frames definidos\n")
}
  console.log(flog);
  let fs = require('fs');
  let nombre= "erroLog-"+nuevaPlantilla.getFileName().split('.')[0]+".txt"
    fs.writeFile(nombre, flog, function(err) {
        if (err) {
            alert(err);
        }
        //alert("Se ha creado el archivo "+nombre+" con los detalles de la carga");
    });

}

function preparaDatos(varInfo){
  if(varInfo["type"]=="integer"){
    if( isNaN(parseInt(varInfo["initial"])))
      varInfo["initial"]=0;
    else
      varInfo["initial"]=parseInt(varInfo["initial"]);
    //obligamos este formato
    varInfo["format"]="->,>>>,>>9"
  }
  if(varInfo["type"]=="decimal"){
    if(varInfo["format"]==""  )
      varInfo["decimal"]=1
    else varInfo["decimal"]=parseInt(getFormat(varInfo));
    if( isNaN(parseFloat(varInfo["initial"])))
      varInfo["initial"]=0;
    else
      varInfo["initial"]=parseFloat(varInfo["initial"]);
    
  }
  if(varInfo["type"]=="character"){
    varInfo["format"]=parseInt(getFormat(varInfo));
    varInfo["tam"]=varInfo["format"];

  }
  if(varInfo["type"]=="date"){
    varInfo["tam"]=10;
  }
  return varInfo;
}

function abrirPlantilla(){
  //var app = require('electron').remote; 
  var app=remote;
  var dialog = app.dialog;
  let dia = dialog.showOpenDialog();
  var fs = require('fs');
  dia.then(file => {
    if (file.filePaths === undefined){
      alert("Ha ocurrido un error al abrir el archivo");
      return;
    }
    //console.log("file: " + file.filePaths[0]);
    //let fileName = getFileName(file.filePaths[0]);
    let fileName= path.basename(file.filePaths[0]);
    fs.readFile(file.filePaths[0],'utf8', (err, data) =>{
      if (err) throw err;
      parser.parserCode(data, (err, dataTable, dataFrame, dataVars) =>{
        if (err != ""){
          alert("Error: " + err + ".");
          return;
        }
        crearPlantilla(dataTable,dataFrame,dataVars,fileName);
      });
    });
  });
}

function validarNombreVar(clave,nombre,tablas){
  let t=tablas.entries().next().value[0];
  for (var claveT of tablas) {
    if(claveT[0]==clave){
      for(let i=0; i<claveT[1].length;i++){
        if(claveT[1][i]["var"]==nombre)
          return true;
      }
      return false;
    }  
    //console.log("hola")
  }
  return false;
}
function validarNombreFrame(key){
  let frames=nuevaPlantilla.getFrames().entries();
  for(let frame of frames){
    if(key==frame[1]["name"])
      return true;
  }
  return false;
}

function exit(){
  window.close();
}
  