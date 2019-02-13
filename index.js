#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const ConfigStore = require('configstore');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const githubHandler = require('./lib/githubHandler');
const repo = require('./lib/repo');

clear();
console.log(
  chalk.blue(figlet.textSync('Git-Initializer', { horizontalLayout: 'full' }))
);

if (files.directoryExists('.git')) {
  console.log(chalk.red('* Already a git repository!'));
  process.exit();
}

const getGitHubToken = async () => {
  let token = githubHandler.getStoredGitHubToken();
  if (token) {
    return token;
  }

  await githubHandler.setGitHubCredentials();

  token = await githubHandler.registerNewToken();
  return token;
};

const runApp = async () => {
  try {
    const token = await getGitHubToken();
    githubHandler.gitHubAuth(token);

    const url = await repo.createRemoteRepo();

    await repo.createGitIgnore();

    const done = await repo.setupRepository(url);
    if (done) {
      console.log(chalk.green('All done!'));
    }
  } catch (err) {
    if (err) {
      switch (err.code) {
        case 401:
          console.log(
            chalk.red(
              `Couldn't log you in. Please provide the correct credentials.`
            )
          );
          break;
        case 422:
          console.log(chalk.red('Repository name already exists'));
          break;
        default:
          console.log(err);
      }
    }
  }
};
runApp();

const configure = new ConfigStore('git-initializer');

const argv = require('minimist')(process.argv.slice(2));
