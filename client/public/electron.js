import { app, BrowserWindow } from 'electron'
import isDev from'electron-is-dev'
import path from 'path'
import * as main from "@electron/remote/main/index.js"


main.initialize();


function createWindow() {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		},
	});

	win.webContents.openDevTools();
	// win.fullScreen = true; 

	win.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);

	win.removeMenu();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});