import DS from 'ember-data';
const moment = requireNode('moment');

export default DS.Transform.extend({
  deserialize(serialized) {
    return moment(serialized, 'X');
  },

  serialize(deserialized) {
    return deserialized.format('X');
  }
});
