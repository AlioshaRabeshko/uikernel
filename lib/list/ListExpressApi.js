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

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Form Express API for List model interaction
 *
 * @return {ListExpressApi}
 * @constructor
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function ListExpressApi() {
  if (!(this instanceof ListExpressApi)) {
    return new ListExpressApi();
  }

  var builderContext = this;

  builderContext.middlewares = {
    read: [function (req, res, next) {
      builderContext._read(req.query.v, req, builderContext._getModel(req, res), function (err, response) {
        builderContext._result(err, response, req, res, next);
      });
    }],
    getLabel: [function (req, res, next) {
      var id = JSON.parse(req.params.id);
      builderContext._getLabel(id, req, builderContext._getModel(req, res), function (err, response) {
        builderContext._result(err, response, req, res, next);
      });
    }]
  };
}

/**
 * Specify List model
 *
 * @param   {Function|AbstractListModel}  model  List model
 * @return {ListExpressApi}
 */
ListExpressApi.prototype.model = function (model) {
  if (typeof model === 'function') {
    this._getModel = model;
  } else {
    this._getModel = function () {
      return model;
    };
  }
  return this;
};

ListExpressApi.prototype.read = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.read = middlewares.concat(this.middlewares.read);
  return this;
};

ListExpressApi.prototype.getLabel = function (middlewares) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }
  this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
  return this;
};

ListExpressApi.prototype.result = function (func) {
  this._result = func;
  return this;
};
ListExpressApi.prototype.getRouter = function () {
  var builderContext = this;

  return new _express2.default.Router().get('/', builderContext.middlewares.read).get('/label/:id', builderContext.middlewares.getLabel);
};

// Default implementation
ListExpressApi.prototype._getModel = function () {
  throw Error('Model is not defined.');
};
ListExpressApi.prototype._read = function (search, req, model, cb) {
  (0, _toPromise2.default)(model.read.bind(model))(search).then(function (data) {
    cb(null, data);
  }).catch(function (err) {
    cb(err);
  });
};
ListExpressApi.prototype._getLabel = function (id, req, model, cb) {
  (0, _toPromise2.default)(model.getLabel.bind(model))(id).then(function (data) {
    cb(null, data);
  }).catch(function (err) {
    cb(err);
  });
};
ListExpressApi.prototype._result = function (err, data, req, res, next) {
  if (err) {
    next(err);
  } else {
    if (typeof data === 'number') {
      data = data.toString();
    }
    res.json(data);
  }
};

exports.default = ListExpressApi;
module.exports = exports['default'];