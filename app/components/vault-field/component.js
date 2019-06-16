import Component from '@ember/component';
import { computed } from '@ember/object';

/**
 * k: field type (string, concealed, email, URL, date, monthYear, gender, phone, address)
 * n: lowercased, underscored, normalized, name
 * t: title
 * v: original value
 */

export default Component.extend({
  classNames: ['vault-field'],
  isEditing: false,

  fieldType: computed('model.k', function () {
    switch (this.get('model.k')) {
      case 'string':
        return 'text';
      case 'concealed':
        if (this.get('model.n').startsWith('TOTP_')) {
          return 'otp';
        }
        return 'password';
      case 'email':
        return 'email';
      case 'URL':
        return 'url';
      case 'address':
        return 'address';
      case 'date':
        return 'date';
      default:
        console.warn(`Unidentified field type '${this.get('model.k')}'`);
        return 'text';
    }
  }),
});
