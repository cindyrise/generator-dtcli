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
        name: 'react-web',
        value: 'web',
        checked: true
      }, {
        name: 'react-apollo',
        value: 'apollo',
        checked: true
      }, {
        name: ' react-mobile',
        value: 'mobile',
        checked: true
      }]
    }];
    return this.prompt(prompts).then(answers => {
      console.log(answers,'9900');
      const libs = answers.libs;
      const hasLibs = flag => libs && !libs.includes(flag);
      console.log(libs);
      this.includeWeb = hasLibs('web');
      this.includeApollo = hasLibs('apollo');
      this.includeMobile = hasLibs('mobile');
    });
  }
  writing() {
    console.log(this.includeWeb,this.includeApollo,this.includeMobile);
    let from='./react-web',to='';
    if(this.includeWeb){
      from ='./react-web';
    }
    if(this.includeApollo){
      from ='./react-apollo';
      console.log('敬请期待');
    }
    if(this.includeMobile){
      from='./react-mobile'
      console.log('敬请期待');
    }
    this.fs.copy(this.templatePath(from),this.destinationPath(to));
    this.fs.copy(this.templatePath('./hide-file/_babelrc'),this.destinationPath(".babelrc"));
    this.fs.copy(this.templatePath('./hide-file/_gitignore'),this.destinationPath(".gitignore"));
    this.fs.copy(this.templatePath('./hide-file/_editorconfig'),this.destinationPath(".editorconfig"));
  }
  end() {
    console.log("end");
  }
}