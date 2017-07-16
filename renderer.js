const ipc = require('electron').ipcRenderer
// const BrowserWindow = require('electron').BrowserWindow

const selectPagesDirBtn = document.getElementById('pages_file_button')

selectPagesDirBtn.addEventListener('click', function(evt){
  console.log('pages button clicked')
  ipc.send('open-file-dialog-sheet')
})

ipc.on('selected-directory', function(evt, path){
  console.log("path: " + path)
  document.getElementById('pages_folder').value = path
})
