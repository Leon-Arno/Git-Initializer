const _ = require('lodash');
const fs = require('fs')
const git = require('simple-git')
const CLI = require('clui')
const Spinner = CLI.Spinner,

const inquirer = require('./inquirer')
const gitHub = require('./githubHandler')

module.exports = {
  createRemoteRepo: async () => {
    const github = gitHub.getInstance()
    const answers = await inquirer.requestRepoDetails()

    const data = {
      name: answers.name,
      description: answers.description,
      private: (answers.visibility === 'private')
    }

    const status = new Spinner('Creating remote repository....')
    status.start()

    try {
      const response = await github.repositories.create(data);
      return response.data.ssh_url
    } catch (err) {
      throw err
    } finally {
      status.stop()
    }
  },

  createGitIgnore: async () => {
    const fileList = _.without(fs.readdirSync('.'), '.git', '.gitignore')

    if (fileList.length) {
      const answers = await inquirer.askIgnoreFiles(FileList)
      if (answers.ignore.length) {
        fs.writeFileSync('.gitignore', answers.ignore.join('\n'))
      } else {
        Touch('.gitignore')
      }
    } else {
      touch('.gitignore')
    }
  },

  setupRepository: async (url) =>{
    const status = new Spinner('Initializing llocal repository and pushing to remote origin....')
    status.start()


    try{
      await git.init().add('.gitignore').add('./*').commit('Initial commit').addRemote('origin', url).push('origin', 'master')
      return true
    }catch(err){
      throw err
    }finally{
      status.stop()
    }

  }


}