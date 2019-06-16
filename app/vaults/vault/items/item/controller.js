import Controller from '@ember/controller';
import { computed } from '@ember/object';
// import { sort } from '@ember/object/computed';

const fieldTypeMap = {
  'E': 'email',
  'P': 'concealed',
  'T': 'string',
};

export default Controller.extend({
  isEditing: false,

  primaryFields: computed('model.details.fields.@each', function () {
    const fields = this.get('model.details.fields');
    if (!fields) {
      return [];
    }

    return fields.map((field) => {
      if (!['username', 'password'].includes(field.designation)) {
        return null;
      }

      const displayField = {
        k: fieldTypeMap[field.type] || field.k || 'string',
        t: field.designation || field.t || '',
        v: field.value || field.v || '',
        n: field.name || field.n || '',
      };

      return displayField;
    }).filter((item) => item);
  }),
  userFields: computed('model.details.sections.@each', function () {
    return this.get('model.details.sections');
  }),
  actions: {
    fieldUpdate: () => {},
  },
});
