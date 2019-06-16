import { helper } from '@ember/component/helper';
const moment = requireNode('moment');

export function dateFormat([date]/*, hash*/) {
  return moment(date, 'X').format('MMM DD, YYYY [at] HH:mm A');
}

export default helper(dateFormat);
