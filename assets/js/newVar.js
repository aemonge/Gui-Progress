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

const btnAnyadirVar=document.getElementById('btnAnyadirVar');

btnAnyadirVar.addEventListener('click',function(){
  var e = document.getElementById("tipoVar");
  var tipo = e.options[e.selectedIndex].value;
  let varInfo = {
    name: document.getElementById('nombreVariable').value,
    type: tipo,
    label: document.getElementById('labelVariable').value,
    initial: document.getElementById('valorInicial').value,
    format:document.getElementById('formato').value
  }
  ipc.send('var-information',varInfo)
  var window=remote.getCurrentWindow()
  window.close()
})