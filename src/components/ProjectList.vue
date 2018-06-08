<template lang="pug">
  v-layout(row,wrap)
    v-flex(xs12)
      v-card
        v-card-title
          | Proyectos
          v-spacer
          v-text-field(append-icon='search', label='Buscar', single-line, hide-details, v-model='search')
        v-dialog(v-if='dialog', v-model='dialog', max-width='1000px')
          project-form(:index='editedIndex', :item='editedItem')
        v-data-table.elevation-1(:headers='headers', :items='items', :search='search', :loading='loading',:noDataText="noDataText",:noResultText="noResultText",:rowsPerPageItems="rowsPerPageItems")
          template(slot='items', slot-scope='props')
            td {{props.item.name}}
            td.text-xs-right {{ props.item.description }}
            td.text-xs-right {{ props.item.contractor }}
            td.text-xs-right {{ props.item.dateInit }}
            td.text-xs-right {{ props.item.dateEnd }}
            td.text-xs-right {{ props.item.createAt }}
            td.text-xs-right {{ props.item.amount }}
            td.justify-center.layout.px-0
              v-btn.mx-0(icon, @click='editItem(props.item)')
                v-icon(color='teal') edit
              v-btn.mx-0(icon, @click='deleteItem(props.item)')
                v-icon(color='pink') delete
          template(slot='pageText', slot-scope='{ pageStart, pageStop }')
            | From {{ pageStart }} to {{ pageStop }}
      v-btn(dark,fab,fixed,bottom, right,@click.stop="showForm(true)")
        v-icon add
    confirm-dialog(ref="confirm")
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import projectForm from "./ProjectForm";
import confirmDialog from "@/components/ConfirmDialog";
export default {
  components: { projectForm,confirmDialog },
  data: () => ({
    search: "",

    editedItem: {},
    editedIndex: -1,
    dialog: false
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    live(val) {
      val || this.close();
    }
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    showForm(value) {
      this.dialog = value;
      this.keepAlive(value);
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showForm(true);
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      this.$refs.confirm
        .open("Eliminar solicitante", "Esta seguro?")
        .then(confirm => {
          if (confirm) {
            this.deleteProject(item);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    close() {
      console.log("Closing");
      this.showForm(false);
      setTimeout(() => {
        this.editedItem = Object.assign({}, {});
        this.editedIndex = -1;
      }, 300);
    },
    ...mapActions({
      fetchProjects: "projects/fetchProjects",
      deleteProject: "projects/deleteProject",
      updatePagination: "projects/updatePagination",
      setDialog: "projects/setDialog",
      keepAlive: "projects/keepAlive"
    })
  },
  computed: {
    ...mapGetters({
      headers: "projects/getHeaders",
      rowsPerPageItems: "projects/getRowsPerPageItems",
      items: "projects/getProjects",
      loading: "projects/getLoading",
      totalItems: "projects/getTotalItems",
      noDataText: "projects/getNoDataText",
      noResultText: "projects/getNoResultText",
      live: "projects/isAlive"
    })
  }
};
</script>