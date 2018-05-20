<template>
  <div class="issue" v-bind:class="{ subtask: isSubtask }">
    <div class="issue-info">
      <span class="issue-ticketnumber">{{ issue.key }}</span>
      <span class="issue-status">{{ issue.fields.status.name }}</span>
      <template v-if="issue.fields.assignee">
        <span class="issue-assignee">{{ issue.fields.assignee.displayName }}</span>
        <img class="issue-assignee-image" :src="issue.fields.assignee.avatarUrls['48x48']" :alt="issue.fields.assignee.displayName">
      </template>
    </div>
    <div class="issue-summary">{{ issue.fields.summary }}</div>
  </div>
</template>

<script>
export default {
  name: 'Issue',
  props: {
    issue: Object,
    isSubtask: Boolean
  }
};
</script>

<style scoped>
.issue {
  padding: 5px 10px;
  position: relative;
  cursor: pointer;
}

.issue:hover {
  background-color: #44475a;
}

.issue-info {
  font-size: 12px;
}

.issue-status {
  font-size: 10px;
  color: #6272a4;
}

.issue-ticketnumber {
  color: #8be9fd;
  margin-right: 5px;
}

.issue-assignee {
  font-size: 10px;
  color: #6272a4;
  position: absolute;
  right: 10px;
}

.issue-assignee-image {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  display: block;
  top: 20px;
  border-radius: 10px;
}

.subtask {
  padding-left: 20px;
}

.subtask .issue-ticketnumber {
  color: #bd93f9;
}
</style>
