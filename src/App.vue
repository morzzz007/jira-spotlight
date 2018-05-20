<template>
  <div id="app">
    <img v-if="loadingIssues" src="assets/grid.svg" style="width: 18px" />
    <div v-for="issue in issues" v-bind:key="issue.id">
      <Issue :issue="issue" :is-subtask="false" v-on:click.native="copyIssueNumber(issue)"></Issue>
      <div v-for="subtask in issue.fields.subtasks"  v-bind:key="subtask.id">
        <Issue :issue="subtask" :is-subtask="true" v-on:click.native="copyIssueNumber(issue)"></Issue>
      </div>
    </div>
  </div>
</template>

<script>
import electron from 'electron'
import axios from 'axios'
import { username, password, url } from '../config';
const clipboard = electron.clipboard;
import jiraResponseHandler from './lib/jira-response-handler';

import Issue from './components/Issue.vue'

export default {
  name: 'app',
  components: {
    Issue
  },
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
        .get(url, {
          auth: {
            username,
            password
          }
        })
        .then(function(response) {
          vm.issues = jiraResponseHandler(response.data.issues);
          vm.loadingIssues = false;
        })
        .catch(function(error) {
          vm.message = 'Error! Could not reach the API. ' + error;
          vm.loadingIssues = false;
        });
    },
    copyIssueNumber: function(issue) {
      clipboard.writeText(issue.key);
    }
  }
};
</script>

<style>
body {
  background-color: #282a36;
  color: #f8f8f2;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  margin: 0px;
}
</style>
