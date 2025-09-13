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

    <b-card class="payment-card">
      <div v-if="service">
        <p class="mb-2 font-weight-bold">Pembayaran</p>
        <div class="d-flex align-items-center mb-3">
          <b-avatar :src="service.service_icon" class="mr-2"></b-avatar>
          <strong>{{ service.service_name }}</strong>
        </div>

        <b-input-group class="mb-3">
          <b-input-group-prepend is-text>
            <i class="fa-solid fa-money-bill-transfer"></i>
          </b-input-group-prepend>

          <b-form-input v-model="amount" placeholder="Masukkan nominal" type="number" />
        </b-input-group>

        <b-button block class="btn-bayar" size="lg" @click="doPayment">
          Bayar
        </b-button>
      </div>

      <div v-else>
        <p>Service belum dipilih. Kembali ke Home untuk memilih layanan.</p>
        <b-button @click="$router.push('/home')">Kembali ke Home</b-button>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      profile: {},
      balance: 0,
      showBalance: true,
      service: null,
      amount: null,
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
    const sid = this.$route.query.service_code;
    try {
      const [p, b] = await Promise.all([
        api.get('/profile'),
        api.get('/balance')
      ]);
      this.profile = p.data.data || {};
      this.balance = (b.data && b.data.data.balance) ? b.data.data.balance : 0;

      if (sid) {
        const res = await api.get('/services');
        const services = Array.isArray(res.data.data) ? res.data.data : [];
        this.service = services.find(s => String(s.service_code) === String(sid));
        this.amount = this.service.service_tariff;
      }
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    toggleBalance() {
      this.showBalance = !this.showBalance;
    },

    async doPayment() {
      if (!this.service || !this.amount) {
        this.$bvToast.toast('Masukkan nominal terlebih dahulu', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 3000
        });
        return;
      }

      try {
        const res = await api.post('/transaction', {
          service_code: this.service.service_code,
          amount: this.amount
        });

        if (res.data && res.data.status === 0) {
          this.$bvToast.toast('Pembayaran sukses', {
            title: 'Sukses',
            variant: 'success',
            autoHideDelay: 2000
          });
          setTimeout(() => this.$router.push("/history"), 2000);
        } else {
          this.$bvToast.toast(res.data.message || 'Gagal bayar', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 3000
          });
        }
      } catch (e) {
        this.$bvToast.toast('Error saat pembayaran', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 3000
        });
      }
    }
  }
}
</script>

<style scoped>
  .saldo-card {
    background-image: url('../assets/Background_Saldo.png');
    border-radius: 16px;
    background-repeat: no-repeat;
    background-position: right;
    min-height: 120px;
  }
  .avatar-lg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .payment-card {
    border-radius: 12px;
    padding: 20px;
  }
  .btn-bayar {
    background: #f44336;
    border: none;
    font-weight: bold;
  }
  .btn-bayar:hover {
    background: #d32f2f;
  }
</style>
