<template>
  <div id="app">
    <div class="header-container">
      <div class="settings-button">
        <img class="refresh-svg" src="settings.svg" alt="">
        Settings
      </div>
      <div class="refresh-button">
        <img class="refresh-svg" src="sync.svg" alt="">
        Refresh
      </div>
    </div>
    <div class="issue-container">
      <div v-for="issue in issues" v-bind:key="issue.id">
        <Issue :issue="issue" :is-subtask="false" v-on:click.native="copyIssueNumber(issue)"></Issue>
        <div v-for="subtask in issue.fields.subtasks"  v-bind:key="subtask.id">
          <Issue :issue="subtask" :is-subtask="true" v-on:click.native="copyIssueNumber(subtask)"></Issue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import electron from 'electron';
import Issue from './components/Issue.vue';
import { mapGetters, mapActions } from 'vuex';

const clipboard = electron.clipboard;

export default {
  name: 'app',
  components: {
    Issue
  },
  computed: mapGetters({
    issues: 'allIssues'
  }),
  mounted: function() {
    this.loadIssues();
  },
  methods: {
    ...mapActions(['loadIssues']),
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

.header-container {
  height: 25px;
  background-color: #191a21;
  border-bottom: 1px solid #21222c;
  padding-left: 10px;
  padding-right: 10px;
}

.issue-container {
  position: fixed;
  width: 100%;
  height: calc(100% - 25px);
  overflow: scroll;
}

.refresh-button {
  font-size: 10px;
  position: fixed;
  right: 0px;
  top: 0px;
  text-transform: uppercase;
  padding-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  height: 17px;
  cursor: pointer;
}

.settings-button {
  font-size: 10px;
  position: fixed;
  right: 79px;
  top: 0px;
  text-transform: uppercase;
  padding-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  height: 17px;
  cursor: pointer;
}

.settings-button:hover,
.refresh-button:hover {
  background-color: #343746;
}

.refresh-svg {
  height: 8px;
  width: 8px;
}
</style>
