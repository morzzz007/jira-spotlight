<template>
  <div>
    <div v-for="issue in issues" v-bind:key="issue.id">
      <Issue :issue="issue" :is-subtask="false" v-on:click.native="copyIssueNumber(issue)"></Issue>
      <div v-for="subtask in issue.fields.subtasks"  v-bind:key="subtask.id">
        <Issue :issue="subtask" :is-subtask="true" v-on:click.native="copyIssueNumber(subtask)"></Issue>
      </div>
    </div>
  </div>
</template>

<script>
import electron from 'electron';
import { mapGetters, mapActions } from 'vuex';
import Issue from './Issue.vue';

const clipboard = electron.clipboard;
const ipcRenderer = electron.ipcRenderer

export default {
  name: 'IssueList',
  components: {
    Issue
  },
  computed: mapGetters({
    issues: 'allIssues',
    issuesLoading: 'issuesLoading'
  }),
  methods: {
    copyIssueNumber: function(issue) {
      clipboard.writeText(issue.key);
      ipcRenderer.send('issue-clicked', 'ping');
    }
  }
};
</script>