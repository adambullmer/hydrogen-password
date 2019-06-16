import Component from './../text/component';
import { inject as service } from '@ember/service'
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
const jsotp = requireNode('jsotp');

export default Component.extend({
  classNames: ['vault-field--value', 'otp', 'layout-row', 'layout-align-space-between-center'],
  clipboardValue: alias('token'),
  clock: service('totp-clock'),

  timeLeft: computed('clock.time', function () {
    const time = this.get('clock.time');

    return 30 - (new Date(time).getSeconds() % 30);
  }),
  token: computed('model', 'clock.time', function () {
    const model = this.get('model');
    const totp = jsotp.TOTP(model.split('?')[1].split('&').find((item) => item.startsWith('secret')).split('=')[1]);

    return totp.now();
  }),
  displayToken: computed('token', function () {
    const left = this.get('token').substr(0, 3);
    const right = this.get('token').substr(3, 3);
    return [left, right];
  }),
});
