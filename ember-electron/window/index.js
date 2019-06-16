const { BrowserWindow } = require('electron');

module.exports = class HydrogenApp {
  constructor (settings) {
    this.settings = settings;
    this.window = null;
  }

  createWindow () {
    const mainWindow = new BrowserWindow({
      // frame: false,
      width: this.settings.width,
      height: this.settings.height,
      backgroundColor: '#CCCCCC',
      show: false,
      icon: __dirname + '/../resources/icon_512.png',
    });

    this.window = mainWindow;

    // If you want to open up dev tools programmatically, call
    // mainWindow.openDevTools();

    const emberAppLocation = 'serve://dist';

    // Load the ember application using our custom protocol/scheme
    this.window.loadURL(emberAppLocation);

    // If a loading operation goes wrong, we'll send Electron back to
    // Ember App entry point
    this.window.webContents.on('did-fail-load', () => {
      this.window.loadURL(emberAppLocation);
    });

    this.window.webContents.on('crashed', () => {
      console.log('Your Ember app (or other code) in the main window has crashed.');
      console.log('This is a serious issue that needs to be handled and/or debugged.');
    });

    this.window.on('unresponsive', () => {
      console.log('Your Ember app (or other code) has made the window unresponsive.');
    });

    this.window.on('responsive', () => {
      console.log('The main window has become responsive again.');
    });

    this.window.on('closed', () => {
      this.window = null;
    });

    this.window.once('ready-to-show', () => {
      this.window.show();
    });
  }

  get isOpen () {
    return this.window !== null;
  }

  show () {
    this.window.show();
  }
}
