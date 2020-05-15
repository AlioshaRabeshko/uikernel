"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _express = _interopRequireDefault(require("express"));

var _utils = require("../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FormExpressApi =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(FormExpressApi, null, [{
    key: "create",
    value: function create() {
      return new FormExpressApi();
    }
  }]);

  function FormExpressApi() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, FormExpressApi);
    this.middlewares = {
      getData: [(0, _utils.asyncHandler)(function _callee(req, res, next) {
        var fields, model, data;
        return _regenerator["default"].async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fields = req.query.fields ? JSON.parse(req.query.fields) : null;
                model = _this._getModel(req, res);
                _context.prev = 2;
                _context.next = 5;
                return _regenerator["default"].awrap(model.getData(fields));

              case 5:
                data = _context.sent;

                _this._result(null, data, req, res, next);

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);

                _this._result(_context.t0, null, req, res, next);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[2, 9]]);
      })],
      submit: [(0, _utils.asyncHandler)(function _callee2(req, res, next) {
        var model, data;
        return _regenerator["default"].async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = _this._getModel(req, res);
                _context2.prev = 1;
                _context2.next = 4;
                return _regenerator["default"].awrap(model.submit(req.body));

              case 4:
                data = _context2.sent;

                _this._result(null, {
                  data: data,
                  error: null
                }, req, res, next);

                _context2.next = 14;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);

                if (!(_context2.t0 && !(_context2.t0 instanceof _ValidationErrors["default"]))) {
                  _context2.next = 13;
                  break;
                }

                _this._result(_context2.t0, null, req, res, next);

                return _context2.abrupt("return");

              case 13:
                _this._result(null, {
                  data: null,
                  error: _context2.t0
                }, req, res, next);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[1, 8]]);
      })],
      validate: [(0, _utils.asyncHandler)(function _callee3(req, res, next) {
        var model, data;
        return _regenerator["default"].async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = _this._getModel(req, res);
                _context3.prev = 1;
                _context3.next = 4;
                return _regenerator["default"].awrap(model.isValidRecord(req.body));

              case 4:
                data = _context3.sent;

                _this._result(null, data, req, res, next);

                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);

                _this._result(_context3.t0, null, req, res, next);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[1, 8]]);
      })]
    };
  }

  (0, _createClass2["default"])(FormExpressApi, [{
    key: "model",
    value: function model(_model) {
      if (typeof _model === 'function') {
        this._getModel = _model;
      } else {
        this._getModel = function () {
          return _model;
        };
      }

      return this;
    }
  }, {
    key: "getRouter",
    value: function getRouter() {
      return new _express["default"].Router().get('/', this.middlewares.getData).post('/', this.middlewares.submit).post('/validation', this.middlewares.validate);
    }
  }, {
    key: "getData",
    value: function getData(middlewares) {
      return this._addMidelwares('getData', middlewares);
    }
  }, {
    key: "submit",
    value: function submit(middlewares) {
      return this._addMidelwares('submit', middlewares);
    }
  }, {
    key: "validate",
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: "_addMidelwares",
    value: function _addMidelwares(method, middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares[method] = middlewares.concat(this.middlewares[method]);
      return this;
    } // Default implementation

  }, {
    key: "_getModel",
    value: function _getModel() {
      throw Error('Model is not defined.');
    }
  }, {
    key: "_result",
    value: function _result(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }
  }]);
  return FormExpressApi;
}();

var _default = FormExpressApi;
exports["default"] = _default;
module.exports = exports.default;