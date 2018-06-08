export const SET_RESULT = "SET_RESULT";
export const SET_LINKS = "SET_LINKS";
export const SET_PAGE = "SET_PAGE";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_LOADING = "SET_LOADING";
export const SET_ALIVE = "SET_ALIVE";
export const SET_VISIBLE = "SET_VISIBLE";

export const SET_PROJECTS = "SET_PROJECTS";
export const ADD_PROJECT = "ADD_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const CLEAR_PROJECT = "CLEAR_PROJECT";
export const SUCCESS_NOTIFICATION = "SUCCESS_NOTIFICATION";
export const REFRESH_NOTIFICATION = "REFRESH_NOTIFICATION";


import {
  projectRef
} from "@/config/firebaseConfig";
import {
  retrieveProjects
} from "@/util/index";

const state = {
  headers: [{
      text: "Proyecto",
      align: "left",
      sortable: true,
      value: "name"
    },
    {
      text: "Descripcion",
      align: "left",
      value: "description"
    },
    {
      text: "Contratante",
      align: "left",
      value: "contractor"
    },
    {
      text: "Fecha Inicio",
      value: "dateInit"
    },
    {
      text: "Fecha Fin",
      value: "dateEnd"
    },
    {
      text: "Fecha Creacion",
      value: "createAt"
    },
    {
      text: "Pedido",
      value: "cantidad"
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
  projects: [],
  project: {},
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
  getProjects: state => state.projects,
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
  [SET_PROJECTS]: (state, projects) => (state.projects = projects),
  [ADD_PROJECT]: (state, project) => state.projects.unshift(project),
  [UPDATE_PROJECT]: (state, payload) => {
    let editedIndex = payload.index;
    Object.assign(state.projects[editedIndex], payload.item);
  },
  [DELETE_PROJECT]: (state, project) => {
    let index = state.projects.indexOf(project);
    state.projects.splice(index, 1);
  },
  [CLEAR_PROJECT]: state => (state.project = {}),
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
  saveProject: (context, project) => {
    console.log("...Saving data");
    projectRef.push(project, () => {
        console.log("Succes saving");
        context.commit(SUCCESS_NOTIFICATION, "Projecto guardado");
      })
      .then(() => context.commit(SET_ALIVE, false))
      .catch(error => console.log(error))
      .finally(() => {
        console.log("End of transaction");
        setTimeout(() => {
          context.commit(REFRESH_NOTIFICATION);
        }, 6000);
      })
  },
  editProject: (context, payload) => {
    console.log("...Editing data");
    projectRef
      .child(payload.item.uid)
      .set(payload.item, () => {
        console.log("Succes editing");
        context.commit(SUCCESS_NOTIFICATION, "Projecto editado");
        context.commit(UPDATE_PROJECT, {
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
  deleteProject: (context, project) => {
    console.log("...Deleting data");
    console.log(project.uid);

    projectRef.
    child(project.uid).
    remove(() => console.log('OnComplete -> Projecto eliminado '))
      .then(() => {
        console.log("Succes deleting");
        context.commit(DELETE_PROJECT, project);
        context.commit(SUCCESS_NOTIFICATION, "Projecto eliminado");
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
  fetchProjects: context => {
    console.log("Fetching data");
    context.commit(SET_LOADING, true);
    projectRef.on('value', snapshot => {
        context.commit(
          SET_PROJECTS,
          retrieveProjects(snapshot.key, snapshot.val())
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
  clearProject: context => commit(CLEAR_PROJECT),
  setDialog: (context, visible) => context.commit(SET_VISIBLE, visible)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};