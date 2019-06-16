import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal, not, sort, filterBy } from '@ember/object/computed';

export default Controller.extend({
  queryParams: [{ categoryCode: 'category' }, 'sortBy', 'direction'],

  isTrashed: equal('categoryCode', 'trash'),
  trashedList: filterBy('model', 'isTrashed', true),

  isFavorite: equal('categoryCode', 'favorite'),
  favoriteList: filterBy('defaultModelList', 'isFavorite', true),

  /**
   * Used for initial filtering of models by coarse category code.
   * @example '001'
   * @type {String}
   */
  categoryCode: 'all',
  isAllCategory: equal('categoryCode', 'all'),
  hasCategoryCode: not('isAllCategory'),
  categoryList: computed('defaultModelList.@each.category', 'categoryCode', function () {
    const categoryCode = this.get('categoryCode');
    return this.get('defaultModelList').filter((item) => item.get('category') === categoryCode);
  }),

  defaultModelList: filterBy('model', 'isTrashed', false),

  modelList: computed('defaultModelList.@each', 'categoryList', 'trashedList', 'favoriteList', 'isTrashed', 'isFavorite', 'hasCategoryCode', function () {
    if (this.get('isFavorite')) {
      return this.get('favoriteList');
    } else if (this.get('isTrashed')) {
      return this.get('trashedList');
    } else if (this.get('hasCategoryCode')) {
      return this.get('categoryList');
    }

    return this.get('defaultModelList');
  }),

  /**
   * Used for filtering the remaining list of models by its value.
   * @type {String}
   */
  searchTerm: '',
  filteredList: computed('searchTerm', 'modelList.@each.{title,main}', function () {
    const model = this.get('modelList');
    const searchTerm = this.get('searchTerm').trim().toLowerCase();
    return model.filter((item) => item.title.toLowerCase().includes(searchTerm) || item.info.toLowerCase().includes(searchTerm));
  }),

  /**
   * Used for adding an additional sorting dimension when not null.
   * Should be the stringified name of model properties.
   * @type {String}
   */
  sortBy: null,
  /**
   * Used for determining the model sort direction.
   * @type {String}
   * @enum {['asc', 'desc']}
   */
  direction: 'asc',
  isDescending: equal('direction', 'desc'),
  /**
   * List of default properties to be sorted after the initial sort.
   * @type {[type]}
   */
  defaultSortBy: Object.freeze(['title', 'main']),
  sortTerms: computed('sortBy', 'direction', 'defaultSortBy', function () {
    const { sortBy, direction, defaultSortBy } = this.getProperties(['sortBy', 'direction', 'defaultSortBy']);
    const properties = sortBy === null ? defaultSortBy : [sortBy, ...defaultSortBy];
    return properties.map((property) => `${property}:${direction}`);
  }),
  /**
   * Known Bug: This does not follow "natural sorting" i.e. the numbered items appear first, always.
   */
  sortedList: sort('filteredList', 'sortTerms'),
});
