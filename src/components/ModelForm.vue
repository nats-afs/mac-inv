<template lang="pug">
  v-card
    v-card-text
      v-card-title
        span.headline {{ formTitle }}
      v-container
        v-layout(row)
          v-flex(xs12)
            v-form
              v-text-field(label='Nombre', v-model='item.name', :error-messages='nameErrors', @input='$v.item.name.$touch()', @blur='$v.item.name.$touch()')
              v-text-field(label='Descripcion', v-model='item.description', multi-line, :error-messages='descriptionErrors', @input='$v.item.description.$touch()', @blur='$v.item.description.$touch()')
              v-btn(@click='submit') {{buttonTitle}}
              v-btn(v-if="index === -1", @click='clear') limpiar
              slot
</template>

<script>
// import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import { modelRef } from "@/config/firebaseConfig";
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
      name: { required, minLength: minLength(5), maxLength: maxLength(15) },
      description: { required, minLength: minLength(15) }
    }
  },
  data: () => ({
    alert: false,
    items: []
  }),
  watch: {},
  methods: {
    submit() {
      this.$v.item.$touch();
      if (this.$v.item.$error) {
        console.log("Invalido");
        return;
      }
      this.index > -1
        ? this.editModel({ index: this.index, item: this.item })
        : this.saveModel(this.item);
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
      saveModel: "models/saveModel",
      editModel: "models/editModel",
      keepAlive: "models/keepAlive"
    })
  },
  computed: {
    formTitle() {
      return this.index === -1 ? "Nuevo Modelo" : "Editar Modelo";
    },
    buttonTitle() {
      return this.index === -1 ? "Guardar" : "Editar";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.minLength &&
        errors.push("Nombre de modelo debe tener mas de 5 caracteres");
      !this.$v.item.name.maxLength &&
        errors.push("Nombre de modelo debe tener maximo 15 caracteres");
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
    }
  }
};
</script>

<style scoped>
</style>
