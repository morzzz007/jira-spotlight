const state = {
  showSettings: false
};

const getters = {
  showSettings: state => state.showSettings
};

const actions = {
  async loadSettings({ commit }) {
    commit('setSettingsStatus', true);
  },

  async saveAndCloseSettings({ commit }) {
    commit('setSettingsStatus', false);
  },

  async closeSettings({ commit }) {
    commit('setSettingsStatus', false);
  }
};

const mutations = {
  setSettingsStatus(state, status) {
    state.showSettings = status;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
