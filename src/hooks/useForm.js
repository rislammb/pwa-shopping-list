import { useState } from 'react';
import { deepClone } from '../utils';

const useForm = (initial, validate) => {
  const [state, setState] = useState(mapObjectToState(initial));

  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);

    oldState[name].focused = true;

    setState(oldState);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);

    oldState[name].focused = false;
    oldState[name].touched = true;
    const { errors } = validate(mapStateToValue(oldState));
    if (errors[name] && oldState[name].touched) {
      oldState[name].error = errors[name];
    }

    setState(oldState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const oldState = deepClone(state);

    oldState[name].error = '';
    oldState[name].value = value;

    const { errors } = validate(mapStateToValue(oldState));
    if (errors[name] && oldState[name].touched) {
      oldState[name].error = errors[name];
    }

    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const oldState = deepClone(state);

    const values = mapStateToValue(oldState);
    const { valid, errors } = validate(values);

    if (!valid) {
      Object.keys(errors).forEach((key) => {
        oldState[key].touched = true;
        oldState[key].error = errors[key];
      });

      setState(oldState);
    } else {
      cb(values);
    }
  };

  const handleAfterSubmit = (errors) => {
    if (errors && Object.keys(errors).length > 0) {
      const oldState = deepClone(state);

      Object.keys(errors).forEach((key) => {
        oldState[key].error = errors[key];
      });

      setState(oldState);
    } else {
      setState(mapObjectToState(initial));
    }
  };

  return {
    state,
    handleFocus,
    handleBlur,
    handleChange,
    handleSubmit,
    handleAfterSubmit,
  };
};

export default useForm;

const mapObjectToState = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = {
      name: cur,
      value: obj[cur],
      touched: false,
      focused: false,
      error: '',
    };

    return acc;
  }, {});
};

const mapStateToValue = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = obj[cur].value;

    return acc;
  }, {});
};
