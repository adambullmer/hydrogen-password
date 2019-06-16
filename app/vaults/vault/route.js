import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.findRecord('vault', params.vault_id);
  },
  afterModel (model) {
    if (model.isUnlocked) {
      this.transitionTo('vaults.vault.items')
    }
  },
  renderTemplate () {
    this.render({ outlet: 'sidebar' });
  },
});
