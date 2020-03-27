'use strict'

//import Progress from './classProgress.js'
window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')
window.frames["../../src/frame.html"]

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

function crearPlantilla(tablas, frames, fileName){
  if(tablas == undefined | frames == undefined){
    nuevaPlantilla = new classProgress.Progress();
  }
  else{
    nuevaPlantilla = new classProgress.Progress();
    nuevaPlantilla.setFileName(fileName);
    createFrameAndVars(tablas, frames);   
  }
  $('#index').hide();
  $('#designer').show();
  $('.headerOptions').show();
  $("#title").empty();
  $("#title").append(nuevaPlantilla.getFileName());
}
function createFrameAndVars(tablas, frames){
  console.log(tablas,frames);
  let key = frames.entries().next().value[0]; 
  let value   = frames.entries().next().value[1];
  let borde = 1;
  if(value['borde'] != "")
    borde = 0;
  let etiqueta = 0;
  if(value['etiquetas'] != "side-labels")
    etiqueta = 1;
    
  let idFrame = nuevaPlantilla.addFrame(key,borde,etiqueta);
  



  //seleccionamos frame para mostrar
  $('#frames').append('<option value= "'+idFrame+'">'+key+'</option>');
  $("#frames option:selected").removeAttr("selected");
  $('#frames option[value="'+idFrame+'"]').attr("selected",true);
  for (var [clave, valor] of frames) {
    if(clave != key){ //Cargar nuevo frame
      if(valor['borde'] != "")
        borde = 0;
      let etiqueta = 0;
      if(valor['etiquetas'] != "side-labels")
        etiqueta = 1;

      //COMPROBAR QUE NO HAY OTRO FRAME QUE SE LLAME IGUAL///
    let nombreFrame=false;
    nombreFrame=validarNombreFrame(clave);
    if(nombreFrame==false){
      idFrame = nuevaPlantilla.addFrame(clave,borde,etiqueta);

      
    }else{
      alert("Hay un Frame que se llama igual a "+clave);
    }
      //idFrame = nuevaPlantilla.addFrame(clave,borde,etiqueta);
      $('#frames').append('<option value= "'+idFrame+'">'+clave+'</option>');
      $("#frames option:selected").removeAttr("selected");
      $('#frames option[value="'+idFrame+'"]').attr("selected",true);
      key = clave;
    }
    //cargamos variables del frame en el que nos encontramos
    let varInfo={
      name:"",
      type: "",
      label: "",
      initial: "",
      format: "",
      id:"",
      movido:""
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
        if(opcion.type == "row")
          varInfo.row = opcion.value;
        if(opcion.type == "colum")
          varInfo.col = opcion.value;
        if(varInfo.col != 0 || varInfo.row !=0)
          varInfo.movido=1;
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
      let idVar = nuevaPlantilla.addVartoFrameRead(idFrame,varInfo);
      varInfo.id=idVar;
      let obj=nuevaPlantilla.getVariableByKey(idFrame,idVar);
      varInfo.movido=obj.movido;
    });
    cargarFrame(idFrame);
  }
}
function abrirPlantilla(){
  var app = require('electron').remote; 
  var dialog = app.dialog;
  let dia = dialog.showOpenDialog();
  var fs = require('fs');
  dia.then(file => {
    if (file.filePaths === undefined){
      alert("Ha ocurrido un error al abrir el archivo");
      return;
    }
    console.log("file: " + file.filePaths[0]);
    //let fileName = getFileName(file.filePaths[0]);
    let fileName= path.basename(file.filePaths[0]);
    fs.readFile(file.filePaths[0],'utf8', (err, data) =>{
      if (err) throw err;
      parser.parserCode(data, (err, dataTable, dataFrame) =>{
        if (err != ""){
          alert("Error: " + err + ".");
          return;
        }
        console.log("dataTable: "+dataTable);
        console.log("/ dataFrame: "+dataFrame);
        console.log("/ fileName: "+fileName);
        crearPlantilla(dataTable,dataFrame,fileName);
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
  