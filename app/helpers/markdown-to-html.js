import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
/* global marked */

export function markdownToHtml(params/*, hash*/) {
  return htmlSafe(marked(params[0]));
}

export default buildHelper(markdownToHtml);
