const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  requestGithubCredentials: () => {
    const questions = [
      {
        name: 'Username',
        type: 'input',
        message: 'Enter your Github username or e-mail address',
        validate: function(value) {
          return value.length
            ? true
            : 'Please enter your Github username or e-mail address';
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter password:',
        validate: function(value) {
          return value.length ? true : 'Please enter password:';
        }
      }
    ];
    return inquirer.prompt(questions)
  }
};
