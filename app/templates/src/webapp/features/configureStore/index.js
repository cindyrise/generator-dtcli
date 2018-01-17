if (__PRODUCTION) {
  module.exports = require('./prodStore').default;
}
else {
  module.exports = require('./devStore').default;
}
