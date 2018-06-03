import Vue from 'vue';
import Vuex from 'vuex';
import issues from './modules/issues';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    issues,
    settings
  }
});
