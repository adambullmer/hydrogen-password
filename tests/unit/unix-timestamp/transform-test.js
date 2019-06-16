import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:unix-timestamp', 'Unit | Transform | unix timestamp', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:unix-timestamp');
    assert.ok(transform);
  });
});
