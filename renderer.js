const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').BrowserWindow

const selectPagesDirBtn = document.getElementById('pages_file_button')

selectPagesDirBtn.addEventListener('click', function(evt){
  ipc.send('open-file-dialog')
})

ipc.on('selected-directory', function(evt, path){
  document.getElementById(pages_folder).value = path
})
