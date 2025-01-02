import { computed, unref } from 'vue'

export const useNumber = (number) => {
  const isOdd = computed(() => unref(number) % 2 === 1)
  const isEven = computed(() => !isOdd.value)
  console.log(isOdd.value, isEven.value)
  console.log(number.value)

  return {
    isOdd,
    isEven,
  }
}
