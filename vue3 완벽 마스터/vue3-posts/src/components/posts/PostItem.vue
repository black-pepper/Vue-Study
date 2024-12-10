<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <a class="text-muted">{{ createdAt }}</a>
  </AppCard>
</template>

<script setup>
import AppCard from '../AppCard.vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [String, Date, Number],
  },
})
</script>

<style lang="scss" scoped></style>
