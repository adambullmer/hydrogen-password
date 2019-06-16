import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vaults/vault/items/item', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:vaults/vault/items/item');
    assert.ok(route);
  });
});
