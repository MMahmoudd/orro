<template>
  <div :class="this.$i18n.locale === 'ar' ? 'wrapper-ar' : 'wrapper'">
    <div class="pages">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
