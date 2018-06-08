<template lang="pug">
  v-card
    v-card-text
      v-card-title
        span.headline {{ formTitle }}
      v-container
        v-layout(row)
          v-flex(xs12)
            v-form
              v-layout
                v-flex.pr-2(xs6)
                  v-text-field(label='Nombre', v-model='item.name', :error-messages='nameErrors', @input='$v.item.name.$touch()', @blur='$v.item.name.$touch()')
                  v-text-field(label='Descripcion', v-model='item.description', multi-line, :error-messages='descriptionErrors', @input='$v.item.description.$touch()', @blur='$v.item.description.$touch()')
                  v-text-field(label='Contratante', v-model='item.contractor', :error-messages='contractorErrors', @input='$v.item.contractor.$touch()', @blur='$v.item.contractor.$touch()')
                v-flex.pl-2(xs6)
                  v-text-field(label='Cantidad del Pedido', v-model='item.amount', :error-messages='amountErrors', @input='$v.item.amount.$touch()', @blur='$v.item.amount.$touch()')
                  v-menu(ref='menuDateInit', :close-on-content-click='false', v-model='menuDateInit', :nudge-right='40', lazy, transition='scale-transition', offset-y, full-width, max-width='290px', min-width='290px')
                    v-text-field(disabled,slot='activator', v-model='item.dateInit', label='Fecha Inicio',hint='DD/MM/YYYY formato', persistent-hint, prepend-icon='event', @blur='dpInit = parseDate(item.dateInit)')
                    v-date-picker(v-model='dpInit', local="es-PE", no-title, @input='menuDateInit = false')
                  v-menu(ref='menuDateEnd', :close-on-content-click='false', v-model='menuDateEnd', :nudge-right='40', lazy, transition='scale-transition', offset-y, full-width, max-width='290px', min-width='290px')
                    v-text-field(disabled,slot='activator', v-model='item.dateEnd', label='Fecha Fin',hint='DD/MM/YYYY formato', persistent-hint, prepend-icon='event', @blur='dpEnd = parseDate(item.dateEnd)')
                    v-date-picker(v-model='dpEnd', local="es-PE", no-title, @input='menuDateEnd = false')
              v-spacer
              v-btn(@click='submit') {{buttonTitle}}
              v-btn(v-if="index === -1", @click='clear') limpiar
              slot
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: {
    index: {
      type: Number,
      default: -1
    },
    item: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    item: {
      name: { required, minLength: minLength(5) },
      description: { required, minLength: minLength(12) },
      amount: { required },
      contractor: { required },
      dateInit: { required },
      dateEnd: { required }
    }
  },
  data: () => ({
    alert: false,
    items: [],
    menuDateInit: false,
    menuDateEnd: false,
    dpInit: null,
    dpEnd: null,
    error: false,
  }),
  watch: {
    dpInit(val) {
      this.item.dateInit = this.formatDate(this.dpInit);
    },
    dpEnd(val) {
      this.item.dateEnd = this.formatDate(this.dpEnd);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    submit() {
      this.$v.item.$touch();
      if (this.$v.item.$error) {
        console.log("Invalido");
        return;
      }
      this.$set(this.item, 'createAt', this.getdate)
      this.index > -1
        ? this.editProject({ index: this.index, item: this.item })
        : this.saveProject(this.item);
      this.close();
    },
    clear() {
      this.$v.item.$reset();
      this.item.name = null;
      this.item.description = null;
    },
    close() {
      console.log("close method");
      this.keepAlive(false);
    },
    ...mapActions({
      saveProject: "projects/saveProject",
      editProject: "projects/editProject",
      keepAlive: "projects/keepAlive"
    })
  },
  computed: {
    getdate() {
      return moment().format("DD-MM-YYYY");
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    formTitle() {
      return this.index === -1 ? "Nuevo Proyecto" : "Editar Proyecto";
    },
    buttonTitle() {
      return this.index === -1 ? "Guardar" : "Editar";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.minLength &&
        errors.push("Nombre de modelo debe tener mas de 5 caracteres");
      !this.$v.item.name.required && errors.push("Nombre es requerido.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.item.description.$dirty) return errors;
      !this.$v.item.description.minLength &&
        errors.push("Descripcion debe tener un minimo de 15 caracteres");
      !this.$v.item.description.required &&
        errors.push("Descripcion de requerido");
      return errors;
    },
    contractorErrors() {
      const errors = [];
      if (!this.$v.item.contractor.$dirty) return errors;
      !this.$v.item.contractor.required && errors.push("Nombre es requerido.");
      return errors;
    },
    amountErrors() {
      const errors = [];
      if (!this.$v.item.amount.$dirty) return errors;
      !this.$v.item.amount.required && errors.push("Cantidad es requerido.");
      return errors;
    }
  }
};
</script>

<style scoped>
</style>