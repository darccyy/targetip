const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 630,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    icon: path.join(__dirname, "icon.png"),
    // frame: false,
    // backgroundColor: "#0008",
  });
  win.setMenuBarVisibility(false)
  // win.setMenu(null);
  // win.maximize();
  // win.setFullScreen(true);

  win.loadFile("index.html");
  win.once("ready-to-show", () => {
    win.show()
  })
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});