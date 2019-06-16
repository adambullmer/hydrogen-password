import { helper } from '@ember/component/helper';

export function favicon([url]/*, hash*/) {
  const parser = document.createElement('a');
  parser.href = url;
  return parser.origin + '/favicon.ico';
}

export default helper(favicon);
