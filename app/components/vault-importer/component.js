import Component from '@ember/component';
const { ipcRenderer, remote } = requireNode('electron');

export default Component.extend({
  vaultPath: '',

  actions: {
    openDialog () {
      remote.dialog.showOpenDialog({
        title: 'Select Vault File',
        properties: ["openDirectory"]
      }, (path) => {
        ipcRenderer.send('add-vault', path[0]);
        ipcRenderer.once('add-vault', (event, vault) => {
          this.vaultAdded(vault);
        });
      });
    },
  }
});
