const {app, BrowserWindow, Menu, dialog, ipcMain} = require("electron");
const fs = require("fs");

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    window.loadURL(`file://${__dirname}/html/index.html`);

    window.on("closed", function () {
        win = null;
    });

    var menu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                {
                    label: "New"
                },
                {
                    label: "Open",
                    click() {
                        dialog.showOpenDialog({
                            properties: ["openFile"]
                        }, function (filepath) {
                            fs.readFile(filepath[0], "utf-8", function (err, data) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                window.webContents.on("did-finish-load", function () {
                                    window.webContents.send("print-file", data.toString());
                                });
                            });
                        });
                    }
                },
                {
                    label: "Exit",
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: "Development",
            submenu: [
                {
                    label: "Open DevTools",
                    click() {
                        window.webContents.openDevTools();
                    }
                }
            ]
        }
    ]);
    window.setMenu(menu);
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