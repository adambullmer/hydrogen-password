import Service from '@ember/service';
import { run } from '@ember/runloop'
import { computed, observer } from '@ember/object';

export default Service.extend({
  interval: 1000,

  time: null,
  date: computed('time', function() {
    return new Date(this.get('time'));
  }),

  init() {
    this._super(...arguments);
    this.start();
  },

  start() {
    this.update();
    this.set('intervalId', window.setInterval(() => this.update(), this.get('interval')));
  },

  stop() {
    window.clearInterval(this.get('intervalId'));
  },

  willDestroy() {
    this._super(...arguments);
    this.stop();
  },

  onIntervalChange: observer('interval', function() {
    this.stop();
    this.start();
  }),

  update() {
    run(() => this.set('time', Date.now()));
  }
});
