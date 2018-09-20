'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _ThrottleError = require('./ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseClone(obj, isDeep) {
  var cloned = void 0;
  var es6types = ['[object Set]', '[object WeakSet]', '[object Map]', '[object WeakMap]'];

  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    cloned = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var el = _step.value;

        cloned.push(isDeep ? baseClone(el, true) : el);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else if (es6types.includes(obj.toString())) {
    cloned = new obj.constructor(obj);
  } else {
    cloned = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
            field = _step2$value[0],
            value = _step2$value[1];

        cloned[field] = isDeep ? baseClone(value, true) : value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
  return cloned;
}

/**
 * Check if two arrays intersection exists
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.isIntersection = function (a, b) {
  var c = void 0;
  if (a.length > b.length) {
    c = a;
    a = b;
    b = c;
  }
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(a), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var el = _step3.value;

      if (exports.indexOf(b, el) > -1) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return false;
};

/**
 * Define object size
 *
 * @param   {Object}    obj     Object
 * @return  {number}    Object size
 */
exports.size = function (obj) {
  return (0, _keys2.default)(obj).length;
};

/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */
exports.indexOf = function (arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (exports.isEqual(arr[i], item)) {
      return i;
    }
  }
  return -1;
};

exports.throttle = function (func) {
  var worked = false;
  var nextArguments = void 0;
  var nextResolve = void 0;
  var nextReject = void 0;

  return function () {
    if (typeof arguments[arguments.length - 1] === 'function') {
      return throttleCallback(func).apply(this, arguments);
    } else {
      return throttlePromise(func).apply(this, arguments);
    }
  };

  // it is still used in FormMixin._validateForm so we can't remove it yet
  function throttleCallback(func) {
    return function run() {
      var ctx = this; // Function context
      var cb = arguments[arguments.length - 1];
      var argumentsArray = [].slice.call(arguments);

      if (worked) {
        // Set as the next call
        nextArguments = arguments;
        return;
      }

      worked = true;

      var cbWrapper = function cbWrapper() {
        if (!nextWorker() && typeof cb === 'function') {
          cb.apply(null, arguments);
        }
      };

      if (typeof cb === 'function') {
        argumentsArray[argumentsArray.length - 1] = cbWrapper;
        func.apply(this, argumentsArray.concat(nextWorker));
      } else {
        func.apply(this, argumentsArray.concat(cbWrapper, nextWorker));
      }

      function nextWorker() {
        worked = false;
        if (nextArguments) {
          var args = nextArguments;
          nextArguments = null;
          run.apply(ctx, args);
          return true;
        }
        return false;
      }
    };
  }

  function throttlePromise(func) {
    /**
     * @throws {ThrottleError} Too many function call
     */
    return function run() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var parentStack = exports.getStack(2);

      return new _promise2.default(function (resolve, reject) {
        if (worked) {
          if (nextArguments) {
            nextReject(_ThrottleError2.default.createWithParentStack(parentStack));
          }
          nextArguments = args;
          nextResolve = resolve;
          nextReject = reject;
          return;
        }

        worked = true;

        func.apply(_this, args).then(function (result) {
          worked = false;
          if (nextArguments) {
            nextResolve(run.apply(_this, nextArguments));
            nextArguments = null;

            reject(_ThrottleError2.default.createWithParentStack(parentStack));
            return;
          }
          resolve(result);
        }).catch(function (err) {
          worked = false;
          reject(err);
        });
      });
    };
  }
};

exports.parseValueFromEvent = function (event) {
  if (event && (typeof event === 'undefined' ? 'undefined' : (0, _typeof3.default)(event)) === 'object' && event.target && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(event.target.tagName) >= 0) {
    switch (event.target.type) {
      case 'checkbox':
        return event.target.checked;
    }
    return event.target.value;
  }
  return event;
};

exports.Decorator = function (obj, decor) {
  (0, _assign2.default)(this, decor);

  for (var i in obj) {
    if (typeof obj[i] === 'function' && !decor[i]) {
      this[i] = obj[i].bind(obj);
    }
  }
};

exports.decorate = function (obj, decor) {
  this.Decorator.prototype = obj;
  return new this.Decorator(obj, decor);
};

/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
exports.isEqual = function (a, b) {
  if (a === null || b === null || a === undefined || b === undefined || typeof a === 'function' || typeof b === 'function' || a instanceof RegExp || b instanceof RegExp) {
    return a === b;
  }
  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
    return true;
  }
  if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length) || !((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === 'object')) {
    return false;
  }

  var p = (0, _keys2.default)(a);
  return (0, _keys2.default)(b).every(function (i) {
    return p.indexOf(i) >= 0;
  }) && p.every(function (i) {
    return exports.isEqual(a[i], b[i]);
  });
};

/**
 * Clone object
 *
 * @param obj
 * @returns {*}
 */
exports.clone = function (obj) {
  return baseClone(obj, false);
};

