const {
	app,
	BrowserWindow,
	Menu
} = require("electron");
// const shell = require("electron").shell;
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
// const rq = require("electron-require");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
app.disableHardwareAcceleration();

function createWindow() {
	// Create the browser window.
	let w = 600;
	let h = 400;
	if (isDev) {
		w = 900;
		h = 650;
	}
	win = new BrowserWindow({
		icon: path.join(__dirname, "src/assets/images/favicon.png"),
		useContentSize: true,
		backgroundColor: "#000",
		width: w,
		height: h
	});

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, "src/index.html"),
		protocol: "file:",
		slashes: true
	}));

	// Open the DevTools.
	if (isDev) {
		win.webContents.openDevTools();
	}
	// Emitted when the window is closed.
	win.on("close", () => {
		win = null;
	});

	const menu = Menu.buildFromTemplate([{
		label: "Menu",
		submenu: [{
			type: "separator"
		}, {
			label: "Exit",
			click() {
				app.quit();
			}
		}]
	}]);

	Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
