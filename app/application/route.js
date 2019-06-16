import { hash } from 'rsvp';
import Route from '@ember/routing/route';
const { ipcRenderer } = requireNode('electron');

export default Route.extend({
  model () {
    return hash({
      vaults: this.store.findAll('vault'),
      current: new Promise((resolve) => {
        ipcRenderer.send('renderer:settings/findRecord', 'currentVault');
        ipcRenderer.once('renderer:settings/findRecord', (event, current) => {
          resolve(current);
        });
      })
    });
  },

  afterModel (hash) {
    if (hash.vaults.length === 0) {
      this.transitionTo('onboarding');
      return;
    }

    if (hash.current !== null) {
      this.transitionTo('vaults.vault', hash.current);
      return;
    }
  },
});
