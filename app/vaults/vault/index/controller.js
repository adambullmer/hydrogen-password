import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    unlock () {
      this.transitionToRoute('vaults.vault.items');
    },
  },
});
