/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _float = require('../float');

var _float2 = _interopRequireDefault(_float);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Without range and can be empty', function () {
  var validator = (0, _float2.default)(null, null, 'test');

  it('"1" should not be valid', function () {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', function () {
    expect(validator('')).not.toEqual(undefined);
  });

  it('" " should not be valid', function () {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', function () {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should be valid', function () {
    expect(validator(null)).toEqual(undefined);
  });

  it('undefined should be valid', function () {
    expect(validator(undefined)).toEqual(undefined);
  });

  it('0 should be valid', function () {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', function () {
    expect(validator(1)).toEqual(undefined);
  });

  it('-1 should be valid', function () {
    expect(validator(-1)).toEqual(undefined);
  });

  it('1.123 should be valid', function () {
    expect(validator(1.123)).toEqual(undefined);
  });

  it('-1.123 should be valid', function () {
    expect(validator(-1.123)).toEqual(undefined);
  });

  it('{} should not be valid', function () {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', function () {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });
}); /**
     * Copyright (с) 2015-present, SoftIndex LLC.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree.
     */

describe('Without range and can not be empty', function () {
  var validator = _float2.default.notNull(null, null, 'test');

  it('"1" should not be valid', function () {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', function () {
    expect(validator('')).not.toEqual(undefined);
  });

  it('" " should not be valid', function () {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', function () {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should not be valid', function () {
    expect(validator(null)).not.toEqual(undefined);
  });

  it('undefined should not be valid', function () {
    expect(validator(undefined)).not.toEqual(undefined);
  });

  it('0 should be valid', function () {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', function () {
    expect(validator(1)).toEqual(undefined);
  });

  it('-1 should be valid', function () {
    expect(validator(-1)).toEqual(undefined);
  });

  it('1.123 should be valid', function () {
    expect(validator(1.123)).toEqual(undefined);
  });

  it('-1.123 should be valid', function () {
    expect(validator(-1.123)).toEqual(undefined);
  });

  it('{} should not be valid', function () {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', function () {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });
});

describe('With range [-1, 1] and can be empty', function () {
  var validator = (0, _float2.default)(-1, 1, 'test');

  it('"1" should not be valid', function () {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', function () {
    expect(validator('')).not.toEqual(undefined);
  });

  it('" " should not be valid', function () {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', function () {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should be valid', function () {
    expect(validator(null)).toEqual(undefined);
  });

  it('undefined should be valid', function () {
    expect(validator(undefined)).toEqual(undefined);
  });

  it('0 should be valid', function () {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', function () {
    expect(validator(1)).toEqual(undefined);
  });

  it('1.123 should not be valid', function () {
    expect(validator(1.123)).not.toEqual(undefined);
  });

  it('-1.123 should not be valid', function () {
    expect(validator(-1.123)).not.toEqual(undefined);
  });

  it('{} should not be valid', function () {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', function () {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });
});

describe('With range [-1, 1] and can not be empty', function () {
  var validator = _float2.default.notNull(-1, 1, 'test');

  it('"1" should not be valid', function () {
    expect(validator('1')).not.toEqual(undefined);
  });

  it('"" should not be valid', function () {
    expect(validator('')).not.toEqual(undefined);
  });

  it('" " should not be valid', function () {
    expect(validator(' ')).not.toEqual(undefined);
  });

  it('NaN should not be valid', function () {
    expect(validator(NaN)).not.toEqual(undefined);
  });

  it('null should not be valid', function () {
    expect(validator(null)).not.toEqual(undefined);
  });

  it('undefined should not be valid', function () {
    expect(validator(undefined)).not.toEqual(undefined);
  });

  it('0 should be valid', function () {
    expect(validator(0)).toEqual(undefined);
  });

  it('1 should be valid', function () {
    expect(validator(1)).toEqual(undefined);
  });

  it('1.123 should not be valid', function () {
    expect(validator(1.123)).not.toEqual(undefined);
  });

  it('-1.123 should not be valid', function () {
    expect(validator(-1.123)).not.toEqual(undefined);
  });

  it('{} should not be valid', function () {
    expect(validator({})).not.toEqual(undefined);
  });

  it('[] should not be valid', function () {
    expect(validator([])).not.toEqual(undefined);
  });

  it('Infinity should not be valid', function () {
    expect(validator(Infinity)).not.toEqual(undefined);
  });
});

describe('Error message is not defined', function () {
  var validator = (0, _float2.default)(null, null);
  it('Should be return default message', function () {
    expect(validator(NaN)).toEqual('Invalid float');
  });
});