const {app, BrowserWindow} = require("electron");

let bwindow;

async function createWindow() {
    bwindow = new BrowserWindow({
        useContentSize: true,
        resizable: false,
    });
    await bwindow.loadFile("index.html");
}

app.on("ready", createWindow);
