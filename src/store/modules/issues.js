import JiraApi from '../../lib/jira-api';

const state = {
  issues: [],
  loading: true
};

const getters = {
  allIssues: state => state.issues
};

const actions = {
  async loadIssues({ commit }) {
    const jiraApi = new JiraApi();
    commit('setLoadingStatus', true);
    const results = await jiraApi.getIssues();
    commit('setIssues', { issues: results });
    commit('setLoadingStatus', false);
  }
};

const mutations = {
  setIssues(state, { issues }) {
    state.issues = issues;
  },
  setLoadingStatus(state, status) {
    state.loading = status;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
