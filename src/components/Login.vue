<template lang="pug">
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          v-card.elevation-12
            v-toolbar(dark, color='primary')
              v-toolbar-title Login
              v-spacer
            v-card-text
              v-form
                v-text-field(v-model="user",prepend-icon='person', name='login', label='Login', type='text')
                v-text-field#password(v-model="password",prepend-icon='lock', name='password', label='Password', type='password')
            v-card-actions
              v-spacer
              v-btn(color='primary',@click="login") Login
</template>
<script>
import { firebaseAuth } from "@/config/firebaseConfig";
export default {
  data: () => ({
    user: null,
    password: null
  }),
  methods: {
    login() {
      console.log("Login...");
      firebaseAuth()
        .signInWithEmailAndPassword(this.user, this.password)
        .then(user => {
          console.log("Usuario autentij");
        })
        .catch(error => {
          let errorCode = error.error;
          let errorMessage = error.message;
        });
    }
  }
};
</script>
