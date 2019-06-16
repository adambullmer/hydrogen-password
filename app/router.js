import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('onboarding');
  this.route('settings');
  this.route('vaults', function() {
    this.route('vault', { path: '/:vault_id' }, function() {
      this.route('change-password');
      this.route('items', function() {
        this.route('item', { path: '/:item_id' });
      });
      this.route('items-loading');
    });
    this.route('new');
    this.route('add');
  });
});

export default Router;
