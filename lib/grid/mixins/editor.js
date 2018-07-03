'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _ThrottleError = require('../../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var findDOMNode = _reactDom2.default.findDOMNode; // eslint-disable-line no-unused-vars


var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var GridEditorMixin = {

  /**
   * Display Editor in a table cell
   *
   * @param {HTMLElement} element     Cell DOM element
   * @param {string}      row         Row ID
   * @param {string}      column      Column ID
   * @private
   */
  _renderEditor: function _renderEditor(element, row, column) {
    var _this = this;

    var binds = this._getBindParam(column);
    var record = this._getRecord(row);
    var value = _utils2.default.at(record, binds);
    var focusDone = false;

    if (!Array.isArray(binds)) {
      value = value[0];
    }

    // Prevent recreate of the opened Editor
    if (this._isEditorVisible(row, column)) {
      return;
    }

    var editorContext = {
      updateField: function updateField(field, nextValue) {
        var data = {};
        data[field] = nextValue;
        _this._setRowChanges(row, data);
      }
    };

    var props = {
      onChange: function onChange(values) {
        _this._onChangeEditor(row, column, values, editorContext, element);
      },
      onFocus: function onFocus() {
        _this._onFocusEditor(row, column);
      },
      onBlur: function onBlur() {
        // Remove Editor
        if (focusDone) {
          _this._unmountEditor(element, row, column);
          _this._onBlurEditor(row, column);
        }
      },
      onKeyUp: function onKeyUp(e) {
        if (focusDone && [ENTER_KEY, ESCAPE_KEY].includes(e.keyCode)) {
          _this._unmountEditor(element, row, column);

          if (e.keyCode === ENTER_KEY) {
            _this._onBlurEditor(row, column);
          }

          if (e.keyCode === ESCAPE_KEY) {
            if (_this.state.data[row][column] !== value) {
              _this._setRowChanges(row, (0, _defineProperty3.default)({}, column, value));
              _this._validateRow(row);
              return;
            }

            if (_this.state.changes[row]) {
              delete _this.state.changes[row][column];
            }

            _this._updateField(row, column);
          }
        }
      },
      value: value
    };

    editorContext.props = props;

    // Display Editor
    var Component = this.props.cols[column].editor.call(editorContext, record, this);

    if (!Component) {
      return;
    }

    this.state.editor[row + '_' + column] = _reactDom2.default.render(Component, element, function () {
      element.classList.add('dgrid-input-wrapper');

      if (typeof this.focus === 'function') {
        this.focus();
      } else {
        findDOMNode(this).focus();
      }
      focusDone = true;
    });
  },

  _unmountEditor: function _unmountEditor(element, row, column) {
    _reactDom2.default.unmountComponentAtNode(element);
    delete this.state.editor[row + '_' + column];
    element.classList.remove('dgrid-input-wrapper');
  },


  _onChangeEditor: function _onChangeEditor(row, column, values, editorContext, element) {
    var binds = this._getBindParam(column);

    values = _utils2.default.cloneDeep(_utils2.default.parseValueFromEvent(values));

    var record = this._getRecord(row);
    var context = _utils2.default.cloneDeep(editorContext);
    context.props.value = values;
    var Component = this.props.cols[column].editor.call(context, record, this);
    this.state.editor[row + '_' + column] = _reactDom2.default.render(Component, element);

    if (!Array.isArray(binds)) {
      binds = [binds];
      values = [values];
    }

    this._setRowChanges(row, _utils2.default.zipObject(binds, values));
  },

  _onFocusEditor: function _onFocusEditor(row, column) {
    if (!this.state.errors[row]) {
      return;
    }

    var binds = this._getBindParam(column);
    if (!Array.isArray(binds)) {
      binds = [binds];
    }

    binds.forEach(function (field) {
      this.state.errors[row].clearField(field);
    }, this);
    if (this.state.errors[row].isEmpty()) {
      delete this.state.errors[row];
    }
  },

  _onBlurEditor: function _onBlurEditor(row, column) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this2._updateField(row, column);
              _context.prev = 1;
              _context.next = 4;
              return _this2._checkWarnings(row);

            case 4:
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](1);

              if (_context.t0 instanceof _ThrottleError2.default) {
                _context.next = 10;
                break;
              }

              throw _context.t0;

            case 10:

              // TODO Deprecated prop realtime in v0.17
              if (_this2.props.autoSubmit || _this2.props.realtime) {
                if (_this2.props.realtime) {
                  console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
                }
                _this2.save(_this2.props.onRealtimeSubmit);
              } else {
                _this2._validateRow(row);
              }
              if (_this2.props.onChange) {
                _this2.props.onChange(_this2.state.changes, _this2.state.data);
              }

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 6]]);
    }))();
  },


  _isEditorVisible: function _isEditorVisible(row, column) {
    return Boolean(this.state.editor[row + '_' + column]);
  }
};

exports.default = GridEditorMixin;
module.exports = exports['default'];