exports.cloneDeep = function (obj) {
  return baseClone(obj, true);
};

exports.isEmpty = function (value) {
  if (!value) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
    return (0, _keys2.default)(value).length === 0;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  return false;
};

exports.isDefined = function (value) {
  return value !== null && value !== undefined;
};

exports.forEach = function (obj, func, ctx) {
  for (var i in obj) {
    func.call(ctx, obj[i], i);
  }
};

exports.pluck = function (arr, field) {
  return arr.map(function (item) {
    return item[field];
  });
};

exports.find = function (arr, func) {
  for (var i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }
  return null;
};

exports.findIndex = function (obj, func) {
  for (var i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }
  return -1;
};

exports.omit = function (obj, predicate) {
  var result = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
          field = _step4$value[0],
          value = _step4$value[1];

      if (typeof predicate === 'string' && predicate !== field || Array.isArray(predicate) && !predicate.includes(field) || typeof predicate === 'function' && !predicate(value, field)) {
        result[field] = value;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return result;
};

exports.escape = function (string) {
  var reUnescaped = /[&<>"'`]/g;
  var escapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;'
  };
  string = '' + (string === null ? '' : string.toString());
  if (string && reUnescaped.test(string)) {
    return string.replace(reUnescaped, function (chr) {
      return escapes[chr];
    });
  }
  return string;
};

exports.zipObject = function (keys, values) {
  var result = {};
  for (var i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
};

exports.pick = function (obj, keys, defaultValue) {
  return keys.reduce(function (result, key) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    } else if (defaultValue !== undefined) {
      result[key] = defaultValue;
    }
    return result;
  }, {});
};

exports.mapKeys = function (object, iteratee) {
  var result = {};

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = (0, _getIterator3.default)((0, _entries2.default)(object)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _step5$value = (0, _slicedToArray3.default)(_step5.value, 2),
          key = _step5$value[0],
          value = _step5$value[1];

      result[iteratee(value, key)] = value;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return result;
};

exports.reduce = function (obj, func, value) {
  for (var i in obj) {
    value = func(value, obj[i], i);
  }
  return value;
};

exports.union = function () {
  var elements = {};

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = (0, _getIterator3.default)(args), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var arg = _step6.value;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = (0, _getIterator3.default)(arg), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var el = _step7.value;

          elements[el] = el;
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return (0, _values2.default)(elements);
};

exports.at = function (obj, keys) {
  var result = [];
  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = (0, _getIterator3.default)(keys), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var key = _step8.value;

      result.push(obj[key]);
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return result;
};

exports.pairs = function (obj) {
  var result = [];
  for (var i in obj) {
    result.push([i, obj[i]]);
  }
  return result;
};

exports.toDate = function (value) {
  var date = void 0;

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (typeof value === 'string') {
    date = new Date(value);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000); // Convert UTC to local time
    return date;
  }

  return new Date(value);
};

exports.without = function (arr, el) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(el) ? exports.indexOf(el, arr[i]) > -1 : exports.isEqual(arr[i], el)) {
      continue;
    }
    result.push(arr[i]);
  }
  return result;
};

exports.last = function (arr) {
  return arr[arr.length - 1];
};

exports.getRecordChanges = function (model, data, changes, newChanges) {
  var result = (0, _assign2.default)({}, changes, newChanges);

  for (var i in result) {
    if (exports.isEqual(data[i], result[i])) {
      delete result[i];
    }
  }

  (0, _assign2.default)(result, exports.pick(data, model.getValidationDependency((0, _keys2.default)(result))));

  return result;
};

exports.getStack = function () {
  var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  // We add here try..catch because in IE Error.stack is available only
  // for thrown errors: https://msdn.microsoft.com/ru-ru/library/windows/apps/hh699850.aspx

  var stack = '';
  var stackTraceLimitDefault = Error.stackTraceLimit;
  Error.stackTraceLimit = deep + 12;
  try {
    throw new Error();
  } catch (e) {
    if (e.stack) {
      // Error.stack is unavailable in old browsers
      stack = e.stack.split('\n').slice(2 + deep) // Here we delete rows 'Error' and 'at getStack(utils.js:427)'
      .join('\n');
    }
  }

  Error.stackTraceLimit = stackTraceLimitDefault;
  return stack;
};

exports.warn = function (message) {
  console.warn(message, '\n', exports.getStack(1));
};

exports.toEncodedString = function (value) {
  return encodeURIComponent(typeof value === 'string' ? value : (0, _stringify2.default)(value));
};

exports.asyncHandler = function (router) {
  return function (req, res, next) {
    var promise = router(req, res, next);
    if (promise && promise.then) {
      return promise.catch(next);
    }
    next(new Error('asyncHandler expected to take async function.'));
  };
};

exports.parents = function (element, selector) {
  var result = [];
  while (element = element.parentElement) {
    if (element.matches(selector)) {
      result.push(element);
    }
  }
  return result;
};