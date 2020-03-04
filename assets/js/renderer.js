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

function crearPlantilla(){
  $('#index').hide();
  $('#designer').show();
  $('.headerOptions').show();
  nuevaPlantilla = new classProgress.Progress();
  $("#title").empty();
  $("#title").append(nuevaPlantilla.getFileName());
  //console.log(nuevaPlantilla);
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

    // Titulo
    let fileName = getFileName(file.filePaths[0]);
    $("#title").empty();
    $("#title").append(fileName);
    $('#index').hide();
    $('#designer').show();
    $('.headerOptions').show();
    fs.readFile(file.filePaths[0],'utf8', (err, data) =>{
      if (err) throw err;
      parser.parserCode(data);
      //CREAR LA PLANTILLA CON LOS DATOS PARSEADOS
    });
  });
}
function exit(){
  window.close();
}
  