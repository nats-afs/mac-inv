<template lang="pug">
   v-container(grid-list-md,text-xs-center)
    v-layout(row,wrap)
      v-flex(xs6)
        v-card
          v-card-text
            v-alert(color='success', icon='check_circle', :value='alert', transition='scale-transition')
              | {{alertMessage}}
            v-card-title
              span.headline {{ formTitle }}
            v-container
              v-layout(row='')
                v-flex(xs12='')
                  v-form
                    v-text-field(label='Nombre', v-model='item.name', :error-messages='nameErrors', @input='$v.item.name.$touch()', @blur='$v.item.name.$touch()')
                    v-text-field(label='Descripcion', v-model='item.description', multi-line='', :error-messages='descriptionErrors', @input='$v.item.description.$touch()', @blur='$v.item.description.$touch()')
                    v-btn(@click='submit') guardar
                    v-btn(v-if='!edit', @click='clear') limpiar
                    slot  
      v-flex(xs6)
        v-card(dark,color="secondary")
          v-card-text.px-0 6
</template>
<script>
import { categoryRef } from "../config/firebaseConfig";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
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
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.item.$error) {
        console.log("Error de validacion");
        return;
      }
      this.edit ? this.editCategory() : this.addCategory();
    },
    addCategory() {
      categoryRef
        .push(this.item)
        .then(() => this.displayAlert(), () => console.log("No se guardo"));
      this.clear();
    },
    displayAlert() {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 4000);
    },
    editCategory() {
      categoryRef
        .child(this.item.uid)
        .set(this.item)
        .then(() => this.displayAlert(), () => console.log("No se edito"));
    },
    clear() {
      this.$v.$reset();
      this.item.name = null;
      this.item.description = null;
    }
  },
  computed: {
    formTitle() {
      return !this.edit ? "Nueva Categoria" : "Editar Categoria";
    },
    alertMessage() {
      return !this.edit
        ? "Categoria guardada exitosamente"
        : "Categoria editada exitosamente";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.minLength &&
        errors.push("El nombre de categoria debe tener mas de 5 caracteres");
      !this.$v.item.name.maxLength &&
        errors.push("El nombre de categoria debe tener maximo 15 caracteres");
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