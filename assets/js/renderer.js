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

/*ventana crear Frame*/

let winnewFrame=null
//let progress=new Progress();
/*let newFrame=document.getElementById('crearFrame');

newFrame.addEventListener('click', () => {
    createNewFrame();
  });*/

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
function createFrameAndVars(tablas, frames, vars){
  console.log("tablas ",tablas,"frames ",frames,"vars ",vars);
  let key = frames.entries().next().value[0]; 
  let value   = frames.entries().next().value[1];
  let title = "";
  if(value['title'] !== null)
    title = value['title'];
  let idFrame = nuevaPlantilla.addFrame(key,title,value['type']);

  //seleccionamos frame para mostrar
  $('#frames').append('<option value= "'+idFrame+'">'+key+'</option>');
  $("#frames option:selected").removeAttr("selected");
  $('#frames option[value="'+idFrame+'"]').attr("selected",true);
  for (var [clave, valor] of frames) {
    if(clave != key){ //Cargar nuevo frame
      if(valor['title'] !== null)
        title = valor['title'];
    //COMPROBAR QUE NO HAY OTRO FRAME QUE SE LLAME IGUAL///
    let nombreFrame=false;
    nombreFrame=validarNombreFrame(clave);
    if(nombreFrame==false){
      idFrame = nuevaPlantilla.addFrame(clave,title,valor['type']);
    }else{
      alert("Hay un Frame que se llama igual a "+clave);
      break;
    }
      $('#frames').append('<option value= "'+idFrame+'">'+clave+'</option>');
      $("#frames option:selected").removeAttr("selected");
      $('#frames option[value="'+idFrame+'"]').attr("selected",true);
      key = clave;
    }
 
    //cargamos variables del frame en el que nos encontramos
    if(valor['type'] == 1){ // output frame
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
        varInfo.name = line.id;

        //////////////////////////////////////////////////
        let existe=validarNombreVar(key,varInfo.name,tablas);
        if(existe){
          console.log("variable: "+varInfo.name+" existe");
        }else{
          console.log("variable: "+varInfo.name+" No existe");
        }
        ////////////////////////////////////////////////
        line.opciones.forEach(opcion =>{
          if(opcion.type == "label")
            varInfo.label = opcion.value;
        });
        // Rellenamos tipo, init y format del map tabla
        tablas.get(clave).forEach(variable =>{
          if (variable.var == varInfo.name){
            varInfo.type = variable.type;
            variable.opciones.forEach(opcion =>{
              if(opcion.type == "init")
                varInfo.initial = opcion.value;
              if(opcion.type == "format")
                varInfo.format = opcion.format;
            });
          }
        });
        let idVar = nuevaPlantilla.addVartoOutputFrame(idFrame,varInfo);
        varInfo.id=idVar;
      });
    }
    else if(valor['type'] == 0){ // input frame
      //Rellenamos label, row y col de map frames
      valor.lines.forEach(line =>{
        let varInfo={
          name:line.id,
          type: "",
          label: "",
          initial: "",
          format: "",
          id:"",
          movido:""
        };

        //////////////////////////////////////////////////
        //VALIDAR LA VARIABLE
        ////////////////////////////////////////////////
        line.opciones.forEach(opcion =>{
          if(opcion.type == "label")
            varInfo.label = opcion.value;
          if(opcion.type == "row")
            varInfo.row = opcion.value;
          if(opcion.type == "colum")
            varInfo.col = opcion.value;
          if(varInfo.col != 0 || varInfo.row !=0)
            varInfo.movido=1;
        });
        // Rellenamos tipo, init y format del map vars
        vars.get(line.id).forEach(opcion =>{
          if(opcion.type == "type")
            varInfo.type = opcion.value;
          if(opcion.type == "init")
            varInfo.initial = opcion.value;
          if(opcion.type == "format")
            varInfo.format = opcion.format;
        });
        let idVar = nuevaPlantilla.addVartoFrameRead(idFrame,varInfo);
        varInfo.id=idVar;
        let obj=nuevaPlantilla.getVariableByKey(idFrame,idVar);
        varInfo.movido=obj.movido;
      });
    }
    cargarFrame(idFrame);
  }
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
  