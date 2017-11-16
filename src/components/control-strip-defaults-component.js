import React, { Component } from 'react';
import PropTypes from 'prop-types';
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// Prevents the defaultValue/defaultChecked fields from rendering with value/checked
class ComponentWrapper extends Component {
  render() {
    /* eslint-disable no-unused-vars */
    const {
      defaultValue,
      defaultChecked,
      component,
      getRef
    } = this.props;
    /* eslint-enable */
    const otherProps = _objectWithoutProperties(this.props, ["defaultValue",
      "defaultChecked",
      "component",
      "getRef"])

    if (getRef) {
      otherProps.ref = getRef;
    }
    const WrappedComponent = component;
    return <WrappedComponent {...otherProps} />;
  }
}
ComponentWrapper.propTypes = {
  component: PropTypes.any,
  defaultValue: PropTypes.any,
  defaultChecked: PropTypes.any,
  getRef: PropTypes.func,
};
export default ComponentWrapper;
