'use strict'

//import Progress from './classProgress.js'
window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')
window.frames["../../src/frame.html"]

const electron = require('electron')
const path = require('path')
let pathFrame = path.join(__dirname,'../assets/js/classFrame.js')
console.log(pathFrame)
const Frame = require(pathFrame)
const BrowserWindow = electron.remote.BrowserWindow
const remote=electron.remote
const ipc=electron.ipcRenderer


var nFrames=0;
var nVars=0;

/*ventana crear Frame*/

let winnewFrame=null
//let progress=new Progress();
/*let newFrame=document.getElementById('crearFrame');

newFrame.addEventListener('click', () => {
    createNewFrame();
  });*/

  
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

  const frames= document.getElementById('frames');

  ipc.on('frameInf', function(event, arg){
    frames.innerHTML +='<a id="frame'+nFrames+'" class="btn btn-info btn-lg">Frame'+nFrames+'</a>';
    nFrames++;
    //Crear clase frame
    console.log("Antes de crear frame");
    let framePrueba = new Frame("0","caca","rojo");
    if(framePrueba != null){
      alert("Creado frame");
    }
  })

  function createNewVar(){
    winnewFrame=new BrowserWindow({ 
      width: 400,
      height: 330,
      webPreferences: {
        nodeIntegration: true,
        defaultEncoding: 'UTF-8'
      }
    });
    winnewFrame.loadURL(`file://${__dirname}/newVar.html`);
    winnewFrame.on('close',function(){winnewFrame=null});
    //winnewFrame.show();
    winnewFrame.once('ready-to-show', () => {
      winnewFrame.setMenu(null)
      winnewFrame.show()
    })
  }
  const vars= document.getElementById('vars');
  const varsMov=document.getElementById('varsMov');

  ipc.on('varInf', function(event, arg){
    //vars.innerHTML +='<a id="variable'+nVars+'" class="btn btn-info btn-lg">Variable'+nVars+'</a>';
    vars.innerHTML += '<div class="card border-info mb-3 text-center">\
                              <div class="card-header">\
                                <a id="variable'+nVars+' class="collapsed card-link text-center" data-toggle="collapse" href="#collapse'+nVars+'">\
                                <h6 class="card-title text-dark"> <i class="far fa-edit"></i> Variable'+nVars+'</h6>\
                              </a>\
                              </div>\
                              <div id="collapse'+nVars+'" class="collapse" data-parent="#accordion">\
                                <div class="card-body text-left">\
                                <table class="table table-hover group table-striped">\
                                  <tbody>\
                                    <tr>\
                                    <td>Nombre:</td>\
                                    <td>Value</td>\
                                   </tr>\
                                    <tr>\
                                    <td>Tipo:</td>\
                                    <td>Value</td>\
                                   </tr>\
                                    <tr>\
                                    <td>Formato:</td>\
                                    <td>Value</td>\
                                   </tr>\
                                   <tr>\
                                    <td>Etiqueta:</td>\
                                    <td>Value</td>\
                                    </tr>\
                                    <tr>\
                                    <td>Valor inicial:</td>\
                                    <td>Value</td>\
                                    </tr>\
                                  </tbody>\
                                </table>\
                              </div> </div> </div>';
    $('#collapse'+nVars).append('<div class="card-footer text-muted">\
                                  <a href="#" class="btn btn-sm btn-info"><i class="far fa-save"></i> Guardar Cambios </a>\
                                </div>');
    $('#collapse'+nVars).append('<div class="card-footer text-muted">\
                                  <a href="#" class="btn btn-sm btn-info"><i class="fas fa-trash-alt"></i> Borrar </a>\
                                </div>');  
    varsMov.innerHTML +='<div id="yes-drop" class="drag-drop"> variable'+ nVars +'</div>';
    nVars++;
  })
  