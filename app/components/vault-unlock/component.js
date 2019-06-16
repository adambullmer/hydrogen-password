import Component from '@ember/component';
const { ipcRenderer } = requireNode('electron');

export default Component.extend({
  password: '',
  unlockErrors: null,

  init() {
    this._super();
    this.set('unlockErrors', []);
  },

  actions: {
    clearErrors () {
      this.set('unlockErrors', []);
    },
    unlockVault () {
      const password = this.get('password');
      this.set('password', '');
      ipcRenderer.send('unlock-vault', password);
      ipcRenderer.once('unlock-vault', (event, error) => {
        if (error === null) {
          this.onUnlock();
          return;
        }

        this.set('unlockErrors', ['Invalid Password']);
        this.$('input[type=password]').blur();
      });
    },
  },
});
