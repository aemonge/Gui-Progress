'use strict'
//import Frame from './classFrame.js'
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
    vars.innerHTML +='<a id="variable'+nVars+'" class="btn btn-info btn-lg">Variable'+nVars+'</a>';
    varsMov.innerHTML +='<div id="yes-drop" class="drag-drop"> variable'+ nVars +'</div>';
    nVars++;
  })
  