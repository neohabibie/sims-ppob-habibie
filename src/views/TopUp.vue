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
        <h5 class="mb-3">Silahkan masukan</h5>
        <h3 class="mb-4 font-weight-bold">Nominal Top Up</h3>

        <b-input-group class="mb-3">
          <b-input-group-prepend is-text>
            <i class="fa-solid fa-money-bill-transfer"></i>
          </b-input-group-prepend>

          <b-form-input v-model="nominal" type="number" placeholder="10.000"/>
        </b-input-group>

        <div class="d-flex flex-wrap mb-3">
          <b-button v-for="p in presets" :key="p" class="mr-2 mb-2" variant="outline-secondary" @click="setPreset(p)">
            {{ format(p) }}
          </b-button>
        </div>

        <b-button :disabled="!isValid || isLoading" variant="danger" block @click="submitTopUp">
          <b-spinner v-if="isLoading" small type="border" class="mr-2"></b-spinner> Top Up
        </b-button>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import api from "../services/api";
  import { amountValid } from "../utils/validators";

  export default {
    data() {
      return {
        nominal: "",
        presets: [10000, 20000, 50000, 100000, 250000, 500000],
        isLoading: false,
        profile: {},
        balance: 0,
        showBalance: true,
      };
    },

    computed: {
      isValid() {
        return amountValid(this.nominal, 10000, 1000000);
      },

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
          ])

          this.profile = p.data.data || {}
          this.balance = (b.data && b.data.data.balance) ? b.data.data.balance : 0
        } catch (e) {
          console.error(e)
        }
      },

      toggleBalance() {
        this.showBalance = !this.showBalance;
      },
      
      format(n) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(n);
      },

      setPreset(n) {
        this.nominal = n;
      },
      async submitTopUp() {
        if (!this.isValid) {
          return this.$bvToast.toast("Nominal tidak valid", {
            title: "Error",
            variant: "danger",
            autoHideDelay: 3000,
          });
        }

        this.isLoading = true;
        try {
          const res = await api.post("/topup", {
            top_up_amount: Number(this.nominal),
          });

          if (res.data && res.data.status === 0) {
            this.$bvToast.toast(res.data.message || "Top Up berhasil", {
              title: "Sukses",
              variant: "success",
              autoHideDelay: 2000,
            });
            setTimeout(() => {
              this.$router.push("/history");
            }, 2000);
          } else {
            this.$bvToast.toast(res.data.message || "Topup gagal", {
              title: "Error",
              variant: "danger",
              autoHideDelay: 3000,
            });
          }
        } catch (e) {
          this.$bvToast.toast(
            (e.response && e.response.data && e.response.data.message) ||
              "Error saat topup",
            {
              title: "Error",
              variant: "danger",
              autoHideDelay: 3000,
            }
          );
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>

<style scoped>
  .saldo-card {
    background-image: url('../assets/Background_Saldo.png');
    border-radius: 16px;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 120px;
  }
  .avatar-lg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
