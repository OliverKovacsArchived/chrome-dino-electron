
// loads frameworks
const electron = require("electron");        
const url = require("url");                  
const path = require("path");                
const { app, BrowserWindow, Menu, nativeImage} = electron;

// loads settings, menu, icon, window
let settings = require("./settings.json");
let icon = nativeImage.createFromPath(path.join(__dirname, "favicon.ico"));
let mainMenuTemplate;
let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        icon: icon,
        width: settings.width,
        height: settings.height
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "/app/index.html"),
        protocol: "file:",
        slashes: true
    }));

    if(settings.fullscreen == true) {
        mainWindow.maximize();
    }

    mainWindow.on("closed", () => app.quit());

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
});

mainMenuTemplate = [
    {
        label: "App",
        submenu: [
            {
                label: "Full Screen",
                accelerator: process.platform == "darwin" ? "F11" :
                "F11",
                click: () => mainWindow.maximize()
            },
            {
                label: "Dev Tools",
                accelerator: process.platform == "darwin" ? "F12" :
                "F12",
                click: () => mainWindow.webContents.openDevTools()
            },
            
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" :
                "Ctrl+Q",
                click: () => app.quit()
            }
        ]
    }
]