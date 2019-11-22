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
  ipc.send('var-information',document.getElementById('nombreVariable').value)
  var window=remote.getCurrentWindow()
  window.close()
})