/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

/**
 * Create NULL validator
 *
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = function (error) {
  return function (value) {
    if (value === null) {
      return error;
    }
  };
};
