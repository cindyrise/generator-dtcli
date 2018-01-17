var Generator = require('yeoman-generator');
module.exports = Generator.extend({

  constructor: function (args, opts) {
    Generator.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
  },

  end: function() {
    this.log('Ciao Ciao!');
  }
});