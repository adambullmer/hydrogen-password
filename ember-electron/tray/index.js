const { app, Menu, Tray } = require('electron');

module.exports = class HydrogenTray {
  constructor (mainWindow, settings, vault) {
    this.tray = new Tray(__dirname + '/../resources/2x/baseline_lock_white_24dp.png');
    this.settings = settings;
    this.vault = vault;
    this.mainWindow = mainWindow;

    mainWindow.createWindow();

    const menu = Menu.buildFromTemplate([
      { label: 'Open Hydrogen Password', click: () => {
        if (this.mainWindow.isOpen) {
          this.mainWindow.show();
        } else {
          this.mainWindow.createWindow();
        }
      }},
      { label: 'Lock Vault', click: () => { this.vault.lockVault() } },
      { type: 'separator' },
      { label: 'Quit Hydrogen Password', role: 'quit', click: () => { app.quit() } },
    ]);

    this.tray.setToolTip('Hydrogen Password');
    this.tray.setContextMenu(menu);
  }
}
