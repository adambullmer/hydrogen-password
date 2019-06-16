import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.store.query('vault/item', { vaultId: this.paramsFor('vaults.vault').vault_id });
  },
  renderTemplate () {
    this.render({ into: 'vaults' });
  },
});
