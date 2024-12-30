<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <a class="text-muted">{{ createdAt }}</a>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-back"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
            />
          </svg>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import AppCard from '../app/AppCard.vue'
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
defineEmits(['modal'])
</script>

<style lang="scss" scoped></style>
