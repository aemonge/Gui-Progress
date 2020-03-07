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
    createFrameAndVars(tablas, frames, nuevaPlantilla);   
  }
  $('#index').hide();
  $('#designer').show();
  $('.headerOptions').show();
  $("#title").empty();
  $("#title").append(nuevaPlantilla.getFileName());
}
function createFrameAndVars(tablas, frames, plantilla){
  console.log(tablas,frames);
  let key = frames.entries().next().value[0]; 
  let value   = frames.entries().next().value[1];
  //console.log(frames,frames.entries().next(),frames.entries().next().value[0] ,frames.entries().next().value[1]);

  let idFrame = plantilla.addFrame(key,value['borde'],value['etiqueta']); 
  //seleccionamos frame para mostrar
  $('#frames').append('<option value= "'+idFrame+'">'+key+'</option>');
  $("#frames option:selected").removeAttr("selected");
  $('#frames option[value="'+idFrame+'"]').attr("selected",true);

  for (var [clave, valor] of frames) {
    if(clave != key){
      idFrame = plantilla.addFrame(clave,valor['borde'],valor['etiqueta']);
      $('#frames').append('<option value= "'+idFrame+'">'+key+'</option>');
      $("#frames option:selected").removeAttr("selected");
      $('#frames option[value="'+idFrame+'"]').attr("selected",true);
      key = clave;
    }
    let varInfo={
      name:"",
      type: "",
      label: "",
      initial: "",
      format: "",
      id:""
    };
    //Rellenamos label, row y col de map frames
    valor.lines.forEach(line =>{
      varInfo.name = line.id;
      line.opciones.forEach(opcion =>{
        if(opcion.type == "label")
          varInfo.label = opcion.value;
        if(opcion.type == "row")
          varInfo.row = opcion.value;
        if(opcion.type == "colum")
          varInfo.col = opcion.value;
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
      let idVar = plantilla.addVartoFrame(idFrame,varInfo);
      varInfo.id=idVar;
      let obj=plantilla.getVariableByKey(idFrame,idVar);
      varInfo.movido=obj.movido;
      addVisualVar(varInfo);
    });
  }
  vaciarVariables();
  //cargamos datos del frame
  cargarFrame(idFrame);
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
    let fileName = getFileName(file.filePaths[0]);
    fs.readFile(file.filePaths[0],'utf8', (err, data) =>{
      if (err) throw err;
      parser.parserCode(data, (err, dataTable, dataFrame) =>{
        if (err != ""){
          alert("Error: " + err + ".");
          return;
        }
        crearPlantilla(dataTable,dataFrame,fileName);
      });
    });
  });
}
function exit(){
  window.close();
}
  