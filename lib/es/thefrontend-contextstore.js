function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { createContext, useState, useMemo, useContext } from 'react';

var makeStore = function makeStore() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var context = createContext();

  var Provider = function Provider(_ref) {
    var _ref$initialState = _ref.initialState,
        initialState = _ref$initialState === void 0 ? {} : _ref$initialState,
        children = _ref.children;

    var _useState = useState(_objectSpread({}, initialValue, {}, initialState)),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var contextValue = useMemo(function () {
      return [state, setState];
    }, [state]);
    return React.createElement(context.Provider, {
      value: contextValue
    }, children);
  };

  var useStore = function useStore() {
    var _useContext = useContext(context),
        _useContext2 = _slicedToArray(_useContext, 2),
        state = _useContext2[0],
        setState = _useContext2[1];

    return {
      state: state,
      setState: setState
    };
  };

  return {
    Provider: Provider,
    useStore: useStore
  };
};

export default makeStore;