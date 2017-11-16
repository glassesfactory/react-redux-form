import fieldActions from './field-actions';
import modelActions from './model-actions';
import batch from './batch-actions';

const actions = Object.assign({},
  fieldActions,
  modelActions,
,
  {batch}
);

export default actions;
