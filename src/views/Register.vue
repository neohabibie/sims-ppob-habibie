<!-- <template>
  <b-row class="justify-content-center mt-4">
    <b-col cols="10" md="6">
      <b-card title="Registrasi">
        <b-form @submit.prevent="onRegister">

          <b-form-group label="Nama Depan">
            <b-form-input v-model="first_name" required></b-form-input>
          </b-form-group>

          <b-form-group label="Nama Belakang">
            <b-form-input v-model="last_name" required></b-form-input>
          </b-form-group>

          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Password">
            <b-form-input v-model="password" type="password" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success">Registrasi</b-button>

        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  import api from '../services/api';

  export default {
    data() {
      return {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    },

    methods: {
      async onRegister() {
        if (!this.first_name || !this.last_name || !this.email || !this.password) return alert('Semua field wajib diisi');

        try {
          const res = await api.post('/registration', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password
          });

          if (res.data && res.data.status === 0) {
            this.$bvToast.toast('Registrasi Berhasil, Silahkan Login.', {
              title: 'Sukses',
              variant: 'success',
              autoHideDelay: 2000,
            });
            setTimeout(() => {
              this.$router.push("/login");
            }, 2000);
          } else {
            this.$bvToast.toast('Login Gagal', {
              title: res.data.message || 'Gagal Registrasi',
              variant: 'danger',
              autoHideDelay: 3000,
            });
          } 
        } catch (e) {
          // alert((e.response && e.response.data && e.response.data.message) || 'Terjadi error registrasi');
          this.$bvToast.toast('Registrasi Gagal', {
            title: (e.response && e.response.data && e.response.data.message) || 'Terjadi Error Registrasi',
            variant: 'danger',
            autoHideDelay: 3000,
          });
        }
      }
    }
  }
</script> -->

<template>
  <div class="d-flex min-vh-100">

    <div class="d-flex flex-column justify-content-center align-items-center flex-fill p-5 bg-white">
      <div class="w-100" style="max-width: 400px;">
        
        <div class="text-center mb-4">
          <img src="../assets/Logo.png" alt="logo" style="height: 40px;" class="mb-2">
          <div class="h5 font-weight-bold">SIMS PPOB</div>
        </div>

        <h2 class="mb-4 font-weight-bold text-center">
          Lengkapi data untuk<br>membuat akun
        </h2>

        <b-form @submit.prevent="onRegister">
          <b-form-group>
            <b-form-input v-model="first_name" placeholder="nama depan" required></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input v-model="last_name" placeholder="nama belakang" required></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input v-model="email" type="email" placeholder="masukan email anda" required></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input v-model="password" type="password" placeholder="buat password" required></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-input v-model="confirmPassword" type="password" placeholder="konfirmasi password" required></b-form-input>
          </b-form-group>

          <b-button type="submit" block class="mb-3 rounded" variant="danger" :disabled="loading">
            {{ loading ? 'Memproses...' : 'Registrasi' }}
          </b-button>

          <p class="text-center text-muted">
            sudah punya akun? login
            <a href="javascript:void(0)" @click="$router.push('/login')" class="text-danger font-weight-bold">
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

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false
    }
  },

  methods: {
    async onRegister() {
      if (!this.first_name || !this.last_name || !this.email || !this.password || !this.confirmPassword) {
        return this.$bvToast.toast('Semua field wajib diisi', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 2000,
        });
      }

      if (this.password !== this.confirmPassword) {
        return this.$bvToast.toast('Password dan konfirmasi tidak sama', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 2000,
        });
      }

      this.loading = true;
      try {
        const res = await api.post('/registration', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        });

        if (res.data && res.data.status === 0) {
          this.$bvToast.toast('Registrasi Berhasil, Silahkan Login.', {
            title: 'Sukses',
            variant: 'success',
            autoHideDelay: 2000,
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } else {
          this.$bvToast.toast(res.data.message || 'Gagal Registrasi', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 3000,
          });
        } 
      } catch (e) {
        this.$bvToast.toast('Registrasi Gagal', {
          title: (e.response && e.response.data && e.response.data.message) || 'Terjadi Error Registrasi',
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
