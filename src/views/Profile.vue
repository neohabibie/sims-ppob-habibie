<template>
  <div class="profile-page text-center">
    <div class="avatar-wrapper">
      <img :src="imgPreview" class="avatar-img" @click="pickFile" />
      <b-icon-pencil class="edit-icon" @click="pickFile"/>
    </div>

    <h4 class="mt-3">{{ profile.first_name }} {{ profile.last_name }}</h4>

    <p class="text-muted">{{ profile.email }}</p>

    <b-form @submit.prevent="saveProfile" class="profile-form mt-4 text-left">
      <b-form-group label="Email">
        <b-form-input v-model="form.email" type="email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Nama Depan">
        <b-form-input v-model="form.first_name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Nama Belakang">
        <b-form-input v-model="form.last_name" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="danger" block>Edit Profil</b-button>
      <b-button variant="outline-danger" block class="mt-3" @click="logout">Logout</b-button>
    </b-form>

    <input ref="file" type="file" accept="image/*" style="display:none" @change="uploadImage" />
  </div>
</template>

<script>
  import api from '../services/api';
  import {
    imageSizeUnder
  } from '../utils/validators';
  export default {
    data() {
      return {
        profile: {},
        form: {},
        editing: false,
        imgPreview: require('../assets/default-avatar.png')
      }
    },
    async created() {
      await this.loadProfile();
    },
    methods: {
      async loadProfile() {
        try {
          const res = await api.get('/profile');
          this.profile = res.data.data || {};
          this.form = {
            first_name: this.profile.first_name,
            last_name: this.profile.last_name,
            email: this.profile.email
          };
          if (this.profile.profile_image) this.imgPreview = this.profile.profile_image;
        } catch (e) {
          console.error(e);
        }
      },

      startEdit() {
        this.editing = true;
      },

      cancelEdit() {
        this.editing = false;
        this.form = {
          first_name: this.profile.first_name,
          last_name: this.profile.last_name,
          email: this.profile.email
        };
      },

      pickFile() {
        this.$refs.file.click();
      },

      async uploadImage(e) {
        const pict = e.target.files[0];
        if (!pict) return;
        if (!imageSizeUnder(pict, 100)) {
          return this.$bvToast.toast('Ukuran file melebihi 100 KB', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay:3000
          });
        }

        const fd = new FormData();
        fd.append('file', pict);
        try {
          const res = await api.put('/profile/image', fd);
          if (res.data && res.data.status === 0) {
            this.$bvToast.toast('Foto profil berhasil diupdate', {
              title: 'Sukses',
              variant: 'success',
              autoHideDelay:2000
            });
            setTimeout(() => {
              this.loadProfile();
            }, 2000);
          } else {
            this.$bvToast.toast(res.data.message || 'Gagal update foto', {
              title: 'Error',
              variant: 'danger',
              autoHideDelay:3000
            });
          }
        } catch (err) {
          this.$bvToast.toast(
            (err.response && err.response.data && err.response.data.message) || 'Error upload', {
              title: 'Error',
              variant: 'danger',
              autoHideDelay:3000
            });
        }
      },

      async saveProfile() {
        try {
          const res = await api.put('/profile/update', this.form);
          if (res.data && res.data.status === 0) {
            this.$bvToast.toast('Profile disimpan', {
              title: 'Sukses',
              variant: 'success',
              autoHideDelay: 2000,
            });
            setTimeout(() => {
              this.editing = false;
              this.loadProfile();
            }, 2000);
          } else this.$bvToast.toast(res.data.message || 'Gagal menyimpan', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay:3000
          });
        } catch (e) {
          this.$bvToast.toast('Error menyimpan profile', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay:3000
          });
        }
      },

      logout() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .profile-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .avatar-wrapper {
    position: relative;
    display: inline-block;
  }
  .avatar-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    border: 3px solid #eee;
  }
  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
    border-radius: 50%;
    padding: 5px;
    font-size: 30px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
  .profile-form {
    margin-top: 30px;
}
</style>