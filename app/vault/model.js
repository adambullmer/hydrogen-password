import DS from 'ember-data';

export default DS.Model.extend({
  // uuid: DS.attr('string'),
  keychainPath: DS.attr('string'),
  isUnlocked: DS.attr('boolean'),
  items: DS.hasMany('vault/item'),
});
