// Adapted from https://gist.github.com/bruce/19ae12205cab026dd2a8

import Mixin from '@ember/object/mixin';
import { camelize } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default Mixin.create({
  eventNamePrefix: 'renderer',
  eventReplySuffix: 'reply',
  componentSeparator: ':',
  eventReplyCounter: 0,

  buildEventName (typeKey, id, snapshot, requestType) {
    switch (requestType) {
      case 'findRecord':
        return this.eventNameForFindRecord(id, typeKey, snapshot);
      case 'findAll':
        return this.eventNameForFindAll(typeKey);
      case 'query':
        return this.eventNameForQuery(id, typeKey);
      case 'findMany':
        return this.eventNameForFindMany(id, typeKey, snapshot);
      case 'createRecord':
        return this.eventNameForCreateRecord(typeKey, snapshot);
      case 'updateRecord':
        return this.eventNameForUpdateRecord(id, typeKey, snapshot);
      case 'deleteRecord':
        return this.eventNameForDeleteRecord(id, typeKey, snapshot);
      default:
        throw new Error('Cannot build event name for ' + requestType);
    }
  },

  provisionReplyEventName (eventName) {
    this.incrementProperty('eventReplyCounter');
    return [eventName, this.get('eventReplySuffix'), this.get('eventReplyCounter')].join(this.get('componentSeparator'));
  },

  /**
   @method _buildEventName
   @private
   @param {String} typeKey
   @param {String} operation
   @return {String} eventName
   */
  _buildEventName (typeKey, operation) {
    const prefix = this.get('eventNamePrefix');
    let eventName = [];
    let path;

    if (typeKey) {
      path = this.pathForType(typeKey);
      if (path) {
        eventName.push(path);
      }
    }
    eventName.push(operation);
    eventName = eventName.join('/');

    if (prefix) {
      return prefix + this.get('componentSeparator') + eventName;
    }

    return eventName;
  },

  /**
   * @method eventNameForFind
   * @param {String} id
   * @param {String} typeKey
   * @param {DS.Snapshot} snapshot
   * @return {String} eventName
   */
  eventNameForFindRecord (id, typeKey/*, _snapshot*/) {
    return this._buildEventName(typeKey, 'findRecord');
  },

  /**
   * @method eventNameForFindAll
   * @param {String} typeKey
   * @return {String} eventName
   */
  eventNameForFindAll (typeKey) {
    return this._buildEventName(typeKey, 'findAll');
  },

  /**
   * @method eventNameForQuery
   * @param {Object} query
   * @param {String} typeKey
   * @return {String} eventName
   */
  eventNameForQuery (id, typeKey/*, _snapshot*/) {
    return this._buildEventName(typeKey, 'query');
  },

  /**
   * @method eventNameForFindMany
   * @param {Array} ids
   * @param {String} type
   * @param {Array} snapshots
   * @return {String} eventName
   */
  eventNameForFindMany (id, typeKey/*, _snapshot*/) {
    return this._buildEventName(typeKey, 'findMany');
  },

  /**
   * @method eventNameForCreateRecord
   * @param {String} typeKey
   * @param {DS.Snapshot} snapshot
   * @return {String} eventName
   */
  eventNameForCreateRecord (id, typeKey/*, _snapshot*/) {
    return this._buildEventName(typeKey, 'createRecord');
  },

  /**
   * @method eventNameForUpdateRecord
   * @param {String} id
   * @param {String} typeKey
   * @param {DS.Snapshot} snapshot
   * @return {String} eventName
   */
  eventNameForUpdateRecord (id, typeKey/*, _snapshot*/) {
    return this._buildEventName(typeKey, 'updateRecord');
  },

  /**
   * @method eventNameForDeleteRecord
   * @param {String} id
   * @param {String} typeKey
   * @param {DS.Snapshot} snapshot
   * @return {String} eventName
   */
  eventNameForDeleteRecord (id, typeKey/*, _snapshot*/) {
    return this._buildEventName(typeKey, 'deleteRecord');
  },

  pathForType (typeKey) {
    const camelized = camelize(typeKey);
    return pluralize(camelized);
  }

});
