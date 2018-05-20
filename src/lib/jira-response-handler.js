const _ = require('lodash');

const jiraResponseHandler = issues => {
  const subTaskKeys = [];
  for (const issue of issues) {
    for (const subtask of issue.fields.subtasks) {
      subTaskKeys.push(subtask.key);
    }
  }

  return _.reject(issues, issue => subTaskKeys.includes(issue.key));
};

export default jiraResponseHandler;
