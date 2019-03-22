import { helper } from '@ember/component/helper';

export function includes([a, b]) {
  console.log(`${JSON.stringify(a)}.includes(${b}) => ${a.includes(b)}`);
  return a.includes(b);
}

export default helper(includes);
