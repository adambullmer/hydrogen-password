import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate () {
    this.render({ into: 'vaults' });
  },
});
