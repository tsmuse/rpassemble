const electron = require('electron')
// Module to control application life.
const app = electron.app

const Menu = electron.Menu
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// set up menu on macOS... I have no idea what this will look like on Win10 yet
let template = [{
  label: 'Edit',
  submenu: [{
    label: 'Cut',
    accelerator: 'CmdorCtrl+X',
    role: 'cut'
  },
  {
    label: 'Copy',
    accelerator: 'CmdorCtrl+C',
    role: 'copy'
  },
  {
    label: 'Paste',
    accelerator: 'CmdorCtrl+V',
    role: 'paste'
  }]
}]

if (process.platform === 'darwin'){
  const name = electron.app.getName()
  template.unshift({
    label: name, //NOTE: this won't actually change the name. Needs to be changed after packaging!
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      label: 'Services',
      role: 'services',
      submenu: []
    },
    {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    },
    {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    },
    {
      label: 'Show All',
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })
}

//open file dialog
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog-sheet', function(event){
  const window = BrowserWindow.fromWebContents(event.sender)
  const files = dialog.showOpenDialog(window, {properties: ['openDirectory',]}, function (files){
    if (files) event.sender.send('selected-directory', files)
  })
})

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 780, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('ready', function(){
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
