<template>
  <div class="login-component">
    <div class="row">
      <div class="col-md-6 m-0 p-0">
        <div class="img">
          <img src="../../assets/images/orroWhite.png" alt="login image" />
          <h1 class="title mt-5">Hi, Welcome</h1>
        </div>
      </div>
      <div class="col-md-6 m-0 p-0">
        <div class="login-form">
          <b-form @submit.prevent="onSubmit()" v-if="show">
            <h2 class="header-section text-center">{{ $t("login.login") }}</h2>
            <b-form-group
              id="input-group-1"
              label-for="input-1"
              class="mt-5 text-left"
              :description="$t('login.emailDescription')"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                :placeholder="$t('login.emailPlaceholder')"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                :placeholder="$t('login.passwordPlaceholder')"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit">{{ $t("login.login") }}</b-button>
            <socialAuth />
            <p class="social">
              {{ $t("login.continueWith")}}
              <i @click="completeAuth(facebook)" class="fab fa-facebook"></i>
              {{ $t("login.or") }}
              <i @click="completeAuth(google)" class="fab fa-google"></i>
            </p>
            <div class="register">
              <nuxt-link :to="localePath(`/register`)">
                {{ $t("register.createNew") }}</nuxt-link
              >
            </div>
            <div class="mt-5">
              <b-alert
                v-if="loginErrorMessage"
                show
                class="text-center alert"
                dismissible
                variant="danger"
              >
                {{ loginErrorMessage }}
                <nuxt-link :to="localePath(this.$i18n.locale + '/')">
                  {{ $t("global.goToHome") }}
                </nuxt-link>
              </b-alert>
            </div>
          </b-form>
        </div>
      </div>
    </div>
        <!-- <b-modal v-model="showDetails" size="l" centered title="BootstrapVue">
      <template #modal-header>
        <div></div>
      </template>
      <b-button
        class="close"
        size="sm"
        variant="outline-danger"
        @click="close()"
      >
        <i class="fas fa-times"></i>
      </b-button>

    </b-modal> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import socialAuth from "../global/socialAuth.vue";
export default {
  components: {
    socialAuth,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDetails: false,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.login.isLoading,
      loginErrorMessage: (state) => state.login.loginErrorMessage,
      loginSuccessful: (state) => state.login.loggingIn,
    }),
  },
  methods: {
    ...mapActions(["doLogin"]),
    onSubmit(event) {
      this.$store.dispatch("doLogin", {
        email: this.form.email.split(" ").join(""),
        password: this.form.password,
      });
    },
  },
};
</script>
