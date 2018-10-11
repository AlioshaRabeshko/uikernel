'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _common = require('../../common/validation/validators/common');

var _common2 = _interopRequireDefault(_common);

var _AbstractGridModel2 = require('./AbstractGridModel');

var _AbstractGridModel3 = _interopRequireDefault(_AbstractGridModel2);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridCollectionModel = function (_AbstractGridModel) {
  (0, _inherits3.default)(GridCollectionModel, _AbstractGridModel);

  /**
   * Specifies a grid model that will work with array data passed to it as a parameter.
   *
   * @param {Object}    [options]
   * @param {Object[]}  [options.data]              Data array
   * @param {Function}  [options.filtersHandler]
   * @param {Validator} [options.validator]
   * @param {string[]}  [options.requiredFields]
   * @param {bool}      [options.validateOnCreate]
   * @constructor
   */
  function GridCollectionModel(options) {
    (0, _classCallCheck3.default)(this, GridCollectionModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridCollectionModel.__proto__ || (0, _getPrototypeOf2.default)(GridCollectionModel)).call(this));

    options = options || {};

    _this.data = _utils2.default.cloneDeep(options.data) || [];
    _this._id = 1;
    _this._filtersHandler = options.filtersHandler;
    if (options.validation) {
      _utils2.default.warn('Property "validation" is deprecated, use "validator" instead');
    }
    _this._validator = options.validator || options.validation || new _common2.default();
    _this._requiredFields = options.requiredFields || [];
    _this._validateOnCreate = options.hasOwnProperty('validateOnCreate') ? options.validateOnCreate : true;

    // TODO Deprecated. Will be deleted in v0.17.0
    if (!_this._validateOnCreate) {
      console.warn('Deprecated option "validateOnCreate".');
    }
    return _this;
  }

  /**
   * Set data array in model
   *
   * @param {Object[]} data
   */


  (0, _createClass3.default)(GridCollectionModel, [{
    key: 'setData',
    value: function setData(data) {
      var currentData = this.data.reduce(function (result, _ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            recordId = _ref2[0],
            record = _ref2[1];

        result[(0, _stringify2.default)(recordId)] = record;
        return result;
      }, {});

      var createdRecordsIds = [];
      var updatedRecords = [];

      var recordIds = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              recordId = _step$value[0],
              record = _step$value[1];

          var id = (0, _stringify2.default)(recordId);

          recordIds.push(id);

          if (!currentData[id]) {
            createdRecordsIds.push(recordId);
            continue;
          }

          if (!_utils2.default.isEqual(record, currentData[id])) {
            updatedRecords.push(record);
          }
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

      var deletedRecordsIds = _utils2.default.without((0, _keys2.default)(currentData), recordIds).map(JSON.parse);

      this.data = _utils2.default.cloneDeep(data);

      if (createdRecordsIds.length) {
        this.trigger('create', createdRecordsIds);
      }

      if (deletedRecordsIds.length) {
        this.trigger('delete', deletedRecordsIds);
      }

      if (updatedRecords.length) {
        this.trigger('update', updatedRecords);
      }
    }

    /**
     * Remove field by record id from data
     *
     * @param   {Number}  recordId   record id for remove
     * @returns {Number}  recordId   return id of deleted record
     */

  }, {
    key: 'delete',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(recordId) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.data = this.data.filter(function (record) {
                  return record[0] !== recordId;
                });
                this.trigger('delete', recordId);
                return _context.abrupt('return', recordId);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _delete(_x) {
        return _ref3.apply(this, arguments);
      }

      return _delete;
    }()

    /**
     * Add a record to local collection
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: 'create',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(record) {
        var i, field, validationErrors, id, clonedRecord;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                i = void 0;
                field = void 0;
                validationErrors = void 0;
                id = this._getID();
                clonedRecord = _utils2.default.clone(record);
                // Create record with definite id

                if (Array.isArray(clonedRecord) && clonedRecord.length === 2) {
                  id = clonedRecord[0];
                  clonedRecord = clonedRecord[1];
                }

                for (i in this._requiredFields) {
                  field = this._requiredFields[i];
                  if (!clonedRecord.hasOwnProperty(field)) {
                    clonedRecord[field] = null;
                  }
                }

                if (!this._validateOnCreate) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 10;
                return this.isValidRecord(clonedRecord);

              case 10:
                validationErrors = _context2.sent;

                if (validationErrors.isEmpty()) {
                  _context2.next = 13;
                  break;
                }

                throw validationErrors;

              case 13:
                return _context2.abrupt('return', this._create(clonedRecord, id));

              case 16:
                return _context2.abrupt('return', this._create(clonedRecord, id));

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2) {
        return _ref4.apply(this, arguments);
      }

      return create;
    }()

    /**
     * Get records list
     *
     * @param {Object}      settings                Request
     * @param {string[]}    settings.fields         Fields
     * @param {number}      [settings.limit]        Limit
     * @param {number}      [settings.offset=0]     Offset
     * @param {Object}      [settings.filters]      Filter values object
     * @param {Array}       [settings.sort]         Sort parameters
     * @param {Array}       [settings.ids]          Record IDs, we need to get for sure
     */

  }, {
    key: 'read',
    value: function read(settings) {
      var data = _utils2.default.cloneDeep(this.data);
      var result = {};

      // Get extra records
      if (settings.extra && settings.extra.length > 0) {
        result.extraRecords = data.filter(function (record) {
          return settings.extra.indexOf(record[0]) >= 0;
        });
      }

      // Delete unnecessary fields
      if (settings.fields) {
        _utils2.default.forEach(result.extraRecords, function (record) {
          _utils2.default.forEach(record[1], function (value, key) {
            if (settings.fields.indexOf(key) === -1) {
              delete record[1][key];
            }
          });
        });
      }

      // Sorting
      if (settings.sort && settings.sort.length > 0) {
        var sortField = settings.sort[0][0];
        var sortMode = settings.sort[0][1];

        data = data.sort(function (prev, next) {
          if (prev[1][sortField] < next[1][sortField]) {
            return sortMode === 'asc' ? -1 : 1;
          } else if (prev[1][sortField] > next[1][sortField]) {
            return sortMode === 'asc' ? 1 : -1;
          } else {
            return 0;
          }
        });
      }

      // Apply filters
      if (this._filtersHandler && settings.filters) {
        data = _utils2.default.cloneDeep(this._filtersHandler(data, settings.filters));
      }

      result.count = data.length;

      // Offset and limit
      if (settings.offset || settings.limit) {
        var start = settings.offset || 0;
        var end = settings.offset + settings.limit || data.length;
        data = data.slice(start, end);
      }

      // Delete unnecessary fields
      if (settings.fields) {
        _utils2.default.forEach(data, function (record) {
          _utils2.default.forEach(record[1], function (value, key) {
            if (settings.fields.indexOf(key) === -1) {
              delete record[1][key];
            }
          });
        });
      }

      result.records = data;

      return _promise2.default.resolve(result);
    }

    /**
     * Get the particular record
     *
     * @param {number|string}   id      Record ID
     * @param {Array}           fields  Required fields
     */

  }, {
    key: 'getRecord',
    value: function getRecord(id, fields) {
      var record = _utils2.default.cloneDeep(this._getRecordByID(id));
      if (!record) {
        return _promise2.default.reject(new Error('Record not found.'));
      }

      var returnRecord = record[1];

      // Deleting unused fields
      if (fields) {
        _utils2.default.forEach(returnRecord, function (value, key) {
          if (fields.indexOf(key) === -1) {
            delete returnRecord[key];
          }
        });
      }

      return _promise2.default.resolve(returnRecord);
    }

    /**
     * Apply record changes
     *
     * @param {Array}       changes     Changes array
     * @abstract
     */

  }, {
    key: 'update',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(changes) {
        var _this2 = this;

        var appliedChanges, result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, recordId, _changes;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (changes.length) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', []);

              case 2:
                appliedChanges = [];
                _context4.next = 5;
                return _promise2.default.all(changes.map(function () {
                  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref7) {
                    var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
                        recordId = _ref8[0],
                        changes = _ref8[1];

                    var validErrors;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this2.isValidRecord(changes);

                          case 2:
                            validErrors = _context3.sent;

                            if (validErrors.isEmpty()) {
                              _context3.next = 5;
                              break;
                            }

                            return _context3.abrupt('return', [recordId, validErrors]);

                          case 5:

                            appliedChanges.push([recordId, changes]);
                            return _context3.abrupt('return', [recordId, changes]);

                          case 7:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x4) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 5:
                result = _context4.sent;

                if (!appliedChanges.length) {
                  _context4.next = 27;
                  break;
                }

                // Apply changes
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 10;
                for (_iterator2 = (0, _getIterator3.default)(appliedChanges); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _step2$value = (0, _slicedToArray3.default)(_step2.value, 2), recordId = _step2$value[0], _changes = _step2$value[1];

                  (0, _assign2.default)(this._getRecordByID(recordId)[1], _changes);
                }

                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](10);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t0;

              case 18:
                _context4.prev = 18;
                _context4.prev = 19;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 21:
                _context4.prev = 21;

                if (!_didIteratorError2) {
                  _context4.next = 24;
                  break;
                }

                throw _iteratorError2;

              case 24:
                return _context4.finish(21);

              case 25:
                return _context4.finish(18);

              case 26:
                this.trigger('update', appliedChanges);

              case 27:
                return _context4.abrupt('return', result);

              case 28:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[10, 14, 18, 26], [19,, 21, 25]]);
      }));

      function update(_x3) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()

    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: 'isValidRecord',
    value: function isValidRecord(record) {
      return this._validator.isValidRecord(record);
    }

    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }, {
    key: '_getID',
    value: function _getID() {
      while (this._getRecordByID(this._id)) {
        this._id++;
      }
      return this._id++;
    }
  }, {
    key: '_getRecordByID',
    value: function _getRecordByID(id) {
      return _utils2.default.find(this.data, function (record) {
        return record[0] === id;
      });
    }
  }, {
    key: '_create',
    value: function _create(record, id) {
      this.data.push([id, record]);
      this.trigger('create', id);
      return id;
    }
  }]);
  return GridCollectionModel;
}(_AbstractGridModel3.default); /**
                                 * Copyright (с) 2015-present, SoftIndex LLC.
                                 * All rights reserved.
                                 *
                                 * This source code is licensed under the BSD-style license found in the
                                 * LICENSE file in the root directory of this source tree.
                                 */

exports.default = GridCollectionModel;
module.exports = exports['default'];