import Controller from '@ember/controller';
const { ipcRenderer } = requireNode('electron');

export default Controller.extend({
  isSidenavOpen: false,
  actions: {
    lockVault() {
      ipcRenderer.send('lock-vault');
    },
  },
});
