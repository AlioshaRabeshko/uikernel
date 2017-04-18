/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Events = require('../common/Events');

var _Events2 = _interopRequireDefault(_Events);

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _common = require('../common/validation/Validator/common');

var _common2 = _interopRequireDefault(_common);

var _ValidationErrors = require('../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _ThrottleError = require('../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FormService = function () {
  function FormService() {
    (0, _classCallCheck3.default)(this, FormService);

    this._data = null;
    this._changes = null;
    this._errors = new _ValidationErrors2.default();
    this._warnings = new _ValidationErrors2.default();
    this._globalError = null;
    this._warningsValidator = null;
    this._eventEmitter = new _Events2.default();
    this._isNotInitialized = true;
    this.validateForm = _utils2.default.throttle(this.validateForm.bind(this));
    this._onModelChange = this._onModelChange.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
    this.clearError = this.clearError.bind(this);
    this.updateField = this.updateField.bind(this);
    this._getData = this._getData.bind(this);
    this._getChanges = this._getChanges.bind(this);
  }

  /**
   * Initialize form
   *
   * @param {Object}            settings                                Configuration
   * @param {Array}             settings.fields                         Fields list, that are required to display
   * @param {FormModel}         settings.model                          Model of form
   * @param {Object}            [settings.data]                         Preset data
   * @param {Object}            [settings.changes                       Preset changes
   * @param {bool}              [settings.submitAll=false]              Send all form for validity check
   * @param {bool}              [settings._partialErrorChecking=false]   Activate partial gradual form validation
   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
   * @param {Validator}         [settings.warningsValidator]            Warningss validator for fields
   */


  (0, _createClass3.default)(FormService, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(settings) {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (settings.model) {
                  _context.next = 2;
                  break;
                }

                throw Error('You must specify the model form in this.init()');

              case 2:

                this._data = settings.data || null;
                this._changes = settings.changes || {};
                this.showDependentFields = settings.showDependentFields || false;
                this._partialErrorChecking = settings._partialErrorChecking; // Current mode
                this._partialErrorCheckingDefault = settings._partialErrorChecking; // Default mode
                this.model = settings.model; // FormModel
                this.fields = settings.fields;
                this.submitAll = settings.submitAll;
                this._warningsValidator = settings.warningsValidator || new _common2.default();

                this.validating = false;
                this.pendingClearErrors = [];
                this.submitting = false;
                this._isNotInitialized = false;

                if (this._data) {
                  _context.next = 29;
                  break;
                }

                data = void 0;
                _context.prev = 17;
                _context.next = 20;
                return (0, _toPromise2.default)(settings.model.getData.bind(settings.model))(settings.fields);

              case 20:
                data = _context.sent;
                _context.next = 28;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context['catch'](17);

                this._globalError = _context.t0;
                this._setState();
                return _context.abrupt('return');

              case 28:
                this._data = data;

              case 29:

                this.model.on('update', this._onModelChange);
                this._setState();

                _context.prev = 31;
                _context.next = 34;
                return this.validateForm();

              case 34:
                _context.next = 40;
                break;

              case 36:
                _context.prev = 36;
                _context.t1 = _context['catch'](31);

                if (_context.t1 instanceof _ThrottleError2.default) {
                  _context.next = 40;
                  break;
                }

                throw _context.t1;

              case 40:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[17, 23], [31, 36]]);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'getAll',
    value: function getAll() {
      var isLoaded = this._isLoaded();

      if (!isLoaded) {
        return {
          isLoaded: isLoaded,
          data: {},
          originalData: {},
          changes: {},
          errors: new _ValidationErrors2.default(),
          globalError: null,
          isSubmitting: false
        };
      }

      return {
        isLoaded: isLoaded,
        data: this._getData(),
        originalData: this._data,
        changes: this._getChangesFields(),
        errors: this._getValidationErrors(),
        globalError: this._globalError,
        isSubmitting: this.isSubmitting
      };
    }

    /**
     * Update form value. Is used as the Editors onSubmit handler.
     * Causes component redraw.
     *
     * @param {string|string[]}  fields  Parameters
     * @param {*}                values   Event or data
     */

  }, {
    key: 'updateField',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(fields, values) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:

                values = _utils2.default.parseValueFromEvent(values);

                if (!Array.isArray(fields)) {
                  fields = [fields];
                  values = [values];
                }
                _context2.next = 6;
                return this.set(_utils2.default.zipObject(fields, values));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateField(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return updateField;
    }()
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(func) {
      this._eventEmitter.on('update', func);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(func) {
      this._eventEmitter.off('update', func);
      if (this._eventEmitter.listenerCount('update') === 0 && !this._isNotInitialized) {
        this.model.off('update', this._onModelChange);
      }
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      this._eventEmitter.removeAllListeners('update');
      this.model.off('update', this._onModelChange);
    }
  }, {
    key: 'clearError',
    value: function clearError(field) {
      var _this = this;

      if (this._isNotInitialized) {
        return;
      }

      if (this.validating) {
        this.pendingClearErrors.push(field);
      }

      if (Array.isArray(field)) {
        field.forEach(function (oneField) {
          _this._errors.clearField(oneField);
          _this._warnings.clearField(oneField);
        });
      } else {
        this._errors.clearField(field);
        this._warnings.clearField(field);
      }

      this._setState();
    }
  }, {
    key: 'validateField',
    value: function validateField(fields, values) {
      this.updateField(fields, values);
      try {
        this.validateForm();
      } catch (e) {
        if (!(e instanceof _ThrottleError2.default)) {
          throw e;
        }
      }
    }

    /**
     * Set data in the form
     *
     * @param {Object}    data              Data
     * @param {bool}      [validate=false]  Validate form
     */

  }, {
    key: 'set',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data, validate) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._isLoaded()) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:

                this._changes = _utils2.default.getRecordChanges(this.model, this._data, this._changes, data);

                this._setState();

                if (!validate) {
                  _context3.next = 14;
                  break;
                }

                _context3.prev = 5;
                _context3.next = 8;
                return this.validateForm();

              case 8:
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](5);

                if (_context3.t0 instanceof _ThrottleError2.default) {
                  _context3.next = 14;
                  break;
                }

                throw _context3.t0;

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 10]]);
      }));

      function set(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: 'submitData',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                _context4.next = 4;
                return this.set(data);

              case 4:
                _context4.next = 6;
                return this.submit();

              case 6:
                return _context4.abrupt('return', _context4.sent);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function submitData(_x6) {
        return _ref4.apply(this, arguments);
      }

      return submitData;
    }()

    /**
     * Send form data to the model
     *
     */

  }, {
    key: 'submit',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var _this2 = this;

        var changes, data, err, newChanges, actualChanges, validationError;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                if (!this.isSubmitting) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt('return');

              case 4:

                this.isSubmitting = true;

                changes = this._getChanges();


                this._globalError = null;
                this._partialErrorChecking = false;

                this._setState();

                // Send changes to model
                data = void 0;
                err = void 0;
                _context5.prev = 11;
                _context5.next = 14;
                return this.model.submit(changes);

              case 14:
                data = _context5.sent;
                _context5.next = 20;
                break;

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5['catch'](11);

                err = _context5.t0;

              case 20:

                this.isSubmitting = false;

                newChanges = this._getChanges();
                actualChanges = _utils2.default.isEqual(changes, newChanges);
                validationError = err instanceof _ValidationErrors2.default;
                // Replacing empty error to null

                if (validationError && err.isEmpty()) {
                  err = null;
                }

                if (err) {
                  if (validationError) {
                    if (actualChanges) {
                      this._errors = err;
                    }
                  } else {
                    this._globalError = err;
                  }
                } else if (actualChanges) {
                  this._errors = new _ValidationErrors2.default();
                  this._changes = {};
                } else {
                  _utils2.default.forEach(changes, function (value, field) {
                    if (_utils2.default.isEqual(value, newChanges[field])) {
                      delete _this2._changes[field];
                    }
                  });
                }

                this._setState();

                if (!err) {
                  _context5.next = 29;
                  break;
                }

                throw err;

              case 29:
                return _context5.abrupt('return', data);

              case 30:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[11, 17]]);
      }));

      function submit() {
        return _ref5.apply(this, arguments);
      }

      return submit;
    }()
  }, {
    key: 'clearFieldChanges',
    value: function clearFieldChanges(field) {
      if (this._isNotInitialized) {
        return;
      }

      this._errors.clearField(field);
      this._warnings.clearField(field);
      delete this._changes[field];
      this._setState();
    }
  }, {
    key: 'clearChanges',
    value: function clearChanges() {
      if (this._isNotInitialized) {
        return;
      }

      this._errors.clear();
      this._warnings.clear();
      this._changes = {};
      this._globalError = false;
      this._partialErrorChecking = this._partialErrorCheckingDefault;
      this._setState();
    }
  }, {
    key: 'setPartialErrorChecking',
    value: function setPartialErrorChecking(value) {
      this._partialErrorChecking = value;
      this._setState();
    }
  }, {
    key: 'getPartialErrorChecking',
    value: function getPartialErrorChecking() {
      return {
        _partialErrorChecking: this._partialErrorChecking,
        _partialErrorCheckingDefault: this._partialErrorCheckingDefault
      };
    }
  }, {
    key: 'validateForm',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var field, errorsWithPartialChecking;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return');

              case 2:

                this.validating = true;
                this._globalError = null;

                _context6.next = 6;
                return _promise2.default.all([this._runValidator(this.model, this._getChanges, '_errors'), this._runValidator(this._warningsValidator, this._getData, '_warnings')]);

              case 6:

                this.validating = false;

                field = void 0;

                while (field = this.pendingClearErrors.pop()) {
                  this._warnings.clearField(field);
                  this._errors.clearField(field);
                }

                this._setState();

                errorsWithPartialChecking = this._getValidationErrors();

                if (errorsWithPartialChecking.isEmpty()) {
                  _context6.next = 13;
                  break;
                }

                return _context6.abrupt('return', errorsWithPartialChecking);

              case 13:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function validateForm() {
        return _ref6.apply(this, arguments);
      }

      return validateForm;
    }()

    /**
     * Check is data loaded
     *
     * @returns {boolean}
     */

  }, {
    key: '_isLoaded',
    value: function _isLoaded() {
      return this && Boolean(this._data || this._globalError);
    }

    /**
     * Get form changes
     *
     * @return {{}}
     */

  }, {
    key: '_getChangesFields',
    value: function _getChangesFields() {
      // TODO _getChanges
      var changes = {};
      for (var field in this._changes) {
        if (!this._isDependentField(field)) {
          changes[field] = this._changes[field];
        }
      }
      return changes;
    }

    /**
     * Get form errors
     *
     * @returns {ValidationErrors} Form errors
     */

  }, {
    key: '_getValidationErrors',
    value: function _getValidationErrors() {
      var errors = _ValidationErrors2.default.merge(this._errors, this._warnings);

      // If gradual validation is on, we need
      // to remove unchanged records from errors object
      if (!this._partialErrorChecking) {
        return errors;
      }

      // Look through all form fields
      for (var field in this._data) {
        // If field is unchanged, remove errors, that regard to this field
        if (!this._changes.hasOwnProperty(field)) {
          errors.clearField(field);
        }
      }

      return errors;
    }
  }, {
    key: '_setState',
    value: function _setState() {
      this._eventEmitter.trigger('update', this.getAll());
    }

    /**
     * Model records changes handler
     *
     * @param {Object} changes  Changes
     * @private
     */

  }, {
    key: '_onModelChange',
    value: function _onModelChange(changes) {
      this._data = (0, _extends3.default)({}, this._data, changes);
      this._setState();
    }
  }, {
    key: '_getData',
    value: function _getData() {
      return (0, _assign2.default)({}, this._data, this._changes);
    }
  }, {
    key: '_getChanges',
    value: function _getChanges() {
      // Send all data or just changed fields in addiction of form configuration
      if (this.submitAll) {
        return this._getData();
      }
      return this._changes;
    }
  }, {
    key: '_isDependentField',
    value: function _isDependentField(field) {
      return this._changes.hasOwnProperty(field) && _utils2.default.isEqual(this._changes[field], this._data[field]);
    }
  }, {
    key: '_runValidator',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(validator, getData, output) {
        var data, validErrors, err;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                data = getData();
                validErrors = void 0;
                err = void 0;
                _context7.prev = 3;
                _context7.next = 6;
                return validator.isValidRecord(data);

              case 6:
                validErrors = _context7.sent;
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7['catch'](3);

                err = _context7.t0;

              case 12:
                if (_utils2.default.isEqual(data, getData())) {
                  _context7.next = 14;
                  break;
                }

                return _context7.abrupt('return');

              case 14:

                if (err) {
                  this[output].clear();
                } else {
                  this[output] = validErrors;
                }

                if (err) {
                  this._globalError = err;
                }

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[3, 9]]);
      }));

      function _runValidator(_x7, _x8, _x9) {
        return _ref7.apply(this, arguments);
      }

      return _runValidator;
    }()
  }]);
  return FormService;
}();

exports.default = FormService;
module.exports = exports['default'];