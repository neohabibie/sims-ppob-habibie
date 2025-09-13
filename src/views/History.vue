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

    <b-row class="justify-content-center">
      <b-col cols="12" md="8">
        <h5 class="mb-3 font-weight-bold">Semua Transaksi</h5>

        <div v-if="transactions.length">
          <b-list-group>
            <b-list-group-item v-for="t in transactions" :key="t.id" class="d-flex justify-content-between align-items-center">
              <div>
                <div :class="t.transaction_type === 'TOPUP' ? 'text-success font-weight-bold' : 'text-danger font-weight-bold'">
                  {{ t.transaction_type === 'TOPUP' ? '+ ' : '- ' }}{{ formatAmount(t.total_amount) }}
                </div>
                <small class="text-muted">{{ formatDate(t.created_on) }}</small>
              </div>

              <div class="text-muted small">
                {{ t.description || t.transaction_type || 'Transaksi' }}
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>

        <div v-else class="text-center py-4 text-muted">Belum ada transaksi</div>

        <!-- Show more -->
        <div class="text-center mt-3">
          <b-link v-if="!allLoaded" href="#" class="text-danger" @click.prevent="showMore">
            Show more
          </b-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import api from '../services/api';
export default {
  data() {
    return {
      transactions: [],
      limit: 5,
      offset: 0,
      allLoaded: false,
      profile: {},
      balance: 0,
      showBalance: true,
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
    await this.load();
  },

  methods: {
    async load() {
      try {
        const [p, b] = await Promise.all([
          api.get('/profile'),
          api.get('/balance'),
        ]);
        this.profile = p.data.data || {}
        this.balance = (b.data && b.data.data.balance) ? b.data.data.balance : 0

        const res = await api.get('/transaction/history', {
          params: {
            limit: this.limit,
            offset: this.offset
          }
        });
        const items = (res.data && res.data.data.records) ? res.data.data.records : [];
        this.transactions.push(...items);
        if (items.length < this.limit) this.allLoaded = true;
      } catch (e) {
        console.error(e);
      }
    },

    toggleBalance() {
      this.showBalance = !this.showBalance;
    },

    showMore() {
      this.offset += this.limit;
      this.load();
    },

    formatDate(dates) {
      return dates ? new Date(dates).toLocaleString('id-ID'): '-';
    },
    
    formatAmount(a) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(a || 0);
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
</style>
