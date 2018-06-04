<template>
  <div>
    Hello from settings!
    <button v-on:click="saveAndCloseSettings()">Close</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',
  methods: {
    ...mapActions(['saveAndCloseSettings', 'closeSettings'])
  }
};
</script>