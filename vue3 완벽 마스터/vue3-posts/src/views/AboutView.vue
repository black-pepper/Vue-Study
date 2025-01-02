<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">Home으로 이동</button>
    <h2>Store</h2>
    <p>counter: {{ counter }}</p>
    <p>doubleCounter: {{ doubleCount }}</p>
    <p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
    <button @click="increment()">Click!!</button>
  </div>
</template>

<script setup>
import { useCounterStroe } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('route.path: ', route.path)

const store = useCounterStroe()
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store) //state, getters
const { increment } = store //actions
counter.value = 100
</script>

<style></style>
