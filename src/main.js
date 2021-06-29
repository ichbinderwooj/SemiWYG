const {app, BrowserWindow} = require("electron");

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 800
    });

    window.loadURL(`file://${__dirname}/html/index.html`);

    // debug
    // window.webContents.openDevTools();

    window.on("closed", function () {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (win === "null") {
        createWindow();
    }
});