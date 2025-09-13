<!-- <template>
  <b-row class="justify-content-center mt-5">
    <b-col cols="10" md="5">
      <b-card title="Login HIS PPOB">
        <b-form @submit.prevent="onSubmit">

          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Password">
            <b-form-input v-model="password" type="password" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </b-button>

          <b-button variant="link" @click="$router.push('/register')">Daftar</b-button>

        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  import api from '../services/api';
  import { required } from '../utils/validators';

  export default {
    data() {
      return {
        email: '',
        password: '',
        loading: false
      }
    },

    methods: {
      async onSubmit() {
        if (!required(this.email) || !required(this.password)) {
          return this.$bvToast.toast('Semua field wajib diisi', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 2000,
          });
        }

        this.loading = true;

        try {
          const res = await api.post('/login', {
            email: this.email,
            password: this.password
          });

          if (res.data && res.data.status === 0) {
            const token = res.data.data.token;
            
            this.$store.commit('auth/setToken', token);
            localStorage.setItem('token', token);

            this.$bvToast.toast('Login Berhasil', {
              title: 'Sukses',
              variant: 'success',
              autoHideDelay: 2000,
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          } else {
            this.$bvToast.toast('Login Gagal', {
              title: res.data.message || 'Login Gagal',
              variant: 'danger',
              autoHideDelay: 3000,
            });
          }
          
        } catch (e) {
          this.$bvToast.toast('Login Gagal', {
            title: (e.response && e.response.data && e.response.data.message) || 'Terjadi Error Login',
            variant: 'danger',
            autoHideDelay: 3000,
          });
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script> -->

<template>
  <div class="d-flex min-vh-100">

    <div class="d-flex flex-column justify-content-center align-items-center flex-fill p-5 bg-white">
      <div class="w-100" style="max-width: 400px;">

        <div class="text-center">
          <div class="align-items-center mb-4">
            <img src="../assets/Logo.png" alt="logo" style="height: 32px;" class="mr-2">
            <span class="h5 mb-0 font-weight-bold">SIMS PPOB</span>
          </div>
  
          <h2 class="mb-4 font-weight-bold">
            Masuk atau buat akun<br>untuk memulai
          </h2>
        </div>

        <b-form @submit.prevent="onSubmit">
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend is-text>
                <i class="fas fa-envelope text-muted"></i>
              </b-input-group-prepend>

              <b-form-input v-model="email" type="email" placeholder="masukan email anda" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group>
            <b-input-group>
              <b-input-group-prepend is-text>
                <i class="fas fa-lock text-muted"></i>
              </b-input-group-prepend>

              <b-form-input v-model="password" type="password" placeholder="masukan password anda" required></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-button type="submit" block class="mb-3" variant="danger" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </b-button>

          <p class="text-center text-muted">
            belum punya akun? registrasi
            <a href="javascript:void(0)" @click="$router.push('/register')" class="text-danger font-weight-bold">
              di sini
            </a>
          </p>
        </b-form>
      </div>
    </div>

    <!-- <div class="d-none d-md-flex flex-fill bg-pink justify-content-center align-items-center">
      <img src="../assets/Illustrasi_Login.png" alt="illustration" class="img-fluid" style="max-width: 500px; width: 100%;">
    </div> -->
    <div class="d-none d-md-flex flex-fill bg-pink justify-content-center align-items-center illustration-bg"></div>

  </div>
</template>

<script>
import api from '../services/api';
import { required } from '../utils/validators';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },

  methods: {
    async onSubmit() {
      if (!required(this.email) || !required(this.password)) {
        return this.$bvToast.toast('Semua field wajib diisi', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 2000,
        });
      }
      
      this.loading = true;

      try {
        const res = await api.post('/login', {
          email: this.email,
          password: this.password
        });

        if (res.data && res.data.status === 0) {
          const token = res.data.data.token;

          this.$store.commit('auth/setToken', token);
          localStorage.setItem('token', token);

          this.$bvToast.toast('Login Berhasil', {
            title: 'Sukses',
            variant: 'success',
            autoHideDelay: 2000,
          });

          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        } else {
          this.$bvToast.toast('Login Gagal', {
            title: res.data.message || 'Login Gagal',
            variant: 'danger',
            autoHideDelay: 3000,
          });
        }

      } catch (e) {
        this.$bvToast.toast('Login Gagal', {
          title: (e.response && e.response.data && e.response.data.message) || 'Terjadi Error Login',
          variant: 'danger',
          autoHideDelay: 3000,
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
  .min-vh-100 {
    min-height: 100vh;
  }
  .bg-pink {
    background-color: #FFF6F6;
  }
  .illustration-bg {
    background-image: url('../assets/Illustrasi_Login.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
</style>
