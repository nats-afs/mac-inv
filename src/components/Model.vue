<template lang="pug">
  div
    v-snackbar(:timeout='timeout', :color='color', :top='true', :right='true', :multi-line="mode === 'multi-line'", :vertical="mode === 'vertical'", :value='visible')
      | {{ message }}
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
      visible: "models/isVisible",
      message: "models/getMessage"
    })
  }
};
</script>

<style>
</style>