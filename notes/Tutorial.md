# Vue.js
[Vue.js 튜토리얼](https://v3-docs.vuejs-korea.org/tutorial) 정리
## 선언적 렌더링
- 컴포넌트에서 객체를 반환해야하는 함수 data 옵션을 사용하여 반응형 상태 선언
    ``` javascript
    export default {
      data() {
        return {
          message: '안녕 Vue!'
        }
      }
    }
    ```
- 템플릿에서 속성 사용 (텍스트에 삽입 시 이중 중괄호 사용)
  ``` html
  <h1>{{ message.split('').reverse().join('') }}</h1>
  ```

<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  data() {
    return {
      message: '안녕 Vue!',
      counter: {
        count: 0
      }
    }
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
  <p>숫자 세기: {{ counter.count }}</p>
</template>
```

</div>
</details>

## 속성 바인딩
- 속성을 동적 값에 바인딩 하려면 v-bind 디렉티브 사용
  ``` html
  <div v-bind:id="dynamicId"></div>
  ```
- v-bind 전용 단축 문법
  ``` html
  <div :id="dynamicId"></div>
  ```

<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  data() {
    return {
      titleClass: 'title'
    }
  }
}
</script>

<template>
  <h1 :class="titleClass">나를 빨갛게 만들어 보세요</h1>
</template>

<style>
.title {
  color: red;
}
</style>
```

</div>
</details>

## 이벤트 리스너
- v-on 디렉티브를 사용하여 DOM 이벤트 수신
  ``` html
  <button v-on:click="increment">{{ count }}</button>
  ```
- v-on 전용 단축 문법
  ``` html
  <button @click="increment">{{ count }}</button>
  ```
- 이벤트 리스너 함수는 methods 옵션을 사용해서 선언
  ``` javascript
  export default {
    data() {
        return {
        count: 0
        }
    },
    methods: {
        increment() {
        // 컴포넌트의 count 상태 업데이트
        this.count++
        }
    }
  }
  ```
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<template>
  <button @click="increment">숫자 세기: {{ count }}</button>
</template>
```

</div>
</details>

## 폼(from) 바인딩
- v-bind와 v-on을 함께 사용하면 폼 안의 엘리먼트에 양방향 바인딩 가능
  ``` html
  <input :value="text" @input="onInput">
  ```
- 위 문법을 간편 표기하는 v-model 디렉티브
  ``` html
  <input v-model="text">
  ```
- [가이드 - Form 입력 바인딩](https://v3-docs.vuejs-korea.org/guide/essentials/forms.html)
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  data() {
    return {
      text: ''
    }
  }
}
</script>

<template>
  <input v-model="text" placeholder="여기에 입력하기">
  <p>{{ text }}</p>
</template>
```

</div>
</details>

## 조건부 렌더링
- 엘리먼트를 조건부로 렌더링하기 위해 v-if 디렉티브 사용
  ``` html
  <h1 v-if="awesome">Vue는 굉장해! 엄청나!</h1>
  ```
- v-else 및 v-else-if를 사용하여 조건의 다른 분기 표현
  ``` html
  <h1 v-if="awesome">Vue는 굉장해! 엄청나!</h1>
  <h1 v-else>오 안돼 😢</h1>
  ```
- [가이드 - 조건부 렌더링](https://v3-docs.vuejs-korea.org/guide/essentials/conditional.html)
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  data() {
    return {
      awesome: true
    }
  },
  methods: {
    toggle() {
      this.awesome = !this.awesome
    }
  }
}
</script>

<template>
  <button @click="toggle">토글 버튼</button>
  <h1 v-if="awesome">Vue는 굉장해! 엄청나!</h1>
  <h1 v-else>오 안돼 😢</h1>
</template>
```

</div>
</details>

## 리스트 렌더링
- v-for 디렉티브를 사용하여 자료 배열을 엘리먼트 목록으로 렌더링
  ``` html
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
  ```
- 목록 업데이트 방법
  ``` javascript
  this.todos.push(newTodo) // 변경 메서드 호출
  this.todos = this.todos.filter(/* ... */) //새 배열로 교체
  ```
- [가이드 - 리스트 렌더링](https://v3-docs.vuejs-korea.org/guide/essentials/list.html)
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
// 각 할 일에 고유한 ID 부여
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { id: id++, text: 'HTML 배우기' },
        { id: id++, text: 'JavaScript 배우기' },
        { id: id++, text: 'Vue 배우기' }
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>할 일 추가</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```

</div>
</details>

## 계산된 속성
- computed 옵션을 사용하여 반응적으로 계산되는 속성을 선언
  ``` javascript
  export default {
    // ...
    computed: {
      filteredTodos() {
        // `this.hideCompleted`를
        // 기반으로 필터링된 할 일 반환
      }
    }
  }
  ```
  ``` diff
  - <li v-for="todo in todos">
  + <li v-for="todo in filteredTodos">
  ```
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      todos: [
        { id: id++, text: 'HTML 배우기', done: true },
        { id: id++, text: 'JavaScript 배우기', done: true },
        { id: id++, text: 'Vue 배우기', done: false }
      ]
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

</div>
</details>

## 생명주기와 템플릿 참조
- DOM을 수동으로 작업해야 하는 경우 ref를 사용하여 템플릿 참조를 요청
- this.\$refs에 this.$refs.p로 노출되며, 컴포넌트가 마운트된 후에만 접근 가능
  ```html
  <p ref="p">안녕</p>
  ```
- 마운트된 후 코드를 실행하려면 moudted 옵션 사용
  ``` javascript
  export default {
    mounted() {
      // 이제 컴포넌트가 마운트되었습니다.
    }
  }
  ```
- [가이드 - 생명 주기 표](https://v3-docs.vuejs-korea.org/guide/essentials/lifecycle.html#lifecycle-diagram)
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  mounted() {
    this.$refs.p.textContent = '마운트 되었어요!'
  }
}
</script>

<template>
  <p ref="p">안녕</p>
</template>
```

</div>
</details>

## 감시자
- watch(감시자)를 사용하여 반응형 사이드 이펙트 수행
  ``` javascript
  export default {
    data() {
      return {
        count: 0
      }
    },
    watch: {
      count(newCount) {
        // 예, console.log()는 사이드 이펙트입니다.
        console.log(`새로 센 숫자 값은: ${newCount}`)
      }
    }
  }
  ```
- [가이드 - 감시자](https://v3-docs.vuejs-korea.org/guide/essentials/watchers.html)
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
export default {
  data() {
    return {
      todoId: 1,
      todoData: null
    }
  },
  methods: {
    async fetchData() {
      this.todoData = null
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${this.todoId}`
      )
      this.todoData = await res.json()
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    todoId() {
      this.fetchData()
    }
  }
}
</script>

