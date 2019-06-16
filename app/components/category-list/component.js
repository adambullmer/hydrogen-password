import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  sections: Object.freeze([
    {
      header: '',
      categories: [
        { code: 'all', name: 'All', icon: 'brightness_auto' },
        { code: 'favorite', name: 'Favorites', icon: 'star' },
      ]
    },
    {
      header: 'Categories',
      categories: [
        { code: '001', name: 'Login', icon: 'ballot' },
        { code: '002', name: 'Credit Card', icon: 'credit_card' },
        { code: '003', name: 'Secure Note', icon: 'note' },
        { code: '004', name: 'Identity', icon: 'assignment_ind' },
        { code: '005', name: 'Password', icon: 'vpn_key' },
        // { code: '099', name: 'Tombstone', icon: 'delete_forever' },
        { code: '100', name: 'Software License', icon: 'card_membership' },
        { code: '101', name: 'Bank Account', icon: 'account_balance' },
        { code: '102', name: 'Database', icon: 'storage' },
        { code: '103', name: 'Driver License', icon: 'directions_car' },
        { code: '104', name: 'Outdoor License', icon: 'image' },
        { code: '105', name: 'Membership', icon: 'business_center' },
        { code: '106', name: 'Passport', icon: 'book' },
        { code: '107', name: 'Reward Program', icon: 'card_giftcard' },
        { code: '108', name: 'SSN', icon: 'contacts' },
        { code: '109', name: 'Wireless Router', icon: 'router' },
        { code: '110', name: 'Server', icon: 'dns' },
        { code: '111', name: 'Email Account', icon: 'email' },
      ],
    },
    {
      header: '',
      categories: [
        { code: 'trash', name: 'Trash', icon: 'delete' },
      ]
    },
  ]),

  counts: computed('model.items.@each.{category,isFavorite,isTrashed}', function () {
    const items = this.get('model.items');
    const counts = { all: [0], favorite: [0], trash: [0] };

    items.forEach((item) => {
      if (item.isTrashed) {
        counts.trash[0]++;
        return;
      }

      if (item.isFavorite) {
        counts.favorite[0]++;
      }

      counts.all[0]++;

      if (counts[item.category] === undefined) {
        counts[item.category] = [0];
      }

      counts[item.category][0]++;
    });

    return counts;
  }),
});
