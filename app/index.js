'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
    console.log(this.argument,'argument');
  }
  prompting(){
    console.log(1223);
  }
  writing(){
    console.log('write');
  }
  end (){
    console.log("end");
  }
}