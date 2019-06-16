import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vaults/vault/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:vaults/vault/index');
    assert.ok(route);
  });
});
