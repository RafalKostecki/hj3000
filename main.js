const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 900, height: 450});

  // and load the index.html of the sources.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './src/main.jade'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  let menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label: 'Create boards'},
        {label: 'Set boards'},
        {type: 'separator'},
        {
          label: 'Web page',
          click() {
            shell.openExternal('http://poyters.pl');
          }
        },
        {label: 'Exit'}
      ]
    },
    {
      label: 'Help',
      submenu: [
        {label: 'Settings'},
        {label: 'How to create board'},
        {label: 'How to add board'}
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
