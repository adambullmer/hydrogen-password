import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import DS from 'ember-data';

import EventNameMixin from '../mixins/event-name';
const { ipcRenderer } = requireNode('electron');

export default DS.Adapter.extend(EventNameMixin, {
  _ipc: ipcRenderer,
  defaultSerializer: 'ipc',

  /**
   * Called by the store in order to fetch the JSON for a given
   * type and ID.
   * The `findRecord` method makes an IPC call with an event name computed
   * by `buildEventName`, and returns a promise for the resulting event
   * reply.
   * This method performs the IPC call id provided as part of the event
   * arg.
   * @method findRecord
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {String} id
   * @param {DS.Snapshot} snapshot
   * @return {Promise} promise
   */
  findRecord (store, type, id, snapshot) {
    const eventName = this.buildEventName(type.modelName, id, snapshot, 'findRecord');
    const replyEventName = this.provisionReplyEventName(eventName);

    return new Promise((resolve, reject) => {
      this._ipc.once(replyEventName, this.replyHandler(resolve, reject));
      this._ipc.send(eventName, replyEventName, id);
    });
  },

  /**
   * Called by the store in order to fetch a JSON array for all
   * of the records for a given type.
   * The `findAll` method makes an IPC call with an event name computed
   * by `buildEventName`, and returns a promise for the resulting event
   * reply.
   * @private
   * @method findAll
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {String} sinceToken
   * @return {Promise} promise
   */
  findAll (store, type/*, sinceToken*/) {
    const eventName = this.buildEventName(type.modelName, null, null, 'findAll');
    const replyEventName = this.provisionReplyEventName(eventName);

    return new Promise((resolve, reject) => {
      this._ipc.once(replyEventName, this.replyHandler(resolve, reject));
      this._ipc.send(eventName, replyEventName);
    });
  },

  /**
   * Called by the store in order to fetch a JSON array for
   * the records that match a particular query.
   * The `query` method makes an IPC call to a URL computed by `buildEventName`, and returns a
   * promise for the resulting event reply.
   * The `query` argument is a simple JavaScript object that will be
   * passed as the event arg.
   * @private
   * @method query
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {Object} query
   * @return {Promise} promise
   */
  query (store, type, query) {
    const eventName = this.buildEventName(type.modelName, query, null, 'query');
    const replyEventName = this.provisionReplyEventName(eventName);

    return new Promise((resolve, reject) => {
      this._ipc.once(replyEventName, this.replyHandler(resolve, reject));
      this._ipc.send(eventName, replyEventName, JSON.stringify(query));
    });
  },

  /**
   * Called by the store in order to fetch several records together if `coalesceFindRequests` is true
   * For example, if the original payload looks like:
   * ```js
   * {
   *   "id": 1,
   *   "title": "Electron thing",
   *   "comments": [ 1, 2, 3 ]
   * }
   * ```
   * The IDs will be passed as an array of IDs, in this form:
   * ```
   * {ids: [1, 2, 3]}
   * ```
   * The `findMany` method makes an IPC call with an event name
   * computed by `buildEventName`, and returns a promise for the
   * resulting event reply.
   * @method findMany
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {Array} ids
   * @param {Array} snapshots
   * @return {Promise} promise
   */
  findMany (/*store, type, ids, snapshots*/) {
    throw new Error("findMany is not yet supported");
  },

  /**
   * Called by the store when a new record is created by the
   * `createRecord` method on the store. This serializes the record and
   * makes an IPC call with an event computed by `buildEventName`.
   * See `serialize` for information on how to customize the serialized form
   * of a record.
   * @method createRecord
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {DS.Snapshot} snapshot
   * @return {Promise} promise
   */
  createRecord (store, type, snapshot) {
    console.log('createRecord', snapshot);
    const data = {};
    const serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot);

    const eventName = this.buildEventName(type.modelName, snapshot.id, snapshot, 'createRecord');
    const replyEventName = this.provisionReplyEventName(eventName);

    return new Promise((resolve, reject) => {
      this._ipc.once(replyEventName, this.replyHandler(resolve, reject));
      this._ipc.send(eventName, replyEventName, JSON.stringify(data));
    });
  },

  /**
   * Called by the store when an existing record is saved
   * via the `save` method on a model record instance.
   * The `updateRecord` method serializes the record and makes an IPC
   * call with an event computed by `buildEventName`.
   * See `serialize` for information on how to customize the serialized form
   * of a record.
   * @method updateRecord
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {DS.Snapshot} snapshot
   * @return {Promise} promise
   */
  updateRecord (store, type, snapshot) {
    const data = {};
    const serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot);

    const eventName = this.buildEventName(type.modelName, snapshot.id, snapshot, 'updateRecord');
    const replyEventName = this.provisionReplyEventName(eventName);

    return new Promise((resolve, reject) => {
      this._ipc.once(replyEventName, this.replyHandler(resolve, reject));
      this._ipc.send(eventName, replyEventName, JSON.stringify({
        id: snapshot.id,
        data: data
      }));
    });
  },

  /**
   * Called by the store when a record is deleted.
   * The `deleteRecord` method  makes an IPC call with an event computed by `buildEventName`.
   * @method deleteRecord
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param {DS.Snapshot} snapshot
   * @return {Promise} promise
   */
  deleteRecord (store, type, snapshot) {
    const eventName = this.buildEventName(type.modelName, snapshot.id, snapshot, 'deleteRecord');
    const replyEventName = this.provisionReplyEventName(eventName);

    return new Promise((resolve, reject) => {
      this._ipc.once(replyEventName, this.replyHandler(resolve, reject));
      this._ipc.send(eventName, replyEventName, snapshot.id);
    });
  },

  replyHandler (resolve/*, reject*/) {
    return function (event, result) {
      // debugger;
      // if (err) {
      //   run(null, reject, err);
      // } else {
      // }
      run(null, resolve, result ? result : null);
    };
  }

});
