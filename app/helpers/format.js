import { helper as buildHelper } from '@ember/component/helper';

export function format(params, hash) {
  if(!params[0]) { return; }
  if(!hash.type) { throw new Error('a format type is required.'); }
  switch(hash.type) {
    case 'date':
      return params[0].format('YYYY-MM-DD');
    case 'percent':
      return params[0].toString().substring(0, 4) + '%';
  }
}

export default buildHelper(format);
