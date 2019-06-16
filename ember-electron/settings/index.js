const { ipcMain } = require('electron');
const settings = require('electron-settings');
const version = 1;

module.exports = class Settings {
  constructor () {
    const hasVersion = settings.has('version');

    if (hasVersion === false || settings.get('version') !== version) {
      this.initSettings();
    }

    ipcMain.on('renderer:settings/findAll', (event, ...params) => {
      event.sender.send('renderer:settings/findAll', this.findAll(...params));
    });
    ipcMain.on('renderer:settings/findRecord', (event, ...params) => {
      event.sender.send('renderer:settings/findRecord', this.findRecord(...params));
    });
    ipcMain.on('renderer:settings/createRecord', (event, ...params) => {
      event.sender.send('renderer:settings/createRecord', this.updateRecord(...params));
    });
    ipcMain.on('renderer:settings/updateRecord', (event, ...params) => {
      event.sender.send('renderer:settings/updateRecord', this.updateRecord(...params));
    });
  }

  initSettings () {
    settings.setAll({
      version,
      vaults: [],
      currentVault: null,
      window: {
        width: 785,
        height: 545,
      },
    });
  }

  findAll () {
    return settings.getAll();
  }

  findRecord (name) {
    return settings.get(name) || null;
  }

  updateRecord (name, value) {
    return settings.set(name, value);
  }
}
