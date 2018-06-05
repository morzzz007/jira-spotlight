const _ = require('lodash');

const jiraResponseHandler = issues => {
  const subTaskKeys = [];
  for (const issue of issues) {
    for (const subtask of issue.fields.subtasks) {
      subTaskKeys.push(subtask.key);
    }
  }

  const issuesWithoutSubtasks = _.reject(issues, issue => subTaskKeys.includes(issue.key));
  const sorted = _.sortBy(issuesWithoutSubtasks, issue => issue.fields.status.name === 'Done' ? 1 : 0);
  return sorted;
};

export default jiraResponseHandler;
