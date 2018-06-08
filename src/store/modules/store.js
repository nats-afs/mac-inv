export const SET_RESULT = "SET_RESULT";
export const SET_LINKS = "SET_LINKS";
export const SET_PAGE = "SET_PAGE";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_LOADING = "SET_LOADING";
export const SET_ALIVE = "SET_ALIVE";
export const SET_VISIBLE = "SET_VISIBLE";

export const SET_STORES = "SET_STORES";
export const ADD_STORE = "ADD_STORE";
export const UPDATE_STORE = "UPDATE_STORE";
export const DELETE_STORE = "DELETE_STORE";
export const CLEAR_STORE = "CLEAR_STORE";
export const SUCCESS_NOTIFICATION = "SUCCESS_NOTIFICATION";
export const REFRESH_NOTIFICATION = "REFRESH_NOTIFICATION";


import {
  storeRef
} from "@/config/firebaseConfig";
import {
  retrieveStore
} from "@/util/index";

const state = {
  headers: [{
      text: "Nro Serie",
      align: "left",
      sortable: true,
      value: "nroSerie"
    },
    {
      text: "Modelo",
      align: "left",
      value: "model"
    },
    {
      text: "Codigo Inventario",
      align: "left",
      value: "nroInventario"
    },
    {
      text: "Fecha Creacion",
      value: "createAt"
    },
    {
      text: "Acciones",
      value: "name",
      sortable: false
    }
  ],
  noDataText: "Informacion no disponible",
  noResultext: "No se encontraron registros con los criterios de busqueda",
  rowsPerPageItems: [
    5,
    10,
    25,
    50,
    100,
    {
      text: "Todo",
      value: -1
    }
  ],
  alive: false,
  visible: false,
  stores: [],
  store: {},
  page: {
    number: 0,
    sort: "name",
    size: 5,
    totalElements: 0,
    totalPages: 0
  },
  loading: false,
  message: ""
};
const getters = {
  getHeaders: state => state.headers,
  getRowsPerPageItems: state => state.rowsPerPageItems,
  getPage: state => state.page,
  getStores: state => state.stores,
  getLoading: state => state.loading,
  getTotalItems: (state, getters) => getters.getPage.totalElements,
  isAlive: state => state.alive,
  isVisible: state => state.visible,
  getMessage: state => state.message,
  getNoDataText: state => state.noDataText,
  getNoResultText: state => state.noResultext
};
const mutations = {
  [SET_RESULT]: (state, result) => (state.result = result),
  [SET_STORES]: (state, stores) => (state.stores = stores),
  [ADD_STORE]: (state, store) => state.stores.unshift(store),
  [UPDATE_STORE]: (state, payload) => {
    let editedIndex = payload.index;
    Object.assign(state.stores[editedIndex], payload.item);
  },
  [DELETE_STORE]: (state, store) => {
    let index = state.stores.indexOf(store);
    state.stores.splice(index, 1);
  },
  [CLEAR_STORE]: state => (state.store = {}),
  [SET_PAGE]: (state, page) => (state.page = page),
  [SET_PAGINATION]: (state, pagination) => {
    state.page.number = pagination.page - 1;
    state.page.size = pagination.rowsPerPage;
    state.page.sort = pagination.sortBy;
  },
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  // [SET_VISIBLE]: (state, dialog) => (state.dialog = dialog),
  [SET_ALIVE]: (state, alive) => (state.alive = alive),
  [SUCCESS_NOTIFICATION]: (state, message) => {
    state.visible = true;
    state.message = message;
  },
  [REFRESH_NOTIFICATION]: state => {
    state.visible = false;
    state.message = "";
  }
};
const actions = {
  keepAlive: (context, alive) => {
    console.log("State of live is " + alive);
    context.commit(SET_ALIVE, alive);
  },
  saveStore: (context, store) => {
    console.log("...Saving data");
    return storeRef.push(store, () => {
        console.log("Succes saving");
        context.commit(SUCCESS_NOTIFICATION, "Store guardado");
        context.commit(SET_ALIVE, true)
      })
      // .then((snap) => {})
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      })
  },
  editStore: (context, payload) => {
    console.log("...Editing data");
    storeRef
      .child(payload.item.uid)
      .set(payload.item, () => {
        console.log("Succes editing");
        context.commit(SUCCESS_NOTIFICATION, "Store editado");
        context.commit(UPDATE_STORE, {
          index: payload.index,
          item: payload.item
        });
      })
      .then(() => context.commit(SET_ALIVE, false))
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      });
  },
  deleteStore: (context, store) => {
    console.log("...Deleting data");
    console.log(store.uid);

    storeRef.
    child(store.uid).
    remove(() => console.log('OnComplete -> Storeo eliminado '))
      .then(() => {
        console.log("Succes deleting");
        context.commit(DELETE_STORE, store);
        context.commit(SUCCESS_NOTIFICATION, "Storeo eliminado");
        // setTimeout(() => {
        //   context.commit(SET_VISIBLE, false);
        // }, 300);
      })
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      });
  },
  fetchStores: context => {
    console.log("Fetching data");
    context.commit(SET_LOADING, true);
    storeRef.on('value', snapshot => {
        context.commit(
          SET_STORES,
          retrieveStore(snapshot.key, snapshot.val())
        );
        // context.commit(SET_PAGE, context.getters.getResult.data.page);
        context.commit(SET_LOADING, false);
      },
      error => console.error(error.statusText)
    )
    // .finally(() => context.commit(SET_LOADING, false));
  },
  updatePage: (context, page) => context.commit(SET_PAGE, page),
  updatePagination: (context, pagination) =>
    context.commit(SET_PAGINATION, pagination),
  clearStore: context => commit(CLEAR_STORE),
  setDialog: (context, visible) => context.commit(SET_VISIBLE, visible)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};