import Controller from '@ember/controller';
const { ipcRenderer } = requireNode('electron');

export default Controller.extend({
  init () {
    this._super();

    ipcRenderer.on('lock', () => {
      this.transitionToRoute('vaults.vault', this.model.current);
    });
  },
});
