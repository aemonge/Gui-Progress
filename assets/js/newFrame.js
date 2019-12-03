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

const btnAnyadirFrame=document.getElementById('btnAnyadirFrame');

btnAnyadirFrame.addEventListener('click',function(){
  var e = document.getElementById("bordeFrame");
  var border = e.options[e.selectedIndex].value;
  e=document.getElementById("etiqueFrame");
  var posic= e.options[e.selectedIndex].value;
  let frameInfo = {
    nombre: document.getElementById('nombreFrame').value,
    borde: border,
    posicion: posic
  }
  ipc.send('frame-information',frameInfo/*document.getElementById('nombreFrame').value*/)
  var window=remote.getCurrentWindow()
  window.close()
})