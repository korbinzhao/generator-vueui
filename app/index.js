'use strict';
const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    this.argument('project', {
      type: String,
      required: false
    });

    this.name = path.basename(process.cwd());
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'project',
      message: 'Your project name',
      default: this.name
    }, {
      type: 'input',
      name: 'user',
      message: 'Your name',
      default: 'yourname'
    }, {
      type: 'input',
      name: 'email',
      message: 'Your email',
      default: 'youremail'
    }]).then(answers => {
      this.project = answers.project || this.options.project;
      this.user = answers.user;
      this.email = answers.email;

      this.log('project', this.project);
      this.log('user', this.user);
      this.log('email', this.email);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('./'),
      this.destinationPath('./'), {
        project: this.project,
        user: this.user,
        email: this.email
      }, {

      }, {
        globOptions: {
          dot: true
        }
      }
    );
  }
};
