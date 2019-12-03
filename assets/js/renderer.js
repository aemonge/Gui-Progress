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
let nuevaPlantilla = new classProgress.Progress()

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
});
  
function createNewFrame(){
    winnewFrame=new BrowserWindow({ 
      width: 400,
      height: 330,
      webPreferences: {
        nodeIntegration: true,
        defaultEncoding: 'UTF-8'
      }
    });
    winnewFrame.loadURL(`file://${__dirname}/newFrame.html`);
    winnewFrame.on('close',function(){winnewFrame=null});
    //winnewFrame.show();
    winnewFrame.once('ready-to-show', () => {
      winnewFrame.setMenu(null)
      winnewFrame.show()
    })
}

function crearPlantilla(){
  $('#index').hide();
  $('#designer').show();
  $('.headerOptions').show();
  //console.log(nuevaPlantilla);
}
function exit(){
  window.close();
}
  