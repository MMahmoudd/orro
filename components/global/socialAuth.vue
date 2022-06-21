<template>
  <div class="socialLogin-component">
    <facebook-login class="button"
      appId="3215196338756310"
      @login="getUserData"
      @logout="onLogout"
      @get-initial-status="getUserData"
      >
    </facebook-login>
  </div>
</template>
<script>
import facebookLogin from 'facebook-login-vuejs';
export default {
  components: {
        facebookLogin
    },
  data() {
    return {
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      FB: undefined
    };
  },
  computed: {
  },
  methods: {
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
        }
      )
      console.log('this.FB', this.FB)
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
};
</script>
