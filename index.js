'use strict';
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const {exec} = require('child_process');

ipcMain.on('discover', (event, arg) => {
	exec('node ./magichome/discover.js', (error, stdout, stderr) => {
		let x = JSON.parse(stdout);
		event.sender.send('logDiscovery', x);
		console.log(x);
	});
});

ipcMain.on('lighton', (event, arg) => {
	console.log(arg);
	new Promise((resolve, reject) => {
		let qs = queryState(arg);
		if (qs !== undefined) {
			resolve(qs);
		}
	}).then((result) => {
		console.log(result)
		if (result.on) {
			exec(`node ./magichome/turnoff.js ${arg}`, (error, stdout, stderr) => {
			
			});
		} else {
			exec(`node ./magichome/turnon.js ${arg}`, (error, stdout, stderr) => {
			
			});
		}
	});
})

function queryState(addr) {
	return new Promise((resolve, reject) => {
		exec(`node ./magichome/queryState.js ${addr}`, (error, stdout, stderr) => {
			resolve(JSON.parse(stdout));
		});
	});
}

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		maxWidth: 800,
		maxHeight: 600,
		backgroundColor: '#080f1f',
		icon: path.join(__dirname, 'dist/images/light-icon-rb.ico'),
	});

	const menuTemplate = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Save Profile',
					click() {
						app.quit();
					}
				},
				{
					label: 'Settings',
					click() {
						console.log('settings');
					}
				}
			]
		}
	];

	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
	//win.setMenu(menu);
	//win.setMenu(null);
	win.loadURL(`file://${__dirname}/dist/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
