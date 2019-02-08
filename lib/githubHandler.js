const octokit = require('@octokit/rest')();
const ConfigStore = require('configstore');
const package = require('../package.json');
const lodash = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const inquirer = require('./inquirer');

const configure = new ConfigStore(package.name);

module.exports = {
  getInstance = () => {
    return octokit
  },

  getStoredGitHubToken: () => {
    return configure.get('github.token')
  },

  setGitHubCredentials: async () => {
    const credentials = await inquirer.requestGithubCredentials()
    octokit.authenticate(
      _.extend({ type: 'basic', },
        credentials)
    )
  },

  registerNewToken: async () => {
    const status = new Spinner('Authenticating, please wait...')
    status.start()

    try {
      const response = await octokit.authorization.create({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'Git-Initializer, a Git repository initializer CLI tool'
      })

      const token = response.data.token
      if (token) {
        configure.set('github.token', token)
        return token
      } else { throw new Error('Missing Token', `A GitHub token wasn't found in the response`) }
    } catch (error) {
      throw error
    } finally { status.stop() }
  }
}

