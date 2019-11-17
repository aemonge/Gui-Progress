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
  ipc.send('frame-information',document.getElementById('nombreFrame').value)
  var window=remote.getCurrentWindow()
  window.close()
})