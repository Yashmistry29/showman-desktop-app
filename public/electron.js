const electron = require("electron");
const path = require('path');
const isDev = require('electron-is-dev');
let { mainWindow, childWindow } = require('./components');
const { menu } = require('./components');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

const createWindow = () => {
  childWindow = new BrowserWindow({ height: 500, width: 400, show: false, parent: mainWindow, maximizable: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });

  isDev ?
    childWindow.loadURL('http://localhost:3000/') :
    childWindow.loadFile(`${path.join(__dirname, 'index.html')}`);

  childWindow.setMenu(null);
  childWindow.show();

  childWindow.on('closed', () => {
    childWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  childWindow = null;
  mainWindow = null;
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('Authenticated', (e, args) => {
  e.preventDefault();
  if (args) {
    childWindow.close();
    mainWindow = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
    mainWindow.setMenu(menu);
    isDev ?
      mainWindow.loadURL('http://localhost:3000/#/dashboard') :
      mainWindow.loadFile(`${path.join(__dirname, 'index.html')}`, { hash: '/dashboard' });
    mainWindow.maximize();
    mainWindow.show();
  }
});

ipcMain.on('jobDetails', (e, data) => {
  e.preventDefault();
  // console.log(data.CustomerData, data.jobData);
  childWindow = new BrowserWindow({ height: 600, width: 900, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
  // childWindow.setMenu(null);
  isDev ?
    childWindow.loadURL('http://localhost:3000/#/print') :
    childWindow.loadFile(`${path.join(__dirname, 'index.html')}`, { hash: '/print' });
  childWindow.webContents.on('did-finish-load', () => {
    childWindow.webContents.send('GenerateJobDetails', (data))
  })
  childWindow.maximize();
  childWindow.show();
})

ipcMain.handle('Restore', (e) => {
  e.preventDefault();
  var restoreResult = dialog.showOpenDialogSync({
    title: 'Open File ...',
    filters: [
      { name: 'Zip Files', extensions: ['zip'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
  console.log(restoreResult);
  return restoreResult;
})
