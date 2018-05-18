'use strict';

const axios = require('axios');
const config = require('./config');
const electron = require('electron');
const clipboard = electron.clipboard;
const jiraResponseHandler = require('./lib/jira-response-handler');

var app = new Vue({
  el: '#app',
  data: function() {
    return {
      message: 'Hello Vue!',
      issues: [],
      loadingIssues: true
    };
  },
  mounted: function() {
    this.getAnswer();
  },
  methods: {
    getAnswer: function() {
      var vm = this;
      this.loadingIssues = true;
      axios
        .get(config.url, {
          auth: {
            username: config.username,
            password: config.password
          }
        })
        .then(function(response) {
          vm.issues = jiraResponseHandler(response.data.issues);
          vm.loadingIssues = false;
        })
        .catch(function(error) {
          console.log('hiba');
          vm.message = 'Error! Could not reach the API. ' + error;
          vm.loadingIssues = false;
        });
    },
    copyIssueNumber: function(issue) {
      clipboard.writeText(issue.key);
    }
  }
});
