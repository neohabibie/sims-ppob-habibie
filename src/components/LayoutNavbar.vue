<template>
  <b-navbar toggleable="md" type="light" variant="white" class="mb-3">
    <b-navbar-brand href="/" class="font-weight-bold"><img src="../assets/Logo.png" class="logo-sm" alt="Logo"/> SIMS PPOB</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto align-items-center">
        <div class="nav-profile mr-3">

          <!-- 
          <img :src="avatar" class="avatar-sm" alt="avatar" /> 
           <div>
            <div style="font-size:13px;color:#6b7280">Halo,</div>
            <div style="font-weight:600">{{ profile.first_name || 'User' }}</div>
          </div> 
          -->
        </div>

        <b-nav-item>
          <b-link class="text-danger mr-5" href="#" @click.prevent="$router.push('/topup')">Top Up</b-link>
          <b-link class="text-danger mr-3" href="#" @click.prevent="$router.push('/history')">Transaction</b-link>
          <!-- <b-link class="text-danger mr-5" href="#" @click.prevent="$router.push('/profile')">Akun</b-link> -->

          <!-- <b-button variant="outline-primary" size="sm" @click="$router.push('/topup')" class="big-action"> Saldo: {{ balanceDisplay }}</b-button> -->
        </b-nav-item>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <b-link class="text-danger mr-5" href="#">Akun</b-link>
            <!-- <b-icon icon="three-dots-vertical"></b-icon> -->
          </template>

          <b-dropdown-item @click="$router.push('/profile')">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout" class="text-danger">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
  import api from '../services/api';
  export default {
    data() {
      return {
        profile: {},
        balance: 0
      };
    },

    computed: {
      avatar() {
        return this.profile.profile_image ? this.profile.profile_image : require('../assets/default-avatar.png');
      },

      balanceDisplay() {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(this.balance || 0);
      }
    },

    async created() {
      try {
        const [p, b] = await Promise.all([api.get('/profile'), api.get('/balance')]);
        this.profile = p.data.data || {};
        // this.balance = b.data?.balance ?? 0;
        this.balance = (b.data.data && b.data.data.balance) ? b.data.data.balance : 0;
      } catch (e) {
        console.warn('navbar load:', e);
      }
    },
    
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  }
</script>