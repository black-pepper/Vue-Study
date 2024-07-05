<script>
export default {
  data() {
    return {
      word: "시작",
      value: '',
      result: '',
    }
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
      if (this.word[this.word.length - 1] === this.value[0]) {
        this.result = '정답';
        this.word = this.value;
      } else {
        this.result = '오답';
      }
      this.value = '';
      this.$refs.answer.focus();
    }
  }
}
</script>

<template>
  <div>현재 단어: {{ word }}</div>
  <form v-on:submit="onSubmitForm">
    <input v-model="value" ref="answer"/>
    <button type="submit">입력</button>
  </form>
  <div id="result">{{result}}</div>
</template>
