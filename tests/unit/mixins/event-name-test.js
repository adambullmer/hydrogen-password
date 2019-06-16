import EmberObject from '@ember/object';
import EventNameMixin from 'hydrogen-password/mixins/event-name';
import { module, test } from 'qunit';

module('Unit | Mixin | event-name', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let EventNameObject = EmberObject.extend(EventNameMixin);
    let subject = EventNameObject.create();
    assert.ok(subject);
  });
});
