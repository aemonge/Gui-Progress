'use strict'

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')

const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow



/*ventana crear Frame*/

let newFrame=document.getElementById('crearFrame');
let winnewFrame=null
newFrame.addEventListener('click', () => {
    createNewFrame();
  });
  
  function createNewFrame(){
    winnewFrame=new BrowserWindow({ width: 400, height: 330});
    winnewFrame.loadURL(`file://${__dirname}/newFrame.html`);
    winnewFrame.on('close',function(){winnewFrame=null});
    //winnewFrame.show();
    winnewFrame.once('ready-to-show', () => {
      winnewFrame.setMenu(null)
      winnewFrame.show()
    })
  }
