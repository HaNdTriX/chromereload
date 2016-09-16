'use strict';

var _chromereload = require('./chromereload.js');

var _chromereload2 = _interopRequireDefault(_chromereload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'development') {
  new _chromereload2.default();
}