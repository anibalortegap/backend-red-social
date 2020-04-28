const store = require('../../../store/mysql');
const ctl = require('./controller');

module.exports = ctl(store);
