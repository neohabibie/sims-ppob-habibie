<template>
  <div class="banner-slider">
    <h6 class="mb-3 font-weight-bold">Temukan promo menarik</h6>
    <div class="slider-container">
      <div v-for="(b, i) in banners" :key="i" class="slider-item">
        <img :src="b.banner_image || '/default-banner.png'" :alt="b.banner_name" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BannerSlider",
    props: {
      banners: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style scoped>
  .slider-container {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 10px;
  }
  .slider-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
  .slider-item img {
    width: 280px;
    height: 140px;
    object-fit: cover;
    border-radius: 12px;
  }
</style>