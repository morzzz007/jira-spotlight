import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;

const state = {
  showSettings: false,
  settingsSet: false,
  username: '',
  password: '',
  jiraUrl: ''
};

const getters = {
  showSettings: state => state.showSettings
};

const actions = {
  async decryptSettings({ commit }) {
    const { username, password, jiraUrl } = await ipcRenderer.sendSync('get-password');

    if (username === '' || password === '' || jiraUrl === '') {
      commit('setSettingsSet', false);
    } else {
      commit('updateUsername', username);
      commit('updatePassword', password);
      commit('updateJiraUrl', jiraUrl);
      commit('setSettingsSet', true);
    }
  },
  async loadSettings({ commit }) {
    commit('setSettingsStatus', true);
  },

  async saveAndCloseSettings({ commit, state }) {
    await ipcRenderer.sendSync('set-password', {
      username: state.username,
      password: state.password,
      jiraUrl: state.jiraUrl
    });
    commit('setSettingsStatus', false);
    commit('setSettingsSet', true);
  },

  async closeSettings({ commit }) {
    commit('setSettingsStatus', false);
    commit('setSettingsSet', true);
  }
};

const mutations = {
  setSettingsStatus(state, status) {
    state.showSettings = status;
  },
  setSettingsSet(state, status) {
    state.settingsSet = status;
  },
  updateUsername(state, username) {
    state.username = username;
  },
  updatePassword(state, password) {
    state.password = password;
  },
  updateJiraUrl(state, jiraUrl) {
    state.jiraUrl = jiraUrl;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
