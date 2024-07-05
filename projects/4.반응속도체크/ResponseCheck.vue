<script>
  let startTime = 0;
  let endTime = 0;
  let timeout = null;
  let clearTimeout = (timeout) => {
    timeout = null;
  }
  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message: '클릭해서 시작하세요.',
      }
    },
    computed: {
      avergae() {
        return this.result.reduce((a, c)=> a + c, 0) / this.result.length || 0;
      }
    },
    methods: {
      onReset() {
        this.result = [];
      },
      onClickScreen() {
        if (this.state === 'waiting') {
          this.state = 'ready';
          this.message = '노란색이 되면 클릭하세요.';
          timeout = setTimeout(() => {
            this.state = 'now';
            this.message = '지금 클릭';
            startTime = new Date().getTime();
          }, Math.floor(Math.random() * 1000) + 2000);
        } else if (this.state === 'ready') {
          clearTimeout(timeout);
          this.state = 'waiting';
          this.message = '노란색이 된 후에 클릭하세요.';
        } else if (this.state === 'now') {
          endTime = new Date().getTime();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요.';
          this.result.push(endTime - startTime);
        }
      }
    }
  };
</script>

<template>
  <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
  <div v-show="result.length">
    <div>평균 시간: {{avergae}}ms</div>
    <button @click="onReset">리셋</button>
  </div>
</template>

<style scoped>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting {
    background-color: cyan;
  }
  #screen.ready {
    background-color: magenta;
    color: white;
  }
  #screen.now {
    background-color: yellow;
  }
</style>