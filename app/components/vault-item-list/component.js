import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['flex'],

  // placeholders for passing along query params in routes
  category: null,

  listHeadings: computed('model.@each', function () {
    const model = this.get('model');
    const response = {};

    model.forEach((item) => {
      const { title } = item;
      if (title === undefined) {
        return;
      }

      const letter = title.substr(0, 1);
      if (response[letter] === undefined) {
        response[letter] = [];
      }

      response[letter].push(item);
    });

    return [].concat(...Object.keys(response).map((letter) => [{ header: true, letter}, ...response[letter]])).concat({ header: true, letter: ''});
  }),
});
