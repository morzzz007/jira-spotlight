'use strict';

const electron = require('electron');
const path = require('path');
const url = require('url');

const assetsDirectory = path.join(__dirname, 'assets');
const app = electron.app;
app.dock.hide();

const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;

let mainWindow;

function createWindow() {
  const mouseDisplay = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint());

  mainWindow = new BrowserWindow({
    x: mouseDisplay.bounds.x + mouseDisplay.workAreaSize.width / 2 - 800 / 2,
    y: mouseDisplay.bounds.y + mouseDisplay.workAreaSize.height / 2 - 600 / 2,
    width: 800,
    height: 600,
    frame: false
  });
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
}

function createTray() {
  const tray = new Tray(path.join(assetsDirectory, 'doge.png'));
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', function(event) {
    toggleWindow();
  });

  const contextMenu = new Menu();
  contextMenu.append(
    new MenuItem({
      label: 'Show/Hide',
      click: function() {
        toggleWindow();
      }
    })
  );
  contextMenu.append(new MenuItem({ type: 'separator' }));
  contextMenu.append(
    new MenuItem({
      label: 'Ok, bye!',
      click: function() {
        app.quit();
      }
    })
  );

  tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
  createWindow();
  createTray();
  globalShortcut.register('CommandOrControl+Shift+j', () => {
    toggleWindow();
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

const showWindow = () => {
  const mouseDisplay = electron.screen.getDisplayNearestPoint(electron.screen.getCursorScreenPoint());

  mainWindow.setPosition(
    parseInt(mouseDisplay.bounds.x + mouseDisplay.workAreaSize.width / 2 - 800 / 2),
    parseInt(mouseDisplay.bounds.y + mouseDisplay.workAreaSize.height / 2 - 600 / 2)
  );
  mainWindow.show();
  mainWindow.focus();
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};