<template>
  <p>할 일 id: {{ todoId }}</p>
  <button @click="todoId++">다음 할 일 가져오기</button>
  <p v-if="!todoData">로딩...</p>
  <pre v-else>{{ todoData }}</pre>
</template>
```

</div>
</details>

## 컴포넌트
- 상위 컴포넌트는 다른 컴포넌트를 템플릿의 하위 컴포넌트로 렌더링
  ``` javascript
    import ChildComp from './ChildComp.vue'

    export default {
      components: {
        ChildComp
      }
    }
  ```
  ``` html
  <ChildComp />
  ```
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  }
}
</script>

<template>
  <ChildComp />
</template>
```
``` html
<template>
  <h2>자식 컴포넌트입니다!</h2>
</template>
```

</div>
</details>

## Props
- 자식 컴포넌트는 props를 통해 부모로부터 데이터 수신
- props로 받은 값은 변경 불가
  ``` javascript
  // 자식 컴포넌트에서
  export default {
    props: {
      msg: String
    }
  }
  ```
- 부모는 속성을 사용하는 것처럼 자식에게 prop을 전달
  ``` html
  <ChildComp :msg="greeting" />
  ```
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  data() {
    return {
      greeting: '부모 컴포넌트로부터 💌을 전달받았어요!'
    }
  }
}
</script>

<template>
  <ChildComp :msg="greeting" />
</template>
```
``` html
<script>
export default {
  props: {
    msg: String
  }
}
</script>

<template>
  <h2>{{ msg || 'prop이 아직 전달되지 않았습니다!' }}</h2>
</template>
```

</div>
</details>

## Emits
- 자식 컴포넌트는 부모로부터 이벤트 emit(발송) 가능
  ```javascript
  export default {
    // emit할 이벤트 선언
    emits: ['response'],
    created() {
      // 인자와 함께 emit
      this.$emit('response', '자식 컴포넌트로부터 🌷를 받았어요!')
    }
  }
  ```
- 부모는 v-on을 사용하여 자식이 발송한 이벤트를 수신
  ``` html
  <ChildComp @response="(msg) => childMsg = msg" />
  ```
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  data() {
    return {
      childMsg: '자식 컴포넌트로부터 아직 메시지를 받지 못했어요!'
    }
  }
}
</script>

<template>
  <ChildComp @response="(msg) => childMsg = msg" />
  <p>{{ childMsg }}</p>
</template>
```
``` html
<script>
export default {
  emits: ['response'],
  created() {
    this.$emit('response', '자식 컴포넌트로부터 🌷를 받았어요!')
  }
}
</script>

<template>
  <h2>자식 컴포넌트</h2>
</template>
```

</div>
</details>

## 슬롯
- 부모 컴포넌트는 자식에게 슬롯을 사용하여 템플릿 조각을 전달 가능
  ``` html
  <ChildComp>
    이것은 슬롯 컨텐츠입니다!
  </ChildComp>
  ```
- 자식 컴포넌트가 \<slot> 엘리먼트를 "발산 수단(outlet: 가이드에서 '아울렛'으로 표기됨)"으로 사용하면, 부모에게 전달 받은 슬롯 컨텐츠를 렌더링
- 아울렛 내부 컨텐츠는 "대체" 컨텐츠로 처리(부모가 슬롯 컨텐츠를 전달하지 않은 경우 표시)
  ``` html
  <slot>대체: 부모로부터 컨텐츠를 못 받았어요! 😢</slot>
  ```
<details>
<summary>전체 코드</summary>
<div markdown="1">

``` html
<script>
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  data() {
    return {
      msg: 'Vue는 개발자에게 정말 유용하죠! 🎁'
    }
  }
}
</script>

<template>
  <ChildComp>부모로부터: {{ msg }}</ChildComp>
</template>
```
``` html
<template>
  <slot>대체: 부모로부터 컨텐츠를 못 받았어요! 😢</slot>
</template>
```

</div>
</details>
