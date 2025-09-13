<template>
  <div id="app" class="app-root">

    <layout-navbar v-if="$route.meta.requiresAuth"></layout-navbar>

    <b-container fluid class="p-3">
      <router-view />
    </b-container>

  </div>
</template>

<script>
  import LayoutNavbar from './components/LayoutNavbar.vue';

  export default {
    components: {
      LayoutNavbar
    }
  };
</script>

<style>
  .app-root {
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    background: #f5f7fb;
    min-height: 100vh;
  }
  .card-elevated {
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(24, 39, 75, 0.06);
    padding: 16px;
    background: #fff;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-gap: 12px;
  }
  .service-item {
    border-radius: 10px;
    padding: 12px;
    text-align: center;
    cursor: pointer;
    transition: transform .12s ease, box-shadow .12s ease;
    background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  }
  .service-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(15, 44, 84, 0.08);
  }
  .nav-profile {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .avatar-sm {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .logo-sm {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .banner-carousel {
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
  }
  .big-action {
    border-radius: 10px;
    padding: 10px 18px;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    .banner-carousel {
      height: 140px;
    }
  }
</style>