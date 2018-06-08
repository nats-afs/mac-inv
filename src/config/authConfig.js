import {
  firebaseAuth
} from './firebaseConfig'
import firebaseui from 'firebaseui'

// FirebaseUI config.
export const uiAuthConfig = {
  signInSuccessUrl: '/success',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebaseAuth.PhoneAuthProvider.PROVIDER_ID,
    {
      provider: firebaseAuth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  // Terms of service url.
  // tosUrl: '<your-tos-url>'
};


export const uiAuth = new firebaseui.auth.AuthUI(firebaseAuth());