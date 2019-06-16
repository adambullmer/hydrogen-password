const { ipcMain } = require('electron');
const path = require('path');
const Keychain = require('1password');

module.exports = class HydrogenPassword {
  constructor (settings) {
    this.settings = settings;
    this.vaults = {};

    this.settings.findRecord('vaults').forEach((vault) => {
      this.vaults[vault.uuid] = new Keychain();
      this.vaults[vault.uuid].load(vault.keychainPath, (error) => {
        if (error) {
          console.error(error);
          return;
        }

        Object.keys(this.vaults[vault.uuid].items).forEach((itemId) => {
          this.vaults[vault.uuid].items[itemId].vaultId = vault.uuid;
        });
      });
    });

    const lastVault = this.settings.findRecord('currentVault');
    if (lastVault !== null) {
      this.vault = this.vaults[lastVault];
    }

    ipcMain.on('unlock-vault', this.unlockVault.bind(this));
    ipcMain.on('lock-vault', this.lockVault.bind(this));
    ipcMain.on('add-vault', this.addVault.bind(this));
    ipcMain.on('renderer:vaults/findRecord', (event, replyName, vaultId) => {
      this.switchVault(vaultId).then((vault) => {
        event.sender.send(replyName, { vault });
      }, () => {
        event.sender.send(replyName, null);
      });
    });
    ipcMain.on('renderer:vaults/findAll', (event, replyName) => {
      setTimeout(() => {
        const vaults = this.listVaults();

        event.sender.send(replyName, { vaults });
      }, 1);
    });

    ipcMain.on('renderer:vault/items/query', (event, replyName) => {
      console.log('Hydrogen Password: renderer:vault/items/query');
      setTimeout(() => {
        const items = Object.values(this.vault.items);

        event.sender.send(replyName, { 'vault/items': items });
      }, 1);
    });
    ipcMain.on('renderer:vault/items/findRecord', (event, replyName, uuid) => {
      console.log('Hydrogen Password: renderer:vault/items/findRecord ', uuid);
      const item = this.vault.getItem(uuid).unlock();

      event.sender.send(replyName, { 'vault/item': item });
    });
    ipcMain.on('find-items', (event, search) => {
      console.log('Hydrogen Password: find-items ', search);
      event.sender.send('find-items', this.vault.findItems(search));
    });
  }

  listVaults () {
    return Object.values(this.vaults);
  }

  addVault (event, vaultPath) {
    const newVault = new Keychain();
    const vaults = this.settings.findRecord('vaults');

    new Promise((resolve, reject) => {
      newVault.load(path.resolve(vaultPath), (error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve();
        }
      });
    }).then(() => {
      const { uuid, keychainPath } = newVault;
      this.vaults[uuid] = newVault;

      vaults.push({ uuid, keychainPath });
      this.settings.updateRecord('vaults', vaults);

      if (vaults.length === 1) {
        this.switchVault(uuid);
      }

      event.sender.send('add-vault', newVault);
    });
  }

  switchVault (vaultId) {
    return new Promise((resolve, reject) => {
      const vault = this.vaults[vaultId];
      if (vault === undefined) {
        reject(new Error('Missing Vault'));
        return;
      }

      this.vault = vault;
      this.settings.updateRecord('currentVault', vault.uuid);
      resolve(vault);
    });
  }

  lockVault (event) {
    console.log('Hydrogen Password: Locking Vault');
    this.vault.lock();
    event.sender.send('lock');
  }

  unlockVault (event, password) {
    console.log('Hydrogen Password: Unlocking Vault');
    this.vault.unlock(password);

    if (this.vault.unlocked) {
      event.sender.send('unlock-vault', null);
      // Add binding for locking the vault.
      // Might have a client registration method instead of registering here
      // This handles multiple windows on the same vault instance
      // Also, this currenly doesn't fire when locking
      // hydrogenPassword.event.on('lock:before', () => {
      //   console.log('Hydrogen Password: Event: Locking Vault');
      //   event.sender.send('lock');
      // });
    } else {
      console.log('Hydrogen Password: Invalid Password');
      event.sender.send('unlock-vault', { code: 'invalid-password' });
    }
  }
}
