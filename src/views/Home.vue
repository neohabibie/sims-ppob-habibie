<template>
  <b-container>
    <b-row class="mb-4">
      <b-col cols="12" md="8">
        <div class="d-flex align-items-center">
          <img :src="userImage" class="avatar-lg mr-3" />
          <div>
            <h5 class="mb-1">Selamat datang,</h5>
            <h3 class="font-weight-bold">{{ profile.first_name }} {{ profile.last_name }}</h3>
          </div>
        </div>
      </b-col>

      <b-col cols="12" md="4">
        <b-card class="saldo-card text-white p-3 d-flex flex-column justify-content-between">
          <div>
            <small>Saldo anda</small>
            <h3 class="mb-0">{{ showBalance ? balanceDisplay : 'Rp ••••••••' }}</h3>
          </div>
          <b-link class="text-white mt-2" href="#" @click.prevent="toggleBalance">
            {{ showBalance ? 'Sembunyikan' : 'Lihat Saldo' }}
            <i :class="showBalance ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </b-link>
        </b-card>
      </b-col>
    </b-row>

    <!-- <b-card class="mt-4 card-elevated mx-3">
      <div class="services-grid">
        <service-card v-for="s in services" :key="s.id" :service="s" @select="selectService"/>
      </div>
    </b-card> -->

    <div class="services-grid my-4">
      <service-card v-for="s in services" :key="s.id" :service="s" @select="selectService"/>
    </div>

    <div class="mt-3 mx-5">
      <banner-slider :banners="banners" />
    </div>
  </b-container>
</template>

<script>
import api from '../services/api'
import LayoutNavbar from '../components/LayoutNavbar.vue'
import BannerSlider from '../components/BannerSlider.vue'
import ServiceCard from '../components/ServiceCard.vue'

export default {
  components: {
    LayoutNavbar,
    BannerSlider,
    ServiceCard
  },

  data() {
    return {
      banners: [],
      services: [],
      profile: {},
      balance: 0,
      showBalance: false,
    }
  },

  computed: {
    userImage() {
      return this.profile.profile_image
        ? this.profile.profile_image
        : require('../assets/default-avatar.png')
    },

    balanceDisplay() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.balance || 0)
    }
  },

  async created() {
    await this.loadAll()
  },

  methods: {
    async loadAll() {
      try {
        const [p, b, s, bn] = await Promise.all([
          api.get('/profile'),
          api.get('/balance'),
          api.get('/services'),
          api.get('/banner')
        ])

        this.profile = p.data.data || {}
        this.balance = (b.data && b.data.data.balance) ? b.data.data.balance : 0
        this.services = (s.data && s.data.data) ? s.data.data : []
        this.banners = (bn.data && bn.data.data) ? bn.data.data : []
      } catch (e) {
        console.error(e)
      }
    },

    selectService(s) {
      this.$router.push({
        path: '/payment',
        query: { service_code: s.service_code }
      })
    },

    toggleBalance() {
      this.showBalance = !this.showBalance
    }
  }
}
</script>

<style scoped>
  .saldo-card {
    background-image: url('../assets/Background_Saldo.png');
    border-radius: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-width: 300px;
    max-width: 500px;
  }
  .avatar-lg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 20px;
    text-align: center;
  }
</style>

