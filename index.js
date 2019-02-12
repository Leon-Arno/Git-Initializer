const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const ConfigStore = require('configstore');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const githubHandler = require('./lib/githubHandler');

clear();
console.log(
  chalk.blue(figlet.textSync('Git-Initializer', { horizontalLayout: 'full' }))
);

if (files.directoryExists('.git')) {
  console.log(chalk.red('* Already a git repository!'));
  process.exit();
}

const getDetails = async () => {
  let token = github.getStoredGitHubToken();
  if (!token) {
    await github.setGitHubCredentials();
    token = await github.registerNewToken();
  }
  console.log(token);
};
getDetails();

const configure = new ConfigStore('git-initializer');

const argv = require('minimist')(process.argv.slice(2));
