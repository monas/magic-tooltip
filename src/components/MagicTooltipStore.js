const state = {
    content: [],
    position: {},
    open: false,
    shouldClose: false
  };
  const getters = {
    tooltipSingleGetContent: state => {
      return state.content ? state.content : [];
    },
    tooltipSingleGetPosition: state => {
      return state.position;
    },
    tooltipSingleGetOpenState: state => {
      return state.open;
    },
    tooltipShouldClose: state => {
      return state.shouldClose;
    }
  };
  
  const actions = {
    setContent({ commit }, { content }) {
      commit("SET_CONTENT", { content });
    },
    setPosition({ commit }, { position }) {
      commit("SET_POSITION", { position });
    },
    openTooltip({ commit }, {}) {
      commit("SET_OPEN_STATE", {});
    },
    closeTooltip({ commit }, {}) {
      commit("SET_CLOSED_STATE", {});
    },
    setShouldClose({ commit }, { value }) {
      commit("SET_SHOULD_CLOSE_STATE", { value });
    }
  };
  
  const mutations = {
    SET_CONTENT(state, payload) {
      state.content = payload.content;
    },
    SET_POSITION(state, payload) {
      state.position = payload.position;
    },
    SET_OPEN_STATE(state) {
      state.open = true;
    },
    SET_CLOSED_STATE(state) {
      state.open = false;
    },
    SET_SHOULD_CLOSE_STATE(state, payload) {
      state.shouldClose = payload.value;
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  