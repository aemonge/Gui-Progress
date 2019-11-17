'use strict'

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')
window.frames["../../src/frame.html"]

const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const remote=electron.remote
const ipc=electron.ipcRenderer



/*ventana crear Frame*/

let winnewFrame=null
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
    frames.innerHTML +='<div id="yes-drop" class="drag-drop"> #yes-drop </div>';
  })
  