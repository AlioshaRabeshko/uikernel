"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ValidationErrors =
/*#__PURE__*/
function () {
  /**
   * Field errors control manager
   * @constructor
   */
  function ValidationErrors() {
    (0, _classCallCheck2.default)(this, ValidationErrors);
    this._fields = new Map();
  }
  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {{:string[]}}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */


  (0, _createClass2.default)(ValidationErrors, [{
    key: "add",

    /**
     * Add an error
     *
     * @param {string}                  field       Field name
     * @param {string|{string message}} error       Error text
     * @return {ValidationErrors}
     */
    value: function add(field, error) {
      error = this._formErrorValue(error);

      if (!this._fields.has(field)) {
        this._fields.set(field, [error]);

        return this;
      }

      var fieldErrors = this._fields.get(field);

      if (!fieldErrors.includes(error)) {
        fieldErrors.push(error);
      }

      return this;
    }
    /**
     * Field has error flag
     *
     * @param   {string}      field     Field name
     * @returns {boolean}
     */

  }, {
    key: "hasError",
    value: function hasError(field) {
      return this._fields.has(field);
    }
    /**
     * Get field errors
     *
     * @param   {string}      field     Field name
     * @returns {Array|null}  Errors array or null
     */

  }, {
    key: "getFieldErrors",
    value: function getFieldErrors(field) {
      return this._fields.get(field) || null;
    }
    /**
     * Get field errors message
     *
     * @param   {string}      field     Field name
     * @returns {Array|null}  Errors array or null
     */

  }, {
    key: "getFieldErrorMessages",
    value: function getFieldErrorMessages(field) {
      var fieldErrors = this._fields.get(field);

      if (fieldErrors) {
        return fieldErrors.map(function (error) {
          return error.message;
        });
      }

      return null;
    }
    /**
     * Get field names array, that contain errors
     *
     * @returns {string[]|null}
     */

  }, {
    key: "getFailedFields",
    value: function getFailedFields() {
      var fields = (0, _toConsumableArray2.default)(this._fields.keys());
      return fields.length ? fields : null;
    }
    /**
     * Errors absence check
     *
     * @returns {boolean} Errors presence
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._fields.size === 0;
    }
    /**
     * Clear specific field errors
     *
     * @param   {string}  field  Field name
     * @returns {ValidationErrors}
     */

  }, {
    key: "clearField",
    value: function clearField(field) {
      this._fields.delete(field);

      return this;
    }
    /**
     * Clear errors list
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._fields = new Map();
      return this;
    }
    /**
     * Convert errors to JSON
     *
     * @return {{[string]: Array<string>}}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          json[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return json;
    }
    /**
     * Clone object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "clone",
    value: function clone() {
      return ValidationErrors.createFromJSON(this.toJSON());
    }
    /**
     * Merge object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "merge",
    value: function merge(validationErrors) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = validationErrors.getErrors()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _errors;

          var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
              field = _step2$value[0],
              newErrors = _step2$value[1];

          var errors = this._fields.get(field);

          if (!errors) {
            errors = [];

            this._fields.set(field, errors);
          }

          (_errors = errors).push.apply(_errors, (0, _toConsumableArray2.default)(newErrors));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
    /**
     * Get errors iterator
     *
     * @return {[string, string[]][]}
     */

  }, {
    key: "getErrors",
    value: function getErrors() {
      return this._fields;
    }
  }, {
    key: "_formErrorValue",
    value: function _formErrorValue(error) {
      if (typeof error === 'string') {
        return {
          message: error
        };
      }

      if (!error.message) {
        throw new Error('Invalid error value. Error must be string or object with "message" property.');
      }

      return error;
    }
  }], [{
    key: "createFromJSON",
    value: function createFromJSON(jsonObject) {
      var validationErrors = new ValidationErrors();

      var _arr = Object.entries(jsonObject);

      var _loop = function _loop() {
        var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
            key = _arr$_i[0],
            value = _arr$_i[1];

        value.forEach(function (errMessage) {
          return validationErrors.add(key, errMessage);
        });
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
      }

      return validationErrors;
    }
    /**
     * Create ValidationErrors object with one error
     *
     * @param {string}                  field
     * @param {string|{error: string}}  error
     * @return {ValidationErrors}
     */

  }, {
    key: "createWithError",
    value: function createWithError(field, error) {
      var validationErrors = new ValidationErrors();
      validationErrors.add(field, error);
      return validationErrors;
    }
  }]);
  return ValidationErrors;
}();

(0, _defineProperty2.default)(ValidationErrors, "merge", function () {
  var jsonErrors = [{}];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i2 = 0; _i2 < args.length; _i2++) {
    var arg = args[_i2];
    jsonErrors.push(arg.toJSON());
  } // TODO Need deep merge


  return ValidationErrors.createFromJSON(Object.assign.apply(Object, jsonErrors));
});
var _default = ValidationErrors;
exports.default = _default;
module.exports = exports.default;