import Component from './../text/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['vault-field--value', 'password', 'layout-row', 'layout-align-start-center'],
  isRevealing: false,

  visibilityIcon: computed('isRevealing', function () {
    return this.get('isRevealing') ? 'visibility_off' : 'visibility';
  }),

  actions: {
    toggleVisibility () {
      this.toggleProperty('isRevealing');
    },
  },
});
