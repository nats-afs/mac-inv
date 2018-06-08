<template lang="pug">
   v-container(grid-list-md,text-xs-center)
    v-layout(row,wrap)
      v-flex(xs12)
        v-card(width="900px")
          v-card-title
            | Modelos
            v-spacer
            v-text-field(append-icon='search', label='Buscar', single-line, hide-details, v-model='search')
          v-dialog(v-if='dialog', v-model='dialog', max-width='1000px')
            model-form(:index='editedIndex', :item='editedItem')
          v-data-table.elevation-1(:headers='headers', :items='items', :search='search', :loading='loading',:noDataText="noDataText",:noResultText="noResultText",:rowsPerPageItems="rowsPerPageItems")
            template(slot='items', slot-scope='props')
              td {{props.item.name}}
              td.text-xs-right {{ props.item.description }}
              td.text-xs-right {{ props.item.description }}
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
import modelForm from "./ModelForm";
import confirmDialog from "@/components/ConfirmDialog";
export default {
  components: { modelForm,confirmDialog },
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
    this.fetchModels();
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
            this.deleteModel(item);
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
      fetchModels: "models/fetchModels",
      deleteModel: "models/deleteModel",
      updatePagination: "models/updatePagination",
      setDialog: "models/setDialog",
      keepAlive: "models/keepAlive"
    })
  },
  computed: {
    ...mapGetters({
      headers: "models/getHeaders",
      rowsPerPageItems: "models/getRowsPerPageItems",
      items: "models/getModels",
      loading: "models/getLoading",
      totalItems: "models/getTotalItems",
      noDataText: "models/getNoDataText",
      noResultText: "models/getNoResultText",
      live: "models/isAlive"
    })
  }
};
</script>