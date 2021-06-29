const {ipcRenderer} = require("electron");

ipcRenderer.on("print-file", function (event, data) {
    document.getElementById("textarea").innerHTML = data;
});