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
    return inquirer.prompt(questions);
  },

  requestRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function(value) {
          return value.length
            ? true
            : 'Please enter a name for the repository.';
        }
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Enter a description [OPTIONAL]'
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or Private',
        choices: ['public', 'private'],
        default: 'public'
      }
    ];
    return inquirer.prompt(questions);
  },
  askIgnoreFiles: fileList => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: ' Select the files and/or folders to be ignored:',
        choices: fileList,
        default: [
          'node_modules',
          'bower_components',
          '.DS_Store',
          '.Trash-*',
          '*~'
        ]
      }
    ];
    return inquirer.prompt(questions);
  }
};
