import { helper } from '@ember/component/helper';

export function json([obj]/*, hash*/) {
  return '<pre>' + JSON.stringify(obj, null, 4) + '</pre>';
}

export default helper(json);
