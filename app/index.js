'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
    console.log(this.argument, 'argument');
  }
  prompting() {
    const prompts = [{
      type: 'checkbox',
      name: 'libs',
      message: '请选择要搭建的脚手架',
      choices: [{
        name: 'pc-scaffold',
        value: 'pc',
        checked: true
      }, {
        name: 'apollo-scaffold',
        value: 'apollo',
        checked: true
      }, {
        name: ' mobile-scaffold',
        value: 'mobile',
        checked: true
      }]
    }];
    return this.prompt(prompts).then(answers => {
      const libs = answers.libs;
      const hasLibs = flag => libs && libs.includes(flag);
      console.log(libs,'select');
      this.includeWeb = hasLibs('pc');
      this.includeApollo = hasLibs('apollo');
      this.includeMobile = hasLibs('mobile');
    });
  }
  writing() {
    console.log(this.includeWeb,this.includeApollo,this.includeMobile);
    let from='./pc-scaffold',to='';
    if(this.includeWeb){
      from ='./pc-scaffold';
      this.fs.copy(this.templatePath('./hide-file/pc_babelrc'),this.destinationPath(".babelrc"));
      this.fs.copy(this.templatePath('./hide-file/_gitignore'),this.destinationPath(".gitignore"));
    }
    if(this.includeApollo){
      from ='./apollo-scaffold';
      this.fs.copy(this.templatePath('./hide-file/apollo_babelrc'),this.destinationPath(".babelrc"));
    }
    if(this.includeMobile){
      from='./mobile-scaffold';
      this.fs.copy(this.templatePath('./hide-file/mobile_babelrc'),this.destinationPath(".babelrc"));
    }
    this.fs.copy(this.templatePath(from),this.destinationPath(to));
    this.fs.copy(this.templatePath('./hide-file/_gitignore'),this.destinationPath(".gitignore"));
  }
  end() {
    console.log("end");
  }
}