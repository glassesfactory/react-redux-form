import modeled from '../enhancers/modeled-enhancer';
import modelReducer from './model-reducer';
import formReducer from './form-reducer';
import { combineReducers } from 'redux';
import identity from '../utils/identity';

import NULL_ACTION from '../constants/null-action';

const defaults = {
  key: 'forms',
  plugins: [],
};

function getSubModelString(model, subModel) {
  if (!model) return subModel;

  return `${model}.${subModel}`;
}

const defaultStrategy = {
  modelReducer,
  formReducer,
  modeled,
  toJS: identity,
};

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function createFormCombiner(strategy = defaultStrategy) {
  function createForms(forms, model = '', options = {}) {
    const formKeys = Object.keys(forms);
    const modelReducers = {};
    const initialFormState = {};
    const optionsWithDefaults = Object.assign({},
      defaults,
      options
    );
    const {
      key,
      plugins
    } = optionsWithDefaults;
    const formOptions = _objectWithoutProperties(optionsWithDefaults, ["key", "plugins"]);

    formKeys.forEach((formKey) => {
      const formValue = forms[formKey];
      const subModel = getSubModelString(model, formKey);

      if (typeof formValue === 'function') {
        let initialState;
        try {
          initialState = formValue(undefined, NULL_ACTION);
        } catch (error) {
          initialState = null;
        }

        modelReducers[formKey] = strategy.modeled(formValue, subModel);
        initialFormState[formKey] = initialState;
      } else {
        modelReducers[formKey] = strategy.modelReducer(subModel, formValue);
        initialFormState[formKey] = strategy.toJS(formValue);
      }
    });

    return Object.assign({},
      modelReducers,
      {
        [key]: (state, action) => strategy.formReducer(model, initialFormState, Object.assign({}, {
          plugins},
          formOptions,
        ))(state, action)
      })
    }

    function combineForms(forms, model = '', options = {}) {
      const mappedReducers = createForms(forms, model, options);

      return combineReducers(mappedReducers);
    }

  return {
    createForms,
    combineForms,
  };
}

const {
  combineForms: defaultCombineForms,
  createForms: defaultCreateForms,
} = createFormCombiner();

export default defaultCombineForms;
export {
  createFormCombiner,
  defaultCreateForms as createForms,
};
