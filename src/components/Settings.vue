<template>
  <div>
    <input :value="username" @input="updateUsername" placeholder="Username">
    <input :value="password" @input="updatePassword" placeholder="Password" type="password">
    <input :value="jiraUrl" @input="updateJiraUrl" placeholder="Jira Url">
    <button v-on:click="saveAndCloseSettings()">Close</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'Settings',
  computed: {
    ...mapState({
      username: state => state.settings.username,
      password: state => state.settings.password,
      jiraUrl: state => state.settings.jiraUrl,
    })
  },
  methods: {
    ...mapActions(['saveAndCloseSettings', 'closeSettings']),
    updateUsername(e) {
      this.$store.commit('updateUsername', e.target.value)
    },
    updatePassword(e) {
      this.$store.commit('updatePassword', e.target.value)
    },
    updateJiraUrl(e) {
      this.$store.commit('updateJiraUrl', e.target.value)
    }
  }
};
</script>