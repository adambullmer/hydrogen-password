import Route from '@ember/routing/route';

export default Route.extend({
  model (params) {
    return this.store.findRecord('vault/item', params.item_id, { reload: true });
  },
});
