<template>
  <div class="service-item" @click="$emit('select', service)">
    <div class="icon-wrapper">
      <img 
        v-if="service.service_icon" 
        :src="service.service_icon" 
        alt="icon" 
      />
      <div v-else class="fallback-icon">
        {{ service.service_name ? service.service_name.charAt(0) : '' }}
      </div>
    </div>

    <div class="service-name">
      {{ service.service_name }}
    </div>
    
    <!-- Hidden karena di desain ga ada -->
    <!-- <div class="service-price">{{ priceDisplay }}</div> -->
  </div>
</template>

<script>
  export default {
    props: {
      service: {
        type: Object,
        required: true
      }
    },

    computed: {
      priceDisplay() {
        const p = (this.service && this.service.service_tariff) ? this.service.service_tariff : 0;
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(p);
      }
    }
  }
</script>

<style scoped>
.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  padding: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
}

.service-item:hover {
  transform: translateY(-3px);
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.fallback-icon {
  font-size: 20px;
  font-weight: 700;
  color: #374151;
}

.service-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.service-price {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}
</style>
