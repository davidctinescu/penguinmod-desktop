const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, '../app/images/512.png')
    });

    mainWindow.loadFile(path.join(__dirname, '../app/editor.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.maximize();
}

app.whenReady().then(() => {
    createWindow();

    globalShortcut.register('Control+Q', () => {
        app.quit();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
