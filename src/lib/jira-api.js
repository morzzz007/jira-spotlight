import axios from 'axios';
import { username, password, url } from '../../config';
import jiraResponseHandler from './jira-response-handler';

class JiraApi {
  async getIssues() {
    const response = await axios.get(url, {
      auth: {
        username,
        password
      }
    });
    return jiraResponseHandler(response.data.issues);
  }
}

export default JiraApi;
