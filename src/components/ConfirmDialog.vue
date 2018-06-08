<template lang="pug">
  v-dialog(v-model='dialog', :max-width='290', @keydown.esc='cancel()')
    v-card(tile='')
      v-card-title.headline {{title}}
      v-card-text(v-show='!!message') {{ message }}
      v-card-actions
        v-spacer
        v-btn(color='primary darken-1', flat='flat', @click.native='agree()') Si
        v-btn(color='primary darken-1', flat='flat', @click.native='cancel()') Cancelar
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: "primary",
      width: 290
    }
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      // this.options = Object.assign(this.options, options);

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    agree() {
      this.resolve(true);
      this.dialog = false;
    },

    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
</script>
