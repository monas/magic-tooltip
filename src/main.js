import Vue from "vue";
import App from "./App";
import Vuex from "vuex";

// import components store module
import tooltip from "./components/MagicTooltipStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { tooltip }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store: store,
  template: "<App/>",
  components: { App }
});
