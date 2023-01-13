const electron = require("electron");
const path = require('path');
const isDev = require('electron-is-dev');

const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const isMac = process.platform === 'darwin'

let mainWindow;
let childWindow;

const MenuTemplate = [
  {
    label: "File",
    submenu: [
      { label: "New Admin", accelerator: "CmdOrCtrl+D" },
      { type: 'separator' },
      {
        label: "Backup/Restore",
        click: () => {
          childWindow = new BrowserWindow({ height: 200, width: 400, parent: mainWindow, show: false, maximizable: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
          childWindow.setMenu(null);
          isDev ?
            childWindow.loadURL('http://localhost:3000/#/backupandrestore') :
            childWindow.loadFile(`${path.join(__dirname, 'index.html')}`, { hash: '/backupandrestore' });
          childWindow.show();
        }
      },
      { label: "Reset Password" },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Create/Update Customer",
        accelerator: "CmdOrCtrl+U",
        click: () => {
          childWindow = new BrowserWindow({ height: 550, width: 800, parent: mainWindow, show: false, maximizable: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
          childWindow.setMenu(null);
          isDev ?
            childWindow.loadURL('http://localhost:3000/#/customer') :
            childWindow.loadFile(`${path.join(__dirname, 'index.html')}`, { hash: '/customer' });
          childWindow.show()
        }
      },
      {
        label: "Create/Update Job",
        accelerator: "CmdOrCtrl+J",
        click: () => {
          childWindow = new BrowserWindow({ parent: mainWindow, show: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
          childWindow.setMenu(null);
          isDev ?
            childWindow.loadURL('http://localhost:3000/#/measurement') :
            childWindow.loadFile(`${path.join(__dirname, 'index.html')}`, { hash: '/measurement' });
          childWindow.maximize();
          childWindow.show();
        }
      },
      { type: 'separator' },
      {
        label: "Change Price",
        accelerator: "CmdOrCtrl+M",
        click: () => {
          childWindow = new BrowserWindow({ height: 500, width: 400, parent: mainWindow, maximizable: false, show: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
          childWindow.setMenu(null);
          isDev ?
            childWindow.loadURL('http://localhost:3000/#/price/') :
            childWindow.loadFile(`${path.join(__dirname, 'index.html')}`, { hash: '/price' });
          childWindow.show();
        }
      },
      { type: 'separator' },
      { label: "Salary", accelerator: "CmdOrCtrl+T", enabled: false },
      { label: "Payment", accelerator: "CmdOrCtrl+I", enabled: false }
    ]
  },
  {
    label: "Help",
    submenu: [
      { label: "Toggle Developer Tools", role: 'toggleDevTools' },
      { role: 'reload' },
      { type: 'separator' },
      {
        label: 'Electron Documentation',
        click: async () => {
          await electron.shell.openExternal('https://www.electronjs.org/docs/latest');
        },
      },
      { type: 'separator' },
      { label: "ChangeTheme", accelerator: "CmdOrCtrl+T" },
      { label: "Ckeck for Updates" },
      {
        label: "About",
        click: async () => {
          await electron.shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(MenuTemplate);

module.exports = {
  menu,
  mainWindow,
  childWindow
}