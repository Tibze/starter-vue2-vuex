import shop from '../../services/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false
}

// getters
const getters = {
  allProducts: state => state.all,
  isLoaded: state => state.loaded
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    commit(types.LOAD_PRODUCTS, {});
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  }
}

// mutations
const mutations = {

  [types.LOAD_PRODUCTS] (state, { }) {
    state.loaded = false
  },

  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products;
    state.loaded = true;
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
