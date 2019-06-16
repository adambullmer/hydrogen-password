import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addVault (vault) {
      this.transitionToRoute('vaults.vault', vault.uuid);
    },
  },
});
