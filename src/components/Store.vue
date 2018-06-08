<template lang="pug">
  div
    v-snackbar(:timeout='timeout', :color='color', :top='true', :right='true', :multi-line="mode === 'multi-line'", :vertical="mode === 'vertical'", :value='visible')
      | {{ message }}
    v-layout(row, wrap, justify-space-between)
      v-flex(xs12, sm12, md4)
        router-view(name="form")
      v-flex(xs12, sm12, md8)
        router-view

</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    color: "success",
    mode: "",
    timeout: 6000
  }),
  computed: {
    ...mapGetters({
      visible: "store/isVisible",
      message: "store/getMessage"
    })
  }
};
</script>

<style>
</style>