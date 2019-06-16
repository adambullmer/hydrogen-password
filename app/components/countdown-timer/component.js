import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['countdown-timer', 'layout-row', 'layout-align-center-center'],
  diameter: 30,
  max: 60,
  current: 60,
  percent: computed('current', 'max', function () {
    return this.get('current') / this.get('max') * 100;
  }),
  shouldWarn: computed('percent', function () {
    return this.get('percent') < 25;
  }),
});
