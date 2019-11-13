const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow

("#crearFrame").addEventListener('click', () => {
    createNewFrame();
  });
  
  function createNewFrame(){
    newFrame=new BrowserWindow({
      width: 400,
      height: 330
    
    });
    
    newFrame.loadURL(`file://${__dirname}/newFrame.html`);
  }