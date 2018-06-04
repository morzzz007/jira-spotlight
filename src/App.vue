<template>
  <div id="app">
    <div class="header-container">
      <div class="settings-button" v-on:click="loadSettings()">
        <img class="refresh-svg" src="settings.svg" alt="">
        Settings
      </div>
      <div class="refresh-button" v-on:click="loadIssues()">
        <img class="refresh-svg" src="sync.svg" alt="">
        Refresh
      </div>
    </div>
    <div v-if="!settingsVisible" class="issue-container">
      <IssueList></IssueList>
    </div>
    <div v-if="settingsVisible" class="settings-container">
      <Settings></Settings>
    </div>
  </div>
</template>

<script>
import IssueList from './components/IssueList.vue';
import Settings from './components/Settings.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    IssueList,
    Settings
  },
  computed: mapGetters({
    settingsVisible: 'showSettings'
  }),
  mounted: function() {
    this.loadIssues();
  },
  methods: {
    ...mapActions(['loadIssues', 'loadSettings', 'saveAndCloseSettings', 'closeSettings'])
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
