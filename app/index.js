var generators = require('yeoman-generator');
console.log(generators,11000);
module.exports = generators.Base.extend({
    prompting: function () {
      return this.prompt([{
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : this.appname // Default to current folder name
      }, {
        type    : 'confirm',
        name    : 'cool',
        message : 'Would you like to enable the Cool feature?'
      }]).then(function (answers) {
        this.log('app name', answers.name);
        this.log('cool feature', answers.cool);
      }.bind(this));
    }
  })