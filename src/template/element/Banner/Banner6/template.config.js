import component from './index';

import less from '!raw-loader!./index.less';
import templateStr from '!raw-loader!./index';
import data from './data'

export default {
  component,
  templateStr,
  less,
  dataSource: data
};
