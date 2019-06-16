import DS from 'ember-data';

export default DS.Model.extend({
  // uuid: DS.attr('string'),
  title: DS.attr('string',{ defaultValue: '' }),
  info: DS.attr('string', { defaultValue: '' }),
  url: DS.attr('string', { defaultValue: '' }),
  category: DS.attr('string'),
  isFavorite: DS.attr('boolean', { defaultValue: false }),
  isTrashed: DS.attr('boolean', { defaultValue: false }),
  overview: DS.attr(),
  details: DS.attr(),
  createdAt: DS.attr('unix-timestamp'),
  updatedAt: DS.attr('unix-timestamp'),
});
