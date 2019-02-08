const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

clear();
console.log(
  chalk.blue(figlet.textSync('Git-Initializer', { horizontalLayout: 'full' }))
);

if (files.directoryExists('.git')) {
  console.log(chalk.red('* Already a git repository!'));
  process.exit();
}

const run = async () => {
  const credentials = await inquirer.requestGithubCredentials();
  console.log(credentials);
};
