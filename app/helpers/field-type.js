import { helper } from '@ember/component/helper';

export function fieldDesignationType([model]/*, hash*/) {
  switch (model.k) {
    case 'string':
      return 'text';
    case 'concealed':
      return model.n.startsWith('TOTP_') ? 'otp' : 'password';
    case 'email':
      return 'email';
    case 'URL':
      return 'url';
    case 'address':
      return 'address';
    case 'date':
      return 'date';
    default:
      console.warn(`Unidentified field type '${model.k}'`);
      return 'text';
  }
}

export default helper(fieldDesignationType);
