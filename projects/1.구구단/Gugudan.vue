<script>
export default {
  data() {
    return {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: '',
      result: '',
    }
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
      if (this.first*this.second == parseInt(this.value)) {
        this.result = "정답";
        this.first = Math.ceil(Math.random() * 9);
        this.second = Math.ceil(Math.random() * 9);
      } else {
        this.result = "오답";
      }
      this.value = '';
      this.$refs.answer.focus();
    }
  }
}
</script>

<template>
  <div>{{ first }}곱하기 {{ second }}는?</div>
  <form v-on:submit="onSubmitForm">
    <input v-model="value" ref="answer"/>
    <button type="submit">입력</button>
  </form>
  <div id="result">{{result}}</div>
</template>
