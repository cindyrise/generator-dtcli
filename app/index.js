var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {
    return this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: 'Hello'
    }).then(function(answers) {
      this.log(answers.name); // do stuff with returned answers
    }.bind(this));
  }
});