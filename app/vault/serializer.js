import DS from 'ember-data';
import IpcSerializer from '../ipc/serializer';

export default IpcSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    items: {
      serialize: false,
      deserialize: 'ids'
    }
  },

  normalize (typeClass, hash) {
    hash.isUnlocked = hash.unlocked;
    delete hash.unlocked;

    return this._super(...arguments);
  },

  // normalizeResponse (store, primaryModelClass, payload, id, requestType) {
  //   debugger;

  //   return this._super(...arguments);
  // },

  normalizeSingleResponse (store, primaryModelClass, payload, id, requestType) {
    // move data into sideloaded format
    payload['vault/items'] = Object.values(payload.vault.items)
    payload.vault.items = Object.keys(payload.vault.items);

    return this._super(...arguments);
  },

  normalizeArrayResponse (store, primaryModelClass, payload, id, requestType) {
    // move data into sideloaded format
    payload['vault/items'] = {};
    payload.vaults.forEach((vault) => {
      payload['vault/items'] = Object.assign(payload['vault/items'], vault.items);
      vault.items = Object.keys(vault.items);
    });
    payload['vault/items'] = Object.values(payload['vault/items']);

    return this._super(...arguments);
  },
  // normalizeFindRecordResponse (store, primaryModelClass, payload, id, requestType) {
  //   debugger;

  //   return this._super(...arguments);
  // },
});
