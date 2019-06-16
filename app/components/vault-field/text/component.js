import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed'

export default Component.extend({
  tagName: 'h3',
  classNames: ['vault-field--value', 'layout-row', 'layout-align-space-between-center'],
  clipboard: service('clipboard'),
  clipboardValue: alias('model'),

  actions: {
    copy () {
      this.get('clipboard').copy(this.get('clipboardValue'));
    },
  },
});
