/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const columns = {
  name: {
    name: 'First Name', // column title
    render: ['name', record => record.name] // method for rendering of table cells
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => record.surname]
  },
  phone: {
    name: 'Phone',
    render: ['phone', record => record.phone]
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age]
  },
  gender: {
    name: 'Gender',
    render: ['gender', (record) => {
      switch (record.gender) {
        case 1:
          return 'Male';
        case 2:
          return 'Female';
        default:
          return 'Undefined';
      }
    }]
  }
};

export default columns
