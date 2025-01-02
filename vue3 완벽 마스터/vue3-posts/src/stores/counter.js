import { defineStore } from 'pinia'

export const useCounterStroe = defineStore('counter', {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1 //일반 함수 사용
    },
  },
  actions: {
    increment() {
      this.counter++ //일반 함수 사용
    },
  },
})
