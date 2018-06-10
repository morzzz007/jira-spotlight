import axios from 'axios';
import jiraResponseHandler from './jira-response-handler';
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;

class JiraApi {
  async getIssues() {
    const { username, password, jiraUrl } = await ipcRenderer.sendSync('get-password');

    const response = await axios.get(jiraUrl, {
      auth: {
        username,
        password
      }
    });
    return jiraResponseHandler(response.data.issues);
  }
}

export default JiraApi;
