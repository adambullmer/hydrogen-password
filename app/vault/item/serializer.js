import IpcSerializer from '../../ipc/serializer';

export default IpcSerializer.extend({
  normalize (typeClass, hash) {
    hash.isFavorite = Boolean(hash.fave);
    hash.isTrashed = hash.trashed;
    hash.createdAt = hash.created;
    hash.updatedAt = hash.updated;

    delete hash.fave;
    delete hash.trashed;
    delete hash.created;
    delete hash.updated;

    if (hash.overview) {
      hash.title = hash.overview.title;
      hash.url = hash.overview.url;
      hash.info = hash.overview.ainfo;

      delete hash.overview.title;
      delete hash.overview.url;
      delete hash.overview.ainfo;
    }

    return this._super(...arguments);
  },

  // normalizeResponse (store, primaryModelClass, payload, id, requestType) {
  //   debugger;

  //   return this._super(...arguments);
  // },

  // normalizeSingleResponse (store, primaryModelClass, payload, id, requestType) {
  //   debugger;

  //   return this._super(...arguments);
  // },

  // normalizeArrayResponse (store, primaryModelClass, payload, id, requestType) {
  //   debugger;

  //   return this._super(...arguments);
  // },
  // normalizeFindRecordResponse (store, primaryModelClass, payload, id, requestType) {
  //   debugger;

  //   return this._super(...arguments);
  // },
});
